import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from '../features/reminders/reminderSlice';

export const store = configureStore({
  reducer: {
    reminders: reminderReducer,
  },
});
