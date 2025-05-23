// hooks/useAuthInit.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, initAuthSuccess } from "../features/auth/authSlice";

/**
 * Custom hook to initialize authentication state from AsyncStorage
 */
export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuthState = async () => {
      try {
        // Check if auth data exists in AsyncStorage
        const authDataString = await AsyncStorage.getItem("epo_auth_user");

        if (authDataString) {
          const authData = JSON.parse(authDataString);

          // If we have valid data, update Redux state
          if (authData && authData.user && authData.token) {
            dispatch(
              loginSuccess({
                user: authData.user,
                token: authData.token,
              })
            );
          }
        }

        // Mark initialization as complete regardless of result
        dispatch(initAuthSuccess());
      } catch (error) {
        console.error("Error initializing auth state:", error);
        // Still mark as initialized even if there was an error
        dispatch(initAuthSuccess());
      }
    };

    initializeAuthState();
  }, [dispatch]);
};

export default useAuthInit;
