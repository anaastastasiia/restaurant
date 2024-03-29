import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import registrationSchema from '../../schemas/RegistrationSchema';
import styles from './RegisterForm.module.scss';

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema(t),
    onSubmit: async (values) => {
      try {
        const res = await authStore.register(
          values.username,
          values.password,
          values.confirmPassword,
          values.email,
          values.phoneNumber
        );
        if (res) {
          navigate('/');
        }
      } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.registerForm}>
      <div>
        <input
          type="text"
          name="username"
          placeholder={t('pages.login.userName')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className={
            formik.touched.username && formik.errors.username
              ? styles.errorInput
              : ''
          }
        />
        {formik.touched.username && formik.errors.username && (
          <div className={styles.errorText}>{formik.errors.username}</div>
        )}
        <input
          type="email"
          name="email"
          placeholder={t('pages.login.email')}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.email && formik.errors.email ? styles.errorInput : ''
          }
        />
        {formik.touched.email && formik.errors.email && (
          <div className={styles.errorText}>{t(formik.errors.email)}</div>
        )}
        <input
          type="tel"
          name="phoneNumber"
          placeholder={t('pages.login.phoneNumber')}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? styles.errorInput
              : ''
          }
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className={styles.errorText}>{t(formik.errors.phoneNumber)}</div>
        )}
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder={t('pages.login.password')}
          className={
            formik.touched.password && formik.errors.password
              ? styles.errorInput
              : ''
          }
        />
        {formik.touched.password && formik.errors.password && (
          <div className={styles.errorText}>{formik.errors.password}</div>
        )}
        <input
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder={t('pages.login.confirmPassword')}
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? styles.errorInput
              : ''
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className={styles.errorText}>
            {formik.errors.confirmPassword}
          </div>
        )}
      </div>
      <button type="submit">{t('pages.login.register')}</button>
    </form>
  );
};
