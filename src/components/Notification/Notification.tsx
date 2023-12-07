import React, { useEffect, useState } from 'react';
import styles from './Notification.module.scss';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000000);

    return () => clearTimeout(timer);
  }, []);

  const classes = {
    [styles.toaster]: true,
    [styles.success]: type === 'success',
    [styles.error]: type === 'error',
    [styles.visible]: visible,
    [styles.hidden]: !visible,
  };

  return (
    <div
      className={Object.keys(classes)
        .filter((key) => classes[key])
        .join(' ')}
    >
      {message}
    </div>
  );
};
