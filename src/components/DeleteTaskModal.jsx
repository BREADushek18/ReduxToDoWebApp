import React from 'react';
import '../styles/modals.scss';

const DeleteTaskModal = ({ isOpen, onClose, onDelete }) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`}>
            <div className="modal-content">
                <div className="modal-line"></div>
                <h3>Delete this task?</h3>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
