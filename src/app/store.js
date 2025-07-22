
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../features/sessions/sessionSlice';
import startupReducer from '../features/startups/startupSlice';
import instructorsReducer from '../features/instructors/instructorsSlice';

export const store = configureStore({
  reducer: {
    sessions: sessionReducer,
    startups: startupReducer,
    instructors: instructorsReducer
    
  },
});
