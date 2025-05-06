import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const FamilyMemberScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    // Handle save logic here
    console.log({ name, phone, address });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Family Member</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+1 234 567 890"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Street, City, Country"
          placeholderTextColor="#666"
          multiline
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Family Member</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    padding: 20,
  },
  header: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    color: "#E0E1DD",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1B263B",
    borderRadius: 10,
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#415A77",
    padding: 20,
    borderRadius: 15,
    marginVertical: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default FamilyMemberScreen;