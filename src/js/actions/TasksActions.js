import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { TASKS_LOADED } from '../constants/Constants.js';

export default {
  tasksLoaded: (data) => {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: TASKS_LOADED,
      data
    });
  }
}
