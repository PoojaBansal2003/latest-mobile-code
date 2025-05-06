import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import { createReminder, fetchReminders } from '../../services/reminderService';
import { Reminder } from '../../types/reminder';

interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
}

const initialState: ReminderState = {
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
    fetchRemindersSuccess(state, action: PayloadAction<Reminder[]>) {
      state.reminders = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRemindersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addReminderStart(state) {
      state.loading = true;
      state.error = null;
    },
    addReminderSuccess(state, action: PayloadAction<Reminder>) {
      state.reminders.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addReminderFailure(state, action: PayloadAction<string>) {
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
export const fetchRemindersAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchRemindersStart());
    const reminders = await fetchReminders();
    dispatch(fetchRemindersSuccess(reminders));
  } catch (err) {
    dispatch(fetchRemindersFailure(err.message));
  }
};

export const addReminderAsync = (reminder: Omit<Reminder, 'id'>): AppThunk => async (dispatch) => {
  try {
    dispatch(addReminderStart());
    const newReminder = await createReminder(reminder);
    dispatch(addReminderSuccess(newReminder));
  } catch (err) {
    dispatch(addReminderFailure(err.message));
  }
};
