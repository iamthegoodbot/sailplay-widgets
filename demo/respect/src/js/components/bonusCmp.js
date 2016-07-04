(function (angular, sp, jQuery) {

  angular.module('respect.directives.bonus', [])

    .directive('bonusCmp', function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <section class="l-section bonus-top-sec">\n        <div class="bonus-top-sec__left">\n            <div class="common-cell-head">Бонусная программа</div>\n            <div class="common-cell-title">\n                Совершайте покупки, выполняйте задания, копите бонусы и получайте скидки при покупке\n            </div>\n        </div>\n        <div class="bonus-top-sec__right">\n            <div class="common-btn bonus-top-sec__btn js-open-info-popup"\n                 data-ng-click="open()">Подробнее\n            </div>\n        </div>\n    </section>\n\n    <div class="js-rules-popup" style="display: none">\n      <div>\n          <div class="popup-info__close js-close-popup" style="top: 10px;"><img src="image/close-cross2.png" alt=""></div>\n          <img src="image/rules.jpg" alt="Rules" style="width: 600px;">\n      </div>\n    </div>\n\n    <div class="popup-info js-info-popup" style="display: none;">\n        <div class="popup-info__close js-close-popup"><img src="image/close-cross2.png" alt=""></div>\n        <div class="popup-info-tabs">\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig this-active" data-tab="1">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-01.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">Как стать участником программы</div>\n                </div>\n            </div>\n            <!-- /col -->\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig" data-tab="2">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-02.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">За что можно получить бонусы</div>\n                </div>\n            </div>\n            <!-- /col -->\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig" data-tab="3">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-03.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">Условия начисления и использования бонусов</div>\n                </div>\n            </div>\n            <!-- /col -->\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig" data-tab="4">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-04.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">Преимущества участника программы</div>\n                </div>\n            </div>\n            <!-- /col -->\n        </div>\n        <!-- /tabs row -->\n        <div class="popup-info-body">\n            <div class="js-info-tabs-content js-tab-1">\n\n                <div class="popup-info-body__head">Как стать участником программы</div>\n                <strong>Есть карта Respect?</strong>\n                <ul>\n                    <li style="margin-bottom: 0;">Приходите в ближайший салон Respect и активируйте свой Бонусный счет\n                    </li>\n                    <li>Получите приветственные бонусы на первую покупку!</li>\n                </ul>\n\n                <strong>Нет карты Respect?</strong>\n                <ul>\n                    <li style="margin-bottom: 0;">Получите бонусную карту на кассе при покупке</li>\n                    или\n                    <li>Зарегистрируйтесь в личном кабинете на сайте</li>\n                </ul>\n                <p>И начните делать выгодные покупки с Respect!<br>\n                    Карта не является именной, вы можете передавать ее друзьям и знакомым и получать выгоду вместе!</p>\n\n                <strong>Преимущества участника программы</strong>\n\n                <p>Скидка до 20% от стоимости покупки при оплате бонусами</p>\n\n                <strong>Вы сможете:</strong>\n                <ul>\n                    <li>Получать первым актуальную информацию по специальным предложениям, скидкам и акциям</li>\n                    <li>Участвовать в специальных акциях и получать эксклюзивные предложения только для владельцев\n                        Бонусных карт\n                    </li>\n                    <li>Проверять баланс бонусного счета в личном кабинете на сайте</li>\n                    <li>Восстановить карту и все накопления в случае утери по номеру мобильного телефона</li>\n                </ul>\n\n            </div>\n            <!-- /tab content -->\n            <div class="js-info-tabs-content js-tab-2" style="display: none;">\n\n                <div class="popup-info-body__head">За что можно получить бонусы</div>\n                <ul>\n                    <li>\n                        Совершайте покупки в розничных салонах и интернет-магазине Respect и получайте бонусы\n                    </li>\n                    <li>\n                        Получайте бонусы по специальным предложениям, в честь вашего дня рождения или праздника\n                    </li>\n                    <li>\n                        Получайте еще больше бонусов за активность: проходите опросы на сайте, заполняйте профиль в\n                        личном кабинете, рассказывайте о нас в социальных сетях и многое другое\n                    </li>\n                </ul>\n\n            </div>\n            <!-- /tab content -->\n            <div class="js-info-tabs-content js-tab-3" style="display: none;">\n\n                <div class="popup-info-body__head">Как начисляются бонусы</div>\n\n                <strong>Всем владельцам дисконтных карт:</strong>\n                <ul>\n                    <li>Приветственные бонусы на первую покупку в размере текущей скидки по ДК, <br> которые можно потратить сразу</li>\n                    <li>10% от суммы первой и последующих покупок</li>\n                </ul>\n                \n                <strong>Всем клиентам, ранее не имевшим дисконтной карты:</strong>\n                <ul>\n                    <li>5% от суммы первой покупки</li>\n                    <li>10% от суммы последующих покупок</li>\n                </ul>\n                \n                <strong>Выгода от покупки на 5000 руб. – 500 бонусных рублей!</strong>\n                <ul>\n                    <li>Бонусы начисляются за покупку любого товара и даже в дни распродаж</li>\n                    <li>Начисление происходит сразу же после совершения покупки</li>\n                </ul>\n                \n                <div class="popup-info-body__head">Как можно потратить бонусы</div>\n                \n                <ul>\n                    <li>\n                        1 бонус = 1 рубль.\n                    </li>\n                </ul>\n\n            </div>\n            <!-- /tab content -->\n            <div class="js-info-tabs-content js-tab-4" style="display: none;">\n\n\n            </div>\n            <!-- /tab content -->\n        </div>\n        <!-- /popup-info-body -->\n    </div>\n\n\n</div>',
        scope: true,
        link: function (scope, el, attr) {
          scope.open = function () {
            //jQuery('.js-info-popup').bPopup({
            //  speed: 450,
            //  transition: 'fadeIn',
            //  closeClass: 'js-close-popup',
            //  positionStyle: 'absolute',
            //  follow: [true, false],
            //  modal: true,
            //  modalClose: true,
            //  modalColor: '#222',
            //  opacity: 0.8
            //});

            jQuery('.js-rules-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              positionStyle: 'absolute',
              closeClass: 'js-close-popup',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#222',
              opacity: 0.8
            });


          };
          var tabsTriggers = jQuery(el).find('.js-info-tabs-trig');
          var tabsBody = jQuery(el).find('.js-info-tabs-content');
          tabsTriggers.click(function () {
            var _this = jQuery(this);
            if (!_this.hasClass('this-active')) {
              tabsTriggers.removeClass('this-active');
              _this.addClass('this-active');
              tabsBody.hide().filter('.js-tab-' + _this.data('tab')).fadeIn(300);
            }
          });

        }
      }

    });

}(window.angular, window.SAILPLAY, window.$));