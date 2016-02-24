(function (angular, sp, jQuery) {

    angular.module('stalos.tools.bDaySelect', [])

        .directive('toolsBday', function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    <div data-ng-show="model" style="vertical-align: top;font-size: 0;">\n\n        <div class="tools-selector" style="width: 19%;margin-right: 5%;"\n             data-ng-class="{ open : show_d}">\n      <span class="currentVal" data-ng-click="show_d = disabled ? false : !show_d;$event.preventDefault();$event.stopPropagation();">\n          {{ model[0] || \'День\' }}\n      </span>\n            <div class="list" data-ng-if="show_d">\n          <span class="item" data-ng-repeat="day in getDays(model[1]) track by $index"\n                data-ng-click="model[0] = ($index + 1);$parent.$parent.show_d = false;$event.preventDefault();$event.stopPropagation();">\n              {{ ($index + 1) }}\n          </span>\n            </div>\n        </div>\n\n        <div class="tools-selector" style="width: 50%;margin-right: 5%;" data-ng-class="{ open : show_m}">\n      <span class="currentVal" data-ng-click="show_m = disabled ? false : !show_m;$event.preventDefault();$event.stopPropagation();"\n      >\n         {{ months[model[1] - 1] ||  \'Месяц\'  }}\n      </span>\n            <div class="list" data-ng-if="show_m">\n          <span class="item" data-ng-repeat="month in months"\n                data-ng-click="model[1] = ($index + 1);$parent.$parent.show_m = false;$event.preventDefault();$event.stopPropagation();">\n              {{ month }}\n          </span>\n            </div>\n        </div>\n\n        <div class="tools-selector" style="width: 21%;"\n             data-ng-class="{ open : show_y}">\n      <span class="currentVal" data-ng-click="show_y = disabled ? false : !show_y;$event.preventDefault();$event.stopPropagation();">\n          {{ model[2] || \'Год\' }}\n      </span>\n            <div class="list" data-ng-if="show_y">\n          <span class="item" data-ng-repeat="year in years track by $index"\n                data-ng-click="model[2] = year;$parent.$parent.show_y = false;$event.preventDefault();$event.stopPropagation();">\n              {{ year }}\n          </span>\n            </div>\n        </div>\n\n    </div>\n</div>',
                scope: {
                    model: '=',
                    disabled: '=?'
                },
                link: function (scope) {
                    scope.days = {
                        1: new Array(31),
                        2: new Array(29),
                        3: new Array(31),
                        4: new Array(30),
                        5: new Array(31),
                        6: new Array(30),
                        7: new Array(31),
                        8: new Array(31),
                        9: new Array(30),
                        10: new Array(31),
                        11: new Array(30),
                        12: new Array(31)
                    };
                    scope.getDays = function (month) {
                        var index = month || 1;
                        return scope.days[index];
                    };
                    scope.show_d = false;
                    scope.show_m = false;
                    scope.show_y = false;
                    scope.years = [];
                    var current_year = new Date().getFullYear();
                    var arr = [];
                    for (var i = 90; i > 0; i--) {
                        arr.push(current_year - i);
                    }
                    scope.years = arr.reverse();
                    function hide() {
                        scope.$apply(function(){
                            scope.show_d = false;
                            scope.show_m = false;
                            scope.show_y = false;
                        });
                    }
                    jQuery('body').on('click.tools-selector-close', function () {
                        if (scope.show_d || scope.show_m || scope.show_y) {
                            hide();
                        }
                    });
                    scope.months = ["январь", "февраль", "март",
                        "апрель", "май", "июнь", "июль",
                        "август", "сентябрь", "октябрь",
                        "ноябрь", "декабрь"];
                    scope.$on('$destroy', function () {
                        jQuery('body').off('click.tools-selector-close');
                    });
                }
            }

        });

    document.createElement('tools-bday');
    var elems = document.querySelectorAll('tools-bday');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['stalos.tools.bDaySelect']);
    }

}(window.angular, window.SAILPLAY, window.$));