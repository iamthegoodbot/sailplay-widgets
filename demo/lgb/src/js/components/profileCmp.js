(function (angular, sp, jQuery) {

    angular.module('lgb.directives.profile', ['lgb.services.users', 'lgb.services.statuses', 'lgb.services.gifts', 'lgb.tools.pagination'])

        .directive('profileCmp', ['userService', 'statusService', 'giftService', function (userService, statusService, giftService) {
            return {
                restrict: 'E',
                replace: true,
                template: "<div>\n\n\n    <!-- popups -->\n    <div class=\"history-popup js-history-popup\" style=\"display: none;\">\n        <div class=\"history-popup__close js-close-popup\"></div>\n        <div class=\"history-popup__head-wr\">\n            <div class=\"history-popup__head\">History</div>\n            <div class=\"history-popup__title\">\n                {{ history.length ? \'History of transactions\' : \'History is empty\' }}\n            </div>\n        </div>\n        <div class=\"history-popup__item\" data-ng-repeat=\"item in history_data\">\n            <div class=\"history-popup__item-date\">{{ toDateObj(item.action_date) | date:\'medium\' : \'-0800\'}}</div>\n            <div class=\"history-popup__item-points\" data-ng-class=\"{ \'this-dec\' : !ifPlus(item.points_delta)}\">{{ show_points(item.points_delta)  }}</div>\n            <div class=\"history-popup__item-name\">{{ get_history_name(item) }}</div>\n        </div>\n        <tools-pagination data-ng-if=\"history_data\"\n                          data-page=\"page\"\n                          data-items=\"history.length\"\n                          data-per-page=\"per_page\"\n                          data-on_change=\"change_page\"></tools-pagination>\n    </div>\n    <!-- /popups -->\n\n\n    <section class=\"l-section status-info-sec__wr js-status-sec js-status-sec-toopen\" style=\'display: none;\'>\n        <div class=\"l-section status-info-sec\">\n            <!-- класс this-active-col добавляется для изменения цвета соединительной линии -->\n\n            <div class=\"status-info-sec__col\" \n                 data-ng-repeat=\"status in statuses\"\n                 data-ng-class=\"{ \'this-active-col\' : status.is_received }\">\n                <div class=\"status-info-cell\">\n                    <div class=\"status-info-cell__img\">\n                        <img data-ng-src=\"{{ showImage(status) }}\" alt=\"\" class=\"img-soft-response\">\n                    </div>\n                    <div class=\"status-info-cell__text\">\n                        <div class=\"status-info-cell__head\" data-ng-bind=\"status.name\"></div>\n                        <div class=\"status-info-cell__title\" data-ng-bind=\"getDescToStatus($index)\"></div>\n                        <div class=\"status-info-cell__title this-green\" data-ng-if=\"!$first\" data-ng-bind=\"status.descr\"></div>\n                        <div class=\"status-info-cell__note\" data-ng-bind=\"getOffsetToStatus($index, user.purchases.sum)\"></div>\n                        <div class=\"status-info-cell__note\" data-ng-if=\"last && last.id == status.id\">Your current status</div>\n                    </div>\n                </div>\n            </div>\n\n\n            <div class=\"status-info-sec__close js-close-status\" data-ng-click=\"toggleStatuses()\"></div>\n        </div>\n    </section>\n    \n    <section class=\"l-centered status-prog-sec__wr\" data-ng-if=\"user && history\">\n        <div class=\"l-centered status-prog-sec\">\n\n            <div class=\"status-prog-sec__info\">\n\n                <div class=\"status-prog-sec__left\">\n                    <div class=\"status-prog-sec__img\">\n                        <img data-ng-src=\"{{ showImage(last) }}\" alt=\"\" class=\"img-soft-response\">\n                    </div>\n                    <div class=\"status-prog-sec__text\">\n                        <div class=\"status-prog-sec__head \">Hello {{ user.user.first_name }}</div>\n                        <div class=\"status-prog-sec__title\" data-ng-if=\"last\">Your status:\n                            <a href=\"#\" class=\"dashed-link dashed-link_gray\"\n                            data-ng-click=\"toggleStatuses();$event.preventDefault();\" data-ng-bind=\"last.name\"></a>\n                        </div>\n                        <div class=\"status-prog-sec__title\" data-ng-if=\"last\"\n                             data-ng-bind=\"forNextStatus()\"></div>\n                        <div class=\"status-prog-sec__title\" data-ng-if=\"!last\">\n                            <a href=\"#\" class=\"dashed-link dashed-link_gray\"\n                               data-ng-click=\"toggleStatuses();$event.preventDefault();\" data-ng-bind=\"forNextStatus()\"></a>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"status-info-counter status-prog-sec__right\">\n                    <div class=\"status-info-counter__count\">\n                        <span class=\"status-info-counter__count-val\" data-ng-bind=\"user.user_points.confirmed\"></span>\n                        <div class=\"status-info-counter__remain\">\n                            +{{ user.user_points.unconfirmed }}\n                            <div class=\"status-info-counter__remain-popup\">\n                                Unconfirmed points that will be confirmed after the payment\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"status-info-counter__text\">\n                        <div class=\"status-info-counter__text-outer\">\n                            <div class=\"status-info-counter__text-inner\">\n                                <div class=\"status-info-counter__title\">bonus points</div>\n                                <div class=\"status-info-counter__hist js-hist-popup js-open-history-popup\"\n                                data-ng-click=\"show_history()\">View history</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <!-- /status-prog-sec__info -->\n\n            <div class=\"status-bar__outer\">\n                <div class=\"status-bar__inner\" style=\"width: {{ percents }}%;\"></div>\n            </div>\n\n        </div>\n    </section>\n    \n</div>",
                scope: true,
                link: function (scope, el) {
                    scope.user = null;
                    scope.history = null;
                    scope.percents = 0;
                    scope.toDateObj = userService.toDateObj;
                    scope.show_history = function () {
                        if (!scope.history) return;
                        jQuery('.js-history-popup').bPopup({
                            speed: 450,
                            transition: 'fadeIn',
                            closeClass: 'js-close-popup',
                            positionStyle: 'absolute',
                            follow: [true, false],
                            modal: true,
                            modalClose: true,
                            modalColor: '#E6E6E6',
                            opacity: 0.9,
                            onOpen: function () {
                                scope.change_page();
                            },
                            onClose: function () {
                                scope.history_data = [];
                                scope.$digest();
                            }
                        });
                    };
                    scope.ifPlus = function(num){
                        if(!num || num > 0) return true;
                        if(num < 0) {

                        }
                    };
                    scope.toggleStatuses = function () {
                        jQuery('.js-status-sec').slideToggle(300);
                    };
                    scope.history_date_format = userService.historyDateFormat;
                    scope.get_history_name = userService.getHistoryActionName;
                    scope.show_points = userService.show_history_points;
                    scope.getOffsetToStatus = statusService.getOffsetToStatus;
                    scope.getDescToStatus = statusService.getDescToStatus;
                    scope.per_page = 5;
                    scope.change_page = function (page) {
                        scope.page = +page || 1;
                        scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
                    };
                    scope.forNextStatus = function () {
                        var points = statusService.getOffsetToNextStatus(scope.user.purchases.sum);
                        var status = statusService.getNextStatus(scope.statuses);
                        if(points == null) {
                            return '';
                        } else {
                            return status ? '$' + points + ' to the ' + status.name + ' status' : 'You don\'t have a status';
                        }
                    };
                    scope.showImage = function (status) {
                        if (!status) {
                            status = {}
                        }
                        var imgs = statusService.getImages(status.id);
                        return status.is_received ? imgs.active : imgs.origin;
                    };
                    function update() {
                        userService.loadInfo().then(function (user) {
                            scope.user = user;
                            scope.$digest();
                            statusService.loadList().then(function (data) {
                                if (data.multilevel_badges && data.multilevel_badges[1] && data.multilevel_badges[1].length) {
                                    scope.statuses = data.multilevel_badges[1];
                                    scope.last = statusService.getLastStatus(scope.statuses);
                                    scope.$digest();
                                }
                                giftService.loadList().then(function(data){
                                    scope.percents = statusService.getPercents(scope.user.user_points.confirmed, data);
                                    scope.$digest();
                                })
                            });
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
                    sp.on('tags.add.success', function (res) {
                        setTimeout(function () {
                            update();
                        }, 3000);
                    });
                }
            }

        }]);

    document.createElement('profile-cmp');
    var elems = document.querySelectorAll('profile-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['lgb.directives.profile']);
    }

}(window.angular, window.SAILPLAY, window.$));