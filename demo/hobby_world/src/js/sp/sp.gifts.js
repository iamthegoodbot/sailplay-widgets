angular.module('sp.gifts', [])

  .directive('sailplayGifts', function (sp, sp_api, $rootScope) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.gifts = sp_api.data('load.gifts.list');

        scope.user = sp_api.data('load.user.info');

        scope.gifts_config = {
          selector: '.bns_gift_main',
          data: {
            slidesToShow: 4,
            slidesToScroll: 1,
            slide: '.bns_gift_item',
            responsive: [
              {
                breakpoint: 1318,
                settings: {
                  slidesToShow: 2
                }
              }, {
                breakpoint: 560,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          }
        };

        scope.get = function (gift) {
          scope.gift_geted = gift;
          sp.send('gifts.purchase', {gift: gift});
        };

        sp.on('gifts.purchase.success', function () {
          $rootScope.$apply(function () {
            scope.gift_get = null;
          });
        });

        sp.on('gifts.purchase.error', function (res) {
          $rootScope.$apply(function () {
            scope.gift_geted = null;
            $rootScope.$broadcast('notify:show', {
              title: 'Ошибка',
              text: res.message
            });
          });
        });

      }

    };

  });
