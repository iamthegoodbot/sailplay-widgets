import React from 'react';

import NavActions from '../../actions/NavActions.js';

export default class MainMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handler(e) {
    e.preventDefault();

    NavActions.navigate(this.props.type);
  }

  render() {
    let classString = `ppsp-nav-item type-${this.props.type}`;

    this.props.isActive && (classString += ' type-active');

    return (
      <a href="#" className={classString} onClick={this.handler.bind(this)}>{this.props.text}</a>
    );
  }
}
