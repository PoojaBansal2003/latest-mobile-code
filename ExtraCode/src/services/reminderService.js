import axios from 'axios';

const API_BASE_URL = 'https://myapi.com/api/reminders';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received');
      return Promise.reject(new Error('No response received from server'));
    } else {
      console.error('API Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const fetchReminders = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reminders');
  }
};

export const createReminder = async (reminder) => {
  try {
    const response = await api.post('/', reminder);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create reminder');
  }
};
