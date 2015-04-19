import React from 'react';

import Userpic from '../Userpic.jsx';

export default class Leader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-lider-item">
        <div className="ppsp-lider-number">{this.props.position}</div>
        <Userpic type="ppsp-lider-ava" pic={this.props.avatar} />
        <div className="ppsp-lider-name">{this.props.name}</div>
        <div className="ppsp-lider-points">{this.props.points} олдиков</div>
      </div>
    );
  }
}
