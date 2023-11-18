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
import { CartItem, useCartActions } from '../../store/cartStore';
import { useReducer, useState } from 'react';
import styles from './CartItem.module.scss';

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

const MAX_QUANTITY = 5;
const DEFAULT_QUANTITY = 1;

export const CartsItem = (product: CartItem) => {
  const { t, i18n } = useTranslation();
  const { removeFromCart, changeCartItemDetails } = useCartActions;
  const initialState = { count: product.price, quantity: product.count };
  const [price, setPrice] = useState(product.price);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'setQuantity':
        return { ...state, quantity: action.payload };
      default:
        throw new Error();
    }
  };

  const findImgForItem = (item: CartItem): string | undefined => {
    const imgMatch = images.find((img) => img.id === item.id);
    return imgMatch?.img;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const imgForItem = findImgForItem(product);

  const handleSubtractQuantity = () => {
    if (state.quantity > 0) {
      const newQuantity = state.quantity - 1;
      const newPrice = calculatePrice(product, newQuantity);
      dispatch({ type: 'setQuantity', payload: newQuantity, newPrice });
      setPrice(newPrice.toString());
      changeCartItemDetails(
        product,
        newQuantity.toString(),
        newPrice.toString()
      );
    }
  };

  const handleAddQuantity = () => {
    const newQuantity = Math.min(state.quantity + 1, MAX_QUANTITY);
    const newPrice = calculatePrice(product, newQuantity);
    dispatch({ type: 'setQuantity', payload: newQuantity, newPrice });
    setPrice(newPrice.toString());
    changeCartItemDetails(product, newQuantity.toString(), newPrice.toString());
  };

  const deleteItem = (item: CartItem) => {
    removeFromCart(item);
  };

  const calculatePrice = (item: CartItem, quantity: number) => {
    const priceWithoutDiscount = item.newPrice ? item.newPrice : item.price;
    return Number(priceWithoutDiscount) * quantity;
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

          <button
            onClick={handleSubtractQuantity}
            disabled={state.quantity === DEFAULT_QUANTITY}
          >
            -
          </button>
          <input type="text" value={state.quantity} disabled={true} />
          <button
            onClick={handleAddQuantity}
            disabled={state.quantity === MAX_QUANTITY}
          >
            +
          </button>
          <button
            onClick={() => deleteItem(product)}
            className={styles.deleteButton}
          >
            {t('buttons.delete')}
          </button>
          <p>
            {price}
            PLN
          </p>
        </div>
      </div>
    </div>
  );
};
