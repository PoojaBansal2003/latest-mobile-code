/**
 * Utility function to make API requests with fetch and handle errors consistently
 *
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch request options (method, headers, body)
 * @param {Function} onSuccess - Callback for successful responses
 * @param {Function} onError - Callback for error handling
 * @returns {Promise} - Promise resolving to the processed data or error
 */
export const sendApiRequest = async (url, options, onSuccess, onError) => {
  try {
    console.log("Making API request to:", url);
    console.log("With options:", options);

    const response = await fetch(url, options);
    console.log("Response status:", response.status);

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json().catch(() => ({}));
      console.error("API error response:", errorData);
      return onError(
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    // Parse JSON response
    const data = await response.json();
    console.log("API success response:", data);

    // Make sure we actually return the result of onSuccess
    const result = onSuccess(data);
    console.log("After onSuccess callback:", result);
    return result;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error("Network or parsing error:", error);
    return onError(error.message || "An unknown error occurred");
  }
};
