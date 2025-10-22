
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/hooks/use-firestore';
import { useToast } from '@/hooks/use-toast';
import type { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import {
  Plus, Camera, ScanLine, Search, Flame, Beef, Wheat, Droplets, 
  Brain, Loader2, Trash2, Edit, Calendar, Download, Share2, Save, 
  Clock, Users, ChefHat, Utensils
} from 'lucide-react';
import Link from 'next/link';
import { analyzeFoodPhoto, AnalyzeFoodPhotoOutput } from '@/ai/flows/analyze-food-photo';
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Helper functions for nutrition calculations
const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers: Record<string, number> = {
    'sedentary': 1.2,
    'lightly_active': 1.375,
    'moderately_active': 1.55,
    'very_active': 1.725
  };
  return bmr * (activityMultipliers[activityLevel] || 1.2);
};

const calculateMacros = (tdee: number, goal: string, weight: number) => {
  let calorieTarget = tdee;
  let proteinPerKg = 1.6;
  
  switch (goal) {
    case 'weight_loss':
      calorieTarget = tdee - 500;
      proteinPerKg = 2.0;
      break;
    case 'muscle_gain':
      calorieTarget = tdee + 300;
      proteinPerKg = 2.2;
      break;
    case 'maintenance':
    default:
      calorieTarget = tdee;
      proteinPerKg = 1.6;
      break;
  }
  
  const protein = Math.round(weight * proteinPerKg);
  const proteinCalories = protein * 4;
  const fatCalories = calorieTarget * 0.25;
  const fat = Math.round(fatCalories / 9);
  const carbCalories = calorieTarget - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);
  
  return {
    calories: Math.round(calorieTarget),
    protein,
    carbs,
    fat,
  };
};

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  portion: string;
  weight: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'dessert';
  createdAt: Timestamp | Date;
}

interface Meal {
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  vitaminA?: number;
  vitaminC?: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  magnesium?: number;
  potassium?: number;
  zinc?: number;
  ingredients: Array<{
    name: string;
    amount: string;
    unit: string;
  }>;
  instructions: string[];
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

interface DayPlan {
  date: string;
  meals: Meal[];
  dailyTotals: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
}

interface MealPlan {
  id: string;
  planId: string;
  planName: string;
  planType: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  days: DayPlan[];
  planSummary: {
    totalDays: number;
    averageDailyCalories: number;
    averageDailyProtein: number;
    averageDailyCarbs: number;
    averageDailyFat: number;
    goalAlignment: string;
    keyFeatures: string[];
  };
  recommendations: string[];
  createdAt: Timestamp | Date;
  userId: string;
}

// Food categories will be defined inside the component to access translations

export default function NutritionTrackerPage() {
  // Temporarily disable foodLog fetching to avoid Firebase index issues
  // const { data: foodLogs, addDocument: addFoodLog, deleteDocument: deleteFoodLog, updateDocument: updateFoodLog } = useFirestore<FoodItem>('foodLog', { limit: 100 });
  
  // Mock data for now to avoid Firebase index issues
  const foodLogs: FoodItem[] = [];
  const addFoodLog = async (data: Omit<FoodItem, 'id'>) => {
    console.log('Mock addFoodLog:', data);
    toast({
      title: 'Food Added! 🍎',
      description: 'Food item added to your log (mock mode).',
    });
  };
  const deleteFoodLog = async (id: string) => {
    console.log('Mock deleteFoodLog:', id);
    toast({
      title: 'Food Removed! 🗑️',
      description: 'Food item removed from your log (mock mode).',
    });
  };
  const updateFoodLog = async (id: string, data: Partial<FoodItem>) => {
    console.log('Mock updateFoodLog:', id, data);
    toast({
      title: 'Food Updated! ✏️',
      description: 'Food item updated in your log (mock mode).',
    });
  };
  const { user } = useAuth();
  const { toast } = useToast();
  
  const foodCategories = [
    { id: 'breakfast', label: '🌅 Breakfast', icon: <Flame className="w-4 h-4" />, emoji: '🌅' },
    { id: 'lunch', label: '☀️ Lunch', icon: <Beef className="w-4 h-4" />, emoji: '☀️' },
    { id: 'dinner', label: '🌙 Dinner', icon: <Wheat className="w-4 h-4" />, emoji: '🌙' },
    { id: 'snacks', label: '🍿 Snacks', icon: <Droplets className="w-4 h-4" />, emoji: '🍿' },
    { id: 'dessert', label: '🍰 Dessert', icon: <Brain className="w-4 h-4" />, emoji: '🍰' },
  ];
  
  const [activeTab, setActiveTab] = useState('tracker');
  const [showAddFood, setShowAddFood] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeFoodPhotoOutput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [showEditFoodDialog, setShowEditFoodDialog] = useState(false);
  
  // Meal Plan states
  const [isGeneratingMealPlan, setIsGeneratingMealPlan] = useState(false);
  const [generatedMealPlan, setGeneratedMealPlan] = useState<MealPlan | null>(null);
  const [mealPlanType, setMealPlanType] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [savedMealPlans, setSavedMealPlans] = useState<MealPlan[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [showEditMealPlanDialog, setShowEditMealPlanDialog] = useState(false);
  const [editingMealPlan, setEditingMealPlan] = useState<MealPlan | null>(null);
  const [isLoadingMealPlans, setIsLoadingMealPlans] = useState(false);
  const [mealPlanName, setMealPlanName] = useState('');

  const form = useForm({
    resolver: zodResolver(z.object({
      name: z.string().min(1, 'Food name is required'),
      calories: z.number().min(0),
      protein: z.number().min(0),
      carbs: z.number().min(0),
      fat: z.number().min(0),
      fiber: z.number().min(0).optional(),
      sugar: z.number().min(0).optional(),
      portion: z.string().min(1, 'Portion is required'),
      weight: z.number().min(0),
      category: z.enum(['breakfast', 'lunch', 'dinner', 'snacks', 'dessert']),
    })),
  });

  const handleAddFood = async (data: any) => {
    try {
      await addFoodLog({
        ...data,
        createdAt: new Date(),
      });
      toast({
        title: 'Food Added! 🍽️',
        description: `${data.name} has been added to your food log.`,
      });
      form.reset();
      setShowAddFood(false);
      } catch (error) {
        toast({
          variant: 'destructive',
        title: 'Error',
        description: 'Failed to add food item. Please try again.',
        });
    }
  };

  const handleDeleteFood = async (id: string) => {
    try {
      await deleteFoodLog(id);
        toast({
        title: 'Food Removed! 🗑️',
        description: 'Food item has been removed from your log.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to remove food item. Please try again.',
        });
    }
  };

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food);
    form.reset({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber || 0,
      sugar: food.sugar || 0,
      portion: food.portion,
      weight: food.weight,
      category: food.category,
    });
    setShowEditFoodDialog(true);
  };

