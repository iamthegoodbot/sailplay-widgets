import React from 'react';

import Oldi from './components/Oldi.jsx';
import Sailplay from './services/SailplayService.js';

let appRoot = document.getElementById('sp-loyalty-app');

const PARTNER_ID = appRoot.getAttribute('data-partner-id');
const DISPLAY = appRoot.getAttribute('data-display') !== null;
const PAGE = appRoot.getAttribute('data-page');
const DOMAIN = appRoot.getAttribute('data-domain') || 'https://sailplay.ru';

React.render(
  <Oldi
    partnerId={PARTNER_ID}
    show={DISPLAY}
    page={PAGE}
    domain={DOMAIN}
  />,
  appRoot
);
