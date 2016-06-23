(function () {

  angular.module('ui', [
      'ui.datepicker',
      'angularUtils.directives.dirPagination'
    ])

    .directive('overlayClick', function () {

      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, elm, attrs) {

          elm.on('click', function (e) {
            if (e.target === elm[0]) {
              scope.$apply(function () {
                scope.$eval(attrs.overlayClick);
              });
            }
          });

        }
      };

    })

    .directive('sliderInit', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, element, attrs) {


          if (scope.$last) { // all are rendered

            $timeout(function () {
              attrs.last && attrs.sliderInit && $(attrs.sliderInit).cycle();
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
            scope.$apply();

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
