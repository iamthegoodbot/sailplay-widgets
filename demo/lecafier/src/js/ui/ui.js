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
    })

    .directive('notifier', function ($timeout) {

      return {

        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/ui/ui.notifier.html',
        link: function (scope) {

          var new_data = {

            header: '',
            body: ''

          };

          scope.$on('notifier:notify', function (e, data) {

            scope.data = data;
            $('.bns_overlay_notify').fadeIn();

          });


          scope.reset_notifier = function () {

            $('.bns_overlay_notify').fadeOut();

            $timeout(function () {

              scope.data = angular.copy(new_data);

            }, 200);

          };

        }

      }

    });

}());
