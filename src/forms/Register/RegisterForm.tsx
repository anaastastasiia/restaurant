import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import styles from './RegisterForm.module.scss';

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{t('pages.login.register')}</button>
    </form>
  );
};
