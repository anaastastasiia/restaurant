import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Order, useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import OrderItem from '../../components/OrderItem';
import styles from './OrdersPage.module.scss';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const cartStore = useCartStore();
  const authStore = useAuthStore();

  useEffect(() => {
    const user = authStore.user?.username;
    cartStore.getCartDataForUser(user ?? '');
  }, []);

  console.log('cartStore.orderForUser: ', cartStore.orderForUser);
  const filterOrders = () => {
    switch (filter) {
      case 'month':
        return cartStore.orderForUser.filter((order) => {
          const orderDate = new Date(order.reservationDetails.date);
          const currentDate = new Date();
          return (
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case 'year':
        return cartStore.orderForUser.filter((order) => {
          const orderDate = new Date(order.reservationDetails.date);
          const currentDate = new Date();
          return orderDate.getFullYear() === currentDate.getFullYear();
        });
      default:
        return cartStore.orderForUser;
    }
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const filteredOrders = filterOrders();

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
            <h2>{t('pages.orders.yourOrders')}</h2>
            <div className={styles.buttonsWrapper}>
              <button
                onClick={() => handleFilterChange('all')}
                style={{
                  backgroundColor:
                    filter === 'all' ? '#aeaeae' : 'rgb(100, 99, 99)',
                }}
              >
                {t('pages.orders.filter.all')}
              </button>
              <button
                onClick={() => handleFilterChange('month')}
                style={{
                  backgroundColor:
                    filter === 'month' ? '#aeaeae' : 'rgb(100, 99, 99)',
                }}
              >
                {t('pages.orders.filter.month')}
              </button>
              <button
                onClick={() => handleFilterChange('year')}
                style={{
                  backgroundColor:
                    filter === 'year' ? '#aeaeae' : 'rgb(100, 99, 99)',
                }}
              >
                {t('pages.orders.filter.year')}
              </button>
            </div>
            {filteredOrders.map((order: Order) => {
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
