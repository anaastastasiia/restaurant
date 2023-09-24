import styles from './ContactPage.module.scss';
import React from 'react';
import GoogleMapReact from 'google-map-react';

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }} // Zastąp 'TWÓJ_KLUCZ_API' własnym kluczem API Google Maps
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Dodaj marker na mapie */}
        <AnyReactComponent lat={center.lat} lng={center.lng} text="Miejsce" />
      </GoogleMapReact>
    </div>
  );
};
const AnyReactComponent: React.FC<{
  lat: number;
  lng: number;
  text: string;
}> = ({ text }) => <div>{text}</div>;
//<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.6685399890134!2d19.46844629999999!3d51.77566645000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb265106e829%3A0xf21167d962131d1f!2sAkademia%20Humanistyczno-Ekonomiczna%20w%20%C5%81odzi!5e0!3m2!1spl!2spl!4v1695572456182!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
export const ContactPage = () => {
  const center = { lat: 51.774969, lng: 19.469697 }; // Współrzędne centrum mapy
  const zoom = 11; // Poziom powiększenia
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>Kontakt</div>
        </div>
      </div>
      <div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div>Skontaktuj się z nami</div>
          </div>
          <div className={styles.mapWrapper}>
            <div>Jak do nas dojechać</div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.6685399890134!2d19.46844629999999!3d51.77566645000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb265106e829%3A0xf21167d962131d1f!2sAkademia%20Humanistyczno-Ekonomiczna%20w%20%C5%81odzi!5e0!3m2!1spl!2spl!4v1695572456182!5m2!1spl!2spl"
              width="900"
              height="300"
            ></iframe>
            {/* <Map center={center} zoom={zoom} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
