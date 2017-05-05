angular.module('sp.profile', [])

  .directive('sailplayProfile', function (sp, sp_api) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.user = sp_api.data('load.user.info');

        scope.logout = function () {
          sp.send('logout');
        };

      }

    };

  });
