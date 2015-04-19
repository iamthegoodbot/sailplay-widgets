import SailplayService from './SailplayService.js';

import LoginActions from '../actions/LoginActions.js';
import UserActions from '../actions/UserActions.js';
import GiftsActions from '../actions/GiftsActions.js';
import TasksActions from '../actions/TasksActions.js';
import HistoryActions from '../actions/HistoryActions.js';
import LeaderboardActions from '../actions/LeaderboardActions.js';
import MessageActions from '../actions/MessageActions.js';

let onError = err => { console.error(err.message) };

class ApiService {
  init(id) {
    SailplayService.init(id)
      .then(() => {
        Promise.all([
          SailplayService.giftsList(),
          SailplayService.actionsList()
        ]).then(res => {
          let [ gifts, tasks ] = res;

          GiftsActions.giftsLoaded(gifts);
          TasksActions.tasksLoaded(tasks);
        }, onError)
      })
  }

  login(hash) {
    SailplayService.login(hash)
      .then(user => {
        LoginActions.loginUser(user);

        Promise.all([
          SailplayService.userInfo(),
          SailplayService.userHistory(),
          SailplayService.leaderboardLoad()
        ]).then(res => {
          let [ userInfo, userHistory, leaderboard ] = res;

          UserActions.userLoaded(userInfo);
          HistoryActions.historyLoaded(userHistory);
          LeaderboardActions.leaderboardLoaded(leaderboard);
        }, onError);
      })
      .catch(onError);
  }

  logout() {
    SailplayService.logout().then(() => {
      LoginActions.logoutUser();
    });
  }

  actionPerform(action) {
    SailplayService.actionPerform(action)
      .then(() => {
        this.actionsList();
        this.userInfo();
      })
      .catch(onError);
  }

  actionsList() {
    SailplayService.actionsList().then(TasksActions.tasksLoaded, onError);
  }

  userInfo() {
    SailplayService.userInfo().then(UserActions.userLoaded, onError);
  }

  giftPurchase(id) {
    SailplayService.giftPurchase(id)
      .then(() => {
        MessageActions.showMessage('Поздравляем, вы приобрели подарок! Проверьте почту.');
        this.userInfo();
      }, onError);
  }
}

export default new ApiService();
