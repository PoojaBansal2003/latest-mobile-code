import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from '../features';

export const store = configureStore({
  reducer: {
    reminders: reminderReducer,
  },
});
