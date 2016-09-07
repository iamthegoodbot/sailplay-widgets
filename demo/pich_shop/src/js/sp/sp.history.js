(function () {

  angular.module('sp.history', [])


    .directive('sailplayHistory', function (sp_api) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');
          scope.history = sp_api.data('load.user.history');

          scope.history_current_page = 0;

          scope.set_current_page = function (page) {
            scope.history_current_page = page;
          };

        }

      };

    })

    .constant('history_object', {
      "purchase": {
        "text": "Покупка",
        "image": "dist/image/order_icon.png"
      },
      "gift_purchase": {
        "text": "Подарок",
        "image": "dist/image/gift_icon.png"
      },
      "badge": {
        "text": "Бейджик",
        "image": "dist/image/pig_icon.png"
      },
      "registration": {
        "text": "Регистрация",
        "image": "dist/image/pig_icon.png"
      },
      "referral": {
        "text": "Регистрация друга",
        "image": "dist/image/hist-friend.png"
      },
      "referred": {
        "text": "Регистрация по приглашению",
        "image": "dist/image/pig_icon.png"
      },
      "referred_purchase": {
        "text": "Покупка приглашенного пользователя",
        "image": "dist/image/order_icon.png"
      },
      "promocode": {
        "text": "За ввод промокода",
        "image": "dist/image/pig_icon.png"
      },
      "enter_group": {
        "text": "Вступление в группу ",
        "image": "dist/image/task-icon-02.png"
      },
      "share_purchase": {
        "text": "Рассказ о покупке в ",
        "image": "dist/image/task-icon-02.png"
      },
      "social_share": {
        "text": "Рассказ в ",
        "image": "dist/image/task-icon-02.png"
      },
      "share_badge": {
        "text": "Рассказ о бейджике в ",
        "image": "dist/image/task-icon-02.png"
      },
      "earn_badge": {
        "text": "Получен бейджик ",
        "image": "dist/image/pig_icon.png"
      },
      "custom_action": {
        "text": "Экстра",
        "image": "dist/image/pig_icon.png"
      }
    })

    .filter('history_name', function (history_object) {

      return function (historyItem) {
        switch (historyItem.action) {
          case 'gift_purchase':
            return history_object.gift_purchase.text + ': ' + historyItem.name;
          case 'event':
            return historyItem.name || history_object.custom_action.text;
          case 'extra':
            return historyItem.name || history_object.custom_action.text;
          case 'sharing':
            switch (historyItem.social_action) {
              case 'like':
                return history_object.enter_group.text + historyItem.social_type;
              case 'purchase':
                return history_object.share_purchase.text + historyItem.social_type;
              case 'partner_page':
                return history_object.social_share.text + historyItem.social_type;
              case 'badge':
                return history_object.share_badge.text + historyItem.social_type;
            }
        }
        return history_object[historyItem.action].text;
      }
    })

    .filter('history_image', function (history_object) {

      return function (historyItem) {
        switch (historyItem.action) {
          case 'gift_purchase':
            return history_object.gift_purchase.image;
          case 'event':
            return history_object.custom_action.image;
          case 'extra':
            return history_object.custom_action.image;
          case 'sharing':
            switch (historyItem.social_action) {
              case 'like':
                return history_object.enter_group.image;
              case 'purchase':
                return history_object.share_purchase.image;
              case 'partner_page':
                return history_object.social_share.image;
              case 'badge':
                return history_object.share_badge.image;
            }
        }
        return history_object[historyItem.action].image;
      }
    });

}());
