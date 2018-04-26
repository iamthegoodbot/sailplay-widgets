(function () {

  angular.module('ui', [
    'angularUtils.directives.dirPagination'
  ])


    .constant('ProfileTag', 'Клиент заполнил профиль')

    .directive('fillProfile', function (SailPlay, $rootScope, $q, ProfileTag, ipCookie, SailPlayApi) {

      return {

        restrict: 'A',
        scope: true,
        link: function (scope) {

          var new_form = {

            user: {

              addPhone: '',
              addEmail: '',
              birthDate: ''

            },
            custom_vars: {

              'В браке': '',
              'Имя супруга(и)': '',
              'ДР супруга(и)': '',
              'Дети': 'Нет',
              'hide_hist': 'Нет'

            },
            tags: [],
            hide_hist: false

          };

          scope.$watch(function () {
            return angular.toJson([SailPlayApi.data('load.user.info')()]);
          }, function () {

            var user = SailPlayApi.data('load.user.info')();

            if (!user) return;
            scope.profile_form = angular.copy(new_form);
            scope.profile_form.user.auth_hash = SailPlay.config().auth_hash;
            //angular.extend(scope.profile_form.user, user.user);
            //scope.profile_form.user.addPhone = user.user.phone;
            scope.profile_form.user.addEmail = user.user.email;
            scope.profile_form.user.birthDate = user.user.birth_date || '0000-00-00';

            SailPlay.send('vars.batch', { names: Object.keys(new_form.custom_vars) });
            SailPlay.on('vars.batch.success', function (res) {
              if (res.status == 'ok') {
              
                angular.forEach(res.vars, function( v ) { 
                  scope.profile_form.custom_vars[v.name] = v.value
                })

                scope.$apply();                

              } else {
                $rootScope.$broadcast('notifier:notify', {

                  header: 'Ошибка',
                  body: user_res.message || 'К сожалению произошла ошибка'

                });
                scope.$apply();
              }
            });

          });

          scope.toggle_tag = function (arr, tag) {

            if (!tag) return;

            var index = arr.indexOf(tag);

            if (index > -1) {

              arr.splice(index, 1);

            }
            else {

              arr.push(tag);

            }

          };

          scope.submit_profile = function (form, callback) {

            if (!form.$valid) {
              return;
            }

            var data_user = SailPlayApi.data('load.user.info')() && SailPlayApi.data('load.user.info')().user;

            var req_user = angular.copy(scope.profile_form.user);
            //console.log(data_user.phone, req_user.addPhone);

            if (data_user && data_user.phone == req_user.addPhone) {
              delete req_user.addPhone;
            }

            if (data_user && data_user.email == req_user.addEmail) {
              delete req_user.addEmail;
            }

            SailPlay.send('users.update', req_user, function (user_res) {

              if (user_res.status === 'ok') {

                var req_tags = angular.copy(scope.profile_form.tags);

                req_tags.push(ProfileTag);


                function chunk(array, chunkSize) {
                  return [].concat.apply([],
                    array.map(function (elem, i) {
                      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                    })
                  );
                }

                var chunked_tags = chunk(req_tags, 10);

                var tag_promises = [];

                angular.forEach(chunked_tags, function (chunk) {

                  var promise = $q(function (resolve, reject) {

                    SailPlay.send('tags.add', { tags: chunk }, function (tags_res) {
                      if (tags_res.status === 'ok') {

                        resolve(tags_res);

                        //sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
                      }
                      else {
                        reject(tags_res);
                        //sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
                      }
                    });

                  });

                  tag_promises.push(promise);

                });

                $q.all(tag_promises).then(function (tags_res) {

                  var _variables = angular.copy(scope.profile_form.custom_vars);

                  if (!_variables['Имя супруга(и)']) {
                    delete _variables['Имя супруга(и)']
                  }

                  if (_variables['ДР супруга(и)'] == '0000-00-00') {
                    delete _variables['ДР супруга(и)']
                  }

                  SailPlay.send('vars.add', { custom_vars: _variables }, function (vars_res) {

                    var response = {
                      user: user_res,
                      tags: tags_res,
                      vars: vars_res
                    };

                    if (vars_res.status === 'ok') {

                      ipCookie('profile_form', scope.profile_form);

                      $rootScope.$broadcast('notifier:notify', {

                        header: 'Спасибо',
                        body: 'Данные профиля сохранены'

                      });

                      SailPlayApi.call('load.user.info', { all: 1, purchases: 1 });

                      callback && callback(response);
                      scope.$apply();


                    }
                    else {

                      $rootScope.$broadcast('notifier:notify', {

                        header: 'Ошибка',
                        body: user_res.message || 'К сожалению произошла ошибка'

                      });
                      scope.$apply();

                    }

                  });

                });


              }

              else {
                $rootScope.$broadcast('notifier:notify', {

                  header: 'Ошибка',
                  body: $rootScope.locale.errors[user_res.status_code] || $rootScope.locale.errors[user_res.message] || 'К сожалению произошла ошибка'

                });
                $rootScope.$apply();
              }

            });

          };

        }

      };

    })

    .filter('tel', function () {
      return function (tel) {
        if (!tel) {
          return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
          return tel;
        }

        var country, city, number;

        switch (value.length) {
          case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

          case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

          case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

          default:
            return tel;
        }

        if (country == 1) {
          country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3, 5) + '-' + number.slice(5);

        return (country + " (" + city + ") " + number).trim();
      };
    })

    .directive('overlayClick', function () {

      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, elm, attrs) {

          elm.on('click', function (e) {
            if (e.target === elm[0]) {
              scope.$apply(function () {
                scope.$eval(attrs.overlayClick);
              });
            }
          });

        }
      };

    })

    .controller('slick_config', function ($scope) {

      $scope.gift_slider_config = {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 150,
        infinite: false,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      };

      $scope.action_slider_config = {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 150,
        infinite: false,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      };

    })

    .directive('slickCarousel', function ($compile, $timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          scope.hidden = true;

          var $element = $(element);

          function toggle(state) {

            if (state) {
              $element.css('opacity', 1);
            }
            else {
              $element.css('opacity', 0);
            }

          }

          var options = scope.$eval(attrs.options) || {
            infinite: false,
            nextArrow: '<img class="slider_arrow right" src="https://d3sailplay.cdnvideo.ru/media/assets/assetfile/0a6b55e204cb27ad24799aa634a5a89f.png"/>',
            prevArrow: '<img class="slider_arrow left" src="https://d3sailplay.cdnvideo.ru/media/assets/assetfile/bbe8e74981f17405a856c029f6e1548d.png"/>',
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
              {
                breakpoint: 1190,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4
                }
              },
              {
                breakpoint: 880,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
          };

          scope.process = false;

          scope.$watchCollection(function () {
            return $element.find('[data-slick-slide]').not('.ng-hide');
          }, function () {
            if (!scope.process) {
              scope.process = true;
              toggle(false);
              if ($element.hasClass('slick-initialized')) {
                $element.slick('removeSlide', null, null, true);
                $element.slick('unslick');
              }
              $timeout(function () {

                $element.slick(options);
                $element.slick('slickUnfilter');
                $element.slick('slickFilter', ':not(.ng-hide)');
                toggle(true);
                scope.process = false;
              }, 500);
            }

          });

          //var parent = $(element).parent();
          //console.dir(parent);


        }

      };
    })

    .directive('notifier', function () {

      return {

        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/ui/ui.notifier.html',
        link: function (scope) {

          var new_data = {

            header: '',
            body: ''

          };

          scope.$on('notifier:notify', function (e, data) {

            scope.data = data;
            scope.show_notifier = true;
            console.log('notifier: ' + data.body);

          });

          scope.reset_notifier = function () {
            scope.data = angular.copy(new_data);
            scope.show_notifier = false;
          };

          scope.reset_notifier();

        }

      }

    })

    .directive('phoneMask', function ($timeout) {

      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {

          ngModel.$validators.phone = function (modelValue, viewValue) {
            var value = (modelValue || viewValue || '').replace(/\D/g, '');
            if (!value) return true;
            return /^[0-9]{11}$/.test(value);
          };

          $timeout(function () {
            $(elm).mask('+7(000) 000-00-00', { placeholder: "+7(___)___-__-__" });
          }, 10);

        }
      };

    })

    .directive('selectize', function ($timeout) {

      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {

          $timeout(function () {
            $(elm).selectize({});
          }, 0);

        }
      };

    })

    .directive('dateSelector', function ($parse) {

      return {
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        link: function (scope, elm, attrs, ngModelCtrl) {

          scope.selected_date = ['', '', ''];

          ngModelCtrl.$formatters.push(function (modelValue) {
            return modelValue ? angular.copy(modelValue).split('-').reverse() : ['', '', ''];
          });

          ngModelCtrl.$render = function () {
            scope.selected_date = angular.copy(ngModelCtrl.$viewValue);
          };

          ngModelCtrl.$parsers.push(function (viewValue) {

            var new_date = scope.selected_date && scope.selected_date.some(function (value) {
              return value && value !== '';
            }) ? angular.copy(scope.selected_date).reverse().join('-') : '';

            return new_date;

          });

          scope.$watchCollection('selected_date', function () {

            ngModelCtrl.$setViewValue(angular.copy(scope.selected_date));

          });


        }
      };

    });

}());
