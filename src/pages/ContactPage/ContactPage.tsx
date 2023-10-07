import { ContactUs } from '../../components/ContactUs';
import styles from './ContactPage.module.scss';

export const ContactPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>Kontakt</div>
        </div>
      </div>
      <div>
        <ContactUs />
        <div className={styles.mapWrapper}>
          <div>Mapa dojazdu</div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.6685399890134!2d19.46844629999999!3d51.77566645000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb265106e829%3A0xf21167d962131d1f!2sAkademia%20Humanistyczno-Ekonomiczna%20w%20%C5%81odzi!5e0!3m2!1spl!2spl!4v1695572456182!5m2!1spl!2spl"
            width="900"
            height="300"
          ></iframe>
        </div>
      </div>
    </>
  );
};
