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

  .constant('countries', ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote D\'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "France, Metropolitan", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "Republic of Korea", "Kuwait", "Kyrgyzstan", "Lao People\'s Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "FYROM", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "FSM", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Российская Федерация", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovak Republic", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia &amp; South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "TZA", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State (Holy See)", "Venezuela", "Viet Nam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Seychelles", "ZAR", "Zambia", "Zimbabwe", "Serbia", "Montenegro"])

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

      _form.fio = self.user().user.first_name
      if (self.user().user.middle_name)
        _form.fio += ' ' + self.user().user.middle_name

      if (self.user().user.last_name)
        _form.fio += ' ' + self.user().user.last_name

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

  .directive('file', function() {
    return {
      require: "ngModel",
      restrict: 'A',
      link: function($scope, el, attrs, ngModel) {
        el.bind('change', function(event) {
          var files = event.target.files;
          var file = files[0];

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

        var fd = new FormData();

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

          var firstName = scope.form.fio.split(' ')[0];
          var secondName = scope.form.fio.split(' ')[1];
          var lastName = scope.form.fio.split(' ')[2];         

          if (firstName && firstName !== scope.user().user.first_name) {
            data.firstName = firstName
          }

          if (secondName && lastName !== scope.user().user.last_name) {
            data.lastName = lastName
          }

          if (secondName && secondName !== scope.user().user.middle_name) {
            data.middleName = secondName
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

        scope.social_connected = function(soc) {
          return (new RegExp(soc)).test(window.sailplay_config.data.social)
        };

        scope.ava_menu_show = false;

        scope.close_menu = function(){
          if(scope.ava_menu_show) {
            scope.ava_menu_show = false;
            scope.$digest();
          }
        };

        $('body').on('click', scope.close_menu);

        scope.logout = function () {
          sp.send('logout');
        };

        scope.$on('$destroy', function(){
          $('body').off('click', scope.close_menu)
        })

      }

    };

  });

