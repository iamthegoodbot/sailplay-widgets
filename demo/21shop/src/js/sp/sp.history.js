(function () {

  angular.module('sp.history', [])


    .directive('sailplayHistory', function (sp_api, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.show = false;

          scope.user = sp_api.data('load.user.info');

          scope.history = sp_api.data('load.user.history');

          scope.history_current_page = 0;

          scope.set_current_page = function (page) {
            scope.history_current_page = page;
          };

          $rootScope.$on('history:open', function(){
            scope.show = true;
          });

          $rootScope.$on('history:close', function(){
            scope.show = false;
          });

        }

      };

    })

    .constant('history_texts', {
      "purchase": "Покупка",
      "gift_purchase": "Подарок",
      "badge": "Бейджик",
      "registration": "Регистрация",
      "referral": "Регистрация друга",
      "referred": "Регистрация по приглашению",
      "referred_purchase": "Покупка приглашенного пользователя",
      "promocode": "За ввод промокода",
      "enter_group": "Вступление в группу ",
      "share_purchase": "Рассказ о покупке в ",
      "social_share": "Рассказ в ",
      "share_badge": "Рассказ о бейджике в ",
      "earn_badge": 'Получен бейджик ',
      "custom_action": "Экстра"
    })

    .constant('socialList', {
      "vk": "Вконтакте",
      "fb": "Facebook"
    })

    .filter('history_item', function (history_texts, socialList) {

      return function (historyItem) {
        switch (historyItem.action) {
          case 'gift_purchase':
            return history_texts.gift_purchase + ': ' + historyItem.name;
          case 'event':
            return historyItem.name || history_texts.custom_action;
          case 'extra':
            return historyItem.name || history_texts.custom_action;
          case 'sharing':
            switch (historyItem.social_action) {
              case 'like':
                return history_texts.enter_group + socialList[historyItem.social_type] || historyItem.social_type;
              case 'purchase':
                return history_texts.share_purchase + socialList[historyItem.social_type] || historyItem.social_type;
              case 'partner_page':
                return history_texts.social_share + socialList[historyItem.social_type] || historyItem.social_type;
              case 'badge':
                return history_texts.share_badge + socialList[historyItem.social_type] || historyItem.social_type;
            }
        }
        return history_texts[historyItem.action];
      }
    });

}());
