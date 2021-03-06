(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          "name": 'Пригласить друга',
          "image": ""
        }
      },
      "social": {
        "fb": {
          "like": {
            "name": "Вступить в группу",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/fdb5bdd5f14dba7c41d8e9fa1fcba191.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Поделиться мнением о магазине",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/fdb5bdd5f14dba7c41d8e9fa1fcba191.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/fdb5bdd5f14dba7c41d8e9fa1fcba191.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "vk": {
          "like": {
            "name": "Вступить в группу",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/473e8b46c2c014e7da9cda5ac60807a0.png",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Поделиться мнением о магазине",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/473e8b46c2c014e7da9cda5ac60807a0.png",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/473e8b46c2c014e7da9cda5ac60807a0.png",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "tw": {
          "partner_page": {
            "name": "Поделиться мнением о магазине",
            "image": "//sailplays3.cdnvideo.ru/media/assets/assetfile/9ff98aace20ecc079879c677a96725d0.png",
            "styles": {
              "tw_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "15px",
                "line-height": "34px",
                "background-color": "#FF0037",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        }
      }
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

    .directive('sailplayActions', function (sp_api, sp, spAction, tagHelper, $rootScope, $filter, $timeout, $q) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = [];

          scope.actionsWithCompleted = [];

          scope.show = null;

          scope.action_data = spAction.get_action_data;

          var share_action = null;

          $rootScope.$on('action:get', function (e, action) {
            scope.show = action;
          });

          function getAllActions() {

            return $q(function(resOuter){
              $q(function(res){
                SAILPLAY.jsonp.get('//sailplay.ru/js-api/1655/actions/custom/list/', {}, function(data){
                  res(data.actions)
                })
              }).then(function(res){
                SAILPLAY.jsonp.get('//sailplay.ru/js-api/1655/actions/load/', {}, function(data){
                  resOuter({
                    custom: res,
                    basic: data.data.actions
                  })
                })
              })
            })
          
          }

          scope.createActions = function (new_val, old_val) {
            
            var actions = [];

            var allActionsArray = []

            var allActions = getAllActions()

            if (sp_api.data('load.actions.list')() && sp_api.data('load.actions.list')().actions) {
              actions = actions.concat(sp_api.data('load.actions.list')().actions);
            }

            if (sp_api.data('load.actions.custom.list')() && sp_api.data('load.actions.custom.list')()) {
              actions = actions.concat(sp_api.data('load.actions.custom.list')());
            }

            console.log(actions)

            scope.actions = angular.copy(actions);

            allActions.then(function(allActionsObj){
              if (sp_api.data('load.actions.list')() && sp_api.data('load.actions.list')().actions) {
                var basicActions = sp_api.data('load.actions.list')().actions
                allActionsArray = allActionsArray.concat(
                  allActionsObj.basic.reduce(function(acc, action){
                    var isNotCompleted = basicActions.some(function(item){
                      return item._actionId == action._actionId
                    })
                    action.isCompleted = !isNotCompleted
                    return acc.concat(action)
                  }, [])
                )
              }
              if (sp_api.data('load.actions.custom.list')() && sp_api.data('load.actions.custom.list')()) {
                var customActions = sp_api.data('load.actions.custom.list')()
                allActionsArray = allActionsArray.concat(
                  allActionsObj.custom.reduce(function(acc, action){
                    var isNotCompleted = customActions.some(function(item){
                      return item.id == action.id
                    })
                    action.isCompleted = !isNotCompleted
                    return acc.concat(action)
                  }, [])
                )
              }

              scope.actionsWithCompleted = allActionsArray
              console.info(allActionsArray)

            })



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

            share_action = res && res.data && res.data.action;

            if(share_action && share_action.socialType){
              var tag = scope.action_data(share_action).name + ' в ' + share_action.socialType;
              sp_api.call('tags.add', {tags: [tag]});
              share_action = null;
            }

            $rootScope.$apply(function () {

              scope.show = null;

              var msg = '', header = '';
              if (res.data.response.status == 'ok') {
                header = 'Поздравляем, задание выполнено!';
                msg = 'Вам начиcленно: ' + res.data.response.points + ' ' + $filter('sailplay_pluralize')(res.data.response.points, 'балл,балла,баллов') + '</span>'
              } else {
                header = 'Ошибка';
                msg = res.data.response.message;
              }

              $rootScope.$broadcast('notify:show', {
                title: header,
                text: msg
              });

            });
          });

          scope.action_styles = function (action_data) {
            return action_data.styles && spAction.stringify_widget_css('', action_data.styles);
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
