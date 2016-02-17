(function (angular, sp, hash) {

    angular.module('stalos', ['stalos.directives.profile', 'stalos.directives.gifts', 'stalos.directives.actions'])

        .directive('app', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '\n<div class="wrapper">\n    \n    <section class="l-section-wrap top-banner-wrap">\n        <div class="l-centered top-banner">\n            <div class="top-banner__head">Бонусная программа</div>\n            <div class="top-banner__title">Совершайте покупки, выполняйте задания, копите баллы и меняйте их на подарки</div>\n            <div class="top-banner__over"><img src="image/top-banner-over.png" alt=""></div>\n        </div>\n    </section>\n\n    <profile-cmp></profile-cmp>\n    \n    <gifts-cmp></gifts-cmp>\n\n    <actions-cmp></actions-cmp>\n\n</div>',
                scope: true,
                link: function (scope) {
                }
            }

        });

    var PARTNER_ID = 1528;

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
            angular.bootstrap(elems[i], ['stalos']);
        }
    }
    startApp(hash);

    //});


}(window.angular, window.SAILPLAY, window.AUTH_HASH));