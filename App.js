import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import UserTypeScreen from "./src/screens/UserTypeScreen";
import CaregiverLoginScreen from "./src/screens/CaregiverLoginScreen";
import CaregiverSignupScreen from "./src/screens/CaregivenSignupScreen";
import PatientHome from "./src/screens/PatientHome";
import HomeScreen from "./src/screens/HomeScreen";
import SensorScreen from "./src/screens/SensorScreen";
import FriendsFamilyMemoriesScreen from "./src/screens/FriendsFamilyMemoriesScreen";
import PatientLoginScreen from "./src/screens/PatientLoginScreen";
import VoiceRecordingScreen from "./src/screens/VoiceRecordingScreen";
import ReminderScreen from "./src/screens/ReminderScreen";
import FamilyMemberScreen from "./src/screens/AddFmDeviceScreen";
import FamilyMembersPage from "./src/screens/FamilyMembersPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} /> 
        <Stack.Screen name="PatientHome" component={PatientHome} />
        <Stack.Screen name="CaregiverLoginScreen" component={CaregiverLoginScreen}/>
        <Stack.Screen name="CaregiverSignupScreen" component={CaregiverSignupScreen}/>
        <Stack.Screen name="ReminderScreen" component={ReminderScreen}/>
        <Stack.Screen name="AddFamily&DeviceScreen" component={FamilyMemberScreen}/>
        <Stack.Screen name="FamilyMembersPage" component={FamilyMembersPage}/>
        <Stack.Screen name="SensorDataScreen" component={SensorScreen}/>
        <Stack.Screen name="FriendsFamilyMemoriesScreen" component={FriendsFamilyMemoriesScreen} />
        <Stack.Screen name="PatientLoginScreen" component={PatientLoginScreen} />
        <Stack.Screen name="VoiceRecordingScreen" component={VoiceRecordingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
