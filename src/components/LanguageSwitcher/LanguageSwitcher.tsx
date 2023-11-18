import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import english from '../../assets/english.png';
import polish from '../../assets/poland.png';
// import ukraine from '../../assets/ukraine.png';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={styles.languageButtons}>
      <button
        className={styles.languageButton}
        onClick={() => changeLanguage('en')}
      >
        <img src={english} width={'40px'} height={'40px'} />
      </button>
      <button
        className={styles.languageButton}
        onClick={() => changeLanguage('pl')}
      >
        <img src={polish} width={'40px'} height={'20px'} />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
