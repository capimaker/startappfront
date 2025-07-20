import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/service/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});