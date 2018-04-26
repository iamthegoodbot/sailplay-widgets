(function () {

  angular.module('sp.profile', [])

    .directive('sailplayProfile', function (sp_api, sp, status_service) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');
          scope.badges = sp_api.data('load.badges.list');

          scope.limits = status_service.get_limits();

          scope.get_next = function () {
            var statuses = scope.badges && scope.badges() && scope.badges().multilevel_badges && scope.badges().multilevel_badges[0];
            if (!statuses) return;
            var received = statuses.filter(function (status) {
              return status.is_received;
            });
            if (received.length == statuses.length) return null;
            var result = statuses.filter(function (status) {
              return !status.is_received;
            });
            return result[0] || statuses[0];
          };

          scope.get_offset = function () {
            var arr = scope.limits;
            var limit = scope.user && scope.user && scope.user() ? scope.user().user_points.confirmed : 0;
            var result = [];
            for (var i = 0, len = arr.length; i < len; i++) {
              var current_limit = arr[i];
              if (limit < current_limit) {
                result.push(current_limit);
              }
            }
            return Math.round(result[0] ? result[0] - limit : 0);
          };

          scope.logout = function () {

            sp.send('logout');

          };

        }

      };

    });

}());
