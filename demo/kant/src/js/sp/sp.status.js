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

          /**
           * Количество баллов до следующего статуса
           * @param points
           * @returns {*}
           */
          scope.getOffsetToStatus = function (points) {
            if (!points) return scope.limits[0];
            var result = null;
            for (var i = 0, len = scope.limits.length; i < len; i++) {
              var current_limit = scope.limits[i];
              if (points < current_limit.from) {
                result = current_limit;
                break;
              }
            }
            return result;
          };


          /**
           * Получение количества баллов до статуса по индекса
           * @param points
           * @param index
           * @returns {number}
           */
          scope.getOffsetToStatusByIndex = function(points, index) {
            if(!points || !scope.limits[index])return 0;
            var _offset = scope.limits[index].from - points;
            return _offset < 0 ? 0 : _offset;
          };
          
          /**
           * Получить следующий статус
           * @param points
           * @returns {*}
           */
          scope.getNextStatus = function (points) {
            if (!scope.badges || !scope.badges()) return;
            if (!points) return scope.badges().multilevel_badges[0][0];
            var result = {};
            for (var i = 0, len = scope.limits.length; i < len; i++) {
              var current_limit = scope.limits[i];
              if (points < current_limit.from) {
                result = scope.badges().multilevel_badges[0][i];
                break;
              }
            }
            return result;
          };

          /**
           * Получение позиции аватарки
           * @param points
           * @returns {{top: string, left: string}}
           */
          scope.getAvatarPosition = function(points){
            // ML: алгоритм верстальщика
            var absolutPercent = scope.getProgress(points);
            var scaleWidth = 827.6;
            var scaleHeight = 250.1;
            var scaleCoordinates = [
              [0.8,248.3],
              [75.1,215.3],
              [94.5,215.3],
              [129.7,192.3],
              [163.2,204.8],
              [258.8,143.6],
              [291.6,161.7],
              [323.9,137.1],
              [342.9,150.1],
              [393.1,112.6],
              [461.7,140.6],
              [497.2,122.7],
              [532.5,146.6],
              [605.4,76.1],
              [684.3,117],
              [826.4,1.6]
            ];

            // коорд. аватарки
            var personX = absolutPercent * scaleWidth / 100,
              personY;

            // рассчет коорд. аватарки по y
            var personRangeX1,
              personRangeX2,
              personRangeY1,
              personRangeY2,
              personRangeNum;
            for(var i = 0; i < scaleCoordinates.length; i++) {
              if(personX <= scaleCoordinates[i][0]) {
                personRangeNum = i;
                break;
              }
            }
            if(!personRangeNum) {personRangeNum = scaleCoordinates.length - 1}
            personRangeX1 = scaleCoordinates[personRangeNum - 1][0];
            personRangeX2 = scaleCoordinates[personRangeNum][0];
            personRangeY1 = scaleCoordinates[personRangeNum - 1][1];
            personRangeY2 = scaleCoordinates[personRangeNum][1];

            // абс. значение
            personY = (personRangeY2 - personRangeY1) * (personX - personRangeX1) / (personRangeX2 - personRangeX1) + personRangeY1;
            // отн. значение
            personX = personX / scaleWidth * 100;
            personY = personY / scaleHeight * 100;
            if(personX > 100) { personX = 100 }
            if(personY > 100) { personY = 100 }

            return {'top': personY + '%', 'left': personX + '%'};

          };

          /**
           * Прогрессбар
           * @param points
           * @returns {{width: string}}
           */
          scope.getProgress = function (points) {
            // ML: алгоритм верстальщика
            // позиции точек на графике - фиксировано для графика, не менять
            var statusPosition = [0, 32, 60, 73, 100];
            // количество баллов для каждой точки - нужно подставить
            var status_points = scope.limits.map(function (item) {
              return item.from
            });
            // текущее количество баллов - подставить
            var leftRange = 0;

            for (var i = 0; i <= 4; i++) {
              if (points <= status_points[i]) {
                leftRange = i - 1;
                if (points == status_points[i]) {
                }
                break;
              }
            }
            if (leftRange == -1) {
              leftRange = 0;
            }
            if (points > status_points[4]) {
              leftRange = 3;
            }

            // позиция шкалы отн. меньшего статуса
            var localPercent = (points - status_points[leftRange]) / (status_points[leftRange + 1] - status_points[leftRange]);

            // позиция шкалы отн. нуля
            var absolutPercent = statusPosition[leftRange] + (statusPosition[leftRange + 1] - statusPosition[leftRange]) * localPercent;
            if (absolutPercent > 100) {
              absolutPercent = 100
            }


            return absolutPercent

          };

        }

      };

    });

}());
