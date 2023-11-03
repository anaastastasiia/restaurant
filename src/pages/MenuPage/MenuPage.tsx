import { useEffect } from 'react';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import ProductItem from '../../components/ProductItem';
import styles from './MenuPage.module.scss';
import { useTranslation } from 'react-i18next';

export const MenuPage = () => {
  const { t } = useTranslation();

  const { getMenuItems } = useItemsActions;
  const { menuItems } = useItemsStore();

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>{t('pages.menu.findOutMore')}</div>
        </div>
      </div>
      <div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {menuItems.map((i) => {
              return (
                <ProductItem
                  namePL={i.namePL}
                  nameEN={i.nameEN}
                  price={i.price}
                  id={i.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
