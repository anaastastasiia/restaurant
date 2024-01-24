import { useTranslation } from 'react-i18next';
import { CartItem } from '../../store/cartStore';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { images } from '../../model/imagesList';
import styles from './CartItem.module.scss';

const MAX_QUANTITY = 8;
const DEFAULT_QUANTITY = 1;

export const CartsItem = (product: CartItem) => {
  const { t, i18n } = useTranslation();
  const [price, setPrice] = useState('');
  const [count, setCount] = useState(1);
  const updateItemCount = useCartStore((state) => state.updateItemCount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setPrice(product.price);
    setCount(product.count);
  }, []);

  const firstPrice = useCartStore((state) =>
    state.cartItems.map((i) => {
      if (i.id === product.id) {
        return i.startPrice;
      }
    })
  )[0];

  const findImgForItem = (item: CartItem): string | undefined => {
    const imgMatch = images.find((img) => img.id === item.id);
    return imgMatch?.img;
  };

  const imgForItem = findImgForItem(product);

  const handleSubtractQuantity = () => {
    if (count > 0) {
      const newQuantity = count - 1;
      setCount(newQuantity);
      const price = calculatePrice(firstPrice, newQuantity);
      setPrice(price.toFixed(2));
      updateItemCount(product.id, newQuantity, price.toFixed(2));
    }
  };

  const handleAddQuantity = () => {
    const newQuantity = Math.min(count + 1, MAX_QUANTITY);
    setCount(newQuantity);
    const price = calculatePrice(firstPrice, newQuantity);
    setPrice(price.toFixed(2));
    updateItemCount(product.id, newQuantity, price.toFixed(2));
  };

  const deleteItem = (item: CartItem) => {
    removeFromCart(item.id);
  };

  const calculatePrice = (firstPrice: string | undefined, quantity: number) => {
    return firstPrice ? parseFloat(firstPrice) * quantity : 0;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.productItemWrapper}>
        <div>
          <img
            src={imgForItem?.toString() ?? ''}
            width={'250px'}
            height={'250px'}
          />
        </div>
        <div className={styles.cartItemDetails}>
          <p className={styles.productsName}>
            {i18n.language === 'pl' ? product.namePL : product.nameEN}
          </p>
          <div className={styles.countWrapper}>
            <button
              onClick={handleSubtractQuantity}
              disabled={count === DEFAULT_QUANTITY}
            >
              -
            </button>
            <div className={styles.count}>{count}</div>
            <button
              onClick={handleAddQuantity}
              disabled={count === MAX_QUANTITY}
            >
              +
            </button>
            <button
              onClick={() => deleteItem(product)}
              className={styles.deleteButton}
            >
              {t('buttons.delete')}
            </button>
          </div>
          <p className={styles.price}>{Number(price).toFixed(2)} PLN</p>
        </div>
      </div>
    </div>
  );
};
