import React from 'react';

const InfoModal = ({ isOpen, onClose, gif }) => {
    return (
        <div className={`info-modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {gif && <img src={gif} alt="Информация" className="info-gif" />}
                <p>Ты обязательно справишься!</p>
            </div>
        </div>
    );
};

export default InfoModal;
