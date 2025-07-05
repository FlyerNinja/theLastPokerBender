import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SubmitCardScreen from './screens/SubmitCardScreen';
import CardsListScreen from './screens/CardsListScreen';
import CardLogsScreen from './screens/CardLogsScreen';

export default function App() {
  const [user, setUser] = useState<{ email: string; id: number } | null>(null);
  const [screen, setScreen] = useState<'login' | 'home' | 'submit' | 'cards' | 'logs'>('login');
  const [logCardId, setLogCardId] = useState<number | null>(null);

  function handleLogin(u: { email: string; id: number }) {
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

  return (
    <HomeScreen
      email={user.email}
      onSubmitCard={() => setScreen('submit')}
      onShowCards={() => setScreen('cards')}
    />
  );
}
