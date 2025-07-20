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
    console.error(error);
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
        
        (state.user = action.payload.user),
          (state.token = action.payload.token);
      });
  },
});


