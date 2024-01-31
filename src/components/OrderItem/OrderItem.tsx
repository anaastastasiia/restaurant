import { useTranslation } from 'react-i18next';
import { Order, OrderData } from '../../store/ordersStore';
import { images } from '../../model/imagesList';
import styles from './OrderItem.module.scss';

export const OrderItem = ({
  order,
  orderResult,
  totalPrice,
}: {
  order: Order;
  orderResult: OrderData[];
  totalPrice: number;
}) => {
  const { t } = useTranslation();

  console.log('RESULT ITEM: ', orderResult);

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

  // let totalOrderPrice: number;
  // const firstOrder = Object.values(orderDetails)[0];
  // totalOrderPrice = firstOrder?.totalPrice || 0;

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
