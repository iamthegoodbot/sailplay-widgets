angular.module('sp.gifts', [])

  .filter('giftName', function($rootScope){
    return function(gift){
      var lang = $rootScope.config.lang
      if(lang == 'en') {
        return gift.name
      } else {
        var nameParsed = JSON.parse(gift.name)
        if(nameParsed[lang]){
          return nameParsed[lang]
        }
      }
    }
  })
  .filter('giftDesc', function($rootScope){
    return function(gift){
      var lang = $rootScope.config.lang
      if(lang == 'en') {
        return gift.name
      } else {
        var descrParsed = JSON.parse(gift.descr)
        if(descrParsed[lang]){
          return descrParsed[lang]
        }
      }
    }
  })

  .directive('sailplayGifts', function (sp, sp_api, $rootScope, $filter) {
    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.gifts = sp_api.data('load.gifts.list');

        scope.user = sp_api.data('load.user.info');

        scope.get = function (gift) {
          if (!gift || scope.user().user_points.confirmed < gift.points) return;
          sp.send('gifts.purchase', {gift: gift});
        };

        $rootScope.$on('gift:get', function (e, gift) {
          scope.gift_get = gift;
        });

        sp.on('gifts.purchase.success', function () {
          $rootScope.$apply(function () {
            scope.gift_get = null;
            $rootScope.$broadcast('notify:show', {
              title: $filter('translate')('gifts_messages.success.title'),
              text: $filter('translate')('gifts_messages.success.text')
            });
          });
        });

        sp.on('gifts.purchase.error', function (res) {
          $rootScope.$apply(function () {
            scope.gift_get = null;
            $rootScope.$broadcast('notify:show', {
              title: $filter('translate')('gifts_messages.error.title'),
              text: res.message || $filter('translate')('gifts_messages.error.text')
            });
          });
        });

      }

    };
  });
