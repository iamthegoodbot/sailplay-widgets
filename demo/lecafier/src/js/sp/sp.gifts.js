(function () {

  angular.module('sp.gifts', [])

    .directive('sailplayGifts', function (sp, sp_api, $timeout, $rootScope, $filter) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope, element) {

          scope.gifts = sp_api.data('load.gifts.list');
          scope.user = sp_api.data('load.user.info');

          scope.make_purchase = function(gift){

            if(scope.user().user_points.confirmed < gift.points) return;
            $("#gift-slider").data('owlCarousel').destroy();
            sp.send('gifts.purchase', {gift: gift});

          };

          sp.on('gift.purchase.error', function (res) {

            $rootScope.$broadcast('notifier:notify', {

              header: 'Ошибка!',
              body: res.message || 'К сожалению, вы не получили подарок'

            });

            $rootScope.$apply();

          });


          sp.on('gifts.purchase.success', function (res) {

            var _header = 'Спасибо! Вы выбрали подарок!';
            var _body = (res.coupon_number ? 'Номер вашего купона: ' + res.coupon_number + '. ' : '') + 'С Вашего бонусного счета было списано ' + res.points_delta + ' ' + $filter('sailplay_pluralize')(res.points_delta, 'балл,балла,баллов') + '. Подробная информация по получению подарка направлена Вам на электронную почту.'

            $rootScope.$broadcast('notifier:notify', {

              header: _header,
              body: _body

            });

            scope.$apply(function () {

              sp_api.call('load.user.info', {all: 1});
              sp_api.call('load.gifts.list', {verbose: 1});
              sp_api.call('load.user.history');

            });

          });


        }

      };

    });

}());
