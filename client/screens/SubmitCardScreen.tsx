import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function SubmitCardScreen({ userId, onDone }: { userId: number; onDone: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      const res = await fetch('http://localhost:4000/cards', {
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Submit Card</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
