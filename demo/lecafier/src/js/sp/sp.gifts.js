(function () {

  angular.module('sp.gifts', [])

    .directive('sailplayGifts', function (sp, sp_api, $timeout, $rootScope, $filter) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope, element) {

          scope.gifts = sp_api.data('load.gifts.list');
          scope.user = sp_api.data('load.user.info');

          scope.make_purchase = function (gift) {

            if (scope.user().user_points.confirmed < gift.points) return;
            $("#gift-slider").data('owlCarousel').destroy();
            sp.send('gifts.purchase', {gift: gift});

          };

        }

      };

    });

}());
