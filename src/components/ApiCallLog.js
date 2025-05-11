import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const statusColors = {
  info: colors.primary,
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
};

const ApiCallLog = ({ message, status = "info" }) => {
  const iconName = {
    info: "information-circle-outline",
    success: "checkmark-circle-outline",
    error: "close-circle-outline",
    warning: "warning-outline",
  }[status];

  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName}
        size={20}
        color={statusColors[status]}
        style={styles.icon}
      />
      <Text style={[styles.message, { color: statusColors[status] }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
});

export default ApiCallLog;
