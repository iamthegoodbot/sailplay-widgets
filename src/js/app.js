import React from 'react';

import Oldi from './components/Oldi.jsx';
import Sailplay from './services/SailplayService.js';

let appRoot = document.getElementById('oldi-loyalty-app')
  , partnerId = appRoot.getAttribute('data-partner-id')
  , authHash = appRoot.getAttribute('data-auth-hash');

let sp = new Sailplay(partnerId, authHash);

sp.init()
  .then(sp.login.bind(sp))
  .then(sp.userInfo.bind(sp))
  .then(console.log.bind(console))
  .catch(console.error.bind(console));

React.render(
  <Oldi />,
  appRoot
);
