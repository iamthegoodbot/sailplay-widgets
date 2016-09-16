(function () {

  angular.module('sg.services.api', [])

    .service('sp', function ($window, $log) {

      if (!$window.SAILPLAY) {
        $log.error('SAILPLAY HUB not found');
        return false;
      }

      return $window.SAILPLAY;

    })

    .service('api', function (sp, $q, $http) {

      var self = this;

      self.auth = false;

      self.isAuth = function(){
         return self.auth;
      };

      self.domain = function () {
        return sp.config() && sp.config().DOMAIN;
      };

      self.gifts = {};

      self.gifts.list = function () {
        return $q(function (resolve, reject) {
          sp.on('load.gifts.list.success', function (res) {
            self.data('gifts.list', res);
            resolve(res);
          });
          sp.send('load.gifts.list');
        });
      };

      self.actions = {};

      self.actions.list = function () {
        return $q(function (resolve, reject) {
          sp.on('load.actions.list.success', function (res) {
            var actions = res.actions.filter(function (item) {
              return item.socialType;
            });
            self.data('actions.list', actions);
            resolve(res);
          });
          sp.send('load.actions.list');
        });
      };

      self.badges = {};

      self.badges.list = function () {
        return $q(function (resolve, reject) {
          sp.on('load.badges.list.success', function (res) {
            self.data('badges.list', res);
            resolve(res);
          });
          sp.send('load.badges.list');
        });
      };

      self.user = {
        tags: {},
        vars: {}
      };

      function getTimeZone() {
        var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
      }

      self.user.history = function () {
        return $q(function (resolve, reject) {
          sp.on('load.user.history.success', function (res) {
            self.data('user.history', res);
            resolve(res);
          });
          sp.send('load.user.history', {tz: getTimeZone()});
        });
      };

      self.user.info = function (params) {
        params = params || {};
        params.purchases = 1;
        params.all = 1;
        return $q(function (resolve, reject) {
          sp.on('load.user.info.success', function (res) {
            self.data('user.info', res);
            resolve(res);
          });
          sp.send('load.user.info', params);
        });

      };

      self.user.update = function (data) {
        if (!data)return;
        return $q(function (resolve) {
          sp.on('user.update.success', function (res) {
            resolve(res);
          });
          sp.send('user.update', data)
        });
      };

      self.user.tags.add = function (tags, user) {
        return $q(function (resolve) {
          if (!tags) resolve();
          var limit = Math.ceil(tags.length / 10);
          var state = 0;

          var data = {};
          if (user) {
            data.user = user;
          }

          function partialSending() {
            if (!tags.length) return;
            var add = function () {
              if (tags.length > 9) {
                data.tags = tags.splice(0, 9);
                sp.send('tags.add', data);
              } else if (tags.length) {
                data.tags = tags;
                sp.send('tags.add', data);
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

      self.user.tags.exist = function (data) {
        return $q(function (resolve, reject) {
          if (!data) resolve();
          sp.on('tags.exist.success', function (res) {
            resolve(res);
          });
          sp.send('tags.exist', data);
        });
      };

      self.user.vars.add = function (vars) {
        return $q(function (resolve, reject) {
          if (!vars) resolve();
          sp.on('vars.add.success', function (res) {
            resolve(res);
          });
          sp.send('vars.add', vars);
        })
      };

      self.user.logout = function () {
        return $q(function (resolve) {
          sp.on('logout.success', function(res){
            resolve(res);
          });
          sp.on('logout.error', function(res){
            resolve(res);
          });
          sp.send('logout');
        });
      };

      var data = {};

      self.data = function (key, value) {
        if (value) {
          data[key] = angular.copy(value);
        }
        return function () {
          return data[key];
        };
      };

    });

}());