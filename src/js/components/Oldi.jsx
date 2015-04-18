import React from 'react';

import SailplayService from '../services/SailplayService.js';
import GiftsActions from '../actions/GiftsActions.js';
import TasksActions from '../actions/TasksActions.js';
import LoginStore from '../stores/LoginStore.js';
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
      user: LoginStore.user
    };
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onLoginChange.bind(this));
    MessageStore.addChangeListener(this._onMessageChange.bind(this));
    this._initSailplay();
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onLoginChange.bind(this));
    MessageStore.removeChangeListener(this._onMessageChange.bind(this));
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
          <Content isAuth={this.state.isLoggedIn} user={this.state.user} />
          <Message show={this.state.messageShow} text={this.state.messageText} />
        </div>
      </div>
    )
  }

  _onLoginChange() {
    this.setState({
      isLoggedIn: LoginStore.isLoggedIn(),
      user: LoginStore.user
    });
  }

  _onMessageChange() {
    this.setState({
      messageText: MessageStore.message,
      messageShow: MessageStore.show
    })
  }

  _initSailplay() {
    let onError = (err) => {
      console.error(err.message);
    };

    SailplayService.init(this.props.partnerId)
      .then(() => {
        Promise.all([
          SailplayService.giftsList(),
          SailplayService.actionsList()
        ]).then(res => {
            let [ gifts, tasks ] = res;

            GiftsActions.giftsLoaded(gifts);
            TasksActions.tasksLoaded(tasks);
          }, onError)
      })
      .catch(onError);
  }
}
