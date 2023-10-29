import { CustomLink } from '../CustomLink';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  return (
    <header className={styles.menuWrapper}>
      <CustomLink to="/">Start</CustomLink>
      <CustomLink to="/contact">Kontakt</CustomLink>
      <CustomLink to="/menu">Menu</CustomLink>
      <CustomLink to="/orders">Zamówienia</CustomLink>
      <CustomLink to="/delivery">Dostawa</CustomLink>
    </header>
  );
};
