import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import styles from './RegisterForm.module.scss';

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authStore = useAuthStore();

  const handleRegister = () => {
    // authStore.register(username, password);
  };

  return (
    <form onSubmit={handleRegister} className={styles.registerForm}>
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
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};
