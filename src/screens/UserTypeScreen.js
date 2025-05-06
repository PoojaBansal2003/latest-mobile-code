import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const UserSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (selectedRole === "patient") {
      navigation.navigate("CaregiverLoginScreen");
    } else if (selectedRole === "caregiver") {
      navigation.navigate("VoiceRecordingScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a</Text>

      {/* Patient Selection */}
      <TouchableOpacity
        style={[
          styles.circle,
          selectedRole === "patient" && styles.selectedCircle,
        ]}
        onPress={() => setSelectedRole("patient")}
      >
        <FontAwesome5 name="user-injured" size={40} color="#4CAF50" />
        <Text style={styles.label}>Patient</Text>
      </TouchableOpacity>

        {/* Caregiver Selection */}
        <TouchableOpacity
        style={[
          styles.circle,
          selectedRole === "caregiver" && styles.selectedCircle,
        ]}
        onPress={() => setSelectedRole("caregiver")}
      >
        <FontAwesome5 name="user-nurse" size={40} color="#ff6b6b" />
        <Text style={styles.label}>Caregiver</Text>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedRole && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFD9D9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "transparent",
    shadowColor: "transparent",
  },
  selectedCircle: {
    borderColor: "#800080",
    shadowColor: "#800080",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#800080",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 25,
    position: "absolute",
    bottom: 40,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
