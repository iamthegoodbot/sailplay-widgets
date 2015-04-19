import React from 'react';

import Auth from '../services/AuthService.js';
import NavActions from '../actions/NavActions.js';

import Button from './Button.jsx';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    Auth.login();
    NavActions.navigate('gift');
  }

  register() {}

  render() {
    let style = {
      width: 400,
      height: 430
    };

    return (
      <div className="ppsp-enter-bl">
        <div className="ppsp-base-content">
          <iframe
            id="sp_auth"
            name="sp_auth_frame"
            style={style}
            src={`http://saike.dev.sailplay.ru/users/auth-page/?partner_id=${this.props.partnerId}`}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    );
  }
}
