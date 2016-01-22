(function (angular, sp, jQuery) {

    angular.module('pof.directives.profile', ['pof.services.users', 'pof.services.badges', 'pof.tools.pagination'])

        .directive('profileCmp', ['userService', 'badgeService', function (userService, badgeService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n\n    <section data-ng-if="user && history" class="l-section status-info-sec__wr js-status-sec" style="display: none;">\n        <div class="l-section status-info-sec">\n            <div class="status-info-sec__close js-close-status"\n                 data-ng-click="status_list_close()"></div>\n\n            <div class="status-info-sec__col" data-ng-repeat="item in statuses">\n                <div class="status-info-cell">\n                    <div class="status-info-cell__img">\n                        <img data-ng-src="{{ item.thumbs.url_100x100 }}" alt="{{ item.name }}" class="img-soft-response">\n                    </div>\n                    <div class="status-info-cell__head">{{ item.name }}</div>\n                    <div class="status-info-cell__title">{{ item.descr }}</div>\n                    <div class="status-info-cell__descr this-blue">{{ getHintToStatus($index) }}</div>\n                </div>\n            </div>\n\n        </div>\n    </section>\n\n    <section data-ng-if="user && history" class="l-centered status-prog-sec__wr">\n        <div class="l-centered status-prog-sec">\n            <div class="status-prog-sec__info">\n                <div class="status-info-cell status-prog-sec__left">\n                    <div class="status-info-cell__img">\n                        <img data-ng-if="last_status" data-ng-src="{{ last_status.pic || without_status }}" alt="" class="img-soft-response">\n                    </div>\n                    <div class="status-info-cell__head ">Hello {{ user.user.name || \'customer\' }}</div>\n                    <div class="status-info-cell__title" data-ng-if=last_status>\n                        {{ last_status.name && \'Your status: \' }}\n                        <a href="#" data-ng-click="status_list_open($event)" class="dashed-link dashed-link_gray">\n                            {{ last_status.name || \'You have not status\'}}</a>\n                    </div>\n                    <div class="status-info-cell__descr">\n                        {{ points_to_next_status }} to the {{ next_status ? next_status.name : \'Bronze\' }} status\n                    </div>\n                </div>\n                <div class="status-info-counter status-prog-sec__right">\n                    <div class="status-info-counter__count">\n                        <span class="status-info-counter__count-val">\n                            {{ user.user_points.confirmed }}\n                        </span>\n                        <div class="status-info-counter__remain">\n                            +{{ user.user_points.unconfirmed }}\n                            <div class="status-info-counter__remain-popup">\n                                Unconfirmed points that will be confirmed after the payment\n                            </div>\n                        </div>\n                    </div>\n                    <div class="status-info-counter__text">\n                        <div class="status-info-counter__text-outer">\n                            <div class="status-info-counter__text-inner">\n                                <div class="status-info-counter__title">bonus points</div>\n                                <div class="status-info-counter__hist js-hist-popup js-open-history-popup"\n                                     data-ng-click="show_history()">View\n                                    history\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n            <!-- /status-prog-sec__info -->\n            <div class="status-bar__outer">\n                <div class="status-bar__inner" data-ng-style="{ \'width\' : persents_to_next_status + \'%\' }"></div>\n            </div>\n        </div>\n    </section>\n\n    <!-- popups -->\n    <div data-ng-if="user && history" class="history-popup js-history-popup" style="display: none;">\n        <div class="history-popup__close js-close-popup"></div>\n        <div class="history-popup__head-wr">\n            <div class="history-popup__head">History</div>\n            <div class="history-popup__title">{{ history.length ? \'History of transactions\' : \'History is empty\' }}\n            </div>\n        </div>\n        <div class="history-popup__item" data-ng-repeat="item in history_data">\n            <div class="history-popup__item-date">{{ toDateObj(item.action_date) | date:\'medium\' }}</div>\n            <div class="history-popup__item-points">{{ show_points(item.points_delta) }}</div>\n            <div class="history-popup__item-name">{{ get_action_name(item) }}</div>\n        </div>\n        <tools-pagination data-ng-if="history_data"\n                          data-page="page"\n                          data-items="history.length"\n                          data-per-page="per_page" \n                          data-on_change="change_page"></tools-pagination>\n    </div>\n    <!-- /popups -->\n</div>',
                scope: true,
                link: function (scope) {
                    console.log('profile load');
                    scope.user = null;
                    scope.history = null;
                    scope.persents_to_next_status = 0;
                    scope.without_status = 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/bb0a0b823f3aa31c081e56ebcd5403fe.jpg';
                    scope.getSumForStatuses = badgeService.getSumForStatuses;
                    function update() {
                        userService.getInfo().then(function (user) {
                            scope.user = user;
                            badgeService.getList().then(function (data) {
                                scope.statuses = data.multilevel_badges[0] || [];
                                if (scope.statuses.length) {
                                    scope.last_status = {};
                                    scope.last_status.pic = '';
                                    scope.persents_to_next_status = Math.round((scope.user.purchases.sum / 1000) * 100);
                                    scope.points_to_next_status = 1000 - scope.user.purchases.sum;
                                    for (var i = 0, len = scope.statuses.length; i < len; i++) {
                                        if (scope.statuses[i].is_received && !scope.statuses[i + 1].is_received) {
                                            scope.last_status = scope.statuses[i];
                                            scope.last_status.pic = scope.last_status.thumbs.url_100x100;
                                            scope.next_status = scope.statuses[i + 1];
                                            scope.points_to_next_status = scope.next_status ? (scope.getSumForStatuses()[i + 1] - scope.user.purchases.sum) : 0;
                                            scope.persents_to_next_status = Math.round(((scope.user.purchases.sum - scope.getSumForStatuses()[i]) / (scope.getSumForStatuses()[i + 1] - scope.getSumForStatuses()[i])) * 100);
                                            break;
                                        }
                                    }
                                }
                                scope.$digest();
                            });
                        });
                    }

                    sp.on('gifts.purchase.success', function (res) {
                        update();
                    });
                    update();
                    scope.per_page = 5;
                    userService.getHistory().then(function (history) {
                        scope.history = history;
                        scope.$digest();
                    });
                    scope.getHintToStatus = badgeService.getHintToStatus;
                    scope.change_page = function (page) {
                        scope.page = +page || 1;
                        scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
                    };
                    scope.toDateObj = userService.toDateObj;
                    scope.status_list_close = function () {
                        jQuery('.js-close-status').parents('.js-status-sec').slideToggle(300);
                    };
                    scope.status_list_open = function (e) {
                        e.preventDefault();
                        jQuery('.js-close-status').parents('.js-status-sec').slideToggle(300);
                    };
                    scope.get_action_name = userService.getHistoryActionName;
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
                            }
                        });
                    };
                    scope.show_points = userService.show_history_points;
                }
            }

        }]);

    document.createElement('profile-cmp');
    var elems = document.querySelectorAll('profile-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['pof.directives.profile']);
    }

}(window.angular, window.SAILPLAY, window.$));