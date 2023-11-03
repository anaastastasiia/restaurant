import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';
import Rectangle9 from '../../assets/Rectangle9.png';
import Rectangle8 from '../../assets/Rectangle8.png';
import Rectangle11 from '../../assets/Rectangle11.png';
import sushi from '../../assets/sushi.png';
import ProductItem from '../../components/ProductItem';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import { CustomLink } from '../../components/CustomLink';
import { ContactUs } from '../../components/ContactUs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.modue.scss';

export const MainPage = () => {
  const { t } = useTranslation();
  const { getItems, getHotPriceItems } = useItemsActions;
  const { hotPriceItems } = useItemsStore();

  useEffect(() => {
    getItems();
    getHotPriceItems();
  }, []);

  const images = [Rectangle9, Rectangle8, Rectangle11];

  return (
    <>
      <div className="wrapper">
        <div className="infoWrapper">
          <div className="celebrate">Celebrate Your Senses</div>
          <div className="logo">RADISH</div>
          <div className="restaurant">RESTAURANT</div>
        </div>
        <div className="showMoreWrapper">
          <a href="./#showMore">{t('pages.start.showMore')}</a>
        </div>
      </div>
      <div className="contactUsWrapper">
        <ContactUs />
      </div>

      <div id="showMore">
        <div className="contentWrapper">
          <h1>{t('pages.start.popularDishes')}</h1>
          <div className="scrollWrapper text-center">
            <Carousel style={{ maxWidth: '600px', margin: 'auto' }}>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block mx-auto"
                    src={image}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="menuLinkWrapper">
            <CustomLink to="/menu">{t('pages.start.goToMenu')}</CustomLink>
          </div>
        </div>
        <div className="sushiImgWrapper">
          <img src={sushi} />
        </div>
        <div className="lowPricesWrapper">
          <h1>{t('pages.start.hotPrices')}</h1>
          <div className="hotPriceContentWrapper">
            <div className="hotPriceContent">
              {hotPriceItems.map((i) => {
                return (
                  <ProductItem
                    name={i.name}
                    price={i.price}
                    id={i.id}
                    newPrice={i.newPrice}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
