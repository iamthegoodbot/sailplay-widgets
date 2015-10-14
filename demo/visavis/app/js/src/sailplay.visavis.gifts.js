(function(){

  angular.module('visavis.gifts', [])

    .directive('sailplayGifts', function(){

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="spvv" data-ng-show="show">\
                     <div class="spvv-gifts">\
                      <div class="spvv-simple__title">\
                        подарки\
                      </div>\
                      <div class="spvv-simple__subtitle">\
                        на которые вы можете обменять свои баллы\
                      </div>\
                      <div class="spvv-slider">\
                        <div class="spvv-slider__i" data-ng-repeat="gift in gifts">\
                          <img data-ng-src="{{ gift.thumbs.url_250x250 }}"/>\
                          <div class="spvv-slider__i-content">\
                            <div class="spvv-slider__i-content-inner">\
                              <div class="spvv-slider__i-name">\
                                {{ gift.name }}\
                              </div>\
                              <div class="spvv-slider__i-price">\
                                <span>{{ gift.points }}</span>\
                                баллов\
                              </div>\
                            </div>\
                            <div class="spvv-slider__i-con">\
                              <a class="spvv-slider__i-btn" data-ng-if="user.user_points.confirmed > gift.points" href="#" data-ng-click="$event.preventDefault(); gift_purchase(gift);">Получить</a>\
                              <a class="spvv-slider__i-btn" data-ng-if="user.user_points.confirmed < gift.points" href="#" data-ng-click="$event.preventDefault();">Не хвататет баллов</a>\
                            </div>\
                          </div>\
                        </div>\
                      </div>\
                    </div>\
                  </div>',
        scope: true,
        link: function(scope){

		        scope.show =  spData.buy_tag && true;

          scope.gifts = [];

          scope.user = false;

          scope.gift_purchase = function(gift){
            SAILPLAY.send('gifts.purchase', gift);
          };

          SAILPLAY.on('gift.purchase.force_complete.success', function (res) {
            console.dir(res);
            SAILPLAY.send('load.user.info');
            SAILPLAY.send('load.user.history');
          });

          SAILPLAY.on('load.gifts.list.success', function(gifts){
            scope.$apply(function(){
              scope.gifts = gifts;
              console.dir(scope.gifts);
            });
          });

          SAILPLAY.on('load.user.info.success', function(user){
            scope.$apply(function(){
              console.dir(user);
              scope.user = user;
            });
          });

        }
      }

    });

  window.addEventListener('load', function(){
    document.createElement('sailplay-gifts');
    var banners = document.querySelectorAll('sailplay-gifts');
    for(var i = 0; i < banners.length; i+=1){
      angular.bootstrap(banners[i], [ 'visavis.gifts' ]);
    }
  });

}());