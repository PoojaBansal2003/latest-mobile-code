import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

export default function VoiceRecordingScreen() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [selectedRecording, setSelectedRecording] = React.useState(null);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true, //bg voice remover and khalli nhii jani chahiye voice 
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      console.log("Error starting recording: ", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 
      ? `${Math.floor(minutes)}:0${seconds}` 
      : `${Math.floor(minutes)}:${seconds}`;
  }

  async function selectAudioFile() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
      if (result.type === 'success') {
        const { uri, name } = result;
        const { sound, status } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        );
        setRecordings([
          ...recordings,
          { sound: sound, duration: getDurationFormatted(status.durationMillis), file: uri },
        ]);
      }
    } catch (err) {
      console.log("Error selecting audio file: ", err);
    }
  }

  function deleteRecording(index) {
    const newRecordings = [...recordings];
    newRecordings.splice(index, 1); // Remove the recording at the given index
    setRecordings(newRecordings);
  }

  function deleteAllRecordings() {
    setRecordings([]);
  }

  function renderItem({ item, index }) {
    return (
      <View style={styles.recordingItem}>
        <Text style={styles.recordingText}>
          Recording #{index + 1} | {item.duration}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.playButton]} 
            onPress={() => item.sound.replayAsync()}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            onPress={() => deleteRecording(index)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Recording App</Text>
      <TouchableOpacity 
        style={[styles.button, styles.recordButton]} 
        onPress={recording ? stopRecording : startRecording}>
        <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>

      <FlatList
        data={recordings}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.recordingsList}
      />

      <TouchableOpacity 
        style={[styles.button, styles.clearButton]} 
        onPress={deleteAllRecordings}
        disabled={recordings.length === 0}>
        <Text style={styles.buttonText}>Delete All</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.selectButton]} 
        onPress={selectAudioFile}>
        <Text style={styles.buttonText}>Select Audio File</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  selectButton: {
    backgroundColor: '#2196F3',
  },
  clearButton: {
    backgroundColor: '#f44336',
    marginTop: 20,
  },
  recordButton: {
    backgroundColor: '#FF9800',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  recordingsList: {
    width: '100%',
    marginTop: 20,
  },
  recordingItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordingText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    marginLeft: 10,
  },
});
