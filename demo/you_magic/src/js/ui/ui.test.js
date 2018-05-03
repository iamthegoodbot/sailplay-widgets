/**
 * Created by awesome on 13.07.16.
 */
(function () {

  angular.module('ui.test', [])

    .constant('TAGS_ADD_LIMIT', 10)

    .directive('uiTest', function (sp, sp_api, $rootScope, TAGS_ADD_LIMIT) {

      return {

        restrict: 'E',
        replace: false,
        templateUrl: '/html/ui/ui.test.html',
        scope: {
          step: '=?',
          materials: '=?'
        },
        link: function (scope, el, attr) {

          scope.model = {};

          scope.area = null;

          scope.show_area = function () {

            if (scope.step && scope.model && scope.model[scope.step] && angular.isArray(scope.model[scope.step]) && scope.model[scope.step].length) {

              var _len = scope.model[scope.step].filter(function (item) {

                return item.writable;

              });

              return _len && _len.length ? true : false;

            } else {

              return false;

            }

          };

          scope.get_checked = function (item) {

            if (scope.model[scope.step]) {

              return scope.model[scope.step].filter(function (it) {
                  return it.tag == item.tag
                })[0] || false;

            } else {

              return false;

            }

          };

          scope.prev = function () {

            scope.step = scope.step - 1;

            scope.area = scope.get_value_for_area() ? scope.get_value_for_area().model : null;

          };

          scope.get_value_for_area = function () {

            var _model = scope.model[scope.step] && scope.model[scope.step].filter(function (item) {

                return item.writable;

              });

            return _model && _model.length ? _model[0] : null;
          };

          scope.on_change = function (item, value, type) {

            if (type == 'radio') {

              scope.model[scope.step] = [item];

            } else if (type == 'checkbox') {

              scope.model[scope.step] = angular.isArray(scope.model[scope.step]) ? scope.model[scope.step] : [];

              if (!value) {

                scope.model[scope.step] = scope.model[scope.step].filter(function (it) {
                  return it.label !== item.label;
                });

              } else {

                scope.model[scope.step].push(item);

              }

            }

          };

          scope.is_selectable = function () {
            return scope.model && scope.step && scope.model[scope.step] && scope.model[scope.step].length ? scope.get_value_for_area() ? scope.area : true : false;
          };

          scope.next = function () {

            var _area = scope.area;

            if (scope.get_value_for_area()) {

              for (var i = 0, len = scope.model[scope.step].length; i < len; i++) {

                if (scope.get_value_for_area().tag == scope.model[scope.step][i].tag) {

                  scope.model[scope.step][i].model = _area;

                }

              }

            }

            scope.area = null;

            if (scope.step == scope.materials.data.length) {

              finish_him();

            } else {

              scope.step = scope.step + 1;

            }

          };

          scope.clear = function () {

            $rootScope.$broadcast('notifier:notify', {

              header: 'Спасибо!',
              body: 'Нам очень важна информация о наших клиентах. Гарантируем, мы будем использовать её разумно и не передавать третьим лицам.'

            });

            $(el).find('.bns_overlay_opros').fadeOut(400, function () {

              scope.step = 1;

              scope.model = {};

              scope.materials = {};

              scope.$digest();

            });

          };

          function finish_him() {

            var _data = angular.copy(scope.model);

            var _send_data = {
              vars: [],
              tags: []
            };

            angular.forEach(_data, function (data_item) {

              angular.forEach(data_item, function (item) {

                if (item.writable) {

                  _send_data.vars[item.tag.slice(0, 100)] = item.model;

                }

                _send_data.tags.push(item.tag.slice(0, 100));


              })

            });

            _send_data.tags.push(scope.materials.tag.slice(0, 100));

            tags_add(_send_data.tags.slice(0, TAGS_ADD_LIMIT));

            function tags_add(tags) {

              sp_api.call('tags.add', {tags: tags}, function () {

                _send_data.tags = _send_data.tags.slice(TAGS_ADD_LIMIT);

                if (_send_data.tags.length != 0) {

                  tags_add(_send_data.tags.slice(0, TAGS_ADD_LIMIT));

                  return;

                }

                if (Object.keys(_send_data.vars).length) {

                  sp_api.call('vars.add', {custom_vars: _send_data.vars}, function () {

                    scope.clear();

                  });

                } else {

                  scope.clear();

                }

              })

            }

          }


          $(el).on('click', '.bns_overlay, .close_overlay', function (e) {
            scope.step = 1;
            scope.model = {};
          }).on('click', '.bns_overlay_iner', function (e) {
            e.stopPropagation();
          });

        }

      }

    })

}());