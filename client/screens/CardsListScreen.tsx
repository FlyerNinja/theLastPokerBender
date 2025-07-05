import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { API_URL } from '../api';
import { theme } from '../theme';

export interface Card {
  id: number;
  title: string;
  description?: string;
}

export default function CardsListScreen({
  onBack,
  onShowLogs,
}: {
  onBack: () => void;
  onShowLogs: (id: number) => void;
}) {
  const [cards, setCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadCards() {
    setRefreshing(true);
    try {
      const res = await fetch(`${API_URL}/cards`);
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error('Failed to load cards');
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <View style={[styles.container]}> 
      <Button title="Back" onPress={onBack} color={theme.accent} />
      <FlatList
        style={{ marginTop: 10 }}
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadCards} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onShowLogs(item.id)} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.description ? <Text style={styles.cardText}>{item.description}</Text> : null}
          </TouchableOpacity>
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
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: theme.accent,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: theme.text,
  },
  cardText: {
    color: theme.text,
  },
});
