(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.menu', [])

    .directive('menuCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div class="header">\n    <a href="#" class="logo"></a>\n    <div class="top_line"></div>\n    <div class="menu">\n        <a href="#" data-ng-if="!item.hide" data-ng-repeat="item in model track by $index"\n           data-ng-bind="item.label"\n           data-ng-click="setActive(item.key);$event.preventDefault();"></a>\n        <div class="user_menu">\n            <!--<a href="#" data-ng-click="profile();$event.preventDefault();">профиль</a>-->\n            <a href="#" data-ng-click="exit();$event.preventDefault();">выход</a>\n        </div>\n    </div>\n    <div class="sub_menu">\n        <a href="#" data-ng-if="getSubmenu() && !item.hide" data-ng-repeat="item in getSubmenu()"\n           data-ng-bind="item.label"\n           data-ng-click="setActive(item.key);$event.preventDefault();"></a>\n    </div>\n</div>',
        scope: {
          model: '='
        },
        link: function (scope) {

          scope.setActive = function (key) {
            if (angular.isObject(key)) {
              key = key.key;
            }
            for (var i = 0, len = scope.model.length; i < len; i++) {
              var item = scope.model[i];
              if (item.key == key) {
                item.active = true;
              } else {
                item.active = false;
              }
              if (item.items && item.items.length) {
                for (var y = 0, leny = item.items.length; y < leny; y++) {
                  var subItem = item.items[y];
                  if (subItem.key == key) {
                    item.active = true;
                    subItem.active = true;
                  } else {
                    subItem.active = false;
                  }
                }
              }
            }
            window.location.hash = key;
          };

          if (window.location.hash && scope.model) {
            var hash = window.location.hash.replace('#', '');
            loop: for (var i = 0, len = scope.model.length; i < len; i++) {
              var item = scope.model[i];
              if (item.key == hash) {
                scope.setActive(item.key);
                break loop;
              }
              if (item.items && item.items.length) {
                for (var y = 0, leny = item.items.length; y < leny; y++) {
                  var subItem = item.items[y];
                  if (subItem.key == hash) {
                    scope.setActive(scope.model[i].items[y].key);
                    break loop;
                  }
                }
              }
            }
          }

          scope.getSubmenu = function () {
            if (!scope.model) return;
            for (var i = 0, len = scope.model.length; i < len; i++) {
              var item = scope.model[i];
              if (item.active && item.items && item.items.length) {
                return item.items;
                break;
              }
            }
          };

          scope.exit = function () {
            //  exit function
          };

        }
      }

    }]);

}(window.angular, window.SAILPLAY, window.$));