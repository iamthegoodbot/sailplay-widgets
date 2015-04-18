import { HISTORY_LOADED } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class HistoryStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case HISTORY_LOADED:
        this._leaderboard = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get history() {
    return this._leaderboard;
  }
}

export default new HistoryStore();
