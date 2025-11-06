'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import NotificationPopup from './NotificationPopup';
import styles from './NotificationBell.module.css';

export default function NotificationBell() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { unreadCount, addNotification } = useNotifications();

  useEffect(() => {
    // Connect to the SSE endpoint
    const eventSource = new EventSource('/api/notifications/stream');

    eventSource.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        addNotification(notification);
      } catch (error) {
        console.error('Failed to parse notification:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
    };

    // Clean up on unmount
    return () => {
      eventSource.close();
    };
  }, [addNotification]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.bellButton} 
        onClick={togglePopup}
        aria-label="Benachrichtigungen"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>
      <NotificationPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}
