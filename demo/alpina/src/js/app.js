(function (angular, sp, ah) {

    angular.module('alpina', ['alpina.directives.profile', 'alpina.directives.statuses', 'alpina.directives.actions'])

        .directive('app', function (USER_EMAIL, $rootScope) {

            return {
                restrict: 'E',
                replace: true,
                template: '<div class="full">\n    <profile-cmp></profile-cmp>\n    <statuses-cmp></statuses-cmp>\n    <actions-cmp></actions-cmp>\n</div>',
                scope: true,
                link: function (scope) {
                  console.log('USER_EMAIL', USER_EMAIL);
                  $rootScope.USER_EMAIL = USER_EMAIL;
                  console.log('$rootScope.USER_EMAIL', $rootScope.USER_EMAIL);

                }
            }

        });

    var PARTNER_ID = 1199;

    window.startLoyaltyApp = function(auth_hash, email) {
        angular.module('alpina').constant('USER_EMAIL', email);
        sp.send('init', {partner_id: PARTNER_ID, lang: 'ru', domain: window.location.protocol + '//sailplay.ru'});
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
    };

    function bootstrap() {
        document.createElement('app');
        var elems = document.querySelectorAll('app');
        for (var i = 0; i < elems.length; i += 1) {
            angular.bootstrap(elems[i], ['alpina']);
        }
    }

}(window.angular, window.SAILPLAY));