angular.module('sp.gifts', [])

  .directive('mCustomScrollbar', function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      scope: false,
      link: function (scope, el, attrs) {

        scope.selector = attrs.selector;

        if (scope.$last && scope.selector && $(scope.selector).length) { // all are rendered
          $timeout(function () {
            $(scope.selector).mCustomScrollbar && $(scope.selector).mCustomScrollbar();
          }, 10);
        }

      }

    };
  })

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
            infinite: false,
            responsive: [
              {
                breakpoint: 780,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 550,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 355,
                settings: {
                  slidesToShow: 1
                }
              }]
          }
        };

        scope.get = function (gift) {
          if(!gift) return;
          sp.send('gifts.purchase', {gift: gift});
        };

        $rootScope.$on('gift:get', function (e, gift) {
          scope.gift_get = gift;
        });

        sp.on('gifts.purchase.success', function (res) {
          $rootScope.$apply(function () {
            scope.gift_get = null;
            var msgObj = {
              title: 'Поздравляем',
              text: 'Вы получили подарок.'
            }

            if(res.gift_type == 'coupon') {
              msgObj.isCoupon = true
              msgObj.gift_help_text = res.gift_help_text
              msgObj.coupon_number = res.coupon_number
            }

            $rootScope.$broadcast('notify:show', msgObj);
          });
        });

        sp.on('gifts.purchase.error', function (res) {
          $rootScope.$apply(function () {
            scope.gift_get = null;
            $rootScope.$broadcast('notify:show', {
              title: 'Ошибка',
              text: res.message
            });
          });
        });

      }

    };

  });
