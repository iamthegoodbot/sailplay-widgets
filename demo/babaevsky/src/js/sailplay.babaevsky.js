/**
 * Created by awesome on 27.12.16.
 */

window.angular.module('babaevsky', ['templates', 'magic', 'sailplay', 'magic.tools'])

  .constant('BabaevskyTags', {
    form_complete: "Заполнил анкету",
    form_accepted: "Анкета подтверждена",
    card_bonus: "Бонусная карта",
    card_social: "Социальная карта",
    card_student: "Карта студента"
  })

  .constant('BabaevskyVariables', {
    card_photo: "Фото подтверждающего документа"
  })

  .run(function ($rootScope, BabaevskyTags, SailPlayApi) {


    var TAGS = Object.keys(BabaevskyTags).map(function (key) {
      return BabaevskyTags[key];
    });

    if (TAGS) SailPlayApi.call('tags.exist', {tags: TAGS});

  })

  .config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  })

  .service('BabaevskyForm', function (SailPlayApi, $q, $http, BabaevskyTags, BabaevskyVariables) {

    var self = this;

    // Данные юзера
    self.user = window.sailplay_config && window.sailplay_config.user || null;

    // Проверка тегов
    self.exist = SailPlayApi.data('tags.exist');

    // Пустой объект формы
    self.blank = {
      firstName: null,
      lastName: null,
      addEmail: null,
      addPhone: null,
      sex: 1,
      birthDate: null
    };

    /**
     * Загрузка фото документа
     * @param params
     * @returns {*}
     */
    self.upload_pic = function (params) {

      if (SAILPLAY.config() == {}) return;

      params = params || {};

      var formData = new FormData();

      angular.forEach(params, function (value, key) {
        formData.append(key, value);
      });

      var _url = '/api/integration/babaevsky/upload-pic/';
      // var _url = SAILPLAY.config().DOMAIN + '/js-api/' + SAILPLAY.config().partner.id + '/upload-pic/?callback=sailplay_upload_pic';

      return $http({
        method: 'POST',
        url: _url,
        data: formData,
        //assign content-type as undefined, the browser
        //will assign the correct boundary for us
        headers: {'Content-Type': undefined},
        //prevents serializing payload.  don't do it.
        transformRequest: angular.identity
      })

    };

    /**
     * Проверка кода для подтверждения телефона
     * @param data
     * @returns {*}
     */
    self.check_verification_code = function (data) {
      if (SAILPLAY.config() == {}) return;
      data = data || {};
      if (SAILPLAY.config().auth_hash) {
        data.auth_hash = SAILPLAY.config().auth_hash;
      }
      return $q(function (resolve) {
        SAILPLAY.jsonp.get(SAILPLAY.config().DOMAIN + SAILPLAY.config().urls.users.verification.code.check, data, function (res) {
          resolve(res);
        });
      });
    };

    /**
     * Отправка кода для подтверждения телефона
     * @param data
     * @returns {*}
     */
    self.send_verification_code = function (data) {
      if (SAILPLAY.config() == {}) return;
      data = data || {};
      if (SAILPLAY.config().auth_hash) {
        data.auth_hash = SAILPLAY.config().auth_hash;
      }
      return $q(function (resolve) {
        SAILPLAY.jsonp.get(SAILPLAY.config().DOMAIN + SAILPLAY.config().urls.users.verification.code.send, data, function (res) {
          resolve(res);
        });
      });
    };

    /**
     * Получение формы
     * @returns {*}
     */
    self.get_form = function () {

      var _form = angular.copy(self.blank);

      if (!self.user) return _form;

      _form.firstName = self.user.first_name;
      _form.lastName = self.user.last_name;
      _form.addEmail = self.user.email;
      _form.sex = self.user.sex && parseInt(self.user.sex);
      _form.addPhone = self.user.phone;
      // BAD, not time to change
      var bd = self.user.birth_date && self.user.birth_date.split('-');
      _form.birthDate = bd ? [parseInt(bd[0]), parseInt(bd[1]), parseInt(bd[2])] : [null, null, null];

      return _form;

    };

    /**
     * Финальный метод, обновление информации о пользователе (его данные, теги и переменные)
     * @param data
     * @returns {*}
     */
    self.final_of_registration = function (data) {
      return $q(function (resolve, reject) {

        data.form.auth_hash = SAILPLAY.config().auth_hash;

        SailPlayApi.call('users.update', data.form, function (res) {
          if (res.status == 'error') {
            resolve(res);
          } else if (res.status == 'ok') {

            var tags = [];
            tags.push(BabaevskyTags.form_complete);
            if(data.type && BabaevskyTags['card_' + data.type])
              tags.push(BabaevskyTags['card_' + data.type]);
            
            SailPlayApi.call('tags.add', {tags: tags}, function (tag_res) {
              if (tag_res.status == 'error') {
                resolve(tag_res);
              } else if (tag_res.status == 'ok') {

                var vars = {};
                vars[BabaevskyVariables.card_photo] = data.pic;

                SailPlayApi.call('vars.add', {custom_vars: vars}, function (var_res) {
                  if (var_res.status == 'error') {
                    resolve(var_res);
                  } else if (var_res.status == 'ok') {

                    SAILPLAY.jsonp.get(SAILPLAY.config().DOMAIN + SAILPLAY.config().urls.users.info, {
                      all: 1,
                      auth_hash: SAILPLAY.config().auth_hash
                    }, function (res_info) {

                      if (res_info.status == 'error') {
                        resolve(res_info);
                      } else if (res_info.status == 'ok') {
                        resolve(res_info);
                      }

                    });

                  }
                })

              }
            })

          }
        });

      });
    };

    return self;

  })

  .directive('sailplayBabaevsky', function ($rootScope, BabaevskyForm, BabaevskyTags, SailPlayApi) {

    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/enter_screen.html',
      link: function (scope, element) {

        // Данные анкеты
        scope.form = BabaevskyForm.get_form();
        // Путь к фотографии документа
        scope.pic_path = null;
        // Текст для попапа с сообщением
        scope.notify = null;
        // Тип карты
        scope.type = 'bonus';
        /**
         * 0 - нет тегов
         * 1 - есть тег Заполнения анкеты
         * 2 - есть все теги
         * @type {number}
         */
        scope.state = 0;

        /**
         * Проверяем наличие тегов
         */
        SAILPLAY.on('tags.exist.success', function (res) {
          if (res.tags.length) {

            scope.state = 1;

            if (res.tags[0].exist) {
              scope.state = 2;
            }

            if (res.tags[0].exist && res.tags[1].exist) {
              scope.state = 3;
            }

          }
        });

        /**
         * Подтверждение телефона
         * @param code
         */
        scope.confirm_phone = function (code) {

          var data = {
            identifier: 'phone',
            value: code
          };

          scope.phone_code = null;

          var final_data = null;

          BabaevskyForm.check_verification_code(data).then(function (res) {

            if (res && res.status == 'ok') {

              scope.show_confirm_phone = false;

              final_data = {
                pic: scope.pic_path,
                type: scope.type,
                form: {}
              };

              if (scope.form.firstName !== BabaevskyForm.user.first_name) {
                final_data.form.firstName = scope.form.firstName;
              }

              if (scope.form.lastName !== BabaevskyForm.user.last_name) {
                final_data.form.lastName = scope.form.lastName;
              }

              if (scope.form.sex !== BabaevskyForm.user.sex) {
                final_data.form.sex = scope.form.sex;
              }

              if (scope.form.addEmail !== BabaevskyForm.user.email) {
                final_data.form.addEmail = scope.form.addEmail;
              }

              if (scope.form.addEmail !== BabaevskyForm.user.email) {
                final_data.form.addEmail = scope.form.addEmail;
              }

              // BAD, VERY BAD =(
              var bd = angular.copy(scope.form.birthDate);
              bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
              bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
              bd = bd.join('-');

              if (BabaevskyForm.user.birth_date != bd) {
                final_data.form.birthDate = bd;
              }

              BabaevskyForm.final_of_registration(final_data).then(function (res) {

                if (res && res.status == 'ok') {
                  if(res.user && res.user.origin_user_id) {
                    scope.notify = 'Здравствуйте, поздравляем Вас с успешной регистрацией в программе лояльности! Номер вашей виртуальной карты ' + res.user.origin_user_id + '. Доступ в личный кабинет будет открыт после модерации анкеты.';
                  }
                  scope.state = 2;
                } else {
                  if (res.message) {
                    scope.notify = res.message;
                  }
                }

              });

            } else {
              if (res.message) {
                scope.notify = res.message;
              }
            }
          })


        };

        /**
         * Загрузка фото карты
         * @param element
         */
        scope.on_file_change = function (element) {
          scope.pic_path = null;
          var photofile = element.files[0];
          BabaevskyForm.upload_pic({
            pic: photofile
          }).then(function (response) {
            var res = response.data;
            if (res && res.status == 'ok') {
              scope.pic_path = res.temp_file_properties.url;
              scope.notify = 'Фото успешно загружено';
            } else {
              if (res.message) {
                scope.notify = res.message;
              }
            }
          });
        };

        /**
         * Отправка формы
         * @param form
         */
        scope.submit = function (form) {

          if (!form || !form.$valid) return;

          var data = {
            identifier: 'phone',
            value: scope.form.addPhone
          };

          BabaevskyForm.send_verification_code(data).then(function (res) {
            if (res && res.status == 'ok') {
              scope.show_confirm_phone = true;
            } else {
              if (res.message) {
                scope.notify = res.message;
              }
            }
          })

        };

        /**
         * Очистка формы
         */
        scope.clear = function () {
          scope.form = BabaevskyForm.get_form();
          scope.pic_path = null;
          scope.type = 'student';
        }

      }
    }

  });

function Babaevsky() {

  var config = {
    partner_id: window.sailplay_config.partner_id || 1,
    domain: window.sailplay_config.domain || "https://sailplay.net",
    lang: window.sailplay_config.lang || "en"
  };

  SAILPLAY.send('init', config);

  SAILPLAY.on('init.success', function (res) {

    if (!res.partner.loyalty_page_config || !res.partner.loyalty_page_config.$MAGIC) return;

    angular.module('magic.core').constant('MAGIC_CONFIG', res.partner.loyalty_page_config.$MAGIC);

    if (!window.sailplay_config.auth_hash) {
      console.log("Auth_hash not found");
      return;
    }

    SAILPLAY.send('login', window.sailplay_config.auth_hash);

  });

  SAILPLAY.on('login.success', function (res) {

    var app_container = document.getElementsByTagName('sailplay-babaevsky')[0];

    app_container && angular.bootstrap(app_container, ['babaevsky']);

  });

};

