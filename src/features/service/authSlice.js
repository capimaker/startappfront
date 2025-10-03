// src/features/service/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Cargar desde localStorage sin romper si no hay nada
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken ? JSON.parse(storedToken) : null,
  isError: false,
  isSuccess: false,
  message: '',
};

// Thunk de login (backend). Si no tienes servidor, NO lo uses por ahora.
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Tu servicio actual (si el backend estuviera vivo)
      return await authService.login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || 'login_failed'
      );
    }
  }
);

// Thunk de logout (backend)
export const logout = createAsyncThunk(
  'auth/logout',
  async (payload, thunkAPI) => {
    try {
      return await authService.logout(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || 'logout_failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ✅ Login sin backend (opción 2)
    loginSuccess: (state, action) => {
      state.user = action.payload.user || action.payload; // acepta {user,...} o el user directo
      state.token = action.payload.token || null;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', JSON.stringify(state.token));
      state.isSuccess = true;
      state.isError = false;
      state.message = '';
    },
    // Reset flags
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Login backend OK → persistir también en localStorage
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload || {};
        state.user = user || null;
        state.token = token || null;
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', JSON.stringify(state.token));
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
      })
      // Login backend falla → NO tocar estado (el Login.jsx hará fallback admin/1234)
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || 'login_failed';
      })

      // ✅ Logout backend OK → limpiar todo
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
      })
      // ✅ Si el logout backend falla, igual limpiamos sesión local
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || 'logout_failed';
      });
  },
});

export const { loginSuccess, reset } = authSlice.actions;
export default authSlice.reducer;
