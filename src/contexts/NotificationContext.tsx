'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  text: string;
  icon: string;
}

interface NotificationContextType {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    };
    setNotifications((prev) => [...prev, newNotification]);
    setUnreadCount((prev) => prev + 1);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
