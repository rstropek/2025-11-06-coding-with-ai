import * as LucideIcons from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import styles from './NotificationPopup.module.css';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  const { notifications } = useNotifications();

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
            <p className={styles.emptyMessage}>Sie haben noch keine Benachrichtigungen</p>
          ) : (
            <ul className={styles.notificationList}>
              {notifications.map((notification, index) => (
                <li key={index} className={styles.notificationItem}>
                  <div className={styles.iconContainer}>
                    {getIcon(notification.icon)}
                  </div>
                  <div className={styles.notificationContent}>
                    <strong className={styles.notificationTitle}>{notification.title}</strong>
                    <p className={styles.notificationText}>{notification.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
