import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { moveTask, editTask, deleteTask } from '../store/taskSlice';
import SpecButtons from './SpecButtons';
import EditModal from './EditModal';
import ShareModal from './ShareModal';
import InfoModal from './InfoModal';
import DeleteTaskModal from './DeleteTaskModal'; 
import '../styles/tasks.scss';
import '../styles/buttons.scss';

import cat1 from '../assets/images/cat1.gif';
import cat2 from '../assets/images/cat2.gif';
import cat3 from '../assets/images/cat3.gif';
import cat4 from '../assets/images/cat4.gif';
import cat5 from '../assets/images/cat5.gif';

const DraggableTaskList = ({ tasks }) => {
    const dispatch = useDispatch();
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [currentGif, setCurrentGif] = useState(null);
    const [currentTask, setCurrentTask] = useState({ index: null, title: '', description: '' });

    const gifs = [cat1, cat2, cat3, cat4, cat5];

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index) => {
        if (index !== draggedIndex) {
            dispatch(moveTask({ fromIndex: draggedIndex, toIndex: index }));
            setDraggedIndex(index);
        }
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleTaskClick = (index) => {
        setActiveTaskIndex(activeTaskIndex === index ? null : index);
    };

    const handleEditTask = (index) => {
        const task = tasks[index];
        setCurrentTask({ index, title: task.title, description: task.description });
        setEditModalOpen(true);
    };

    const handleShareTask = (index) => {
        const task = tasks[index];
        setCurrentTask(task);
        setShareModalOpen(true);
    };

    const handleInfoTask = () => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        setCurrentGif(gifs[randomIndex]);
        setInfoModalOpen(true);
    };

    const handleSaveEdit = (newTitle, newDesc) => {
        if (newTitle.trim() === '') return;
        dispatch(editTask({ index: currentTask.index, title: newTitle, description: newDesc }));
        setEditModalOpen(false);
    };

    const openDeleteModal = (index) => {
        setCurrentTask({ index, title: tasks[index].title, description: tasks[index].description });
        setDeleteModalOpen(true);
    };

    const handleDeleteTask = () => {
        dispatch(deleteTask(currentTask.index));
        setDeleteModalOpen(false);
    };

    const truncateText = (text) => {
        if (!text) return ''; 
        return text.length > 28 ? text.slice(0, 28) + '...' : text;
    };

    return (
        <>
            {tasks && tasks.map((task, index) => (
                <div
                    className="task"
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={() => handleDragOver(index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleTaskClick(index)}
                    style={{ marginBottom: activeTaskIndex === index ? '70px' : '8px' }}
                >
                    <div>
                        <strong className="task-title">{truncateText(task.title)}</strong><br />
                        <span className="task-body">{truncateText(task.description)}</span>
                    </div>
                    <button className="delete-button" onClick={() => openDeleteModal(index)}>×</button>
                    {activeTaskIndex === index && (
                        <SpecButtons 
                            onEdit={() => handleEditTask(index)} 
                            onShare={() => handleShareTask(index)} 
                            onInfo={handleInfoTask}
                        />
                    )}
                </div>
            ))}
            <EditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setEditModalOpen(false)} 
                onSave={handleSaveEdit} 
                fullTitle={currentTask.title} 
                fullDesc={currentTask.description} 
            />
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setShareModalOpen(false)} 
                fullTitle={currentTask.title} 
                fullDescription={currentTask.description} 
            />
            <InfoModal 
                isOpen={isInfoModalOpen} 
                onClose={() => setInfoModalOpen(false)} 
                gif={currentGif}
            />
            <DeleteTaskModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                onDelete={handleDeleteTask} 
            />
        </>
    );
};

export default DraggableTaskList;
