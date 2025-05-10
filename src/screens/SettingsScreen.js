import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "../themes/ThemeContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/auth/authSlice";

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    Alert.alert(
      t("settings.logoutConfirmTitle"),
      t("settings.logoutConfirmMessage"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.logout"),
          onPress: () => {
            dispatch(logoutSuccess())
              .then(() => {
                navigation.navigate("Welcome");
              })
              .catch((error) => {
                Alert.alert(t("common.error"), t("settings.logoutError"));
              });
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderListItem = ({
    icon,
    title,
    description,
    onPress,
    rightComponent,
  }) => (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.listItemLeft}>
        {icon && (
          <Text style={[styles.listIcon, { color: theme.colors.primary }]}>
            {icon}
          </Text>
        )}
        <View style={styles.listTextContainer}>
          <Text style={[styles.listItemTitle, { color: theme.colors.text }]}>
            {title}
          </Text>
          {description && (
            <Text
              style={[
                styles.listItemDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
      {rightComponent && (
        <View style={styles.listItemRight}>{rightComponent}</View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View
          style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.avatarText}>
            {user?.name ? user.name.substring(0, 2).toUpperCase() : "??"}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user?.name || t("settings.guest")}
          </Text>
          <Text
            style={[styles.userEmail, { color: theme.colors.textSecondary }]}
          >
            {user?.email || ""}
          </Text>
        </View>
      </View>

      <View
        style={[styles.divider, { backgroundColor: theme.colors.border }]}
      />

      {/* Appearance Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
          {t("settings.appearance")}
        </Text>
        {renderListItem({
          icon: "🌓",
          title: t("settings.darkMode"),
          rightComponent: (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor={theme.colors.primary}
              trackColor={{
                false: theme.colors.surfaceVariant,
                true: theme.colors.primaryContainer,
              }}
            />
          ),
        })}
        {renderListItem({
          icon: "🌐",
          title: t("settings.language"),
          description: i18n.language === "en" ? "English" : "हिन्दी",
          rightComponent: (
            <Switch
              value={i18n.language === "hi"}
              onValueChange={toggleLanguage}
              thumbColor={theme.colors.primary}
              trackColor={{
                false: theme.colors.surfaceVariant,
                true: theme.colors.primaryContainer,
              }}
            />
          ),
        })}
      </View>

      <View
        style={[styles.divider, { backgroundColor: theme.colors.border }]}
      />

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
          {t("settings.account")}
        </Text>
        {renderListItem({
          icon: "👤",
          title: t("settings.profile"),
          description: t("settings.profileDescription"),
          onPress: () => navigation.navigate("Profile"),
        })}
        {renderListItem({
          icon: "🔒",
          title: t("settings.security"),
          description: t("settings.securityDescription"),
          onPress: () => navigation.navigate("Security"),
        })}
        {renderListItem({
          icon: "🔔",
          title: t("settings.notifications"),
          description: t("settings.notificationsDescription"),
          onPress: () => navigation.navigate("Notifications"),
        })}
      </View>

      <View
        style={[styles.divider, { backgroundColor: theme.colors.border }]}
      />

      {/* About & Support */}
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
          {t("settings.about")}
        </Text>
        {renderListItem({
          icon: "❓",
          title: t("settings.help"),
          onPress: () => navigation.navigate("Help"),
        })}
        {renderListItem({
          icon: "🛡️",
          title: t("settings.privacy"),
          onPress: () => navigation.navigate("Privacy"),
        })}
        {renderListItem({
          icon: "📄",
          title: t("settings.terms"),
          onPress: () => navigation.navigate("Terms"),
        })}
        {renderListItem({
          icon: "ℹ️",
          title: t("settings.version"),
          description: "1.0.0",
        })}
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <Text
            style={[styles.logoutButtonText, { color: theme.colors.onError }]}
          >
            {t("settings.logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 8,
    opacity: 0.7,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  listIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  listTextContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
  },
  listItemDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  listItemRight: {
    marginLeft: 16,
  },
  logoutSection: {
    padding: 20,
    marginTop: 16,
  },
  logoutButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
