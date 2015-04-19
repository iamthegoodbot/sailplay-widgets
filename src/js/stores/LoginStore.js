import BaseStore from './BaseStore.js';
import { LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';

class LoginStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._user = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case LOGIN_USER:
        this._user = action.data;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._user = null;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get user() {
    return this._user;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
