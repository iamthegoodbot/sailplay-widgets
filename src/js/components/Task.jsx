import React from 'react';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
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
          <a className="ppsp-task-btn ppsp-blue-btn type-active" href="#">Выполнить</a>
        </div>
      </div>
    );
  }
}
