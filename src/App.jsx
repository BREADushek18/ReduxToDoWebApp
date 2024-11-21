import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, addTask, deleteTask, editTask } from './store/taskSlice';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import DeleteTaskModal from './components/DeleteTaskModal'; 
import './styles/base.scss';
import './styles/buttons.scss';
import './styles/layout.scss';
import './styles/modals.scss';
import './styles/notes.scss';
import './styles/tasks.scss';

import cat1 from './assets/images/cat1.gif';
import cat2 from './assets/images/cat2.gif';
import cat3 from './assets/images/cat3.gif';
import cat4 from './assets/images/cat4.gif';
import cat5 from './assets/images/cat5.gif';

const gifs = [cat1, cat2, cat3, cat4, cat5];

export default function App() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [taskToDelete, setTaskToDelete] = React.useState(null);

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    const handleAddTask = (title, description) => {
        const newTask = { title, description };
        dispatch(addTask(newTask));
    };

    const openDeleteModal = (index) => {
        setTaskToDelete(index);
        setModalOpen(true);
    };

    const handleDeleteTask = () => {
        dispatch(deleteTask(taskToDelete));
        setModalOpen(false);
        setTaskToDelete(null);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTaskToDelete(null);
    };

    const handleEditTask = (index, title, description) => {
        dispatch(editTask({ index, title, description }));
    };

    return (
        <div className="new-note-container">
             <TaskInput addTask={handleAddTask} />
            <TaskList 
                tasks={tasks} 
                deleteTask={openDeleteModal} 
                editTask={handleEditTask} 
                gifs={gifs} 
            />
            <DeleteTaskModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onDelete={handleDeleteTask} 
            />
        </div>
    );
}