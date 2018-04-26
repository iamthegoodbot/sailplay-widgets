import React, { Component } from 'react';

import NavActions from '../actions/NavActions.js';

import Avatar from './Avatar.jsx';
import Points from './Points.jsx';
import Button from './Button.jsx';

export default class Default extends Component {
  constructor(props) {
    super(props);
  }

  handler() {
    NavActions.navigate('auth');
  }

  render() {
    return (
      <div className="ppsp-unauth">
        <Avatar path="" title="Здравствуйте" />
        <Points points="0" />
        <div className="ppsp-unauth-form">
          <div className="ppsp-unauth-text">
            <div>Зарегистрируйтесь,</div>
            <div>чтобы получать олдики</div>
          </div>
          <div>
            <Button
              title="Вход"
              classMod="ppsp-unauth-btn ppsp-white-btn"
              onClick={this.handler.bind(this)}
            />
          </div>
          <div>
            <Button
              title="Регистрация"
              classMod="ppsp-unauth-btn ppsp-white-btn"
              onClick={this.handler.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
