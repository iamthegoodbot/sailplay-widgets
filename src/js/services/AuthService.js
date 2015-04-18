import SailplayService from './SailplayService.js';

import LoginActions from '../actions/LoginActions.js';
import HistoryActions from '../actions/HistoryActions.js';
import LeaderboardActions from '../actions/LeaderboardActions.js';

class AuthService {
  login() {
    const AUTH_HASH = '24c1902f2eb729a2f64c1968e4bf6be363ea0731';

    let onError = (err) => { console.error(err.message) };

    SailplayService.login(AUTH_HASH)
      .then(() => {
        Promise.all([
          SailplayService.userInfo(),
          SailplayService.userHistory(),
          SailplayService.leaderboardLoad()
        ]).then(res => {
          let [ userInfo, userHistory, leaderboard ] = res;

          LoginActions.loginUser(userInfo);
          HistoryActions.historyLoaded(userHistory);
          LeaderboardActions.leaderboardLoaded(leaderboard);
        }, onError);
      })
      .catch(onError);
  }

  logout() {}
}

export default new AuthService();
