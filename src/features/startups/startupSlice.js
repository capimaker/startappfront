import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import startupService from './startupService';

export const fetchStartups = createAsyncThunk('startups/fetchAll', async (_, thunkAPI) => {
  try {
    const data = await startupService.getAllStartups();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const startupSlice = createSlice({
  name: 'startups',
  initialState: {
    startups: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStartups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStartups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.startups = action.payload;
      })
      .addCase(fetchStartups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default startupSlice.reducer;
