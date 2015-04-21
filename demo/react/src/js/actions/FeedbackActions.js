import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { FEEDBACK_LOADED } from '../constants/Constants.js';

export default {
  feedbackLoaded: (data) => {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: FEEDBACK_LOADED,
      data
    });
  }
}
