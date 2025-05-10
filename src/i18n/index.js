import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      myProfile: "My Profile",
      home: "Home",
      addReminder: "Add Reminder",
      settings: "Settings",
      reminderTitle: "Reminder Title",
      selectTime: "Select Time",
      addReminder: "Add Reminder",
      darkMode: "Dark Mode",
      language: "Language",
      loading: "Loading",
      noReminders: "No reminders yet",
      time: "Time",

      // Settings Screen Translations
      settings: {
        appearance: "Appearance",
        account: "Account",
        about: "About & Support",
        logout: "Logout",
        logoutConfirmTitle: "Logout",
        logoutConfirmMessage: "Are you sure you want to logout?",
        logoutError: "Failed to logout. Please try again.",
        guest: "Guest",
        profile: "Profile",
        profileDescription: "Manage your profile information",
        security: "Security",
        securityDescription: "Change password and security settings",
        notifications: "Notifications",
        notificationsDescription: "Manage notification preferences",
        help: "Help & Support",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        version: "App Version",
      },
      common: {
        cancel: "Cancel",
        logout: "Logout",
        error: "Error",
      },
    },
  },
  hi: {
    translation: {
      myProfile: "मेरी प्रोफाइल",
      home: "होम",
      addReminder: "अनुस्मारक जोड़ें",
      settings: "सेटिंग्स",
      reminderTitle: "अनुस्मारक शीर्षक",
      selectTime: "समय चुनें",
      addReminder: "अनुस्मारक जोड़ें",
      darkMode: "डार्क मोड",
      language: "भाषा",
      loading: "लोड हो रहा है",
      noReminders: "अभी तक कोई अनुस्मारक नहीं",
      time: "समय",

      // Settings Screen Translations
      settings: {
        appearance: "प्रकटन",
        account: "खाता",
        about: "सहायता एवं जानकारी",
        logout: "लॉग आउट",
        logoutConfirmTitle: "लॉग आउट",
        logoutConfirmMessage: "क्या आप वाकई लॉग आउट करना चाहते हैं?",
        logoutError: "लॉगआउट विफल। कृपया पुनः प्रयास करें।",
        guest: "अतिथि",
        profile: "प्रोफ़ाइल",
        profileDescription: "अपनी प्रोफ़ाइल जानकारी प्रबंधित करें",
        security: "सुरक्षा",
        securityDescription: "पासवर्ड और सुरक्षा सेटिंग्स बदलें",
        notifications: "सूचनाएं",
        notificationsDescription: "सूचना वरीयताएं प्रबंधित करें",
        help: "सहायता एवं समर्थन",
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें",
        version: "ऐप संस्करण",
      },
      common: {
        cancel: "रद्द करें",
        logout: "लॉग आउट",
        error: "त्रुटि",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
