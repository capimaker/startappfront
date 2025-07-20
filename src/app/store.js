import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/service/authSlice';
import sessionReducer from '../features/sessions/sessionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionReducer,
  },
});

