import React, { useState, useEffect } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FetchNotification } from '../services/functions/RequestNotification';
import LoadingModal from '../components/LoadingModal'; // Importa o LoadingModal

function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o loading

  useEffect(() => {
    const { getLastNotification, eventSource } = FetchNotification(
      (notification) => {
        // Verifica se a notificação já existe antes de adicionar
        if (notification && !notifications.includes(notification)) {
          setNotifications((prev) => [...prev, notification]);
        }
        setLoading(false); // Carregamento concluído ao receber a primeira notificação
      },
      (error) => {
        setLoading(false); // Fechar loading em caso de erro
      }
    );

    // Exibe a última notificação logo após o componente ser montado, se existir
    const lastNotification = getLastNotification();
    if (lastNotification && !notifications.includes(lastNotification)) {
      setNotifications((prev) => [...prev, lastNotification]);
      setLoading(false); // Carregamento concluído se houver última notificação
    }

    return () => {
      eventSource.close(); // Limpeza do eventSource ao desmontar o componente
    };
  }, [notifications]); // Adiciona notifications como dependência para verificar duplicatas

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index}>{notification}</li> // Aqui deve mostrar as notificações
              ))  
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
        </div>
      )}
      {loading && <LoadingModal />} {/* Exibe o LoadingModal enquanto está carregando */}
    </div>
  );
}

export default NotificationBell;
