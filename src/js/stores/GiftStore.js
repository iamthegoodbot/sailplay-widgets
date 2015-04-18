import BaseStore from './BaseStore.js';
import { GIFT_SELECT } from '../constants/Constants.js';

class GiftStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._tasks = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case GIFT_SELECT:
        this._tasks = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get gift() {
    return this._tasks;
  }
}

export default new GiftStore();
