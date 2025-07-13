import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import tasksReducer from './tasksSlice';


const persistConfig = {
    key: 'tasks',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, tasksReducer);
export const store = configureStore({
  reducer: {
    tasks: persistedReducer,
 
  },
})
export const persistor = persistStore(store);