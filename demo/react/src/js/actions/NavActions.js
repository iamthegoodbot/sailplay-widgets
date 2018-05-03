import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { NAVIGATE, HISTORY_BACK } from '../constants/Constants.js';

export default {
  navigate: page => {
    AppDispatcher.dispatch({
      actionType: NAVIGATE,
      page
    });
  },

  back: depth => {
    AppDispatcher.dispatch({
      actionType: HISTORY_BACK,
      depth
    })
  }
}
