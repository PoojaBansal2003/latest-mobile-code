import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ThemeColors } from "../themes/ThemeContext";

// Screens for main app (tab navigator)
import HomeScreen from "../screens/HomeScreen";
import AddReminderScreen from "../screens/AddReminderScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Screens for auth stack
import WelcomeScreen from "../screens/UserAuth/WelcomeScreen";
import UserTypeScreen from "../screens/UserAuth/UserTypeScreen";
import CaregiverLoginScreen from "../screens/UserAuth/CaregiverLoginScreen";
import CaregiverSignupScreen from "../screens/UserAuth/CaregivenSignupScreen";
import PatientHome from "../screens/PatientHome";
import SensorScreen from "../screens/SensorScreen";
import FriendsFamilyMemoriesScreen from "../screens/FriendsFamilyMemoriesScreen";
import PatientLoginScreen from "../screens/UserAuth/PatientLoginScreen";
import VoiceRecordingScreen from "../screens/VoiceRecordingScreen";
import ReminderScreen from "../screens/ReminderScreen";
import FamilyMemberScreen from "../screens/AddFmDeviceScreen";
import FamilyMembersPage from "../screens/FamilyMembersPage";
import PatientSignupScreen from "../screens/UserAuth/PatientSignupScreen";
import FamilySignupScreen from "../screens/UserAuth/FamilySignupScreen";
import FamilyLoginScreen from "../screens/UserAuth/FamilyLoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const AppTabNavigator = () => {
  const { t } = useTranslation();
  const theme = ThemeColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "AddReminder") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ title: t("home") }}
      />
      <Tab.Screen
        name="AddReminder"
        component={AddReminderScreen}
        options={{ title: t("addReminder") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t("settings") }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
      <Stack.Screen
        name="CaregiverLoginScreen"
        component={CaregiverLoginScreen}
      />
      <Stack.Screen
        name="CaregiverSignupScreen"
        component={CaregiverSignupScreen}
      />
      <Stack.Screen
        name="PatientSignupScreen"
        component={PatientSignupScreen}
      />
      <Stack.Screen name="PatientLoginScreen" component={PatientLoginScreen} />
      {/* Family  */}
      <Stack.Screen name="FamilySignupScreen" component={FamilySignupScreen} />
      <Stack.Screen name="FamilyLoginScreen" component={FamilyLoginScreen} />

      {/* Main App Screens */}
      <Stack.Screen name="MainApp" component={AppTabNavigator} />
      <Stack.Screen name="PatientHome" component={PatientHome} />
      <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
      <Stack.Screen
        name="AddFamily&DeviceScreen"
        component={FamilyMemberScreen}
      />
      <Stack.Screen name="FamilyMembersPage" component={FamilyMembersPage} />
      <Stack.Screen name="SensorDataScreen" component={SensorScreen} />
      <Stack.Screen
        name="FriendsFamilyMemoriesScreen"
        component={FriendsFamilyMemoriesScreen}
      />
      <Stack.Screen
        name="VoiceRecordingScreen"
        component={VoiceRecordingScreen}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;
