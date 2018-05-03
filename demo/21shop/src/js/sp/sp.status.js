(function () {

  angular.module('sp.status', [])

    .constant('spStatusLimits', [7000, 20000, 100000])

    .directive('sailplayStatus', function (sp, sp_api, spStatusLimits) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          scope.limits = angular.copy(spStatusLimits);

          scope.getStatusCss = function(index){
            if(!scope.limits || !scope.limits.length) return;
            var length = scope.badges().multilevel_badges[0].length;
            var css = {
              left: 100 / length * index + '%',
              width: 100 / length + '%'
            };
            if(index == length-1) {
              css['border-right'] = 'none';
            }
            return css
          };

          scope.toNextStatus = function (points) {
            if (!points) return scope.limits[0];
            var result = [];
            for (var i = 0, len = scope.limits.length; i < len; i++) {
              var current_limit = scope.limits[i];
              if (points < current_limit) {
                result.push(current_limit);
              }
            }
            return Math.round(result[0] ? result[0] - points : 0);
          };

          scope.getProgress = function (points) {

            if (typeof points == 'undefined') return;

            var status_points = angular.copy(spStatusLimits);

            if (status_points[status_points.length - 1] && (points >= status_points[status_points.length - 1])) {
              return {
                width: '100%'
              };
            }

            var multiplier = 100 / status_points.length;

            var state = 0;

            for (var i = 0, len = status_points.length; i < len; i++) {
              if (points >= status_points[i]) {
                state++;
              }
            }
            var current = points;

            var total = status_points[0];

            if(state != 0) {
              current = points - status_points[state - 1];
              total = status_points[state - 1] ? (status_points[state] - status_points[state-1]) : status_points[state];
            }

            return {
              width: parseFloat( ((current/total) * 100) / status_points.length + (state * multiplier)).toFixed(2) + '%'
            };

          };

        }

      };

    });

}());
