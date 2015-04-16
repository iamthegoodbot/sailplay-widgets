import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { MENU_SELECT } from '../constants/Constants.js';

export default {
  navigate: (data) => {
    AppDispatcher.dispatch({
      actionType: MENU_SELECT,
      data
    });
  }
}
