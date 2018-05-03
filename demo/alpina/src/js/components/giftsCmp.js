(function (angular, sp, jQuery) {

    angular.module('alpina.directives.gifts', ['alpina.services.users', 'alpina.services.gifts', 'services.helpers'])

        .directive('giftsCmp', ['userService', 'giftService', 'helperService', function (userService, giftService, helperService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="col-xs-12 col-md-8 common-invert-col">\n\n    <div class="slider-cell common-shaded-cell" data-ng-if="user && gifts">\n        <div class="slider-cell__top">\n            <div class="slider-cell__head">Список подарков</div>\n            <div class="slider-cell__count">{{ giftsCountTitle(gifts_list) }}</div>\n            <div class="slider-cell__capt">Подарки, на которые вы можете потратить свои баллы</div>\n        </div>\n        <div class="slider-gifts__wrap" data-ng-show="gifts && gifts_list.length" data-ng-class="{unload: !load}">\n            <div class="slider-gifts__counter"><span class="js-gifts-slider__cur">1</span>/<span\n                    class="js-gifts-slider__all" data-ng-bind="gifts.length"></span></div>\n            <div class="slider-gifts royalSlider js-gifts-slider">\n\n                <div class="slider-gifts__slide" data-ng-repeat="slide in gifts">\n                    <div class="slider-gift-item" \n                         data-ng-class="{ \'this-active\' : user.user_points.confirmed > gift.points}"\n                         data-ng-repeat="gift in slide">\n                        <div class="slider-gift-item__img">\n                            <img data-ng-src="{{ getImage(gift) }}" alt="">\n                            <div class="slider-gift-item__img-over">\n                            </div>\n                        </div>\n                        <div class="slider-gift-item__btn-wr" data-ng-if="user.user_points.confirmed > gift.points">\n                            <a href="#" class="slider-gift-item__btn"\n                            data-ng-click="getGift(gift);$event.preventDefault();">Получить</a>\n                        </div>\n                        <div class="slider-gift-item__name" data-ng-bind="gift.name"></div>\n                        <div class="slider-gift-item__price" data-ng-bind="getPrice(gift)"></div>\n                    </div>\n                    <!-- /item -->\n                </div>\n                <!-- /slide -->\n\n            </div>\n            <!-- /slider -->\n        </div>\n        <!-- /slider wrap -->\n    </div>\n    <!-- /slider cell -->\n\n</div>\n',
                scope: true,
                link: function (scope) {
                    scope.load = false;
                    scope.user = null;
                    scope.gifts = null;
                    scope.gifts_list = null;
                    function clean(){
                        scope.load = false;
                        if(jQuery(".js-gifts-slider") && jQuery(".js-gifts-slider").data('royalSlider')){
                            jQuery(".js-gifts-slider").data('royalSlider').destroy();
                        }
                    }
                    function update() {
                        clean();
                        userService.loadInfo().then(function(info){
                            scope.user = info;
                            scope.$digest();
                            giftService.loadList().then(function (gifts) {
                                scope.gifts_list = angular.extend([], gifts);
                                scope.gifts = giftService.getGiftsPages(angular.extend([], gifts));
                                scope.$digest();
                                setTimeout(function(){
                                    scope.load = true;
                                    var sliderControl = jQuery(".js-gifts-slider").royalSlider({
                                        imageScalePadding: 0,
                                        controlNavigation: 'none',
                                        arrowsNav: true,
                                        slidesSpacing: 10,
                                        loop: false,
                                        slidesOrientation: 'vertical',
                                        sliderDrag: true,
                                        sliderTouch: true,
                                        // autoHeight: true,
                                        navigateByClick: false,
                                        arrowsNavAutoHide: false
                                    }).data('royalSlider');

                                    var curSlide = jQuery('.js-gifts-slider__cur');
                                    //jQuery('.js-gifts-slider__all').html(sliderControl.numSlides);
                                    if(sliderControl) {
                                        sliderControl.ev.on('rsAfterSlideChange', function (event) {
                                            curSlide.html(sliderControl.currSlideId + 1);
                                        });
                                    }
                                    scope.$digest();
                                }, 800);
                                scope.$digest();
                            });
                        });
                    }
                    scope.$on('$destroy',function(){
                        clean();
                    });
                    scope.giftsCountTitle = function(num){
                        var count = scope.getAvailableGifts(num);
                        var gifts = helperService.declOfNum(num,["подарок", "подарка", "подарков"]);
                        var available = num == 1 ?  "доступен" : "доступно";
                        return count + ' ' + gifts + ' ' + available;
                    };
                    scope.getAvailableGifts = function(gifts){
                        if(!gifts) return 0;
                        var g = angular.extend([], gifts);
                        return g.filter(function(gift){
                            return scope.user.user_points.confirmed > gift.points;
                        }).length;
                    };
                    scope.getImage = function(gift){
                        return gift.thumbs.url_100x100;
                    };
                    scope.getGift = function(gift){
                      if (scope.user.user_points.confirmed < gift.points) {
                            return;
                        }
                        sp.send('gifts.purchase', {gift: gift});
                    };
                    scope.getPrice = giftService.getPrice;
                    update();
                    sp.on('gift.purchase.force_complete.success', function (res) {
                       update();
                    });

                }
            }

        }]);

    document.createElement('gifts-cmp');
    var elems = document.querySelectorAll('gifts-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['alpina.directives.gifts']);
    }

}(window.angular, window.SAILPLAY, window.$));