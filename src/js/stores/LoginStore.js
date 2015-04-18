import BaseStore from './BaseStore.js';
import { LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';

class LoginStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._tasks = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case LOGIN_USER:
        this._tasks = action.data;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._tasks = null;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get user() {
    return this._tasks;
  }

  isLoggedIn() {
    return !!this._tasks;
  }
}

export default new LoginStore();
