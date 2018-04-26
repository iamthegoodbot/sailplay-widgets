import BaseStore from './BaseStore.js';
import { GIFTS_LOADED } from '../constants/Constants.js';

class GiftsStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToAction.bind(this));
    this._gifts = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFTS_LOADED:
        this._gifts = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gifts() {
    return this._gifts;
  }
}

export default new GiftsStore();
