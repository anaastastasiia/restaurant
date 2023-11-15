import { useEffect } from 'react';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import ProductItem from '../../components/ProductItem';
import styles from './MenuPage.module.scss';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

export const MenuPage = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nameAsc');
  const { getMenuItems } = useItemsActions;
  const { menuItems } = useItemsStore();

  useEffect(() => {
    getMenuItems();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const renderSearchResults = () => {
    const filteredData = menuItems.filter((item) =>
      i18n.language === 'pl'
        ? item.namePL.toLowerCase().includes(searchTerm.toLowerCase())
        : item.nameEN.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      if (sortBy === 'nameAsc') {
        if (i18n.language === 'pl') {
          return a.namePL.localeCompare(b.namePL);
        } else {
          return a.nameEN.localeCompare(b.nameEN);
        }
      } else if (sortBy === 'nameDesc') {
        if (i18n.language === 'pl') {
          return b.namePL.localeCompare(a.namePL);
        } else {
          return b.nameEN.localeCompare(a.nameEN);
        }
      } else if (sortBy === 'priceAsc') {
        return Number(a.price) - Number(b.price);
      } else if (sortBy === 'priceDesc') {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

    console.log('data: ' + sortedData.length);

    return (
      <div className={styles.contentWrapper}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder={t('pages.menu.findByName')}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="nameAsc">{t('pages.menu.byNameAsc')}</option>
              <option value="nameDesc">{t('pages.menu.byNameDesc')}</option>
              <option value="priceAsc">{t('pages.menu.byPriceAsc')}</option>
              <option value="priceDesc">{t('pages.menu.byPriceDesc')}</option>
            </select>
          </div>
        </div>

        <div className={styles.content}>
          {sortedData.length <= 0 ? (
            <div className={styles.noData}>{t('pages.menu.noData')}</div>
          ) : (
            sortedData.map((i) => {
              return (
                <ProductItem
                  namePL={i.namePL}
                  nameEN={i.nameEN}
                  price={i.price}
                  id={i.id}
                />
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>{t('pages.menu.findOutMore')}</div>
        </div>
      </div>
      <div style={{ width: '100vw' }}>{renderSearchResults()}</div>
    </>
  );
};
