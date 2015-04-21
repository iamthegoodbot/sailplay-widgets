import React from 'react';

import NavActions from '../../actions/NavActions.js';
import ApiService from '../../services/ApiService.js';

export default class ShareBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  handler() {
    if (!this.props.isAuth) {
      NavActions.navigate('auth');
    } else {
      ApiService.actionPerform.call(ApiService, this.props.action);
    }
  }

  render() {
    return (
      <div className={`ppsp-social-${this.props.action.socialType} size-big`} onClick={this.handler.bind(this)}></div>
    );
  }
}
