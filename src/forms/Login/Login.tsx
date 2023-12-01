import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './Login.module.scss';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authStore = useAuthStore();

  const handleLogin = () => {
    authStore.login(username, password);
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
