import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  getProfile,
  getStoredAuthData,
  clearAuthData,
  isAuthenticated,
} from "../../services/authService";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isInitialized: false,
};

// Async thunk for direct AsyncStorage operations
export const storeAuthData = createAsyncThunk(
  "auth/storeAuthData",
  async ({ user, token }, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(
        "expo_auth_user",
        JSON.stringify({ user, token })
      );
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      // No async code here - this happens in our thunk
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
      state.isInitialized = true;
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
      // First check if action.payload exists and is an object before accessing properties
      if (action.payload && typeof action.payload === "object") {
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      }
      // Always mark as initialized regardless of payload
      state.isInitialized = true;
    },
  },
  // Inside extraReducers in authSlice.js
  extraReducers: (builder) => {
    builder
      .addCase(storeAuthData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase("persist/REHYDRATE", (state, action) => {
        if (action.payload?.auth) {
          state.user = action.payload.auth.user;
          state.token = action.payload.auth.token;
          state.isInitialized = true;
        }
      });
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
// In authSlice.js, modify the initializeAuth thunk

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch }) => {
    try {
      const authData = await getStoredAuthData();
      if (authData?.user && authData?.token) {
        dispatch(loginSuccess(authData));
        return authData;
      }
      return null;
    } catch (err) {
      console.error("Auth initialization error:", err);
      return null;
    } finally {
      dispatch(authSlice.actions.initAuthSuccess({}));
    }
  }
);

export const loginUser = (user, token) => async (dispatch) => {
  try {
    dispatch(authSlice.actions.loginStart());
    // const { user, token } = await login(email, password);

    dispatch(loginSuccess({ user, token }));
    dispatch(storeAuthData({ user, token }));
    return { user, token };
  } catch (err) {
    dispatch(authSlice.actions.loginFailure(err.message));
    throw err;
  }
};

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await clearAuthData();
      dispatch(authSlice.actions.logoutSuccess());
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      return false;
    }
  }
);

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

export default authSlice.reducer;
