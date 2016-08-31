(function () {

  angular.module('sp.status', [])

    .service('Status', function ($rootScope) {

      this.getNum = function (points) {

        var _num = 0;

        $rootScope.config.statusList.forEach(function (_item, _index) {

          if (!_item.limit || !_item.limit[0]) return;

          if (points > _item.limit[0] && (!_item.limit[1] || points < _item.limit[1])) {

            _num = _index;

          }

        });

        return _num;

      };

      return this;

    })

    .directive('sailplayStatus', function (sp_api, $rootScope, Status) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');

          scope.getNum = Status.getNum;

          scope.statusList = $rootScope.config.statusList;

          scope.getWidth = function () {
            return (100 / scope.statusList.length) + '%'
          };

          scope.getBarWidth = function (points) {

            var len = scope.statusList.length;

            if (!len || !points) return 0;

            var _progress = 0;

            var step = 100 / len;

            var limit = 0;

            function getLimits(status) {
              if(!status || !status.limit) return;
              return status.limit[1] || status.limit[0]
            }

            for (var i = 0; i < len; i++) {

              if (points > getLimits(scope.statusList[i])) {

                _progress += step;

              } else {

                _progress += ( getLimits(scope.statusList[i - 1]) ? ( (points - getLimits(scope.statusList[i - 1])) * 100 ) / ( getLimits(scope.statusList[i]) - getLimits(scope.statusList[i - 1]) ) : points * 100 / getLimits(scope.statusList[i]) ) / len;

                break;

              }

            }

            return _progress > 100 ? 100 + '%' : _progress < 0 ? 0 : _progress + '%';

          };

        }

      };

    });

}());
