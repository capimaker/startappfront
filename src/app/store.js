
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../features/sessions/sessionSlice';
import startupReducer from '../features/startups/startupSlice';
import mentorsReducer from '../features/mentors/mentorsSlice';

export const store = configureStore({
  reducer: {
    sessions: sessionReducer,
    startups: startupReducer,
    mentors: mentorsReducer,
    
  },
});
