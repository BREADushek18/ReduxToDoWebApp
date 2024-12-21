import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTasks, addTask } from './store/taskSlice';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './styles/base.scss';
import './styles/buttons.scss';
import './styles/layout.scss';
import './styles/modals.scss';
import './styles/notes.scss';
import './styles/tasks.scss';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    const handleAddTask = (title, description) => {
        const newTask = { title, description };
        dispatch(addTask(newTask));
    };

    return (
        <div className="new-note-container">
            <TaskInput addTask={handleAddTask} />
            <TaskList />
        </div>
    );
};

export default App;
