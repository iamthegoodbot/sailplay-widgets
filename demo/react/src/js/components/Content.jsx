import React from 'react';

import NavStore from '../stores/NavStore.js';

import MainMenu from './MainMenu/MainMenu.jsx';
import Auth from './Auth.jsx';
import Gifts from './Gifts/Gifts.jsx';
import GiftDetail from './GiftDetail.jsx';
import Tasks from './Tasks/Tasks.jsx';
import Leaderboard from './Leaderboard/Leaderboard.jsx';
import Feedback from './Feedback/Feedback.jsx';
import LeaveFeedback from './LeaveFeedback/LeaveFeedback.jsx';
import History from './History/History.jsx';
import Share from './Share/Share.jsx';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        activeView: props.page
      , showAuth: false
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
          <Auth show={this.state.showAuth} partnerId={this.props.partnerId} />
        </div>
      </div>
    );
  }

  _onChange() {
    let curr = NavStore.currentRoute;

    this.setState({
        activeView: curr
      , showAuth: curr === 'auth'
    });
  }

  _getCurrentView() {
    let curr = this.state.activeView
      , auth = this.props.isAuth
      , view = null;

    switch (curr) {
      case 'gift':
        view = <Gifts isAuth={auth} user={this.props.user} />;
        break;
      case 'gift_detail':
        view = <GiftDetail />;
        break;
      case 'task':
        view = <Tasks isAuth={auth} />;
        break;
      case 'lider':
        view = <Leaderboard />;
        break;
      case 'feedback':
        view = <Feedback />;
        break;
      case 'leave_feedback':
        view = <LeaveFeedback />;
        break;
      case 'history':
        view = <History />;
        break;
      case 'thanks':
        view = <Share isAuth={auth} />;
        break;
      case 'auth':
        view = null;
        break;
      default:
        view = <Gifts isAuth={auth} user={this.props.user} />;
        break;
    }

    return view;
  }
}
