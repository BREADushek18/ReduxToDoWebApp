import React from 'react';
import '../styles/modals.scss';

interface NotificationModalProps {
    message: string;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, onClose }) => {
    return (
        <div className="notification-modal" onClick={onClose}>
            {message}
        </div>
    );
};

export default NotificationModal;
