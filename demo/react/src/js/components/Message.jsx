import React from 'react';

import MessageActions from '../actions/MessageActions.js';

export default class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = { show: props.show };
  }

  handler() {
    MessageActions.hideMessage();
  }

  render() {
    return (
      <div className={`ppsp-alert-bl ${this.props.show ? '' : 'hidden'}`} onClick={this.handler.bind(this)}>
        {this.props.text}
      </div>
    );
  }
}
