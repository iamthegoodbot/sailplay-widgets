(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          name: 'Пригласить друга или подругу',
          notify: 'приглашения друга или подруги',
          pic: 'task-icon-01.png'
        }
      },
      "social": {
        "fb": {
          "partner_page": {
            "name": "Рассказать о магазине в Facebook",
            "notify": 'рассказ о магазине в Facebook',
            "pic": "task-icon-02.png"
          },
          "like": {
            "name": "Вступить в группу Facebook",
            "notify": 'вступление в группу Facebook',
            "pic": "task-icon-02.png"
          },
          "purchase": {
            "name": "Рассказать о покупке в Facebook",
            "notify": 'рассказ о покупке в Facebook',
            "pic": "task-icon-02.png"
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

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/f399637e86da6713744c19ad4aced613.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    })

    .directive('sailplayActions', function (sp_api, sp, spAction, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');

          scope.exist = sp_api.data('tags.exist');

          scope.custom_action = $rootScope.config.customActions;

          scope.check_in_list = function (action) {
            return scope.action_data(action) && Object.keys(scope.action_data(action)).length || false
          };

          scope.perform_action = function (action) {

            sp.send('actions.perform', action);

          };

          scope.open_custom_action = function(action){

            var url = action.href + '?id=' + action.id;

            var params = {};

            var win = window.open(url, action.name, params);

            win.onbeforeunload = function(){

              scope.$emit('update');

            }

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
