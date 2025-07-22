import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instructorsService from './instructorsService';

export const getAllInstructors = createAsyncThunk(
  'instructors/getAll',
  async (_, thunkAPI) => {
    try {
      return await instructorsService.getAllInstructors();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const instructorSlice = createSlice({
  name: 'instructors',
  initialState: {
    instructors: [],
    isLoading: false,
    isError: false,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstructors.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAllInstructors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.instructors = action.payload;
        state.message = '';
      })
      .addCase(getAllInstructors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default instructorSlice.reducer;

