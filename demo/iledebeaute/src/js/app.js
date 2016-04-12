(function (angular, sp, hash) {

  angular.module('iledebeaute', ['iledebeaute.directives.gifts', 'iledebeaute.directives.feedback', 'iledebeaute.directives.faq', 'iledebeaute.directives.authorization', 'iledebeaute.directives.history', 'iledebeaute.directives.menu', 'iledebeaute.directives.text'])

    .directive('app', function () {

      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n <div class="iner_block">\n        <menu-cmp data-model="menu"></menu-cmp>\n        <div class="content" data-ng-switch="getActiveMenu()">\n            \n            <history-cmp data-ng-switch-when="history"></history-cmp>\n            \n            <text-cmp data-ng-switch-when="cut_bonus_rules" data-model="cut_bonus_rules"></text-cmp>\n            \n            <text-cmp data-ng-switch-when="rules" data-model="rules"></text-cmp>\n            \n            <text-cmp data-ng-switch-when="info" data-model="info"></text-cmp>\n            \n            <text-cmp data-ng-switch-when="about" data-model="about"></text-cmp>\n            \n            <faq-cmp data-ng-switch-when="faq"></faq-cmp>\n            \n            <feedback-cmp data-ng-switch-when="feedback"></feedback-cmp>\n            \n            <gifts-archive data-ng-switch-when="gifts_archive"></gifts-archive>\n            \n            <gifts data-ng-switch-when="gifts"></gifts>\n            \n        </div>\n    </div>\n    <auth-cmp data-model="$parent.auth" data-ng-if="!auth"></auth-cmp>\n</div>',
        scope: true,
        link: function (scope) {

          scope.auth = true;

          // TODO: перенести данные в сервисы!
          var menu = [
            {
              label: 'О программе',
              key: 'about',
              // DEFAULT ACTIVE ELEMENT
              active: true
            },
            {
              label: 'Условия участия',
              key: 'rules',
              items: [
                {
                  label: 'Правила начисления бонусов',
                  key: 'rules'
                },
                {
                  label: 'Правила списания бонусов',
                  key: 'cut_bonus_rules'
                },
                {
                  label: 'Полезная информация',
                  key: 'info'
                }
              ]
            },
            {
              label: 'История начислений',
              key: 'history'
            },
            {
              label: 'Сокровищница привилегий',
              key: 'gifts',
              items: [
                {
                  label: 'Сокровищница привилегий',
                  key: 'gifts'
                },
                {
                  label: 'Архив привилегий',
                  key: 'gifts_archive'
                }
              ]
            },
            {
              label: 'Вопрос-ответ',
              key: 'faq',
              items: [
                {
                  label: 'Часто задаваемые вопросы',
                  key: 'faq'
                },
                {
                  label: 'Форма обратной связи',
                  key: 'feedback'
                }
              ]
            }
          ];

          scope.menu = menu;

          scope.getActiveMenu = function () {
            if (!scope.menu) return;
            loop: for (var i = 0, len = scope.menu.length; i < len; i++) {
              var item = scope.menu[i];
              if (item && item.active) {
                if (item.items && item.items.length) {
                  for (var y = 0, leny = item.items.length; y < leny; y++) {
                    var sub = item.items[y];
                    if (sub && sub.active) {
                      return item.items[y].key;
                      break loop;
                    }
                  }
                  return item.key;
                } else {
                  return item.key;
                }
              }
            }
          }

          scope.cut_bonus_rules = {
            title: 'Правила списания бонусов',
            text: 'Бонусы могут быть списаны на любые привилегии из списка в блоке “Привилегии”. Обратите внимание - количество некоторых, особенно ценных, привилегий очень ограничено, поэтому их необходимо бронировать заранее. Накопив достаточно бонусов на получение привилегии, выберите её в соответствующем разделе и получите электронное письмо с сертификатом на эту привилегию. Для вашего удобства, при необходимости - вы можете связаться с менеджером и договориться об индивидуальном процессе получения привилегии.'
          };

          scope.rules = {
            title: 'Правила начисления бонусов',
            text: 'Совершайте покупки в розничных салонах и интернет-магазине Иль де Ботэ и получайте бонусы в зависимости от состава покупки. \n\nБонусы могут быть списаны на любые привилегии из списка в блоке “Привилегии”. Обратите внимание - количество некоторых,\n\nПолучите 1 бонус за каждую 1000 рублей в чеке, но за некоторые товары бонусы могут начисляться с повышенным коэффициентом.\n\nособенно ценных, привилегий очень ограничено, поэтому их необходимо бронировать заранее. Накопив достаточно бонусов на \n\nПолучайте бонусы по специальным предложениям, например, проходя интервью или приглашая своих друзей к участию в программе.'
          };

          scope.info = {
            title: 'Полезная информация',
            text: 'Полезная информация текст'
          };

          scope.about = {
            title: 'О программе',
            text: 'О программе текст'
          };

        }
      }

    });

  var _CONFIG = {
    partner_id: 231,
    domain: '//dev.sailplay.ru',
    lang: 'ru'
  };

  function startApp(auth_hash) {
    if (auth_hash) {
      sp.on('init.success', function () {
        sp.send('login', auth_hash);
        sp.on('login.success', function () {
          bootstrap();
        });
      });
    } else {
      sp.on('init.success', function () {
        bootstrap();
      });
    }
    sp.send('init', _CONFIG);
  }

  function bootstrap() {
    document.createElement('app');
    var elems = document.querySelectorAll('app');
    for (var i = 0; i < elems.length; i += 1) {
      angular.bootstrap(elems[i], ['iledebeaute']);
    }
  }

  startApp(hash);


}(window.angular, window.SAILPLAY, window.AUTH_HASH));