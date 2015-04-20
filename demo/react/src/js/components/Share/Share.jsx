import React from 'react';

import TasksStore from '../../stores/TasksStore.js';
import ShareBtn from './ShareBtn.jsx';

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: TasksStore.purchaseTasks };
  }

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let tasks = this.state.tasks
      , displayStyle = {
          display: this.props.isAuth ? 'none' : 'block'
        };

    return (
      <div className="ppsp-final-content">
        <div className="ppsp-final-card">
          <div className="ppsp-final-card-title">
            Расскажите друзьям о покупке и получите за это <span className="ppsp-final-card-title__points">10 олдиков!</span>
          </div>
          <div className="ppsp-final-social">
            {tasks && tasks.map(task => <ShareBtn key={task._actionId} action={task} isAuth={this.props.isAuth} />)}
          </div>
          <div className="ppsp-final-footer" style={displayStyle}>
            Вы должны быть авторизированы, чтобы мы смогли начислить вам олдики
          </div>
        </div>
        <div className="ppsp-final-count">
          <div className="ppsp-final-count-title"></div>
          <div className="ppsp-final-count-list"></div>
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState({ tasks: TasksStore.purchaseTasks });
  }
}
