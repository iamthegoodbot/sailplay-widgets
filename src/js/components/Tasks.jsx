import React from 'react';

import TasksStore from '../stores/TasksStore.js';
import Task from './Task.jsx';

let tasksDict = {
  fb: {
    partner_page: {
      title: 'Расскажи в Facebook',
      pic: 'fb-2'
    },
    like: {
      title: 'Вступи в группу Facebook',
      pic: 'fb'
    }
  },
  vk: {
    partner_page: {
      title: 'Расскажи в VK',
      pic: 'vk-2'
    },
    like: {
      title: 'Вступи в группу VK',
      pic: 'vk'
    }
  },
  tw: {
    partner_page: {
      title: 'Расскажи в Твиттер',
      pic: 'profile'
    },
    like: {
      title: 'Подпишись на Твиттер',
      pic: 'profile'
    }
  },
  ok: {
    partner_page: {
      title: 'Расскажи в ОК',
      pic: 'profile'
    },
    like: {
      title: 'Вступай в группу в ОК',
      pic: 'profile'
    }
  },
  gp: {
    partner_page: {
      title: 'Расскажи в Google+',
      pic: 'profile'
    },
    like: {
      title: 'Вступай в группу в Google+',
      pic: 'profile'
    }
  },
  emailBinding: {
    sample: {
      title: 'Оставьте ваш емейл',
      pic: 'profile'
    }
  }
};

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

  render() {
    let actions = this.state.tasks.actions
      , tasks = actions.map(task =>
          <Task
            type={task.socialType}
            points={task.points}
            text="Вступите в группу"
            isAuth={this.props.isAuth}
            onClick={() => { console.log(task.type) }}
          />
        );

    return (
      <div className="ppsp-task-list-bl">
        <div className="ppsp-scroll-outer">
          {tasks}
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState({ tasks: TasksStore.tasks });
  }
}
