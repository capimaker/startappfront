import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';



const user = JSON.parse(localStorage.getItem("user")|| null);
const token = JSON.parse(localStorage.getItem("token")|| null);

const initialState = {
    user: user,
    token: token,
    isError: false,
    isSuccess: false,
    message: "",
};


export const login = createAsyncThunk("auth/login", async (user) => {
    try{
        return await authService.login(user);
    } catch (error){
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (user) => {
  try {
    return await authService.logout(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false), (state.isSuccess = false), (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});
 


export default authSlice.reducer;