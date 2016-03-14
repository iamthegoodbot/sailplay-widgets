(function (angular, sp, jQuery) {

  angular.module('stalos.directives.actions', ['stalos.services.users', 'stalos.services.actions', 'stalos.tools.bDaySelect'])

    .directive('actionsCmp', ['userService', 'actionService', '$rootScope', function (userService, actionService, $rootScope) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <section class="l-section-wrap task-sec-wrap">\n        <div class="l-centered task-sec">\n            <h1 class="cell-head">Список заданий</h1>\n            <div class="cell-title">Выполняйте задания, чтобы получить дополнительные бонусы</div>\n\n            <div class="task-sec__row" data-ng-show="isActive()">\n\n                <div class="task-sec__col" data-ng-repeat="action in actions">\n                    <div class="task-item this-{{ action.socialType }}">\n                        <div class="task-item__img"><img data-ng-src="{{ getIcon(action)[0] }}" alt=""></div>\n                        <div class="task-item__text"> {{ transformTitle(action) }}</div>\n\n                        <div class="task-item__over">\n                            <div class="task-item__overimg"><img data-ng-src="{{ getIcon(action)[1] }}" alt=""></div>\n                            <span class="task-item__iframe" data-sp-action="{{ action._actionId }}"\n                                  data-styles="{{ cssLink }}"></span>\n                        </div>\n\n                        <div class="task-item__price" data-ng-bind="action.points"></div>\n                    </div>\n                </div>\n\n                <div class="task-sec__col" data-ng-if="!exist.profile">\n                    <div class="task-item this-task">\n                        <div class="task-item__img"><img src="image/task-icon-03.png" alt=""></div>\n                        <div class="task-item__text">Заполните профиль</div>\n\n                        <div class="task-item__over">\n                            <div class="task-item__overimg"><img src="image/task-icon-hover-03.png" alt=""></div>\n                            <div class="task-item__btn js-open-task"\n                                 data-ng-click="show.profile = true;">Выполнить\n                            </div>\n                        </div>\n\n                        <div class="task-item__price">150</div>\n                    </div>\n                </div>\n\n                <div class="task-sec__col" data-ng-if="!exist.doublePoints">\n                    <div class="task-item this-task">\n                        <div class="task-item__img"><img src="image/task-icon-04.png" alt=""></div>\n                        <div class="task-item__text">Удвоение бонусов по поводу 8-го марта</div>\n\n                        <div class="task-item__over">\n                            <div class="task-item__overimg"><img src="image/task-icon-hover-04.png" alt=""></div>\n                            <div class="task-item__btn js-open-task"\n                                 data-ng-click="show.doublePoints = true;">Выполнить\n                            </div>\n                        </div>\n\n                        <div class="task-item__price">x2</div>\n                    </div>\n                </div>\n\n            </div>\n\n            <div class="l-centered task-view-sec shaded-cell" data-ng-show="show.profile">\n                <div class="task-view-sec__img"><img src="image/task-view-02.png" alt=""></div>\n\n                <div class="task-view-sec__body">\n\n                    <div class="task-view-sec__head">Заполните профиль (все поля обязательные)</div>\n                    <form class="task-form" data-ng-submit="saveForm();">\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Имя</div>\n                            <input type="text" class="common-input"\n                                   data-ng-model="form.first_name"\n                                   placeholder="Укажите имя">\n                        </div>\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Фамилия</div>\n                            <input type="text" class="common-input"\n                                   data-ng-model="form.last_name"\n                                   placeholder="Укажите фамилию">\n                        </div>\n                        <div class="common-inp-set common-inp-set-sex">\n                            <div class="common-inp-title">Ваш пол</div>\n                            <div class="common-inline-param">\n                                <input type="radio" name="sex"\n                                       value="1" class="js-radio form-sex">\n                                <div class="common-inline-param__label js-label">муж.</div>\n                            </div>\n                            <div class="common-inline-param">\n                                <input type="radio" name="sex"\n                                       value="2" class="js-radio form-sex">\n                                <div class="common-inline-param__label js-label">жен.</div>\n                            </div>\n                        </div>\n\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Ваша дата рождения</div>\n                            <tools-bday\n                                    data-ng-if="show.profile" \n                                    data-model="form.bday"></tools-bday>\n                        </div>\n\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Телефон</div>\n                            <input type="text" class="common-input js-phone"\n                                   data-ng-model="form.phone"\n                                   placeholder="+7 (___) ___-__-__">\n                        </div>\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">E-mail</div>\n                            <input type="email" class="common-input"\n                                   data-ng-model="form.email"\n                                   placeholder="Укажите E-mail">\n                        </div>\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Город</div>\n                            <input type="text" class="common-input" data-ng-model="form.town"\n                                   placeholder="Город">\n                        </div>\n                        \n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Район</div>\n                            <input type="text" class="common-input" data-ng-model="form.area"\n                                   placeholder="Район">\n                        </div>\n                        \n                        <div class="common-inp-set" style="font-size: 0;">\n                            <div class="common-inp-title">Адрес</div>\n                            \n                            <input type="text" class="common-input" style="width: 46%;display: inline-block;margin-right: 2%;" data-ng-model="form.street"\n                                   placeholder="Улица">\n\n                            <input type="text" class="common-input" style="width: 20%;display: inline-block;margin-right: 2%;" data-ng-model="form.house"\n                                   placeholder="Дом">\n\n                            <input type="text" class="common-input" style="width: 30%;display: inline-block;" data-ng-model="form.apartment"\n                                   placeholder="Квартира">\n                        </div>\n                        \n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Социальный статус</div>\n                            <select name="" id="" data-ng-model="form.soc_status" class="js-select common-selectize">\n                                <option value="">Укажите социальный статус</option>\n                                <option value="работающий">работающий</option>\n                                <option value="студент">студент</option>\n                                <option value="безработный">безработный</option>\n                                <option value="пенсионер">пенсионер</option>\n                            </select>\n                        </div>\n\n                        <div class="common-inp-set" data-ng-show="form.soc_status == \'работающий\'">\n                            <div class="common-inp-title">Род занятий</div>\n                            <select name="" id="" data-ng-model="form.job" class="js-select common-selectize">\n                                <option value="">Укажите род занятий</option>\n                                <option value="бизнеc">бизнеc</option>\n                                <option value="госструктура">госструктура</option>\n                                <option value="муниципальные">муниципальные</option>\n                                <option value="здравоохранение">здравоохранение</option>\n                                <option value="образование и другое">образование и другое</option>\n                            </select>\n\n                        </div>\n\n                        <div class="common-inp-set">\n                            <div class="common-inp-title">Семейный статус</div>\n                            <select name="" id="" data-ng-model="form.fam_status" class="js-select common-selectize">\n                                <option value="">Укажите семейный статус</option>\n                                <option value="одинокие">одинокие</option>\n                                <option value="молодожены">молодожены</option>\n                                <option value="семейные без  детей">семейные без детей</option>\n                                <option value="семейные 1  ребенок">семейные 1 ребенок</option>\n                                <option value="семейные  2  и  более детей">семейные 2 и более детей</option>\n                            </select>\n                        </div>\n                        \n                        <div class="common-inp-set">\n                            <div class="common-inline-param">\n                                <input type="checkbox" name="agree"\n                                       class="js-checkbox form-agree">\n                                <div class="common-inline-param__label js-label"> Даю согласие на обработку моих персональных данных</div>\n                            </div>\n                        </div>\n\n                        <input type="submit" class="common-submit task-form__sub"\n                               value="Сохранить">\n\n                    </form>\n                    <!-- /task-form -->\n\n                </div>\n                <!-- /body -->\n\n                <div class="task-view-sec__bonus">150</div>\n                <div class="close-this-cell js-close-this" data-ng-click="clear();"><img src="image/close-cross.png"\n                                                                                         alt=""></div>\n            </div>\n\n            <div class="l-centered task-view-sec shaded-cell" data-ng-show="show.doublePoints">\n                <div class="task-view-sec__img"><img src="image/task-view-01.png" alt=""></div>\n\n                <div class="task-view-sec__body">\n\n                    <div class="task-view-sec__head">Бонусы на 8-е марта</div>\n                    <div class="task-view-sec__text">Покупайте товары в период с 07.03.2016 по 09.03.2016 и получайте в\n                        два раза больше бонусов за каждую покупку.\n                    </div>\n                </div>\n                <!-- /body -->\n\n                <div class="task-view-sec__bonus">x2</div>\n                <div class="close-this-cell js-close-this" data-ng-click="clear();"><img src="image/close-cross.png"\n                                                                                         alt=""></div>\n            </div>\n\n        </div>\n    </section>\n\n</div>',
        scope: true,
        link: function (scope) {
          scope.show = {};
          scope.actions = {};
          scope.exist = {};
          scope.form = {
            first_name: null,
            last_name: null,
            sex: null,
            bday: [],
            phone: null,
            email: null,
            town: null,
            area: null,
            street: null,
            house: null,
            apartment: null,
            soc_status: null,
            job: null,
            fam_status: null,
            agree: false
          };
          scope.cssLink = actionService.getActionsCssLink();
          scope.clear = function () {
            scope.show = {};
          };
          function update() {
            scope.clear();
            userService.loadInfo().then(function (user) {
              scope.user = user;
              scope.form.first_name = user.user.first_name;
              scope.form.last_name = user.user.last_name;
              scope.form.sex = user.user.sex;
              scope.form.email = user.user.email;
              scope.form.phone = user.user.phone;
              scope.form.sex = user.user.sex;
              if (user.user.birth_date) {
                scope.form.bday[0] = parseInt(user.user.birth_date.split('-')[2]);
                scope.form.bday[1] = parseInt(user.user.birth_date.split('-')[1]);
                scope.form.bday[2] = parseInt(user.user.birth_date.split('-')[0]);
              }
              scope.$digest();
            });
            actionService.loadList().then(function (actions) {
              scope.actions = actions;
              setTimeout(function () {
                scope.initSocials(actions);
                scope.$digest();
              }, 10);
              scope.$digest();
            });
          }

          userService.existTags([
            actionService.getTags().profile,
            actionService.getTags().doublePoints
          ]).then(function (data) {
            scope.exist.profile = data[0].exist;
            scope.exist.doublePoints = data[1].exist;
          });
          function validForm(form) {
            var errors = false;
            if (
              (!form.first_name || !form.first_name.length)
              || (!form.last_name || !form.last_name.length)
              || !form.sex
              || (!form.bday || !form.bday[0] || !form.bday[1] || !form.bday[2])
              || (!form.phone || !form.phone.length)
              || (!form.town || !form.town.length)
              || (!form.area || !form.area.length)
              || (!form.street || !form.street.length)
              || (!form.house || !form.house.length)
              || (!form.apartment || !form.apartment.length)
              || (!form.agree)
              || (!form.soc_status || !form.soc_status.length)
              || (form.soc_status && form.soc_status == 'работающий' && (!form.job || !form.job.length))
              || (!form.fam_status || !form.fam_status.length)
            ) {
              errors = true;
            }
            return !errors;
          }

          scope.saveForm = function () {
            if(!jQuery('input[name=agree]').siblings('a.checked').length) {
              scope.form.agree = false;
              setTimeout(function(){
                scope.$emit('notify', 'Для записи данных необходимо дать согласие на их обработку');
              },10);
              return;
            } else {
              scope.form.agree = true;
            }
            var formData = angular.extend({}, scope.form);
            formData.sex = jQuery('.common-inp-set-sex .prettyradio > a.checked').siblings('input').val();
            if (validForm(formData)) {
              var data = {
                firstName: formData.first_name,
                lastName: formData.last_name,
                sex: formData.sex,
                birthDate: formData.bday.join('-')
              };
              if ((scope.user.user.email && scope.user.user.email != formData.email) || !scope.user.user.email) {
                data.addEmail = formData.email;
              }
              if ((scope.user.user.phone && scope.user.user.phone != formData.phone) || !scope.user.user.phone) {
                data.addPhone = formData.phone.match(/\d/g).join('');
              }
              var tags = [actionService.getTags().profile, formData.soc_status, formData.job, formData.fam_status, 'Город ' + formData.town, 'Район ' + formData.area, 'Улица ' + formData.street];
              var vars = {
                email: formData.email,
                house : formData.house,
                apartment: formData.apartment
              };
              sp.send('user.update', data);
              sp.on('user.update.error', function (res) {
                var mes;
                switch (res.status_code) {
                  case -200002:
                    mes = 'Имя и Фамилия должны иметь длину до 50 символов.';
                    break;
                  case -200007:
                    mes = 'Такой телефон уже используется.';
                    break;
                  case -200010:
                    mes = 'Такой email уже используется.';
                    break;
                  default:
                    mes = res.message;
                }
                if (mes) {
                  scope.$emit('notify', mes);
                }
              });
              sp.on('user.update.success', function (res) {
                scope.exist.profile = true;
                scope.show.profile = false;
                setTimeout(function(){
                  scope.$emit('notify', 'Спасибо!');
                  scope.$digest();
                }, 100);
                scope.$apply(function () {
                  sp.send('tags.add', tags);
                });
                scope.$apply(function () {
                  sp.send('user.vars.add', vars);
                });

              })
            }
          };
          sp.on('tags.add.success', function () {
            update();
          });
          scope.initSocials = function (actions, type) {
            setTimeout(function () {
              sp.send('actions.parse', angular.extend([], actions));
              setTimeout(function () {
                jQuery('.js-radio').prettyCheckable({
                  customClass: 'common-radio'
                });
                jQuery('.js-checkbox').prettyCheckable({
                  customClass: 'common-checkbox'
                });
                jQuery('.js-phone').mask('+7(000) 000-00-00');
                jQuery('.js-label').click(function () {
                  jQuery(this).siblings('.prettyradio, .prettycheckbox').find('a').click();
                });
                if (scope.user.user.sex) {
                  jQuery('.common-inp-set-sex .prettyradio input[value=' + scope.user.user.sex + ']').siblings('a').addClass('checked');
                }
                jQuery('.js-select').selectize();
              }, 100);
            }, 10);
          };
          scope.isActive = function () {
            return Object.keys(scope.show).length ? false : true;
          };
          scope.transformTitle = actionService.getTitle;
          scope.getIcon = actionService.getIcon;
          update();
          sp.on('actions.perform.success', function (data) {
            update();
          });
        }
      }

    }]);

  document.createElement('actions-cmp');
  var elems = document.querySelectorAll('actions-cmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['stalos.directives.actions']);
  }

}(window.angular, window.SAILPLAY, window.$));