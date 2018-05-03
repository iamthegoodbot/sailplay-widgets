(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.history', ['iledebeaute.services.users', 'iledebeaute.tools.pagination'])

    .directive('historyCmp', ['userService', function (userService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <div class="content_head history">История начислений</div>\n    <span class="table_info">\n        {{ history.length ? \'Здесь показана история покупок, выполненных заданий, начисления баллов и полученных привилегий\' : \'История пуста\' }}\n    </span>\n    <div class="hist_main">\n        <table class="hist_table">\n            <tr data-ng-repeat="item in history_data">\n                <td>\n                    <span data-ng-bind="history_date_format(item.action_date)"></span>\n                </td>\n                <td>\n                    <span><b data-ng-bind="get_history_name(item)">Sun Beauty Защитный спрей для волос</b></span>\n                </td>\n                <td>\n                    <span data-ng-bind="item.points_delta"></span>\n                </td>\n            </tr>\n        </table>\n        <tools-pagination data-ng-if="history_data"\n                          data-page="page"\n                          data-items="history.length"\n                          data-per-page="per_page"\n                          data-on_change="change_page"></tools-pagination>\n    </div>\n</div>',
        scope: true,
        link: function (scope) {
          scope.user = null;
          scope.history = null;
          scope.history_data = null;
          scope.history_date_format = userService.historyDateFormat;
          scope.get_history_name = userService.getHistoryActionName;
          scope.per_page = 5;
          scope.change_page = function (page) {
            scope.page = +page || 1;
            scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
          };
          function update() {
            userService.loadInfo().then(function (user) {
              scope.user = user;
              scope.$digest();
            });
            userService.loadHistory().then(function (history) {
              scope.history = history;
              scope.change_page();
              scope.$digest();
            });
          }

          update();
          sp.on('gift.purchase.force_complete.success', function (res) {
            update();
          });
          sp.on('actions.perform.success', function (data) {
            update();
          });
        }
      }

    }]);

}(window.angular, window.SAILPLAY, window.$));