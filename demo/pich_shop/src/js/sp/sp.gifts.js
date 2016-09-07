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

          scope.make_purchase = function (gift) {

            if (scope.user().user_points.confirmed < gift.points) {

              $rootScope.$broadcast('notify.show', {
                title: 'Ошибка',
                header: 'Oooops!',
                text: 'Недостаточно баллов.'
              });


              return;
            };

            sp.send('gifts.purchase', {gift: gift});

          };

        }

      };

    });

}());
