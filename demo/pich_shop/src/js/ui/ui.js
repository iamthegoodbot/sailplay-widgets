(function () {

  angular.module('ui', [
      'angularUtils.directives.dirPagination'
    ])

    /**
     * Notify directives
     * @type {{title: string, header: string, text: string}}
     * @private
     */
    .directive('notifyPopup', function (sp, $filter) {

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
    });

}());
