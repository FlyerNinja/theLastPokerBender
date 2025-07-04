import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
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
      <Button title="Login" onPress={() => onLogin(email)} />
    </View>
  );
}
