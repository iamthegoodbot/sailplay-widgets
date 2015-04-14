import React from 'react';

import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import Points from './Points.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-profile">
        <Avatar imagePath="../img/image-sample.png" userName="Foo" />
        <Points points="450" />
        <Button title="История начислений" classsMod="ppsp-profile-btn" />
      </div>
    );
  }
}
