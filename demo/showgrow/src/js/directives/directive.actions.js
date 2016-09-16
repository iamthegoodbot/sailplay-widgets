(function () {

  angular.module('sg.directives.actions', [])

    .directive('actionsD', function (api, actionS, sp, $timeout, userS) {
      return {
        restrict: 'E',
        replace: false,
        template: "<section class=\"sp_l-centered sp_tasks-sec\" data-ng-show=\"actions && actions() && actions().length || !existProfile\">\n    <div class=\"sp_common-sec-head\">Earn more ShowPoints by carrying out following tasks:</div>\n    <div class=\"sp_tasks-sec__row\" data-ng-class=\"{type_hidden : hidden}\">\n\n        <div class=\"sp_tasks-sec__col\" data-ng-repeat=\"action in actions()\">\n            <div class=\"sp_tasks-cell\">\n                <div class=\"sp_tasks-cell__inner\">\n                    <div class=\"sp_tasks-cell__reward\">\n                        <div class=\"sp_tasks-cell__reward-count\" data-ng-bind=\"action.points\"></div>\n                        <div class=\"sp_tasks-cell__reward-title\">ShowPoints</div>\n                    </div>\n                    <div class=\"sp_tasks-cell__icon {{ getIcon(action) }}\"></div>\n                    <div class=\"sp_tasks-cell__text\">\n                        <div class=\"sp_tasks-cell__text-inner\" data-ng-bind=\"transformTitle(action)\"></div>\n                    </div>\n                     <span data-ng-if=\"action.socialType\"\n                           href=\"#\" class=\"tasks-cell__iframe-wrap sp_tasks-cell__btn\"\n                           data-sp-action=\"{{ action._actionId }}\"\n                           data-styles=\"{{ css_link }}\">Custom action</span>\n                </div>\n            </div>\n        </div>\n        <!-- /col -->\n\n        <div class=\"sp_tasks-sec__col\" data-ng-show=\"!existProfile\">\n            <div class=\"sp_tasks-cell\">\n                <div class=\"sp_tasks-cell__inner\">\n                    <div class=\"sp_tasks-cell__reward\">\n                        <div class=\"sp_tasks-cell__reward-count\">30</div>\n                        <div class=\"sp_tasks-cell__reward-title\">ShowPoints</div>\n                    </div>\n                    <div class=\"sp_tasks-cell__icon this-icon-6\"></div>\n                    <div class=\"sp_tasks-cell__text\">\n                        <div class=\"sp_tasks-cell__text-inner\">\n                            Fill your profile\n                        </div>\n                    </div>\n                    <a href=\"#\" class=\"sp_common-btn sp_tasks-cell__btn\"\n                       data-ng-click=\"open_fill_profile();$event.preventDefault();\"\n                       style=\"    padding-top: 12px;cursor: pointer;  font-size: 14px;\">Get</a>\n                </div>\n            </div>\n        </div>\n\n    </div>\n    <!-- /row -->\n</section>\n\n<div class=\"sp_enter-popup js-action-popup\" style=\"display: none\">\n    <div class=\"sp_common-popup-head-wr this-enter\">\n        <h2 class=\"sp_common-popup-head\">Fill your profile</h2>\n    </div>\n    <form class=\"sp_enter-form sp_enter-popup__body\" data-ng-submit=\"formSubmit();\">\n        <div class=\'input_block\'>\n            <input type=\"text\" class=\'sp_common-input sp_enter-form__input\' placeholder=\"Name\"\n                   data-ng-model=\"form.first_name\">\n        </div>\n        <div class=\'input_block\'>\n            <input type=\"text\" class=\'sp_common-input sp_enter-form__input\' placeholder=\"Last name\"\n                   data-ng-model=\"form.last_name\">\n        </div>\n        <div class=\'input_block\'>\n            <input type=\"text\" class=\'sp_common-input sp_enter-form__input\' placeholder=\"Email\"\n                   data-ng-model=\"form.email\">\n        </div>\n        <!--<div class=\'input_block\'>-->\n            <!--<input type=\"text\" class=\'sp_common-input sp_enter-form__input\' placeholder=\"+1 (***) *** - ** - **\"-->\n                   <!--ui-mask=\"+1 (999) 999 - 99 - 99\" data-ng-model=\"form.phone\">-->\n        <!--</div>-->\n        <div class=\'input_block\' style=\"margin-bottom: 15px;height: 80px;\">\n            <div style=\"color: grey;\">Birthdate</div>\n            <date-picker data-model=\"form.birth_date\"></date-picker>\n        </div>\n        <div class=\"input_block\" style=\"margin-bottom: 15px;height: 40px;\">\n            <div class=\"check\" style=\'width: 50%;\'>\n                <input type=\"radio\" id=\"man\" name=\"gender\" data-ng-model=\"form.sex\" value=\"1\"/>\n                <label for=\"man\">Male</label>\n            </div>\n            <div class=\"check\">\n                <input type=\"radio\" id=\"woman\" name=\"gender\" data-ng-model=\"form.sex\" value=\"2\"/>\n                <label for=\"woman\">Female</label>\n            </div>\n        </div>\n        <div class=\"input_block\" style=\"margin-bottom: 15px;height: 40px;\">\n            <input type=\"submit\" class=\"sp_enter-form__btn sp_common-btn\" value=\"Update\" data-ng-disabled=\"!isValid()\">\n            <span class=\"sp_enter-form__error\" data-ng-show=\"error\" data-ng-bind=\"error\"></span>\n        </div>\n    </form>\n</div>\n",
        scope: true,
        link: function (scope, el) {
          scope.hidden = true;
          scope.user = api.data('user.info');
          scope.actions = api.data('actions.list');
          scope.css_link = actionS.getCss();
          scope.error = null;
          scope.existProfile = false;
          scope.validateEmail = userS.validateEmail;

          var errors = {
            '-200008': 'This phone number is already in use.',
            '-200010': 'This email is already in use by someone else.'
          };

          var form = {
            first_name: null,
            last_name: null,
            birth_date: [null, null, null],
            email: null,
            //phone: null,
            sex: 1
          };

          api.user.tags.exist({tags: ['Fill profile']}).then(function (res) {
            scope.existProfile = res.tags[0].exist;
          });

          scope.form = angular.copy(form);
          scope.form.first_name = scope.user && scope.user() && scope.user().user.first_name;
          scope.form.last_name = scope.user && scope.user() && scope.user().user.last_name;
          scope.form.sex = scope.user && scope.user() && scope.user().user.sex;
          scope.form.email = scope.user && scope.user() && scope.user().user.email;
          var bd = scope.user && scope.user() && scope.user().user.birth_date && scope.user().user.birth_date.split('-');
          scope.form.birth_date = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];


          scope.isValid = function () {
            if (
              scope.form.first_name
              && scope.form.last_name
              && (scope.form.birth_date && scope.form.birth_date[0] && scope.form.birth_date[1] && scope.form.birth_date[2])
              && (scope.form.sex == 1 || scope.form.sex == 2)
              && scope.validateEmail(scope.form.email)
            //&& scope.form.phone
            ) {
              return true;
            }
            return false;
          };

          scope.formSubmit = function () {
            if (scope.isValid()) {
              scope.error = null;
              var data = {};

              if (scope.form.first_name !== scope.user().user.first_name) {
                data.firstName = scope.form.first_name;
              }

              if (scope.form.last_name !== scope.user().user.last_name) {
                data.lastName = scope.form.last_name;
              }

              if (scope.form.sex !== scope.user().user.sex) {
                data.sex = scope.form.sex;
              }

              var bd = angular.copy(scope.form.birth_date);
              bd[0] = parseInt(bd[0]) < 10 ? '0' + parseInt(bd[0]) : bd[0];
              bd[1] = parseInt(bd[1]) < 10 ? '0' + parseInt(bd[1]) : bd[1];
              bd = bd.reverse().join('-');


              if (scope.user().user.birth_date != bd) {
                data.birthDate = bd;
              }

              if (scope.form.email !== scope.user().user.email) {
                data.addEmail = scope.form.email;
              }

              if (!Object.keys(data).length) {
                $('.js-action-popup').bPopup().close();
                return;
              }

              data.auth_hash = sp.config().auth_hash;

              api.user.update(data).then(function (res) {
                if (res.status == 'error') {
                  scope.error = errors[res.status_code] || res.message;
                  return;
                }
                api.user.tags.add(['Fill profile']).then(function () {
                  $('.js-action-popup').bPopup().close();
                  scope.existProfile = true;
                })
              });
            }
          };
          scope.transformTitle = actionS.getTitle;
          scope.getIcon = actionS.getIcon;

          function parseActions() {
            if (scope.actions && scope.actions() && scope.actions().length) {
              $timeout(function () {
                sp.send('actions.parse', scope.actions());
                scope.hidden = false;
              }, 1000);
            } else {
              scope.hidden = false;
            }
          }

          function update() {
            api.user.info().then(function () {
              api.actions.list().then(function () {
                parseActions();
              });
            });
          }

          update();

          scope.open_fill_profile = function () {
            $('.js-action-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'absolute',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#000000',
              opacity: 0.5
            });
          };

          sp.on('actions.perform.success', function (data) {
            update();
          });

        }
      }

    });

}());