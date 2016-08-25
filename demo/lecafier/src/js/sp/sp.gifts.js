(function () {

  angular.module('sp.gifts', [])

    .directive('giftPopup', function (sp, spShare, $filter) {

      return {

        restrict: 'E',
        replace: false,
        templateUrl: '/html/ui/ui.gift.popup.html',
        scope: true,
        link: function (scope) {

          scope.data = null;
          scope.share_data = null;

          scope.$on('gift.open', function (e, gift) {
            scope.data = gift;
          });

          scope.$on('gift.close', function () {
            scope.data = null;
            scope.share_data = null;
          });

          sp.on('gifts.get.success', function (share_data) {
            scope.share_data = share_data;
            scope.$digest();
          });


          scope.make_share = function (soc) {

            var _share = {
              shareImage: $filter('sailplay_pic')(scope.data.thumbs.url_250x250),
              sharedLink: document.location.href,
              shareTitle: scope.data.name,
              shareDescription: scope.share_data.share_msg
            };

            spShare.custom(soc, _share);

          }

        }

      }

    })

    .directive('sailplayGifts', function (sp, sp_api, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.gifts = sp_api.data('load.gifts.list');
          scope.user = sp_api.data('load.user.info');

          scope.make_purchase = function (gift) {

            if (scope.user().user_points.confirmed < gift.points) return;

            $("#gift-slider").data('owlCarousel').destroy();

            sp.send('gifts.purchase', {gift: gift});

            sp.on('gifts.purchase.success', function () {

              $rootScope.$apply(function () {

                sp_api.call('gifts.get', gift.id);

                $rootScope.$broadcast('gift.open', gift);

              });

            })

          };

        }

      };

    });

}());
