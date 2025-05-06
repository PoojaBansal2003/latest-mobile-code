#!/bin/bash

# Create Expo Reminder App src directory structure

# Root directory
mkdir -p src

# Create all subdirectories
mkdir -p src/assets
mkdir -p src/components
mkdir -p src/constants
mkdir -p src/features/reminders
mkdir -p src/hooks
mkdir -p src/i18n
mkdir -p src/navigation
mkdir -p src/screens
mkdir -p src/services
mkdir -p src/store
mkdir -p src/themes
mkdir -p src/utils

# App.js
cat > src/App.js << 'EOL'
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { useTheme } from './themes/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppWrapper;
EOL

# Navigation
cat > src/navigation/AppNavigator.js << 'EOL'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { ThemeColors } from '../themes/theme';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const AppNavigator = () => {
  const { t } = useTranslation();
  const theme = ThemeColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddReminder') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: t('home') }} />
      <Tab.Screen name="AddReminder" component={AddReminderScreen} options={{ title: t('addReminder') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
EOL

# Store
cat > src/store/index.js << 'EOL'
import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from '../features/reminders/reminderSlice';

export const store = configureStore({
  reducer: {
    reminders: reminderReducer,
  },
});
EOL

# Features
cat > src/features/reminders/reminderSlice.js << 'EOL'
import { createSlice } from '@reduxjs/toolkit';
import { createReminder, fetchReminders } from '../../services/reminderService';

const initialState = {
  reminders: [],
  loading: false,
  error: null,
};

const reminderSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    fetchRemindersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRemindersSuccess(state, action) {
      state.reminders = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRemindersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addReminderStart(state) {
      state.loading = true;
      state.error = null;
    },
    addReminderSuccess(state, action) {
      state.reminders.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addReminderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRemindersStart,
  fetchRemindersSuccess,
  fetchRemindersFailure,
  addReminderStart,
  addReminderSuccess,
  addReminderFailure,
} = reminderSlice.actions;

export default reminderSlice.reducer;

// Thunk actions
export const fetchRemindersAsync = () => async (dispatch) => {
  try {
    dispatch(fetchRemindersStart());
    const reminders = await fetchReminders();
    dispatch(fetchRemindersSuccess(reminders));
  } catch (err) {
    dispatch(fetchRemindersFailure(err.message));
  }
};

export const addReminderAsync = (reminder) => async (dispatch) => {
  try {
    dispatch(addReminderStart());
    const newReminder = await createReminder(reminder);
    dispatch(addReminderSuccess(newReminder));
  } catch (err) {
    dispatch(addReminderFailure(err.message));
  }
};
EOL

# Services
cat > src/services/reminderService.js << 'EOL'
import axios from 'axios';

const API_BASE_URL = 'https://myapi.com/api/reminders';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received');
      return Promise.reject(new Error('No response received from server'));
    } else {
      console.error('API Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const fetchReminders = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch reminders');
  }
};

export const createReminder = async (reminder) => {
  try {
    const response = await api.post('/', reminder);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create reminder');
  }
};
EOL

# Screens
cat > src/screens/HomeScreen.js << 'EOL'
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ReminderCard from '../components/ReminderCard';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';
import { fetchRemindersAsync } from '../features/reminders/reminderSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { reminders, loading, error } = useSelector((state) => state.reminders);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchRemindersAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>{t('loading')}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReminderCard reminder={item} />}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.text, textAlign: 'center', marginTop: 20 }}>
            {t('noReminders')}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
EOL

cat > src/screens/AddReminderScreen.js << 'EOL'
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { addReminderAsync } from '../features/reminders/reminderSlice';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const AddReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    dispatch(
      addReminderAsync({
        title,
        time: date.toISOString(),
      })
    );
    setTitle('');
    setDate(new Date());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        label={t('reminderTitle')}
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
        theme={{ colors: { text: theme.colors.text } }}
      />
      <Button
        mode="outlined"
        onPress={showDatePicker}
        style={styles.button}
        labelStyle={{ color: theme.colors.primary }}
      >
        {t('selectTime')}: {date.toLocaleTimeString()}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={{ color: theme.colors.onPrimary }}
        disabled={!title.trim()}
      >
        {t('addReminder')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default AddReminderScreen;
EOL

cat > src/screens/SettingsScreen.js << 'EOL'
import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { List, Text } from 'react-native-paper';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
        <List.Item
          title={t('darkMode')}
          right={() => (
            <Switch
              value={theme.dark}
              onValueChange={toggleTheme}
              thumbColor={theme.colors.primary}
            />
          )}
        />
        <List.Item
          title={t('language')}
          description={i18n.language === 'en' ? 'English' : 'हिंदी'}
          right={() => (
            <Switch
              value={i18n.language === 'hi'}
              onValueChange={toggleLanguage}
              thumbColor={theme.colors.primary}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsScreen;
EOL

# Components
cat > src/components/ReminderCard.js << 'EOL'
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const ReminderCard = ({ reminder }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const reminderTime = new Date(reminder.time).toLocaleTimeString();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Title style={{ color: theme.colors.text }}>{reminder.title}</Title>
        <Paragraph style={{ color: theme.colors.text }}>
          {t('time')}: {reminderTime}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
});

export default ReminderCard;
EOL

# Themes
cat > src/themes/ThemeContext.js << 'EOL'
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
EOL

# i18n
cat > src/i18n/index.js << 'EOL'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      addReminder: 'Add Reminder',
      settings: 'Settings',
      reminderTitle: 'Reminder Title',
      selectTime: 'Select Time',
      addReminder: 'Add Reminder',
      darkMode: 'Dark Mode',
      language: 'Language',
      loading: 'Loading',
      noReminders: 'No reminders yet',
      time: 'Time',
    },
  },
  hi: {
    translation: {
      home: 'होम',
      addReminder: 'अनुस्मारक जोड़ें',
      settings: 'सेटिंग्स',
      reminderTitle: 'अनुस्मारक शीर्षक',
      selectTime: 'समय चुनें',
      addReminder: 'अनुस्मारक जोड़ें',
      darkMode: 'डार्क मोड',
      language: 'भाषा',
      loading: 'लोड हो रहा है',
      noReminders: 'अभी तक कोई अनुस्मारक नहीं',
      time: 'समय',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
EOL

# Hooks
cat > src/hooks/useAppDispatch.js << 'EOL'
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch();
EOL

echo "Expo Reminder App src directory structure created successfully!"