import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '../api';
import { theme } from '../theme';

interface Score { user_id: number; points: number }

export default function ScoresScreen({ onBack }: { onBack: () => void }) {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/scores`)
      .then((res) => res.json())
      .then(setScores)
      .catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onBack} color={theme.accent} />
      <FlatList
        style={{ marginTop: 10 }}
        data={scores}
        keyExtractor={(i) => i.user_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>User {item.user_id}: {item.points}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.background },
  row: { padding: 12, borderBottomWidth: 1, borderColor: theme.accent },
  text: { color: theme.text },
});
