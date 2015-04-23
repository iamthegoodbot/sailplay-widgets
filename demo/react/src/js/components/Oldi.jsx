import React from 'react';

import ApiService from '../services/ApiService.js';

import LoginStore from '../stores/LoginStore.js';
import UserStore from '../stores/UserStore.js';
import MessageStore from '../stores/MessageStore.js';

import CloseBtn from './CloseBtn.jsx';
import Dashboard from './Dashboard.jsx';
import Content from './Content.jsx';
import Message from './Message.jsx';
import Mini from './Mini/Mini.jsx';

export default class Oldi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoggedIn: LoginStore.isLoggedIn()
      , user: UserStore.userInfo
      , show: props.show
      , messageText: MessageStore.message
      , messageShow: MessageStore.show
    };
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onLoginChange.bind(this));
    MessageStore.addChangeListener(this._onMessageChange.bind(this));
    UserStore.addChangeListener(this._onUserChange.bind(this));
    ApiService.init({
        partner_id: this.props.partnerId
      , domain: this.props.domain
    });
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onLoginChange.bind(this));
    MessageStore.removeChangeListener(this._onMessageChange.bind(this));
    UserStore.removeChangeListener(this._onUserChange.bind(this));
  }

  closePopup() {
    this.setState({ show: false });
  }

  showPopup() {
    this.setState({ show: true });
  }

  render() {
    let display = {
          display: this.state.show ? 'block' : 'none'
        };

    return (
      <div>
        <div id='ppsp' style={display}>
          <CloseBtn closeAction={this.closePopup.bind(this)} />
          <div className="ppsp-con">
            <Dashboard
              isAuth={this.state.isLoggedIn}
              user={this.state.user}
            />
            {
              this.state.partnerId
                ? <Content
                    partnerId={this.state.partnerId}
                    isAuth={this.state.isLoggedIn}
                    user={this.state.user}
                    page={this.props.page}
                  />
                : null
            }
            <Message
              show={this.state.messageShow}
              text={this.state.messageText}
            />
          </div>
        </div>
        <Mini
          isAuth={this.state.isLoggedIn}
          user={this.state.user}
          onClick={this.showPopup.bind(this)}
        />
      </div>
    )
  }

  _onLoginChange() {
    this.setState({
        isLoggedIn: LoginStore.isLoggedIn()
      , partnerId: LoginStore.config ? LoginStore.config.partner.id : null
    });
  }

  _onUserChange() {
    this.setState({ user: UserStore.userInfo });
  }

  _onMessageChange() {
    this.setState({
        messageText: MessageStore.message
      , messageShow: MessageStore.show
    })
  }
}
