import { useTranslation } from 'react-i18next';
import { Item } from '../../store/itemsStore';
import { useCartStore } from '../../store/cartStore';
import { images } from '../../model/imagesList';
import styles from './ProductItem.module.scss';

export const ProductItem = (product: Item) => {
  const { t, i18n } = useTranslation();
  const addToCart = useCartStore((state) => state.addToCart);

  const findImgForItem = (item: Item): string | undefined => {
    const imgMatch = images.find((img) => img.id === item.id);
    return imgMatch?.img;
  };

  const imgForItem = findImgForItem(product);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.productItemWrapper}>
        <img
          src={imgForItem?.toString() ?? ''}
          width={'250px'}
          height={'250px'}
        />
        <p className={styles.productsName}>
          {i18n.language === 'pl' ? product.namePL : product.nameEN}
        </p>
        {product.hotprice ? (
          <div className={styles.pricesWrapper}>
            <div>{product.hotprice} PLN</div>
            <div style={{ textDecoration: 'line-through', padding: '10px' }}>
              {product.price} PLN
            </div>
          </div>
        ) : (
          <p className={styles.price}>{product.price} PLN</p>
        )}
        <button onClick={handleAddToCart}>{t('pages.start.addToCart')}</button>
      </div>
    </div>
  );
};
