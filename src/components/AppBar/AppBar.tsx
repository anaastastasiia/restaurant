import { CustomLink } from '../CustomLink';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  return (
    <header className={styles.menuWrapper}>
      <CustomLink to="/">About us</CustomLink>
      <CustomLink to="/contact">Contact</CustomLink>
      <CustomLink to="/menu">Menu</CustomLink>
      <CustomLink to="/orders">Orders</CustomLink>
      <CustomLink to="/delivery">Dostawa</CustomLink>
    </header>
  );
};
