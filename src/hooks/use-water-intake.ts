import { useState, useEffect, useCallback, useRef } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './use-auth';

interface WaterIntake {
  id: string; // YYYY-MM-DD
  userId: string;
  glasses: number;
  goal: number;
  date: string; // YYYY-MM-DD
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useWaterIntake = () => {
  const { user } = useAuth();
  const [waterIntake, setWaterIntake] = useState({ glasses: 0, goal: 8 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [docExists, setDocExists] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const todayId = getTodayDateString();

  const fetchWaterIntake = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, 'water-intake', todayId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as WaterIntake;
        setWaterIntake({
          glasses: data.glasses || 0,
          goal: data.goal || 8
        });
        setDocExists(true);
      } else {
        // Create new document for today
        const newWaterIntake: Omit<WaterIntake, 'id'> = {
          userId: user.uid,
          glasses: 0,
          goal: 8,
          date: todayId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };
        
        await setDoc(docRef, newWaterIntake);
        setWaterIntake({ glasses: 0, goal: 8 });
        setDocExists(true);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch water intake')
      );
    } finally {
      setLoading(false);
    }
  }, [user, todayId]);

  const saveWaterIntake = useCallback(async (glasses: number, goal: number) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const docRef = doc(db, 'water-intake', todayId);
      const updateData = {
        glasses,
        goal,
        updatedAt: Timestamp.now(),
      };

      if (docExists) {
        await updateDoc(docRef, updateData);
      } else {
        const newWaterIntake: Omit<WaterIntake, 'id'> = {
          userId: user.uid,
          glasses,
          goal,
          date: todayId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };
        await setDoc(docRef, newWaterIntake);
        setDocExists(true);
      }
    } catch (err) {
      throw new Error('Failed to save water intake');
    }
  }, [user, todayId, docExists]);

  const updateWaterIntake = useCallback(async (newGlasses: number) => {
    if (!user) {
      setError(new Error('User not authenticated'));
      return;
    }

    try {
      // Optimistic UI update
      setWaterIntake(prev => ({...prev, glasses: newGlasses}));
      
      // Debounced save to database
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      
      debounceTimeout.current = setTimeout(async () => {
        try {
          await saveWaterIntake(newGlasses, waterIntake.goal);
        } catch (err) {
          // Revert optimistic update on error
          setWaterIntake(prev => ({...prev, glasses: prev.glasses}));
        }
      }, 500);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to update water intake')
      );
    }
  }, [user, waterIntake.goal, saveWaterIntake]);

  const updateWaterGoal = useCallback(async (newGoal: number) => {
    if (!user) {
      setError(new Error('User not authenticated'));
      return;
    }

    try {
      // Optimistic UI update
      setWaterIntake(prev => ({...prev, goal: newGoal}));
      
      // Save to database
      await saveWaterIntake(waterIntake.glasses, newGoal);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to update water goal')
      );
    }
  }, [user, waterIntake.glasses, saveWaterIntake]);

  // Fetch water intake data on mount
  useEffect(() => {
    fetchWaterIntake();
  }, [fetchWaterIntake]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return { waterIntake, loading, error, updateWaterIntake, updateWaterGoal };
};
