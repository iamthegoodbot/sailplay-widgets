angular.module('sp.history', [])

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
    "share_purchase": "Рассказал о покупке в ",
    "social_share": "Рассказал в ",
    "share_badge": "Рассказал о бейджике в ",
    "earn_badge": 'Получен бейджик ',
    "extra": "Экстра "
  })

  .constant('social_list', {
    "vk": "Вконтакте",
    "ok": "Одноклассиниках",
    "tw": "Twitter",
    "fb": "Facebook"
  })

  .constant('history_icon', {
    "hist1": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/54375f98bdda3752d71f61375b7a5513.png",
    "hist2": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/16f75927885e8764f722c983fcf1f55d.png",
    "hist3": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/13533c803a8241a840344fb1e048af0b.png",
    "hist4": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b05745e76c9b1c0a80bb3ff690f2661f.png",
    "hist5": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/fe8a83246d1c8875aa93fde7b23a078f.png"
  })


  .filter('history_icon', function (history_icon) {
    return function (historyItem) {

      switch (historyItem.action) {
        case 'purchase':
          return history_icon.hist4;
        default:
          return history_icon.hist5;
          break;
      }

    }
  })

  .filter('history_item', function (history_texts, social_list) {
    return function (historyItem) {

      switch (historyItem.action) {
        case 'gift_purchase':
          return history_texts.gift_purchase + ': ' + historyItem.name;
        case 'event':
          return historyItem.name || history_texts.custom_action;
        case 'extra':
          return historyItem.name || history_texts.custom_action;
        case 'custom_action':
          return historyItem.name || history_texts.custom_action;
        case 'badge':
          return history_texts.badge + ': ' + historyItem.name;
        case 'purchase':
          return historyItem.name || history_texts.purchase;
        case 'sharing':
          switch (historyItem.social_action) {
            case 'like':
              return history_texts.enter_group + social_list[historyItem.social_type] || historyItem.social_type;
            case 'purchase':
              return history_texts.share_purchase + social_list[historyItem.social_type] || historyItem.social_type;
            case 'partner_page':
              return history_texts.social_share + social_list[historyItem.social_type] || historyItem.social_type;
            case 'badge':
              return history_texts.share_badge + social_list[historyItem.social_type] || historyItem.social_type;
          }
      }
      return history_texts[historyItem.action];

    }
  })

  .directive('sailplayHistory', function (sp, sp_api) {
    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.history = sp_api.data('load.user.history');

      }

    };
  });

