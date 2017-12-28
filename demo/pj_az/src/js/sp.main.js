angular.module('sp_pj_az', [
  'core',
  'ui',
  'sp',
  'templates'
])


// .filter('translate', function(){
//
// })

  .constant('headerBg', [
    '//sailplays3.cdnvideo.ru/media/assets/assetfile/86c4a3bb2ad1a46927ab5a5b6610d938.png',
    '//sailplays3.cdnvideo.ru/media/assets/assetfile/1e07a33e1efba4cd5debe2d875439618.png',
    '//sailplays3.cdnvideo.ru/media/assets/assetfile/c425ff894ab6d0efe5a58a3b4e6ac092.png'
  ])

  .directive('sailplayPjAz', function ($rootScope, $locale, headerBg, $filter, $timeout, sp_api, getTimeZone) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/main.html',
      link: function (scope, element) {

        scope.headerBg = headerBg[Math.floor(Math.random() * ((headerBg.length - 1) - 0 + 1) + 0)];
        // $rootScope.debug = true;

        scope.show_history = function () {
          scope.showHistory = true;
        };

        scope.activeTab = 'gifts';

        scope.tabs = [
          {
            alias: 'gifts',
            name: 'tabs.gifts'
          },
          {
            alias: 'actions',
            name: 'tabs.actions'
          },
          {
            alias: 'badges',
            name: 'tabs.badges'
          }
        ];

        scope.clear_all_show = function () {

          var array = [
            'showGifts',
            'showBadges',
            'showBadgesInfo',
            'showActions',
            'showHistory',
            'showStatus'
          ];

          array.forEach(function (item) {
            scope.clear_show(item);
          });

        };

        scope.$on('clear_all_show', scope.clear_all_show);

        scope.clear_show = function (name) {
          scope[name] = null;
          scope.body_lock(false);
          $timeout(function(){
            sp_api.call('load.actions.custom.list');
            sp_api.call('load.user.info', {all: 1, purchases: 1});
            sp_api.call('load.user.history', {tz: getTimeZone()});
            sp_api.call('load.badges.list');
          }, 1200)
        };

        scope.get_gift = function (gift) {
          scope.$emit('gift:get', gift);
        };

        scope.open_badge = function (badge) {
          scope.activeTab = 'badges';
          $timeout(function () {
            scope.$emit('badge:open', badge);
          }, 100);
        };

        scope.get_action = function (gift) {
          scope.$emit('action:get', gift);
        };

        scope.body_lock = function (state) {
          if (state) {
            $('body').css('overflow', 'hidden');
          } else {
            $('body').css('overflow', '');
          }
        };

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

      }
    }
  });

window.spbootstrap = function(){
  var app_container = document.getElementsByTagName('sailplay-pj-az')[0];
  app_container && angular.bootstrap(app_container, ['sp_pj_az']);
}