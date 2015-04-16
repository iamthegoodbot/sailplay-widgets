import React from 'react';

import NavStore from '../stores/NavStore.js';
import MainMenu from './MainMenu.jsx';
import Register from './Register.jsx';
import Gifts from './Gifts.jsx';
import Tasks from './Tasks.jsx';
import Leaderboard from './Leaderboard.jsx';
import Feedback from './Feedback.jsx';

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: props.isAuth,
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
      , auth = this.state.isAuth;

    if (curr === 'gift') {
      return <Gifts isAuth={auth} />
    } else if (curr === 'task') {
      return <Tasks isAuth={auth} />
    } else if (curr === 'lider') {
      return <Leaderboard isAuth={auth} />
    } else if (curr === 'feedback') {
      return <Feedback isAuth={auth} />
    } else if (curr === 'register') {
      return <Register />
    }
  }
}
