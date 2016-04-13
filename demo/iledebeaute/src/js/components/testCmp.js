(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.test', ['iledebeaute.services.users'])

    .directive('testCmp', ['userService', function (userService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div class="opros_main" data-ng-show="model">\n    \n    <span class="opros_head">\n        Прохождение опроса\n        <b>+ {{ model.points }} баллов</b>\n    </span>\n    \n    <div class="opros_item">\n        <span class="qust_from">{{ step + 1 }} вопрос из {{ model.data.length }}</span>\n        <span class="qust_text" data-ng-bind="model.data[step].q"></span>\n        <div class="answer">\n            <div class="check" data-ng-repeat="item in model.data[step].a">\n                <input type="radio" id="ans{{ $index }}" name="{{ step }}" data-ng-click="setAnswer(item, model.data[step].a)"/>\n                <label for="ans{{ $index }}" data-ng-bind="item.text"></label>\n            </div>\n            <textarea name="user_ansver" data-ng-model="customAnswer" data-ng-show="showCustomAnswer" placeholder="Напишите свой вариант"></textarea>\n        </div>\n        <a href="#" class="next_qust" data-ng-click="next();$event.preventDefault();" data-ng-class="{ disabled : !isValid() }">Далее</a>\n    </div>\n\n</div>',
        scope: {
          model: '=',
          onFinish: '='
        },
        link: function (scope) {

          scope.step = 0;
          scope.tags = [];
          scope.vars = [];
          scope.customAnswer = null;
          scope.showCustomAnswer = false;
          scope.sending = false;

          scope.submit = function () {
            var data = angular.copy(scope.tags);
            scope.sending = true;
            return new Promise(function (resolve) {
              userService.addTags().then(function () {
                userService.addVars(scope.vars).then(function () {
                  resolve();
                });
              })
            })
          };

          scope.isValid = function () {
            if (!scope.model || !scope.model.data) return;
            // TODO: доделать логику, если не объект, а массив
            var active = angular.findByProperty(scope.model.data[scope.step].a, 'val', true);
            return !scope.sending || active && (!active.yourAnswer || active.yourAnswer && scope.customAnswer && scope.customAnswer.length) ? true : false;
          };

          scope.next = function () {
            if (!scope.isValid()) return;
            var tags = [];
            var tagsObj = angular.findByProperty(scope.model.data[scope.step].a, 'val', true);
            if (tagsObj) {
              if (angular.isArray(tagsObj)) {
                tagsObj.map(function (el) {
                  return el.tag
                })
              } else {
                tags = [tagsObj.tag];
              }
            }
            scope.tags = scope.tags.concat(tags);
            if (scope.showCustomAnswer) {
              scope.vars.push(scope.customAnswer);
            }
            scope.customAnswer = null;
            scope.showCustomAnswer = false;
            if (scope.step == scope.model.data.length - 1) {
              scope.submit().then(function () {
                scope.onFinish(scope.model, scope.tags, scope.vars);
              });
            } else {
              scope.step++;
            }
          };

          scope.setAnswer = function (item, array) {
            angular.forEach(array, function (el) {
              el.val = false;
            });
            if (item.yourAnswer) {
              scope.customAnswer = null;
              scope.showCustomAnswer = true;
            } else {
              scope.showCustomAnswer = false;
            }
            item.val = true;
          };

        }
      }

    }]);

}(window.angular, window.SAILPLAY, window.$));