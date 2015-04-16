import React from 'react';

import NavActions from '../actions/NavActions.js';
import NavStore from '../stores/NavStore.js';

import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import Points from './Points.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      points: props.user.user_points.total,
      activeView: NavStore.currentRoute
    };
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
    return (
      <div className="ppsp-profile">
        <Avatar path={this.state.user.pic} title={`Здравствуйте, ${this.state.user.name}`} />
        <Points points={this.state.points} />
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
