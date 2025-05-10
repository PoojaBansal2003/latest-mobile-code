import React, { createContext, useContext, useState } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";

const { LightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: DarkTheme,
});

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    // Ensure all required color properties are defined
    primary: MD3LightTheme.colors.primary,
    background: MD3LightTheme.colors.background,
    text: MD3LightTheme.colors.onBackground,
    textSecondary: MD3LightTheme.colors.onSurfaceVariant,
    border: MD3LightTheme.colors.outline,
    surfaceVariant: MD3LightTheme.colors.surfaceVariant,
    primaryContainer: MD3LightTheme.colors.primaryContainer,
    error: MD3LightTheme.colors.error,
    onError: MD3LightTheme.colors.onError,
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    // Ensure all required color properties are defined
    primary: MD3DarkTheme.colors.primary,
    background: MD3DarkTheme.colors.background,
    text: MD3DarkTheme.colors.onBackground,
    textSecondary: MD3DarkTheme.colors.onSurfaceVariant,
    border: MD3DarkTheme.colors.outline,
    surfaceVariant: MD3DarkTheme.colors.surfaceVariant,
    primaryContainer: MD3DarkTheme.colors.primaryContainer,
    error: MD3DarkTheme.colors.error,
    onError: MD3DarkTheme.colors.onError,
  },
};

// Create a default context value with all required properties
const defaultContextValue = {
  theme: CombinedLightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
};

const ThemeContext = createContext(defaultContextValue);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? CombinedDarkTheme : CombinedLightTheme;

  // Create the context value object with all required properties
  const contextValue = {
    theme,
    toggleTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};
