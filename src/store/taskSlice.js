import { createSlice } from '@reduxjs/toolkit';

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
storedTasks.forEach((task) => (task.isMenuOpened = false));
const initialState = [...storedTasks];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const newState = state.filter((_, index) => index !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newState));
      return newState;
    },
    editTask: (state, action) => {
      const { index, title, description } = action.payload;
      state[index] = { title, description };
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    loadTasks: (state) => {
      state = JSON.parse(localStorage.getItem("tasks")) || [];
      state.forEach((task) => (task.isMenuOpened = false));
    },
    moveTask: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.splice(fromIndex, 1);
      state.splice(toIndex, 0, movedTask);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
  },
});

export const { addTask, deleteTask, editTask, loadTasks, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
