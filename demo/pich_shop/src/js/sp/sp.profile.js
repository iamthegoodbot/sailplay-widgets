(function () {

  angular.module('sp.profile', [])

    .directive('sailplayProfile', function (sp_api, sp, $rootScope, Status) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');

          scope.getNum = Status.getNum;

          scope.statusList = $rootScope.config.statusList;

		        scope.getEditLink = function(){

				        if(!$rootScope.config || !$rootScope.config.customActions) return;

				        var profile_action = $rootScope.config.customActions.filter(function(action){
													return action.id == 'profile'
				        })[0] || {};

				        return profile_action.href + '?id=' + profile_action.id;

		        }

        }

      };

    });

}());
