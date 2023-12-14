import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CartsItem from '../../components/CartItem';
import ReservationForm from '../../forms/ReservationForm';
import { ClientData, useCartStore } from '../../store/cartStore';
import ProductItem from '../../components/ProductItem';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import emptyCart from '../../assets/add-to-cart.png';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { t } = useTranslation();
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const createOrder = useCartStore((state) => state.placeOrder);
  const setRezervationDetails = useCartStore(
    (state) => state.setRezervationDetails
  );

  const { getHotPriceItems } = useItemsActions;
  const { hotPriceItems } = useItemsStore();

  useEffect(() => {
    getHotPriceItems();
  }, []);

  useEffect(() => {
    setShowStep1(true);
    setShowStep2(false);
  }, []);

  const onCLick = async () => {
    setShowStep2(true);
    setShowStep1(false);
  };

  const handleReservationSubmit = (formData: ClientData) => {
    setRezervationDetails(formData);
    createOrder();
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
                      oldPrice={i.oldPrice}
                      count={i.count ? i.count : 1}
                    />
                  );
                })}
                <div className={styles.summary}>
                  <div>
                    {t('pages.cart.total')}:{' '}
                    <b>
                      {cartItems
                        .map((i) => Number(i.price))
                        .reduce((suma, cena) => suma + cena, 0)
                        .toFixed(2)}
                    </b>{' '}
                    PLN
                  </div>
                  <button onClick={onCLick}>
                    {t('pages.cart.createOrder')}
                  </button>
                </div>
              </>
            )}

            {showStep2 && (
              <div className={styles.rezervation}>
                <ReservationForm onSubmit={handleReservationSubmit} />
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
                        oldPrice={i.oldPrice}
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
