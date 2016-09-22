(function () {

  angular.module('sp', [

      'sp.actions',
      'sp.gifts',
      'sp.profile',
      'sp.status',
      'sp.history'

    ])

    .service('sp', function ($window) {

      return $window.SAILPLAY || {};

    })

    .service('sp_api', function ($q, sp, $rootScope) {

      var self = this;

      var data = {};

      var points = [

        'load.actions.list',
        'load.user.info',
        'load.gifts.list',
        'load.badges.list',
        'load.user.history',
        'tags.exist'

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

        sp.send(name, params, callback);

      };

    })

    .filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      };
    }])

    .filter('sailplay_pluralize', function () {
      var cases = [2, 0, 1, 1, 1, 2];
      return function (input, titles) {
        input = Math.abs(input);
        titles = titles.split(',');
        return titles[(input % 100 > 4 && input % 100 < 20) ? 2 : cases[(input % 10 < 5) ? input % 10 : 5]];
      }
    })

    .filter('sailplay_tag', function () {
      return function (tag, data) {
        if (!tag || !data) return;
        var el = data.tags.filter(function (item) {
          return item.name === tag;
        })[0];
        return el && el.exist || false;
      }
    })


    .filter('img_folder', function ($rootScope) {

      return function (pic_url) {

        if (!pic_url) return '';

        return $rootScope.config.imgPath ? $rootScope.config.imgPath + pic_url : pic_url;

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
