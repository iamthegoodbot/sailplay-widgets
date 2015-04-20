import SailplayService from './SailplayService.js';

import LoginActions from '../actions/LoginActions.js';
import UserActions from '../actions/UserActions.js';
import GiftsActions from '../actions/GiftsActions.js';
import TasksActions from '../actions/TasksActions.js';
import HistoryActions from '../actions/HistoryActions.js';
import LeaderboardActions from '../actions/LeaderboardActions.js';
import MessageActions from '../actions/MessageActions.js';
import NavActions from '../actions/NavActions.js';

let onError = err => { console.error(err.message) };

class ApiService {
  init(id) {
    SailplayService.init(id)
      .then(() => {
        return Promise.all([
          SailplayService.giftsList(),
          SailplayService.actionsList(),
          SailplayService.leaderboardLoad()
        ]).then(res => {
          let [ gifts, tasks, leaderboard ] = res;

          GiftsActions.giftsLoaded(gifts);
          TasksActions.tasksLoaded(tasks);
          LeaderboardActions.leaderboardLoaded(leaderboard);
        }, onError)
      }).catch(onError);
  }

  loginRemote(frameNode) {
    SailplayService.initRemote(frameNode)
      .then(user => {
        LoginActions.loginUser(user);

        return Promise.all([
          SailplayService.userInfo(),
          SailplayService.userHistory()
        ]).then(res => {
          let [ userInfo, userHistory ] = res;

          UserActions.userLoaded(userInfo);
          HistoryActions.historyLoaded(userHistory);

          NavActions.back();
        }, onError);
      })
      .catch(onError);
  }

  login(hash) {
    SailplayService.login(hash)
      .then(user => {
        LoginActions.loginUser(user);

        Promise.all([
          SailplayService.userInfo(),
          SailplayService.userHistory()
        ]).then(res => {
          let [ userInfo, userHistory ] = res;

          UserActions.userLoaded(userInfo);
          HistoryActions.historyLoaded(userHistory);

          NavActions.back();
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
