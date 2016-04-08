(function (angular, sp, ah) {

    angular.module('lgb', ['lgb.directives.gifts', 'lgb.directives.actions', 'lgb.directives.profile', 'lgb.directives.badges'])

        .directive('app', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '<div class="wrapper s">\n    <section class="l-section-wrap welcome-sec__wr">\n        <div class="l-section welcome-sec">\n            <div class="welcome-sec__left">\n                <div class="welcome-sec__title">welcome to</div>\n                <div class="welcome-sec__head">LGB Rewards</div>\n            </div>\n            <!-- /left -->\n            <div class="welcome-sec__right">\n                <div class="welcome-sec__item this-icon-1">\n                    <div class="welcome-sec__item-head">Order in-store or online</div>\n                    <div class="welcome-sec__item-title">Get bonus points for your purchases</div>\n                </div>\n                <div class="welcome-sec__item this-icon-2">\n                    <div class="welcome-sec__item-head">Earn extra points</div>\n                    <div class="welcome-sec__item-title">Join our Facebook group, tell your friends about us and get bonus points for free</div>\n                </div>\n                <div class="welcome-sec__item this-icon-3">\n                    <div class="welcome-sec__item-head">Get awesome gifts</div>\n                    <div class="welcome-sec__item-title">You can redeem your points for our products</div>\n                </div>\n            </div>\n            <!-- /right -->\n        </div>\n\n    </section>\n    <profile-cmp></profile-cmp>\n    <gifts-cmp></gifts-cmp>\n    <badges-cmp></badges-cmp>\n    <actions-cmp></actions-cmp>\n</div>',
                scope: true,
                link: function (scope) {

                }
            }

        });

    var PARTNER_ID = 1522;

    function startApp(auth_hash) {
        sp.send('init', {partner_id: PARTNER_ID, lang: 'en', domain: '//sailplay.ru'});
        if (auth_hash) {
            sp.on('init.success', function () {
                sp.send('login', auth_hash);
                sp.on('login.success', function () {
                    bootstrap();
                });
                sp.on('login.error', function () {
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
            angular.bootstrap(elems[i], ['lgb']);
        }
    }
    startApp(ah);


    //});


}(window.angular, window.SAILPLAY, window.AUTH_HASH));