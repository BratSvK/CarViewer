import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  isLoggedIn: boolean;
  name: string;
  email: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  name: '',
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Reducers are functions that handle actions and update the state
  // They receive the current state and an action as arguments
  // The action contains the type and payload
  // Reducers should be pure functions, meaning they should not mutate the state directly
  // Instead, they should return a new state object
  // This is important for Redux to detect changes and update the UI accordingly
  // Reducers are used to handle actions dispatched by the application
  // They are pure functions that take the current state and an action as arguments
  // and return a new state object
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
    },
    register(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
