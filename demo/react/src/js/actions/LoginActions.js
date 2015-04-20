import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';

export default {
  loginUser: (data) => {
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      data
    });
  },

  logoutUser: () => {
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    })
  }
}
