(function (angular, sp, ah) {

    angular.module('alpina', ['alpina.directives.profile', 'alpina.directives.statuses', 'alpina.directives.actions'])

        .directive('app', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '<div class="full">\n    <profile-cmp></profile-cmp>\n    <statuses-cmp></statuses-cmp>\n    <actions-cmp></actions-cmp>\n</div>',
                scope: true,
                link: function (scope) {

                }
            }

        });

    var PARTNER_ID = 1199;

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
            angular.bootstrap(elems[i], ['alpina']);
        }
    }
    startApp(ah);


    //});


}(window.angular, window.SAILPLAY, window.AUTH_HASH));