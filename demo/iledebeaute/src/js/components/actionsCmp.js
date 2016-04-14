(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.actions', ['iledebeaute.services.data', 'iledebeaute.directives.test', 'iledebeaute.services.users', 'iledebeaute.services.actions'])

    .directive('actionsCmp', ['userService', 'actionService', 'dataService', function (userService, actionService, dataService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <div data-ng-show="!currentTest">\n        <h2 class="content_head">Получи больше бонусов</h2>\n        <span class="text">Выполняйте задания и получайте за них бонусы, которые вы можете потратить на привилегии. </span>\n        <span class="text" data-ng-show="hidden" style="margin-top: 20px;">Подождите, пожалуйста, задания загружаются.</span>\n        <div class="select_qust" data-ng-show="!hidden">\n\n            <div class="sq_item" data-ng-repeat="action in actions">\n                <div class="sq_item_left">\n                    <span class="name" data-ng-bind="transformTitle(action)"></span>\n                    <span class="sum_bonus">{{ action.points }} бонусов</span>\n                    <a href="#" >\n                        <span data-ng-if="action.socialType && user"\n                              href="#" class="tasks-cell__iframe-wrap" data-sp-action="{{ action._actionId }}"\n                              data-styles="{{ css_link }}">Получить</span>\n                    </a>\n                </div>\n                <div class="sq_item_right {{ getIcon(action) }}"></div>\n            </div>\n\n\n            <div class="sq_item" data-ng-repeat="item in testsData" data-ng-if="!item.exist">\n                <div class="sq_item_left">\n                    <span class="name" data-ng-bind="item.name"></span>\n                    <span class="sum_bonus">{{ item.points }} бонусов</span>\n                    <a href="#" class="bg" data-ng-click="openTest(item);$event.preventDefault();">Получить</a>\n                </div>\n                <div class="sq_item_right sir_qust"></div>\n            </div>\n\n        </div>\n    </div>\n    \n    <test-cmp data-ng-show="currentTest" data-model="currentTest" data-on-finish="onFinish"></test-cmp>\n    \n</div>',
        scope: {
          model: '='
        },
        link: function (scope) {

          scope.user = null;
          scope.hidden = true;
          scope.css_link = dataService.actionCss;

          scope.currentTest = null;
          scope.testsData = dataService.tests;

          scope.onFinish = function(){
            update();
          };

          scope.openTest = function (item) {
            scope.currentTest = item;
          };

          function update() {
            scope.hidden = true;
            scope.currentTest = null;
            userService.loadInfo().then(function (data) {
              scope.user = data;
              scope.$digest();
            });
            var tags = dataService.tests.map(function (el) {
              return el.tag;
            });
            userService.existTags(tags).then(function (res) {
              var el = {};
              angular.forEach(res, function (tag) {
                el = angular.findByProperty(dataService.tests, 'tag', tag.name);
                //el.exist = tag.exist;
                el.exist = false;
              });
              scope.$digest();
            });
            actionService.loadList().then(function (actions) {
              scope.actions = angular.extend([], actions);
              if (scope.actions.length) {
                setTimeout(function () {
                  sp.send('actions.parse', angular.extend([], actions));
                  scope.hidden = false;
                  scope.$digest();

                }, 100);
              } else {
                scope.hidden = false;
                scope.$digest();
              }
              scope.$digest();
            });
          }

          update();

          sp.on('actions.perform.success', function (data) {
            update();
            scope.$digest();
          });
          scope.transformTitle = actionService.getTitle;
          scope.getIcon = actionService.getIcon;

        }
      }

    }]);

}(window.angular, window.SAILPLAY, window.$));