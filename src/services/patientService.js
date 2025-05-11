import axios from "axios";
import API_BASE_URL from "../config";

export const fetchPatientDetails = async (token, patientId) => {
  try {
    console.log("Token and patientId:", token, patientId);
    console.log("API_BASE_URL:", API_BASE_URL);

    const response = await axios.post(
      `${API_BASE_URL}/api/basic/patient`,
      { patientId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response:", response.data);

    // The API returns a nested structure with data.patient
    if (response.data && response.data.data && response.data.data.patient) {
      console.log("Extracted patient data:", response.data.data.patient);
      return response.data.data.patient;
    } else {
      console.warn(
        "Patient data not found in expected structure:",
        response.data
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch patient details"
    );
  }
};

export const updatePatientDetails = async (token, patientId, data) => {
  try {
    console.log("Updating patient:", patientId, data);

    const response = await axios.put(
      `${API_BASE_URL}/patients/${patientId}`,
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
    console.error("Error updating patient details:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to update patient details"
    );
  }
};

export const deletePatient = async (token, patientId) => {
  try {
    console.log("Deleting patient:", patientId);

    const response = await axios.delete(
      `${API_BASE_URL}/patients/${patientId}`,
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
    console.error("Error deleting patient:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to delete patient"
    );
  }
};
