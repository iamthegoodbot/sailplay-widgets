let sailplay = window.SAILPLAY;

export default class Sailplay {
  constructor(id, hash) {
    this.id = id;
    this.hash = hash;
  }

  init() {
    return this.instance ? this.instance : this.instance = new Promise((resolve, reject) => {
      sailplay.send('init', { partner_id: this.id });

      sailplay.on('init.success', resolve);
      sailplay.on('init.error', reject);
    });
  }

  login() {
    return this.user ? this.user : this.user = new Promise((resolve, reject) => {
      sailplay.send('login', this.hash);

      sailplay.on('login.success', resolve);
      sailplay.on('login.error', reject);
    });
  }

  userInfo() {
    let _this = this;

    return _this.instance.then(_this.user).then(() =>
        new Promise((resolve, reject) => {
          sailplay.send('load.user.info');

          sailplay.on('load.user.info.success', resolve);
          sailplay.on('load.user.info.error', reject);
        })
    )
  }

  userHistory() {
    let _this = this;

    return _this.instance.then(_this.user).then(() =>
        new Promise((resolve, reject) => {
          sailplay.send('load.user.history');

          sailplay.on('load.user.history.success', resolve);
          sailplay.on('load.user.history.error', reject);
        })
    )
  }

  giftsList() {
    let _this = this;

    return _this.instance.then(_this.user).then(() =>
        new Promise((resolve, reject) => {
          sailplay.send('load.gifts.list');

          sailplay.on('load.gifts.list.success', resolve);
          sailplay.on('load.gifts.list.error', reject);
        })
    )
  }

  badgesList() {
    let _this = this;

    return _this.instance.then(_this.user).then(() =>
        new Promise((resolve, reject) => {
          sailplay.send('load.badges.list');

          sailplay.on('load.badges.list.success', resolve);
          sailplay.on('load.badges.list.error', reject);
        })
    )
  }

  actionsList() {
    let _this = this;

    return _this.instance.then(_this.user).then(() =>
        new Promise((resolve, reject) => {
          sailplay.send('load.actions.list');

          sailplay.on('load.actions.list.success', resolve);
          sailplay.on('load.actions.list.error', reject);
        })
    )
  }

  actionPerform(action) {
    let _this = this;

    return _this.instance.then(_this.user).then(() => new Promise((resolve, reject) => {
      sailplay.send('actions.perform', action);

      sailplay.on('actions.perform.complete', resolve);
      sailplay.on('actions.perform.auth.error', reject);
    }));
  }
}
