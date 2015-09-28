(function(){

  angular.module('visavis.banner', [])

    .directive('sailplayBanner', function(){

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="spvv">\
                    <div class="spvv-banner">\
                      <div class="spvv-banner__text">\
                        Бонусная программа\
                      </div>\
                      <div class="spvv-banner__subtext">\
                        Совершайте покупки, выполняйте задания, <br/>\
                        копите баллы и меняйте их на подарки\
                      </div>\
                      <div class="spvv-banner__img"></div>\
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
