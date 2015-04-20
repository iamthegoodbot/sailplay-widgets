import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { USER_LOADED } from '../constants/Constants.js';

export default {
  userLoaded: (data) => {
    AppDispatcher.dispatch({
      actionType: USER_LOADED,
      data
    });
  }
}
