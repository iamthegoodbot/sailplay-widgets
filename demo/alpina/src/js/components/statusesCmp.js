(function (angular, sp, jQuery) {

    angular.module('alpina.directives.statuses', ['alpina.services.users', 'alpina.services.statuses', 'alpina.directives.gifts'])

        .directive('statusesCmp', ['userService', 'statusService', function (userService, statusService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    <section class="container std-section">\n        <div class="row">\n            <gifts-cmp></gifts-cmp>\n            <!-- /col -->\n            <div class="col-xs-12 col-md-4 common-invert-col">\n                <div class="status-cell common-shaded-cell">\n                    <div class="status-cell__head">Ваш статус</div>\n                    <div class="status-cell__title">Который дает вам привилегии</div>\n                    <div class="status-item">\n                        <div class="status-item__img">\n                            <img data-ng-src="{{ showImage(last) }}"  alt="" class="img-soft-response">\n                        </div>\n                        <div class="status-item__name" data-ng-bind="last.name"></div>\n                        <div class="status-item__capt" data-ng-bind="last.descr"></div>\n                    </div>\n                    <div class="common-btn status-cell__btn js-show-all-status"\n                         data-ng-if="statuses"\n                         data-ng-click="open()">Список статусов\n                    </div>\n                </div>\n                <!-- /cell -->\n            </div>\n            <!-- /col -->\n            <div class="col-xs-12 col-md-12 all-status-cell__wrap" \n                 data-ng-class="{ active : show_all_statuses, right: show_all_statuses_out  }">\n            <div class="all-status-cell common-shaded-cell">\n                    <div class="all-status-cell__head">Ваш статус</div>\n                    <div class="all-status-cell__capt">Который дает вам привилегии</div>\n                    <div class="row all-status-cell__row">\n                        \n                        <div class="col-xs-12 col-md-4" data-ng-repeat="item in statuses">\n                            <div class="status-item">\n                                <div class="status-item__img">\n                                    <img data-ng-src="{{ showImage(item) }}" alt="" class="img-soft-response">\n                                </div>\n                                <div class="status-item__name" data-ng-bind="item.name"></div>\n                                <div class="status-item__capt" data-ng-bind="item.descr"></div>\n                            </div>\n                        </div>\n    \n                        \n                    </div>\n                    <!-- /row -->\n                    <div class="all-status-cell__btn common-btn js-close-all-status"\n                         data-ng-click="close()">Закрыть список\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <!-- /row -->\n    </section>\n    <!-- /container -->\n\n</div>',
                scope: true,
                link: function (scope) {
                    scope.show_all_statuses = false;
                    scope.statuses = null;
                    scope.last = null;
                    function update() {
                        statusService.loadList().then(function (data) {
                            if (data.multilevel_badges && data.multilevel_badges[0] && data.multilevel_badges[0].length) {
                                scope.statuses = data.multilevel_badges[0];
                                scope.last = statusService.getLastStatus(scope.statuses);
                            }
                            scope.$digest();
                        });
                    }

                    var timeout;
                    scope.close = function () {
                        if (timeout) {
                            clearTimeout(timeout);
                        }
                        scope.show_all_statuses_out = true;
                        timeout = setTimeout(function () {
                            scope.show_all_statuses_out = false;
                            scope.show_all_statuses = false;
                            scope.$digest();
                        }, 400);
                    };
                    scope.open = function () {
                        scope.show_all_statuses = false;
                        scope.show_all_statuses_out = false;
                        if (timeout) {
                            clearTimeout(timeout);
                        }
                        setTimeout(function(){
                            scope.show_all_statuses = false;
                            scope.show_all_statuses_out = false;
                            scope.show_all_statuses = true;
                            scope.$digest();
                        },10);

                    };
                    scope.showImage = function (status) {
                        if (!status) return;
                        var imgs = statusService.getImages(status.id);
                        return status.is_received ? imgs.active : imgs.origin;
                    };
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

    document.createElement('statuses-cmp');
    var elems = document.querySelectorAll('statuses-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['alpina.directives.statuses']);
    }

}(window.angular, window.SAILPLAY, window.$));