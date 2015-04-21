import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { INIT_API, LOGIN_USER, LOGOUT_USER } from '../constants/Constants.js';

export default {
  initApi: data => {
    AppDispatcher.dispatch({
      actionType: INIT_API,
      data
    })
  },

  loginUser: data => {
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
