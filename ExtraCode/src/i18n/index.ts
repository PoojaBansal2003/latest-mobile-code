import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      addReminder: 'Add Reminder',
      settings: 'Settings',
      reminderTitle: 'Reminder Title',
      selectTime: 'Select Time',
      darkMode: 'Dark Mode',
      language: 'Language',
      loading: 'Loading',
      noReminders: 'No reminders yet',
      time: 'Time',
    },
  },
  hi: {
    translation: {
      home: 'होम',
      addReminder: 'अनुस्मारक जोड़ें',
      settings: 'सेटिंग्स',
      reminderTitle: 'अनुस्मारक शीर्षक',
      selectTime: 'समय चुनें',
      darkMode: 'डार्क मोड',
      language: 'भाषा',
      loading: 'लोड हो रहा है',
      noReminders: 'अभी तक कोई अनुस्मारक नहीं',
      time: 'समय',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
