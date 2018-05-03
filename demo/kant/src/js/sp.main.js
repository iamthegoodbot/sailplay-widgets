(function () {

  angular.module('kant', [
    'core', 
    'ui',
    'sp',
    'templates'
  ])

    .directive('sailplayKant', function ($rootScope, $locale) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/main.html',
        link: function (scope, element) {

          scope.global = $rootScope;

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

    var app_container = document.getElementsByTagName('sailplay-kant')[0];

    app_container && angular.bootstrap(app_container, ['kant']);

  }, 0);


}());
