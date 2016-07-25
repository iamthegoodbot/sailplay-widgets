(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          name: 'Пригласить<br>друзей',
          pic: '&#xF209;'
        }
      },
      "social": {
        "fb": {
          "partner_page": {
            "name": "Рассказать в <br>Facebook",
            "pic": "&#xF343;"
          },
          "like": {
            "name": "Вступить в группу<br>Facebook",
            "pic": "&#xF343;"
          }
        },
        "vk": {
          "partner_page": {
            "name": "Рассказать в <br>ВКонтакте",
            "pic": "&#xF361;"
          },
          "like": {
            "name": "Вступить в группу<br>ВКонтакте",
            "pic": "&#xF361;"
          }
        },
        "tw": {
          "partner_page": {
            "name": "Рассказать в <br>Twitter",
            "pic": "&#xF360;"
          },
          "like": {
            "name": "Подписаться на нас<br>в Twitter",
            "pic": "&#xF360;"
          }
        },
      }
    })

    .directive('sailplayAction', function (sp, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm) {

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/b9dbaf68a3bb2198e40f2c9f43041f75.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    })

    .directive('sailplayActions', function (sp_api, sp, actions_data) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');

          scope.check_in_list = function (action) {
            return scope.action_data(action) && Object.keys(scope.action_data(action)).length || false
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

            if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

            if (actions_data.system[action.type]) data = actions_data.system[action.type];

            return data;

          };

        }

      };

    });

}());
