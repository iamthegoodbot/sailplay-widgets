(function () {

  angular.module('ui.menu', [])

    .constant('menu_items', [
      {
        alias: null,
        name: 'Задания'
      },
      {
        alias: 'gifts',
        name: 'Подарки'
      },
      {
        alias: 'collections',
        name: 'Мои коллекции'
      },
      {
        alias: 'achievements',
        name: 'Мои достижения'
      }
    ])

    .directive('spTabMenu', function (menu_items) {
      return {
        restrict: 'A',
        scope: false,
        link: function (scope) {
          scope.menu = angular.copy(menu_items);
        }
      }
    });


}());