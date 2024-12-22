import React, { useState } from 'react';
import '../styles/layout.scss';

const TaskInput = ({
    addTask
}: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title && description) {
            addTask(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <div className="inputs">
            <div className="add-inputs">
                <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="About..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="add-note">
                <button className="add-button" onClick={handleAddTask}>+</button>
            </div>
        </div>
    );
};

export default TaskInput;
