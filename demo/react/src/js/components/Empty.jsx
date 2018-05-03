import React, { Component } from 'react';

export default class Empty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-scroll-card">
        <div className="ppsp-empty-text">
          <span className="ppsp-empty-text__header">{this.props.title}</span>
          <span className="ppsp-empty-text__body">{this.props.text}</span>
        </div>
      </div>
    );
  }
}
