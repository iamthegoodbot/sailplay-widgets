(function () {

  angular.module('klooker', [ 'core', 'ui', 'sp', 'templates' ])

    .directive('sailplayKlooker', function(){

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/klooker.html',
        link: function(scope){

          scope.show_history = false;

        }
      }

    });

  window.addEventListener('DOMContentLoaded', function(){

    var app_container = document.getElementsByTagName('sailplay-klooker')[0];

    app_container && angular.bootstrap(app_container, [ 'klooker' ]);

  });

}());
