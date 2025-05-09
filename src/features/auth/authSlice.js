// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  getProfile,
  getStoredAuthData,
  clearAuthData,
  isAuthenticated,
} from "../../services/authService";

// Initialize with empty values, will be populated from AsyncStorage on app start
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isInitialized: false, // Flag to track whether we've checked AsyncStorage
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
    logoutSuccess(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    getProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    initAuthSuccess(state, action) {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
      state.isInitialized = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
  initAuthSuccess,
} = authSlice.actions;

// Initialize auth state from AsyncStorage using createAsyncThunk
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch }) => {
    try {
      // Check if there's any stored authentication data
      const isUserAuthenticated = await isAuthenticated();

      if (isUserAuthenticated) {
        // Get the full auth data from storage
        const authData = await getStoredAuthData();

        if (authData && authData.user && authData.token) {
          // Update Redux state with stored data
          dispatch(
            loginSuccess({
              user: authData.user,
              token: authData.token,
            })
          );
          return authData;
        }
      }

      // If no valid auth data, return null
      return null;
    } catch (err) {
      console.error("Auth initialization error:", err);
      return null;
    } finally {
      // Always mark as initialized
      dispatch(initAuthSuccess());
    }
  }
);

// Login user and store data in AsyncStorage
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { user, token } = await login(email, password);
    dispatch(loginSuccess({ user, token }));
    return { user, token };
  } catch (err) {
    dispatch(loginFailure(err.message));
    throw err;
  }
};

// Get user profile and update state
export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch(getProfileStart());
    const { token } = getState().auth;
    if (!token) {
      throw new Error("No authentication token found");
    }
    const user = await getProfile(token);
    dispatch(getProfileSuccess(user));
    return user;
  } catch (err) {
    dispatch(getProfileFailure(err.message));
    throw err;
  }
};

// Logout user and clear AsyncStorage using createAsyncThunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      // Clear stored auth data from AsyncStorage
      await clearAuthData();

      // Update Redux state
      dispatch(logoutSuccess());
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      return false;
    }
  }
);

export default authSlice.reducer;
