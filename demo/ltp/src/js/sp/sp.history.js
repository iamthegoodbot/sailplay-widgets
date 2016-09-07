(function () {

  angular.module('sp.history', [])

    .directive('sailplayHistory', function(sp_api){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.history = sp_api.data('load.user.history');

          scope.abs = function(num){
            return num ? Math.abs(num) : '';
          };

          scope.on_change_page = function(){
            var offset = $('.js-history-popup').offset().top;
            //$(window).scrollTop(offset);
            $("html, body").delay(100).animate({ scrollTop: offset }, 200);
          };

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
      "earn_badge": 'Earn badge '
    })

    .filter('history_item', function(history_texts) {

      return function(historyItem) {
        switch (historyItem.action) {
          case 'gift_purchase':
            return history_texts.gift_purchase + ': ' + historyItem.name;
          case 'event':
            return historyItem.name || 'Custom action';
          case 'extra':
            return historyItem.name || 'Custom action';
          case 'sharing':
            switch (historyItem.social_action) {
              case 'like':
                return history_texts.enter_group + historyItem.social_type;
              case 'purchase':
                return history_texts.share_purchase + historyItem.social_type;
              case 'partner_page':
                return history_texts.social_share + historyItem.social_type;
              case 'badge':
                return history_texts.share_badge + historyItem.social_type;
            }
        }
        return history_texts[historyItem.action];
      }
    });

}());
