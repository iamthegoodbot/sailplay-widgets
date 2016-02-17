(function (angular, sp, jQuery) {

    angular.module('pof.directives.gifts', ['pof.services.users', 'pof.services.gifts'])

        .directive('giftsCmp', ['userService', 'giftService', function (userService, giftService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n\n    <section class="l-centered gifts-sec">\n        <h1 class="section-header gifts-sec__head">Gifts</h1>\n        <span data-ng-if="!gifts.length">Empty gifts list</span>\n        <div class="gift-slider js-gifts-slider">\n\n            <div class="gift-slider__slide" data-ng-repeat="gift in gifts">\n                <div class="gift-slider__slide-inner">\n                    <div class="gift-slider__info this-hide-hover">\n                        <div class="gift-slider__img">\n                            <img data-ng-src="{{ gift.thumbs.url_250x250 }}" alt="" class="img-soft-response">\n                        </div>\n                        <div class="gift-slider__name">{{ gift.name }}</div>\n                        <div class="gift-slider__weight">{{ gift.points }} points</div>\n                    </div>\n                    <div class="gift-slider__hover this-show-hover">\n                        <div class="gift-slider__name">{{ gift.name }}</div>\n                        <div class="gift-slider__desc">{{ gift.descr }}</div>\n                        <div class="common-btn gift-slider__btn" data-ng-if="user && gifts" data-ng-click="gift_purchase(gift)"\n                        >{{ user.user_points.confirmed < gift.points ? \'Not enough points\' : \'Get this gift\' }}</div>\n                        <a class="common-btn gift-slider__btn" data-ng-if="!user" href="/login.php">Login</a>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </section>\n\n    <!-- popups -->\n    <div class="gifts-popup js-gifts-popup" style="display: none;">\n        <div class="gifts-popup__close js-close-popup"></div>\n        <div class="gifts-popup__head-wr">\n            <div class="gifts-popup__title" style="padding-top: 40px;">Thank you for being our loyal customer. You will receive your gift with your next order.</div>\n        </div>\n    </div>\n    <!-- /popups -->\n</div>',
                scope: true,
                link: function (scope) {
                    scope.gifts = [];
                    if (jQuery(".js-gifts-slider").data('owlCarousel')) {
                        jQuery(".js-gifts-slider").data('owlCarousel').destroy();
                    }
                    sp.on('gift.purchase.force_complete.success', function (res) {
                        jQuery('.js-gifts-popup').bPopup({
                            speed: 450,
                            transition: 'fadeIn',
                            closeClass: 'js-close-popup',
                            positionStyle: 'absolute',
                            follow: [true, false],
                            modal: true,
                            modalClose: true,
                            modalColor: '#E6E6E6',
                            opacity: 0.9,
                            onOpen: function () {
                                update_data();
                            },
                            onClose: function () {

                            }
                        });
                    });
                    scope.gift_purchase = function (gift) {
                        if (scope.user.user_points.confirmed < gift.points) {
                            return;
                        }
                        sp.send('gifts.purchase', gift);
                    };
                    function update_data() {
                        if (jQuery(".js-gifts-slider").data('owlCarousel')) {
                            jQuery(".js-gifts-slider").data('owlCarousel').destroy();
                        }
                        scope.gifts = [];
                        userService.loadInfo().then(function (user) {
                            scope.user = user;
                            scope.$digest();
                        });
                        giftService.loadList().then(function (gifts) {
                            scope.gifts = gifts;
                            scope.$digest();
                        }).then(function () {
                            setTimeout(function () {
                                if (jQuery(".js-gifts-slider").data('owlCarousel')) {
                                    jQuery(".js-gifts-slider").data('owlCarousel').destroy();
                                }
                                jQuery(".js-gifts-slider").owlCarousel({
                                    pagination: true,
                                    items: 4,
                                    // itemsCustom: true,
                                    itemsDesktop: [1199, 4],
                                    itemsDesktopSmall: [979, 3],
                                    itemsTablet: [768, 2],
                                    itemsTabletSmall: false,
                                    itemsMobile: [500, 1],
                                    navigation: true,
                                    navigationText: ["", ""],
                                    responsiveRefreshRate: 50,
                                    slideSpeed: 300,
                                    autoPlay: false,
                                    addClassActive: true,
                                    // touchDrag: false,
                                    // mouseDrag: false,
                                    rewindNav: true,
                                });
                            }, 10)
                        });
                    }

                    update_data();
                }
            }

        }]);

    document.createElement('gifts-cmp');
    var elems = document.querySelectorAll('gifts-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['pof.directives.gifts']);
    }

}(window.angular, window.SAILPLAY, window.$));