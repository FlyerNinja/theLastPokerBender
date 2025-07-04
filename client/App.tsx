import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SubmitCardScreen from './screens/SubmitCardScreen';
import CardsListScreen from './screens/CardsListScreen';

export default function App() {
  const [user, setUser] = useState<{ email: string; id: number } | null>(null);
  const [screen, setScreen] = useState<'login' | 'home' | 'submit' | 'cards'>('login');

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
    return <CardsListScreen onBack={() => setScreen('home')} />;
  }

  return (
    <HomeScreen
      email={user.email}
      onSubmitCard={() => setScreen('submit')}
      onShowCards={() => setScreen('cards')}
    />
  );
}
