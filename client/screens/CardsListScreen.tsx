import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Button } from 'react-native';

export interface Card {
  id: number;
  title: string;
  description?: string;
}

export default function CardsListScreen({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadCards() {
    setRefreshing(true);
    try {
      const res = await fetch('http://localhost:4000/cards');
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
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Back" onPress={onBack} />
      <FlatList
        style={{ marginTop: 10 }}
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadCards} />}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            {item.description ? <Text>{item.description}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}
