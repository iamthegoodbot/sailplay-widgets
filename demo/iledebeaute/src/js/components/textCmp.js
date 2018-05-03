(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.text', [])

    .directive('textCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <h2 class="content_head" data-ng-bind="model.title"></h2>\n    <span class="text" data-ng-bind="model.text"></span>\n</div>',
        scope: {
          model: '='
        },
        link: function (scope) {

        }
      }

    }]);

}(window.angular, window.SAILPLAY, window.$));