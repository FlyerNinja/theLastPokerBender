import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export default function PokerRoomScreen({
  userId,
  fibonacci,
  onBack,
}: {
  userId: number;
  fibonacci: number[];
  onBack: () => void;
}) {
  const [table, setTable] = useState<any[]>([]);
  const [deckCount, setDeckCount] = useState(0);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000/room');
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join', userId }));
    };
    socket.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === 'state') {
        setTable(msg.table);
        setDeckCount(msg.deckCount);
      } else if (msg.type === 'card') {
        setTable((t) => [...t, { card: msg.card, votes: {} }]);
        setDeckCount(msg.deckCount);
      } else if (msg.type === 'vote') {
        setTable((t) =>
          t.map((tc) =>
            tc.card.id === msg.cardId ? { ...tc, votes: { ...tc.votes, [msg.userId]: msg.value } } : tc
          )
        );
      } else if (msg.type === 'end') {
        setTable([]);
      }
    };
    setWs(socket);
    return () => {
      socket.close();
    };
  }, [userId]);

  function drawCard() {
    ws?.send(JSON.stringify({ type: 'draw', userId }));
  }

  function castVote(cardId: number, value: number) {
    ws?.send(JSON.stringify({ type: 'vote', cardId, userId, value }));
  }

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onBack} color={theme.accent} />
      <Text style={styles.text}>Deck: {deckCount}</Text>
      <Button title="Draw Card" onPress={drawCard} color={theme.accent} />
      <FlatList
        style={{ marginTop: 20 }}
        data={table}
        keyExtractor={(i) => i.card.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.card.title}</Text>
            <View style={styles.row}>
              {fibonacci.map((f) => (
                <TouchableOpacity key={f} onPress={() => castVote(item.card.id, f)} style={styles.vote}>
                  <Text style={styles.voteText}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.text}>Votes: {Object.values(item.votes).join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.background },
  text: { color: theme.text, marginBottom: 10 },
  card: { padding: 12, borderBottomWidth: 1, borderColor: theme.accent },
  row: { flexDirection: 'row', marginTop: 10 },
  vote: { backgroundColor: theme.card, padding: 6, marginRight: 6 },
  voteText: { color: theme.text },
  title: { color: theme.text, fontWeight: 'bold' },
});
