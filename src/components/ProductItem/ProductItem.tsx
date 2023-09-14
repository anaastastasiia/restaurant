import item from '../../assets/Rectangle7.png';
import styles from './ProductItem.module.scss';

export const ProductItem = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.productItemWrapper}>
        <img src={item} width={'200px'} height={'200px'} />
        <p>Cena</p>
        <p className={styles.productsName}>Nazwa</p>
        <button>Szczegóły</button>
      </div>
    </div>
  );
};
