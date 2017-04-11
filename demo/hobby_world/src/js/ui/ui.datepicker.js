angular.module('ui.datepicker', [])

  .service('dateService', function () {

    var self = this;

    self.months = {
      "1": "Январь",
      "2": "Февраль",
      "3": "Март",
      "4": "Апрель",
      "5": "Май",
      "6": "Июнь",
      "7": "Июль",
      "8": "Август",
      "9": "Сентябрь",
      "10": "Октябрь",
      "11": "Ноябрь",
      "12": "Декабрь"
    };

    self.days = {
      1: 31,
      2: 29,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    };

    var current_year = new Date().getFullYear();
    var arr = [];
    for (var i = 90; i > 0; i--) {
      arr.push(current_year - i);
    }

    self.years = arr.reverse();

    return this;

  })

  .directive('datePicker', function (dateService) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/html/ui/ui.datepicker.html',
      scope: true,
      require: 'ngModel',
      link: function (scope, elm, attrs, NgModel) {

        scope.model = [null, null, null];

        scope.months = dateService.months;
        scope.days = dateService.days;
        scope.years = dateService.years;


        NgModel.$render = function () {
          if (NgModel.$modelValue) {
            var value = NgModel.$modelValue.split('-').reverse().map(function (x) {
              return parseInt(x, 10);
            });
            scope.model = value;
          }
        };

        scope.$watchCollection('model', function () {
          var check = scope.model.every(function (item) {
            return item;
          });
          if (!check) return;
          var new_value = angular.copy(scope.model);
          NgModel.$setViewValue(new_value.reverse().join('-'));
        });

        scope.range = function (start, end) {
          var result = [];
          for (var i = start; i <= end; i++) {
            result.push(i);
          }
          return result;
        };

      }
    }

  });
