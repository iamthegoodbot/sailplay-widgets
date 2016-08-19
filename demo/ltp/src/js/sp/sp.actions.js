(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          name: 'Invite a Friend',
          pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/44178d92dc7beed338a7846b4a0598ed.png'
        }
      },
      "social": {
        "fb": {
          "partner_page": {
            "name": "Tell about LocalTradePros",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/5debdc059bc300b95ac84e17bf93a18a.png"
          },
          "purchase": {
            "name": "Tell about your purchase on Facebook",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/588eafd4458a9874268a1c5607933188.png"
          },
          "like": {
            "name": "Like us on Facebook",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/049291f4a8c343eadf198a54e6bac84c.png"
          }
        },
        "gp": {
          "partner_page": {
            "name": "Tell about LocalTradePros",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/90e0cbe76cf28e84e944750ed53cb419.png"
          },
          "like": {
            "name": "Like us on Google Plus",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/90e0cbe76cf28e84e944750ed53cb419.png"
          },
          "purchase": {
            "name": "Tell about your purchase on Google+",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/588eafd4458a9874268a1c5607933188.png"
          }
        }
      }
    })

    .constant('custom_actions_data', [
      //{
      //  name: 'Get registered as Pro',
      //  text: 'Good at something? Become a Pro and start selling your skills! Once you get registered as a Pro you will receive additional 10 bonus points to your account!',
      //  pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/726d0ed0bd8b171fb40cdb7b920985aa.png',
      //  points: 10,
      //  tag: 'Registered as Pro'
      //},
      {
        name: 'Get added to favorites as Pro',
        text: 'You will be rewarded with 20 bonus points every time your client added you to favorites! The more loyal clients you have, the more point you will earn.\n',
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/a00dc24bc43ae913c6f2c2f4aff60fbe.png',
        points: 25,
        tag: 'TP tagged as fav'
      },
      {
        name: 'Extend your subscription',
        text: 'Every time you extend you LocalTradePros subscription by paying monthly fee we reward you with 30 points for staying with us!',
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/69c6c7b173e233a233a21a989b360b25.png',
        points: 1500,
        tag: 'TP Monthly payment made'
      }
    ])

    .directive('sailplayActions', function (sp_api, sp, actions_data, custom_actions_data, $timeout, user_service) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');
          scope.user = sp_api.data('load.user.info');

          var tags = user_service.getTags();

          scope.custom_actions_data = angular.copy(custom_actions_data);

          sp.on('login.success', function () {

            var _tags = scope.custom_actions_data.map(function (item) {
              return item.tag;
            });

            _tags.push(tags.fill_profile);

            sp.send('tags.exist', {tags: _tags});

            sp.on('tags.exist.success', function (res) {

              angular.forEach(res.tags, function (item, index) {

                if (scope.custom_actions_data[index]) {

                  scope.custom_actions_data[index].exist = item.exist;

                } else {

                  scope.exist_profile = item.exist;

                }

              });

            });

          });

          scope.form = null;

          var _empty = {
            firstName: null,
            lastName: null,
            addPhone: null,
            addEmail: null,
            birthDate: [null, null, null],
            sex: 1
          };

          scope.form = angular.copy(_empty);

          sp.on('load.user.info.success', function () {

            scope.form.firstName = scope.user && scope.user() && scope.user().user.first_name;
            scope.form.lastName = scope.user && scope.user() && scope.user().user.last_name;
            scope.form.sex = scope.user && scope.user() && scope.user().user.sex;
            scope.form.addEmail = scope.user && scope.user() && scope.user().user.email;
            scope.form.addPhone = scope.user && scope.user() && scope.user().user.phone && scope.user().user.phone.slice(1);
            var bd = scope.user && scope.user() && scope.user().user.birth_date && scope.user().user.birth_date.split('-');
            scope.form.birthDate = bd ? [parseInt(bd[2]), parseInt(bd[1]), parseInt(bd[0])] : [null, null, null];

            scope.$digest();

          });

          // SOCIAL GOOGLE PLUS CHANGE HEIGHT
          sp.on('actions.social.gp.like.mouseenter', function(){
            var elms = document.querySelectorAll('.btn_gp_like iframe');
            var originWidth,
              w,
              h = 500;
            for(var i = 0, len = elms.length; i < len; i++){
              elms[i].removeAttribute("style");
              //originWidth = elms[i].parentNode.offsetWidth;
              //w = +originWidth + 70;
              w = 220;
              elms[i].style.cssText = 'width: ' + w + 'px !important;height: ' + h + 'px !important;z-index: 10 !important;margin-left: -10px;';
              elms[i].parentNode.style.setProperty ("overflow", "visible", "important");
            }
          });
          sp.on('actions.social.gp.like.mouseleave', function(){
            var elms = document.querySelectorAll('.btn_gp_like iframe');
            var w = 200,
              h = 27;
            for(var i = 0, len = elms.length; i < len; i++){
              elms[i].removeAttribute("style");
              elms[i].style.cssText = 'width: ' + w + 'px !important;height: ' + h + 'px !important;';
              elms[i].parentNode.style.setProperty ("overflow", "hidden", "important");
            }
          });


          scope.isValid = function () {

            if(!scope.user || !scope.user()) {
              return;
            }

            var form = angular.copy(scope.form);

            if (form.addPhone) {

              form.addPhone = '7' + form.addPhone;

            }

            if (form.birthDate[0]) {

              form.birthDate[0] = form.birthDate[0] < 10 ? '0' + form.birthDate[0] : form.birthDate[0];

            }

            if (form.birthDate[1]) {

              form.birthDate[1] = form.birthDate[1] < 10 ? '0' + form.birthDate[1] : form.birthDate[1];
            }

            form.birthDate = form.birthDate.reverse().join('-');

            if (
              (form.firstName)
              && (form.lastName)
              && (form.birthDate && form.birthDate[0] && form.birthDate[1] && form.birthDate[2])
              && (form.sex == 1 || form.sex == 2)
              && (form.addPhone)
              && (user_service.validateEmail(form.addEmail))
            ) {
              if(
                (scope.user().user.first_name == form.firstName)
                && (scope.user().user.last_name == form.lastName)
                && (scope.user().user.birth_date == form.birthDate)
                && (scope.user().user.sex == form.sex)
                && (scope.user().user.phone == form.addPhone)
                &&  (scope.user().user.email == form.addEmail)
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

              form.addPhone = '7' + form.addPhone;

              form.birthDate[0] = form.birthDate[0] < 10 ? '0' + form.birthDate[0] : form.birthDate[0];

              form.birthDate[1] = form.birthDate[1] < 10 ? '0' + form.birthDate[1] : form.birthDate[1];

              form.birthDate = form.birthDate.reverse().join('-');

              if (scope.user().user.first_name == form.firstName) {
                delete form.firstName;
              }

              if (scope.user().user.last_name == form.lastName) {
                delete form.lastName;
              }

              if (scope.user().user.email == form.addEmail) {
                delete form.addEmail;
              }

              if (scope.user().user.phone == form.addPhone) {
                delete form.addPhone;
              }

              if (scope.user().user.sex == form.sex) {
                delete form.sex;
              }

              if (scope.user().user.birth_date == form.birthDate) {
                delete form.birthDate;
              }

              if (!Object.keys(form).length) {
                return;
              }

              sp.send('users.update', form);

              sp.on('users.update.success', function () {

                sp.send('tags.add', {tags: [tags.fill_profile]});

                sp.on('tags.add.success', function () {

                  scope.exist_profile = true;

                  scope.close_profile();

                });

              });

            }

          };

          scope.open_profile = function () {

            //scope.form = angular.copy(_empty);
            $('.js-profile-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'fixed',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#000',
              opacity: 0.3
            });

          };

          scope.close_profile = function () {

            $('.js-profile-popup').bPopup().close();

            $timeout(function () {

              scope.form = angular.copy(_empty);

            }, 500);

          };

          scope.open_action = function (action) {

            scope.custom_action = action;
            $('.js-action-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'fixed',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#000',
              opacity: 0.3
            });

          };

          scope.close_action = function () {

            $('.js-action-popup').bPopup().close();

            $timeout(function () {

              scope.custom_action = null;

            }, 500);

          };

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

            if (actions_data.system[action.type]) data = actions_data.system[action.type];

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

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/4164ea8221f2093fca2398c2ed899318.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    });

}());
