import BaseStore from './BaseStore.js';
import { LEADERBOARD_LOADED } from '../constants/Constants.js';

class LeaderboardStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case LEADERBOARD_LOADED:
        this._leaderboard = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get leaderboard() {
    return this._leaderboard;
  }
}

export default new LeaderboardStore();
