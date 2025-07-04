import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SubmitCardScreen from './screens/SubmitCardScreen';

export default function App() {
  const [user, setUser] = useState<{ email: string; id: number } | null>(null);
  const [screen, setScreen] = useState<'login' | 'home' | 'submit'>('login');

  function handleLogin(email: string) {
    setUser({ email, id: 1 });
    setScreen('home');
  }

  if (!user || screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (screen === 'submit') {
    return <SubmitCardScreen userId={user.id} onDone={() => setScreen('home')} />;
  }

  return <HomeScreen email={user.email} onSubmitCard={() => setScreen('submit')} />;
}
