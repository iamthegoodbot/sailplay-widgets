(function () {

  angular.module('sp.profile', [])

    .constant('statusList', [
      {
        name: 'Любитель кофе',
        description: 'Сделал первую покупку в магазине или явно зарегистрировался на сайте',
        purchases: 0
      },
      {
        name: 'Заядлый кофеман',
        description: 'Сделал более 5 покупок в магазине',
        purchases: 5
      },
      {
        name: 'Дегустатор подмастерье',
        description: 'Сделал более 10 покупок в магазине',
        purchases: 10
      },
      {
        name: 'Мастер дегустатор',
        description: 'Сделал более 15 покупок',
        purchases: 15
      },
      {
        name: 'Кофейная элита',
        description: 'Сделал более 20 покупок',
        purchases: 20
      }
    ])

    .directive('sailplayProfile', function (sp_api, sp, statusList, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');
          scope.gifts = sp_api.data('load.gifts.list');
          scope.statusList = statusList;

          scope.get_progress = function () {
            if (!scope.user || !scope.user()) return;
            var _res = (100 / 20) * scope.user().purchases.count;
            _res = _res > 100 ? 100 : _res;
            return _res + '%';
          };

          scope.get_status_pic = function(status){
            return scope.currentStatus || scope.currentStatus == 0 ? 'status l' + scope.currentStatus : ''
          };

          function update() {

            if (!scope.user || !scope.user()) return;

            var _num = scope.currentStatus || 0;

            statusList.forEach(function (_item, _index) {

              if (scope.user().purchases.count >= _item.purchases) {

                _num = _index;

              }

            });

            scope.currentStatus = _num;

            scope.$digest();

          }


          sp.on('load.user.info.success', function () {

            update();

          });

        }

      };

    });

}());
