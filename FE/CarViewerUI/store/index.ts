import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';

// Separete files for features
// and combine them in the store
export const store = configureStore({
  // Slice for data management
  // Each slice can have its own reducer and actions
  // This allows for better organization and separation of concerns
  reducer: {
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;