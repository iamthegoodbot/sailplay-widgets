(function (angular, sp, jQuery) {

    angular.module('mario.directives.profile', ['mario.services.users', 'mario.tools.pagination', 'mario.services.statuses'])

        .directive('profileCmp', ['userService', 'statusService', function (userService, statusService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n\n\n    <!-- popup -->\n    <div class="hist-popup js-history-popup" data-ng-if="user && history" style="display: none;">\n        <div class="hist-popup__close js-close-popup"><img src="image/close-cross.png" alt=""></div>\n        <div class="hist-popup__header">\n            {{ history.length ? \'История\' : \'История пуста\' }}\n        </div>\n        <div class="hist-popup__body">\n            <div class="hist-list">\n                <div class="hist-item js-hist-more" data-ng-repeat="item in history_data">\n                    <div class="hist-item__date">{{ history_date_format(item.action_date) }}</div>\n                    <div class="hist-item__right">\n                        <div class="hist-item__points">{{ show_points(item.points_delta)  }}</div>\n                        <!--<div class="hist-item__points-dec">- 50 баллов</div>-->\n                    </div>\n                    <div class="hist-item__name">{{ get_history_name(item) }}</div>\n                    <!--<div class="hist-item__more">5 позиций</div>-->\n                </div>\n                <!-- /item -->\n            </div>\n            <!-- /hist-list -->\n\n            <tools-pagination data-ng-if="history_data"\n                              data-page="page"\n                              data-items="history.length"\n                              data-per-page="per_page"\n                              data-on_change="change_page"></tools-pagination>\n        </div>\n    </div>\n\n    <section class="l-section personal-sec shaded-cell">\n        <div class="personal-sec__over"><img src="image/back-03.png" alt=""></div>\n        <div class="personal-sec__inner">\n            <div class="personal-sec__left">\n                <div class="personal-sec__photo" style=\'background-image: url({{ user.user.pic }});\'></div>\n                <div class="personal-sec__name">Здравствуйте, <br>{{ user.user.first_name || \'РАДЫ ВАС ВИДЕТЬ\'}}</div>\n            </div>\n            <!-- /left -->\n            <div class="personal-sec__right">\n                <div class="personal-sec__lk-head">Личный кабинет</div>\n                <ul class="personal-sec__nav">\n                    <li><a href="http://marioberluchi.ru/onestep/" target="_blank">Персональные данные</a></li>\n                    <li><a href="http://marioberluchi.ru/my/orders/" target="_blank">История заказов</a></li>\n                    <li><a href="#" target="_blank">Избранное</a></li>\n                    <li><a href="#" data-ng-click="scrollTo(\'#bonus\');$event.preventDefault();">Бонусные баллы</a></li>\n                </ul>\n            </div>\n            <!-- /right -->\n        </div>\n        <!-- /inner -->\n    </section>\n\n    <section class="l-centered cells-wrap" id="bonus" data-ng-if="user && statuses">\n        <div class="cell-left">\n            <div class="count-bonus-cell shaded-cell">\n                <div class="count-bonus-cell__head">Ваши баллы</div>\n                <div class="count-bonus-cell__count" data-ng-bind="user.user_points.confirmed"></div>\n                <div class="count-bonus-cell__title">бонусных баллов</div>\n                <div class="common-btn" data-ng-click="show_history()">История начислений</div>\n            </div>\n        </div>\n        <!-- /left -->\n        <div class="cell-right">\n            <div class="cur-status-cell shaded-cell">\n                <div class="cur-status-cell__head">Ваш статус</div>\n                <div class="cur-status-cell__img"><img data-ng-src="{{ last.thumbs.url_250x250 }}" alt=""></div>\n                <div class="common-btn" data-ng-click="toggleStatuses()">Список статусов</div>\n            </div>\n        </div>\n\n        <section class="l-section all-status-sec shaded-cell" style="display: none;">\n            <div class="close-this-cell" data-ng-click="toggleStatuses()"></div>\n            <div class="section-container">\n                <div class="col-md-3 col-xs-12" data-ng-repeat="status in statuses">\n                    <div class="all-status-sec__img"><img data-ng-src="{{ status.thumbs.url_250x250 }}" alt=""></div>\n                    <div class="all-status-sec__name" data-ng-bind="status.name"></div>\n                    <div class="all-status-sec__title" data-ng-bind="status.descr"></div>\n                </div>\n            </div>\n        </section>\n        \n        <!-- /right -->\n    </section>\n\n    <section class="l-centered cells-wrap">\n        <div class="cell-left">\n            <div class="history-cell shaded-cell">\n                <div class="history-cell__head">История заказов</div>\n                <div class="history-cell__img"><img src="image/gift.png" alt=""></div>\n                <a href="http://marioberluchi.ru/my/orders/" target="_blank" class="common-btn">История заказов</a>\n            </div>\n        </div>\n        <!-- /left -->\n        <div class="cell-right">\n            <div class="favorite-cell shaded-cell">\n                <div class="favorite-cell__head">Избранное</div>\n                <div class="favorite-cell__img"><img src="image/heart.png" alt=""></div>\n                <a href="#" class="common-btn" target="_blank">Избранное</a>\n            </div>\n        </div>\n        <!-- /right -->\n    </section>\n\n\n</div>',
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
                            follow: [true, false],
                            modal: true,
                            modalClose: false,
                            modalColor: '#222',
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
                    scope.scrollTo = function (selector) {
                        if (jQuery(selector)) {
                            jQuery(window).scrollTo(jQuery(selector), 500);
                        } else {
                            return;
                        }
                    };
                    scope.toggleStatuses = function () {
                        jQuery('.all-status-sec').fadeToggle();
                    };
                    function update() {
                        userService.loadInfo().then(function (user) {
                            scope.user = user;
                            scope.$digest();
                            statusService.loadList().then(function (data) {
                                scope.statuses = angular.extend([],data.multilevel_badges[0]);
                                scope.last = statusService.getLastStatus(angular.extend([],data.multilevel_badges[0]));
                                scope.$digest();
                            });
                        });
                        userService.loadHistory().then(function (history) {
                            scope.history = history;
                            scope.$digest();
                        });
                    }

                    update();
                    sp.on('actions.perform.success', function (data) {
                        setTimeout(function(){
                            update();
                        }, 2000);
                    });
                    sp.on('tags.add.success', function (data) {
                        setTimeout(function(){
                            update();
                        }, 2000);
                    });
                }
            }

        }]);

    document.createElement('profile-cmp');
    var elems = document.querySelectorAll('profile-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['mario.directives.profile']);
    }

}(window.angular, window.SAILPLAY, window.$));