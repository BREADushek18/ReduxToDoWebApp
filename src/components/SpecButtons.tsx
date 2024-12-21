import React from 'react';

const SpecButtons = ({ onEdit, onShare, onInfo }) => {
    return (
        <div className="button-container">
            <button className="task-button" onClick={onShare}>
                <img src="../src/assets/icons/share.svg" className="icon"  />
            </button>
            <button className="task-button" onClick={onInfo}>
                <span>i</span>
            </button>
            <button className="task-button" onClick={onEdit}>
                <img src="../src/assets/icons/edit.svg" className="icon" />
            </button>
        </div>
    );
};

export default SpecButtons;
