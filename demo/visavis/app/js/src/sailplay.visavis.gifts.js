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
                      <div class="spvv-slider__navigation next" data-ng-class="{ \'disabled\' :  !loop && page == max }"\
                      data-ng-click="next()"></div>\
                      <div class="spvv-slider">\
		                     <div class="spvv-slider__wrapper" data-ng-style="{ left : left }">\
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
		        scope.loop = false;

		        scope.page = 0;

		        scope.left = 0;

		        scope.max = 0;

		        var item_width = 0;

          scope.user = false;

		        scope.items_per_page = 0;

		        scope.next = function(){
				        if(!scope.loop && scope.page == scope.max) {
						        return;
				        }
				        scope.action(scope.page + 1);
		        };

		        scope.prev = function(){
				        if(!scope.loop && scope.page == 0) {
						        return;
				        }
				        scope.action(scope.page - 1);
		        };

		        scope.action = function(page){
				        var nextPage;
				        nextPage = page < 0 ? scope.max : page;
				        nextPage = page > scope.max ? 0 : page;
				        scope.page = nextPage;
				        scope.left = -Math.abs(scope.page * item_width);
				        console.log(scope.left)
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
				        scope.$apply(function(){
						        var _wrapper_width = angular.element(el).find('.spvv-slider').width();
						        var _margin = parseInt(angular.element(angular.element(el).find('.spvv-slider__i')[0]).css('margin-right')) + parseInt(angular.element(angular.element(el).find('.spvv-slider__i')[0]).css('margin-left'));
						        var _item_width = angular.element(angular.element(el).find('.spvv-slider__i')[0]).width() + _margin;
						        item_width = _item_width;
						        scope.items_per_page = Math.round(_wrapper_width/_item_width);
						        scope.max = scope.gifts.length - scope.items_per_page;
				        })
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