angular.module('sp_print_bar', [
  'core',
  'ui',
  'sp',
  'templates'
])

  .directive('sailplayPb', function ($rootScope, $locale, sp_api) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/main.html',
      link: function (scope, element) {

        scope.global = $rootScope;

        // $rootScope.debug = true;

        scope.show_history = function () {
          scope.showHistory = true;
        };

        scope.show_status = function () {
          scope.showStatus = true;
        };

        scope.show_actions = function () {
          scope.showActions = true;
        };

        scope.show_badges = function () {
          scope.showBadges = true;
          scope.showBadgesInfo = false;
        };

        scope.show_gifts = function () {
          scope.showGifts = true;
        };

        scope.update_info = function() {
          location.reload();
        };

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

          scope.body_lock(false);

        };

        $(document).keyup(function(e) {
          if(event.which === 27) { // 27 = esc key
            event.preventDefault();
            scope.$apply(function (){
              scope.clear_all_show();
              scope.$emit('gift:get', null);
              scope.$emit('action:get', null);
            });
          }
        });

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

  var app_container = document.getElementsByTagName('sailplay-pb')[0];
  app_container && angular.bootstrap(app_container, ['sp_print_bar']);

}, 100);


