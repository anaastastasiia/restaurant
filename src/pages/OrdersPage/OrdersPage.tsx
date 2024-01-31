import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useOrdersStore, Order, OrderResult } from '../../store/ordersStore';
import { useAuthStore } from '../../store/authStore';
import OrderItem from '../../components/OrderItem';
import styles from './OrdersPage.module.scss';

export const OrdersPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const orderStore = useOrdersStore();
  const authStore = useAuthStore();

  const {
    getOrderDetailsForUser,
    setTotalPrice,
    setOrdersResult,
    ordersResult,
    getTotalCartPrice,
    totalPrice,
  } = useOrdersStore();

  useEffect(() => {
    const user = authStore.user?.username;
    const fetchData = async () => {
      try {
        console.log('WPADA');
        const data = await orderStore.getOrderDataForUser(user ?? '');
        console.log('orderForUser: ', data);
        if (data.length > 0) {
          const arr = await Promise.all(
            data.map(async (i) => {
              const details = await getOrderDetailsForUser(i.idCart);
              return { id: i.idCart, orderData: details };
            })
          );
          setOrdersResult(arr as OrderResult[]);
          console.log('arr: ', arr);
        }

        // const price = await Promise.all(
        //   data.map(async (i) => {
        //     const price = await getTotalCartPrice(i.idCart);
        //     return price;
        //   })
        // );
        // console.log('PRICE: ', price);
        // setTotalPrice(price);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log('ordersResult: ', ordersResult);
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log('orderForUser: ', orderForUser);
  //     try {
  //       const arr = await Promise.all(
  //         orderForUser.map(async (i) => {
  //           const details = await getOrderDetailsForUser(i.idCart);
  //           return { id: i.idCart, orderData: details };
  //         })
  //       );
  //       console.log('arr: ', arr);
  //       // await Promise.all(
  //       //   orderForUser.map(async (i) => {
  //       //     const price = await getTotalCartPrice(i.idCart);
  //       //     return price;
  //       //   })
  //       // );
  //       setOrdersResult(arr as OrderResult[]);
  //       console.log('Result: ', arr);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   console.log('ordersResult: ', ordersResult);
  //   fetchData();
  // }, [orderForUser]);

  const filterOrders = () => {
    switch (filter) {
      case 'month':
        return orderStore.orderForUser.filter((order) => {
          const orderDate = new Date(order.date);
          const currentDate = new Date();
          return (
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getFullYear() === currentDate.getFullYear()
          );
        });
      case 'year':
        return orderStore.orderForUser.filter((order) => {
          const orderDate = new Date(order.date);
          const currentDate = new Date();
          return orderDate.getFullYear() === currentDate.getFullYear();
        });
      default:
        return orderStore.orderForUser;
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
        {orderStore.orderForUser.length > 0 ? (
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
            {ordersResult.length > 0 ? (
              filteredOrders.map((order: Order) => {
                const result = ordersResult.filter(
                  (i) => i.id === order.idCart
                );
                console.log('html reault: ', result);
                return (
                  <OrderItem
                    order={order}
                    orderResult={
                      result
                        ? result
                            .map((i) => i.orderData)[0]
                            .map((i: any) => i.orderData)
                        : []
                    }
                    key={order.idCart}
                    totalPrice={totalPrice}
                  />
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
