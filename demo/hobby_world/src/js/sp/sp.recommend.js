angular.module('sp.recommend', [])

  .directive('recommendBlock', function (sp, sp_api, $rootScope) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.recommend_config = {
          selector: '.bns_recom',
          data: {
            slidesToShow: 3,
            slidesToScroll: 1,
            slide: '.bns_recom_item',
            responsive: [
              {
                breakpoint: 1318,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 730,
                settings: 'unslick'
              }
            ]
          }
        };

      }

    };

  });
