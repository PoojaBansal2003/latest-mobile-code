import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PatientHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Patient</Text>
    </View>
  );
};

export default PatientHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});
