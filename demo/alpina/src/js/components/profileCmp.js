(function (angular, sp, jQuery) {

    angular.module('alpina.directives.profile', ['alpina.services.users', 'alpina.tools.pagination'])

        .directive('profileCmp', ['userService', function (userService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n\n    <!-- popups -->\n    <div class="popup-history js-history-popup" data-ng-if="user && history" style="display: none;">\n        <div class="popup-history__close js-close-popup"></div>\n        <div class="popup-history__top">\n            <div class="popup-history__head">История</div>\n            <div class="popup-history__title">\n                {{ history.length ? \'Здесь отображается история покупок,  количество накопленных баллов, а так же полученные вами подарки\' : \'История пуста\' }}\n            </div>\n        </div>\n        <div class="popup-history__body">\n            <div class="popup-history__list-wr">\n\n                <div class="popup-history-item" data-ng-repeat="item in history_data">\n                    <div class="popup-history-item__right">\n                        <div class="popup-history-item__plus">{{ show_points(item.points_delta)  }}</div>\n                    </div>\n                    <div class="popup-history-item__date">{{ history_date_format(item.action_date) }}</div>\n                    <div class="popup-history-item__title">{{ get_history_name(item) }}</div>\n                </div>\n                <!-- /item -->\n\n            </div>\n            <!-- /list-wr -->\n            <tools-pagination data-ng-if="history_data"\n                              data-page="page"\n                              data-items="history.length"\n                              data-per-page="per_page"\n                              data-on_change="change_page"></tools-pagination>\n            \n        </div>\n    </div>\n    <!-- /popups -->\n    <section class="l-section-wrap top-section" data-ng-if="user && history">\n        <div class="container">\n            <!-- /account-form -->\n            <div class="row">\n                <div class="col-xs-12 col-md-8">\n                    <div class="header-cell common-shaded-cell">\n                        <div class="header-cell__top-back"></div>\n                        <div class="header-cell__btm-back"></div>\n                        <div class="header-cell__head">Программа <br class="no-mobile-md">лояльности</div>\n                        <div class="header-cell__title">Совершайте покупки, выполняйте задания, <br class="no-mobile-md">копите баллы и меняйте их на подарки</div>\n                    </div>\n                </div>\n                <!-- /col -->\n                <div class="col-xs-12 col-md-4">\n                    <div class="header-count-cell common-shaded-cell">\n                        <div class="header-count-cell__top">\n                            <div class="header-count-cell__value">{{ user.user_points.confirmed }}</div>\n                            <div class="header-count-cell__title">бонусных баллов</div>\n                        </div>\n                        <div class="header-count-cell__btm">\n                            <a href="#" class="common-btn header-count-cell__btn js-history-popup-tr"\n                               data-ng-click="show_history()">История начислений</a>\n                        </div>\n                    </div>\n                </div>\n                <!-- /col -->\n            </div>\n            <!-- /row -->\n        </div>\n        <!-- /container -->\n    </section>\n</div>',
                scope: true,
                link: function (scope) {
                    scope.user = null;
                    scope.history = null;
                    scope.show_history = function () {
                        if (!scope.history) return;
                        jQuery('.js-history-popup').bPopup({
                            speed: 450,
                            transition: 'fadeIn',
                            closeClass: 'js-close-popup',
                            positionStyle: 'absolute',
                            follow: [true,false],
                            modal: true,
                            modalClose: true,
                            modalColor: '#2B2B2B',
                            opacity: 0.8,
                            onOpen: function () {
                                scope.change_page();
                            },
                            onClose: function () {
                                scope.history_data = [];
                            }
                        });
                    };
                    scope.history_date_format = userService.historyDateFormat;
                    scope.get_history_name = userService.getHistoryActionName;
                    scope.show_points = userService.show_history_points;
                    scope.per_page = 5;
                    scope.change_page = function (page) {
                        scope.page = +page || 1;
                        scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
                    };
                    function update() {
                        userService.loadInfo().then(function (user) {
                            scope.user = user;
                            scope.$digest();
                        });
                        userService.loadHistory().then(function (history) {
                            scope.history = history;
                            scope.$digest();
                        });
                    }
                    update();
                    sp.on('gift.purchase.force_complete.success', function (res) {
                        update();
                    });
                    sp.on('actions.perform.success', function (data) {
                        update();
                    });
                }
            }

        }]);

    document.createElement('profile-cmp');
    var elems = document.querySelectorAll('profile-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['alpina.directives.profile']);
    }

}(window.angular, window.SAILPLAY, window.$));