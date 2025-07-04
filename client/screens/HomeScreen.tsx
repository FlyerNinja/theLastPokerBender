import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ email, onSubmitCard }: { email: string; onSubmitCard: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome {email}</Text>
      <Button title="Submit Card" onPress={onSubmitCard} />
    </View>
  );
}
