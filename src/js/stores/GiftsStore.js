import { GIFTS_LOADED } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class GiftsStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFTS_LOADED:
        this._leaderboard = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gifts() {
    return this._leaderboard;
  }
}

export default new GiftsStore();
