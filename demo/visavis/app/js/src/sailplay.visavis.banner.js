(function(){

  angular.module('visavis.banner', [])

    .directive('sailplayBanner', function(){

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="spvv">\
                    <div class="spvv-banner bg_1">\
                      <ul class="spvv-banner__list">\
                        <li><span>ПЕРСОНАЛЬНЫЕ ДАННЫЕ</span></li>\
                        <li><span>ИСТОРИЯ ЗАКАЗОВ</span></li>\
                        <li><span>ОТСЛЕЖИВАНИЕ </span></li>\
                        <li><span>ИЗБРАННОЕ</span></li>\
                        <li><span>ПОДАРКИ И БОНУСЫ</span></li>\
                      </ul>\
                    </div>\
                    <div class="spvv-banner bg_2">\
                      <div class="spvv-banner__subtext" style="padding-top: 104px;">\
                        Совершайте покупки, выполняйте задания, <br/>\
                        копите баллы и меняйте их на подарки\
                      </div>\
                    </div>\
                  </div>',
        scope: true,
        link: function(scope){}
      }

    });

  window.addEventListener('load', function(){
    document.createElement('sailplay-banner');
    var banners = document.querySelectorAll('sailplay-banner');
    for(var i = 0; i < banners.length; i+=1){
      angular.bootstrap(banners[i], [ 'visavis.banner' ]);
    }
  });

}());
