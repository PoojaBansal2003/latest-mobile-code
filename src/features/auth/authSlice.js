// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, register, getProfile } from "../../services/authService";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { user, token } = await login(email, password);
    dispatch(loginSuccess({ user, token }));
  } catch (err) {
    dispatch(loginFailure(err.message));
    throw err;
  }
};

export default authSlice.reducer;
