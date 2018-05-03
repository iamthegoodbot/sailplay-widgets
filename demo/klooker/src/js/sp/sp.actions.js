(function () {

  angular.module('sp.actions', [])

    .constant('actions_data',{
      "system": {
        "inviteFriend": {
          name: 'Invite a Friend',
          pic: 'dist/img/icon_add.png'
        }
      },
      "social": {
        "fb": {
          "partner_page": {
            "name": "Tell about Klooker on Facebook",
            "pic": "dist/img/icon_fb.png"
          },
          "purchase": {
            "name": "Tell about your purchase on Facebook",
            "pic": "dist/img/icon_sh.png"
          }
        }
      }
    })

    .directive('sailplayActions', function(sp_api, sp, actions_data){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          scope.actions = sp_api.data('load.actions.list');

          scope.perform_action = function(action){

            sp.send('actions.perform', action);

          };

          sp.on('actions.perform.success', function(res){

            scope.$apply(function(){

              scope.on_perform && scope.on_perform(res);

            });


          });

          scope.action_data = function(action){

            var data = {};

            if(!action) return data;

            data = action;

            if(action.socialType) data = actions_data.social[action.socialType][action.action];

            if(actions_data.system[action.type]) data = actions_data.system[action.type];

            return data;

          };

        }

      };

    })

    .directive('sailplayAction', function(sp){

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function(scope, elm){

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    });

}());
