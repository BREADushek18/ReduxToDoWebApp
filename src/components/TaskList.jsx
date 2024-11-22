import React from 'react';
import DraggableTaskList from './DraggableTaskList';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/taskSlice';
import '../styles/tasks.scss';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    const handleDeleteTask = (index) => {
        dispatch(deleteTask(index));
    };

    return (
        <div className="task-container">
            {tasks.length === 0 ? (
                <>
                    <div className="divider"></div>
                    <div id="no-tasks">No tasks</div>
                    <div className="divider"></div>
                </>
            ) : (
                <DraggableTaskList 
                    tasks={tasks} 
                    deleteTask={handleDeleteTask} 
                />
            )}
        </div>
    );
};

export default TaskList;
