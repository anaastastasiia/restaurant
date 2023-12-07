import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Notification from '../../components/Notification';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authStore = useAuthStore();
  const [toasterData, setToasterData] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToasterData({ message, type });

    setTimeout(() => {
      setToasterData(null);
    }, 100000);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    showToast('Success', 'success');
    e.preventDefault();
    await authStore.getUsers();
    const res = await authStore.login(username, password);
    if (res) {
      navigate('/');
    }
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
      {toasterData && (
        <Notification message={toasterData.message} type={toasterData.type} />
      )}
    </form>
  );
};
