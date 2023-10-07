import { useEffect } from 'react';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import ProductItem from '../../components/ProductItem';
import { CustomLink } from '../../components/CustomLink';
import './MainPage.modue.scss';
import { ContactUs } from '../../components/ContactUs';
import Rectangle9 from '../../assets/Rectangle9.png';
import Rectangle8 from '../../assets/Rectangle8.png';
import Rectangle11 from '../../assets/Rectangle11.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

export const MainPage = () => {
  const { getItems } = useItemsActions;
  const { item } = useItemsStore();

  useEffect(() => {
    getItems();
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
          <a href="./#showMore">Pokaż więcej</a>
        </div>
      </div>
      <div className="contactUsWrapper">
        <ContactUs />
      </div>

      <div id="showMore">
        <div className="contentWrapper">
          <h1>Popularne dania</h1>
          <div className="scrollWrapper text-center">
            <Carousel style={{ maxWidth: '600px', margin: 'auto' }}>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block mx-auto" // Dodano klasę mx-auto
                    src={image}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          {/* <div className="content">
            {item.map((i) => {
              return <ProductItem name={i.name} price={i.price} id={i.id} />;
            })}
          </div> */}
          <div className="menuLinkWrapper">
            <CustomLink to="/menu">Przejdź do menu</CustomLink>
          </div>
        </div>
      </div>
    </>
  );
};
