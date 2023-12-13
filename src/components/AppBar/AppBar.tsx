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
        {(authStore.user?.role === 'client' || !authStore.user) && (
          <>
            <CustomLink to="/">{t('header.start')}</CustomLink>
            <CustomLink to="/contact">{t('header.contact')}</CustomLink>
            <CustomLink to="/menu">{t('header.menu')}</CustomLink>
            <CustomLink to="/cart">{t('header.cart')}</CustomLink>
          </>
        )}
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
