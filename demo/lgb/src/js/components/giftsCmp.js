(function (angular, sp, jQuery) {

    angular.module('lgb.directives.gifts', ['lgb.services.users', 'lgb.services.gifts', 'services.helpers'])

        .directive('giftsCmp', ['userService', 'giftService', 'helperService', function (userService, giftService, helperService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<section class="l-centered gifts-sec">\n    <h1 class="section-header gifts-sec__head">Gifts\n        <span class="section-header__title" data-ng-if="!gifts.length">Gifts list is empty</span>\n    </h1>\n    <div class="gift-slider js-gifts-slider">\n        <div class="gift-slider__inner">\n\n\n            <div class="gift-slider__slide" data-ng-repeat="gift in gifts">\n                <div class="gift-slider__slide-inner">\n                    <div class="gift-slider__img">\n                        <img data-ng-src="{{ gift.thumbs.url_250x250 }}" alt="" class="img-soft-response">\n                    </div>\n                    <div class="gift-slider__success" data-ng-if="gift.success">\n                        Gift was added to your cart\n                    </div>\n                    <div class="gift-slider__info this-hide-hover" data-ng-if="!gift.success">\n                        <div class="gift-slider__name" data-ng-bind="gift.name"></div>\n                        <div class="gift-slider__weight">{{ gift.points }} points</div>\n                    </div>\n                    <div class="gift-slider__hover this-show-hover" data-ng-if="!gift.success">\n                        <a href="#" class="common-btn gift-slider__btn"\n                           data-ng-if="user"\n                           data-ng-bind="user.user_points.confirmed > gift.points ? \'Get this gift\' : \'Not enough points\'"\n                           data-ng-click="getGift(gift);$event.preventDefault();"></a>\n                        <a href="/customer/account/login/" class="common-btn gift-slider__btn"\n                           data-ng-if="!user">Sign in</a>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <!-- /inner -->\n    </div>\n    <!-- /gifts slider -->\n</section>',
                scope: true,
                link: function (scope, el) {
                    scope.user = null;
                    scope.gifts = null;
                    function clean(){
                        if(jQuery(el).find(".js-gifts-slider")){
                            jQuery(el).find(".js-gifts-slider").mCustomScrollbar('destroy');
                        }
                    }
                    function update() {
                        clean();
                        userService.loadInfo().then(function(info){
                            scope.user = info;
                            scope.$digest();
                        });
                        giftService.loadList().then(function (gifts) {
                            scope.gifts = angular.extend([], gifts);
                            jQuery(el).find(".js-gifts-slider").mCustomScrollbar({
                                axis:"x"
                            });
                            scope.$digest();
                        });
                    }
                    scope.$on('$destroy',function(){
                        clean();
                    });
                    scope.getGift = function(gift){
                        if (scope.user.user_points.confirmed < gift.points) {
                            return;
                        }
                        sp.send('gifts.purchase', gift);
                        gift.success = true;
                        setTimeout(function(){
                            window.location.reload();
                        }, 3000);
                    };
                    update();
                    sp.on('gift.purchase.force_complete.success', function (res) {
                        update();
                    });
                    sp.on('actions.perform.success', function (data) {
                        update();
                    });
                }
            }

        }]);

    document.createElement('gifts-cmp');
    var elems = document.querySelectorAll('gifts-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['lgb.directives.gifts']);
    }

}(window.angular, window.SAILPLAY, window.$));