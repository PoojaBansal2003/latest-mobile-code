import axios from "axios";
import API_BASE_URL from "../config";

export const fetchCaregiverDetails = async (token, patientId) => {
  try {
    console.log("Token and patientId:", token, patientId);
    console.log("API_BASE_URL:", API_BASE_URL);

    const response = await axios.post(
      `${API_BASE_URL}/api/basic/caregiver`,
      { patientId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response:", response.data);

    if (response.data && response.data.data && response.data.data.caregiver) {
      console.log("Extracted caregiver data:", response.data.data.caregiver);
      return response.data.data.caregiver;
    } else {
      console.warn(
        "Caregiver data not found in expected structure:",
        response.data
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching caregiver details:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch caregiver details"
    );
  }
};

export const updateCaregiverDetails = async (token, caregiverId, data) => {
  try {
    console.log("Updating caregiver:", caregiverId, data);

    const response = await axios.put(
      `${API_BASE_URL}/caregivers/${caregiverId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating caregiver details:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to update caregiver details"
    );
  }
};

export const deleteCaregiver = async (token, caregiverId) => {
  try {
    console.log("Deleting caregiver:", caregiverId);

    const response = await axios.delete(
      `${API_BASE_URL}/caregivers/${caregiverId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting caregiver:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to delete caregiver"
    );
  }
};

export const createCaregiver = async (token, patientId, data) => {
  try {
    console.log("Creating caregiver for patient:", patientId, data);

    const response = await axios.post(
      `${API_BASE_URL}/patients/${patientId}/caregiver`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Create response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating caregiver:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to create caregiver"
    );
  }
};
