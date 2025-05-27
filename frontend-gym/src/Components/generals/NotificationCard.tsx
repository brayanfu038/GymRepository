// src/components/NotificationCard.tsx
import React from 'react';
import './NotificationCard.css';

interface NotificationCardProps {
  message: string;
  icon?: React.ReactNode; // Para permitir íconos personalizados si deseas
  backgroundColor?: string; // Para cambiar el color del ícono si se desea
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  message,
  icon,
  backgroundColor = '#00C853', // verde por defecto
}) => {
  return (
    <div className="notification-container">
      <div className='fondo-container' style={{ backgroundColor }}>
      <div className="notification-card">
        <div
          className="notification-icon"
          style={{ backgroundColor }}
        >
          {icon ?? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 0 24 24"
              width="48"
              fill="#fff"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.17l-3.88-3.88L4 13.41 9 18.41 20 7.41 18.59 6l-9.59 9.59z" />
            </svg>
          )}
        </div>
        <p className="notification-message">{message}</p>
      </div>
    </div>
    </div>
  );
};

export default NotificationCard;
