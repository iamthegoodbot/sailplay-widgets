import { EventEmitter } from 'events';
import AppDispather from '../dispatchers/AppDispatcher.js';

export default class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = AppDispather.register(actionSubscribe());
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
