import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import sessionService from './sessionService';

const initialState = {
  sessions: [], // nuestros eventos/mentorías
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// --- Guardar en backend (opcional)
export const createSession = createAsyncThunk('sessions/create', async (sessionData, thunkAPI) => {
  try {
    return await sessionService.createSession(sessionData);
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Error al crear sesión';
    return thunkAPI.rejectWithValue(message);
  }
});

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    // --- NUEVO: añadir evento local (para el calendario)
    addLocalEvent: {
      reducer(state, action) {
        state.sessions.push(action.payload);
      },
      prepare(event) {
        return { payload: { id: nanoid(), ...event } };
      },
    },
    updateLocalEvent: (state, action) => {
      const idx = state.sessions.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.sessions[idx] = { ...state.sessions[idx], ...action.payload };
    },
    deleteLocalEvent: (state, action) => {
      state.sessions = state.sessions.filter((e) => e.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions.push(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, addLocalEvent, updateLocalEvent, deleteLocalEvent } = sessionSlice.actions;
export const selectEvents = (state) => state.sessions.sessions;
export default sessionSlice.reducer;
