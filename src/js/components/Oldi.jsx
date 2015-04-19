import React from 'react';

import ApiService from '../services/ApiService.js';

import LoginStore from '../stores/LoginStore.js';
import UserStore from '../stores/UserStore.js';
import MessageStore from '../stores/MessageStore.js';

import CloseBtn from './CloseBtn.jsx';
import Dashboard from './Dashboard.jsx';
import Content from './Content.jsx';
import Message from './Message.jsx';

export default class Oldi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: LoginStore.isLoggedIn(),
      user: UserStore.userInfo,
      display: props.display,
      messageText: MessageStore.message,
      messageShow: MessageStore.show
    };
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onLoginChange.bind(this));
    MessageStore.addChangeListener(this._onMessageChange.bind(this));
    UserStore.addChangeListener(this._onUserChange.bind(this));
    ApiService.init(this.props.partnerId);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onLoginChange.bind(this));
    MessageStore.removeChangeListener(this._onMessageChange.bind(this));
    UserStore.removeChangeListener(this._onUserChange.bind(this));
  }

  closePopup() {
    this.setState({ display: false });
  }

  render() {
    let display = {
      display: this.state.display ? 'block' : 'none'
    };

    return (
      <div id='ppsp' style={display}>
        <CloseBtn closeAction={this.closePopup.bind(this)} />
        <div className="ppsp-con">
          <Dashboard isAuth={this.state.isLoggedIn} user={this.state.user} />
          <Content isAuth={this.state.isLoggedIn} user={this.state.user} partnerId={this.props.partnerId} />
          <Message show={this.state.messageShow} text={this.state.messageText} />
        </div>
      </div>
    )
  }

  _onLoginChange() {
    this.setState({ isLoggedIn: LoginStore.isLoggedIn() });
  }

  _onUserChange() {
    this.setState({ user: UserStore.userInfo });
  }

  _onMessageChange() {
    this.setState({
      messageText: MessageStore.message,
      messageShow: MessageStore.show
    })
  }
}
