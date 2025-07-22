// src/features/mentors/mentorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mentorsService from './mentorsService';

// Thunk para obtener todos los mentores
export const getAllMentors = createAsyncThunk(
  'mentors/getAll',
  async (_, thunkAPI) => {
    try {
      return await mentorsService.getAllMentors();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const mentorsSlice = createSlice({
  name: 'mentors',
  initialState: {
    mentors: [],
    isLoading: false,
    isError: false,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMentors.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAllMentors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mentors = action.payload;
      })
      .addCase(getAllMentors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default mentorsSlice.reducer;
