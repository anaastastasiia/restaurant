import { useEffect } from 'react';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import ProductItem from '../../components/ProductItem';
import styles from './MenuPage.module.scss';

export const MenuPage = () => {
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
          <div className={styles.celebrate}>
            Dowiedź się więcej o naszym menu
          </div>
        </div>
      </div>
      <div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {menuItems.map((i) => {
              return <ProductItem name={i.name} price={i.price} id={i.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
