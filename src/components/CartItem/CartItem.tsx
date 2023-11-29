import { useTranslation } from 'react-i18next';
import Rectangle7 from '../../assets/Rectangle7.png';
import Rectangle10 from '../../assets/Rectangle10.png';
import Rectangle11 from '../../assets/Rectangle11.png';
import Rectangle12 from '../../assets/Rectangle12.png';
import Rectangle9 from '../../assets/Rectangle9.png';
import Rectangle14 from '../../assets/Rectangle14.png';
import Rectangle13 from '../../assets/Rectangle13.png';
import Rectangle8 from '../../assets/Rectangle8.png';
import Rectangle1 from '../../assets/Rectangle1.png';
import Rectangle2 from '../../assets/Rectangle2.png';
import Rectangle3 from '../../assets/Rectangle3.png';
import burger from '../../assets/burger.png';
import frytki from '../../assets/frytki.png';
import meat from '../../assets/meat.png';
import { CartItem } from '../../store/cartTest';
import { useState } from 'react';
import styles from './CartItem.module.scss';
import { useCartStoreTest } from '../../store/cartTest';

const images = [
  {
    id: '1',
    img: Rectangle7,
  },
  {
    id: '2',
    img: Rectangle8,
  },
  {
    id: '3',
    img: Rectangle9,
  },
  {
    id: '4',
    img: Rectangle10,
  },
  {
    id: '5',
    img: Rectangle11,
  },
  {
    id: '6',
    img: Rectangle12,
  },
  {
    id: '7',
    img: Rectangle13,
  },
  {
    id: '8',
    img: Rectangle14,
  },
  {
    id: '9',
    img: Rectangle1,
  },
  {
    id: '10',
    img: Rectangle2,
  },
  {
    id: '11',
    img: Rectangle3,
  },
  {
    id: '12',
    img: burger,
  },
  {
    id: '13',
    img: frytki,
  },
  {
    id: '14',
    img: meat,
  },
];

const MAX_QUANTITY = 8;
const DEFAULT_QUANTITY = 1;

export const CartsItem = (product: CartItem) => {
  const { t, i18n } = useTranslation();
  const [price, setPrice] = useState(product.price);
  const [count, setCount] = useState(product.count);
  const updateItemCount = useCartStoreTest((state) => state.updateItemCount);
  const removeFromCart = useCartStoreTest((state) => state.removeFromCart);
  const firstPrice = useCartStoreTest((state) =>
    state.cartItems.map((i) => {
      console.log('map i start price: ', i.startPrice);
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
    console.log('CLICK - ');
    console.log('update product: ', product + ', firstPrice: ' + firstPrice);
    if (count > 0) {
      const newQuantity = count - 1;
      setCount(newQuantity);
      const price = calculatePrice(firstPrice, newQuantity);
      setPrice(price.toFixed(2));
      updateItemCount(product.id, newQuantity, price.toFixed(2));
      console.log('update price: ', price + ', count: ', newQuantity);
    }
  };

  const handleAddQuantity = () => {
    console.log('CLICK + ');
    console.log('update product: ', product + ', firstPrice: ' + firstPrice);

    const newQuantity = Math.min(count + 1, MAX_QUANTITY);
    setCount(newQuantity);
    const price = calculatePrice(firstPrice, newQuantity);
    setPrice(price.toFixed(2));
    updateItemCount(product.id, newQuantity, price.toFixed(2));
    console.log('update price: ', price + ', count: ', newQuantity);
  };

  const deleteItem = (item: CartItem) => {
    removeFromCart(item.id);
  };

  const calculatePrice = (firstPrice: string | undefined, quantity: number) => {
    console.log(
      'priceWithoutDiscount: ',
      firstPrice + ', mnożenie: ',
      Number(firstPrice) * quantity
    );
    return firstPrice ? parseFloat(firstPrice) * quantity : 0;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.productItemWrapper}>
        <div>
          <img src={imgForItem ?? ''} width={'250px'} height={'250px'} />
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
