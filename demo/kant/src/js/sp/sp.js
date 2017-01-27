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

        'load.user.info',
        'load.gifts.list',
        'load.user.history',
        'tags.exist',
        'load.badges.list',
        'load.actions.list',
        'load.actions.custom.list'

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

      self.reset = function () {

        data = {};

      }

    })

    .service('tagHelper', function () {

      var self = this;

      self.checkTag = function (tag, exist) {

        return exist.tags.filter(function (item) {
          return item.name == tag && item.exist
        }).length

      };

      return self;

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

    .filter('tel', function () {
      return function (tel) {

        if (!tel) {
          return '';
        }

        tel = tel.replace(/[^\d]/g, "");

        //check if number length equals to 10
        if (tel.length >= 10) {
          //reformat and return phone number
          return tel.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
        }

        return null

      };
    })

    .filter('get_avatar', function ($filter) {

      function prepare(url) {
        if (url === '//sailplay.cdnvideo.ru/static/no_avatar100x100.jpg') {
          return '//d3sailplay.cdnvideo.ru/media/assets/assetfile/ec85a06fd4de8581f4e8f4c9b4ce2400.png'
        } else {
          return url;
        }
      }

      return function (url) {
        if (!url) return '';
        return $filter('sailplay_pic')(prepare(url))
      }

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
