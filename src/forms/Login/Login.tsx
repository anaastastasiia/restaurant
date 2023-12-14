import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import loginSchema from '../../schemas/LoginSchema';
import styles from './Login.module.scss';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema(t),
    onSubmit: async (values) => {
      try {
        await authStore.getUsers();
        const res = await authStore.login(values.username, values.password);
        if (res) {
          navigate('/');
          setPasswordError(null);
        } else {
          setPasswordError(t('pages.login.invalidData'));
        }
      } catch (error) {
        console.error('Błąd podczas logowania:', error);
        setPasswordError(t('pages.login.invalidData'));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
      <div className={styles.contentFormWrapper}>
        <input
          type="text"
          name="username"
          placeholder={t('pages.login.userName')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className={
            (formik.touched.username && formik.errors.username) || passwordError
              ? styles.errorInput
              : ''
          }
        />
        {formik.touched.username && formik.errors.username && (
          <div className={styles.errorText}>{formik.errors.username}</div>
        )}
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder={t('pages.login.password')}
          className={
            (formik.touched.password && formik.errors.password) || passwordError
              ? styles.errorInput
              : ''
          }
        />
        {formik.touched.password && formik.errors.password && (
          <div className={styles.errorText}>{formik.errors.password}</div>
        )}
        {passwordError && (
          <div className={styles.errorText}>{passwordError}</div>
        )}
      </div>
      <button type="submit">{t('pages.login.login')}</button>
    </form>
  );
};
