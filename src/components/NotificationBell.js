import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NotificationBell({ initialMessages = 0 }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(Array(initialMessages).fill(null).map((_, i) => `Notification ${i + 1}`));

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      clearNotifications();
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="notification-icon" onClick={toggleNotifications} style={{ position: 'relative' }}>
      <FontAwesomeIcon icon={faBell} />
      {notifications.length > 0 && (
        <span className="notification-count">
          {notifications.length}
        </span>
      )}
      {showNotifications && (
        <div className="notification-dropdown">
          <ul>
            {notifications.length === 0 ? (
              <li>No new notifications</li>
            ) : (
              notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
