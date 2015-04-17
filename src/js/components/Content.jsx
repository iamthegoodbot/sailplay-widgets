import React from 'react';

import NavStore from '../stores/NavStore.js';

import MainMenu from './MainMenu.jsx';
import Register from './Register.jsx';
import Gifts from './Gifts.jsx';
import GiftDetail from './GiftDetail.jsx';
import Tasks from './Tasks.jsx';
import Leaderboard from './Leaderboard.jsx';
import Feedback from './Feedback.jsx';
import History from './History.jsx';

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: NavStore.currentRoute
    };
  }

  componentDidMount() {
    NavStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    NavStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <div className="ppsp-right">
        <MainMenu active={this.state.activeView} />
        <div className="ppsp-content">
          {this._getCurrentView()}
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState({ activeView: NavStore.currentRoute });
  }

  _getCurrentView() {
    let curr = this.state.activeView
      , auth = this.props.isAuth
      , view;

    switch (curr) {
      case 'gift':
        view = <Gifts isAuth={auth} user={this.props.user} />;
        break;
      case 'giftDetail':
        view = <GiftDetail />;
        break;
      case 'task':
        view = <Tasks isAuth={auth} />;
        break;
      case 'lider':
        view = <Leaderboard isAuth={auth} />;
        break;
      case 'feedback':
        view = <Feedback isAuth={auth} />;
        break;
      case 'history':
        view = <History />;
        break;
      case 'register':
        view = <Register />;
        break;
      default:
        view = <Register />;
        break;
    }

    return view;
  }
}
