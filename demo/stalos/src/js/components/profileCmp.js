(function (angular, sp, jQuery) {

  angular.module('stalos.directives.profile', ['stalos.services.users', 'stalos.tools.pagination', 'stalos.services.statuses'])

    .directive('profileCmp', ['userService', 'statusService', function (userService, statusService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <!-- popup -->\n    <div class="hist-popup js-history-popup" data-ng-if="user && history" style="display: none;">\n        <div class="hist-popup__close js-close-popup"><img src="image/close-cross.png" alt=""></div>\n        <div class="hist-popup__header">\n            <div class="hist-popup__head">История</div>\n            <div class="hist-popup__title">\n                {{ history.length ? \'Здесь отображается история покупок, количество накопленных баллов, а так же полученные вами подарки\' : \'История пуста\' }}\n            </div>\n        </div>\n        <div class="hist-popup__body">\n            <div class="hist-popup__filters">\n                <span>Показать: </span>\n                <div class="hist-popup__filters-item" data-ng-class="{ \'this-active\' : histType == \'week\' }">\n                    <span data-ng-click="historyFilter(\'week\')">за неделю</span>\n                </div>\n                <div class="hist-popup__filters-item" data-ng-class="{ \'this-active\' : histType == \'month\' }">\n                    <span data-ng-click="historyFilter(\'month\')">за месяц</span>\n                </div>\n                <div class="hist-popup__filters-item" data-ng-class="{ \'this-active\' : !histType || histType == \'all\' }">\n                    <span data-ng-click="historyFilter(\'all\')">все</span>\n                </div>\n            </div>\n            <span class="hist-popup__filters_empty" \n                  data-ng-if="history_data && !history_data.length && histType">\n                За выбранный промежуток история отсутствует\n            </span>\n            <div class="hist-list">\n    \n                <div class="hist-item js-hist-more" data-ng-repeat="item in history_data">\n                    <div class="hist-item__right">\n                        <div class="hist-item__points" style="margin-top: 22px;">{{ show_points(item.points_delta) }}\n                        </div>\n                        <!--<div class="hist-item__points-dec">- 50 баллов</div>-->\n                    </div>\n                    <div class="hist-item__date">{{ history_date_format(item.action_date) }}</div>\n                    <!--<div class="hist-item__name">{{ get_history_name(item) }}</div>-->\n                    <div class="hist-item__info">{{ get_history_name(item) }}</div>\n                </div>\n                <!-- /item -->\n\n            </div>\n            <!-- /hist-list -->\n\n            <tools-pagination data-ng-if="history_data"\n                              data-page="page"\n                              data-items="history.length"\n                              data-per-page="per_page"\n                              data-on_change="change_page"></tools-pagination>\n\n        </div>\n    </div>\n    <!-- /popups -->\n\n\n    <section class="l-section-wrap person-section-wrap" data-ng-if="user">\n        <div class="l-centered person-sec">\n\n            <div class="person-sec__left">\n                <div class="person-card" data-ng-class="{ rotated : rotated}">\n                    <div class="person-card__photo-wrap">\n                        <div class="person-card__photo" style=\'background-image: url({{ user.user.pic }});\'></div>\n                    </div>\n                    <div class="person-card__content">\n                        <div class="person-card__text" data-ng-if="user.user.first_name">\n                            <span class="person-card__name">{{ user.user.first_name }},</span> здравствуйте\n                        </div>\n                        <div class="person-card__text" data-ng-if="!user.user.first_name">\n                            Вы прекрасны, здравствуйте\n                        </div>\n                        <a href="#" class="person-card__btn js-open-status-descr"\n                           data-ng-click="toggleStatuses();$event.preventDefault();">Подробнее</a>\n                    </div>\n\n                    <div class="person-card__status" data-ng-if="last">\n                        <img data-ng-src="{{ last.thumbs.url_250x250 }}" alt="{{ last.name }}">\n                    </div>\n                </div>\n                <!-- /card -->\n            </div>\n            <!-- /left -->\n\n            <div class="person-sec__right">\n                <div class="person-bonus__head">Ваши бонусы</div>\n                <div class="person-bonus__title">Вы можете потратить их на подарки или оплату товаров</div>\n                <div class="person-bonus-count">\n                    <div class="person-bonus-count__num">\n                        {{ user.user_points.confirmed }}\n                        <div class="person-bonus-count__dec">+{{ user.user_points.unconfirmed }}</div>\n                    </div>\n                    <div class="person-bonus-count__title">\n                        Бонусных <br>баллов\n                    </div>\n                    <a href="#" class="person-bonus-count__btn js-hist-trigger"\n                       data-ng-click="show_history();$event.preventDefault();">История начислений</a>\n                </div>\n            </div>\n            <!-- /right -->\n\n        </div>\n\n        <section class="l-section-wrap person-section-wrap person-section-wrap-full" style="display: none;">\n            <div class="l-centered status-view-sec">\n                <div class="status-view-sec__card-wrap">\n                    <div class="person-card"  data-ng-class="{ rotated : rotated}">\n                        <div class="person-card__photo-wrap">\n                            <div class="person-card__photo" style=\'background-image: url({{ user.user.pic }});\'></div>\n                        </div>\n                        <div class="person-card__content">\n                            <div class="person-card__text" data-ng-if="user.user.first_name">\n                                <span class="person-card__name">{{ user.user.first_name }},</span> здравствуйте\n                            </div>\n                            <div class="person-card__text" data-ng-if="!user.user.first_name">\n                                здравствуйте\n                            </div>\n                            <a href="#" class="person-card__btn js-open-status-descr"\n                               data-ng-click="toggleStatuses();$event.preventDefault();">Закрыть</a>\n                        </div>\n                        <div class="person-card__status" data-ng-if="last">\n                            <img data-ng-src="{{ last.thumbs.url_250x250 }}" alt="{{ last.name }}">\n                        </div>\n                    </div>\n                    <!-- /card -->\n                </div>\n                <!-- /card wrap -->\n                <div class="status-view-sec__body">\n                    <div class="status-view-sec__head">Виды бонусных карт</div>\n                    <div class="status-view-sec__caption">В бонусной программе существует три статуса Карт, выдаваемых\n                        участнику бонусной программы:\n                    </div>\n                    <div class="status-view-sec__body-row">\n                        <div class="status-view-sec__body-left">\n\n                            <div class="status-descr__row status-descr__head">\n                                <div class="status-descr__left">Вид карты</div>\n                                <div class="status-descr__right">Сумма накоплений</div>\n                            </div>\n\n                            <div class="status-descr__row">\n                                <div class="status-descr__left">\n                                    <div class="status-descr__dotted"><span\n                                            class="status-descr__dotted-inner">Базовая</span></div>\n                                </div>\n                                <div class="status-descr__right">500 – 45000 р.</div>\n                            </div>\n                            <div class="status-descr__row">\n                                <div class="status-descr__left">\n                                    <div class="status-descr__dotted"><span class="status-descr__dotted-inner">Улучшенная</span>\n                                    </div>\n                                </div>\n                                <div class="status-descr__right">45001 – 100000 р.</div>\n                            </div>\n                            <div class="status-descr__row">\n                                <div class="status-descr__left">\n                                    <div class="status-descr__dotted"><span\n                                            class="status-descr__dotted-inner">Премиум</span></div>\n                                </div>\n                                <div class="status-descr__right">более 100000 р.</div>\n                            </div>\n\n                        </div>\n                        <!-- /left -->\n                        <div class="status-view-sec__body-right">\n                            Накопленная сумма покупок - сумма покупок, совершённых участником бонусной программы с\n                            применением Карты, и оплаченная из собственных средств клиента (стоимость покупки,\n                            оплаченная бонусами, не учитывается в сумме накопленных покупок).\n                        </div>\n                        <!-- right -->\n                    </div>\n                    <!-- /row -->\n\n                </div>\n                <!-- body -->\n            </div>\n            <!-- /l section -->\n        </section>\n\n\n    </section>\n\n</div>',
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
              modalClose: true,
              modalColor: '#222',
              opacity: 0.8,
              onOpen: function () {
                scope.change_page();
              },
              onClose: function () {
                scope.histType = null;
                scope.page = 1;
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
            if (scope.histType) {
              scope.history_data = scope.history.filter(function (item) {
                return userService.lessDate(item.action_date, scope.histType);
              }).slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
            } else {
              scope.history_data = scope.history.slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
            }
          };
          scope.toggleStatuses = function () {
            scope.rotated = !scope.rotated;
            jQuery('.person-section-wrap-full').fadeToggle();
          };
          scope.historyFilter = function (type) {
            scope.histType = type == 'all' ? null : type;
            scope.change_page(1);
          };
          function update() {
            userService.loadInfo().then(function (user) {
              scope.user = user;
              scope.$digest();
              statusService.loadList().then(function (data) {
                scope.statuses = angular.extend([], data.multilevel_badges[0]);
                scope.last = statusService.getLastStatus(angular.extend([], data.multilevel_badges[0]));
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