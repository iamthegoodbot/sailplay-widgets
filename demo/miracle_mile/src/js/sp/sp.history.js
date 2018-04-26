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
      "purchase": "Purchase",
      "gift_purchase": "Gift",
      "badge": "Badge",
      "registration": "Sign up",
      "referral": "Invite friend",
      "referred": "Registration from friend's invite",
      "referred_purchase": "Friend's purchase",
      "promocode": "Promocode activation",
      "enter_group": "Joined our group on ",
      "share_purchase": "Shared a purchase on ",
      "social_share": "Shared our website on ",
      "share_badge": "Shared a badge on ",
      "earn_badge": 'Earned a badge ',
      "custom_action": "Extra"
    })

    .constant('socialList', {
      "gp": "Google +",
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
