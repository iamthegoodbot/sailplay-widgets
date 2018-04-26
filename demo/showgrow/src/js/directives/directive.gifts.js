(function () {

  angular.module('sg.directives.gifts', [])

    .directive('giftsD', function (api, giftS, $timeout, sp) {
      return {
        restrict: 'E',
        replace: false,
        template: '<section class="sp_l-section sp_gifts-sec">\n    <div class="sp_common-sec-head">Redeem Your Points For These Gifts</div>\n    <span data-ng-if="!gifts || !gifts() || !gifts().length">List is empty</span>\n\n    <div class="sp_gifts-slider js-gifts-slider" data-ng-class="{ type_hidden : hidden }">\n        <div data-ng-repeat="gift in gifts()">\n            <div class="sp_gifts-slider__slide-wrap">\n                <div class="sp_gifts-slider__slide" data-ng-class="{ \'not_enough_points\' : (user().user_points.confirmed < gift.points)}">\n                    <div class="sp_gifts-slider__slide-img"\n                         style="background-image: url(\'{{ gift.thumbs.url_250x250 }}\');"></div>\n                    <div class="sp_gifts-slider__slide-name" data-ng-bind="gift.name"></div>\n                    <div class="sp_gifts-slider__slide-bonus">{{ gift.points }} Points</div>\n                    <a href="#" class="sp_gifts-slider__slide-btn sp_common-btn"\n                       data-ng-class="{ \'this-disabled\' : (user().user_points.confirmed < gift.points)\n                        ,not_enough :(user().user_points.confirmed < gift.points) }"\n                       data-ng-bind="user().user_points.confirmed < gift.points ? \'Not enough Points\' : \'Get\' "\n                       data-ng-click="getGift(gift);$event.preventDefault();"></a>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</section>\n\n\n<!-- popups -->\n<div class="sp_widget sp_history-popup js-gift-popup" style="display: none;position: fixed;">\n    <div class="sp_history-popup__close js-close-popup"></div>\n    <div class="sp_common-popup-head-wr">\n        <div class="sp_common-popup-head">Your gift is waiting for you!</div>\n    </div>\n    <div class="sp_common-popup-body" data-ng-show="order_gift">\n        <div class="sp_history-popup__title">\n            Please make sure that your gift is in stock and ready for picking up by giving a call to one of our\n            locations<br> (<a href="http://www.showgrow.com/stores"\n                              class="sp_widget sp_info-counter__hist" target="_blank">check full locations list here</a>).\n\n        </div>\n        <div class="sp_gifts-slider__slide-img"\n             style="background-image: url(\'{{ order_gift.thumbs.url_250x250 }}\');"></div>\n        <div class="sp_gifts-slider__slide-name" data-ng-bind="order_gift.name"></div>\n        <div class="sp_gifts-slider__slide-desc" data-ng-bind="order_gift.descr"></div>\n        <div class="sp_gifts-slider__slide-bonus">{{ order_gift.points }} Points</div>\n        <div class="sp_common-btn js-close-popup">OK</div>\n    </div>\n\n</div>\n',
        scope: true,
        link: function (scope, el) {
          scope.gifts = api.data('gifts.list');
          scope.user = api.data('user.info');
          scope.hidden = true;

          function initGifts(time) {
            $timeout(function () {
              // gifts slider
              if ($('.js-gifts-slider').length) {
                $('.js-gifts-slider').slick({
                  adaptiveHeight: true,
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  arrows: false,
                  speed: 150,
                  infinite: false,
                  swipeToSlide: false,
                  dots: true,
                  edgeFriction: 0.5,
                  responsive: [
                    {
                      breakpoint: 960,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                });
              }
              scope.hidden = false;
            }, time || 1000);
          }

          function update() {
            api.user.info().then(function () {
              api.gifts.list().then(function () {
                scope.hidden = true;
                if ($('.js-gifts-slider').length) {
                  $('.js-gifts-slider').slick('unslick');
                }
                initGifts();
              })
            });
          }

          initGifts(2000);

          scope.getGift = function (gift) {
            var g = angular.copy(gift);
            if (scope.user().user_points.confirmed < g.points) {
              return;
            }
            scope.order_gift = g;
            api.user.tags.add(['Trig Received a gift']).then(function(){
              $('.js-gift-popup').bPopup({
                speed: 450,
                transition: 'fadeIn',
                closeClass: 'js-close-popup',
                positionStyle: 'absolute',
                follow: [true, false],
                modal: true,
                modalClose: true,
                modalColor: '#000000',
                opacity: 0.5
              });
            });
            //sp.send('gifts.purchase', {gift: g});
          };

          sp.on('gifts.purchase.success', function (res) {
            update();
          });
          sp.on('actions.perform.success', function (data) {
            update();
          });

        }
      }

    });

}());