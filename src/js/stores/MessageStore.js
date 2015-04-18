import { MESSAGE } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class MessageStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    let data = action.data;
    
    switch (action.actionType) {
      case MESSAGE:
        this._leaderboard = data.message;
        this._show = data.show;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get message() {
    return this._leaderboard;
  }

  get show() {
    return this._show;
  }
}

export default new MessageStore();
