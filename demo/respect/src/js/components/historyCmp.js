(function (angular, sp, jQuery) {

  angular.module('respect.directives.history', ['respect.services.users', 'respect.tools.pagination'])

    .directive('historyCmp', ['userService', function (userService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <section class="l-section">\n        <div class="all-history-sec">\n            <div class="all-history-sec__head">Вся история</div>\n            <div class="common-cell-title">\n                {{ history && history.length ? \'Здесь показана история покупок, выполненных заданий, начисления баллов и полученных подарков\' : \'История пуста\' }}\n            </div>\n\n            <div class="all-hist-table" data-ng-if="history && history.length">\n\n                <div class="all-hist-table__row" data-ng-repeat="item in history_data">\n                    <div class="all-hist-table__date" data-ng-bind="history_date_format(item.action_date)"></div>\n                    <div class="all-hist-table__info">\n                        <div class="all-hist-table__info-right">\n                            <div class="all-hist-table__right-item">\n                                <div class="all-hist-table__inc"\n                                     data-ng-class="{not_completed: !item.is_completed}"\n                                     data-ng-bind="show_points(item.points_delta)"\n                                ></div>\n                            </div>\n                        </div>\n                        <!-- /right -->\n                        <div class="all-hist-table__info-left">\n                            <div class="all-hist-table__head" data-ng-bind="get_history_name(item)"></div>\n                        </div>\n                        <!-- /left -->\n                    </div>\n                </div>\n                <!-- /row -->\n\n            </div>\n            <!-- /table -->\n            <tools-pagination data-ng-if="history_data"\n                              data-page="page"\n                              data-items="history.length"\n                              data-per-page="per_page"\n                              data-on_change="change_page"></tools-pagination>\n        </div>\n    </section>\n    \n\n\n</div>',
        scope: true,
        link: function (scope) {
          scope.history = null;
          scope.history_date_format = userService.historyDateFormat;
          scope.get_history_name = userService.getHistoryActionName;
          scope.show_points = userService.show_history_points;
          scope.per_page = 25;
          scope.change_page = function (page) {
            scope.page = +page || 1;
            scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
          };
          function update() {
            userService.loadHistory().then(function (history) {
              scope.history = history;
              scope.change_page(1);
              scope.$digest();
            });
          }
          update();

        }
      }

    }]);

  document.createElement('history-cmp');
  var elems = document.querySelectorAll('history-cmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['stalos.directives.history']);
  }

}(window.angular, window.SAILPLAY, window.$));