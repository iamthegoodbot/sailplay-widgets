(function () {

  angular.module('sp', [
      'sp.actions',
      'sp.gifts',
      'sp.profile',
      'sp.statuses',
      'sp.history'

    ])

    .service('sp', function ($window) {

      return $window.SAILPLAY || {};

    })

    .service('user_service', function ($window) {

      var self = this;

      self.tags = {
        fill_profile: 'Fill the profile'
      };

      self.getTags = function(){
        return angular.copy(self.tags);
      };

      self.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };

      return self;

    })

    .service('status_service', function ($window) {

      var self = this;

      self.limits = [0, 15000, 30000];

      self.get_limits = function () {
        return angular.copy(self.limits);
      };

      self.count_percents = function (points) {
        if (!points) return 0;
        var arr = self.get_limits();
        if (points > arr[arr.length - 1]) return 100;
        var multiplier = 50;
        var state = 0;
        for (var i = 1, len = arr.length; i < len; i++) {
          if (points > arr[i] && i != 0) {
            state++;
          }
        }
        var current = 0;
        var total = arr[0];
        if (state === 0) {
          current = points;
          total = arr[state+1];
        } else {
          current = (points - arr[state]);
          total = (arr[state + 1] - arr[state]);
        }
        return ( ( (current * 100 ) / total * 0.5 ) + (state * multiplier) )
      };

      return self;

    })

    .service('sp_api', function ($q, sp, $rootScope) {

      var self = this;

      var data = {};

      var points = [

        'load.user.info',
        'load.gifts.list',
        'load.user.history',
        'load.actions.list',
        'load.badges.list'

      ];

      angular.forEach(points, function (point) {

        sp.on(point + '.success', function (res) {

          $rootScope.$apply(function () {
            self.data(point, res);

            if ($rootScope.debug) {
              console.log('sailplay.api:' + point + '.success');
              console.dir(self.data(point)());
            }

          });

        });

        sp.on(point + '.error', function (res) {
          $rootScope.$apply(function () {

            if ($rootScope.debug) {
              console.log('sailplay.api:' + point + '.error');
              console.dir(res);
            }

            self.data(point, null);
          });
        });

      });

      self.data = function (key, value) {

        if (typeof value !== 'undefined') {

          data[key] = angular.copy(value);

        }

        return function () {
          return data[key];
        };

      };

      self.call = function (name, params, callback) {

        sp.send(name, params);

      };

    })

    .filter('sailplay_pic', function (sp) {

      function repair_pic_url(url) {
        if (/^((http|https|ftp):\/\/)/.test(url)) {
          return url;
        }
        if (url.indexOf('//') === 0) {
          return window.location.protocol + url;
        }
        else {
          return sp.config().DOMAIN + url;
        }
      }

      return function (pic_url) {

        if (!pic_url) return '';

        return repair_pic_url(pic_url);

      };

    });

}());
