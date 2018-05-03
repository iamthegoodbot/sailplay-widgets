import assign from 'object-assign';

import BaseStore from './BaseStore.js';
import { TASKS_LOADED } from '../constants/Constants.js';

let tasksMap = {
  fb: {
    text: 'Вступите в группу FB',
    image: 'https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/22ce4d37a61a9f92df5ebad70039fed7.png'
  },
  vk: {
    text: 'Вступите в группу ВК',
    image: 'https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/8e607c50237fb3f67180fba545a50ee6.png'
  },
  ok: {
    text: 'Вступите в группу ОК',
    image: 'https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/8eacae4cd36f2b1a2b10eeca017984cc.png'
  },
  inviteFriend: {
    text: 'Пригласить друга',
    image: 'https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/e474b21f5f1cfe4a96d5ff73b7f1dfd9.png'
  },
  fillProfile: {
    text: "Заполнить профиль",
    image: "https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/e456f95ab5976a2adedff99468cb8ac7.png"
  },
  leaveFeedback: {
    _actionId: 0,
    action: 'leave_feedback',
    text: "Оставить отзыв",
    points: 15,
    image: "https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/04b19c9e5a4a6c527cadbb7a76ba30b1.png"
  }
};

let enrichAction = task => assign({}, task, tasksMap[task.socialType ? task.socialType : task.type]);

class TasksStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToAction.bind(this));
    this._tasks = null;
    this._purchaseTasks = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case TASKS_LOADED:
        this._filterTasks(action.data.actions);
        this.emitChange();
        break;

      default:
        break;
    }
  }

  _filterTasks(actions) {
    let tasks = []
      , purchaseTasks = [];

    actions.forEach(action => {
      if (action.action === 'purchase') {
        purchaseTasks.push(action);
      } else {
        tasks.push(enrichAction(action));
      }
    });

    tasks.push(tasksMap.leaveFeedback);

    this._tasks = tasks;
    this._purchaseTasks = purchaseTasks;
  }

  get tasks() {
    return this._tasks;
  }

  get purchaseTasks() {
    return this._purchaseTasks;
  }
}

export default new TasksStore();
