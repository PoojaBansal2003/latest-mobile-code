// src/components/LoadingIndicator.js
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";

const LoadingIndicator = ({
  size = "large",
  color = colors.primary,
  text = "",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 10,
    color: colors.gray,
    fontSize: 16,
  },
});

export default LoadingIndicator;
