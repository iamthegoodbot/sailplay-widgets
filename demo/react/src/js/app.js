import React from 'react';
import Oldi from './components/Oldi.jsx';

const appRoot = document.getElementById('sp-loyalty-app');

const PARTNER_ID = appRoot.getAttribute('data-partner-id');
const PAGE = appRoot.getAttribute('data-page') !== 'undefined' ? appRoot.getAttribute('data-page') : '';
const DOMAIN = appRoot.getAttribute('data-domain') !== 'undefined' ? appRoot.getAttribute('data-domain') : 'https://sailplay.ru';
const ORDER_NUM = appRoot.getAttribute('data-order-num') !== 'undefined' ? appRoot.getAttribute('data-order-num') : undefined;
const PRICE = appRoot.getAttribute('data-price') !== 'undefined' ? appRoot.getAttribute('data-price') : undefined;

React.render(
  <Oldi
    partnerId={PARTNER_ID}
    show={PAGE === 'thanks'}
    page={PAGE}
    domain={DOMAIN}
    orderNum={ORDER_NUM}
    price={PRICE}
  />,
  appRoot
);
