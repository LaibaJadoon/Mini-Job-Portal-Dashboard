import { createSlice } from '@reduxjs/toolkit';

// Retrieve auth state from localStorage if it exists
const savedUser = JSON.parse(localStorage.getItem('jobPortalUser'));
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

const initialState = {
  user: isAuthenticated && savedUser ? savedUser : null,
  isAuthenticated: isAuthenticated && savedUser ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Persist to localStorage
      localStorage.setItem('jobPortalUser', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Clear from localStorage
      localStorage.removeItem('jobPortalUser');
      localStorage.setItem('isAuthenticated', 'false');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
