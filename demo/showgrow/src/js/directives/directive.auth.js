(function () {

  angular.module('sg.directives.auth', [])

    .directive('authD', function (api, sp, $timeout, $http, $window) {
      return {
        restrict: 'E',
        template: '<div data-ng-show="show_auth" style="position: fixed;\n    top: 0px;\n    right: 0px;\n    bottom: 0px;\n    left: 0px;\n    opacity: 0.5;\n    z-index: 2;\n    cursor: pointer;\n    background-color: rgb(0, 0, 0);"></div>\n\n<div class="sp_enter-popup js-enter-popup" data-ng-show="show_auth" style="z-index: 3;width: 566px;height: 455px;position: absolute;left: 0;top:0;bottom:0;right: 0;margin:auto;">\n    <div class="sp_common-popup-head-wr this-enter">\n        <h2 class="sp_common-popup-head">Sign in to continue</h2>\n    </div>\n    <div class="sp_enter-form__note-wrap" style="position: absolute;z-index: 1;right: 0;left: 0;margin: auto;bottom: -20px;text-align: center;">\n        Don”t have an account?\n        <div class="sp_enter-form__note-body">\n            Please visit one of our stores to get registered within the system\n        </div>\n    </div>\n    <iframe frameborder="0" id="sg_sp_auth" style="height: 420px;width: 100%;position: relative;"</iframe>\n</div>\n',
        replace: false,
        scope: true,
        link: function (scope, el) {
          var auth = false;
          // preloader
          $('#sp_status').fadeOut();
          $('#sp_preloader').delay(350).fadeOut('slow');
          $('body').delay(350).css({'overflow': 'visible'});

          scope.show_auth = false;
          sp.on('login.success', function () {
            if (!auth) {
              scope.show_auth = false;
            }
            auth = true;
            api.user.info().then(function () {
              api.badges.list().then(function () {
                api.user.history().then(function () {
                  api.actions.list().then(function () {
                    api.gifts.list().then(function () {
                      api.auth = true;
                    });
                  });
                });
              });
            });
            scope.$digest();
          });

          sp.on('logout.success', function () {
            api.auth = false;
          });

          $timeout(function () {
            if (!auth) {
              scope.show_auth = true;
            }
          }, 2000);

          sp.send('login.remote', {
            node: document.getElementById('sg_sp_auth'),
            lang: 'en',
            disabled_options: ['reg', 'socials', 'agreement'],
            texts: {
              ok: 'OK',
              back: 'BACK',
              forgot_password: 'Get password',
              login: 'LOG IN',
              password_placeholder: 'Enter your password',
              sms_placeholder: 'SMS-code',
              new_pass_placeholder: 'Enter new password',
              new_pass_placeholder2: 'Repeat new password',
              exist: 'LOG OUT',
              cancel: 'CANCEL',
              name_placeholder: 'You are already logged in as a',
              auth_text: 'You are logged',
              auth_text_how: 'in as'
            }
          });

        }
      }

    });

}());