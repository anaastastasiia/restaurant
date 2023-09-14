import { useState } from 'react';
import './MainPage.modue.scss';
import ProductItem from '../../components/ProductItem';

export const MainPage = () => {
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
            {/* <h1>Nowa zawartość</h1> */}
            {/* <p>Tutaj jest więcej treści...</p> */}
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </div>
      </div>
    </>
  );
};
