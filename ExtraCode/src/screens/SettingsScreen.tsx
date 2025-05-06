import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { List, Text } from 'react-native-paper';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
        <List.Item
          title={t('darkMode')}
          right={() => (
            <Switch
              value={theme.dark}
              onValueChange={toggleTheme}
              thumbColor={theme.colors.primary}
            />
          )}
        />
        <List.Item
          title={t('language')}
          description={i18n.language === 'en' ? 'English' : 'हिंदी'}
          right={() => (
            <Switch
              value={i18n.language === 'hi'}
              onValueChange={toggleLanguage}
              thumbColor={theme.colors.primary}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsScreen;
