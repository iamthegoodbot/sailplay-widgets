(function () {

  angular.module('aces_dental', ['core', 'ui', 'sp', 'templates'])

    .directive('sailplayAd', function ($rootScope, $locale) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/main.html',
        link: function (scope, element) {

          scope.global = $rootScope;

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

        }
      }

    });


  setTimeout(function () {

    var app_container = document.getElementsByTagName('sailplay-ad')[0];

    app_container && angular.bootstrap(app_container, ['aces_dental']);

  }, 0);


}());
