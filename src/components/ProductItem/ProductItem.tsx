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
import { Item } from '../../store/itemsStore';
import styles from './ProductItem.module.scss';

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
];

export const ProductItem = (product: Item) => {
  const findImgForItem = (item: Item): string | undefined => {
    const imgMatch = images.find((img) => img.id === item.id);
    return imgMatch?.img;
  };

  const imgForItem = findImgForItem(product);

  return (
    <div className={styles.wrapper}>
      <div className={styles.productItemWrapper}>
        <img src={imgForItem ?? ''} width={'250px'} height={'250px'} />
        <p>{product.price}</p>
        <p className={styles.productsName}>{product.name}</p>
        <button>Szczegóły</button>
      </div>
    </div>
  );
};
