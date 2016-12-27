(function () {

  angular.module('sp.status', [])

    .directive('sailplayStatus', function (sp, sp_api, $filter, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          scope.limits = $rootScope.config.data.statuses;

          scope.show_badge = null;

          /**
           * Отрытие бейджа в попапе
           * @param badge
           */
          scope.openBadge = function (badge) {
            scope.show_badge = badge;
          };

          /**
           * Описание статуса в слайдере
           * @param index
           * @param badge
           * @returns {string}
           */
          scope.getDescr = function (index) {

            if (!scope.limits[index] || typeof index == 'undefined') return;

            var _current = scope.limits[index];

            var string = 'Размер скидки: ' + _current.discount + '% <br> ';

            if (_current.from) {
              string += 'От ' + $filter('number')(_current.from) + ' ';
            }

            if (_current.to) {
              string += 'до ' + $filter('number')(_current.to) + ' ';
            }

            string += 'рублей';

            return string;
          };

          scope.getNextStatus = function(points){
            if (!points) return scope.limits[0];
            var result = null;
            for (var i = 0, len = scope.limits.length; i < len; i++) {
              var current_limit = scope.limits[i];
              if (points < current_limit.from) {
                result = current_limit;
              }
            }
            return result;
          };

          scope.getProgress = function (points) {

            // позиции точек на графике - фиксировано для графика, не менять
            var statusPosition = [0, 32, 60, 73, 100];
            // количество баллов для каждой точки - нужно подставить
            var status_points = scope.limits.map(function(item){
              return item.from
            });
            // текущее количество баллов - подставить
            var leftRange = 0;
            var currentStatus = 0;

            for(var i = 0; i <= 4; i++) {
              if(points <= status_points[i]) {
                leftRange = i-1;
                currentStatus = leftRange;
                if(points == status_points[i]) {
                  currentStatus = i;
                }
                break;
              }
            }
            if(leftRange == -1) {
              leftRange = 0;
            }
            if(points > status_points[4]) {
              leftRange = 3;
              currentStatus = 4;
            }

            // позиция шкалы отн. меньшего статуса
            var localPercent = (points - status_points[leftRange])/(status_points[leftRange + 1] - status_points[leftRange]);

            // позиция шкалы отн. нуля
            var absolutPercent = statusPosition[leftRange] + (statusPosition[leftRange + 1] - statusPosition[leftRange]) * localPercent;
            if(absolutPercent > 100) {absolutPercent = 100}


            return {
              width: absolutPercent + '%'
            };

          };

        }

      };

    });

}());
