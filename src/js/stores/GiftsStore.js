import { GIFTS_LOADED } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class GiftsStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._message = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFTS_LOADED:
        this._message = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gifts() {
    return this._message;
  }
}

export default new GiftsStore();
