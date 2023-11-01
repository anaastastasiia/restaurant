import styles from './ContactUs.module.scss';
import { useEffect, useState } from 'react';
import { getDay } from 'date-fns';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import { useTranslation } from 'react-i18next';

export const ContactUs = () => {
  const [currentDay, setCurrentDate] = useState('');
  const { t } = useTranslation();

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
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <div>{t('pages.contactUs.contactUs')}</div>
      </div>
      <div className={styles.contactIconsWrapper}>
        <div
          className={styles.contactIcon}
          style={{ borderRight: '1px solid #6d1414', width: '33%' }}
        >
          <LocationOnOutlinedIcon
            style={{ color: 'white', width: ' 40px', height: ' 40px' }}
          />
          <div>{t('pages.contactUs.ourAddress')}</div>
          <div className={styles.textBold}>{t('pages.contactUs.street')}</div>
        </div>
        <div
          className={styles.contactIcon}
          style={{ borderRight: '1px solid #6d1414', width: '33%' }}
        >
          <PhoneAndroidOutlinedIcon
            style={{ color: 'white', width: ' 40px', height: ' 40px' }}
          />
          <div>{t('pages.contactUs.contactPhone')}</div>
          <div className={styles.textBold}>+(48) 444 555 444</div>
        </div>
        <div
          className={styles.contactIcon}
          style={{ borderRight: '1px solid #6d1414', width: '33%' }}
        >
          <EmailOutlinedIcon
            style={{ color: 'white', width: ' 40px', height: ' 40px' }}
          />
          <div>{t('pages.contactUs.email')}</div>
          <div className={styles.textBold}>radish@gmail.com</div>
        </div>
        <div className={styles.contactIcon} style={{ width: '33%' }}>
          <AccessTimeOutlinedIcon
            style={{ color: 'white', width: ' 40px', height: ' 40px' }}
          />
          <div>{t('pages.contactUs.openedHours')}</div>
          <div className={styles.houres}>
            <div>
              {t('pages.contactUs.today')}:{' '}
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
              <div>{t('pages.contactUs.daysOfWeek.monday')} 11:00 - 23:00</div>
              <div>{t('pages.contactUs.daysOfWeek.tuesday')} 11:00 - 23:00</div>
              <div>
                {t('pages.contactUs.daysOfWeek.wednesday')} 11:00 - 23:00
              </div>
              <div>
                {t('pages.contactUs.daysOfWeek.thursday')} 11:00 - 23:00
              </div>
              <div>{t('pages.contactUs.daysOfWeek.friday')} 11:00 - 23:00</div>
              <div>{t('pages.contactUs.daysOfWeek.saturday')} 9:00 - 24:00</div>
              <div>{t('pages.contactUs.daysOfWeek.sunday')} 9:00 - 24:00</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
