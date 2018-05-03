import React, { Component } from 'react';

import MessageActions from '../actions/MessageActions.js';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
  }

  handler() {
    MessageActions.hideMessage();
  }

  render() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setInterval(MessageActions.hideMessage, 2000);

    return (
      <div className={`ppsp-alert-bl ${this.props.show ? 'ppsp-alert-bl_show' : '' }`} onClick={this.handler.bind(this)}>
        {this.props.text}
      </div>
    );
  }
}
