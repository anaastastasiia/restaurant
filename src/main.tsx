import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import './styles/index.scss';

import translationsEn from '../src/model/translations/en/index.ts';
import translationsPl from '../src/model/translations/pl/index.ts';

i18n.use(XHR).init({
  resources: {
    en: {
      translation: translationsEn,
    },
    pl: {
      translation: translationsPl,
    },
  },
  lng: 'pl',
  fallbackLng: 'pl',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>
);
