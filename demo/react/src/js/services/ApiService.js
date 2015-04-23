import SailplayService from './SailplayService.js';

import LoginActions from '../actions/LoginActions.js';
import UserActions from '../actions/UserActions.js';
import GiftsActions from '../actions/GiftsActions.js';
import TasksActions from '../actions/TasksActions.js';
import HistoryActions from '../actions/HistoryActions.js';
import LeaderboardActions from '../actions/LeaderboardActions.js';
import FeedbackActions from '../actions/FeedbackActions.js';
import MessageActions from '../actions/MessageActions.js';
import NavActions from '../actions/NavActions.js';

let onError = err => { console.error(err.message) };

class ApiService {
  init(id) {
    SailplayService.init(id)
      .then(config => {
        LoginActions.initApi(config);

        this.gifts();
        this.actionsList();
        this.leaderboard();
        this.feedback();
      }).catch(onError);
  }

  loginRemote(frameNode) {
    SailplayService.initRemote(frameNode)
      .then(user => {
        LoginActions.loginUser(user);
        this.userInfo();
        this.userHistory();
        NavActions.back();
      })
      .catch(onError);
  }

  login(hash) {
    SailplayService.login(hash)
      .then(user => {
        LoginActions.loginUser(user);
        this.userInfo();
        this.userHistory();
        NavActions.back();
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

  gifts() {
    SailplayService.giftsList().then(GiftsActions.giftsLoaded, onError);
  }


  actionsList() {
    SailplayService.actionsList().then(TasksActions.tasksLoaded, onError);
  }

  userInfo() {
    SailplayService.userInfo().then(UserActions.userLoaded, onError);
  }

  userHistory() {
    SailplayService.userHistory().then(HistoryActions.historyLoaded, onError);
  }

  leaderboard() {
    SailplayService.leaderboardLoad().then(LeaderboardActions.leaderboardLoaded, onError);
  }

  feedback() {
    SailplayService.reviewsList().then(FeedbackActions.feedbackLoaded, onError);
  }

  feedbackLeave(review) {
    SailplayService.reviewAdd(review).then(res => {
      MessageActions.showMessage('Отзыв отправлен на модерацию');
      this.feedback();
      NavActions.back();
    }, onError);
  }

  giftPurchase(id) {
    SailplayService.giftPurchase(id).then(() => {
      MessageActions.showMessage('Поздравляем, вы приобрели подарок! Проверьте почту.');
      this.userInfo();
      NavActions.back();
    }, onError);
  }
}

export default new ApiService();
