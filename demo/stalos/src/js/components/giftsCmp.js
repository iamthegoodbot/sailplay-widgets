(function (angular, sp, jQuery) {

    angular.module('stalos.directives.gifts', ['stalos.services.users', 'stalos.services.gifts'])

        .directive('giftsCmp', ['userService', 'giftService', function (userService, giftService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<section class="l-section-wrap gift-sec-wrap">\n    <div class="l-centered gift-sec">\n        <h1 class="cell-head">Список подарков</h1>\n        <div class="cell-title">\n            {{ gifts.length ? \'Меняйте накопленные баллы на подарки из списка\' : \'Список пуст\' }}\n        </div>\n\n        <div class="gift-sec__row" data-ng-if="user && gifts && gifts.length">\n\n            <div class="gift-sec__col" data-ng-repeat="gift in gifts">\n                <div class="gift-item">\n                    <div class="gift-item__img"><img data-ng-src="{{ gift.thumbs.url_100x100 }}"  alt=""></div>\n                    <div class="gift-item__text">{{ gift.name }}</div>\n\n                    <div class="gift-item__over">\n                        <div class="gift-item__overimg"><img data-ng-src="{{ gift.thumbs.url_100x100 }}" alt=""></div>\n                        <div class="gift-item__btn" \n                             data-ng-class="{ not_points : user.user_points.confirmed < gift.points}"\n                             data-ng-click="gift_purchase(gift)">\n                            {{ user.user_points.confirmed < gift.points ? \'Недостаточно баллов\' : \'Получить\' }}</div>\n                    </div>\n\n                    <div class="gift-item__price">{{ gift.points }}</div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</section>',
                scope: true,
                link: function (scope) {
                    scope.gifts = null;
                    sp.on('gift.purchase.force_complete.success', function (res) {
                        update();
                    });
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
                        }).then(function () {

                        });
                    }
                    update();
                }
            }

        }]);

    document.createElement('gifts-cmp');
    var elems = document.querySelectorAll('gifts-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['stalos.directives.gifts']);
    }

}(window.angular, window.SAILPLAY, window.$));