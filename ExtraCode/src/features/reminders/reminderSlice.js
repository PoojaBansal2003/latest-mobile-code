import { createSlice } from '@reduxjs/toolkit';
import { createReminder, fetchReminders } from '../../services/reminderService';

const initialState = {
  reminders: [],
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    fetchRemindersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRemindersSuccess(state, action) {
      state.reminders = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRemindersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addReminderStart(state) {
      state.loading = true;
      state.error = null;
    },
    addReminderSuccess(state, action) {
      state.reminders.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addReminderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRemindersStart,
  fetchRemindersSuccess,
  fetchRemindersFailure,
  addReminderStart,
  addReminderSuccess,
  addReminderFailure,
} = reminderSlice.actions;

export default reminderSlice.reducer;

// Thunk actions
export const fetchRemindersAsync = () => async (dispatch) => {
  try {
    dispatch(fetchRemindersStart());
    const reminders = await fetchReminders();
    dispatch(fetchRemindersSuccess(reminders));
  } catch (err) {
    dispatch(fetchRemindersFailure(err.message));
  }
};

export const addReminderAsync = (reminder) => async (dispatch) => {
  try {
    dispatch(addReminderStart());
    const newReminder = await createReminder(reminder);
    dispatch(addReminderSuccess(newReminder));
  } catch (err) {
    dispatch(addReminderFailure(err.message));
  }
};
