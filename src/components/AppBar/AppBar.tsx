import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CustomLink } from '../CustomLink';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/logo.png';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  const { t } = useTranslation();
  const naviate = useNavigate();
  const authStore = useAuthStore();

  const logOut = () => {
    authStore.logout();
    naviate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <CustomLink to="/">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} width={'50px'} height={'50px'} />
            RADISH
          </div>
        </CustomLink>
      </div>
      <div className={styles.menuWrapper}>
        {authStore.user?.role === 'client' && (
          <>
            <CustomLink to="/menu">{t('header.menu')}</CustomLink>
            <CustomLink to="/orders">{t('header.orders')}</CustomLink>
            <CustomLink to="/contact">{t('header.contact')}</CustomLink>
            <CustomLink to="/cart">{t('header.cart')}</CustomLink>
          </>
        )}
        {(authStore.user?.role === 'guest' || !authStore.user?.role) && (
          <>
            <CustomLink to="/menu">{t('header.menu')}</CustomLink>
            <CustomLink to="/contact">{t('header.contact')}</CustomLink>
            <CustomLink to="/cart">{t('header.cart')}</CustomLink>
          </>
        )}
      </div>
      {authStore.user && authStore.user?.id > 0 ? (
        <div className={styles.userWrapper}>
          <div className={styles.welcome}>
            <div>{t('header.welcome')},</div>
            <b>{authStore.user.username}</b>
          </div>
          <div onClick={logOut}>
            <LogoutOutlinedIcon />
          </div>
        </div>
      ) : (
        <div className={styles.loginWrapper}>
          <CustomLink to="/login">
            <LoginOutlinedIcon className={styles.login} />
          </CustomLink>
        </div>
      )}
    </header>
  );
};
