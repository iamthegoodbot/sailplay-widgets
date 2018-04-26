angular.module('hobby_world', [
  'core',
  'ui',
  'sp',
  'templates'
])

  .run(function(hwDataService){

    // Load custom data
    hwDataService.loadData();


  })

  .service('hwDataService', function ($rootScope, $http, $q) {

    var self = this;

    var data = {};

    self.loadData = function () {

      var recommend_list = $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_recommend_list
      }).then(function (res) {
        data['recommend_list'] = res.data.upsale;
      });

      var game_of_the_day = $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_game_of_the_day
      }).then(function (res) {
        data['game_of_day'] = res.data.game_of_day;
      });

      var wish_list = $http({
        method: "GET",
        url: $rootScope.config.data.urls.get_wish_list
      }).then(function (res) {
        data['wish_list'] = res.data.wishlist;
      });

      return $q.all(recommend_list, game_of_the_day, wish_list);

    };

    self.getData = function (key) {
      return function () {
        return data[key];
      };
    };

    return self;

  })

  .filter('wish_state', function () {
    var types = {
      follow: 'Отслеживаемый товар',
      available: 'Снова в продаже'
    };
    return function (wish) {
      return types[wish.state]
    }
  })

  .directive('hwBlock', function (hwDataService) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.wish_list = hwDataService.getData('wish_list');
        scope.game_of_day = hwDataService.getData('game_of_day');
        scope.recommend_list = hwDataService.getData('recommend_list');

      }
    }
  })

  .directive('sailplayHw', function ($rootScope, $locale) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/main.html',
      link: function (scope, element) {

        scope.global = $rootScope;

        // $rootScope.debug = true;

        scope.show_history = function () {
          scope.show_hist = true;
        };

        scope.show_achievements = function () {
          scope.show_ach = true;
        };

        scope.edit_profile = function () {
          scope.show_prof = true;
        };

        scope.clear_show = function (name) {
          scope[name] = null;
          scope.body_lock(false);
        };

        scope.no_avatar = function(pic) {
          return /no_avatar/.test(pic)
        }

        scope.body_lock = function (state) {
          // if (state) {
          //   $('body').css({
          //     overflow: 'hidden',
          //     position: 'relative',
          //     right: 9
          //   });
          // } else {
          //   $('body').css({
          //     overflow: '',
          //     position: '',
          //     right: 'auto'
          //   });
          // }
        };

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

      }
    }
  });


setTimeout(function () {

  var app_container = document.getElementsByTagName('sailplay-hw')[0];

  app_container && angular.bootstrap(app_container, ['hobby_world']);

}, 0);

