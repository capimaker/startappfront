import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import startupService from './startupService';

export const getAllStartups = createAsyncThunk(
  'startups/getAll',
  async (_, thunkAPI) => {
    try {
      return await startupService.getAllStartups();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const startupSlice = createSlice({
  name: 'startups',
  initialState: {
    startups: [],
    isLoading: false,
    isError: false,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStartups.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAllStartups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.startups = action.payload;
        state.message = '';
      })
      .addCase(getAllStartups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default startupSlice.reducer;

