import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/service/authSlice';
import sessionReducer from '../features/sessions/sessionSlice';
import startupReducer from '../features/startups/startupSlice';
import mentorsReducer from '../features/mentors/mentorsSlice';
import hoursReducer from '../features/hours/hoursSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sessions: sessionReducer,
    startups: startupReducer,
    mentors: mentorsReducer,
    hours: hoursReducer,
  },
});
