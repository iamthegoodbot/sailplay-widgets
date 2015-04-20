import React from 'react';

import ApiService from '../services/ApiService.js';
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

  componentDidMount() {
    let node = React.findDOMNode(this.refs.authFrame);

    ApiService.loginRemote(node);
  }

  render() {
    let style = {
      width: 400,
      height: 430
    };

    return (
      <div className="ppsp-enter-bl">
        <div className="ppsp-base-content">
          <iframe
            ref="authFrame"
            style={style}
            //src={`http://saike.dev.sailplay.ru/users/auth-page/?partner_id=${this.props.partnerId}`}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    );
  }
}
