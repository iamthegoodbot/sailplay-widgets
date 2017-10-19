angular.module('sp.gifts', [])

  .filter('giftName', function($rootScope, tryParseFieldFilter){
    return function(gift){
      return tryParseFieldFilter(gift.name)
    }
  })
  .filter('giftDesc', function($rootScope, tryParseFieldFilter){
    return function(gift){
      return tryParseFieldFilter(gift.descr)
    }
  })

  .filter('giftTillNext', function($rootScope, translateFilter, numberFilter, sailplay_pluralizeFilter){
    return function (points){
      var lang = $rootScope.config.lang
      if(lang == 'az'){
        return (numberFilter(points)) + ' ' + (sailplay_pluralizeFilter(points, translateFilter('pluralize.points'))) + ' ' + translateFilter('need_earn_more')
      } else {
        return translateFilter('need_earn_more') + (numberFilter(points)) + ' ' + (sailplay_pluralizeFilter(points, translateFilter('pluralize.points')))        
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
