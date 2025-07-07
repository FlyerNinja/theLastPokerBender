import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SubmitCardScreen from './screens/SubmitCardScreen';
import CardsListScreen from './screens/CardsListScreen';
import CardLogsScreen from './screens/CardLogsScreen';
import PokerRoomScreen from './screens/PokerRoomScreen';
import ScoresScreen from './screens/ScoresScreen';

export default function App() {
  const [user, setUser] = useState<
    | { email: string; id: number; fibonacci: number[] }
    | null
  >(null);
  const [screen, setScreen] = useState<'login' | 'home' | 'submit' | 'cards' | 'logs' | 'room' | 'scores'>('login');
  const [logCardId, setLogCardId] = useState<number | null>(null);

  function handleLogin(u: { email: string; id: number; fibonacci: number[] }) {
    setUser(u);
    setScreen('home');
  }

  if (!user || screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (screen === 'submit') {
    return <SubmitCardScreen userId={user.id} onDone={() => setScreen('home')} />;
  }

  if (screen === 'cards') {
    return (
      <CardsListScreen
        onBack={() => setScreen('home')}
        onShowLogs={(id) => {
          setLogCardId(id);
          setScreen('logs');
        }}
      />
    );
  }

  if (screen === 'logs' && logCardId !== null) {
    return (
      <CardLogsScreen
        cardId={logCardId}
        onBack={() => setScreen('cards')}
      />
    );
  }

  if (screen === 'room') {
    return (
      <PokerRoomScreen
        userId={user.id}
        fibonacci={user.fibonacci}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'scores') {
    return <ScoresScreen onBack={() => setScreen('home')} />;
  }

  return (
    <HomeScreen
      email={user.email}
      onSubmitCard={() => setScreen('submit')}
      onShowCards={() => setScreen('cards')}
      onEnterRoom={() => setScreen('room')}
      onShowScores={() => setScreen('scores')}
    />
  );
}
