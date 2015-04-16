import React from 'react';
import assign from 'object-assign';

import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import Points from './Points.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.user,
      points: 450
    };
  }

  render() {
    return (
      <div className="ppsp-profile">
        <Avatar path={this.state.user.pic} title={`Здравствуйте, ${this.state.user.name}`} />
        <Points points={this.state.points} />
        <Button title="История начислений" classsMod="ppsp-profile-btn" />
      </div>
    );
  }
}
