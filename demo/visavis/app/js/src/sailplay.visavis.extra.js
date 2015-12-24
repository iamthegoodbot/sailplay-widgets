(function(){

  angular.module('visavis.extra', [])

    .directive('sailplayExtra', function(){

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="spvv">\
                    <div class="spvv_extra">\
                      <table>\
                      <tr>\
                          <td class="spvv_order_history">\
                            <p class="spvv_block_title"><span style="width: 20px;" class="spvv_title_decoration"></span>ИСТОРИЯ ЗАКАЗОВ<span style="width: 20px;" class="spvv_title_decoration"></span></p>\
                            <div class="spvv_extra_block bg_1">\
                             <div>\
		                             <a class="spvv-bl__btn" href="http://visavis-fashion.ru/personal/orders/">\
		                             ИСТОРИЯ ЗАКАЗОВ\
		                             </a>\
                             </div>\
                             <div>\
		                             <a class="spvv-bl__btn" href="http://visavis-fashion.ru/personal/orders/" style="margin-top: 5px;"> \
		                               ОТСЛЕЖИВАНИЕ ЗАКАЗОВ\
		                             </a>\
                             </div>\
                            </div>\
                          </td>\
                          <td style="width: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>\
                          <td class="spvv_favorites">\
                            <p class="spvv_block_title"><span style="width: 40px;" class="spvv_title_decoration"></span>ИЗБРАННОЕ<span style="width: 40px;" class="spvv_title_decoration"></span></p>\
                             <div class="spvv_extra_block bg_2">\
                             <a class="spvv-bl__btn" href="http://visavis-fashion.ru/personal/favorite/" style="margin-top: 19px;" > \
                               ИЗБРАННОЕ\
                             </a>\
                            </div>\
                          </td>\
                        </tr>\
                      </table>\
                    </div>\
                  </div>',
        scope: true,
        link: function(scope){



        }
      }

    });

  window.addEventListener('load', function(){
    document.createElement('sailplay-extra');
    var banners = document.querySelectorAll('sailplay-extra');
    for(var i = 0; i < banners.length; i+=1){
      angular.bootstrap(banners[i], [ 'visavis.extra' ]);
    }
  });

}());