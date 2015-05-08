import React, { Component } from 'react';

import NavActions from '../actions/NavActions.js';
import NavStore from '../stores/NavStore.js';

import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import Points from './Points.jsx';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { activeView: NavStore.currentRoute };
  }

  componentDidMount() {
    NavStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    NavStore.removeChangeListener(this._onChange.bind(this));
  }

  showHistory() {
    NavActions.navigate('history');
  }

  render() {
    let user = this.props.user.user
      , points = this.props.user.user_points.total;

    return (
      <div className="ppsp-profile">
        <Avatar path={user.pic} title='Здравствуйте,' username={user.name} />
        <Points points={points} />
        <Button
          title="История начислений"
          classMod={`ppsp-profile-btn ${this.state.activeView === 'history' ? 'm-active-btn' : ''}`}
          onClick={this.showHistory.bind(this)}
        />
      </div>
    );
  }

  _onChange() {
    this.setState({ activeView: NavStore.currentRoute });
  }
}
