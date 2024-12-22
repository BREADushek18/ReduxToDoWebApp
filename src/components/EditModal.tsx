import React from 'react';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, description: string) => void;
    fullTitle: string;
    fullDesc: string;
}

const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    onClose,
    onSave,
    fullTitle,
    fullDesc
}) => {
    const [newTitle, setNewTitle] = React.useState(fullTitle);
    const [newDesc, setNewDesc] = React.useState(fullDesc);

    React.useEffect(() => {
        setNewTitle(fullTitle);
        setNewDesc(fullDesc);
    }, [fullTitle, fullDesc]);

    return (
        <div className={`edit-modal ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <input 
                    type="text" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    placeholder="Task Title..." 
                />
                <textarea 
                    value={newDesc} 
                    onChange={(e) => setNewDesc(e.target.value)} 
                    placeholder="Task body about this task..."
                ></textarea>
                <div className="modal-buttons">
                    <button id="cancel-edit" onClick={onClose}>Cancel</button>
                    <button id="save-edit" onClick={() => onSave(newTitle, newDesc)}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;