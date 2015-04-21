import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { NAVIGATE, HISTORY_BACK } from '../constants/Constants.js';

export default {
  navigate: data => {
    AppDispatcher.dispatch({
      actionType: NAVIGATE,
      data
    });
  },

  back: data => {
    AppDispatcher.dispatch({
      actionType: HISTORY_BACK,
      data
    })
  }
}
