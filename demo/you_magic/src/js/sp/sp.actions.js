(function () {

  angular.module('sp.actions', [])

    .service('tests_service', function ($http) {

      var that = this;

      var data = [];

      that.getData = function () {

        return data;

      };

      that.loadData = function (callback) {

        $http.get('./dist/json/tests.json').success(function (res) {

          data = res;
          callback && callback(res)

        });

      };

      return that;

    })


    .constant('actions_data', {
      "social": {
        "fb": {
          "partner_page": {
            "name": "Рассказать в Facebook",
            "pic": "dist/img/fb.png"
          },
          "like": {
            "name": "Подписаться в Facebook",
            "pic": "dist/img/fb.png"
          }
        },
        "vk": {
          "partner_page": {
            "name": "Рассказать в ВКонтакте",
            "pic": "dist/img/vk.png"
          },
          "like": {
            "name": "Вступить в группу в ВКонтакте",
            "pic": "dist/img/vk.png"
          }
        }

      }
    })

    .constant('refer_tags',
      ['Социальные сети', 'Поисковые системы/контекстная реклама', 'СМИ', 'Почтовая рассылка', '«Сарафанное радио»']
    )

    .constant('refer_flag',
      'Как узнали?'
    )

    .directive('sailplayActions', function (sp_api, sp, actions_data, $timeout, user_service, $rootScope, tests_service, ipCookie, refer_tags, refer_flag) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope, element) {

          scope.actions = sp_api.data('load.actions.list');
          scope.user = sp_api.data('load.user.info');
          scope.exist = sp_api.data('tags.exist');
          scope.test_data = tests_service.getData;
          scope.current_test = null;
          scope.current_step = 1;

          scope.full_profile = false;

          scope.refer_flag = refer_flag;

          scope.refers = refer_tags;

          scope.ref_tags = [];

          if (!ipCookie('sailplay_vars')) {

            ipCookie('sailplay_vars', {});

          }

          scope.toggleSelection = function (item, items) {

            var idx = items.indexOf(item);

            // is currently selected
            if (idx > -1) {
              items.splice(idx, 1);
            }

            // is newly selected
            else {
              items.push(item);
            }

          };

          scope.selectedTags = function (tags, full) {
            var _len = 70;
            var _str = tags && tags.length && tags.join(', ') || 'Выберите вариант ответа';
            _str = !full ? _str.slice(0, _len) : _str;
            return (!full && _str.length >= _len ? _str + '...' : _str) || _str;
          };

          scope.vars = angular.copy(ipCookie('sailplay_vars'));

          scope.check_in_list = function (action) {
            return action && actions_data && actions_data.social && action.socialType && action.action && actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action] ? true : false;
          };

          scope.getExist = function (data, name) {
            if (!data || !name) return;
            var el = data.tags.filter(function (item) {
              return item.name == name;
            })[0];
            return el && el.exist || false;
          };

          scope.openTest = function (test) {

            scope.current_test = angular.copy(test);
            $(element).find('.bns_overlay_opros').fadeIn();

          };

          scope.form = {};

          sp.on('load.user.info.success', function () {

            scope.form = {
              firstName: scope.user && scope.user() && scope.user().user.first_name,
              lastName: scope.user && scope.user() && scope.user().user.last_name,
              middleName: scope.user && scope.user() && scope.user().user.middle_name,
              addEmail: scope.user && scope.user() && scope.user().user.email,
              addPhone: scope.user && scope.user() && scope.user().user.phone
            };
            scope.form.birthDate = [null, null, null];
            if (scope.user && scope.user() && scope.user().user.birth_date) {
              scope.form.birthDate[0] = parseInt(scope.user().user.birth_date.split('-')[2]);
              scope.form.birthDate[1] = parseInt(scope.user().user.birth_date.split('-')[1]);
              scope.form.birthDate[2] = parseInt(scope.user().user.birth_date.split('-')[0]);
            }

            scope.$apply();

          });

          scope.isValid = function () {

            if (!scope.user || !scope.user()) {
              return;
            }

            var form = angular.copy(scope.form);

            if (
              (form.firstName)
              && (form.lastName)
              && (form.middleName)
              && (form.addPhone)
              && (user_service.validateEmail(form.addEmail))
            ) {
              if (
                (scope.user().user.first_name == form.firstName)
                && (scope.user().user.last_name == form.lastName)
                && (scope.user().user.middle_name == form.middleName)
                && (scope.user().user.phone == form.addPhone.replace(/\D/g, ''))
                && (scope.user().user.email == form.addEmail)
                && !scope.full_profile
              ) {
                return false;
              } else {
                return true;
              }
            }
            return false;
          };

          scope.save_profile = function () {

            if (scope.isValid()) {

              var form = angular.copy(scope.form);

              if (scope.user().user.first_name == form.firstName) {
                delete form.firstName;
              }

              if (scope.user().user.last_name == form.lastName) {
                delete form.lastName;
              }

              if (scope.user().user.middle_name == form.middleName) {
                delete form.middleName;
              }

              if (scope.user().user.email == form.addEmail) {
                delete form.addEmail;
              }

              if (scope.user().user.phone == form.addPhone.replace(/\D/g, '')) {
                delete form.addPhone;
              }


              if (form.birthDate && form.birthDate[0] && form.birthDate[1] && form.birthDate[2]) {
                var _bday = form.birthDate.map(function (item) {
                  return item < 10 ? '0' + item : item
                }).reverse().join('-');
              }

              if (form.birthDate && scope.user().user.birth_date == _bday) {
                delete form.birthDate;
              }

              if (!Object.keys(form).length) {

                if (scope.ref_tags && scope.ref_tags.length) {

                  send_tags();

                } else if (scope.vars && Object.keys(scope.vars).length) {

                  send_vars();

                }

              } else {

                sp_api.call('users.update', form);

              }


            }

          };

          sp.on('tags.exist.success', function (res) {

            scope.ref_tags = [];

            if (scope.getExist(scope.exist(), user_service.getTags().fill_profile)) {
              scope.full_profile = true;
            }

            if (scope.full_profile) {

              $('.bns_edit_prog_hide').slideDown();

            } else {

              $('.bns_edit_prog_hide').slideUp();

            }


            if (!res || !res.tags) return;

            var _tag = null;

            refer_tags.forEach(function (item, index) {

              _tag = res.tags.filter(function (tag) {
                return tag.name == item && tag.exist;
              })[0];

              if (_tag) {

                scope.ref_tags.push(_tag.name);

              }

            });

            scope.$digest();

          });

          sp.on('users.update.error', function (res) {

            var mes;

            switch (res.status_code) {
              case -200002:
                mes = 'Имя и Фамилия должны иметь длину до 50 символов.';
                break;
              case -200007:
                mes = 'Пользователь с таким номером телефона уже зарегистрирован. Пожалуйста, введите другой  номер.';
                break;
              case -200010:
                mes = 'Пользователь с таким email уже зарегистрирован. Пожалуйста, введите другой  email.';
                break;
              default:
                mes = res.message;
            }

            $rootScope.$broadcast('notifier:notify', {

              header: 'Ошибка',
              body: mes

            });

          });

          function send_tags() {

            var _add_tags = [];

            !scope.getExist(scope.exist(), user_service.getTags().fill_profile) && _add_tags.push(user_service.getTags().fill_profile);

            if (scope.getExist(scope.exist(), user_service.getTags().fill_profile)) {

              if (!scope.getExist(scope.exist(), refer_flag) && scope.ref_tags.length) {

                _add_tags.push(refer_flag);

                _add_tags = _add_tags.concat(angular.copy(scope.ref_tags));

              }

              if (!scope.getExist(scope.exist(), user_service.getTags().add_info) && scope.form.birthDate && scope.form.birthDate[0] && scope.form.birthDate[1] && scope.form.birthDate[2] && Object.keys(scope.vars).length) {

                _add_tags.push(user_service.getTags().add_info);

              }

            }

            if (_add_tags && _add_tags.length) {

              sp_api.call('tags.add', {tags: _add_tags}, function () {

                send_vars();

                scope.$digest();

              });

            } else {

              send_vars();

            }

          }

          function send_vars() {

            if (!scope.vars || !Object.keys(scope.vars).length || angular.equals(scope.vars, ipCookie('sailplay_vars'))) {

              if (!scope.full_profile) {

                scope.full_profile = true;

                $('.bns_edit_prog_hide').slideDown();

              } else {

                closeProfile();

              }

              return;

            }

            ipCookie('sailplay_vars', angular.copy(scope.vars));

            ipCookie('sailplay_form', angular.copy(scope.form));

            sp_api.call('vars.add', {custom_vars: scope.vars}, function () {

              closeProfile();

            });


          }

          function closeProfile() {

            $rootScope.$broadcast('notifier:notify', {

              header: 'Информация обновлена'

            });

            $('.bns_overlay_edit_prof').hide();
            $('html').removeClass('overflow_hidden');
          }

          sp.on('users.update.success', function (res) {

            scope.$apply(function () {

              sp_api.call('load.user.info', {all: 1});

              send_tags();

            });


          });


          scope.perform_action = function (action) {

            sp.send('actions.perform', action);

          };

          sp.on('actions.perform.success', function (res) {

            scope.$apply(function () {

              scope.on_perform && scope.on_perform(res);

            });

          });

          scope.action_data = function (action) {

            var data = {};

            if (!action) return data;

            data = action;

            if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

            return data;

          };

        }

      };

    })

    .directive('sailplayAction', function (sp, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm) {

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/95baaf245323c5f91147448ef5a33be1.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    })

}());
