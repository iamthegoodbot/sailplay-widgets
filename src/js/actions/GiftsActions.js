import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { GIFTS_LOADED } from '../constants/Constants.js';

export default {
  giftsLoaded: (data) => {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: GIFTS_LOADED,
      data
    });
  }
}
