(function () {

  angular.module('ui', [
      'angularUtils.directives.dirPagination',
      'ui.datepicker'
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

    .directive('giftsSlider', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el) {

          if (scope.$last) { // all are rendered

            $timeout(function () {

              $('.bns_gift_main').not('.slick-initialized').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                slide: '.bns_gift_item',
                responsive: [
                  {
                    breakpoint: 900,
                    settings: {
                      slidesToShow: 2
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ]
              });

            }, 500);

          }

        }

      };
    });

}());
