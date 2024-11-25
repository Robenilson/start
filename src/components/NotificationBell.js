import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FetchNotification } from '../services/functions/RequestNotification';
import LoadingModal from '../components/LoadingModal'; // Importa o LoadingModal
import ModalComponet from '../components/ModalComponet'; // Importa o ModalComponet
function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o loading
  useEffect(() => {
    const { getLastNotification, eventSource } = FetchNotification(
      (notification) => {
        if (notification && !notifications.includes(notification)) {
          setNotifications((prev) => [...prev, notification]);
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
    const lastNotification = getLastNotification();
    if (lastNotification && !notifications.includes(lastNotification)) {
      setNotifications((prev) => [...prev, lastNotification]);
      setLoading(false);
    }
    return () => {
      eventSource.close();
    };
  }, [notifications]);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return (
    <div className="notification-icon" onClick={toggleNotifications} style={{ position: 'relative' }}>
      <FontAwesomeIcon icon={faBell} />
      {notifications.length > 0 && (
        <span  className="notification-count">
          {notifications.length}
        </span>
      )}
      {loading && <LoadingModal />} {/* Exibe o LoadingModal enquanto está carregando */}
      {/* Substituição do dropdown pelo ModalComponet */}
      <ModalComponet
        show={showNotifications}
        onHide={() => setShowNotifications(false)}
        title="Notificações"
      >
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index}>{notification}</li> // Mostra as notificações no modal
            ))
          ) : (
            <li>No new notifications</li> // Mensagem padrão quando não há notificações
          )}
        </ul>
      </ModalComponet>
    </div>
  );
}
export default NotificationBell;
