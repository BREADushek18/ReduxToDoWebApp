import React from 'react';

const SpecButtons: React.FC<{ 
    onEdit: () => void; 
    onShare: () => void; 
    onInfo: () => void; 
    onPin: () => void; 
    isPinned: boolean; 
}> = ({ onEdit, onShare, onInfo, onPin, isPinned }) => {
    return (
        <div className="button-container">
            <button className="task-button" onClick={onShare}>
                <img src="../src/assets/icons/share.svg" className="icon" />
            </button>
            <button className="task-button" onClick={onInfo}>
                <span>i</span>
            </button>
            <button className="task-button" onClick={onEdit}>
                <img src="../src/assets/icons/edit.svg" className="icon" />
            </button>
            <button className="task-button" onClick={onPin}>
                <img src={isPinned ? '../src/assets/icons/anti-pin.svg' : '../src/assets/icons/pin.svg'} className="icon" />
            </button>
        </div>
    );
};

export default SpecButtons;
