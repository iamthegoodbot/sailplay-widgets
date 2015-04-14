import React from 'react';

import LoginStore from '../stores/LoginStore.js';
import CloseBtn from './CloseBtn.jsx';
import Dashboard from './Dashboard.jsx';
import Content from './Content.jsx';

export default class Oldi extends React.Component {
  constructor(props) {
    super(props);

    this.state = this._getLoginState();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange.bind(this));
  }

  closePopup() {
    console.log('Close popup');
  }

  render() {
    return (
      <div id='ppsp'>
        <CloseBtn closeAction={this.closePopup} />
        <div className="ppsp-con">
          <Dashboard isAuth={this.state.isLoggedIn} />
          <Content />
        </div>
      </div>
    )
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  _getLoginState() {
    return { isLoggedIn: LoginStore.isLoggedIn() }
  }
}
