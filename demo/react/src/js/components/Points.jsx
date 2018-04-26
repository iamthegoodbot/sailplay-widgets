import React, { Component } from 'react';

export default class Points extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-points">
        <div className="ppsp-points__number">{this.props.points}</div>
        <div className="ppsp-points__caption">олдиков</div>
      </div>
    );
  }
}
