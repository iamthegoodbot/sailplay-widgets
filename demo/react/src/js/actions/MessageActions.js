import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { MESSAGE } from '../constants/Constants.js';

export default {
  showMessage: (message) => {
    AppDispatcher.dispatch({
      actionType: MESSAGE,
      data: { show: true, message }
    });
  },

  hideMessage: () => {
    AppDispatcher.dispatch({
      actionType: MESSAGE,
      data: { show: false }
    });
  }
}
