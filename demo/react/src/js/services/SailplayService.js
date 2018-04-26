let sailplay = window.SAILPLAY;

class Sailplay {
  init(params) {
    this.params = params;

    return new Promise((resolve, reject) => {
      sailplay.send('init', params);
      //sailplay.send('init', { partner_id: , domain: 'http://dev.sailplay.ru' });

      sailplay.on('init.success', resolve);
      sailplay.on('init.error', reject);
    });
  }

  login(hash) {
    this.authHash = hash;

    return new Promise((resolve, reject) => {
      sailplay.send('login', hash);

      sailplay.on('login.success', resolve);
      sailplay.on('login.error', reject);
    });
  }

  initRemote(options) {
    return new Promise((resolve, reject) => {
      sailplay.send('init.remote', options);

      sailplay.on('login.success', resolve);
      sailplay.on('login.error', reject);
      sailplay.on('login.cancel', reject);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      sailplay.send('logout');

      sailplay.on('logout.success', resolve);
      sailplay.on('logout.error', reject);
    });
  }

  userInfo() {
    return new Promise((resolve, reject) => {
      sailplay.send('load.user.info');

      sailplay.on('load.user.info.success', resolve);
      sailplay.on('load.user.info.error', reject);
    });
  }

  userHistory() {
    return new Promise((resolve, reject) => {
      sailplay.send('load.user.history');

      sailplay.on('load.user.history.success', resolve);
      sailplay.on('load.user.history.error', reject);
    });
  }

  giftsList() {
    return new Promise((resolve, reject) => {
      sailplay.send('load.gifts.list');

      sailplay.on('load.gifts.list.success', resolve);
      sailplay.on('load.gifts.list.error', reject);
    });
  }

  giftPurchase(id) {
    return new Promise((resolve, reject) => {
      sailplay.send('gifts.purchase', { id });

      sailplay.on('gifts.purchase.success', resolve);
      sailplay.on('gifts.purchase.auth.error', reject);
    });
  }

  leaderboardLoad() {
    return new Promise(function (resolve, reject) {
      sailplay.send('leaderboard.load');

      sailplay.on('leaderboard.load.success', resolve);
      sailplay.on('leaderboard.load.error', reject);
    });
  }

  actionsList() {
    return new Promise((resolve, reject) => {
      sailplay.send('load.actions.list');

      sailplay.on('load.actions.list.success', resolve);
      sailplay.on('load.actions.list.error', reject);
    });
  }

  actionPerform(action) {
    return new Promise((resolve, reject) => {
      sailplay.send('actions.perform', action);

      // Regular action performed, doesn't fire on social connect
      sailplay.on('actions.perform.complete', resolve);

      // Social network account connected
      sailplay.on('actions.social.connect.complete', resolve);

      sailplay.on('actions.perform.auth.error', reject);
    });
  }

  reviewsList() {
    return new Promise((resolve, reject) => {
      sailplay.send('load.reviews.list');

      sailplay.on('load.reviews.list.success', resolve);
      sailplay.on('load.reviews.list.error', reject);
    });
  }

  reviewAdd(review) {
    return new Promise((resolve, reject) => {
      sailplay.send('reviews.add', review);

      sailplay.on('reviews.add.success', resolve);
      sailplay.on('reviews.add.error', reject);
    });
  }

  purchasesAdd(orderNum, price) {
    return new Promise((resolve, reject) => {
      sailplay.send('purchases.add', { order_num: orderNum, price });

      sailplay.on('purchases.add.success', resolve);
      sailplay.on('purchases.add.error', reject);
    });
  }
}

export default new Sailplay();
