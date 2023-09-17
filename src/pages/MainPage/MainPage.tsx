import { useEffect } from 'react';
import { useItemsActions, useItemsStore } from '../../store/itemsStore';
import ProductItem from '../../components/ProductItem';
import { CustomLink } from '../../components/CustomLink';
import './MainPage.modue.scss';

export const MainPage = () => {
  const { getItems } = useItemsActions;
  const { item } = useItemsStore();

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="infoWrapper">
          <div className="celebrate">Celebrate Your Senses</div>
          <div className="logo">RADISH</div>
          <div className="restaurant">RESTAURANT</div>
        </div>
        <a href="./#showMore" className="showMoreLink">
          Pokaż więcej
        </a>
      </div>
      <div id="showMore">
        <div className="contentWrapper">
          <h1>Popularne dania</h1>
          <div className="content">
            {item.map((i) => {
              return <ProductItem name={i.name} price={i.price} id={i.id} />;
            })}
          </div>
          <div className="menuLinkWrapper">
            <CustomLink to="/menu">Przejdź do menu</CustomLink>
          </div>
        </div>
      </div>
    </>
  );
};
