(function (angular, sp) {

    angular.module('pof', ['pof.directives.profile', 'pof.directives.actions', 'pof.directives.badges', 'pof.directives.history', 'pof.directives.gifts'])

        .directive('app', function () {

            return {
                restrict: 'E',
                replace: true,
                template: '<div class="wrapper pof">\n    <section class="l-section-wrap welcome-sec__wr">\n        <div class="l-section welcome-sec">\n            <div class="welcome-sec__left">\n                <!--<div class="welcome-sec__head welcome-sec__head_sm">The Big Deal</div>-->\n                <img src="//sailplays3.cdnvideo.ru/media/assets/assetfile/25f763baa401ce2b5309ee28317eb647.png"\n                     class="welcome-sec__logo" alt="">\n                <ul class="nav-main welcome-sec__nav">\n                    <li class="nav-main__item"\n                        data-ng-class="{ active : show == 1 ? true : false }"><a class="nav-main__link" href="#"\n                                                                                 data-ng-click="set_active(1, $event)">Gifts</a>\n                    </li>\n                    <li class="nav-main__item"\n                        data-ng-class="{ active : show == 2 ? true : false }"><a class="nav-main__link" href="#"\n                                                                                 data-ng-click="set_active(2, $event)">Tasks</a>\n                    </li>\n                    <li class="nav-main__item"\n                        data-ng-class="{ active : show == 3 ? true : false }"><a class="nav-main__link" href="#"\n                                                                                 data-ng-click="set_active(3, $event)">History</a>\n                    </li>\n                </ul>\n            </div>\n            <!-- /left -->\n            <div class="welcome-sec__right">\n                <div class="welcome-sec__item this-icon-1">\n                    <div class="welcome-sec__item-head">Order in-store or online</div>\n                    <div class="welcome-sec__item-title">Get bonus points for your purchases</div>\n                </div>\n                <div class="welcome-sec__item this-icon-2">\n                    <div class="welcome-sec__item-head">Earn extra points</div>\n                    <div class="welcome-sec__item-title">Join our Facebook group, tell your friends about us and get\n                        bonus points for free\n                    </div>\n                </div>\n                <div class="welcome-sec__item this-icon-3">\n                    <div class="welcome-sec__item-head">Get awesome gifts</div>\n                    <div class="welcome-sec__item-title">You can redeem your points for our products</div>\n                </div>\n            </div>\n            <!-- /right -->\n        </div>\n\n    </section>\n\n    <profile-cmp data-ng-if="show"></profile-cmp>\n    <div data-ng-switch="show">\n        <div data-ng-switch-when="1">\n            <gifts-cmp></gifts-cmp>\n        </div>\n        <div data-ng-switch-when="2">\n            <badges-cmp></badges-cmp>\n            <actions-cmp></actions-cmp>\n        </div>\n        <div data-ng-switch-when="3">\n            <history-cmp></history-cmp>\n        </div>\n\n    </div>\n\n\n</div>',
                scope: true,
                link: function (scope) {
                    scope.show = 2;
                    scope.is_active = function (name) {
                        return scope.show === name;
                    };
                    scope.set_active = function (name, event) {
                        event.preventDefault();
                        scope.show = name;
                    };

                }
            }

        });

    var PARTNER_ID = 1512;

    function getAuthHash() {
        var url = '//sailplay.ru/js-api/' + PARTNER_ID + '/custom/pools-of-fun-auth/';
        var obj = {
            email: EMAIL
        };
        sp.jsonp.get(url, obj, function (res) {
            if (res.status == 'ok') {
                startApp(res.auth_hash);
            } else {
                console.log('Error: ', res.message);
                startApp();
            }
        });

    }

    function startApp(auth_hash) {
        sp.send('init', {partner_id: PARTNER_ID, lang: 'en', domain: '//sailplay.ru'});
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
            angular.bootstrap(elems[i], ['pof']);
        }
    }
    getAuthHash();

    //});


}(window.angular, window.SAILPLAY));