(function () {

  angular.module('sp.badges', [])

    .directive('sailplayBadges', function (sp, sp_api) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          scope.scrollToBadge = function(){
            $('.bns_overlay_ach').scrollTop($('.bns_overlay_ach .bns_overlay_inner').height() + $('.bns_overlay_ach .bns_overlay_inner').offset().top)
          };

          scope.badge_config = {
            selector: '.bns_top_achiv',
            data: {
              // infinite: false,
              centerMode: true,
              slidesToShow: 3,
              slidesToScroll: 1,
              slide: '.bns_top_achiv_item',
              responsive: [
                {
                  breakpoint: 930,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 550,
                  settings: {
                    slidesToShow: 1
                  }
                }]
            }
          };

        }

      };

    });

}());
