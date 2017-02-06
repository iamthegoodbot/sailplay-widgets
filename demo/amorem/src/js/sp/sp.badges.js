(function () {

  angular.module('sp.badges', [])

    .directive('sailplayBadges', function (sp, sp_api, $filter) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          scope.only_collections = function(badge){
            return $filter('spBadgeDesc')(badge).type == 'collection'
          };

          scope.only_achievements = function(badge){
            return $filter('spBadgeDesc')(badge).type == 'achievement'
          };

        }

      };

    });

}());
