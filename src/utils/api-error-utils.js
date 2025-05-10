// api-utils.js
/**
 * Processes API error responses and returns a formatted error message
 * @param {Object} responseData - The JSON response from the API
 * @returns {string} Formatted error message
 */
export const processErrorResponse = (responseData) => {
  // Handle array of errors format
  if (
    responseData.errors &&
    Array.isArray(responseData.errors) &&
    responseData.errors.length > 0
  ) {
    return responseData.errors
      .map((err) => `${err.path}: ${err.msg}`)
      .join("\n");
  }

  // Handle simple error format
  if (responseData.error) {
    return responseData.error;
  }

  // Default error message
  return "An error occurred. Please try again.";
};

/**
 * Makes an API request and handles different response formats
 * @param {string} url - API endpoint URL
 * @param {Object} options - Request options (method, headers, body)
 * @param {Function} onSuccess - Callback function on success
 * @param {Function} onError - Callback function on error
 */
export const makeApiRequest = async (url, options, onSuccess, onError) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Check if request was successful
    if (response.ok && data.success) {
      onSuccess(data.data);
    } else {
      // Process the error response
      const errorMessage = processErrorResponse(data);
      onError(errorMessage);
    }
  } catch (error) {
    console.error("API request failed:", error);
    onError("Something went wrong. Please try again later.");
  }
};

/**
 * Custom hook for making API requests
 * @returns {Object} Object containing loading state and API request function
 */
export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (url, options, onSuccess, onError) => {
    setIsLoading(true);
    try {
      await makeApiRequest(url, options, onSuccess, onError);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, callApi };
};
