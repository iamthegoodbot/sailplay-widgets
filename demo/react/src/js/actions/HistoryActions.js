import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { HISTORY_LOADED } from '../constants/Constants.js';

export default {
  historyLoaded: (data) => {
    AppDispatcher.dispatch({
      actionType: HISTORY_LOADED,
      data
    });
  }
}
