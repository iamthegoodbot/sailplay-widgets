import React from 'react';
import Oldi from './components/Oldi.jsx';

const appRoot = document.getElementById('sp-loyalty-app');

const PARTNER_ID = appRoot.getAttribute('data-partner-id');
const DISPLAY = appRoot.getAttribute('data-display') !== null;
const PAGE = appRoot.getAttribute('data-page') !== 'undefined' ? appRoot.getAttribute('data-page') : '';
const DOMAIN = appRoot.getAttribute('data-domain') || 'https://sailplay.ru';
const ORDER_NUM = appRoot.getAttribute('data-order-num');
const PRICE = appRoot.getAttribute('data-price');

React.render(
  <Oldi
    partnerId={PARTNER_ID}
    show={DISPLAY}
    page={PAGE}
    domain={DOMAIN}
    orderNum={ORDER_NUM}
    price={PRICE}
  />,
  appRoot
);