  const handleUpdateFood = async (data: any) => {
    if (!editingFood) return;
    try {
      await updateFoodLog(editingFood.id, data);
      toast({
        title: 'Food Updated! ✏️',
        description: `${data.name} has been updated successfully.`,
      });
      form.reset();
      setShowEditFoodDialog(false);
      setEditingFood(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update food item. Please try again.',
      });
    }
  };

  const handleAnalyzePhoto = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Convert file to data URI
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUri = e.target?.result as string;
          const result = await analyzeFoodPhoto({ photoDataUri: dataUri });
          setAnalysisResult(result);
          toast({
            title: 'Analysis Complete! 🔍',
            description: 'Food has been analyzed successfully.',
          });
        } catch (analyzeError: any) {
          console.error('Food analysis error:', analyzeError);
          const errorMsg = analyzeError?.message || String(analyzeError);
          
          if (errorMsg.includes('API key') || errorMsg.includes('GEMINI')) {
            toast({
              variant: 'destructive',
              title: '⚠️ API Key Required',
              description: 'Gemini API key not configured. Add GEMINI_API_KEY to Vercel environment variables.',
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Analysis Failed',
              description: 'Could not analyze the food photo. Please try again.',
            });
          }
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not read the file. Please try again.',
      });
      setIsAnalyzing(false);
    }
  };

  const handleSearchFood = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch('/api/ai/search-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results.foods || []);
        setShowSearchResults(true);
        toast({
          title: 'Search Complete! 🔍',
          description: `Found ${results.foods?.length || 0} food items.`,
        });
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: 'Could not search for food items. Please try again.',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleScanLabel = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Convert file to data URI
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        const response = await fetch('/api/ai/scan-nutrition-label', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoDataUri: dataUri }),
        });
        
        if (response.ok) {
          const result = await response.json();
          setAnalysisResult(result);
          toast({
            title: 'Label Scanned! 🏷️',
            description: 'Nutrition label has been analyzed successfully.',
          });
        } else {
          throw new Error('Label scan failed');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Scan Failed',
        description: 'Could not scan the nutrition label. Please try again.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateMealPlan = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to generate meal plans.',
      });
      return;
    }

    setIsGeneratingMealPlan(true);
    try {
      // First try to get profile from Firebase
      let profileData = null;
      
      try {
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        
        if (profileSnap.exists()) {
          profileData = profileSnap.data();
          console.log('Profile loaded from Firebase:', profileData);
        }
      } catch (firebaseError) {
        console.log('Firebase profile not found, trying localStorage');
      }
      
      // Fallback to localStorage if Firebase doesn't have the profile
      if (!profileData) {
        const savedProfile = localStorage.getItem('user-nutrition-profile');
        console.log('Saved profile from localStorage:', savedProfile);
        
        if (savedProfile) {
          profileData = JSON.parse(savedProfile);
          console.log('Parsed profile data from localStorage:', profileData);
        }
      }
      
      if (!profileData) {
        toast({
          variant: 'destructive',
          title: 'Profile Required',
          description: 'Please complete your personal information first.',
        });
        return;
      }
      
      // Check if required fields are present
      if (!profileData.weight || !profileData.height || !profileData.age || !profileData.gender || !profileData.activityLevel || !profileData.goal) {
        toast({
          variant: 'destructive',
          title: 'Incomplete Profile',
          description: 'Please complete all required fields in your personal information.',
        });
        return;
      }

      const numberOfDays = mealPlanType === 'daily' ? 1 : mealPlanType === 'weekly' ? 7 : 30;

      // Map profile data to match the meal plan schema
      const mapGoalToSchema = (goal: string) => {
        switch (goal) {
          case 'weight-loss': return 'weight_loss';
          case 'muscle-gain': return 'muscle_gain';
          case 'maintenance': return 'maintenance';
          default: return goal;
        }
      };

      const mapActivityLevelToSchema = (activityLevel: string) => {
        switch (activityLevel) {
          case 'lightly-active': return 'lightly_active';
          case 'moderately-active': return 'moderately_active';
          case 'very-active': return 'very_active';
          default: return activityLevel;
        }
      };

      const requestData = {
        weight: profileData.weight,
        height: profileData.height,
        age: profileData.age,
        gender: profileData.gender,
        activityLevel: mapActivityLevelToSchema(profileData.activityLevel),
        goal: mapGoalToSchema(profileData.goal),
        targetWeight: profileData.targetWeight,
        likes: profileData.likes ? profileData.likes.split(',').map((item: string) => item.trim()) : [],
        dislikes: profileData.dislikes ? profileData.dislikes.split(',').map((item: string) => item.trim()) : [],
        allergies: profileData.allergies ? profileData.allergies.split(',').map((item: string) => item.trim()) : [],
        cuisinePreferences: profileData.cuisine ? [profileData.cuisine] : [],
        planType: mealPlanType,
        numberOfDays: numberOfDays,
      };

      console.log('Request data being sent:', requestData);

      const response = await fetch('/api/ai/generate-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Generated meal plan result:', result);
        setGeneratedMealPlan({
          ...result,
          id: `plan_${Date.now()}`,
          userId: user.uid,
          createdAt: new Date(),
        });
        toast({
          title: 'Meal Plan Generated! 🍽️',
          description: `Your ${mealPlanType} meal plan is ready!`,
        });
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Meal plan generation failed');
      }
    } catch (error) {
      console.error('Error in handleGenerateMealPlan:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Could not generate meal plan. Please try again.',
      });
    } finally {
      setIsGeneratingMealPlan(false);
    }
  };

  // Load saved meal plans from Firebase
  const loadSavedMealPlans = async () => {
    if (!user) {
      console.log('No user found, skipping meal plan load');
      return;
    }

    setIsLoadingMealPlans(true);
    try {
      console.log('Loading saved meal plans for user:', user.uid);
      const mealPlansRef = collection(db, 'savedMealPlans');
      const q = query(
        mealPlansRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const plans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MealPlan[];
      
      console.log('Loaded saved meal plans:', plans.length, plans);
      setSavedMealPlans(plans);
    } catch (error) {
      console.error('Error loading saved meal plans:', error);
      toast({
        variant: 'destructive',
        title: 'Load Failed',
        description: `Could not load saved meal plans: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsLoadingMealPlans(false);
    }
  };

  // Save meal plan to Firebase
  const handleSaveMealPlan = async (planName: string) => {
    if (!generatedMealPlan || !user) {
      console.error('Missing required data:', { generatedMealPlan: !!generatedMealPlan, user: !!user });
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'Missing required data. Please try generating a meal plan first.',
      });
      return;
    }

    try {
      console.log('Starting to save meal plan:', { planName, userId: user.uid });
      
      const planToSave = {
        ...generatedMealPlan,
        planName: planName,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      console.log('Plan data to save:', planToSave);
      
      // Save to Firebase
      const docRef = await addDoc(collection(db, 'savedMealPlans'), planToSave);
      console.log('Meal plan saved to Firebase with ID:', docRef.id);
      
      // Update local state
      const newPlan = { ...planToSave, id: docRef.id };
      setSavedMealPlans(prev => [newPlan, ...prev]);
      setShowSaveDialog(false);
      setMealPlanName('');
      
      // Reload saved meal plans to ensure sync
      await loadSavedMealPlans();
      
      toast({
        title: 'Meal Plan Saved! 💾',
        description: 'Your meal plan has been saved and will sync across all devices.',
      });
    } catch (error) {
      console.error('Error saving meal plan:', error);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: `Could not save meal plan: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  // Load a specific meal plan
  const handleLoadMealPlan = (plan: MealPlan) => {
    setGeneratedMealPlan(plan);
    setShowLoadDialog(false);
    toast({
      title: 'Meal Plan Loaded! 📋',
      description: `"${plan.planName}" has been loaded successfully.`,
    });
  };

  // Edit meal plan
  const handleEditMealPlan = (plan: MealPlan) => {
    setEditingMealPlan(plan);
    setMealPlanName(plan.planName || '');
    setShowEditMealPlanDialog(true);
  };

  // Update meal plan
  const handleUpdateMealPlan = async () => {
    if (!editingMealPlan || !user || !mealPlanName.trim()) return;

    try {
      const updatedPlan = {
        ...editingMealPlan,
        planName: mealPlanName.trim(),
        updatedAt: new Date(),
      };

      // Update in Firebase
      const planRef = doc(db, 'savedMealPlans', editingMealPlan.id);
      await updateDoc(planRef, {
        planName: mealPlanName.trim(),
        updatedAt: new Date(),
      });

      // Update local state
      setSavedMealPlans(prev => 
        prev.map(plan => 
          plan.id === editingMealPlan.id 
            ? { ...plan, planName: mealPlanName.trim(), updatedAt: new Date() }
            : plan
        )
      );

      // Update current meal plan if it's the same one
      if (generatedMealPlan?.id === editingMealPlan.id) {
        setGeneratedMealPlan(updatedPlan);
      }

      setShowEditMealPlanDialog(false);
      setEditingMealPlan(null);
      setMealPlanName('');
      
      toast({
        title: 'Meal Plan Updated! ✏️',
        description: 'Your meal plan has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update meal plan. Please try again.',
      });
    }
  };

  // Delete meal plan
  const handleDeleteMealPlan = async (planId: string) => {
    if (!user) return;

    try {
      // Delete from Firebase
      await deleteDoc(doc(db, 'savedMealPlans', planId));

      // Update local state
      setSavedMealPlans(prev => prev.filter(plan => plan.id !== planId));

      // Clear current meal plan if it's the deleted one
      if (generatedMealPlan?.id === planId) {
        setGeneratedMealPlan(null);
      }

      toast({
        title: 'Meal Plan Deleted! 🗑️',
        description: 'Your meal plan has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: 'Could not delete meal plan. Please try again.',
      });
    }
  };

  const handleExportToPDF = () => {
    if (!generatedMealPlan) return;
    
    // Simple PDF export using browser print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = generatePDFContent(generatedMealPlan);
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShareViaWhatsApp = () => {
    if (!generatedMealPlan) return;
    
    const text = `Check out my ${generatedMealPlan.planType} meal plan! 🍽️\n\n${generatedMealPlan.planSummary.goalAlignment}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const generatePDFContent = (plan: MealPlan) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${plan.planName || 'Meal Plan'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .day { margin-bottom: 30px; page-break-inside: avoid; }
          .meal { margin-bottom: 15px; }
          .ingredients { margin-left: 20px; }
          .instructions { margin-left: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${plan.planName || 'Meal Plan'}</h1>
          <p>${plan.planType.charAt(0).toUpperCase() + plan.planType.slice(1)} Plan</p>
        </div>
        ${plan.days.map(day => `
          <div class="day">
            <h2>${new Date(day.date).toLocaleDateString()}</h2>
            ${day.meals.map(meal => `
              <div class="meal">
                <h3>${meal.name} (${meal.category})</h3>
                <p><strong>Calories:</strong> ${meal.calories} | <strong>Protein:</strong> ${meal.protein}g | <strong>Carbs:</strong> ${meal.carbohydrates}g | <strong>Fat:</strong> ${meal.fat}g</p>
                <p><strong>Prep Time:</strong> ${meal.prepTime}min | <strong>Cook Time:</strong> ${meal.cookTime}min</p>
                <div class="ingredients">
                  <h4>Ingredients:</h4>
                  <ul>
                    ${meal.ingredients.map(ing => `<li>${ing.amount} ${ing.unit} ${ing.name}</li>`).join('')}
                  </ul>
                </div>
                <div class="instructions">
                  <h4>Instructions:</h4>
                  <ol>
                    ${meal.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                  </ol>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </body>
      </html>
    `;
  };

  // Load saved meal plans on component mount
  React.useEffect(() => {
    if (user) {
      loadSavedMealPlans();
    }
  }, [user]);

  // Calculate today's totals
  const today = new Date().toDateString();
  const todayLogs = foodLogs?.filter(log => {
    const logDate = log.createdAt instanceof Date ? log.createdAt : new Date((log.createdAt as any).seconds * 1000);
    return logDate.toDateString() === today;
  }) || [];

  const todayTotals = todayLogs.reduce((totals, log) => ({
    calories: totals.calories + log.calories,
    protein: totals.protein + log.protein,
    carbs: totals.carbs + log.carbs,
    fat: totals.fat + log.fat,
    fiber: totals.fiber + (log.fiber || 0),
    sugar: totals.sugar + (log.sugar || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 });

  // Daily goals - will be personalized from profile in next update
  const dailyGoals = {
    bmr: 1500,
    tdee: 1800,
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
    sugar: 50,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Nutrition Tracker</h1>
        <p className="text-muted-foreground">
          Log your meals, track your intake, and discover nutritional insights.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tracker">Food Tracker</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="planner">Meal Planner</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

        <TabsContent value="tracker" className="space-y-6">
          {/* Today's Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories</CardTitle>
                <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayTotals.calories}</div>
                <p className="text-xs text-muted-foreground">
                  of {dailyGoals.calories} goal
                </p>
                <Progress 
                  value={(todayTotals.calories / dailyGoals.calories) * 100} 
                  className="mt-2" 
                />
                                  </CardContent>
                                </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protein</CardTitle>
                <Beef className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayTotals.protein}g</div>
                <p className="text-xs text-muted-foreground">
                  of {dailyGoals.protein}g goal
                </p>
                <Progress 
                  value={(todayTotals.protein / dailyGoals.protein) * 100} 
                  className="mt-2" 
                />
                        </CardContent>
                      </Card>

              <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbs</CardTitle>
                <Wheat className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayTotals.carbs}g</div>
                <p className="text-xs text-muted-foreground">
                  of {dailyGoals.carbs}g goal
                </p>
                <Progress 
                  value={(todayTotals.carbs / dailyGoals.carbs) * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fat</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayTotals.fat}g</div>
                <p className="text-xs text-muted-foreground">
                  of {dailyGoals.fat}g goal
                </p>
                <Progress 
                  value={(todayTotals.fat / dailyGoals.fat) * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
          </div>

          {/* Add Food Button */}
          <div className="flex justify-center">
            <Button onClick={() => setShowAddFood(true)} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Food
            </Button>
          </div>

          {/* Today's Food Log */}
          <Card>
                <CardHeader>
              <CardTitle>Today's Food Log</CardTitle>
              <CardDescription>
                {todayLogs.length} items logged today
              </CardDescription>
                </CardHeader>
              <CardContent>
              {todayLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No food logged today</p>
                  <p className="text-sm">Start by adding your first meal!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{log.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {log.calories} cal • {log.protein}g protein • {log.carbs}g carbs • {log.fat}g fat
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {foodCategories.find(cat => cat.id === log.category)?.emoji} {log.category}
                        </Badge>
                  </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditFood(log)}
                          title="Edit food item"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFood(log.id)}
                          title="Delete food item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      </div>
                  ))}
                    </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Food Analysis
              </CardTitle>
              <CardDescription>
                Upload a photo, search for foods, or scan nutrition labels to get AI-powered nutritional analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Food Search Section */}
              <div className="text-center py-6 space-y-4 border-b">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">🔍 Search Food Database</h4>
                  <p className="text-muted-foreground">
                    Search our comprehensive food database for nutritional information.
                  </p>
                </div>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input
                    placeholder="e.g., grilled chicken breast, banana, quinoa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchFood()}
                  />
                  <Button 
                    onClick={handleSearchFood} 
                    disabled={!searchQuery.trim() || isSearching}
                  >
                    {isSearching ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Food Photo Analysis Section */}
              <div className="text-center py-6 space-y-4 border-b">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">📸 Analyze Food Photo</h4>
                  <p className="text-muted-foreground">
                    Take a photo of your food to get instant nutritional insights and automatic logging.
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAnalyzePhoto(file);
                    }}
                    className="hidden"
                    id="food-photo"
                  />
                  <Button asChild>
                    <label htmlFor="food-photo" className="cursor-pointer">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          📸 Take Photo
                        </>
                      )}
                    </label>
                  </Button>
                </div>
              </div>

              {/* Nutrition Label Scan Section */}
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <ScanLine className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">🏷️ Scan Nutrition Label</h4>
                  <p className="text-muted-foreground">
                    Scan a nutrition label to extract detailed nutritional information.
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleScanLabel(file);
                    }}
                    className="hidden"
                    id="label-scan"
                  />
                  <Button asChild>
                    <label htmlFor="label-scan" className="cursor-pointer">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <ScanLine className="w-4 h-4 mr-2" />
                          🏷️ Scan Label
                        </>
                      )}
                    </label>
                  </Button>
                </div>
              </div>

              {analysisResult && analysisResult.foodItems && analysisResult.foodItems.length > 0 && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">🎉 Analysis Complete!</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysisResult.foodItems.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Portion: {item.portionSize}</p>
                      </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <strong>🔥 Calories:</strong> {item.calories}
                          </div>
                          <div>
                            <strong>💪 Protein:</strong> {item.protein}g
                          </div>
                          <div>
                            <strong>🌾 Carbs:</strong> {item.carbohydrates}g
                          </div>
                          <div>
                            <strong>🥑 Fat:</strong> {item.fat}g
                          </div>
                          {item.fiber && <div><strong>🌿 Fiber:</strong> {item.fiber}g</div>}
                          {item.sugar && <div><strong>🍯 Sugar:</strong> {item.sugar}g</div>}
                          {item.sodium && <div><strong>🧂 Sodium:</strong> {item.sodium}mg</div>}
                    </div>

                      {/* Micro Nutrients */}
                        {(item.vitaminA || item.vitaminC || item.calcium || item.iron) && (
                          <div className="mt-4">
                            <h5 className="font-semibold mb-2">💊 Micro Nutrients:</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {item.vitaminA && <div>🥕 Vitamin A: {item.vitaminA}μg</div>}
                              {item.vitaminC && <div>🍊 Vitamin C: {item.vitaminC}mg</div>}
                              {item.calcium && <div>🥛 Calcium: {item.calcium}mg</div>}
                              {item.iron && <div>🩸 Iron: {item.iron}mg</div>}
                              {item.magnesium && <div>⚡ Magnesium: {item.magnesium}mg</div>}
                              {item.potassium && <div>🍌 Potassium: {item.potassium}mg</div>}
                              {item.zinc && <div>⚙️ Zinc: {item.zinc}mg</div>}
                              {item.vitaminD && <div>☀️ Vitamin D: {item.vitaminD}μg</div>}
                      </div>
                    </div>
                        )}
                        <Button 
                          onClick={() => {
                            handleAddFood({
                              name: item.name,
                              calories: item.calories,
                              protein: item.protein,
                              carbs: item.carbohydrates,
                              fat: item.fat,
                              portion: item.portionSize,
                              weight: item.weight,
                              category: 'lunch',
                            });
                            setAnalysisResult(null);
                          }}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Food Log
                        </Button>
                  </div>
                    ))}
              </CardContent>
            </Card>
          )}

          {/* Search Results */}
          {showSearchResults && searchResults.length > 0 && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">🔍 Search Results</CardTitle>
                <CardDescription>
                  Found {searchResults.length} food item(s) matching "{searchQuery}"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {searchResults.map((item, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg bg-white">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Portion: {item.portionSize}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong>🔥 Calories:</strong> {item.calories}
                      </div>
                      <div>
                        <strong>💪 Protein:</strong> {item.protein}g
                      </div>
                      <div>
                        <strong>🌾 Carbs:</strong> {item.carbohydrates}g
                      </div>
                      <div>
                        <strong>🥑 Fat:</strong> {item.fat}g
                      </div>
                      {item.fiber && <div><strong>🌿 Fiber:</strong> {item.fiber}g</div>}
                      {item.sugar && <div><strong>🍯 Sugar:</strong> {item.sugar}g</div>}
                      {item.sodium && <div><strong>🧂 Sodium:</strong> {item.sodium}mg</div>}
                    </div>

                    {/* Micro Nutrients */}
                    {(item.vitaminA || item.vitaminC || item.calcium || item.iron) && (
                      <div className="mt-4">
                        <h5 className="font-semibold mb-2">💊 Micro Nutrients:</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {item.vitaminA && <div>🥕 Vitamin A: {item.vitaminA}μg</div>}
                          {item.vitaminC && <div>🍊 Vitamin C: {item.vitaminC}mg</div>}
                          {item.calcium && <div>🥛 Calcium: {item.calcium}mg</div>}
                          {item.iron && <div>🩸 Iron: {item.iron}mg</div>}
                          {item.magnesium && <div>⚡ Magnesium: {item.magnesium}mg</div>}
                          {item.potassium && <div>🍌 Potassium: {item.potassium}mg</div>}
                          {item.zinc && <div>⚙️ Zinc: {item.zinc}mg</div>}
                          {item.vitaminD && <div>☀️ Vitamin D: {item.vitaminD}μg</div>}
                        </div>
                      </div>
                    )}
                    <Button 
                      onClick={() => {
                        handleAddFood({
                          name: item.name,
                          calories: item.calories,
                          protein: item.protein,
                          carbs: item.carbohydrates,
                          fat: item.fat,
                          portion: item.portionSize,
                          weight: item.weight,
                          category: 'lunch',
                        });
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Food Log
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                  className="w-full"
                >
                  Close Results
                </Button>
              </CardContent>
            </Card>
          )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2" />
                AI Meal Planner
              </CardTitle>
              <CardDescription>
                Generate personalized meal plans based on your profile, preferences, and goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Type Selection */}
              <div className="space-y-4">
                <h4 className="font-semibold">Select Plan Duration</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={mealPlanType === 'daily' ? 'default' : 'outline'}
                    onClick={() => setMealPlanType('daily')}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="font-medium">Daily</span>
                    <span className="text-xs text-muted-foreground">1 day plan</span>
                  </Button>
                  <Button
                    variant={mealPlanType === 'weekly' ? 'default' : 'outline'}
                    onClick={() => setMealPlanType('weekly')}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="font-medium">Weekly</span>
                    <span className="text-xs text-muted-foreground">7 day plan</span>
                  </Button>
                  <Button
                    variant={mealPlanType === 'monthly' ? 'default' : 'outline'}
                    onClick={() => setMealPlanType('monthly')}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="font-medium">Monthly</span>
                    <span className="text-xs text-muted-foreground">30 day plan</span>
                  </Button>
                </div>
              </div>

              {/* Profile Check */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Profile Status Check</h4>
                <div className="text-sm text-blue-700">
                  {(() => {
                    // Check localStorage first (for immediate feedback)
                    const savedProfile = localStorage.getItem('user-nutrition-profile');
                    if (!savedProfile) {
                      return (
                        <div className="flex items-center gap-2">
                          <span className="text-red-500">❌</span>
                          <span>No profile found. Please complete your personal information first.</span>
                        </div>
                      );
                    }
                    
                    const profileData = JSON.parse(savedProfile);
                    const missingFields = [];
                    if (!profileData.weight) missingFields.push('Weight');
                    if (!profileData.height) missingFields.push('Height');
                    if (!profileData.age) missingFields.push('Age');
                    if (!profileData.gender) missingFields.push('Gender');
                    if (!profileData.activityLevel) missingFields.push('Activity Level');
                    if (!profileData.goal) missingFields.push('Goal');
                    
                    if (missingFields.length > 0) {
                      return (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">⚠️</span>
                            <span>Profile incomplete. Missing: {missingFields.join(', ')}</span>
                          </div>
                          <div className="text-xs">
                            Please complete your personal information to generate meal plans.
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✅</span>
                          <span>Profile complete! Ready to generate meal plans.</span>
                        </div>
                        <div className="text-xs text-blue-600">
                          💾 Your profile is saved and will sync across all your devices.
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Sync Status */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Sync Status</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🔄</span>
                    <span>Saved meal plans: {savedMealPlans.length}</span>
                  </div>
                  <div className="text-xs text-green-600">
                    💾 All meal plans are automatically saved to the cloud and sync across devices.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleGenerateMealPlan}
                  disabled={isGeneratingMealPlan}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {isGeneratingMealPlan ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Meal Plan...
                    </>
                  ) : (
                    <>
                      <ChefHat className="w-4 h-4 mr-2" />
                      Generate {mealPlanType.charAt(0).toUpperCase() + mealPlanType.slice(1)} Meal Plan
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => setShowLoadDialog(true)}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isLoadingMealPlans}
                >
                  {isLoadingMealPlans ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      Load Saved Plans ({savedMealPlans.length})
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={loadSavedMealPlans}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  disabled={isLoadingMealPlans}
                >
                  {isLoadingMealPlans ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Refresh
                    </>
                  )}
                </Button>
              </div>

              {/* Generated Meal Plan */}
              {generatedMealPlan && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-green-800">
                          🍽️ {generatedMealPlan.planName || `${mealPlanType.charAt(0).toUpperCase() + mealPlanType.slice(1)} Meal Plan`}
                        </CardTitle>
                        <CardDescription className="text-green-700">
                          {generatedMealPlan.planSummary.goalAlignment}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSaveDialog(true)}
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleExportToPDF}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShareViaWhatsApp}
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Plan Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary">{generatedMealPlan.planSummary.averageDailyCalories}</div>
                        <div className="text-sm text-muted-foreground">Avg Daily Calories</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{generatedMealPlan.planSummary.averageDailyProtein}g</div>
                        <div className="text-sm text-muted-foreground">Avg Daily Protein</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{generatedMealPlan.planSummary.averageDailyCarbs}g</div>
                        <div className="text-sm text-muted-foreground">Avg Daily Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{generatedMealPlan.planSummary.averageDailyFat}g</div>
                        <div className="text-sm text-muted-foreground">Avg Daily Fat</div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h5 className="font-semibold mb-2">Key Features:</h5>
                      <div className="flex flex-wrap gap-2">
                        {generatedMealPlan.planSummary.keyFeatures.map((feature, index) => (
                          <Badge key={index} variant="secondary">{feature}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Daily Plans */}
                    <div className="space-y-4">
                      <h5 className="font-semibold">Daily Meal Plans:</h5>
                      {generatedMealPlan.days.map((day, dayIndex) => (
                        <Card key={dayIndex} className="bg-white">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                              {new Date(day.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </CardTitle>
                            <CardDescription>
                              Total: {day.dailyTotals.calories} cal | {day.dailyTotals.protein}g protein | {day.dailyTotals.carbohydrates}g carbs | {day.dailyTotals.fat}g fat
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {day.meals.map((meal, mealIndex) => (
                                <Card key={mealIndex} className="bg-gray-50">
                                  <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                      <CardTitle className="text-base">{meal.name}</CardTitle>
                                      <Badge variant="outline">{meal.category}</Badge>
                                    </div>
                                    <CardDescription className="text-sm">
                                      {meal.calories} cal | {meal.protein}g protein | {meal.carbohydrates}g carbs | {meal.fat}g fat
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {meal.prepTime}min prep
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Utensils className="w-3 h-3" />
                                        {meal.cookTime}min cook
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {meal.servings} servings
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <h6 className="font-medium text-sm">Ingredients:</h6>
                                      <ul className="text-xs text-muted-foreground space-y-1">
                                        {meal.ingredients.slice(0, 3).map((ingredient, ingIndex) => (
                                          <li key={ingIndex}>• {ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                                        ))}
                                        {meal.ingredients.length > 3 && (
                                          <li className="text-primary">+{meal.ingredients.length - 3} more ingredients</li>
                                        )}
                                      </ul>
                                    </div>

                                    <div className="space-y-1">
                                      <h6 className="font-medium text-sm">Instructions:</h6>
                                      <p className="text-xs text-muted-foreground">
                                        {meal.instructions[0]?.substring(0, 100)}...
                                      </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                      {meal.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <Badge key={tagIndex} variant="outline" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Recommendations */}
                    {generatedMealPlan.recommendations.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {generatedMealPlan.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Food Log History</CardTitle>
            </CardHeader>
            <CardContent>
              {foodLogs && foodLogs.length > 0 ? (
                  <div className="space-y-4">
                  {foodLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{log.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {log.calories} cal • {log.protein}g protein • {log.carbs}g carbs • {log.fat}g fat
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.createdAt instanceof Date ? log.createdAt.toLocaleDateString() : new Date((log.createdAt as any).seconds * 1000).toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {foodCategories.find(cat => cat.id === log.category)?.emoji} {log.category}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditFood(log)}
                          title="Edit food item"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFood(log.id)}
                          title="Delete food item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No food logs found</p>
                  <p className="text-sm">Start logging your meals to see your history here.</p>
                </div>
              )}
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      {/* Add Food Dialog */}
              <Dialog open={showAddFood} onOpenChange={setShowAddFood}>
        <DialogContent>
              <DialogHeader>
                  <DialogTitle>Add Food Item</DialogTitle>
                  <DialogDescription>
                    Log a new food item to track your nutrition.
                  </DialogDescription>
              </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddFood)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Food Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Grilled Chicken Breast" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

              <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="calories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calories</FormLabel>
                            <FormControl>
                        <Input 
                          type="number" 
                          placeholder="200" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="protein"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Protein (g)</FormLabel>
                            <FormControl>
                        <Input 
                          type="number" 
                          placeholder="25" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
              </div>

              <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="carbs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Carbs (g)</FormLabel>
                            <FormControl>
                        <Input 
                          type="number" 
                          placeholder="15" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fat (g)</FormLabel>
                            <FormControl>
                        <Input 
                          type="number" 
                          placeholder="8" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
              </div>

                      <FormField
                        control={form.control}
                name="category"
                        render={({ field }) => (
                          <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                            </FormControl>
                      <SelectContent>
                        {foodCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center">
                              {category.icon}
                              <span className="ml-2">{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddFood(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Food
                </Button>
              </DialogFooter>
                  </form>
                </Form>
            </DialogContent>
          </Dialog>

      {/* Save Meal Plan Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Meal Plan</DialogTitle>
            <DialogDescription>
              Give your meal plan a name to save it for later use.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                placeholder="e.g., My Weekly Weight Loss Plan"
                value={mealPlanName}
                onChange={(e) => setMealPlanName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (mealPlanName.trim()) {
                      handleSaveMealPlan(mealPlanName.trim());
                    }
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowSaveDialog(false);
              setMealPlanName('');
            }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (mealPlanName.trim()) {
                  handleSaveMealPlan(mealPlanName.trim());
                }
              }}
              disabled={!mealPlanName.trim()}
            >
              Save Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Saved Plans Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Load Saved Meal Plans</DialogTitle>
            <DialogDescription>
              Select a saved meal plan to load and view.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {savedMealPlans.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No saved meal plans found.</p>
                <p className="text-sm text-muted-foreground">Generate and save a meal plan to see it here.</p>
              </div>
            ) : (
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {savedMealPlans.map((plan) => (
                  <Card key={plan.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{plan.planName}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Type: {plan.planType.charAt(0).toUpperCase() + plan.planType.slice(1)} Plan</p>
                          <p>Days: {plan.days.length} days</p>
                          <p>Avg Calories: {plan.planSummary.averageDailyCalories} cal/day</p>
                          <p>Created: {plan.createdAt instanceof Date ? plan.createdAt.toLocaleDateString() : new Date((plan.createdAt as any).seconds * 1000).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleLoadMealPlan(plan)}
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditMealPlan(plan)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMealPlan(plan.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Meal Plan Dialog */}
      <Dialog open={showEditMealPlanDialog} onOpenChange={setShowEditMealPlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meal Plan</DialogTitle>
            <DialogDescription>
              Update the name of your meal plan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-plan-name">Plan Name</Label>
              <Input
                id="edit-plan-name"
                placeholder="e.g., My Weekly Weight Loss Plan"
                value={mealPlanName}
                onChange={(e) => setMealPlanName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (mealPlanName.trim()) {
                      handleUpdateMealPlan();
                    }
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowEditMealPlanDialog(false);
              setEditingMealPlan(null);
              setMealPlanName('');
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateMealPlan}
              disabled={!mealPlanName.trim()}
            >
              Update Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}