import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import {
  Provider as ReduxProvider,
  useSelector,
  useDispatch,
} from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store";
import AppNavigator from "./navigation/AppNavigator";
import { useTheme } from "./themes/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ActivityIndicator, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, initAuthSuccess } from "./features/auth/authSlice";

const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ReduxProvider>
  );
};

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  // Only select the specific state properties you need
  const { token, isInitialized } = useSelector((state) => state.auth);

  // Remove this line that's causing the warning:
  // const state = useSelector((state) => state);

  // If you need to debug state, use a more specific selector or use the Redux DevTools
  // instead of logging the entire state

  // Initialize auth state from AsyncStorage
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
      } catch (error) {
        console.error("Error initializing auth state:", error);
      } finally {
        // Mark initialization as complete regardless of result
        dispatch(initAuthSuccess());
      }
    };

    initializeAuthState();
  }, [dispatch]);

  // Show loading screen while checking authentication
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default AppWrapper;

// import React from "react";
// import { Provider as PaperProvider } from "react-native-paper";
// import { Provider as ReduxProvider, useSelector } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { store } from "./store";
// import AppNavigator from "./navigation/AppNavigator";
// import { useTheme } from "./themes/ThemeContext";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n";
// // import { useAuthInit } from "./store";
// import { ActivityIndicator, View } from "react-native";

// const AppWrapper = () => {
//   return (
//     <ReduxProvider store={store}>
//       <I18nextProvider i18n={i18n}>
//         <App />
//       </I18nextProvider>
//     </ReduxProvider>
//   );
// };

// const App = () => {
//   const { theme } = useTheme();

//   // Use custom hook to initialize auth state from AsyncStorage
//   // useAuthInit();

//   // Get auth state from Redux
//   const { token, isInitialized } = useSelector((state) => state.auth);

//   // Show loading screen while checking authentication
//   if (!isInitialized) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer theme={theme}>
//         <AppNavigator />
//       </NavigationContainer>
//     </PaperProvider>
//   );
// };

// export default AppWrapper;
