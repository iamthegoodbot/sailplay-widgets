(function () {

  angular.module('ui', [
      'ui.datepicker',
      'ui.mask',
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

    .directive('giftsSlider', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, element, attrs) {
          scope.hidden = true;
          if (scope.$last) { // all are rendered
            $(element).parents('.js-gifts-slider').mCustomScrollbar({
              axis: "x"
            });
            $timeout(function () {
              scope.hidden = false;
            }, 1000)
          }
        }

      };
    })

    .directive('statusSlider', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, element, attrs) {
          scope.hidden = true;
          if (scope.$last) {

            $timeout(function () {

              scope.hidden = false;
              // progress bar animate
              $(element).parent().each(function () {
                var bar = $(this).find('.js-bar');
                var points = $(this).find('.js-point');
                var width = bar.data('progress');

                setTimeout(function () {

                  bar.css('width', width + '%');

                  var activePoints;
                  if (width >= 100) {
                    activePoints = points;
                  }
                  else if (width >= 50) {
                    activePoints = points.filter('.this-point-1, .this-point-2');
                  }
                  else if (width >= 0) {
                    activePoints = points.filter('.this-point-1');
                  }
                  var step = 1800 / activePoints.length;
                  activePoints.each(function (index) {
                    var _this = $(this);
                    setTimeout(function () {
                      _this.addClass('this-active');
                    }, index * step);
                  });
                  points.each(function (index) {
                    var _this = $(this);
                    setTimeout(function () {
                      _this.addClass('this-animated');
                    }, index * 350);
                  });
                }, 150);
              });

            }, 300);

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
            $('.js-notify-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'absolute',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#000',
              opacity: 0.3
            });

          });


          scope.reset_notifier = function () {

            $('.js-notify-popup').bPopup().close();
            $timeout(function () {
              scope.data = angular.copy(new_data);
            }, 200);

          };

          scope.reset_notifier();

        }

      }

    });

}());
