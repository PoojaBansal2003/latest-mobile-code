// src/screens/DetailsGatheringScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPatientDetails } from "../../features/details/patientSlice";
import { getCaregiverDetails } from "../../features/details/caregiverSlice";
import { getFamilyMembers } from "../../features/details/familyMemberSlice";
import ApiCallLog from "../../components/ApiCallLog";
import LoadingIndicator from "../../components/LoadingIndicator";
import { colors } from "../../constants/colors";

const DetailsGatheringScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [logs, setLogs] = useState([]);
  const [overallStatus, setOverallStatus] = useState("loading"); // 'loading', 'success', 'error'
  const logIdCounter = useRef(0);

  const patientState = useSelector((state) => state.patient);
  const caregiverState = useSelector((state) => state.caregiver);
  const familyMemberState = useSelector((state) => state.familyMembers);

  const addLog = (message, status) => {
    const uniqueId = `log-${Date.now()}-${logIdCounter.current}`;
    logIdCounter.current += 1;
    setLogs((prev) => [...prev, { id: uniqueId, message, status }]);
  };

  const fetchAllDetails = async () => {
    try {
      setOverallStatus("loading");
      // Clear previous logs when retrying
      setLogs([]);
      // Reset counter when starting fresh
      logIdCounter.current = 0;

      addLog("Starting data synchronization...", "info");

      // Fetch patient details
      addLog("Fetching patient information...", "info");
      await dispatch(getPatientDetails({ token, patientId })).unwrap();
      addLog("Patient data loaded successfully", "success");

      // // Fetch caregiver details
      // addLog("Fetching caregiver information...", "info");
      // await dispatch(getCaregiverDetails({ token, patientId })).unwrap();
      // addLog("Caregiver data loaded successfully", "success");

      // // Fetch family members
      // addLog("Fetching family members...", "info");
      // await dispatch(getFamilyMembers({ token, patientId })).unwrap();
      // addLog("Family members loaded successfully", "success");

      setOverallStatus("success");
      addLog("All data loaded successfully!", "success");

      // Navigate to patient details after a brief delay to show success
      setTimeout(() => {
        navigation.navigate("MainApp", { screen: "Home" });
      }, 1000);
    } catch (error) {
      setOverallStatus("error");
      addLog(`Data synchronization failed: ${error}`, "error");
    }
  };

  // Extract fetchAllDetails function to make it reusable for retry functionality
  useEffect(() => {
    fetchAllDetails();
  }, []);

  const handleTryAgain = () => {
    fetchAllDetails();
  };

  if (overallStatus === "loading" && logs.length === 0) {
    return (
      <View style={styles.fullScreenLoading}>
        <LoadingIndicator text="Preparing to load your data..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gathering Your Data</Text>
      <Text style={styles.subtitle}>
        Please wait while we load your information
      </Text>

      <ScrollView style={styles.logsContainer}>
        {logs.map((log) => (
          <ApiCallLog key={log.id} message={log.message} status={log.status} />
        ))}
      </ScrollView>

      {overallStatus === "loading" && (
        <View style={styles.loadingFooter}>
          <LoadingIndicator size="small" text="Loading remaining data..." />
        </View>
      )}

      {overallStatus === "error" && (
        <View style={styles.errorFooter}>
          <Text style={styles.errorText}>
            Some data failed to load. You can try again or continue with partial
            data.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={handleTryAgain}
            >
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.replace("MainApp", "Home")}
            >
              <Text style={styles.continueButtonText}>Continue Anyway</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  fullScreenLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 20,
  },
  logsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  loadingFooter: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  errorFooter: {
    padding: 15,
    backgroundColor: colors.errorLight,
    borderRadius: 8,
  },
  errorText: {
    color: colors.error,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tryAgainButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  tryAgainButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    flex: 1,
  },
  continueButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default DetailsGatheringScreen;
