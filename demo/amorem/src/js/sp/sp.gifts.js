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

          scope.gift_success_show = null;

          scope.gift_success = null;

          scope.gift_error = null;

          scope.gift_get = function (gift) {

            if (scope.user().user_points.confirmed < gift.points) {
              scope.gift_error = gift;
              return;
            }
            scope.gift_success = gift;

            sp.send('gifts.purchase', {gift: gift});

          };

          sp.on('gifts.purchase.success', function () {
            $rootScope.$apply(function () {
              scope.gift_success_show = true;
            });
          });

          sp.on('gifts.purchase.error', function (res) {
            $rootScope.$apply(function () {
              $rootScope.$broadcast('notify:show', {
                title: 'Ошибка',
                text: res.message
              });
            });
          });

        }

      };

    });

}());
