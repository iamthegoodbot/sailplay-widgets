import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { FEEDBACK_LOADED, FEEDBACK_LEAVED } from '../constants/Constants.js';

export default {
  feedbackLoaded: data => {
    AppDispatcher.dispatch({
      actionType: FEEDBACK_LOADED,
      data
    });
  }
}
