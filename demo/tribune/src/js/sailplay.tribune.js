(function () {

  window.addEventListener('DOMContentLoaded', function () {

    angular.bootstrap(document.getElementById('tribune'), ['tribune']);

  });


  angular.module('tribune', [])

    .service('sp', function ($window) {

      return $window.SAILPLAY;

    })

    .run(function (sp) {

      sp.send('init', {partner_id: 1556, domain: '//sailplay.ru', lang: 'en'});

    })

    .directive('lead', function (sp, $q, $timeout) {

      return {

        restrict: 'A',
        scope: true,
        link: function (scope, elm, attrs) {

          var new_form = {
            user: {
              phone: '',
              email: ''
            },
            custom_vars: {

              first_name: '',
              last_name: '',
              AltEmail: '',
              Phone: '',
              Market: '',
              account_number: ''

            },
            tags: [
              {

                name: 'SMS',
                checked: false

              },
              {

                name: 'Email',
                checked: false

              }
            ]
          };

          scope.submited = false;

          scope.reset = function () {

            scope.form = angular.copy(new_form);

          };

          scope.reset();

          scope.isFilled = function () {
            if (
              scope.form
              && scope.form.user.email
              && scope.form.custom_vars.first_name
              && scope.form.custom_vars.last_name
              && scope.form.custom_vars.Phone
              && scope.form.custom_vars.Market
              && scope.form.custom_vars.account_number
            ) {
              return true;
            } else {
              return false;
            }
          };

          scope.submit = function () {

            if (scope.isFilled()) {

              var data_tags = [];

              if ($('.js-create-checkbox.this-active.sms').length) {
                data_tags.push('Send SMS');
              }

              if ($('.js-create-checkbox.this-active.email').length) {
                data_tags.push('Send Email');
              }

              update_user_full(scope.form.user, scope.form.custom_vars, data_tags)

            }

          };

          function update_user(data, tags) {

            return $q(function (resolve, reject) {
              if (!data.custom_vars.AltEmail) {
                delete data.custom_vars.AltEmail;
              }
              sp.send('vars.add', data, function (vars_res) {

                if (vars_res.status == 'ok') {

                  sp.send('tags.add', {user: data.user, tags: tags}, function (tags_res) {

                    if (tags_res.status == 'ok') {

                      resolve({vars_res: vars_res, tags_res: tags_res});

                    }

                    else {
                      reject({vars_res: vars_res, tags_res: tags_res});
                    }

                  });

                }
                else {
                  reject({vars_res: vars_res});
                }

              });


            });

          }

          function update_user_full(user, custom_vars, tags) {

            tags.push(custom_vars.Market);

            var user_1 = {

              user: {

                email: user.email

              },
              custom_vars: custom_vars

            };

            if (custom_vars.AltEmail) {
              var user_2 = {

                user: {

                  email: custom_vars.AltEmail

                },
                custom_vars: {
                  first_name: custom_vars.first_name,
                  last_name: custom_vars.last_name,
                  AltEmail: user.email,
                  Phone: custom_vars.Phone,
                  Market: custom_vars.Market,
                  account_number: custom_vars.account_number

                }

              };
            }
            var user_3 = {

              user: {

                phone: custom_vars.Phone

              },
              custom_vars: {
                first_name: custom_vars.first_name,
                last_name: custom_vars.last_name,
                email: user.email,
                AltEmail: custom_vars.AltEmail,
                Market: custom_vars.Market,
                account_number: custom_vars.account_number

              }

            };

            var first = update_user(user_1, tags);
            if (custom_vars.AltEmail) {
              var second = update_user(user_2, tags);
            } else {
              var second = function () {
                return $q(function (resolve) {
                  resolve();
                })
              }
            }
            var third = update_user(user_3, tags);

            $q.all([first, second, third]).then(function (data) {

              scope.reset();
              scope.submited = true;
              $('.sp_common-selectize.market')[0].selectize.setValue('');

              $timeout(function () {
                scope.submited = false;
              }, 3000);


            }, function (data) {


            });

          }

          scope.markets = [
            'latimes',
            'chicagotribune',
            'sunsentinel',
            'orlandosentinel',
            'dailypress',
            'courant',
            'baltimoresun',
            'mcall',
            'capgaznews',
            'carrollcountytimes'
          ];

        }

      };

    })

    .directive('select', function ($timeout) {

      return {

        restrict: 'A',
        link: function (scope, elm) {

          $timeout(function () {
            $(elm).selectize({
              onChange: function () {


              }
            });
          }, 0);


        }

      };

    });

}());