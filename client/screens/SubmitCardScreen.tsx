import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { API_URL } from '../api';
import { theme } from '../theme';

export default function SubmitCardScreen({ userId, onDone }: { userId: number; onDone: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title, description }),
      });
      const data = await res.json();
      Alert.alert('Card Created', `ID ${data.id}`);
      setTitle('');
      setDescription('');
      onDone();
    } catch (err) {
      Alert.alert('Error', 'Failed to submit');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Card</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} color={theme.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: theme.text,
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderColor: theme.accent,
    color: theme.text,
  },
});
