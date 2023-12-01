import { useState } from 'react';
import LoginForm from '../../forms/Login';
import { RegisterForm } from '../../forms/Register';
import { useTranslation } from 'react-i18next';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const { t } = useTranslation();
  const [isAccount, setIsAccount] = useState(true);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.infoWrapper}>
            <div className={styles.logo}>RADISH</div>
            <div className={styles.celebrate}>
              {isAccount ? t('pages.login.login') : t('pages.login.register')}
            </div>
          </div>
        </div>
        <div className={styles.formWrapper}>
          {isAccount ? (
            <div className={styles.contentWrapper}>
              <LoginForm />
              <div className={styles.askWrapper}>
                {t('pages.login.hasNotAccount')}{' '}
                <b onClick={() => setIsAccount(false)}>
                  {t('pages.login.register')}
                </b>
              </div>
            </div>
          ) : (
            <div className={styles.contentWrapper}>
              <RegisterForm />
              <div className={styles.askWrapper}>
                {t('pages.login.hasAccount')}{' '}
                <b onClick={() => setIsAccount(true)}>
                  {t('pages.login.login')}
                </b>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
