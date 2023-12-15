import { useEffect, useState } from 'react';
import { Order, useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import OrderItem from '../../components/OrderItem';
import styles from './OrdersPage.module.scss';

export const OrdersPage = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const handleButtonClick = (buttonId: string) => {
    setSelectedButton(buttonId);
  };

  const cartStore = useCartStore();
  const authStore = useAuthStore();

  useEffect(() => {
    const user = authStore.user?.username;
    cartStore.getCartDataForUser(user ?? '');
    setSelectedButton('all');
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>Pzejrzyj swoje zamówienia</div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        {cartStore.orderForUser.length > 0 ? (
          <div className={styles.orderItemWrapper}>
            <h2>Twoje zamówienia</h2>
            <div className={styles.buttonsWrapper}>
              <button
                onClick={() => handleButtonClick('all')}
                style={{
                  backgroundColor:
                    selectedButton === 'all' ? '#aeaeae' : 'rgb(100, 99, 99)',
                }}
              >
                Wszystkie
              </button>
              <button
                onClick={() => handleButtonClick('month')}
                style={{
                  backgroundColor:
                    selectedButton === 'month' ? '#aeaeae' : 'rgb(100, 99, 99)',
                }}
              >
                W tym miesiącu
              </button>
              <button
                onClick={() => handleButtonClick('year')}
                style={{
                  backgroundColor:
                    selectedButton === 'year' ? '#aeaeae' : 'rgb(100, 99, 99)',
                }}
              >
                W tym roku
              </button>
            </div>
            {cartStore.orderForUser.map((order: Order) => {
              return (
                <OrderItem
                  id={order.id}
                  cartItems={order.cartItems}
                  reservationDetails={order.reservationDetails}
                />
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
