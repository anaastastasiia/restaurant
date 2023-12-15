import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, useCartStore } from '../../store/cartStore';
import styles from './OrderItem.module.scss';

export const OrderItem = (cartItems: Order) => {
  const { t } = useTranslation();
  const cartStore = useCartStore();

  const handleAddToCart = () => {
    cartStore.getCartData();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.productDescriptionWrapper}>
          <div className={styles.order}>Zamówienie № {cartItems.id}</div>
          <div className={styles.status}>
            {cartItems.reservationDetails.status}
          </div>
        </div>
        <div className={styles.totalPriceWrapper}>
          <div className={styles.total}>Razem</div>
          <div className={styles.totalPrice}>
            {cartItems.cartItems
              .map((i) => Number(i.price))
              .reduce((suma, cena) => suma + cena, 0)
              .toFixed(2)}{' '}
            PLN
          </div>
        </div>
      </div>
    </div>
  );
};
