import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

const FamilyMembersPage = () => {
  // Mock data with 4 family members
  const familyMembers = [
    {
      id: 1,
      name: "John Doe",
      relationship: "Father",
      deviceId: "DEV-789XYZ",
      caretaker: "Sarah Smith",
      lastActive: "2h ago",
      status: "connected"
    },
    {
      id: 2,
      name: "Jane Smith",
      relationship: "Mother",
      deviceId: "DEV-456ABC",
      caretaker: "Michael Johnson",
      lastActive: "5h ago",
      status: "disconnected"
    },
    {
      id: 3,
      name: "Emily Johnson",
      relationship: "Sister",
      deviceId: "DEV-123DEF",
      caretaker: "David Wilson",
      lastActive: "30m ago",
      status: "connected"
    },
    {
      id: 4,
      name: "Michael Brown",
      relationship: "Son",
      deviceId: "DEV-987ZYX",
      caretaker: "Laura Taylor",
      lastActive: "12h ago",
      status: "connected"
    }
  ];

  // Button handlers
  const handleEdit = (memberId) => {
    Alert.alert("Edit Member", "Edit functionality would go here");
  };

  const handleRemove = (memberId) => {
    Alert.alert(
      "Remove Member",
      "Are you sure you want to remove this family member?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => console.log("Removing member:", memberId) }
      ]
    );
  };

  const handleAddMember = () => {
    Alert.alert("Add Member", "Add new member functionality would go here");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Family Members Dashboard</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {familyMembers.map((member) => (
          <View key={member.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.memberName}>{member.name}</Text>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: member.status === 'connected' ? '#4CAF50' : '#F44336' }
              ]} />
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Relationship:</Text>
              <Text style={styles.detailValue}>{member.relationship}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Device ID:</Text>
              <Text style={styles.detailValue}>{member.deviceId}</Text>
            </View>
            
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Caretaker Details</Text>
              <View style={styles.caretakerInfo}>
                <Text style={styles.caretakerName}>📞 {member.caretaker}</Text>
                <Text style={styles.lastActive}>Last active: {member.lastActive}</Text>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEdit(member.id)}
              >
                <Text style={styles.buttonText}>Edit Details</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemove(member.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddMember}
      >
        <Text style={styles.addButtonText}>+ Add Family Member</Text>
      </TouchableOpacity>
    </View>
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
    color: "#FFF",
    fontWeight: "600",
    marginBottom: 25,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#1B263B",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  memberName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    color: "#E0E1DD",
    fontSize: 14,
    opacity: 0.8,
  },
  detailValue: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  detailSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#415A77",
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  caretakerInfo: {
    backgroundColor: "#2A3E5C",
    borderRadius: 10,
    padding: 15,
  },
  caretakerName: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 5,
  },
  lastActive: {
    color: "#888",
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "#415A77",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  removeButton: {
    backgroundColor: "#5C2A3E",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#415A77",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default FamilyMembersPage;