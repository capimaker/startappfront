
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sessionService from './sessionService';

const initialState = {
  sessions: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};


export const createSession = createAsyncThunk(
  'sessions/create',
  async (sessionData, thunkAPI) => {
    try {
      return await sessionService.createSession(sessionData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Error al crear sesión';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

export const { reset } = sessionSlice.actions;
export default sessionSlice.reducer;
