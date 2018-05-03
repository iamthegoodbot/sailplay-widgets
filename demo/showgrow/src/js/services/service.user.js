(function () {

  angular.module('sg.services.users', [])

    .service('userS', function ($q) {

      var self = this;

      self.validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };

      self.toDateObj = function (date) {
        return new Date(date);
      };

      self.getHistoryActionName = function (action) {
        if (!action) return 'No description';
        var history_items = {
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
        };
        switch (action.action) {
          case 'event':
            return action.name || 'Custom action';
          case 'extra':
            return action.name || 'Custom action';
          case 'sharing':
            switch (action.social_action) {
              case 'like':
                return history_items.enter_group + action.social_type;
              case 'purchase':
                return history_items.share_purchase + action.social_type;
              case 'partner_page':
                return history_items.social_share + action.social_type;
              case 'badge':
                return history_items.share_badge + action.social_type;
            }
        }
        return history_items[action.action] || 'No description';
      };

      return self;

    });

}());