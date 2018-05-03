import BaseStore from './BaseStore.js';
import { USER_LOADED, LOGOUT_USER } from '../constants/Constants.js';

class UserStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToAction.bind(this));
    this._userInfo = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case USER_LOADED:
        this._userInfo = action.data;
        this.emitChange();
        break;

      case LOGOUT_USER:
        this._userInfo = null;
        break;

      default:
        break;
    }
  }

  get userInfo() {
    return this._userInfo;
  }
}

export default new UserStore();
