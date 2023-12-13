import { useTranslation } from 'react-i18next';
import { CustomLink } from '../CustomLink';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuthStore } from '../../store/authStore';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  const { t } = useTranslation();
  const authStore = useAuthStore();

  return (
    <header className={styles.header}>
      <div className={styles.menuWrapper}>
<<<<<<< HEAD
        <CustomLink to="/">{t('header.start')}</CustomLink>
        <CustomLink to="/contact">{t('header.contact')}</CustomLink>
        <CustomLink to="/menu">{t('header.menu')}</CustomLink>
        {/* Do zrobienia jeśli będzie czas na to */}
        {/* <CustomLink to="/orders">{t('header.orders')}</CustomLink> */}
        <CustomLink to="/cart">{t('header.cart')}</CustomLink>
=======
        {(authStore.user?.role === 'client' || !authStore.user) && (
          <>
            <CustomLink to="/">{t('header.start')}</CustomLink>
            <CustomLink to="/contact">{t('header.contact')}</CustomLink>
            <CustomLink to="/menu">{t('header.menu')}</CustomLink>
            <CustomLink to="/cart">{t('header.cart')}</CustomLink>
          </>
        )}
>>>>>>> 31bc58d9bc93e339a6ea01d74ba202e774a11094
      </div>
      {authStore.user ? (
        <div className={styles.userWrapper}>
          <div>
            {t('header.welcome')}, <b>{authStore.user.username}</b>
          </div>
          <div onClick={authStore.logout}>
            <LogoutOutlinedIcon />
          </div>
        </div>
      ) : (
        <CustomLink to="/login">
          <LoginOutlinedIcon className={styles.login} />
        </CustomLink>
      )}
    </header>
  );
};
