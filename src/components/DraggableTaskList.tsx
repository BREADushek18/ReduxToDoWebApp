import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { moveTask, editTask, deleteTask, pinTask, unpinTask } from '../store/taskSlice';
import SpecButtons from './SpecButtons';
import EditModal from './EditModal';
import ShareModal from './ShareModal';
import InfoModal from './InfoModal';
import DeleteTaskModal from './DeleteTaskModal'; 
import NotificationModal from './NotificationModal';
import '../styles/tasks.scss';
import '../styles/buttons.scss';
import cat1 from '../assets/images/cat1.gif';
import cat2 from '../assets/images/cat2.gif';
import cat3 from '../assets/images/cat3.gif';
import cat4 from '../assets/images/cat4.gif';
import cat5 from '../assets/images/cat5.gif';

interface Task {
    isPinned?: boolean;
    title: string;
    description: string;
}

interface DraggableTaskListProps {
    tasks: Task[];
}

const DraggableTaskList: React.FC<DraggableTaskListProps> = ({ tasks }) => {
    const dispatch = useDispatch();
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [currentGif, setCurrentGif] = useState<string | null>(null);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [notification, setNotification] = useState<string>(''); 
    const [taskToDeleteIndex, setTaskToDeleteIndex] = useState<number | null>(null);

    const gifs = [cat1, cat2, cat3, cat4, cat5];

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index: number) => {
        if (tasks[index].isPinned) return;

        if (index !== draggedIndex) {
            dispatch(moveTask({ fromIndex: draggedIndex!, toIndex: index }));
            setDraggedIndex(index);
        }
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleTaskClick = (index: number) => {
        setActiveTaskIndex(activeTaskIndex === index ? null : index);
    };

    const handleEditTask = (index: number) => {
        const task = tasks[index];
        setCurrentTask({ title: task.title, description: task.description });
        setEditModalOpen(true);
    };

    const handleShareTask = (index: number) => {
        const task = tasks[index];
        setCurrentTask(task);
        setShareModalOpen(true);
    };

    const handleInfoTask = () => {
        const randomIndex = Math.floor(Math.random() * gifs.length);
        setCurrentGif(gifs[randomIndex]);
        setInfoModalOpen(true);
    };

    const handleSaveEdit = (newTitle: string, newDesc: string) => {
        if (newTitle.trim() === '') return;
        if (currentTask) {
            const index = tasks.indexOf(currentTask);
            if (index !== -1) {
                dispatch(editTask({ index, title: newTitle, description: newDesc }));
            }
            setEditModalOpen(false);
        }
    };    

    const openDeleteModal = (index: number) => {
        setTaskToDeleteIndex(index); 
        setCurrentTask({ title: tasks[index].title, description: tasks[index].description });
        setDeleteModalOpen(true);
    };

    const handleDeleteTask = () => {
        if (taskToDeleteIndex !== null) {
            dispatch(deleteTask(taskToDeleteIndex)); 
            setDeleteModalOpen(false);
            setTaskToDeleteIndex(null); 
        }
    };

    const handlePinTask = (index: number) => {
        const pinnedTasksCount = tasks.filter(task => task.isPinned).length;
        if (tasks[index].isPinned) {
            dispatch(unpinTask(index));
        } else if (pinnedTasksCount < 3) {
            dispatch(pinTask(index));
        } else {
            showNotification();
        }
    };

    const showNotification = () => {
        setNotification(`Вы не можете закрепить больше 3-х задач! Если вы хотите закрепить данную задачу, то открепите одну из существующих.`);
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const truncateText = (text: string) => {
        if (!text) return ''; 
        return text.length > 28 ? text.slice(0, 28) + '...' : text;
    };

    return (
        <>
            {tasks && tasks.map((task: Task, index: number) => (
                <div
                    className="task"
                    key={index}
                    draggable={!task.isPinned} 
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
                            onPin={() => handlePinTask(index)} 
                            isPinned={task.isPinned || false} 
                        />
                    )}
                </div>
            ))}
            <EditModal 
                isOpen={isEditModalOpen} 
                onClose={() => setEditModalOpen(false)} 
                onSave={handleSaveEdit} 
                fullTitle={currentTask?.title || ''} 
                fullDesc={currentTask?.description || ''} 
            />
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setShareModalOpen(false)} 
                fullTitle={currentTask?.title || ''} 
                fullDescription={currentTask?.description || ''} 
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
            {notification && (
                <NotificationModal 
                    message={notification} 
                    onClose={() => setNotification('')} 
                />
            )}
        </>
    );
};

export default DraggableTaskList;
