import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch } from 'react-redux';
import { addReminderAsync } from '../features/reminders/reminderSlice';
import { useTheme } from '../themes/ThemeContext';
import { useTranslation } from 'react-i18next';

const AddReminderScreen = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    dispatch(
      addReminderAsync({
        title,
        time: date.toISOString(),
      })
    );
    setTitle('');
    setDate(new Date());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        label={t('reminderTitle')}
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
        theme={{ colors: { text: theme.colors.text } }}
      />
      <Button
        mode="outlined"
        onPress={showDatePicker}
        style={styles.button}
        labelStyle={{ color: theme.colors.primary }}
      >
        {t('selectTime')}: {date.toLocaleTimeString()}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={{ color: theme.colors.onPrimary }}
        disabled={!title.trim()}
      >
        {t('addReminder')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default AddReminderScreen;
