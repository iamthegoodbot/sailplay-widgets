import BaseStore from './BaseStore.js';
import { MESSAGE } from '../constants/Constants.js';

class MessageStore extends BaseStore {
  constructor() {
    super(this._registerToAction.bind(this));
    this._message = null;
  }

  _registerToAction(action) {
    let data = action.data;
    
    switch (action.actionType) {
      case MESSAGE:
        this._message = data.message;
        this._show = data.show;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get message() {
    return this._message;
  }

  get show() {
    return this._show;
  }
}

export default new MessageStore();
