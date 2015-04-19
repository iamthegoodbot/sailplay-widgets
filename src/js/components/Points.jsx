import React from 'react';

export default class Points extends React.Component {
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
