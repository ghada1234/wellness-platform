'use client';

import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';
import { useAuth } from '@/hooks/use-auth';
import type { Timestamp } from 'firebase/firestore';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Timestamp | Date;
  userId: string;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  loading: boolean;
}

const NotificationsContext = React.createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: notifications, loading, addDocument, updateDocument, deleteDocument } = useFirestore<Notification>('notifications');
  const { user } = useAuth();

  const unreadCount = React.useMemo(() => {
    return (notifications || []).filter(n => !n.isRead).length;
  }, [notifications]);

  const addNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) {
      throw new Error('User must be authenticated to create notifications');
    }
    
    await addDocument({
      ...notification,
      userId: user.uid,
      isRead: false,
    } as Omit<Notification, 'id' | 'createdAt'>);
  };

  const markAsRead = async (id: string) => {
    await updateDocument(id, { isRead: true });
  };

  const markAllAsRead = async () => {
    const unreadNotifications = (notifications || []).filter(n => !n.isRead);
    await Promise.all(unreadNotifications.map(n => updateDocument(n.id, { isRead: true })));
  };

  const deleteNotification = async (id: string) => {
    await deleteDocument(id);
  };

  const value = { 
    notifications: notifications || [], 
    unreadCount,
    addNotification, 
    markAsRead, 
    markAllAsRead,
    deleteNotification,
    loading 
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = React.useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

