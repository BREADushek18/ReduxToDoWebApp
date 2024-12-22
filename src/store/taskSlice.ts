import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    title: string;
    description: string;
    isMenuOpened?: boolean;
}

const storedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
storedTasks.forEach((task: Task) => task.isMenuOpened = false);
const initialState: Task[] = [...storedTasks];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state));
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const newState = state.filter((_, index) => index !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(newState));
            return newState;
        },
        editTask: (state, action: PayloadAction<{ index: number; title: string; description: string }>) => {
            const { index, title, description } = action.payload;
            state[index] = { title, description };
            localStorage.setItem('tasks', JSON.stringify(state));
        },
        loadTasks: (state) => {
            const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
            return tasks.map(task => ({ ...task, isMenuOpened: false }));
        },
        moveTask: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
            const { fromIndex, toIndex } = action.payload;
            const [movedTask] = state.splice(fromIndex, 1);
            state.splice(toIndex, 0, movedTask);
            localStorage.setItem('tasks', JSON.stringify(state));
        },
    },
});

export const { addTask, deleteTask, editTask, loadTasks, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
