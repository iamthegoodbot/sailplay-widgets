(function (angular, sp) {

  angular.module('stalos.services.actions', [])

    .service('actionService', function () {

      var self = this;

      var TAGS = {
        profile: 'Заполнил профиль',
        doublePoints: 'Бонус на 8-е марта'
      };

      var cssLink = 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/5521075f9b58473fc4e52dbbefaa5eac.css';

      self.loadList = function () {
        self.actions = [];
        return new Promise(function (resolve, reject) {
          sp.on('load.actions.list.success', function (data) {
            self.actions = data.actions.filter(function (item) {
              return item.socialType;
            });
            self.sending = false;
            resolve(angular.extend([], self.actions));
          });
          if (!self.sending) {
            sp.send('load.actions.list');
          }
          self.sending = true;

        });
      };

      self.getTitle = function (action) {
        if (!action) return 'Нет описания';
        var obj = {
          like: 'Вступить в группу ',
          partner_page: 'Рассказать о нас друзьям в '
        };
        var socObj = {
          fb: 'Fb',
          tw: 'Tw',
          gp: 'Google+',
          ok: 'Ok',
          vk: 'Vk'
        };
        var result = (obj[action.action] ? obj[action.action] : '') + (socObj[action.socialType] ? socObj[action.socialType] : '');
        return result || 'Нет описания';
      };

      self.getIcon = function (action) {

      };

      self.getIcon = function (action) {
        if (!action) return '';
        var obj = {
          vk: ['image/task-icon-01.png', 'image/task-icon-hover-01.png'],
          fb: ['image/task-icon-02.png', 'image/task-icon-hover-02.png']
        };
        if (action.socialType && obj[action.socialType]) {
          return obj[action.socialType];
        } else {
          return [];
        }
      };

      self.getList = function () {
        if (self.actions) {
          return new Promise(function (resolve, reject) {
            resolve(angular.extend([], self.actions));
          });
        } else {
          return self.loadList();
        }
      };

      self.getTags = function () {
        return TAGS;
      };

      self.getActionsCssLink = function () {
        return cssLink;
      };

    });

}(window.angular, window.SAILPLAY));