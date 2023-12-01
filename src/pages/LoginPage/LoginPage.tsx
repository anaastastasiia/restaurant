import { useState } from 'react';
import LoginForm from '../../forms/Login';
import { RegisterForm } from '../../forms/Register';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const [isAccount, setIsAccount] = useState(true);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.infoWrapper}>
            <div className={styles.logo}>RADISH</div>
            <div className={styles.celebrate}>
              {isAccount ? 'Zaloguj się' : 'Zarejestruj się'}
            </div>
          </div>
        </div>
        <div className={styles.formWrapper}>
          {isAccount ? (
            <div className={styles.contentWrapper}>
              <LoginForm />
              <div className={styles.askWrapper}>
                Nie masz konta?{' '}
                <b onClick={() => setIsAccount(false)}>Zarejestruj się</b>
              </div>
            </div>
          ) : (
            <div className={styles.contentWrapper}>
              <RegisterForm />
              <div className={styles.askWrapper}>
                Nie masz konta?{' '}
                <b onClick={() => setIsAccount(true)}>Zaloguj się</b>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
