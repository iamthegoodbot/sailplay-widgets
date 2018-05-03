(function () {

  angular.module('sp.badges', [])

    .directive('sailplayBadges', function(sp_api){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.badges = sp_api.data('load.badges.list');

        }

      };

    });

}());
