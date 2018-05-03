(function () {

  angular.module('ui', [
      'angularUtils.directives.dirPagination'
    ])

    /**
     * Notify directives
     * @type {{title: string, img: string, header: string, text: string}}
     * @private
     */
    .directive('notifyPopup', function (sp, spShare, $filter) {

      return {

        restrict: 'E',
        replace: false,
        templateUrl: '/html/ui/ui.notify.popup.html',
        scope: true,
        link: function (scope) {

          scope.data = null;

          scope.$on('notify.show', function (e, gift) {
            scope.data = gift;
          });

          scope.$on('notify.hide', function () {
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

          $(el).on('click', function(){

            if(!to.length) return;

            var offset = to.offset().top + $(window).height() > $('body').height() ? $('body').height() - $(window).height() : to.offset().top;

            $("html, body").delay(100).animate({
              scrollTop: offset
            }, time || 500, function(){
              to.addClass('scrolled');
              setTimeout(function(){
                to.removeClass('scrolled')
              }, 1000)
            });

          })

        }
      }
    })

    .directive('giftsSlider', function ($compile, $timeout) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope) {

          if (scope.$last) { // all are rendered

            $timeout(function () {

              $("#gift-slider").owlCarousel({
                autoPlay: 7000,
                items: 3,
                navigation: true,
                navigationText: ['&#xF2FA;', '&#xF2FB;'],
                pagination: false,
                itemsDesktop: [850, 2],
                itemsDesktopSmall: false,
                itemsTablet: false,
                itemsTabletSmall: false,
                itemsMobile: [620, 1]
              });

            }, 10);

          }

        }

      };
    });

}());
