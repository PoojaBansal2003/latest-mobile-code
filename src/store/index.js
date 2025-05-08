// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "../features/reminders/reminderSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    reminders: reminderReducer,
    auth: authReducer,
  },
});
