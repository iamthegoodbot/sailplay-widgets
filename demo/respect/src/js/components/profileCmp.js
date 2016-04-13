(function (angular, sp, jQuery) {

  angular.module('respect.directives.profile', ['respect.services.users', 'respect.tools.pagination', 'respect.services.statuses'])

    .directive('profileCmp', ['userService', 'statusService', function (userService, statusService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <section class="l-centered personal-sec" data-ng-if="user && history">\n        <div class="personal-sec__left">\n            <div class="person-cell">\n\n\n                <div class="common-photo person-cell__photo" data-ng-if="last">\n                    <img src="image/frame-img-1-1.png" alt="" class="img-response">\n                    <div class="common-photo__framing this-status-{{ getNumOfStatus(last) }}">\n                        <!--<img data-ng-src="image/status-0{{ getNumOfStatus(last) }}.png" alt="" class="img-response">-->\n                        <img data-ng-src="{{ last.thumbs.url_250x250 }}" alt="" class="img-response">\n                    </div>\n                    <div class="common-photo__person" style="background-image: url({{ user.user.pic }});"></div>\n                </div>\n\n\n                <div class="person-cell__name" data-ng-bind="user.user.name"></div>\n                <div class="person-cell__title">Ваш статус: {{ last.name }}</div>\n                <div class="common-btn common-btn_white js-open-all-status"\n                     data-ng-click="toggleStatuses()">Список статусов\n                </div>\n            </div>\n            <!-- /person-cell -->\n        </div>\n        <!-- /left -->\n        <div class="personal-sec__right">\n            <div class="bonus-points-cell">\n                <div class="bonus-points-cell__left">\n\n                    <div class="status-info-counter">\n                        <span class="status-info-counter__val">{{ user.user_points.confirmed }}</span>\n                        <div class="status-info-counter__remain">\n                            +{{ user.user_points.unconfirmed }}\n                            <div class="status-info-counter__popup">\n                                Неподтвержденные бонусы будут начислены через 14 дней после покупки товара\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class="bonus-points-cell__title">бонусов</div>\n                    <div class="bonus-points-cell__text">\n                        <!-- 10% от суммы покупок конвертируются в баллы -->\n                        <a href="history.html" class="common-btn">Вся история</a>\n                    </div>\n                </div>\n                <!-- bonus-points-cell__left -->\n                <div class="bonus-points-cell__right">\n\n                    <div data-ng-if="!history.length" class="bonus-points-list__empty">История пуста =(</div>\n\n                    <div data-ng-if="history.length" class="bonus-points-list">\n\n                        <div class="bonus-points-list__item" data-ng-repeat="item in history_data">\n                            <div class="bonus-points-list__date">{{ history_date_format(item.action_date) }}</div>\n                            <div class="bonus-points-list__dec"\n                                 data-ng-class="{not_completed: !item.is_completed}">{{ show_points(item.points_delta)\n                                }}\n                            </div>\n                            <div class="bonus-points-list__text">{{ get_history_name(item) }}</div>\n                        </div>\n                        <!-- /item -->\n\n                    </div>\n                    <!-- /bonus-points-list -->\n\n                    <tools-pagination data-ng-if="history_data"\n                                      data-page="page"\n                                      data-items="history.length"\n                                      data-per-page="per_page"\n                                      data-on_change="change_page"></tools-pagination>\n\n                </div>\n                <!-- /bonus-points-cell__right -->\n            </div>\n            <!-- /bonus-points-cell -->\n        </div>\n        <!-- /right -->\n        <section class="l-section all-status-sec js-all-status" data-ng-if="user" style="display: none;">\n\n            <div class="popup-info__close js-close-popup" style="right: 20px;top: 20px;"><img src="image/close-cross2.png" alt=""\n                                                                                              data-ng-click="toggleStatuses()"></div>\n            <div class="all-status-sec__col" data-ng-repeat="status in statuses">\n                <div class="all-status-item">\n                    <div class="common-photo all-status-item__photo">\n                        <img src="image/frame-img-1-1.png" alt="" class="img-response">\n                        <div class="common-photo__framing this-status-1">\n                            <img data-ng-src="{{ status.thumbs.url_250x250 }}" alt="" class="img-response">\n                        </div>\n                        <div class="common-photo__person" style="background-image: url({{ user.user.pic }});"></div>\n                    </div>\n                    <div class="all-status-item__head" data-ng-bind="status.name"></div>\n                    <div class="all-status-item__descr" data-ng-bind="status.descr"></div>\n                    <div class="all-status-item__note" data-ng-if="last && last.id == status.id">Ваш статус</div>\n                    <div class="all-status-item__note" data-ng-if="next && next.id == status.id">Еще {{ offsetToNextStatus }} рублей</div>\n                </div>\n                <!-- /item -->\n            </div>\n            <!-- /col -->\n        </section>\n    </section>\n\n    <section class="l-centered bonus-progress-sec" data-ng-if="next">\n        <div class="bonus-progress-sec__left">\n            Осталось до статуса "{{ next.name }}"<br> <span class="bonus-progress-sec__val">{{ offsetToNextStatus }} рублей</span>\n        </div>\n        <div class="bonus-progress-sec__right">\n\n            <div class="progress-bar__wrap">\n                <div class="progress-bar" data-ng-style="{ \'width\' : offsetToNextStatusInPercents + \'%\' }"></div>\n\n                <div class="common-photo progress-bar__photo">\n                    <img src="image/frame-img-1-1.png" alt="" class="img-response">\n                    <div class="common-photo__framing this-status-{{ getNumOfStatus(next) }}">\n                        <!--<img data-ng-src="image/status-0{{ getNumOfStatus(next) }}.png" alt="" class="img-response">-->\n                        <img data-ng-src="{{ next.thumbs.url_250x250 }}" alt="" class="img-response">\n                    </div>\n                    <div class="common-photo__person" style="background-image: url({{ user.user.pic }});"></div>\n                </div>\n\n\n            </div>\n\n\n        </div>\n    </section>\n\n</div>',
        scope: true,
        link: function (scope) {
          scope.user = null;
          scope.history = null;
          scope.getNumOfStatus = statusService.getNumOfStatus;
          scope.history_date_format = userService.historyDateFormat;
          scope.get_history_name = userService.getHistoryActionName;
          scope.show_points = userService.show_history_points;
          scope.per_page = 4;
          scope.change_page = function (page) {
            scope.page = +page || 1;
            scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
          };
          scope.toggleStatuses = function () {
            jQuery('.js-all-status').slideToggle(300);
          };
          function update() {
            userService.loadInfo().then(function (user) {
              scope.user = user;
              scope.$digest();
              statusService.loadList().then(function (data) {
                scope.statuses = angular.extend([], data.multilevel_badges[0]);
                scope.last = statusService.getLastStatus(angular.extend([], data.multilevel_badges[0]));
                scope.next = statusService.getNextStatus(angular.extend([], data.multilevel_badges[0]));
                scope.offsetToNextStatusInPercents = statusService.offsetToNextStatusInPercents(scope.user.purchases.sum);
                scope.offsetToNextStatus = statusService.getOffsetToNextStatus(scope.user.purchases.sum);
                scope.$digest();
              });
            });
            userService.loadHistory().then(function (history) {
              scope.history = history;
              scope.change_page(1);
              scope.$digest();
            });
          }

          update();
          sp.on('actions.perform.success', function (data) {
            setTimeout(function () {
              update();
            }, 2000);
          });
          sp.on('tags.add.success', function (data) {
            setTimeout(function () {
              update();
            }, 2000);
          });
          sp.on('gift.purchase.success', function (res) {
            setTimeout(function () {
              update();
            }, 2000);
          });
        }
      }

    }]);

  document.createElement('profile-cmp');
  var elems = document.querySelectorAll('profile-cmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['stalos.directives.profile']);
  }

}(window.angular, window.SAILPLAY, window.$));