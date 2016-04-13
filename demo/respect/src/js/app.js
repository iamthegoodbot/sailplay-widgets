(function (angular, sp, hash) {

    angular.module('respect', ['respect.directives.bonus', 'respect.directives.profile', 'respect.directives.actions', 'respect.directives.history', 'respect.tools.notify'])

        .directive('app', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    \n    <bonus-cmp></bonus-cmp>\n    \n    <profile-cmp></profile-cmp>\n    \n    <!--<gifts-cmp></gifts-cmp>-->\n    \n    <actions-cmp></actions-cmp>\n\n    <tools-notify></tools-notify>\n    \n</div>',
                scope: true,
                link: function (scope) {
                }
            }

        })

        .directive('appHistory', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    \n   <history-cmp></history-cmp>\n    \n</div>',
                scope: true,
                link: function (scope) {
                }
            }

        });

    var PARTNER_ID = 1482;

    function startApp(auth_hash) {
        sp.send('init', {partner_id: PARTNER_ID, lang: 'ru', domain: '//sailplay.ru'});
        if (auth_hash) {
            sp.on('init.success', function () {
                sp.send('login', auth_hash);
                sp.on('login.success', function () {
                    bootstrap('app');
                    bootstrap('app-history');
                });
            });
        } else {
            sp.on('init.success', function () {
                bootstrap('app');
                bootstrap('app-history');
            });
        }
    }

    function bootstrap(name) {
        document.createElement(name);
        var elems = document.querySelectorAll(name);
        for (var i = 0; i < elems.length; i += 1) {
            angular.bootstrap(elems[i], ['respect']);
        }
    }
    startApp(hash);



}(window.angular, window.SAILPLAY, window.AUTH_HASH));