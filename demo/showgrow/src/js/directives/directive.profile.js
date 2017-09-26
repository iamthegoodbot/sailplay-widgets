(function () {

  angular.module('sg.directives.profile', [])

    .run(function ($templateCache) {
      $templateCache.put('profile-default-d.html', `
        <section class="sp_l-centered sp_person-sec" data-ng-show="user">

            <div class="sp_person-block sp_person-sec__left">
                <div class="sp_person-block__photo" style="background-image: url({{ user().user.pic }});"></div>

                <div class="sp_person-block__info">

                    <div class="sp_person-block__name">Hello {{ user().user.first_name }} <span class="sp_widget sp_info-counter__hist" data-ng-click=\
                            "logout()">(Logout)</span></div>
                    <div class="sp_person-block__param" data-ng-if="current && current.name"> Your status: <span class="sp_person-block__param-val" data-ng-bind="current.name"></span>
                    </div>
                    <!--<div class="sp_person-block__note">Your current status expires on 10.09.2016 (60 days left)</div>--></div>
            </div>
            <!-- /sp_person-block -->
            <div class="sp_info-counter sp_person-sec__right">

                <div class="sp_info-counter__count">
                    <span class="sp_info-counter__count-val" data-ng-bind="user().user_points.confirmed"></span>
                    <div class="sp_info-counter__remain" data-ng-show=\ 'user().user_points.unconfirmed\'>
                        +{{ user().user_points.unconfirmed }}
                        <div class="sp_info-counter__remain-popup"> Unconfirmed points that will be confirmed after the payment </div>

                    </div>

                </div>

                <div class="sp_info-counter__text">

                    <div class="sp_info-counter__title">ShowPoints</div>

                    <div class="sp_info-counter__hist js-hist-popup js-open-history-popup" data-ng-click="show_history();">View history</div>

                </div>

                <div class="sp_info-counter__count-title" data-ng-show="offset">{{ offset }} ShowPoints</div>

                <div class="sp_info-counter__count-text" data-ng-show="next">to the {{ next.name }} status</div>

            </div>
            <!-- /sp_info-counter -->
        </section>
        <!-- /sp_person-sec -->
        <section class="sp_l-section sp_progress-bar-sec">

            <div class="sp_progress-bar js-status-bar-wrap">

                <div class="sp_progress-bar__point this-point-1 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_1"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__point this-point-2 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_2"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__point this-point-3 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_3"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__point this-point-4 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_4"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__inner js-bar" data-progress="34"></div>

            </div>

        </section>
        <!-- popups -->
        <div class="sp_history-popup js-history-popup" style="display: none;">
            <div class="sp_history-popup__close js-close-popup"></div>

            <div class="sp_common-popup-head-wr">

                <div class="sp_common-popup-head">History</div>

                <div class="sp_history-popup__title"> {{ history_data.length ? \'History of transactions\' : \'History is empty\' }}</div>

            </div>

            <div class="sp_common-popup-body">

                <div class="sp_history-popup__list">

                    <div class="sp_history-popup__item" data-ng-repeat="item in history_data">
                        <div class="sp_history-popup__item-date" data-ng-bind="toDateObj(item.action_date) | date:\'medium\'"></div>
                        <div class="sp_history-popup__item-points" data-ng-class="{ \'this-dec\' : item.points_delta < 0 }" data-ng-bind=\
                            "item.points_delta ? item.points_delta + \' ShowPoints\' : \'\'">
                        </div>

                        <div class="sp_history-popup__item-name" data-ng-bind="get_history_name(item)"></div>

                    </div>
                </div>
                <tools-pagination data-ng-if="history_data" data-page="page" data-items="history().length" data-per-page=\
                    "per_page" data-on_change="change_page"></tools-pagination>
                <!-- /list -->
                <div class="sp_common-btn sp_history-popup__btn js-close-popup">Back</div>
            </div>
            <!-- /popup__body -->
        </div>
      `);

      $templateCache.put('profile-new-d.html', `
        <section class="sp_l-centered sp_person-sec v2" data-ng-show="user">

            <div class="sp_person-block sp_person-sec__left">
                <div class="sp_person-block__info">

                    <div class="sp_person-block__name">{{ user().user.first_name }}<br><span class="sp_widget sp_info-counter__hist" data-ng-click=\
                            "logout()">(Logout)</span></div>

                    <!--<div class="sp_person-block__note">Your current status expires on 10.09.2016 (60 days left)</div>--></div>
            </div>
        </section>
        <div class="sp_info-counter v2">

            <div class="sp_info-counter__count">
                <span class="sp_info-counter__count-val" data-ng-bind="user().user_points.confirmed"></span>
            </div>
        </div>
        <section class="sp_text_block v2">
            <div class="sp_person-block__param" data-ng-if="current && current.name"> YOUR STATUS: <span class="sp_person-block__param-val" data-ng-bind="current.name"></span></div>
            <div class="sp_person-block__param"> MEMBER SINCE: <span class="sp_person-block__param-val" data-ng-bind="format_since(user().user.register_date)"></span></div>
            <div class="sp_person-block__param"> BADGES EARNED: <span class="sp_person-block__param-val" data-ng-bind="badges_earned"></span></div>
            <div class="sp_person-block__param" data-ng-if="offset > 0"> NEXT RANK IN: <span class="sp_person-block__param-val" data-ng-bind="offset"></span></div>
        </section>
        <!-- /sp_person-sec -->
        <section class="sp_l-section sp_progress-bar-sec v2">

            <div class="sp_progress-bar js-status-bar-wrap">

                <div class="sp_progress-bar__point this-point-1 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_1"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__point this-point-2 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_2"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__point this-point-3 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_3"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__point this-point-4 js-point">
                    <div class="sp_progress-bar__point-label">
                        <div class="sp_progress-bar__point-label_image img_type_4"></div>
                    </div>
                </div>

                <div class="sp_progress-bar__inner js-bar" data-progress="34"></div>

            </div>

        </section>
        <!-- popups -->
        <div class="sp_history-popup js-history-popup" style="display: none;">
            <div class="sp_history-popup__close js-close-popup"></div>

            <div class="sp_common-popup-head-wr">

                <div class="sp_common-popup-head">History</div>

                <div class="sp_history-popup__title"> {{ history_data.length ? \'History of transactions\' : \'History is empty\' }}</div>

            </div>

            <div class="sp_common-popup-body">

                <div class="sp_history-popup__list">

                    <div class="sp_history-popup__item" data-ng-repeat="item in history_data">
                        <div class="sp_history-popup__item-date" data-ng-bind="toDateObj(item.action_date) | date:\'medium\'"></div>
                        <div class="sp_history-popup__item-points" data-ng-class="{ \'this-dec\' : item.points_delta < 0 }" data-ng-bind=\
                            "item.points_delta ? item.points_delta + \' ShowPoints\' : \'\'">
                        </div>

                        <div class="sp_history-popup__item-name" data-ng-bind="get_history_name(item)"></div>

                    </div>
                </div>
                <tools-pagination data-ng-if="history_data" data-page="page" data-items="history().length" data-per-page=\
                    "per_page" data-on_change="change_page"></tools-pagination>
                <!-- /list -->
                <div class="sp_common-btn sp_history-popup__btn js-close-popup">Back</div>
            </div>
            <!-- /popup__body -->
        </div>
      `);
    })

    .directive('profileD', function (api, sp, userS, badgeS, $window, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        template: '<div ng-include="get_content_url()"></div>',
        scope: true,
        link: function (scope, el, attrs) {
          scope.get_content_url = function () {
            return 'profile-' + (attrs['template'] || 'default') + '-d.html'
          };

          scope.format_since = function(date) {
            var months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ]

            var d = new Date(date);
            var result = months[d.getMonth()]

            return (result + ' ' + d.getDate()).toUpperCase();
          }
          
          scope.user = api.data('user.info');
          scope.history = api.data('user.history');
          scope.history_data = null;
          scope.get_history_name = userS.getHistoryActionName;
          scope.toDateObj = userS.toDateObj;
          scope.per_page = 5;
          var badges = api.data('badges.list')() && api.data('badges.list')().multilevel_badges && api.data('badges.list')().multilevel_badges[0] || [];
          var one_level_badges = api.data('badges.list')() && api.data('badges.list')().one_level_badges && api.data('badges.list')().one_level_badges || [];
          
          console.log(one_level_badges)
          scope.badges_earned = (one_level_badges.filter(function(b){
            return b.is_received == true
          })).length

          scope.current = badgeS.status.current(badges);
          scope.next = badgeS.status.next(badges);
          scope.offset = badgeS.status.getOffset(scope.user().user_points.confirmed + scope.user().user_points.spent);

          $timeout(function () {
            $('.js-status-bar-wrap').each(function () {
              var bar = $(this).find('.js-bar');
              var points = $(this).find('.js-point');
              //var width = Math.ceil((100 / 3) * (badgeS.status.count_percents(badges) - 1)) || 0;
              var width = badgeS.status.count_percents(scope.user().user_points.confirmed + scope.user().user_points.spent) || 0;
              width = width > 100 ? 100 : width < 0 ? 0 : width;

              setTimeout(function () {

                bar.css('width', width + '%');

                var activePoints;
                if (width >= 99.99) {
                  activePoints = points;
                }
                else if (width >= 66.666) {
                  activePoints = points.filter('.this-point-1, .this-point-2, .this-point-3');
                }
                else if (width >= 33.333) {
                  activePoints = points.filter('.this-point-1, .this-point-2');
                }
                else if (width >= 0) {
                  activePoints = points.filter('.this-point-1');
                }
                var step = 1500 / activePoints.length;
                activePoints.each(function (index) {
                  var _this = $(this);
                  setTimeout(function () {
                    _this.addClass('this-active');
                  }, index * step);
                });
                points.each(function (index) {
                  var _this = $(this);
                  setTimeout(function () {
                    _this.addClass('this-animated');
                  }, index * 350);
                });
              }, 150);

            });
          });
          scope.show_history = function () {
            // open history popup
            $('.js-history-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'absolute',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#000000',
              opacity: 0.5,
              onOpen: function () {
                scope.change_page();
              },
              onClose: function () {
                scope.history_data = [];
                scope.$digest();
              }
            });
          };

          scope.logout = function () {
            api.user.logout().then(function () {
              $window.location.reload();
            });
          };
          scope.change_page = function (page) {
            scope.page = +page || 1;
            scope.history_data = scope.history().slice((scope.page - 1) * scope.per_page, (scope.page - 1) * scope.per_page + scope.per_page);
          };
          function update() {
            api.badges.list().then(function () {
              api.user.info().then(function () {
                api.user.history();
              });
            });
          }

          sp.on('gift.purchase.force_complete.success', function (res) {
            update();
          });
          sp.on('gifts.purchase.success', function (res) {
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

    });

}());