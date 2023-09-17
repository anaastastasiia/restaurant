import styles from './Footer.module.scss';
import logo from '../../assets/logo.png';
import { CustomLink } from '../CustomLink';

export const Footer = () => {
  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.logoWrapper}>
          <img src={logo} />
          <div>RADISH</div>
        </div>
        <div className={styles.linksWrapper}>
          <CustomLink to="/contact">Contact</CustomLink>
          <CustomLink to="/menu">Menu</CustomLink>
          <CustomLink to="/orders">Orders</CustomLink>
          <CustomLink to="/delivery">Dostawa</CustomLink>
        </div>
        <div>
          <div>ul. Piotrkowska, 555</div>
          <div>Łódź, 00-123</div>
          <div>+(48) 444 555 444</div>
          <div>radish@gmail.com</div>
        </div>
        <div>
          <div>PN-PT 11:00 - 23:00</div>
          <div>SB-ND 9:00 - 24:00</div>
        </div>
      </div>
    </>
  );
};
