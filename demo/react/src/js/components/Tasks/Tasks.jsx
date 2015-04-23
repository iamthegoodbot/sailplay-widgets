import React from 'react';

import TasksStore from '../../stores/TasksStore.js';
import Task from './Task.jsx';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: TasksStore.tasks
    }
  }

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange.bind(this));
  }

  performAction() {}

  render() {
    let tasks = this.state.tasks;

    return (
      <div className="ppsp-task-list-bl">
        <div className="ppsp-scroll-outer">
          {tasks ? tasks.map(task => <Task key={task._actionId} action={task} isAuth={this.props.isAuth} />) : null}
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState({ tasks: TasksStore.tasks });
  }
}
