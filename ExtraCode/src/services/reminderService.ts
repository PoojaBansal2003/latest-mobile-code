import axios from 'axios';
import { Reminder } from '../types/reminder';

const API_BASE_URL = 'https://myapi.com/api/reminders';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error('API Error: No response received');
      return Promise.reject(new Error('No response received from server'));
    } else {
      // Something happened in setting up the request
      console.error('API Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const fetchReminders = async (): Promise<Reminder[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reminders');
  }
};

export const createReminder = async (reminder: Omit<Reminder, 'id'>): Promise<Reminder> => {
  try {
    const response = await api.post('/', reminder);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create reminder');
  }
};
