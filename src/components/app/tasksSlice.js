import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
   
  ],
  statuses: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      
    },
    updateTask: (state, action) => {
      const { id, title, status } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title || task.title;
        task.status = status || task.status;
      }
     
    },
    addStatus: (state, action) => {
        console.log(action);
        
      if (!state.statuses.includes(action.payload)) {
        state.statuses.push(action.payload);
      
      }
    },
    deleteStatus: (state, action) => {  
      state.statuses = state.statuses.filter(status => status !== action.payload);
      state.tasks = state.tasks.filter(task => task.status !== action.payload);
     
    },
    clearAll: (state)=>{

        state.statuses = []

    }
  },
});

export const { addTask, deleteTask, updateTask, addStatus, deleteStatus,clearAll } = tasksSlice.actions;
export default tasksSlice.reducer;