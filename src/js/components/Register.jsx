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
    return (
      <div className="ppsp-enter-bl">
        <div className="ppsp-base-content">
          <div className="ppsp-base-card">
            <form className="ppsp-reg-block">

              <div className="ppsp-reg-title">
                <span className="title">Вход</span>
              </div>

              <div className="ppsp-reg-controls">
                <div className="ppsp-reg-inline">
                  <div className="psp-contr-label">Емейл</div>
                  <input type="text" className="psp-contr-input" />
                </div>

                <div className="ppsp-reg-inline">
                  <div className="psp-contr-label">Пароль</div>
                  <input type="password" name="" id="" className="psp-contr-input" />
                </div>
              </div>

              <div className="ppsp-reg-buttons">
                <Button
                  classMod="ppsp-blue-btn type-active ppsp-reg-submit"
                  title="Вход"
                  onClick={this.login.bind(this)}
                />

                <div className="ppsp-reg-social">
                  <a href="#" className="ppsp-social-vk"></a>
                  <a href="#" className="ppsp-social-fb"></a>
                  <a href="#" className="ppsp-social-ok"></a>
                </div>

                <Button
                  classMod="ppsp-blue-btn ppsp-reg-forget"
                  title="Забыли пароль"
                  onClick={this.register.bind(this)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
