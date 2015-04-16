import React from 'react';

import Profile from './Profile.jsx';
import Default from './Default.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isAuth: props.isAuth };
  }

  render() {
    return (
      <div className="ppsp-left">
        {this.props.isAuth ? <Profile user={this.props.user} /> : <Default />}
      </div>
    );
  }

  //get dashboardContent() {
  //  return this.state.isAuth ? <Profile /> : <Default />;
  //}
}
