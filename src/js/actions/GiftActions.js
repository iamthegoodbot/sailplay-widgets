import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { GIFT_SELECT } from '../constants/Constants.js';

export default {
  giftSelected: (data) => {
    AppDispatcher.dispatch({
      actionType: GIFT_SELECT,
      data
    });
  }
}
