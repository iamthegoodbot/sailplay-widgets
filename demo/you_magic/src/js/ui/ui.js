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

    .directive('phoneMask', function($timeout){

      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModel){

          ngModel.$validators.phone = function(modelValue, viewValue) {
            var value = (modelValue || viewValue || '').replace(/\D/g,'');
            if(!value) return true;
            return /^[0-9]{11}$/.test(value);
          };

          $timeout(function(){
            $(elm).mask('+7(000) 000-00-00', {placeholder: "+7(___)___-__-__"});
          }, 10);

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
            $('.bns_overlay_thx').fadeIn();
            scope.$apply();

          });


          scope.reset_notifier = function () {

            $('.bns_overlay_thx').fadeOut();
            $timeout(function () {
              scope.data = angular.copy(new_data);
            }, 200);

          };

        }

      }

    });

}());
