angular.module('sp.pizzameter', [])

  .filter('static', [ 'config', function(config){

    return function(file) {
      var static_url = config.env.staticUrl;
      if(static_url) return static_url + file;
      return '';
    };

  }])

  .directive('sailplayPizzameter', function ($rootScope, config, $filter) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '='
      },
      template: '<div data-ng-cloak class="pizzameter_wrapper" data-ng-style="{ backgroundImage: wrapperBG() }">  ' +
      '<div class="pizza_pieces" data-ng-style="{ backgroundImage: pizzaBG() }"></div>' +
      '<div class="pizzameter_counter" data-ng-style="{ backgroundImage: counterBG() }">  ' +
      '<div class="counter_inner"> ' +
      '<img data-ng-repeat="digit in visible_points track by $index" data-ng-src="{{ getPointsDigitUrl(digit) }}" alt="{{ digit }}"/>  ' +
      '</div>' +
      '</div> ' +
      '</div>',
      link: function (scope) {

        scope.target_points = $rootScope.config && $rootScope.config.data && $rootScope.config.data.pizzameter_cost || 0;
        scope.user_points = 0;
        scope.visible_points = '000000'.split('');

        scope.$watch('model', function(){
          if(!scope.model) return;
          scope.user_points = scope.model;
          var points_arr = scope.model.toString().split('');
          while (points_arr.length < 6) {
            points_arr.unshift('0');
          }
          scope.visible_points = points_arr;
        });

        SAILPLAY.on('pj.pizzameter', function (target_points) {
          scope.$apply(function () {
            scope.target_points = target_points;
          });
        });

        scope.wrapperBG = function () {
          return 'url(' + $filter('translate')('pizzameter.wrapper_bg') + ')';
        };

        scope.counterBG = function () {
          return 'url(' + $filter('translate')('pizzameter.counter_bg') + ')';
        };

        scope.pizzaBG = function () {
          var piece_num = 8;
          var delta = scope.user_points / scope.target_points;
          if (delta < 1) {
            delta = Math.round(delta * 10);
            piece_num = delta > 8 ? piece_num : delta;
          }
          return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/' + (piece_num || 1) + '_piece.png)';
        };

        scope.getPointsDigitUrl = function (digit) {
          return $filter('static')('') + 'partners/pj/img/pizzameter/digits/' + digit + '.png';
        };

      }
    };
  });

