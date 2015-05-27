import BaseStore from './BaseStore.js';
import { FEEDBACK_LOADED } from '../constants/Constants.js';

class FeedbackStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToAction.bind(this));
    this._feedback = null;
  }

  _registerToAction(action) {
    switch (action.actionType) {
      case FEEDBACK_LOADED:
        this._feedback = action.data;
        this.emitChange();
        break;

      default:
        break;
    }
  }

  get feedback() {
    return this._feedback;
  }
}

export default new FeedbackStore();
