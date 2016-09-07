(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          name: 'Пригласить<br>друзей',
          notify: 'приглашения друга',
          pic: '&#xF209;'
        }
      },
      "social": {
        "fb": {
          "partner_page": {
            "name": "Рассказать о магазине<br> в Facebook",
            "notify": 'рассказ о магазине в Facebook',
            "pic": "&#xF343;"
          },
          "like": {
            "name": "Вступить в группу<br>Facebook",
            "notify": 'вступление в группу Facebook',
            "pic": "&#xF343;"
          },
          "purchase": {
            "name": "Рассказать о покупке<br> в Facebook",
            "notify": 'рассказ о покупке в Facebook',
            "pic": "&#xF343;"
          }
        },
        "vk": {
          "partner_page": {
            "name": "Рассказать о магазине<br> в ВКонтакте",
            "notify": 'рассказ о магазине в Вконтакте ',
            "pic": "&#xF361;"
          },
          "like": {
            "name": "Вступить в группу<br>ВКонтакте",
            "notify": 'вступление в группу Вконтакте',
            "pic": "&#xF361;"
          },
          "purchase": {
            "name": "Рассказать о покупке<br> в ВКонтакте",
            "notify": 'рассказ о покупке в Вконтакте ',
            "pic": "&#xF361;"
          }
        },
        "tw": {
          "partner_page": {
            "name": "Рассказать о магазине<br> в Twitter",
            "notify": 'рассказ о магазине в Twitter',
            "pic": "&#xF360;"
          },
          "like": {
            "name": "Подписаться на нас<br>в Twitter",
            "notify": 'подписку на нас в Twitter',
            "pic": "&#xF360;"
          },
          "purchase": {
            "name": "Рассказать о покупке<br> в Twitter",
            "notify": 'рассказ о покупке в Twitter',
            "pic": "&#xF360;"
          }
        }
      }
    })

    .service('spAction', function (actions_data) {

      var that = this;

      that.get_action_data = function (action) {

        var data = {};

        if (!action) return data;

        if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

        if (actions_data.system[action.type]) data = actions_data.system[action.type];

        return data;

      };

      return that;

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

    .directive('sailplayActions', function (sp_api, sp, spAction) {

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

          scope.action_data = spAction.get_action_data;

        }

      };

    });

}());
