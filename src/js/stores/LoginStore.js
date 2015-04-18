import { LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class LoginStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._leaderboard = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case LOGIN_USER:
        this._leaderboard = action.data;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._leaderboard = null;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get user() {
    return this._leaderboard;
  }

  isLoggedIn() {
    return !!this._leaderboard;
  }
}

export default new LoginStore();
