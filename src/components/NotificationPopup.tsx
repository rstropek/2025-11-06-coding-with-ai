import { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import styles from './NotificationPopup.module.css';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  const { notifications, removeNotification } = useNotifications();
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set());
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);

  const handleDismiss = (id: string) => {
    // Add to dismissing set for fade-out animation
    setDismissingIds((prev) => new Set(prev).add(id));
    
    // Remove after animation completes (300ms)
    const timeoutId = setTimeout(() => {
      removeNotification(id);
      setDismissingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      timeoutsRef.current.delete(id);
    }, 300);
    
    timeoutsRef.current.set(id, timeoutId);
  };

  if (!isOpen) return null;

  // Helper function to get the icon component from lucide-react
  const getIcon = (iconName: string) => {
    // Convert kebab-case to PascalCase (e.g., "check-circle" -> "CheckCircle")
    const pascalCaseName = iconName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[pascalCaseName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.popup}>
        <div className={styles.header}>
          <h3>Benachrichtigungen</h3>
        </div>
        <div className={styles.content}>
          {notifications.length === 0 ? (
            <p className={styles.emptyMessage}>Keine Benachrichtigungen.</p>
          ) : (
            <ul className={styles.notificationList}>
              {notifications.map((notification) => (
                <li 
                  key={notification.id} 
                  className={`${styles.notificationItem} ${dismissingIds.has(notification.id) ? styles.dismissing : ''}`}
                >
                  <div className={styles.iconContainer}>
                    {getIcon(notification.icon)}
                  </div>
                  <div className={styles.notificationContent}>
                    <strong className={styles.notificationTitle}>{notification.title}</strong>
                    <p className={styles.notificationText}>{notification.text}</p>
                  </div>
                  <button
                    className={styles.dismissButton}
                    onClick={() => handleDismiss(notification.id)}
                    aria-label="Benachrichtigung schließen"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
