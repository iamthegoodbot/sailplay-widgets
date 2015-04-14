import React from 'react';

import Auth from '../services/AuthService.js';
import Avatar from './Avatar.jsx';
import Points from './Points.jsx';
import Button from './Button.jsx';

export default class Default extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    Auth.login();
  }

  render() {
    return (
      <div className="ppsp-unauth">
        <Avatar imagePath="" userName="Здравствуйте" />
        <Points points="0" />
        <div className="ppsp-unauth-form">
          <div className="ppsp-unauth-text">
            <div>Зарегистрируйтесь,</div>
            <div>чтобы получать олдики</div>
          </div>
          <div>
            <Button classMod="ppsp-unauth-btn ppsp-white-btn" title="Вход" onClick={Auth.login.bind(this)} />
          </div>
          <div>
            <Button classMod="ppsp-unauth-btn ppsp-white-btn" title="Регистрация" />
          </div>
        </div>
      </div>
    );
  }
}
