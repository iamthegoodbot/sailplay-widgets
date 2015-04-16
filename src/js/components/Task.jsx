import React from 'react';

import NavActions from '../actions/NavActions.js';
import Button from './Button.jsx';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  performAction() {
    if (!this.props.isAuth) {
      return NavActions.navigate('register');
    }
  }

  render() {
    let taskClass = `ppsp-task-item type-${this.props.type}`
      , pointsText = `+${this.props.points} олдиков`;

    return (
      <div className={taskClass}>
        <div className="ppsp-task-img"></div>
        <div className="ppsp-task-content">
          <div className="ppsp-task-title">
            <span className="ppsp-task-title__text">{this.props.text}</span>
            <span className="ppsp-task-title__points">{pointsText}</span>
          </div>
          <Button
            classMod="ppsp-task-btn ppsp-blue-btn type-active"
            title="Выполнить"
            onClick={this.performAction.bind(this)}
          />
        </div>
      </div>
    );
  }
}
