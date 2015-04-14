import LoginActions from '../actions/LoginActions.js';

class AuthService {
  login() {
    LoginActions.loginUser({
      last_badge: {},
      status: 'ok',
      user: {
        name: 'alex shestakov',
        pic: '//d3257v5wstjx8h.cloudfront.net/media/users/user/f85f9a9c3eafe2533e2814e7ac8dca57.100x100.jpg'
      },
      user_points: {},
      user_status: {}
    });
  }

  logout() {}
}

export default new AuthService();
