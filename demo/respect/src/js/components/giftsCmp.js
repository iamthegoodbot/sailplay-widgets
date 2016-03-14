(function (angular, sp, jQuery) {

    angular.module('respect.directives.gifts', ['respect.services.users', 'respect.services.gifts'])

        .directive('giftsCmp', ['userService', 'giftService', function (userService, giftService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<section class="l-centered gift-sec">\n    <h1 class="common-cell-head">Список подарков</h1>\n    <div class="common-cell-title">{{ gifts.length ? \'Меняйте накопленные баллы на подарки из списка\' : \'Список пуст\' }}</div>\n\n    <div class="gift-sec__row" data-ng-if="user && gifts && gifts.length">\n\n        <div class="gift-sec__col" data-ng-repeat="gift in gifts">\n\n            <div class="gift-item">\n                <div class="gift-item__img"><img data-ng-src="{{ gift.thumbs.url_250x250 }}" alt=""></div>\n                <div class="gift-item__std">\n                    <div class="gift-item__head" data-ng-bind="gift.name"></div>\n                    <div class="gift-item__title" data-ng-bind="gift.descr"></div>\n                </div>\n                <div class="gift-item__hover">\n                    <div class="common-btn common-btn_blue gift-item__btn"\n                         data-ng-click="gift_purchase(gift)">\n                        {{ user.user_points.confirmed < gift.points ? \'Недостаточно баллов\' : \'Получить\' }}</div>\n                </div>\n                <div class="gift-item__price">{{ gift.points }}</div>\n            </div>\n\n        </div>\n\n    </div>\n</section>',
                scope: true,
                link: function (scope) {
                    scope.gifts = null;
                    scope.gift_purchase = function (gift) {
                        if (scope.user.user_points.confirmed < gift.points) {
                            return;
                        }
                        sp.send('gifts.purchase', gift);
                    };
                    function update() {
                        scope.gifts = [];
                        userService.loadInfo().then(function (user) {
                            scope.user = user;
                            scope.$digest();
                        });
                        giftService.loadList().then(function (gifts) {
                            scope.gifts = gifts;
                            scope.$digest();
                        });
                    }
                    update();
                    sp.on('actions.perform.success', function (data) {
                        update();
                    });
                    sp.on('tags.add.success', function (data) {
                        update();
                    });
                    sp.on('gifts.purchase.force_complete.success', function (res) {
                        update();
                    });
                    sp.on('gifts.purchase.success', function (res) {
                        update();
                        scope.$emit('notify', 'Подарок добавлен в корзину!');
                        scope.$digest();
                    });
                }
            }

        }]);

    document.createElement('gifts-cmp');
    var elems = document.querySelectorAll('gifts-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['respect.directives.gifts']);
    }

}(window.angular, window.SAILPLAY, window.$));