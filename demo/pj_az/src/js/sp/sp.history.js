angular.module('sp.history', [])

  .service('history_texts', function ($rootScope) {
    return $rootScope.locale.history_texts || {};
  })

  .service('social_list', function ($rootScope) {
    return $rootScope.locale.social_list || {};
  })

  .filter('history_item', function ($rootScope, history_texts, social_list, $filter, tryParseFieldFilter) {
    return function (historyItem) {

      switch (historyItem.action) {
        case 'gift_purchase':
          return history_texts.gift_purchase + ': ' + tryParseFieldFilter(historyItem.name);
        case 'event':
          return historyItem.name || history_texts.custom_action;
        case 'extra':
          return history_texts.extra || historyItem.name;
        case 'custom_action':
          return historyItem.name || history_texts.custom_action;
        case 'badge':
          return history_texts.badge + ': ' + tryParseFieldFilter(historyItem.name);
        case 'purchase':
          return history_texts.purchase || historyItem.name;
        case 'sharing':
          switch (historyItem.social_action) {
            case 'like': {
              if($rootScope.config.lang == 'az') {
                return (social_list[historyItem.social_type] || historyItem.social_type) + 'da ' + history_texts.enter_group
              } else {
                return history_texts.enter_group + social_list[historyItem.social_type] || historyItem.social_type;                
              }
            }
            case 'purchase': {
              if($rootScope.config.lang == 'az') {
                return (social_list[historyItem.social_type] || historyItem.social_type) + 'da ' + history_texts.share_purchase
              } else {
                return history_texts.share_purchase + social_list[historyItem.social_type] || historyItem.social_type;                
              }
            }
            case 'partner_page': {
              if($rootScope.config.lang == 'az') {
                return (social_list[historyItem.social_type] || historyItem.social_type) + 'da ' + history_texts.social_share
              } else {
                return history_texts.social_share + social_list[historyItem.social_type] || historyItem.social_type;                
              }
            }
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

