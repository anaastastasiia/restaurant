import { useTranslation } from 'react-i18next';
import { Order, OrderData, useOrdersStore } from '../../store/ordersStore';
import { images } from '../../model/imagesList';
import styles from './OrderItem.module.scss';
import { useEffect, useState } from 'react';

export const OrderItem = ({
  order,
  orderResult,
  idCart,
}: {
  order: Order;
  orderResult: OrderData[];
  idCart: number;
}) => {
  const { t } = useTranslation();
  const [totalPrice, setTotalPrice] = useState(0);
  const { getTotalCartPrice } = useOrdersStore();

  const findImgForItem = (item: number[]): string[] => {
    return item.map((item) => {
      const imgMatch = images.find((img) => img.id === item);
      return imgMatch?.img || '';
    });
  };

  const extractedIds: number[] = orderResult
    .flat(1)
    .map((item: any) => item.id);

  const imgForItem = findImgForItem(extractedIds);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const price = await getTotalCartPrice(idCart);
        console.log('PRICE EFEECT: ', price);
        setTotalPrice(price);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.productDescriptionWrapper}>
          <div className={styles.order}>
            {t('pages.orders.order')} № {order.id}, {order.date} {order.time}
          </div>
          <div className={styles.status}>{order.status}</div>
        </div>
        <div className={styles.totalPriceWrapper}>
          <div className={styles.total}>{t('pages.orders.total')}</div>
          <div className={styles.totalPrice}>
            {totalPrice ? totalPrice.toFixed(2) : 0} PLN
          </div>
        </div>
        <div className={styles.imagesWrapper}>
          {imgForItem.slice(0, 3).map((item) => {
            return <img src={item ?? ''} width={'50px'} height={'50px'} />;
          })}
        </div>
      </div>
    </div>
  );
};
