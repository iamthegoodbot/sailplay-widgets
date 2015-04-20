import { EventEmitter } from 'events';
import AppDispather from '../dispatchers/AppDispatcher.js';

export default class BaseStore extends EventEmitter {
  constructor(actionSubscribe) {
    super();
    this._dispatchToken = AppDispather.register(actionSubscribe);
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    this.emit('CHANGE');
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb);
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}
