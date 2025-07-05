import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function HomeScreen({
  email,
  onSubmitCard,
  onShowCards,
}: {
  email: string;
  onSubmitCard: () => void;
  onShowCards: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {email}</Text>
      <Button title="Submit Card" onPress={onSubmitCard} color={theme.accent} />
      <View style={{ height: 12 }} />
      <Button title="View Cards" onPress={onShowCards} color={theme.accent} />
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
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: theme.text,
  },
});
