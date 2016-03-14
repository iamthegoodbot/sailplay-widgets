(function (angular, sp, jQuery) {

  angular.module('respect.directives.bonus', [])

    .directive('bonusCmp', function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <section class="l-section bonus-top-sec">\n        <div class="bonus-top-sec__left">\n            <div class="common-cell-head">Бонусная программа</div>\n            <div class="common-cell-title">Совершайте покупки, выполняйте задания, копите баллы и меняйте их на\n                подарки\n            </div>\n        </div>\n        <div class="bonus-top-sec__right">\n            <div class="common-btn bonus-top-sec__btn js-open-info-popup"\n                 data-ng-click="open()">Подробнее\n            </div>\n        </div>\n    </section>\n\n\n    <div class="popup-info js-info-popup" style="display: none;">\n        <div class="popup-info__close js-close-popup"><img src="image/close-cross2.png" alt=""></div>\n        <div class="popup-info-tabs">\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig this-active" data-tab="1">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-01.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">Как стать участником программы</div>\n                </div>\n            </div>\n            <!-- /col -->\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig" data-tab="2">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-02.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">За что можно получить бонусы</div>\n                </div>\n            </div>\n            <!-- /col -->\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig" data-tab="3">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-03.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">Как начисляются бонусные рубли</div>\n                </div>\n            </div>\n            <!-- /col -->\n            <div class="popup-info-tabs__col">\n                <div class="popup-info-tabs__item js-info-tabs-trig" data-tab="4">\n                    <div class="popup-info-tabs__img">\n                        <img src="image/popup-icon-04.png" alt="">\n                    </div>\n                    <div class="popup-info-tabs__text">Как можно потратить бонусы</div>\n                </div>\n            </div>\n            <!-- /col -->\n        </div>\n        <!-- /tabs row -->\n        <div class="popup-info-body">\n            <div class="js-info-tabs-content js-tab-1">\n                <div class="popup-info-body__head">Как стать участником программы</div>\n                <strong>Есть карта Respect?</strong>\n                <p>Приходите в ближайший салон Respect и активируйте свой Бонусный счет<br>\n                    Получите приветственные бонусы на первую покупку!\n                </p>\n                <strong>Нет карты Respect?</strong>\n                <ul>\n                    <li style="margin-bottom: 0;">Получите бонусную карту на кассе при покупке</li>\n                    или\n                    <li>Зарегистрируйтесь в личном кабинете на сайте</li>\n                </ul>\n                <p>И начните делать выгодные покупки с Respect!<br>\n                    Карта не является именной, вы можете передавать ее друзьям и знакомым и получать выгоду вместе!</p>\n                <strong>Преимущества участника программы</strong>\n                <p>Вы сможете:</p>\n                <ul>\n                    <li>Накапливать бонусные рубли и тратить их на последующие покупки.</li>\n                    <li>\n                        Получать первым актуальную информацию по специальным предложениям, скидкам и акциям.\n                    </li>\n                    <li>\n                        Участвовать в специальных акциях и получать эксклюзивные предложения только для владельцев\n                        Бонусных карт.\n                    </li>\n                    <li>\n                        Проверять баланс бонусного счета в личном кабинете на сайте.\n                    </li>\n                    <li>\n                        Восстановить карту и все накопления в случае утери по номеру мобильного телефона.\n                    </li>\n                </ul>\n            </div>\n            <!-- /tab content -->\n            <div class="js-info-tabs-content js-tab-2" style="display: none;">\n                <div class="popup-info-body__head">За что можно получить бонусы</div>\n                <ul>\n                    <li>\n                        Совершайте покупки в розничных салонах и интернет-магазине Respect и получайте бонусные рубли.\n                    </li>\n                    <li>\n                        Получайте бонусные рубли по специальным предложениям, в честь вашего дня рождения или праздника.\n                    </li>\n                    <li>\n                        Посоветуйте нас друзьям и получайте бонусы за их покупки.\n                    </li>\n                    <li>\n                        Получайте еще больше бонусных рублей за активность: проходите опросы на сайте, заполняйте профиль в личном кабинете, рассказывайте о нас в социальных сетях и многое другое.\n                    </li>\n                </ul>\n            </div>\n            <!-- /tab content -->\n            <div class="js-info-tabs-content js-tab-3" style="display: none;">\n                <div class="popup-info-body__head">Как начисляются бонусные рубли</div>\n\n                <p>Всем новым клиентам 5% от суммы первой покупки и 10% от последующих.</p>\n                <p>Всем старым клиентам 10% от покупок плюс приветственные бонусные рубли на первую покупку в размере скидки по вашей ДК.</p>\n                <p>Выгода от покупки на 5000 руб. – <strong>500</strong> бонусных рублей!</p>\n                <ul>\n                    <li>\n                        Бонусы начисляются за покупку любого товара и даже в дни распродаж\n                    </li>\n                    <li>\n                        Начисление происходит сразу же после совершения покупки\n                    </li>\n                </ul>\n                \n                <strong>Делитесь выгодой с друзьями</strong>\n\n                <p>Ваш друг совершил покупку в Respect по вашей рекомендации? Получите 4% на свой бонусный счет от его покупки!</p>\n\n                <p>Вы и есть тот самый друг? Сообщите на кассе номер телефона рекомендателя и получите 5% на первую покупку!</p>\n\n            </div>\n            <!-- /tab content -->\n            <div class="js-info-tabs-content js-tab-4" style="display: none;">\n                <div class="popup-info-body__head">Как можно потратить бонусы</div>\n                <ul>\n                    <li>\n                        Оплатить 20% от стоимости любой покупки.\n                    </li>\n                    <li>\n                        1 бонус = 1 рубль.\n                    </li>\n                </ul>               \n                <strong>Теперь начислять и списывать бонусы стало еще удобнее! Просто сообщите свой мобильный телефон кассиру при покупке!</strong>\n\n            </div>\n            <!-- /tab content -->\n        </div>\n        <!-- /popup-info-body -->\n    </div>\n\n\n</div>',
        scope: true,
        link: function (scope, el, attr) {
          scope.open = function () {
            jQuery('.js-info-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'absolute',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#222',
              opacity: 0.8
            });
          };
          var tabsTriggers = jQuery(el).find('.js-info-tabs-trig');
          var tabsBody = jQuery(el).find('.js-info-tabs-content');
          tabsTriggers.click(function() {
            var _this = jQuery(this);
            if(!_this.hasClass('this-active')) {
              tabsTriggers.removeClass('this-active');
              _this.addClass('this-active');
              tabsBody.hide().filter('.js-tab-' + _this.data('tab')).fadeIn(300);
            }
          });

        }
      }

    });

  document.createElement('bonus-cmp');
  var elems = document.querySelectorAll('bonus-cmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['respect.directives.bonus']);
  }

}(window.angular, window.SAILPLAY, window.$));