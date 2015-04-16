import React from 'react';

import SailplayService from '../services/SailplayService.js';
import GiftsActions from '../actions/GiftsActions.js';
import TasksActions from '../actions/TasksActions.js';
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
    this._initSailplay();
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
          <Dashboard isAuth={this.state.isLoggedIn} user={this.state.user} />
          <Content isAuth={this.state.isLoggedIn} />
        </div>
      </div>
    )
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  _getLoginState() {
    return {
      isLoggedIn: LoginStore.isLoggedIn(),
      user: LoginStore.user
    }
  }

  _initSailplay() {
    let onError = (err) => {
      console.error(err.message);
    };

    SailplayService.init(this.props.partnerId)
      .then(() => {
        SailplayService.giftsList().then(GiftsActions.giftsLoaded, onError);
        SailplayService.actionsList().then(TasksActions.tasksLoaded, onError);
      })
      .catch(onError);
  }
}
