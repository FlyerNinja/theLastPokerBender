import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { API_URL } from '../api';
import { theme } from '../theme';

export default function LoginScreen({ onLogin }: { onLogin: (user: { id: number; email: string }) => void }) {
  const [email, setEmail] = useState('');

  async function handleLogin() {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
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
    <View style={styles.container}>
      <View style={styles.dialog}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} color={theme.accent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  dialog: {
    width: '80%',
    padding: 20,
    backgroundColor: theme.card,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: theme.text,
  },
  input: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderColor: theme.accent,
    color: theme.text,
    width: '100%',
  },
});
