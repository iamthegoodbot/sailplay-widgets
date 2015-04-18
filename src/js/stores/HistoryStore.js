import BaseStore from './BaseStore.js';
import { HISTORY_LOADED } from '../constants/Constants.js';

class HistoryStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._tasks = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case HISTORY_LOADED:
        this._tasks = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get history() {
    return this._tasks;
  }
}

export default new HistoryStore();
