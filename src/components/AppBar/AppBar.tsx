import { useTranslation } from 'react-i18next';
import { CustomLink } from '../CustomLink';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.menuWrapper}>
        <CustomLink to="/">{t('header.start')}</CustomLink>
        <CustomLink to="/contact">{t('header.contact')}</CustomLink>
        <CustomLink to="/menu">{t('header.menu')}</CustomLink>
        {/* Do zrobienia jeśli będzie czas na to */}
        {/* <CustomLink to="/orders">{t('header.orders')}</CustomLink> */}
        <CustomLink to="/cart">{t('header.cart')}</CustomLink>
      </div>
      <LanguageSwitcher />
    </header>
  );
};
