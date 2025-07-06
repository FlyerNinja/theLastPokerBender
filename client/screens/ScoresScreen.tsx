import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '../api';
import { theme } from '../theme';

interface UserKpi {
  id: number;
  email: string;
  display_name: string | null;
  score: number;
  cards_created: number;
  votes: number;
}

interface Summary {
  team: { total_cards: number; total_votes: number };
  users: UserKpi[];
}

export default function ScoresScreen({ onBack }: { onBack: () => void }) {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/kpi/summary`)
      .then((res) => res.json())
      .then(setSummary)
      .catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onBack} color={theme.accent} />
      {summary && (
        <View style={styles.row}>
          <Text style={styles.text}>
            Team Cards: {summary.team.total_cards} | Votes: {summary.team.total_votes}
          </Text>
        </View>
      )}
      <FlatList
        style={{ marginTop: 10 }}
        data={summary?.users || []}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>
              {item.email} - Score {item.score} - Created {item.cards_created} - Votes {item.votes}
            </Text>
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
