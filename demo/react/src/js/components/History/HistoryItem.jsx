import React, { Component } from 'react';

export default class HistoryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let earned = `${this.props.points} баллов`;

    return (
      <div className="ppsp-points-item">
        <div className="ppsp-points-item-text">{this.props.text}</div>
        <div className="ppsp-points-item-date">{this.props.date}</div>
        <div className="ppsp-points-item-value">{earned}</div>
      </div>
    );
  }
}
