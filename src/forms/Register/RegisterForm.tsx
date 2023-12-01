import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.scss';

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authStore = useAuthStore();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authStore.getUsers();
    const res = await authStore.register(username, password, confirmPassword);
    if (res) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.registerForm}>
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
      <input
        type="password"
        placeholder={t('pages.login.confirmPassword')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">{t('pages.login.register')}</button>
    </form>
  );
};
