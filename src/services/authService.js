// services/authService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../config";

// Storage keys
const AUTH_DATA_KEY = "expo_auth_user";

/**
 * Store authentication data in AsyncStorage as a single JSON object
 * @param {object} user - User profile data
 * @param {string} token - Authentication token
 * @returns {Promise<boolean>} - Success status
 */
export const storeAuthData = async (user, token) => {
  try {
    // Store as a single JSON object
    const authData = JSON.stringify({ user, token });
    await AsyncStorage.setItem(AUTH_DATA_KEY, authData);
    console.log("Auth data stored successfully");
    return true;
  } catch (error) {
    console.error("Error storing auth data:", error);
    return false;
  }
};

/**
 * Get stored authentication data from AsyncStorage
 * @returns {Promise<Object|null>} - Auth data object or null if not found
 */
export const getStoredAuthData = async () => {
  try {
    const authData = await AsyncStorage.getItem(AUTH_DATA_KEY);
    return authData ? JSON.parse(authData) : null;
  } catch (error) {
    console.error("Error retrieving auth data:", error);
    return null;
  }
};

/**
 * Clear authentication data (for logout)
 * @returns {Promise<boolean>} - Success status
 */
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_DATA_KEY);
    console.log("Auth data cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing auth data:", error);
    return false;
  }
};

/**
 * Update stored user profile data but keep the same token
 * @param {object} userData - Updated user profile data
 * @returns {Promise<boolean>} - Success status
 */
export const updateStoredUserData = async (userData) => {
  try {
    const storedData = await getStoredAuthData();
    if (storedData && storedData.token) {
      await storeAuthData(userData, storedData.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating stored user data:", error);
    return false;
  }
};

/**
 * Login user and store auth data
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Auth data (user, token)
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Store auth data in AsyncStorage
    await storeAuthData(data.user, data.token);

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Register new user
 * @param {object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Get user profile data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - User profile data
 */
export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const userData = await response.json();

    // Update stored user data with fresh data from server
    await updateStoredUserData(userData);

    return userData;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

/**
 * Logout user by clearing stored auth data
 * @returns {Promise<boolean>} - Success status
 */
export const logout = async () => {
  try {
    await clearAuthData();
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Check if user is already authenticated
 * @returns {Promise<boolean>} - Authentication status
 */
export const isAuthenticated = async () => {
  try {
    const authData = await getStoredAuthData();
    return !!(authData && authData.token);
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
};
