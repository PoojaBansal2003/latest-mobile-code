import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchRemindersAsync } from '../features/reminders/reminderSlice';
import ReminderCard from '../components/ReminderCard';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { reminders, loading, error } = useSelector((state: RootState) => state.reminders);
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchRemindersAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>{t('loading')}...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReminderCard reminder={item} />}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.text, textAlign: 'center', marginTop: 20 }}>
            {t('noReminders')}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
