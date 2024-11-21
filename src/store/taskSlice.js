import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((_, index) => index !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { index, title, description } = action.payload;
      state.tasks[index] = { title, description };
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    loadTasks: (state) => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      state.tasks = savedTasks;
    },
    moveTask: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.tasks.splice(fromIndex, 1);
      state.tasks.splice(toIndex, 0, movedTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, deleteTask, editTask, loadTasks, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
