import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const ReminderCard = ({ reminder }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const reminderTime = new Date(reminder.time).toLocaleTimeString();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Title style={{ color: theme.colors.text }}>{reminder.title}</Title>
        <Paragraph style={{ color: theme.colors.text }}>
          {t('time')}: {reminderTime}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
});

export default ReminderCard;
