angular.module('sp_pj_az', [
  'core',
  'ui',
  'sp',
  'templates'
])

  .constant('headerBg', [
    'https://sailplays3.cdnvideo.ru/media/assets/assetfile/86c4a3bb2ad1a46927ab5a5b6610d938.png',
    'https://sailplays3.cdnvideo.ru/media/assets/assetfile/1e07a33e1efba4cd5debe2d875439618.png',
    'https://sailplays3.cdnvideo.ru/media/assets/assetfile/c425ff894ab6d0efe5a58a3b4e6ac092.png'
  ])

  .directive('sailplayPjAz', function ($rootScope, $locale, headerBg) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/main.html',
      link: function (scope, element) {

        scope.headerBg = headerBg[Math.floor(Math.random() * ((headerBg.length-1) - 0 + 1) + 0)];
        // $rootScope.debug = true;

        scope.show_history = function () {
          scope.showHistory = true;
        };

        scope.activeTab = 'gifts';

        scope.tabs = [
          {
            alias: 'gifts',
            name: 'Список подарков'
          },
          {
            alias: 'actions',
            name: 'Список заданий'
          },
          {
            alias: 'badges',
            name: 'Список бейджей'
          }
        ];

        scope.clear_all_show = function(){

          var array = [
            'showGifts',
            'showBadges',
            'showBadgesInfo',
            'showActions',
            'showHistory',
            'showStatus'
          ];

          array.forEach(function(item){
            scope.clear_show(item);
          });

        };

        scope.$on('clear_all_show', scope.clear_all_show);

        scope.clear_show = function (name) {
          scope[name] = null;
          scope.body_lock(false);
        };

        scope.get_gift = function(gift){
          scope.$emit('gift:get', gift);
        };

        scope.get_action = function(gift){
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

setTimeout(function () {

  var app_container = document.getElementsByTagName('sailplay-pj-az')[0];
  app_container && angular.bootstrap(app_container, ['sp_pj_az']);

}, 100);


