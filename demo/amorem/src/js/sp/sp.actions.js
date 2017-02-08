(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          "name": 'Пригласить друга',
          "class": 'this-icon-05'
        }
      },
      "social": {
        "fb": {
          "like": {
            "name": "Вступить в группу в Facebook",
            "descr": "Описание действия",
            "class": "this-icon-04",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании в Facebook",
            "descr": "Описание действия",
            "class": "this-icon-04",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке в Facebook",
            "descr": "Описание действия",
            "class": "this-icon-04",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          }
        },
        "vk": {
          "like": {
            "name": "Вступить в группу в Вконтакте",
            "descr": "Описание действия",
            "class": "this-icon-01",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании в Вконтакте",
            "descr": "Описание действия",
            "class": "this-icon-01",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке в Вконтакте",
            "descr": "Описание действия",
            "class": "this-icon-01",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          }
        },
        "ok": {
          "like": {
            "name": "Вступить в группу в Одноклассниках",
            "descr": "Описание действия",
            "class": "this-icon-03",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать в Одноклассниках",
            "descr": "Описание действия",
            "class": "this-icon-03",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке в Одноклассниках",
            "descr": "Описание действия",
            "class": "this-icon-01",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
              }
            }
          }
        },
        "tw": {
          "partner_page": {
            "name": "Рассказать в Twitter",
            "descr": "Описание действия",
            "class": "this-icon-02",
            "styles": {
              "tw_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "height": "100%",
                "text-decoration": "none",
                "color": "black",
                "width": "100%",
                "font-weight": "normal",
                "left": "0",
                "top": "0",
                "font-size": "14px",
                "line-height": "43px",
                "cursor": "pointer",
                "display": "inline-block",
                "position": "absolute",
                "max-width": "175px"
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

    .directive('sailplayActions', function (sp_api, sp, spAction, tagHelper, $rootScope, $filter) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');

          scope.actions_custom = sp_api.data('load.actions.custom.list');

          scope.open_custom = null;

          scope.check_tag = tagHelper.checkTag;

          /**
           * Проверка действия на вхождения в список actions_data
           * @param action
           * @returns {Number|boolean|*}
           */
          scope.check_in_list = function (action) {
            return scope.action_data(action) && Object.keys(scope.action_data(action)).length && (!scope.action_data(action).tag || scope.action_data(action).tag && scope.exist && scope.exist() && scope.check_tag(scope.action_data(action).tag, scope.exist()) ) || false
          };

          /**
           * Выполнение действия
           * @param action
           */
          scope.perform_action = function (action) {
            sp.send('actions.perform', action);
          };

          scope.show_action = null;

          sp.on('actions.perform.success', function (res) {

            $rootScope.$apply(function () {

              var msg = '', header = '';
              if (res.data.response.status == 'ok') {
                header = 'Поздравляем, задание выполнено!';
                msg = 'Вам начиcленно: ' + res.data.response.points + ' ' + $filter('sailplay_pluralize')(res.data.response.points, 'гармония,гармонии,гармоний') + '</span>'
              } else {
                header = 'Ошибка';
                msg = res.data.response.message;
              }
              $rootScope.$broadcast('notify:show', {
                title: header,
                text: msg
              });
              scope.show_action = null;
            })

          });

          /**
           * Показать действие в попапе
           * @param action
           */
          scope.showAction = function (action) {
            scope.show_action = action;
          };

          scope.show_custom_action = null;


          /**
           * Проверка наличия тега
           * @param tags
           * @param array
           * @returns {boolean}
           */
          scope.check_for_exist = function (tag, array) {
            if (!tag || !array) return false;
            return scope.check_tag(tag, array);
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
