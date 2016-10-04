(function () {

  angular.module('sp.status', [])

    .constant('spStatusLimits', [0, 500, 1500, 7500, 15000])

    .directive('sailplayStatus', function (sp, sp_api, spStatusLimits) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          scope.limits = angular.copy(spStatusLimits);

          scope.getCurrentStatus = function () {
            if (!scope.badges || !scope.badges()) return;
            var list = scope.badges().multilevel_badges[0].filter(function (badge) {
              return badge.is_received
            });
            return list[list.length - 1];
          };

          scope.getPercents = function (points) {

            var start_position = -89;
            if (!points) return start_position;
            points = points ? points.confirmed + points.spent + points.spent_extra : 0;
            var arr = scope.limits;
            if (points > arr[arr.length - 1]) return 91;
            var multiplier = 35;
            var state = 0;
            for (var i = 1, len = arr.length; i < len; i++) {
              if (points > arr[i] && i != 0) {
                state++;
              }
            }
            var current = 0;
            var total = arr[0];
            if (state === 0) {
              current = points;
              total = arr[state + 1];
            } else {
              current = (points - arr[state]);
              total = (arr[state + 1] - arr[state]);
            }

            return -54 + parseInt( ( ( current * 100 ) / total * 0.2) * 1.8) + (state * multiplier);
          };

        }

      };

    });

}());
