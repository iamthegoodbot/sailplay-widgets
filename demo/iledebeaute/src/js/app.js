(function (angular, sp, hash) {

  angular.module('iledebeaute', ['iledebeaute.directives.actions', 'iledebeaute.services.data', 'iledebeaute.directives.gifts', 'iledebeaute.directives.feedback', 'iledebeaute.directives.faq', 'iledebeaute.directives.authorization', 'iledebeaute.directives.history', 'iledebeaute.directives.menu', 'iledebeaute.directives.text'])

    .directive('app', ['dataService', function (dataService) {

      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <div class="iner_block" data-ng-if="auth">\n        <menu-cmp data-model="menu"></menu-cmp>\n        <div class="content" data-ng-switch="getActiveMenu()">\n\n            <history-cmp data-ng-switch-when="history"></history-cmp>\n\n            <text-cmp data-ng-switch-when="cut_bonus_rules" data-model="cut_bonus_rules"></text-cmp>\n\n            <text-cmp data-ng-switch-when="rules" data-model="rules"></text-cmp>\n\n            <text-cmp data-ng-switch-when="info" data-model="info"></text-cmp>\n\n            <text-cmp data-ng-switch-when="about" data-model="about"></text-cmp>\n\n            <faq-cmp data-ng-switch-when="faq" data-model="faq"></faq-cmp>\n\n            <feedback-cmp data-ng-switch-when="feedback"></feedback-cmp>\n\n            <gifts-archive-cmp data-ng-switch-when="gifts_archive"></gifts-archive-cmp>\n\n            <gifts-cmp data-ng-switch-when="gifts"></gifts-cmp>\n\n            <actions-cmp data-ng-switch-when="actions"></actions-cmp>\n\n        </div>\n    </div>\n    <auth-cmp data-model="$parent.auth" data-ng-if="!auth"></auth-cmp>\n</div>',
        scope: true,
        link: function (scope) {

          // AUTH FLAG
          scope.auth = true;

          scope.menu = dataService.menu;

          scope.cut_bonus_rules = dataService.pages.cut_bonus_rules;

          scope.rules = dataService.pages.rules;

          scope.info = dataService.pages.info;

          scope.about = dataService.pages.about;

          scope.faq = dataService.faq;

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
          };

        }
      }

    }]);

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