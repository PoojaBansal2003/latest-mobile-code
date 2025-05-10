import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Core app translations
      myProfile: "My Profile",
      home: "Home",
      addReminder: "Add Reminder",
      settings: "Settings",
      reminderTitle: "Reminder Title",
      selectTime: "Select Time",
      darkMode: "Dark Mode",
      language: "Language",
      loading: "Loading",
      noReminders: "No reminders yet",
      time: "Time",

      // Settings Screen - completely flat structure with prefixes
      settingsAppearance: "Appearance",
      settingsAccount: "Account",
      settingsAbout: "About & Support",
      settingsLogout: "Logout",
      settingsLogoutConfirmTitle: "Logout",
      settingsLogoutConfirmMessage: "Are you sure you want to logout?",
      settingsLogoutError: "Failed to logout. Please try again.",
      settingsGuest: "Guest",
      settingsProfile: "Profile",
      settingsProfileDescription: "Manage your profile information",
      settingsSecurity: "Security",
      settingsSecurityDescription: "Change password and security settings",
      settingsNotifications: "Notifications",
      settingsNotificationsDescription: "Manage notification preferences",
      settingsHelp: "Help & Support",
      settingsPrivacy: "Privacy Policy",
      settingsTerms: "Terms of Service",
      settingsVersion: "App Version",

      // Common translations
      commonCancel: "Cancel",
      commonLogout: "Logout",
      commonError: "Error",
    },
  },
  hi: {
    translation: {
      // Core app translations
      myProfile: "मेरी प्रोफाइल",
      home: "होम",
      addReminder: "अनुस्मारक जोड़ें",
      settings: "सेटिंग्स",
      reminderTitle: "अनुस्मारक शीर्षक",
      selectTime: "समय चुनें",
      darkMode: "डार्क मोड",
      language: "भाषा",
      loading: "लोड हो रहा है",
      noReminders: "अभी तक कोई अनुस्मारक नहीं",
      time: "समय",

      // Settings Screen - completely flat structure with prefixes
      settingsAppearance: "प्रकटन",
      settingsAccount: "खाता",
      settingsAbout: "सहायता एवं जानकारी",
      settingsLogout: "लॉग आउट",
      settingsLogoutConfirmTitle: "लॉग आउट",
      settingsLogoutConfirmMessage: "क्या आप वाकई लॉग आउट करना चाहते हैं?",
      settingsLogoutError: "लॉगआउट विफल। कृपया पुनः प्रयास करें।",
      settingsGuest: "अतिथि",
      settingsProfile: "प्रोफ़ाइल",
      settingsProfileDescription: "अपनी प्रोफ़ाइल जानकारी प्रबंधित करें",
      settingsSecurity: "सुरक्षा",
      settingsSecurityDescription: "पासवर्ड और सुरक्षा सेटिंग्स बदलें",
      settingsNotifications: "सूचनाएं",
      settingsNotificationsDescription: "सूचना वरीयताएं प्रबंधित करें",
      settingsHelp: "सहायता एवं समर्थन",
      settingsPrivacy: "गोपनीयता नीति",
      settingsTerms: "सेवा की शर्तें",
      settingsVersion: "ऐप संस्करण",

      // Common translations
      commonCancel: "रद्द करें",
      commonLogout: "लॉग आउट",
      commonError: "त्रुटि",
    },
  },
};

// Simpler initialization with flattened structure
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  // Disable nesting feature to avoid potential issues
  nsSeparator: false,
  keySeparator: false,
});

export default i18n;
