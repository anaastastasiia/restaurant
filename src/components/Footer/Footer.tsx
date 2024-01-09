import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import { CustomLink } from '../CustomLink';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useAuthStore } from '../../store/authStore';
import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();
  const authStore = useAuthStore();

  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.logoWrapper}>
          <img src={logo} />
          <div>RADISH</div>
        </div>
        <div className={styles.linksWrapper}>
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
        <div>
          <div>Doktora Seweryna Sterlinga 26</div>
          <div>Łódź, 90-212</div>
          <div>+(48) 444 555 444</div>
          <div>radish@gmail.com</div>
        </div>
        <div>
          <div>PN-PT 11:00 - 23:00</div>
          <div>SB-ND 9:00 - 24:00</div>
        </div>
        <LanguageSwitcher />
      </div>
    </>
  );
};
