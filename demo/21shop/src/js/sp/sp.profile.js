(function () {

  angular.module('sp.profile', [])

    .constant('spProfileErrors', {
      '-200007': 'Указанный телефон уже принадлежит другому пользователю. Свяжитесь с технической поддержкой или измените контактные данные на кассе в любом из розничных магазинов.',
      '-200010': 'Указанный email адрес уже принадлежит другому пользователю. Свяжитесь с технической поддержкой или измените контактные данные на кассе в любом из розничных магазинов.'
    })

    .constant('defaultProfile', {
      firstName: null,
      lastName: null,
      addEmail: null,
      addPhone: null,
      sex: null,
      birthDate: [null, null, null]
    })

    .constant('spProfileTag', 'Filled Profile')

    .service('spProfile', function (sp_api, defaultProfile) {

      var self = this;

      self.user = sp_api.data('load.user.info');

      self.getForm = function () {

        var _form = angular.copy(defaultProfile);

        if (!self.user || !self.user()) return _form;

        _form.firstName = self.user().user.first_name;
        _form.lastName = self.user().user.last_name;
        _form.sex = self.user().user.sex;
        _form.addEmail = self.user().user.email;
        _form.addPhone = self.user().user.phone;
        var bd = self.user().user.birth_date && self.user().user.birth_date.split('-');
        _form.birthDate = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];

        return _form;

      };

      return self;

    })

    .directive('sailplayProfileEdit', function (sp_api, $rootScope, spProfile, spProfileErrors, sp, spProfileTag, tagHelper) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.show = false;

          scope.user = sp_api.data('load.user.info');

          scope.exist = sp_api.data('tags.exist');

          scope.form = {};

          scope.close = function (form) {
            if (form) {
              form.$setPristine();
              form.$setUntouched();
            }
            scope.show = false;
          };


          $rootScope.$on('profile:open', function () {

            if (!scope.user && !scope.user()) return;
            scope.form = spProfile.getForm();
            scope.show = true;

          });

          $rootScope.$on('profile:close', function () {
            scope.close();
          });

          scope.success = function () {

            scope.close();

            $rootScope.$broadcast('notify:show', {
              title: 'Готово',
              text: 'Профиль обновлен'
            });

          };

          scope.save = function (form) {

            if (!form || !form.$valid) return;

            var data = {};

            if (scope.form.firstName !== scope.user().user.first_name) {
              data.firstName = scope.form.firstName;
            }

            if (scope.form.lastName !== scope.user().user.last_name) {
              data.lastName = scope.form.lastName;
            }
            
            if (scope.form.sex !== scope.user().user.sex) {
             data.sex = scope.form.sex;
            }

            var bd = angular.copy(scope.form.birthDate);
            bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
            bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
            bd = bd.reverse().join('-');


            if (scope.user().user.birth_date != bd) {
              data.birthDate = bd;
            }

            if (scope.form.addEmail !== scope.user().user.email) {
              data.addEmail = scope.form.addEmail;
            }

            if (scope.form.addPhone !== scope.user().user.phone) {
              data.addPhone = scope.form.addPhone;
            }

            if (!Object.keys(data).length) {

              $rootScope.$broadcast('notify:show', {
                title: 'Ошибка',
                text: 'Нет изменений'
              });

              return;
            }

            data.auth_hash = sp.config().auth_hash;

            sp_api.call('users.update', data, function (res) {

              scope.$apply(function () {

                if (res.status == 'error') {

                  $rootScope.$broadcast('notify:show', {
                    title: 'Ошибка',
                    text: spProfileErrors[res.status_code] || res.message
                  });


                } else if (res.status == 'ok') {

                  if (tagHelper.checkTag(spProfileTag, scope.exist())) {

                    scope.success();

                  } else {

                    sp_api.call('tags.add', {tags: [spProfileTag]}, function (tag_res) {

                      scope.$apply(function () {

                        if (tag_res.status == 'ok') {

                          scope.success();

                        } else if (tag_res.status == 'error') {

                          $rootScope.$broadcast('notify:show', {
                            title: 'Ошибка',
                            text: res.message
                          });

                        }

                      })

                    })

                  }


                }

              });

            });

          };

        }

      };

    })

    .directive('sailplayProfile', function (sp, sp_api) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.user = sp_api.data('load.user.info');

          scope.show_history = function () {
            scope.$emit('history:open');
          };

          scope.edit_profile = function () {
            scope.$emit('profile:open');
          };

          scope.logout = function () {
            sp.send('logout');
          };

        }

      };

    });

}());
