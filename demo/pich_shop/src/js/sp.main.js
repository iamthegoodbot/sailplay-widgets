(function () {

  angular.module('pichshop', ['core', 'ui', 'sp', 'templates'])

    .directive('sailplayPichshop', function ($rootScope, $locale) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/main.html',
        link: function (scope, element) {

          scope.global = $rootScope;

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

        }
      }

    })

    .directive('sailplayHistory', function (sp_api, $rootScope, $locale, Status) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/history.html',
        link: function (scope, element) {

          scope.global = $rootScope;

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

          scope.user = sp_api.data('load.user.info');

          scope.getNum = Status.getNum;

          scope.statusList = $rootScope.config.statusList;

        }
      }

    })

    .directive('sailplayProfile', function (sp, sp_api, $rootScope, $locale, sp_api) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/profile.html',
        link: function (scope, element) {

          var form = {
            lastName: null,
            firstName: null,
            middleName: null,
            sex: 'Мужской',
            addEmail: null,
            addPhone: null,
            address: null
          };

          scope.data = null;

          scope.form = angular.copy(form);

          scope.user = sp_api.data('load.user.info');

          scope.exist = sp_api.data('tags.exist');

          scope.global = $rootScope;

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

          var id = sp.url_params() && SAILPLAY.url_params().id || null;

          scope.data = $rootScope.config.customActions.filter(function (item) {
            return item.type === 'form' && item.id == id
          })[0];

          scope.canSubmit = function () {

            if (
              scope.form.lastName &&
              scope.form.firstName &&
              scope.form.middleName &&
              (scope.form.sex.toLowerCase() == 'мужской' || scope.form.sex.toLowerCase() == 'женский') &&
              scope.form.addEmail &&
              scope.form.addPhone &&
              scope.form.address
            ) {
              return true;
            } else {
              return false;
            }

          };

          scope.submit = function () {

            var data = angular.copy(scope.form);

            data.sex = scope.form.sex.toLowerCase() == 'мужской' ? 1 : 2;

            delete data.address;

            data.auth_hash = sp.config().auth_hash;

            sp_api.call('user.update', data)

          };

          sp.on('user.update.success', function () {

            var tags = {tags: []};
            tags.tags.push(scope.data.tag);

            sp_api.call('tags.add', tags, function () {

              var variables = {"Адресс": scope.form.address};

              sp_api.call('vars.add', {custom_vars: variables}, function () {

                scope.$apply(finish);

              });

              scope.$digest();

            });
            scope.$digest();

          });

          sp.on('user.update.error', function (res) {

            var texts = {
              '-200010': 'Такой e-mail уже используется',
              '-200007': 'Такой телефон уже используется'
            };

            $rootScope.$broadcast('notify.show', {
              title: 'Ошибка',
              header: 'Oooops!',
              text: (res && texts[res.status_code]) || res.message
            });

            scope.$digest();

          });

          function finish() {

            $rootScope.$broadcast('notify.show', {
              title: 'Подтверждение',
              header: 'ПОЗДРАВЛЯЕМ!',
              text: 'Вы выполнили действие.'
            });

          }


        }
      }

    })

    .directive('sailplayGifts', function (sp_api, $rootScope, $locale) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/gifts.html',
        link: function (scope, element) {

          scope.global = $rootScope;

          scope.user = sp_api.data('load.user.info');

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

        }
      }

    })

    .directive('sailplayTest', function ($rootScope, $locale, sp, $timeout, sp_api) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/test.html',
        link: function (scope, element) {

          scope.global = $rootScope;

          scope.exist = sp_api.data('tags.exist');

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

          scope.step = 0;

          scope.tags = [];

          scope.vars = {};

          scope.var_model = null;

          var id = sp.url_params() && SAILPLAY.url_params().id || null;

          scope.data = $rootScope.config.customActions.filter(function (item) {
            return item.type === 'test' && item.id == id
          })[0];

          if (scope.data) {

            scope.tags.push(scope.data.tag);

          } else {

            $timeout(function () {

              $rootScope.$broadcast('notify.show', {
                title: 'Ошибка',
                header: 'Oooops!',
                text: 'К сожалению, такого опроса не существует.'
              });

            }, 0)

          }

          scope.isNext = function () {
            if (!scope.data || !scope.data.data) return;
            var empty_vaiable = false;
            var result = scope.data.data[scope.step].answers.filter(function (item) {
              if (item.model && item.variable && !scope.var_model) {
                empty_vaiable = true;
              }
              return item.model;
            }).length;
            return result && !empty_vaiable;
          };

          scope.change = function (answer) {
            var textarea = $('.js-toggle-textarea');
            answer.model = !answer.model;
            if (answer.model && scope.variable) {

            }
          };

          scope.showTextArea = function () {
            if (!scope.data || !scope.data.data) return;
            var result = scope.data.data[scope.step].answers.filter(function (item) {
              return item.model && item.variable;
            }).length;
            return result;
          };

          scope.next = function () {

            scope.data.data[scope.step].answers.forEach(function (item) {
              if (item.model) {
                scope.tags.push(item.tag);
                if (item.variable) {
                  scope.vars[item.variable] = scope.var_model;
                }
              }

            });

            if ((scope.step + 1) >= scope.data.data.length) {
              send();
            } else {
              scope.step++;
            }

            scope.var_model = null;

          };

          function send() {

            function finish() {

              $rootScope.$broadcast('notify.show', {
                title: 'Подтверждение',
                header: 'ПОЗДРАВЛЯЕМ!',
                text: 'Вы прошли опрос.'
              });

              scope.data = null;

            }

            sp_api.call('tags.add', {tags: scope.tags}, function () {

              if (Object.keys(scope.vars).length) {
                sp_api.call('vars.add', {custom_vars: scope.vars}, function () {
                  finish();
                  scope.$digest();
                })
              } else {
                finish()
              }
              scope.$digest();

            });

          }

        }
      }

    });


  setTimeout(function () {

    var app_blocks = document.querySelectorAll('sailplay-pichshop, sailplay-history, sailplay-profile, sailplay-gifts, sailplay-test');

    app_blocks.forEach(function (item) {
      angular.bootstrap(item, ['pichshop'])
    });

  }, 0);


}());
