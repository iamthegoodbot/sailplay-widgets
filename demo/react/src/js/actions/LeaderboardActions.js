import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { LEADERBOARD_LOADED } from '../constants/Constants.js';

export default {
  leaderboardLoaded: (data) => {
    AppDispatcher.dispatch({
      actionType: LEADERBOARD_LOADED,
      data
    });
  }
}
