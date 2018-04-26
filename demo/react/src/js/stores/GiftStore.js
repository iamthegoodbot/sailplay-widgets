import BaseStore from './BaseStore.js';
import { GIFT_SELECT } from '../constants/Constants.js';

class GiftStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToAction.bind(this));
    this._gift = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFT_SELECT:
        this._gift = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gift() {
    return this._gift;
  }
}

export default new GiftStore();
