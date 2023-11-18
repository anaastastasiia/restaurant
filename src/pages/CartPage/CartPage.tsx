import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CartsItem from '../../components/CartItem';
import styles from './CartPage.module.scss';
import { useCartActions, useCartStore } from '../../store/cartStore';

export const CartPage = () => {
  const { t } = useTranslation();
  const { getCartItems } = useCartActions;
  const { cartItems } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>Twój koszyk czeka na Ciebie</div>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((i) => {
              return (
                <CartsItem
                  namePL={i.namePL}
                  nameEN={i.nameEN}
                  price={i.price}
                  id={i.id}
                  newPrice={i.newPrice}
                  count={i.count ? i.count : 1}
                />
              );
            })}
          </>
        ) : (
          <>PUSTO</>
        )}
      </div>
    </>
  );
};
