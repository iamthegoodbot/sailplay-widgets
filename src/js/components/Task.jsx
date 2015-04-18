import React from 'react';

import NavActions from '../actions/NavActions.js';
import TasksActions from '../actions/TasksActions.js';
import SailplayService from '../services/SailplayService.js';
import Button from './Button.jsx';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  performAction() {
    if (!this.props.isAuth) {
      NavActions.navigate('register');
    } else {
      SailplayService.actionPerform(this.props.action)
        .then(SailplayService.actionsList)
        .then(TasksActions.tasksLoaded)
        .catch(err => console.error(err.message));
    }
  }

  render() {
    let action = this.props.action
      , pointsText = `+${action.points} олдиков`
      , imageStyle = {
          backgroundImage: `url(${action.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        };

    return (
      <div className="ppsp-task-item">
        <div className="ppsp-task-img" style={imageStyle}></div>
        <div className="ppsp-task-content">
          <div className="ppsp-task-title">
            <span className="ppsp-task-title__text">{action.text}</span>
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
