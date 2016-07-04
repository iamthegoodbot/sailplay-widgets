(function (angular, sp) {

  angular.module('respect.services.actions', [])

    .service('actionService', function () {

      var self = this;

      var TAGS = {
        profile: 'Заполнил профиль',
        view: 'Оставил отзыв'
      };

      var cssLink = 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ddf86ff4133efc2e52e7b4a0deab2b73.css';

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
          partner_page: 'Рассказать о нас друзьям в ',
          purchase: 'Рассказать о покупке в '
        };
        var socObj = {
          fb: 'Facebook',
          ok: 'Одноклассники',
          vk: 'Вконтакте'
        };
        var result = (obj[action.action] ? obj[action.action] : '') + (socObj[action.socialType] ? socObj[action.socialType] : '');
        return result || 'Нет описания';
      };

      self.getIcon = function (action) {
        if(!action) return '';
        var obj = {
          partner_page: {
            fb: 'icon-04',
            vk: 'icon-02',
            ok: 'icon-06'
          },
          like: {
            fb: 'icon-04',
            vk: 'icon-02',
            ok: 'icon-06'
          },
          purchase: {
            fb: 'icon-04',
            vk: 'icon-02',
            ok: 'icon-06'
          }
        };
        if (action.socialType && obj[action.action] && obj[action.action][action.socialType]) {
          return obj[action.action][action.socialType];
        } else {
          return '';
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