import styles from './ContactPage.module.scss';
import { useEffect, useState } from 'react';
import { getDay } from 'date-fns';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

export const ContactPage = () => {
  const [currentDay, setCurrentDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const dayOfWeek = getDay(currentDate);
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setCurrentDate('weekend');
    }
  }, []);
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>Kontakt</div>
        </div>
      </div>
      <div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div>Skontaktuj się z nami</div>
          </div>
          <div className={styles.contactIconsWrapper}>
            <div
              className={styles.contactIcon}
              style={{ borderRight: '1px solid #6d1414', width: '33%' }}
            >
              <LocationOnOutlinedIcon
                style={{ color: 'white', width: ' 40px', height: ' 40px' }}
              />
              <div>Nasz adres</div>
              <div className={styles.textBold}>
                Doktora Seweryna Sterlinga 26, 90-212 Łódź
              </div>
            </div>
            <div
              className={styles.contactIcon}
              style={{ borderRight: '1px solid #6d1414', width: '33%' }}
            >
              <PhoneAndroidOutlinedIcon
                style={{ color: 'white', width: ' 40px', height: ' 40px' }}
              />
              <div>Numer kontaktowy</div>
              <div className={styles.textBold}>+(48) 444 555 444</div>
            </div>
            <div
              className={styles.contactIcon}
              style={{ borderRight: '1px solid #6d1414', width: '33%' }}
            >
              <EmailOutlinedIcon
                style={{ color: 'white', width: ' 40px', height: ' 40px' }}
              />
              <div>Adres email</div>
              <div className={styles.textBold}>radish@gmail.com</div>
            </div>
            <div className={styles.contactIcon} style={{ width: '33%' }}>
              <AccessTimeOutlinedIcon
                style={{ color: 'white', width: ' 40px', height: ' 40px' }}
              />
              <div>Godziny otwarcia</div>
              <div className={styles.houres}>
                <div>
                  Dzisiaj:{' '}
                  {currentDay === 'weekend' ? '9:00 - 24:00' : '11:00 - 23:00'}
                </div>
                <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
                  {isExpanded ? (
                    <ArrowDropUpOutlinedIcon />
                  ) : (
                    <ArrowDropDownOutlinedIcon />
                  )}
                </div>
              </div>
              {isExpanded && (
                <div>
                  <div>poniedziałek 11:00 - 23:00</div>
                  <div>wtorek 11:00 - 23:00</div>
                  <div>środa 11:00 - 23:00</div>
                  <div>czwartek 11:00 - 23:00</div>
                  <div>piątek 11:00 - 23:00</div>
                  <div>sobota 9:00 - 24:00</div>
                  <div>niedziela 9:00 - 24:00</div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.mapWrapper}>
            <div>Mapa dojazdu</div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.6685399890134!2d19.46844629999999!3d51.77566645000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb265106e829%3A0xf21167d962131d1f!2sAkademia%20Humanistyczno-Ekonomiczna%20w%20%C5%81odzi!5e0!3m2!1spl!2spl!4v1695572456182!5m2!1spl!2spl"
              width="900"
              height="300"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};
