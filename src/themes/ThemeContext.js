import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';

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
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const ThemeContext = createContext({
  theme: { ...CombinedLightTheme, dark: false },
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? { ...CombinedDarkTheme, dark: true } : { ...CombinedLightTheme, dark: false };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};
