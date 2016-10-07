(function () {

  angular.module('sp.statuses', [])

    .directive('sailplayStatuses', function (sp_api, status_service, $compile) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope, elem) {

          scope.statuses = sp_api.data('load.badges.list');
          scope.user = sp_api.data('load.user.info');
          scope.limits = status_service.get_limits();

          scope.get_width = function(){
            if(scope.user && scope.user()){
              var width = status_service.count_percents(scope.user().user_points.confirmed) || 0;
              return width > 100 ? 100 : width < 0 ? 0 : width;
            } else {
              return 0;
            }
          }


        }

      };

    });

}());
