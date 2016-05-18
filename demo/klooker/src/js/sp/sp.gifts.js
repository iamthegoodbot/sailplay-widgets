(function () {

  angular.module('sp.gifts', [])

    .directive('sailplayGifts', function(sp, sp_api){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.gifts = sp_api.data('load.gifts.list');

          scope.gift_purchase = function(gift){

            sp.send('gifts.purchase', gift);

          };

          sp.on('gifts.purchase.success', function(res){

            console.dir(res);
            scope.$apply(function(){

              sp_api.call('load.user.info');
              sp_api.call('load.user.history');

            });

          });

        }

      };

    });

}());
