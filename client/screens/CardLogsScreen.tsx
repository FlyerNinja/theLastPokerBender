import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { API_URL } from '../api';
import { theme } from '../theme';

interface LogEntry {
  id: number;
  action: string;
  details: any;
  user_id: number;
  created_at: string;
}

export default function CardLogsScreen({
  cardId,
  onBack,
}: {
  cardId: number;
  onBack: () => void;
}) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/cards/${cardId}/logs`)
      .then((res) => res.json())
      .then(setLogs)
      .catch(() => {});
  }, [cardId]);

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onBack} color={theme.accent} />
      <FlatList
        style={{ marginTop: 10 }}
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>{item.action}</Text>
            <Text style={styles.logText}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  logItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: theme.accent,
  },
  logText: {
    color: theme.text,
  },
});
