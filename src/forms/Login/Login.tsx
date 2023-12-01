import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authStore = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authStore.getUsers();
    await authStore.login(username, password);
    navigate('/');
  };

  return (
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <input
        type="text"
        placeholder={t('pages.login.userName')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder={t('pages.login.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{t('pages.login.login')}</button>
    </form>
  );
};
