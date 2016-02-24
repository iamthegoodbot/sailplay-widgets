(function (angular, sp, hash, jQuery) {

    angular.module('mario', ['mario.directives.profile', 'mario.directives.actions'])

        .directive('app', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '\n<div class="wrapper">\n    \n    <section class="l-centered top-banner-wrap">\n        <div class="l-section top-banner shaded-cell">\n            Бонусная программа\n        </div>\n\n        <div class="l-section discount-sec shaded-cell">\n            <div class="discount-sec__top">\n                Получить скидку легко!\n            </div>\n            <!-- /top -->\n            <div class="discount-sec__body">\n                <div class="discount-sec__col1">\n                    <div style="cursor: pointer; text-decoration: underline;" class="discount-sec__text this-ico1" data-ng-click="scrollTo(\'#tasks\');$event.preventDefault();">Выполняйте задания</div>\n                    <div class="discount-sec__text this-ico2">Оформляйте заказы</div>\n                </div>\n                <div class="discount-sec__col2">\n                    <div class="discount-sec__text this-ico3">Получайте баллы</div>\n                </div>\n                <div class="discount-sec__col3">\n                    <div class="discount-sec__text this-ico4">Оплачивайте баллами (1 балл = 1 руб.)</div>\n                </div>\n            </div>\n            <!-- /body -->\n        </div>\n\n        <div class="top-banner-wrap__over"><img src="image/back-02.png" alt=""></div>\n    </section>\n\n    <profile-cmp></profile-cmp>\n\n    <actions-cmp></actions-cmp>\n\n  \n</div>',
                scope: true,
                link: function (scope) {
                    scope.scrollTo = function (selector) {
                        if (jQuery(selector)) {
                            jQuery(window).scrollTo(jQuery(selector), 500);
                        } else {
                            return;
                        }
                    };
                }
            }

        });

    var PARTNER_ID = 1479;

    function startApp(auth_hash) {
        sp.send('init', {partner_id: PARTNER_ID, lang: 'ru', domain: '//sailplay.ru'});
        if (auth_hash) {
            sp.on('init.success', function () {
                sp.send('login', auth_hash);
                sp.on('login.success', function () {
                    bootstrap();
                });
            });
        } else {
            sp.on('init.success', function () {
                bootstrap();
            });
        }
    }

    function bootstrap() {
        document.createElement('app');
        var elems = document.querySelectorAll('app');
        for (var i = 0; i < elems.length; i += 1) {
            angular.bootstrap(elems[i], ['mario']);
        }
    }

    startApp(hash);

    //});


}(window.angular, window.SAILPLAY, window.AUTH_HASH, window.$));