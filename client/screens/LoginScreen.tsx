import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

export default function LoginScreen({ onLogin }: { onLogin: (user: { id: number; email: string }) => void }) {
  const [email, setEmail] = useState('');

  async function handleLogin() {
    try {
      const res = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      onLogin(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to login');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
