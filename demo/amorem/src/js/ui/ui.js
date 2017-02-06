(function () {

  angular.module('ui', [
    'angularUtils.directives.dirPagination',
    'ui.datepicker',
    'ui.menu',
    'ui.mask',
    'ngTouch'
  ])

    .directive('notifyPopup', function () {

      return {

        restrict: 'E',
        replace: false,
        templateUrl: '/html/ui/ui.notify.popup.html',
        scope: true,
        link: function (scope) {

          scope.data = null;

          scope.$on('notify:show', function (e, info) {
            scope.data = info;
          });

          scope.$on('notify:hide', function () {
            scope.data = null;
          });

        }

      }

    })

    .directive('scrollTo', function () {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attr) {

          var to = $(attr.scrollTo);
          var time = attr.scrollTime;

          $(el).on('click', function () {

            if (!to.length) return;

            var offset = to.offset().top + $(window).height() > $('body').height() ? $('body').height() - $(window).height() : to.offset().top;

            $("html, body").delay(100).animate({
              scrollTop: offset
            }, time || 500, function () {
              to.addClass('scrolled');
              setTimeout(function () {
                to.removeClass('scrolled')
              }, 1000)
            });

          })

        }
      }
    })

    .directive('spAuth', function ($rootScope, sp) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attrs) {

          var opts = scope.$eval(attrs.spAuth);

          var options = {
            node: el[0]
          };

          angular.merge(options, opts);

          $rootScope.$on('login.remote', function () {

            sp.send('login.remote', options);

          });

          sp.config() && sp.config().partner && sp.send('login.remote', options);

        }
      }
    })

    .directive('slackSlider', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el) {

          if (scope.$last) { // all are rendered

            // Issue!!! maybe some async
            $timeout(function () {

              $('.js-slick-slider').not('.slick-initialized').slick({
                adaptiveHeight: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<span class="slick-left"></span>',
                nextArrow: '<span class="slick-right"></span>',
                speed: 150,
                infinite: false,
                swipeToSlide: true,
                dots: false,
                edgeFriction: 0.1,
                responsive: [
                  {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1
                    }
                  },
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1
                    }
                  },
                  {
                    breakpoint: 700,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]
              });

            }, 10);

          }

        }

      };
    });

}());
