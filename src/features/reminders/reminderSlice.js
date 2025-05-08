// import { createSlice } from '@reduxjs/toolkit';
// import { createReminder, fetchReminders } from '../../services/reminderService';

// const initialState = {
//   reminders: [],
//   loading: false,
//   error: null,
// };

// const reminderSlice = createSlice({
//   name: 'reminders',
//   initialState,
//   reducers: {
//     fetchRemindersStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchRemindersSuccess(state, action) {
//       state.reminders = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     fetchRemindersFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     addReminderStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     addReminderSuccess(state, action) {
//       state.reminders.push(action.payload);
//       state.loading = false;
//       state.error = null;
//     },
//     addReminderFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   fetchRemindersStart,
//   fetchRemindersSuccess,
//   fetchRemindersFailure,
//   addReminderStart,
//   addReminderSuccess,
//   addReminderFailure,
// } = reminderSlice.actions;

// export default reminderSlice.reducer;

// // Thunk actions
// export const fetchRemindersAsync = () => async (dispatch) => {
//   try {
//     dispatch(fetchRemindersStart());
//     const reminders = await fetchReminders();
//     dispatch(fetchRemindersSuccess(reminders));
//   } catch (err) {
//     dispatch(fetchRemindersFailure(err.message));
//   }
// };

// export const addReminderAsync = (reminder) => async (dispatch) => {
//   try {
//     dispatch(addReminderStart());
//     const newReminder = await createReminder(reminder);
//     dispatch(addReminderSuccess(newReminder));
//   } catch (err) {
//     dispatch(addReminderFailure(err.message));
//   }
// };


// features/reminders/reminderSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchReminders, 
  createReminder, 
  updateReminder, 
  deleteReminder 
} from '../../services/reminderService';

const initialState = {
  reminders: [],
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    // Action reducers
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
    addReminderSuccess(state, action) {
      state.reminders.push(action.payload);
    },
    updateReminderSuccess(state, action) {
      const index = state.reminders.findIndex(r => r._id === action.payload._id);
      if (index !== -1) {
        state.reminders[index] = action.payload;
      }
    },
    deleteReminderSuccess(state, action) {
      state.reminders = state.reminders.filter(r => r._id !== action.payload);
    },
    resetReminders(state) {
      state.reminders = [];
    }
  },
});

export const {
  fetchRemindersStart,
  fetchRemindersSuccess,
  fetchRemindersFailure,
  addReminderSuccess,
  updateReminderSuccess,
  deleteReminderSuccess,
  resetReminders
} = reminderSlice.actions;

// Thunk actions
export const fetchRemindersAsync = (token) => async (dispatch) => {
  try {
    dispatch(fetchRemindersStart());
    const reminders = await fetchReminders(token);
    dispatch(fetchRemindersSuccess(reminders));
  } catch (err) {
    dispatch(fetchRemindersFailure(err.message));
  }
};

export const addReminderAsync = (reminder, token) => async (dispatch) => {
  try {
    const newReminder = await createReminder(reminder, token);
    dispatch(addReminderSuccess(newReminder));
    return newReminder;
  } catch (err) {
    throw err;
  }
};

export const updateReminderAsync = (id, reminder, token) => async (dispatch) => {
  try {
    const updatedReminder = await updateReminder(id, reminder, token);
    dispatch(updateReminderSuccess(updatedReminder));
    return updatedReminder;
  } catch (err) {
    throw err;
  }
};

export const deleteReminderAsync = (id, token) => async (dispatch) => {
  try {
    await deleteReminder(id, token);
    dispatch(deleteReminderSuccess(id));
  } catch (err) {
    throw err;
  }
};

export default reminderSlice.reducer;