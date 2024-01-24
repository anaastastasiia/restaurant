import { useTranslation } from 'react-i18next';
import { Order } from '../../store/cartStore';
import styles from './OrderItem.module.scss';
import { images } from '../../model/imagesList';

export const OrderItem = (order: Order) => {
  const { t } = useTranslation();
  const findImgForItem = (item: string[]): string[] => {
    return item.map((item) => {
      const imgMatch = images.find((img) => img.id.toString() === item);
      return imgMatch?.img || '';
    });
  };
  const imgForItem = findImgForItem(
    order.cartItems.map((item) => item.id.toString())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.productDescriptionWrapper}>
          <div className={styles.order}>
            {t('pages.orders.order')} № {order.id},{' '}
            {order.reservationDetails.date} {order.reservationDetails.time}
          </div>
          <div className={styles.status}>{order.reservationDetails.status}</div>
        </div>
        <div className={styles.totalPriceWrapper}>
          <div className={styles.total}>{t('pages.orders.total')}</div>
          <div className={styles.totalPrice}>
            {order.cartItems
              .map((i) => Number(i.price))
              .reduce((suma, cena) => suma + cena, 0)
              .toFixed(2)}{' '}
            PLN
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
