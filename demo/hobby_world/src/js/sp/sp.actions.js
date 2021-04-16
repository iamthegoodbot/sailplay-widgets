(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          "name": 'Пригласить друга',
          "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/0b10e751214b35a8a3f6d02174e9aa46.svg"
        }
      },
      "social": {
        "fb": {
          "like": {
            "name": "Вступить в группу",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b5937fc2612788e203f83a55188594be.svg",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b5937fc2612788e203f83a55188594be.svg",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b5937fc2612788e203f83a55188594be.svg",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "vk": {
          "like": {
            "name": "Вступить в группу",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/aa74fd34380f7c4690844642f335df3b.svg",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/aa74fd34380f7c4690844642f335df3b.svg",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/aa74fd34380f7c4690844642f335df3b.svg",
            "styles": {
              "vk_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "ok": {
          "like": {
            "name": "Вступить в группу",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b7d40fde4b0a8def42dcffae1d6d5850.svg",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о компании",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b7d40fde4b0a8def42dcffae1d6d5850.svg",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          },
          "purchase": {
            "name": "Рассказать о покупке",
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b7d40fde4b0a8def42dcffae1d6d5850.svg",
            "styles": {
              "ok_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
                "cursor": "pointer",
                "display": "inline-block"
              }
            }
          }
        },
        "tw": {
          "partner_page": {
            "name": "Рассказать в Twitter",
            "styles": {
              "tw_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "#EF6747",
                "font-weight": "normal",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "border-radius": "35px",
                "font-size": "18px",
                "line-height": "55px",
                "background-color": "white",
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

    .directive('sailplayActions', function (sp_api, sp, spAction, tagHelper, $rootScope, $filter, $timeout) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = [];

          // scope.actions_config = {
          //   selector: '.bns_quest_main',
          //   data: {
          //     slidesPerRow: 4,
          //     rows: 2
          //   }
          // };


          scope.actions_config = {
            selector: '.bns_quest_main',
            data: {
              slidesToShow: 2,
              slide: '.bns_quest_wr',
              responsive: [
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
            }
          };

          scope.size = 8;

          scope.page = 0;

          // sp_api.data('load.actions.list')

          scope.show = null;

          scope.action_data = spAction.get_action_data;

          scope.getPage = function () {
            var from = scope.page * scope.size;
            var to = from + scope.size > scope.actions.length ? scope.actions.length : from + scope.size;
            return scope.actions.slice(from, to)
          };

          scope.createActions = function (new_val, old_val) {

            if ($(".bns_quest_main.slick-initialized").length) {
              $(".bns_quest_main.slick-initialized").slick('destroy');
            }

            var actions = [];
            var load_flag = [];

            if (sp_api.data('load.actions.list')() && sp_api.data('load.actions.list')().actions) {
              actions = actions.concat(sp_api.data('load.actions.list')().actions);
              load_flag.push(true);
            }

            if (sp_api.data('load.actions.custom.list')() && sp_api.data('load.actions.custom.list')()) {
              actions = actions.concat(sp_api.data('load.actions.custom.list')());
              load_flag.push(true);
            }

            if(load_flag.length == 2){
              scope.actions = angular.copy(actions);
            }

          };

          /**
           * Выполнение действия
           * @param action
           */
          scope.perform_action = function (action) {
            sp.send('actions.perform', action);
          };

          sp.on('actions.perform.success', function (res) {
            $rootScope.$apply(function () {

              sp_api.call('load.actions.list');

              sp_api.call('load.actions.custom.list');

              sp_api.call('load.user.info', {all: 1, purchases: 1});

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
