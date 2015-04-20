import React from 'react';

import Userpic from '../Userpic.jsx';

export default class FeedbackItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-feedback-item">
        <Userpic type="ppsp-feedback-ava" pic={this.props.avatar} />
        <div className="ppsp-feedback-content">
          <div className="ppsp-feedback-title">Оценка: {this.props.score}</div>
          <div className="ppsp-feedback-text">{this.props.text}</div>
        </div>
      </div>
    );
  }
}
