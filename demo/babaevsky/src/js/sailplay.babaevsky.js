/**
 * Created by awesome on 27.12.16.
 */

window.angular.module('babaevsky', ['templates', 'magic', 'sailplay', 'magic.tools'])

  .constant('BabaevskyIntegration', {
    token: '8a837cd05fe02a5817449b3b9705b24636f0c367',
    store_department_id: 3500
  })

  .constant('BabaevskyTags', {
    form_complete: "Заполнил анкету",
    form_accepted: "Анкета подтверждена",
    card_bonus: "Бонусная карта",
    card_social: "Социальная карта",
    card_student: "Карта студента"
  })

  .constant('SailplayApiErrors', function () {
  })

  .constant('BabaevskyVariables', {
    card_photo: "Фото подтверждающего документа"
  })

  .config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  })

  .service('BabaevskyForm', function (SailPlayApi, $q, $http, BabaevskyTags, BabaevskyVariables, BabaevskyIntegration) {

    var self = this;

    // Данные юзера
    self.user = window.sailplay_config && window.sailplay_config.user || null;

    // Пустой объект формы
    self.blank = {
      firstName: null,
      lastName: null,
      middleName: null,
      addEmail: null,
      addPhone: null,
      sex: 1,
      birthDate: null
    };

    /**
     * Get rules
     * @returns {string}
     */
    self.get_rules = function () {
      return '<h3 style="margin: 0;">Согласие на&nbsp;обработку персональных данных и&nbsp;получение информирования.</h3>\n<p style="margin: 0;padding-bottom: 0;">Регистрируясь для участия в&nbsp;программе лояльности сети фирменных магазинов &laquo;Алёнка&raquo;, Вы&nbsp;соглашаетесь\n    с&nbsp;обработкой\n    и&nbsp;использованием своих персональных данных, указанных в&nbsp;электронной анкете при регистрации, компанией ООО\n    &laquo;Объединенная Кондитерская Сеть&raquo;, а&nbsp;также третьими лицами, осуществляющими обработку персональных\n    данных по&nbsp;поручению\n    ООО &laquo;Объединенная Кондитерская Сеть&raquo;, с&nbsp;целью формирования базы данных о&nbsp;покупателях и&nbsp;осуществления\n    телефонной\n    и&nbsp;электронной информационной рассылки<strong> </strong>по&nbsp;SMS и/или E-mail об&nbsp;акциях и&nbsp;специальных\n    предложениях\n    сети фирменных магазинов &laquo;Алёнка&raquo;. Также, Вы&nbsp;выражаете свое согласие на&nbsp;получение рекламной\n    информации об\n    акциях и&nbsp;специальных предложениях сети фирменных магазинов &laquo;Алёнка&raquo; на&nbsp;неограниченный срок, до&nbsp;момента\n    отзыва Вами\n    такого согласия следующими способами: <br>\n    по&nbsp;E-mail: <a href="mailto:corp@alenka.ru" target="_blank">corp@alenka.ru</a>; <br>\n    по&nbsp;номеру телефона горячей\n    линии\n    <a href="tel:+79852163605">+7 (985) 216-36-05</a>.\n</p>';
    };

    /**
     * Generate origin user id
     * @returns {*}
     */
    self.generate_oid = function () {

      if (SAILPLAY.config() == {}) return;

      var url = '/api/integration/babaevsky/generate-oid/';

      return $http({
        method: 'GET',
        url: url,
        params: {
          token: BabaevskyIntegration.token,
          store_department_id: BabaevskyIntegration.store_department_id,
          auth_hash: SAILPLAY.config().auth_hash
        },
        transformRequest: angular.identity
      })

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

      var _url = '/api/integration/babaevsky/upload-pic/?token=' + BabaevskyIntegration.token + '&store_department_id=' + BabaevskyIntegration.store_department_id;

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

      _form.firstName = decodeURIComponent(self.user.first_name) || null;
      _form.lastName = decodeURIComponent(self.user.last_name) || null;
      // fix
      _form.middleName = decodeURIComponent(self.user.middle_name || '') || null;
      _form.addEmail = decodeURIComponent(self.user.email) || null;
      _form.sex = self.user.sex && parseInt(self.user.sex) || null;
      _form.addPhone = self.user.phone || null;
      // BAD, not time to change
      var bd = self.user.birth_date && self.user.birth_date.split('-');
      _form.birthDate = bd ? [parseInt(bd[0]), parseInt(bd[1]), parseInt(bd[2])] : [null, null, null];

      return _form;

    };

    /**
     * Обновление информации о пользователе
     * @param data
     * @returns {*}
     */
    self.update_user = function (data) {
      return $q(function (resolve) {
        if (!data || !Object.keys(data).length) resolve({status: 'ok'});
        SailPlayApi.call('users.update', data, resolve);
      });
    };

    /**
     * Добавление переменных
     * @param data
     * @returns {*}
     */
    self.add_vars = function (data) {
      return $q(function (resolve) {
        if (!data || !data.custom_vars || !Object.keys(data.custom_vars).length) resolve({status: 'ok'});
        SailPlayApi.call('vars.add', data, resolve);
      })
    };

    /**
     * Добавление тегов
     * @param data
     * @returns {*}
     */
    self.add_tags = function (data) {
      return $q(function (resolve) {
        if (!data || !data.tags || !data.tags.length) resolve({status: 'ok'});
        SailPlayApi.call('tags.add', data, resolve)
      })
    };

    return self;

  })

  .directive('sailplayBabaevsky', function ($rootScope, BabaevskyForm, BabaevskyTags, SailPlayApi, BabaevskyVariables) {

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
        // Sailplay UserInfo
        scope.user = SailPlayApi.data('load.user.info');

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
        var TAGS = Object.keys(BabaevskyTags).map(function (key) {
          return BabaevskyTags[key];
        });

        if (TAGS) SailPlayApi.call('tags.exist', {tags: TAGS}, function (res) {

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

          // Check code
          BabaevskyForm.check_verification_code(data).then(function (res) {
            if (res && res.status == 'ok') {

              // Generate origin user id
              BabaevskyForm.generate_oid().then(function (oid_response) {
                var oid_res = oid_response.data;
                if (oid_res.status == 'ok') {

                  scope.show_confirm_phone = false;

                  scope.state = 2;

                  // Add tag complete form
                  BabaevskyForm.add_tags({tags: [BabaevskyTags.form_complete]}).then(function (tags_res) {
                    if (tags_res && tags_res.status == 'ok') {

                      if (oid_res.oid) {
                        scope.notify = 'Здравствуйте, поздравляем Вас с успешной регистрацией в программе лояльности! Номер вашей виртуальной карты ' + oid_res.oid + '. Доступ в личный кабинет будет открыт после модерации анкеты.';
                      }

                    } else {
                      // Add tag error
                      if (tags_res && tags_res.message) scope.notify = tags_res.message;
                    }
                  });

                } else {
                  if (oid_res && oid_res.message) scope.notify = oid_res.message;
                }
              });

            } else {
              // Check code error
              if (res && res.message) scope.notify = res.message;
            }
          });

        };

        /**
         * Show rules
         */
        scope.show_rules = function () {
          scope.notify = BabaevskyForm.get_rules();
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
              if (res && res.message) scope.notify = res.message;
            }
          });
        };

        /**
         * Отправка формы
         * @param form
         */
        scope.submit = function (form) {

          if (!form || !form.$valid) return;

          scope.show_confirm_phone = false;

          var user = {};

          if (scope.form.firstName !== BabaevskyForm.get_form().first_name) {
            user.firstName = scope.form.firstName;
          }

          if (scope.form.lastName !== BabaevskyForm.get_form().last_name) {
            user.lastName = scope.form.lastName;
          }

          if (scope.form.middleName !== BabaevskyForm.get_form().middle_name) {
            user.middleName = scope.form.middleName;
          }

          if (scope.form.sex !== BabaevskyForm.get_form().sex) {
            user.sex = scope.form.sex;
          }

          if (scope.form.addEmail !== BabaevskyForm.get_form().addEmail) {
            user.addEmail = scope.form.addEmail;
          }

          if (scope.form.addPhone !== BabaevskyForm.get_form().addPhone) {
            user.addPhone = scope.form.addPhone;
          }

          // BAD, VERY BAD =(
          var bd = angular.copy(scope.form.birthDate);
          bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
          bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
          bd = bd.reverse().join('-');

          if (BabaevskyForm.get_form().birth_date != bd) {
            user.birthDate = bd;
          }

          // Update user info
          BabaevskyForm.update_user(user).then(function (res) {

            if (res && res.status == 'ok') {

              // Add card type tag
              BabaevskyForm.add_tags({tags: [BabaevskyTags['card_' + scope.type]]}).then(function (tags_res) {

                if (tags_res && tags_res.status == 'ok') {

                  // Add pic_path variable
                  var vars = {};
                  if (scope.pic_path) vars[BabaevskyVariables.card_photo] = scope.pic_path;
                  BabaevskyForm.add_vars({custom_vars: vars}).then(function (vars_res) {

                    if (vars_res && vars_res.status == 'ok') {

                      // Send phone verification code

                      var data = {
                        identifier: 'phone',
                        value: scope.form.addPhone
                      };

                      BabaevskyForm.send_verification_code(data).then(function (res_verification) {

                        if (res_verification && res_verification.status == 'ok') {
                          scope.show_confirm_phone = true
                        } else {
                          // Send phone verification code error
                          if (res_verification && res_verification.message) scope.notify = res_verification.message
                        }

                      });

                    } else {
                      // Add variables error
                      if (vars_res && vars_res.message) scope.notify = vars_res.message
                    }

                  });

                } else {
                  // Add tags error
                  if (tags_res && tags_res.message) scope.notify = tags_res.message
                }

              });

            } else {
              // Update user error
              if (res && res.message) scope.notify = res.message
            }

          });

        };

        /**
         * Очистка формы
         */
        scope.clear = function () {
          scope.form = BabaevskyForm.get_form();
          scope.pic_path = null;
          scope.type = 'bonus';
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

    if (SAILPLAY.cookies.readCookie('sailplay_magic_auth_hash') != window.sailplay_config.auth_hash) {
      document.cookie = 'sailplay_magic_auth_hash' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    SAILPLAY.send('login', window.sailplay_config.auth_hash);

  });

  SAILPLAY.on('login.success', function (res) {

    var app_container = document.getElementsByTagName('sailplay-babaevsky')[0];

    app_container && angular.bootstrap(app_container, ['babaevsky']);

  });

};

