(function () {

  angular.module('sp.actions', [])

    .service('actions_data', function ($rootScope) {
      var default_data = {
        "system": {
          "inviteFriend": {
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/64e9e256af12573ae97a7e9dc22297a4.png",
            "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/e78e9f5ba99b40b3ccb0555ee00c983e.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "bold",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "18px",
                "line-height": "20px",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "social": {
          "fb": {
            "like": {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/bddfada95d885611c8dbcfd3d8b4c6a0.png",
              "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c12fd472b45e6d0ecee244d4d9d2216.png",
              "styles": {
                "fb_share_btn": {
                  "font-family": "Arial",
                  "box-sizing": "border-box",
                  "width": "100%",
                  "height": "100%",
                  "text-decoration": "none",
                  "color": "white",
                  "font-weight": "bold",
                  "position": "absolute",
                  "left": "0",
                  "top": "0",
                  "font-size": "18px",
                  "line-height": "20px",
                  "cursor": "pointer",
                  "display": "inline-block"
                }
              }
            },
            "partner_page": {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/bddfada95d885611c8dbcfd3d8b4c6a0.png",
              "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c12fd472b45e6d0ecee244d4d9d2216.png",
              "styles": {
                "fb_share_btn": {
                  "font-family": "Arial",
                  "box-sizing": "border-box",
                  "width": "100%",
                  "height": "100%",
                  "text-decoration": "none",
                  "color": "white",
                  "font-weight": "bold",
                  "position": "absolute",
                  "left": "0",
                  "top": "0",
                  "font-size": "18px",
                  "line-height": "20px",
                  "cursor": "pointer",
                  "display": "inline-block"
                }
              }
            },
            "purchase": {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/bddfada95d885611c8dbcfd3d8b4c6a0.png",
              "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c12fd472b45e6d0ecee244d4d9d2216.png",
              "styles": {
                "fb_share_btn": {
                  "font-family": "Arial",
                  "box-sizing": "border-box",
                  "width": "100%",
                  "height": "100%",
                  "text-decoration": "none",
                  "color": "white",
                  "font-weight": "bold",
                  "position": "absolute",
                  "left": "0",
                  "top": "0",
                  "font-size": "18px",
                  "line-height": "20px",
                  "cursor": "pointer",
                  "display": "inline-block"
                }
              }
            }
          }
        }
      };
      if($rootScope.locale.actions){
        angular.merge(default_data, $rootScope.locale.actions);
      }
      return default_data;
    })

    .service('spAction', function (actions_data) {

      var self = this;

      self.stringify_widget_css = function (prefix, obj) {

        var css_string = '';

        for (var selector in obj) {

          if (obj.hasOwnProperty(selector)) {

            css_string += prefix + ' .' + selector + '{ ';

            var selector_styles = obj[selector];

            for (var prop in selector_styles) {

              if (selector_styles.hasOwnProperty(prop)) {

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

          elm.on('click', function (e) {
            e.preventDefault();
          });

          function parse_action(action) {
            $timeout(function () {
              attrs.styles && elm.attr('data-styles', attrs.styles);
              attrs.text && elm.attr('data-text', attrs.text);
              sp.actions && action && sp.actions.parse(elm[0], action);
            }, 0);
          }

          scope.$watch('action', function (new_value) {
            if (new_value) {
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

          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency = "true";

          elm.append(iframe);

          scope.$watch('action', function (action) {

            if (action) {

              var config = sp.config();

              iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang))) || '';

              iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

            }
            else {
              iframe.src = '';
            }

          });

        }

      };

    })

    .directive('sailplayActions', function (sp_api, sp, spAction, tagHelper, $rootScope, $filter, $timeout) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = [];

          scope.show = null;

          scope.action_data = spAction.get_action_data;

          $rootScope.$on('action:get', function (e, action) {
            scope.show = action;
          });

          scope.createActions = function (new_val, old_val) {

            var actions = [];

            if (sp_api.data('load.actions.list')() && sp_api.data('load.actions.list')().actions) {
              actions = actions.concat(sp_api.data('load.actions.list')().actions);
            }

            if (sp_api.data('load.actions.custom.list')() && sp_api.data('load.actions.custom.list')()) {
              actions = actions.concat(sp_api.data('load.actions.custom.list')());
            }

            scope.actions = angular.copy(actions);

          };

          /**
           * Выполнение действия
           * @param action
           */
          scope.perform_action = function (action) {
            sp.send('actions.perform', action);
          };

          sp.on('actions.perform.success', function (res) {

            sp_api.call('load.actions.list');

            sp_api.call('load.actions.custom.list');

            $rootScope.$apply(function () {

              scope.show = null;

              var msg;

              if (res.data.response.status == 'ok') {
                msg = {
                  title: $filter('translate')('actions_messages.success.title'),
                  text: $filter('translate')('actions_messages.success.text') + res.data.response.points + ' ' + $filter('sailplay_pluralize')(res.data.response.points, $filter(translate)('pluralize.points'))
                };
              } else {
                msg = {
                  title: $filter('translate')('actions_messages.error.title'),
                  text: res.data.response.message || $filter('translate')('actions_messages.error.text')
                };
              }

              $rootScope.$broadcast('notify:show', msg);

            });
          });

          scope.action_styles = function (action_data) {
            return action_data && action_data.styles && spAction.stringify_widget_css('', action_data.styles);
          };

          scope.$watch(function () {
            return angular.toJson([
              sp_api.data('load.actions.list')(),
              sp_api.data('load.actions.custom.list')()
            ])
          }, scope.createActions);

        }

      };

    });

}());
