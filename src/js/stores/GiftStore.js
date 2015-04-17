import { GIFT_SELECT } from '../constants/Constants.js';
import BaseStore from './BaseStore.js';

class GiftStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._message = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFT_SELECT:
        this._message = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gift() {
    return this._message;
  }
}

export default new GiftStore();
