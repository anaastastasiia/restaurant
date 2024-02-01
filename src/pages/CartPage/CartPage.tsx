import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CartsItem from '../../components/CartItem';
import ReservationForm from '../../forms/ReservationForm';
import { CartItemForm, ClientData, useCartStore } from '../../store/cartStore';
import ProductItem from '../../components/ProductItem';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import { useAuthStore } from '../../store/authStore';
import emptyCart from '../../assets/add-to-cart.png';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { t } = useTranslation();
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);

  const { getHotPriceItems } = useItemsActions;
  const { hotPriceItems, menuItems } = useItemsStore();
  const { cartItemsForm, cartItems, setTotalCartPrice } = useCartStore();
  const createOrder = useCartStore((state) => state.placeOrder);
  const setRezervationDetails = useCartStore(
    (state) => state.setRezervationDetails
  );
  const authStore = useAuthStore();

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
    setRezervationDetails({
      name:
        authStore.user && authStore.user.username
          ? authStore.user.username
          : formData.name,
      email:
        authStore.user && authStore.user.email
          ? authStore.user.email
          : formData.email,
      phoneNumber:
        authStore.user && authStore.user.phoneNumber
          ? authStore.user.phoneNumber
          : formData.phoneNumber,
      date: formData.date,
      numberOfPeople: formData.numberOfPeople,
      status: formData.status,
      time: formData.time,
    });
    setTotalCartPrice(Number(totalPrice));
    createOrder();
  };

  const calculateTotalPrice = (cartItems: CartItemForm[]) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemPrice =
        item.hotprice !== null && item.hotprice !== undefined
          ? parseFloat(item.hotprice.toString())
          : parseFloat(item.price.toString());
      totalPrice += itemPrice;
    });
    return totalPrice.toFixed(2);
  };

  const totalPrice = calculateTotalPrice(cartItemsForm);

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
                {cartItemsForm.map((i) => {
                  const fromHotPrices = hotPriceItems.filter(
                    (el) => el.id === i.idMenu
                  );
                  if (fromHotPrices.length > 0) {
                    return fromHotPrices.map((j) => {
                      return (
                        <CartsItem
                          idMenu={j.id}
                          count={i.count ? i.count : 1}
                          hotprice={i.hotprice}
                          namePL={j.namePL}
                          nameEN={j.nameEN}
                          price={i.price}
                        />
                      );
                    });
                  } else {
                    const fromMenu = menuItems.filter(
                      (el) => el.id === i.idMenu
                    );
                    return fromMenu.map((j) => {
                      return (
                        <CartsItem
                          idMenu={j.id}
                          count={i.count ? i.count : 1}
                          hotprice={i.hotprice}
                          namePL={j.namePL}
                          nameEN={j.nameEN}
                          price={i.price}
                        />
                      );
                    });
                  }
                })}
                <div className={styles.summary}>
                  <div>
                    {t('pages.cart.total')}: <b>{totalPrice}</b> PLN
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
                        hotprice={i.hotprice}
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
