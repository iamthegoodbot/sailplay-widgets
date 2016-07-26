(function () {

  angular.module('ui', [
      'angularUtils.directives.dirPagination'
    ])

    .directive('giftsSlider', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, element, attrs) {

          if (scope.$last) { // all are rendered

            $timeout(function () {

              $("#gift-slider").owlCarousel({
                autoPlay: 7000,
                items: 3,
                navigation: true,
                navigationText: ['&#xF2FA;', '&#xF2FB;'],
                pagination: false,
                itemsDesktop : [850,2],
                itemsDesktopSmall : false,
                itemsTablet: false,
                itemsTabletSmall: false,
                itemsMobile : [620,1]
              });

            }, 10);

          }

        }

      };
    });

}());
