(function(){

  angular.module('visavis.gifts', [])

		  .directive('onLastRepeat', function() {
				  return function(scope, element, attrs) {
						  if (scope.$last) setTimeout(function(){
								  scope.$emit('giftsListEnded', element, attrs);
						  }, 1);
				  };
		  })

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
                      <div class="spvv-slider__navigation prev" data-ng-class="{ \'disabled\' : !loop && page == 0 }"\
                      data-ng-click="prev()"></div>\
                      <div class="spvv-slider__navigation next" data-ng-class="{ \'disabled\' :  !loop && page == gifts.length - 1 }"\
                      data-ng-click="next()"></div>\
                      <div class="spvv-slider">\
		                     <div class="spvv-slider__wrapper">\
                        <div class="spvv-slider__i" data-ng-repeat="gift in gifts"  on-last-repeat>\
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
                    </div>\
                  </div>',
        scope: true,
        link: function(scope, el, attr){

		        scope.show =  spData.buy_tag && true;

          scope.gifts = [];

		        // loop slider
		        scope.loop = true;

		        scope.page = 0;

          scope.user = false;

		        scope.items_per_page = 0;

		        scope.next = function(){
				        scope.action(scope.page + 1);
		        };

		        scope.prev = function(){
				        scope.action(scope.page - 1);
		        };

		        scope.action = function(page){
				        var nextPage;
				        nextPage = page < 0 ? scope.gifts.length - 1: page;
				        nextPage = page > scope.gifts.length - 1 ? 0 : page;
				        scope.page = nextPage;
				        console.log(nextPage)
		        };

          scope.gift_purchase = function(gift){
            SAILPLAY.send('gifts.purchase', gift);
          };

          SAILPLAY.on('gift.purchase.force_complete.success', function (res) {
            //console.dir(res);
            SAILPLAY.send('load.user.info');
            SAILPLAY.send('load.user.history');
          });



		        scope.$on('giftsListEnded', function(s, e, a){
				        var _wrapper = angular.element(el).find('.spvv-slider');
				        var _items = angular.element(el).find('.spvv-slider__i');
				        console.log(_items)
				        //var _width = Math.floor(_wrapper.width()/_items[0].width()) ? Math.floor(_wrapper.width()/_items[0].width()) : 0;
				        //scope.items_per_page = _width;
				        //console.log(_width)
		        });


          SAILPLAY.on('load.gifts.list.success', function(gifts){
            scope.$apply(function(){
              scope.gifts = gifts;
              //console.dir(scope.gifts);




            });
          });

          SAILPLAY.on('load.user.info.success', function(user){
            scope.$apply(function(){
              //console.dir(user);
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