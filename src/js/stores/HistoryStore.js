import BaseStore from './BaseStore.js';
import { HISTORY_LOADED } from '../constants/Constants.js';

class HistoryStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._history = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case HISTORY_LOADED:
        this._history = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get history() {
    return this._history;
  }
}

export default new HistoryStore();
