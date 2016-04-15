(function (angular, sp) {

  angular.module('iledebeaute.services.users', [])

    .service('userService', function () {

      var self = this;

      self.loadInfo = function () {
        return new Promise(function (resolve, reject) {
          sp.on('load.user.info.success', function (user) {
            self.info = user;
            self.sending_info = false;
            resolve(angular.extend({}, self.info));
          });
          if (!self.sending_info) {
            sp.send('load.user.info', {purchases: 1, all: 1});
          }
          self.sending_info = true;
        });
      };


      self.getInfo = function () {
        if (self.info) {
          return new Promise(function (resolve, reject) {
            resolve(angular.extend({}, self.info));
          });
        } else {
          return self.loadInfo();
        }
      };

      self.addTags = function (tags) {
        return new Promise(function (resolve) {
          if (!tags) resolve();
          var limit = Math.ceil(tags.length / 10);
          var state = 0;

          function partialSending() {
            if (!tags.length) return;
            var add = function () {
              if (tags.length > 9) {
                sp.send('tags.add', {tags: tags.splice(0, 9)});
              } else if (tags.length) {
                sp.send('tags.add', {tags: tags});
                tags = [];
              }
            };
            if (tags.length) {
              add();
            }
          }

          function checkState() {
            if (state == limit) {
              resolve();
            } else {
              partialSending();
            }
          }

          sp.on('tags.add.success', function () {
            state++;
            checkState();
          });

          partialSending();

        });
      };


      self.addVars = function (vars) {
        return new Promise(function (resolve, reject) {
          sp.on('user.vars.add.success', function (res) {
            resolve();
          });
          sp.send('user.vars.add', vars);
        })
      };

      function getTimeZone() {
        var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
      }

      self.loadHistory = function () {
        return new Promise(function (resolve, reject) {
          sp.on('load.user.history.success', function (history) {
            self.history = history;
            self.sending_history = false;
            resolve(angular.extend([], self.history));
          });
          if (!self.sending_history) {
            sp.send('load.user.history', {tz: getTimeZone()});
          }
          self.sending_history = true;

        });
      };

      self.getHistory = function () {
        if (self.history) {
          return new Promise(function (resolve, reject) {
            resolve(angular.extend([], self.history));
          });
        } else {
          return self.loadHistory();
        }
      };

      self.existTags = function (tags) {
        return new Promise(function (resolve, reject) {
          sp.on('tags.exist.success', function (res) {
            resolve(angular.extend({}, res.tags));
          });
          sp.send('tags.exist', tags);
        });
      };

      self.toDateObj = function (date) {
        return new Date(date);
      };

      self.historyDateFormat = function (date) {

        var monthNames = [
          "января", "февраля", "марта",
          "апреля", "мая", "июня", "июля",
          "августа", "сентября", "октября",
          "ноября", "декабря"
        ];

        var date = self.toDateObj(date);
        var day = date.getUTCDate();
        var monthIndex = date.getUTCMonth();
        var year = date.getUTCFullYear();
        var hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        var minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();

        //return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes;
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      };

      self.getHistoryActionName = function (action) {
        if (!action) return 'Нет описания';
        var history_items = {
          "purchase": "Покупка",
          "gift_purchase": "Подарок",
          "badge": "Бейджик",
          "registration": "Регистрация",
          "referral": "Регистрация друга",
          "referred": "Регистрация по приглашению",
          "referred_purchase": "Покупка приглашенного пользователя",
          "promocode": "За ввод промокода",
          "enter_group": "Вступление в группу ",
          "share_purchase": "Рассказ о покупке в ",
          "social_share": "Рассказ в ",
          "share_badge": "Рассказ о бейджике в ",
          "earn_badge": 'Получен бейджик '
        };
        switch (action.action) {
          case 'event':
            return action.name || 'Нет описания';
          case 'extra':
            return action.name || 'Нет описания';
          case 'sharing':
            switch (action.social_action) {
              case 'like':
                return history_items.enter_group + action.social_type;
              case 'purchase':
                return history_items.share_purchase + action.social_type;
              case 'partner_page':
                return history_items.social_share + action.social_type;
              case 'badge':
                return history_items.share_badge + action.social_type;
            }
        }
        return history_items[action.action] || 'Нет описания';
      };


    });

}(window.angular, window.SAILPLAY));