import BaseStore from './BaseStore.js';
import { GIFTS_LOADED } from '../constants/Constants.js';

class GiftsStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._tasks = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFTS_LOADED:
        this._tasks = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gifts() {
    return this._tasks;
  }
}

export default new GiftsStore();
