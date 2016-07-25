(function () {

  angular.module('lecafier', ['core', 'ui', 'sp', 'templates'])

    .directive('sailplayLecafier', function ($rootScope, $locale) {

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

  window.addEventListener('DOMContentLoaded', function () {

    var app_container = document.getElementsByTagName('sailplay-lecafier')[0];

    app_container && angular.bootstrap(app_container, ['lecafier']);

  });

}());
