import { useTranslation } from 'react-i18next';
import { CartItemForm } from '../../store/cartStore';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useItemsStore } from '../../store/itemsStore';
import { images } from '../../model/imagesList';
import styles from './CartItem.module.scss';

const MAX_QUANTITY = 8;
const DEFAULT_QUANTITY = 1;

export const CartsItem = (product: CartItemForm) => {
  const { t, i18n } = useTranslation();
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(1);
  const { menuItems, hotPriceItems } = useItemsStore();
  const { setProductTotalPrice, updateItemCount, removeFromCart } =
    useCartStore();

  let hotPrice: number | undefined = 0;
  let menuPrice: number | undefined = 0;
  useEffect(() => {
    setPrice(product.hotprice ? product.hotprice : product.price);
    setCount(product.count);
  }, []);

  hotPrice = useItemsStore(() =>
    hotPriceItems.filter((i) => i.id === product.idMenu)
  )[0]?.hotprice;

  menuPrice = useItemsStore(() =>
    menuItems.filter((i) => i.id === product.idMenu)
  )[0]?.price;

  const findImgForItem = (item: CartItemForm): string | undefined => {
    const imgMatch = images.find((img) => img.id === item.idMenu);
    return imgMatch?.img;
  };

  const imgForItem = findImgForItem(product);

  const handleSubtractQuantity = () => {
    if (count > 0) {
      const newQuantity = count - 1;
      setCount(newQuantity);
      const price = calculatePrice(
        hotPrice ? hotPrice : menuPrice,
        newQuantity
      );
      setPrice(price);
      setProductTotalPrice(price);
      updateItemCount(product.idMenu, newQuantity, price.toFixed(2));
    }
  };

  const handleAddQuantity = () => {
    const newQuantity = Math.min(count + 1, MAX_QUANTITY);
    setCount(newQuantity);
    const price = calculatePrice(hotPrice ? hotPrice : menuPrice, newQuantity);
    setPrice(price);
    setProductTotalPrice(price);
    updateItemCount(product.idMenu, newQuantity, price.toFixed(2));
  };

  const deleteItem = (item: CartItemForm) => {
    removeFromCart(item.idMenu);
  };

  const calculatePrice = (firstPrice: number | undefined, quantity: number) => {
    return firstPrice ? firstPrice * quantity : 0;
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
