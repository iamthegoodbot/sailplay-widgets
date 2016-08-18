(function () {

  angular.module('sp.gifts', [])

    .directive('sailplayGifts', function (sp, sp_api, $timeout, $rootScope, $filter) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.gifts = sp_api.data('load.gifts.list');
          scope.categories = sp_api.data('load.gifts.categories');
          scope.user = sp_api.data('load.user.info');
          scope.gifts_by_category = {};
          scope.active_category = 'all';
          scope.order_desc = true;
          scope.received = [];

          scope.getIconById = function(id, active){
            var imgs = {
              729: 'food',
              731: 'phone',
              739: 'book',
              738: 'other'
            };
            if(!id || !imgs[id]) return '';
            return active ? imgs[id] + '_active' : imgs[id];
          };

          scope.hasGift = function (item) {
            return item.length
          };

          scope.notEmpty = function (item) {
            return item.count
          };

          var loaded = 0;

          sp.on('load.gifts.categories.success', function () {
            loaded++;
            sort_gift_by_category();
          });

          sp.on('load.gifts.list.success', function () {
            loaded++;
            sort_gift_by_category();
          });

          function sort_gift_by_category() {

            if (loaded != 2)return;

            if ($('.bon_slide_cat_item_wrap.cycle-slide').length) {
              $('.bon_slide_cat_item_wrap.cycle-slide').remove();
            }

            scope.gifts_by_category = {};

            scope.gifts_by_category.all = angular.copy(scope.gifts());

            loaded = 0;

            scope.categories().forEach(function (category) {

              scope.gifts_by_category[category.id] = scope.gifts().filter(function (gift) {

                return category.id == gift.category;

              });

              category.count = scope.gifts_by_category[category.id].length;

            });

            $rootScope.$apply();

          }

          sp.on('gift.purchase.error', function (res) {

            $rootScope.$broadcast('notifier:notify', {

              header: 'Ошибка!',
              body: res.message || 'К сожалению, вы не получили подарок'

            });

            $rootScope.$apply();

          });

          scope.get_received_gifts = function(gift){

            return scope.received.indexOf(gift.id) != -1 ? true : false

          };

          scope.remove_from_received = function(gift){

            scope.received.splice(scope.received.indexOf(gift.id), 1);

          };

          scope.gift_purchase = function (gift) {

            if (scope.user().user_points.confirmed < gift.points) return;

            sp.send('gifts.purchase', {gift: gift});

            if(scope.received.indexOf(gift.id) == -1) {

              scope.received.push(gift.id);

            }

          };

          sp.on('gift.purchase.force_complete.success', function (res) {

            scope.$apply(function () {

              sp_api.call('load.user.categories');
              sp_api.call('load.gifts.list');
              sp_api.call('load.user.info');
              sp_api.call('load.user.history');

            });

          });

        }

      };

    });

}());
