angular.module('sp.profile', [])

  .constant('spProfileErrors', {
    '-200007': 'Указанный телефон уже принадлежит другому пользователю.',
    '-200010': 'Указанный email адрес уже принадлежит другому пользователю.'
  })

  .constant('interests', [
    'Популярные настольные игры',
    'Вечериночные игры',
    'Игротеки в моем городе',
    'Warhammer',
    'World of Tanks',
    'Новинки',
    'Скидки и акции',
    'Magic the Gathering',
    'Детские игры',
    'Берсерк'
  ])

  .constant('countries', [
    'Азербайджан',
    'Армения',
    'Беларусь',
    'Казахстан',
    'Киргизия',
    'Латвия',
    'Литва',
    'Молдова',
    'Россия',
    'Таджикистан',
    'Туркменистан',
    'Узбекистан',
    'Украина',
    'Эстония'
  ])

  .constant('varsProfile', [
    'Никнейм',
    'Страна',
    'Город',
    'Адрес',
    'Запомнить адрес доставки'
  ])

  .constant('defaultProfile', {
    firstName: null,
    lastName: null,
    middleName: null,
    addEmail: null,
    addPhone: null,
    sex: null,
    birthDate: null,
    subscriptions: {
      email: 0,
      sms: 0
    }
  })


  .filter('selectedInterests', function () {
    return function (data) {
      if (!data || !Object.keys(data).length) return;
      var match = 0;
      Object.keys(data).forEach(function (item) {
        if (data[item]) {
          match++;
        }
      });
      return match;
    }
  })

  .service('spProfile', function (sp_api, defaultProfile, $http, $rootScope) {

    var self = this;

    self.user = sp_api.data('load.user.info');

    var format_phone = function (phone) {
      if (!phone) return;
      return phone.slice(1);
    }

    self.getForm = function () {

      var _form = angular.copy(defaultProfile);

      if (!self.user || !self.user()) return _form;

      _form.firstName = self.user().user.first_name;
      _form.lastName = self.user().user.last_name;
      _form.middleName = self.user().user.middle_name;
      _form.sex = self.user().user.sex;
      _form.addEmail = self.user().user.email;
      _form.addPhone = format_phone(self.user().user.phone);
      _form.birthDate = self.user().user.birth_date;
      _form.sex = self.user().user.sex;
      _form.subscriptions = {
        email: self.user().user.is_email_notifications || 0,
        sms: self.user().user.is_sms_notifications || 0
      };

      return _form;

    };

    self.sendForm = function (params) {

      var data = {
        last_name: params.form.lastName,
        middle_name: params.form.middleName,
        first_name: params.form.firstName,
        phone: params.form.addPhone,
        birth_date: params.form.birthDate,
        gender: params.form.sex,
        nickname: params.vars['Никнейм'],
        country: params.vars['Страна'],
        city: params.vars['Город'],
        address: params.vars['Адрес'],
        interests: params.tags
      };

      return $http({
        method: "GET",
        url: $rootScope.config.data.urls.update_profile,
        params: data,
        transformRequest: angular.identity,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        responseType: "json"
      });
      
    };

    return self;

  })

  .directive('file', () => {
    return {
      require: "ngModel",
      restrict: 'A',
      link: ($scope, el, attrs, ngModel) => {
        el.bind('change', (event) => {
          let files = event.target.files;
          let file = files[0];

          ngModel.$setViewValue(file);
          $scope.$apply();
        });
      }
    };
  })

  .factory('hwUploadAvatar', function(sp, $rootScope, $http, $timeout, sp_api){
    var obj = {
      img: false
    }
    var url = $rootScope.config.data.urls.upload_avatar
    obj.uploadAvatar = function(){
      $timeout(function(){

        if (!obj.img) {
          return;
        }

        if (obj.img.size>2*1024*1024) {
          $rootScope.$broadcast('notify:show', {
            title: 'Ошибка загрузки аватара',
            text: 'Файл должен быть меньше 2 мегабайт'
          });
        }

        var user = sp_api.data('load.user.info')

        let fd = new FormData();

        fd.append('avatar', obj.img);

        fd.append('oid', user().user.origin_user_id)


        function cb(res){
          if (res.status == 'ok') {
            $rootScope.$broadcast('notify:show', {
              title: 'Успех',
              text: res.message
            });
            SailPlayApi.call('load.user.info', {all: 1, purchases: 1});
          } else {
            $rootScope.$broadcast('notify:show', {
              title: 'Ошибка',
              text: res.message
            });
          }
        }

        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).then(cb,cb)

      }, 50)
    }
    return obj
  })

  .directive('sailplayProfileEdit', function (sp, sp_api, $rootScope, hwUploadAvatar, spProfile, spProfileErrors, countries, interests, varsProfile) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.countries = countries;

        scope.interests = interests;

        scope.actions = sp_api.data('load.actions.list');

        scope.user = sp_api.data('load.user.info');

        scope.form = spProfile.getForm();

        scope.vars = {};

        scope.tags = {};

        sp_api.call('tags.exist', {tags: interests}, function (res_tags_exist) {
          if (res_tags_exist && res_tags_exist.tags) {
            res_tags_exist.tags.forEach(function (tag) {
              scope.tags[tag.name] = tag.exist;
            });
            scope.$digest();
          }
        });

        sp_api.call('vars.batch', {names: varsProfile}, function (res_vars_batch) {
          if (res_vars_batch && res_vars_batch.vars) {
            res_vars_batch.vars.forEach(function (variable) {
              scope.vars[variable.name] = variable.value;
            });
            scope.$digest();
          }
        });

        scope.uploadAvatar = hwUploadAvatar.uploadAvatar
        scope.avatarImg = hwUploadAvatar.avatarImg
        scope.$watch('avatarImg', function(newVal) {
          if(newVal){
            hwUploadAvatar.img = newVal
          }
        })
        

        scope.save = function (form, success) {

          if (!form || !form.$valid) return;

          var _tags = Object.keys(scope.tags).filter(function (field) {
            return scope.tags[field]
          }).map(function (tag) {
            return tag
          });

          // Подготовка данных к передаче
          var data = {};

          if (scope.form.firstName !== scope.user().user.first_name) {
            data.firstName = scope.form.firstName;
          }

          if (scope.form.lastName !== scope.user().user.last_name) {
            data.lastName = scope.form.lastName;
          }

          if (scope.form.middleName !== scope.user().user.middle_name) {
            data.middleName = scope.form.middleName;
          }

          if (scope.form.sex !== scope.user().user.sex) {
            data.sex = scope.form.sex;
          }

          if (scope.form.birthDate !== scope.user().user.birth_date) {
            data.birthDate = scope.form.birthDate;
          }

          if (scope.form.addEmail !== scope.user().user.email) {
            data.addEmail = scope.form.addEmail;
          }

          var phone = scope.form.addPhone
            .replace(/\-/g, '')
            .replace(/\s/g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/\+/g, '');

          if (phone !== scope.user().user.phone) {
            data.addPhone = phone;
          }

          data.subscriptions = JSON.stringify(scope.form.subscriptions);

          data.auth_hash = sp.config().auth_hash;

          // Обновление профиля
          sp_api.call('users.update', data, function (res_user_update) {

            if (res_user_update.status == 'error') {

              $rootScope.$apply(function () {
                $rootScope.$broadcast('notify:show', {
                  title: 'Ошибка',
                  text: spProfileErrors[res_user_update.status_code] || res_user_update.message || 'Не получилось обновления профиля.'
                });
              });

            } else if (res_user_update.status == 'ok') {

              // Удаление тегов (Интересов)
              sp_api.call('tags.delete', {tags: interests}, function (res_tags_delete) {

                // Добавление тегов (Интересов)
                sp_api.call('tags.add', {tags: _tags}, function (res_tags_add) {

                  // Добавление переменных
                  sp_api.call('vars.add', {custom_vars: scope.vars}, function (res_vars_add) {

                    // Запрос к HW
                    spProfile.sendForm({
                      form: scope.form,
                      vars: scope.vars,
                      tags: _tags
                    }).then(function (hw_response) {

                      success && success();

                      $rootScope.$broadcast('notify:show', {
                        title: 'Готово',
                        text: 'Профиль обновлен'
                      });

                      scope.$digest();

                    })

                  });

                });

              });
            }

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

        scope.logout = function () {
          sp.send('logout');
        };

      }

    };

  });

