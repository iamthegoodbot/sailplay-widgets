import { HISTORY_LOADED } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class HistoryStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._message = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case HISTORY_LOADED:
        this._message = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get history() {
    return this._message;
  }
}

export default new HistoryStore();
