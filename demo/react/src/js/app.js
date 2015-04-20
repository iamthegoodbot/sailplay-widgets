import React from 'react';

import Oldi from './components/Oldi.jsx';
import Sailplay from './services/SailplayService.js';

let appRoot = document.getElementById('oldi-loyalty-app');

const PARTNER_ID = appRoot.getAttribute('data-partner-id');
const DISPLAY = appRoot.getAttribute('data-display');
const PAGE = appRoot.getAttribute('data-page');

React.render(
  <Oldi partnerId={PARTNER_ID} show={DISPLAY} page={PAGE} />,
  appRoot
);
