import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CartsItem from '../../components/CartItem';
import styles from './CartPage.module.scss';
import { useCartActions } from '../../store/cartStore';
import ReservationForm from '../../components/ReservationForm';
import { useCartStoreTest } from '../../store/cartTest';
import emptyCart from '../../assets/add-to-cart.png';
import ProductItem from '../../components/ProductItem';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';

export const CartPage = () => {
  const { t } = useTranslation();
  const { getCartItems } = useCartActions;
  // const { cartItems } = useCartStore();
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const cartItems = useCartStoreTest((state) => state.cartItems);
  const placeOrder = useCartStoreTest((state) => state.placeOrder);

  const { getHotPriceItems } = useItemsActions;
  const { hotPriceItems } = useItemsStore();

  useEffect(() => {
    getCartItems();
    getHotPriceItems();
    setShowStep1(true);
    setShowStep2(false);
  }, []);

  const onCLick = async () => {
    await getCartItems();
    setShowStep2(true);
    setShowStep1(false);
  };

  const handleReservationSubmit = (formData: any) => {
    console.log('Reservation Data:', formData);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>{t('pages.cart.title')}</div>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        {cartItems && cartItems.length > 0 ? (
          <>
            {showStep1 && (
              <>
                {cartItems.map((i) => {
                  return (
                    <CartsItem
                      namePL={i.namePL}
                      nameEN={i.nameEN}
                      price={i.price}
                      id={i.id}
                      newPrice={i.newPrice}
                      count={i.count ? i.count : 1}
                    />
                  );
                })}
                <button onClick={onCLick}>Dalej</button>
              </>
            )}
            <button onClick={placeOrder}>Zamów</button>

            {showStep2 && (
              <div>
                <div>Zarezerwuj stolik:</div>
                <ReservationForm onSubmit={handleReservationSubmit} />
                Razem:{' '}
                {cartItems
                  .map((i) => Number(i.price))
                  .reduce((suma, cena) => suma + cena, 0)
                  .toFixed(2)}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.emptyCartTitle}>
              {t('pages.cart.emptyCart')}
            </div>
            <img src={emptyCart} width={'200px'} height={'200px'} />
            <div className={styles.lowPricesWrapper}>
              <div className={styles.hotPriceTitle}>
                {t('pages.cart.offers')}
              </div>
              <div className={styles.hotPriceContentWrapper}>
                <div className={styles.hotPriceContent}>
                  {hotPriceItems.map((i) => {
                    return (
                      <ProductItem
                        namePL={i.namePL}
                        nameEN={i.nameEN}
                        price={i.price}
                        id={i.id}
                        newPrice={i.newPrice}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
