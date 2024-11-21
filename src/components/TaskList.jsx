import React from 'react';
import DraggableTaskList from './DraggableTaskList';
import '../styles/tasks.scss';

const TaskList = ({ tasks, deleteTask, editTask, gifs }) => {
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
                    deleteTask={deleteTask} 
                    editTask={editTask} 
                    gifs={gifs} 
                />
            )}
        </div>
    );
};

export default TaskList;
