import BaseStore from './BaseStore.js';
import { INIT_API, LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';

class LoginStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToAction.bind(this));
    this._user = null;
    this._config = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case INIT_API:
        this._config = action.data;
        this.emitChange();
        break;

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

  get config() {
    return this._config;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
