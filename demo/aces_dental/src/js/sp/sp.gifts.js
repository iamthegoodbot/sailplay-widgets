(function () {

  angular.module('sp.gifts', [])

    .directive('sailplayGifts', function (sp, sp_api, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.gifts = sp_api.data('load.gifts.list');

          scope.user = sp_api.data('load.user.info');

          scope.gift_open = null;

          scope.gift_success = null;

          scope.get_gift = function (gift) {

            if (scope.user().user_points.confirmed < gift.points) {

              $rootScope.$broadcast('notify:show', {
                title: 'Error',
                text: 'Not enough Smile Points'
              });

              return;
            }

            sp.send('gifts.purchase', {gift: gift});

          };

          sp.on('gifts.purchase.success', function () {

            $rootScope.$apply(function () {

              scope.gift_success = angular.copy(scope.gift_open);

            });

          });

          sp.on('gifts.purchase.error', function (res) {

            $rootScope.$apply(function () {

              $rootScope.$broadcast('notify:show', {
                title: 'Error',
                text: res.message
              });

            });

          });

        }

      };

    });

}());
