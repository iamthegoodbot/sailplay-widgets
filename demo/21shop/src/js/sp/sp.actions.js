(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          "name": "Пригласи друга",
          "pic": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/a0273f8e9b78b5d75d627c58fb4b4d48.png"
        }
      },
      "social": {
        "fb": {
          "like": {
            "name": "Вступить в группу в Facebook",
            "pic": 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/aa537e5d90bf69989a466b38a393284e.png',
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "53px",
                "line-height": "53px",
                "text-decoration": "none",
                "color": "#ffffff",
                "width": "100%",
                "font-weight": "bold",
                "left": "0",
                "top": "0",
                "font-size": "22px",
                "cursor": "pointer",
                "text-transform": "uppercase",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании в Facebook",
            "pic": 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/ee95efb204e9639d64daed60a436ac4e.png',
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "53px",
                "line-height": "53px",
                "text-decoration": "none",
                "color": "#ffffff",
                "width": "100%",
                "font-weight": "bold",
                "left": "0",
                "top": "0",
                "font-size": "22px",
                "cursor": "pointer",
                "text-transform": "uppercase",
                "display": "inline-block"
              }
            }
          },
          "purchases": {
            "name": "Рассказать о покупке в Facebook",
            "pic": 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/ee95efb204e9639d64daed60a436ac4e.png',
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "53px",
                "line-height": "53px",
                "text-decoration": "none",
                "color": "#ffffff",
                "width": "100%",
                "font-weight": "bold",
                "left": "0",
                "top": "0",
                "font-size": "22px",
                "cursor": "pointer",
                "text-transform": "uppercase",
                "display": "inline-block"
              }
            }
          }
        },
        "vk": {
          "like": {
            "name": "Вступить в группу в Вконтакте",
            "pic": 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/f9a204c5581d35e6388b53352a373b96.png',
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "53px",
                "line-height": "53px",
                "text-decoration": "none",
                "color": "#ffffff",
                "width": "100%",
                "font-weight": "bold",
                "left": "0",
                "top": "0",
                "font-size": "22px",
                "cursor": "pointer",
                "text-transform": "uppercase",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании в Вконтакте",
            "pic": 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/ab80c674a8e93026c1fb73a357e732e4.png',
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "53px",
                "line-height": "53px",
                "text-decoration": "none",
                "color": "#ffffff",
                "width": "100%",
                "font-weight": "bold",
                "left": "0",
                "top": "0",
                "font-size": "22px",
                "cursor": "pointer",
                "text-transform": "uppercase",
                "display": "inline-block"
              }
            }
          },
          "purchases": {
            "name": "Рассказать о покупке в Вконтакте",
            "pic": 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/ab80c674a8e93026c1fb73a357e732e4.png',
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "53px",
                "line-height": "53px",
                "text-decoration": "none",
                "color": "#ffffff",
                "width": "100%",
                "font-weight": "bold",
                "left": "0",
                "top": "0",
                "font-size": "22px",
                "cursor": "pointer",
                "text-transform": "uppercase",
                "display": "inline-block"
              }
            }
          }
        }
      }
    })

    // .constant('custom_data', [])

    .service('spAction', function (actions_data) {

      var self = this;

      self.stringify_widget_css = function(prefix, obj){

        var css_string = '';

        for(var selector in obj){

          if(obj.hasOwnProperty(selector)){

            css_string += prefix + ' .' + selector + '{ ';

            var selector_styles = obj[selector];

            for(var prop in selector_styles){

              if(selector_styles.hasOwnProperty(prop)) {

                css_string += prop + ':' + selector_styles[prop] + ' !important;';

              }

            }

            css_string += ' }';

          }

        }

        return css_string;

      };

      self.get_action_data = function (action) {

        var data = {};

        if (!action) return data;

        if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

        if (actions_data.system[action.type]) data = actions_data.system[action.type];

        return data;

      };

      return self;

    })

    .directive('sailplayAction', function (sp, $rootScope, $compile, $timeout) {
      
      var init_state;
      
      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          init_state = elm[0].innerHTML;

          elm.on('click', function(e){
            e.preventDefault();
          });

          function parse_action(action){
            $timeout(function(){
              attrs.styles && elm.attr('data-styles', attrs.styles);
              attrs.text && elm.attr('data-text', attrs.text);
              sp.actions && action && sp.actions.parse(elm[0], action);
            }, 0);
          }

          scope.$watch('action', function(new_value){
            if(new_value){
              elm.append($compile(init_state)(scope.$parent));
              parse_action(new_value);
            }
          });

        }

      };

    })

    /**
     * @ngdoc directive
     * @name sailplay.actions.directive:sailplayActionCustom
     * @scope
     * @restrict A
     *
     * @description
     * Renders SailPlay custom action in element.
     *
     * @param {object}  action   A SailPlay custom action object, received from api.
     *
     */
    .directive('sailplayActionCustom', function (sp, $document) {

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          var iframe = $document[0].createElement('iframe');
          var name = 'default';

          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency = "true";

          elm.append(iframe);

          scope.$watch('action', function (action) {

            if (action) {

              var config = sp.config();

              iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang + '&config=' + name))) || '';

              iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

            }
            else {
              iframe.src = '';
            }

          });

        }

      };

    })

    .directive('sailplayActions', function (sp_api, sp, spAction, tagHelper) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');

          scope.custom_actions = sp_api.data('load.actions.custom.list');

          scope.exist = sp_api.data('tags.exist');

          scope.open_custom = null;

          // scope.customs = custom_data;

          scope.check_tag = tagHelper.checkTag;

          scope.check_in_list = function (action) {
            return scope.action_data(action) && Object.keys(scope.action_data(action)).length && (!scope.action_data(action).tag || scope.action_data(action).tag && scope.exist && scope.exist() && scope.check_tag(scope.action_data(action).tag, scope.exist()) ) || false
          };

          scope.perform_action = function (action) {

            sp.send('actions.perform', action);

          };

          scope.action_styles = function (action_data) {
            return action_data.styles && spAction.stringify_widget_css('', action_data.styles);
          };
          
          scope.action_data = spAction.get_action_data;

          scope.edit_profile = function () {
            scope.$emit('profile:open');
          };

        }

      };

    });

}());
