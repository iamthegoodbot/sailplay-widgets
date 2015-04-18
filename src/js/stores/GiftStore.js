import { GIFT_SELECT } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class GiftStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFT_SELECT:
        this._leaderboard = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gift() {
    return this._leaderboard;
  }
}

export default new GiftStore();
