import { TASKS_LOADED } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class TasksStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case TASKS_LOADED:
        this._leaderboard = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get tasks() {
    return this._leaderboard;
  }
}

export default new TasksStore();
