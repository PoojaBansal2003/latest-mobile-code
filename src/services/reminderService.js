// services/reminderService.js
import API_BASE_URL from "../config";
import { useAppDispatch } from "../hooks/useAppDispatch";

export const fetchReminders = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reminders");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
};

export const createReminder = async (reminder, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reminder),
    });

    if (!response.ok) {
      throw new Error("Failed to create reminder");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating reminder:", error);
    throw error;
  }
};

export const updateReminder = async (id, reminder, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reminder),
    });

    if (!response.ok) {
      throw new Error("Failed to update reminder");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating reminder:", error);
    throw error;
  }
};

export const deleteReminder = async (id, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete reminder");
    }

    return id; // Return the deleted reminder ID
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw error;
  }
};
