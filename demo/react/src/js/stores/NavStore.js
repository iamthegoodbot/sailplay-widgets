import BaseStore from './BaseStore.js';
import { NAVIGATE, HISTORY_BACK } from '../constants/Constants.js';

class NavStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._currentRoute = null;
    this._history = [];
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case NAVIGATE:
        this._currentRoute && this._history.push(this._currentRoute);
        this._currentRoute = action.data;
        this.emitChange();
        break;
      case HISTORY_BACK:
        this._currentRoute = this._history.pop();
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get currentRoute() {
    return this._currentRoute;
  }

  get history() {
    return this._history;
  }
}

export default new NavStore();
