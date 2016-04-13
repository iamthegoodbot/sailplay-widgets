(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.gifts', ['iledebeaute.services.users', 'iledebeaute.services.gifts'])

    .directive('giftsArchiveCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <h2 class="content_head">Архив привилегий</h2>\n\t\t\t<div class="archiv_privil_main">\n\t\t\t\t<div class="archiv_privil_item">\n\t\t\t\t\t<div class="img_block"><img src="../img/arch1.png" alt=""></div>\n\t\t\t\t\t<span class="company">Carolina Herrera</span>\n\t\t\t\t\t<span class="arch_name">CH CENTRAL PARK\nТуалетная вода</span>\n\t\t\t\t\t<span class="arch_bon">750 бонусов</span>\n\t\t\t\t\t<span class="when_use">Использованно 02.03.2016</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="archiv_privil_item">\n\t\t\t\t\t<div class="img_block"><img src="../img/arch1.png" alt=""></div>\n\t\t\t\t\t<span class="company">Mercedes-Benz</span>\n\t\t\t\t\t<span class="arch_name">Билет на 2 персоны на\nнеделю моды в Москве</span>\n\t\t\t\t\t<span class="arch_bon">750 бонусов</span>\n\t\t\t\t\t<span class="when_use">Использованно 02.03.2016</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="archiv_privil_item">\n\t\t\t\t\t<div class="img_block"><img src="../img/arch3.png" alt=""></div>\n\t\t\t\t\t<span class="company">Acqua di Parma</span>\n\t\t\t\t\t<span class="arch_name">Набор ROSA NOBILE</span>\n\t\t\t\t\t<span class="arch_bon">750 бонусов</span>\n\t\t\t\t\t<span class="when_use">Использованно 02.03.2016</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="archiv_privil_item">\n\t\t\t\t\t<div class="img_block"><img src="../img/arch4.png" alt=""></div>\n\t\t\t\t\t<span class="company">Dior</span>\n\t\t\t\t\t<span class="arch_name">Diorblush Sculpt\nСкульптурирующие румяна</span>\n\t\t\t\t\t<span class="arch_bon">750 бонусов</span>\n\t\t\t\t\t<span class="when_use">Использованно 02.03.2016</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="archiv_privil_item">\n\t\t\t\t\t<div class="img_block"><img src="../img/arch5.png" alt=""></div>\n\t\t\t\t\t<span class="company">Dr. Brandt</span>\n\t\t\t\t\t<span class="arch_name">Needless No More Маска\n-филлер эффект 3D</span>\n\t\t\t\t\t<span class="arch_bon">750 бонусов</span>\n\t\t\t\t\t<span class="when_use">Использованно 02.03.2016</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="archiv_privil_item">\n\t\t\t\t\t<div class="img_block"><img src="../img/arch6.png" alt=""></div>\n\t\t\t\t\t<span class="company">Тай рай</span>\n\t\t\t\t\t<span class="arch_name">Спа процедура</span>\n\t\t\t\t\t<span class="arch_bon">750 бонусов</span>\n\t\t\t\t\t<span class="when_use">Использованно 02.03.2016</span>\n\t\t\t\t</div>\n\t\t\t</div>\n</div>',
        scope: true,
        link: function (scope) {

        }
      }

    }])

    .directive('giftsCmp', ['userService', 'giftService', function (userService, giftService) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <div class="lk_top_info"  data-ng-if="user">\n        <div class="lk_top_info_left">\n\t\t\t\t\t<span class="clien_name">\n\t\t\t\t\t\tЗдравствуйте, {{ user.user.first_name || \'рады вас видеть\' }}\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="clien_sub">\n\t\t\t\t\t\tСовершайте покупки, копите бонусы и получайте специальные привилегии от ИЛЬ ДЕ БОТЭ и любимых производителей\n\t\t\t\t\t</span>\n        </div>\n        <div class="lk_top_info_right">\n            <div class="bonus_num ">\n                <span class="big" data-ng-bind="user.user_points.confirmed"></span>\n                <span class="text">бонусов ИЛЬ ДЕ БОТЭ</span>\n            </div>\n            <div class="bonus_num pr_num" data-ng-if="gifts.avaliable.length">\n                <span class="big" data-ng-bind="gifts.avaliable.length"></span>\n                <span class="text">доступных привилегий</span>\n            </div>\n        </div>\n        <div class="list_privil">\n            <div class="list_privil_left">\n                <span class="lpl_head">Список привилегий</span>\n                <span class="lpl_sub">Обменивайте ваши бонусы на привилегии</span>\n            </div>\n            <div class="list_privil_menu">\n                <a href="#" data-ng-class="{ act: type == \'avaliable\' }"\n                   data-ng-click="filterBy(\'avaliable\');$event.preventDefault();">Доступные</a>\n                <a href="#" data-ng-class="{ act: type == \'not_avaliable\' }"\n                   data-ng-click="filterBy(\'not_avaliable\');$event.preventDefault();">Другие</a>\n                <!--<a href="#">Эксклюзивные</a>-->\n            </div>\n        </div>\n    </div>\n    <div class="archiv_privil_main archiv_privil_lk_main">\n\n        <span class="lpl_head" data-ng-if="!data || !data.length">Список пуст</span>\n        \n        <div class="archiv_privil_item" data-ng-repeat="gift in data" data-ng-if="user && data">\n            <div class="img_block">\n                <img data-ng-src="{{ gift.thumbs.url_250x250 }}" alt="">\n            </div>\n            <!--<span class="company">Carolina Herrera</span>-->\n            <span class="arch_name" data-ng-bind="gift.name"></span>\n            <span class="arch_bon">{{ gift.points }} бонусов</span>\n            <a href="#" data-ng-click="gift_purchase(gift);$event.preventDefault();" data-ng-if="user.user_points.confirmed >= gift.points">Получить</a>\n        </div>\n\n    </div>\n</div>',
        scope: true,
        link: function (scope) {

          var _default = {
            avaliable: [],
            not_avaliable: []
          };

          scope.data = [];
          scope.user = null;

          scope.gifts = angular.copy(_default);

          scope.filterBy = function (type) {
            scope.type = type;
            scope.data = scope.gifts[type];
          };

          scope.gift_purchase = function (gift) {
            if (scope.user.user_points.confirmed < gift.points) {
              return;
            }
            sp.send('gifts.purchase', gift);
          };

          function update() {
            scope.gifts = angular.copy(_default);
            userService.loadInfo().then(function (user) {
              scope.user = user;
              giftService.loadList().then(function (res) {
                angular.forEach(res, function (val, key) {
                  if (val.points <= user.user_points.confirmed) {
                    scope.gifts.avaliable.push(val);
                  } else {
                    scope.gifts.not_avaliable.push(val);
                  }
                });
                scope.filterBy('avaliable');
                scope.$digest();
              });
              scope.$digest();
            });

          }

          update();

          sp.on('gift.purchase.force_complete.success', function (res) {
            update();
          });

          sp.on('tags.add.success', function (res) {
            setTimeout(function () {
              update();
            }, 3000);
          });

          sp.on('actions.perform.success', function (data) {
            update();
          });

        }
      }

    }]);

  document.createElement('gifts-cmp');
  document.createElement('gifts-archive-cmp');
  var elems = document.querySelectorAll('gifts-сmp, gifts-archive-cmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['iledebeaute.directives.gifts']);
  }

}(window.angular, window.SAILPLAY, window.$));