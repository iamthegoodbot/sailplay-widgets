(function (angular, sp, jQuery) {

  angular.module('respect.directives.actions', ['respect.services.users', 'respect.services.actions', 'respect.tools.bDaySelect'])

    .directive('actionsCmp', ['userService', 'actionService', '$rootScope', function (userService, actionService, $rootScope) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n\n    <section class="l-centered task-sec">\n        <h1 class="common-cell-head">Список заданий</h1>\n        <div class="common-cell-title">\n            {{ actions && actions.length ? \'Выполняйте задания, чтобы получить дополнительные бонусы\' : \'Список пуст\' }}\n        </div>\n\n        <div class="task-sec__row">\n\n            <div class="task-sec__col" data-ng-if="!exist.profile">\n\n                <div class="task-item">\n                    <div class="task-item__img">\n                        <img src="image/icon-01.png" alt="">\n                    </div>\n                    <div class="task-item__img this-hover">\n                        <img src="image/icon-01-hover.png" alt="">\n                    </div>\n                    <div class="task-item__content">\n                        <div class="task-item__content-inner">\n                            <div class="task-item__text">Заполни профиль</div>\n                            <div class="task-item__info">150 баллов</div>\n                        </div>\n                    </div>\n                    <div class="task-item__over">\n                        <span data-ng-click="fill_profile()"\n                              data-ng-if="user"\n                              class="common-btn common-btn_blue task-item__btn">Выполнить</span>\n                    </div>\n                </div>\n                <!-- /item -->\n            </div>\n            <!-- /col -->\n\n            <div class="task-sec__col" data-ng-repeat="action in actions">\n\n                <div class="task-item">\n                    <div class="task-item__img">\n                        <img data-ng-src="image/{{ getIcon(action) }}.png" alt="">\n                    </div>\n                    <div class="task-item__img this-hover">\n                        <img data-ng-src="image/{{ getIcon(action) }}-hover.png" alt="">\n                    </div>\n                    <div class="task-item__content">\n                        <div class="task-item__content-inner">\n                            <div class="task-item__text" data-ng-bind="transformTitle(action)"></div>\n                            <div class="task-item__info">{{ action.points + \' баллов\' }}</div>\n                        </div>\n                    </div>\n                    <div class="task-item__over">\n                        <span class="task-item__iframe" data-sp-action="{{ action._actionId }}"\n                              data-styles="{{ cssLink }}"></span>\n                        <!--<div class="common-btn common-btn_blue task-item__btn">Выполнить</div>-->\n                    </div>\n                </div>\n                <!-- /item -->\n            </div>\n            <!-- /col -->\n\n        </div>\n        <!-- /row -->\n    </section>\n\n    <!-- popups -->\n    <div class="form-popup js-form-popup" data-ng-if="user" style="display: none;">\n        <div class="form-popup__close js-close-popup"></div>\n        <div class="form-popup__head-wr">\n            <div class="form-popup__head">Заполни профиль</div>\n            <div class="form-popup__title">+150 баллов</div>\n        </div>\n        <div class="form-popup__body-wr">\n            \n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Имя</span>\n                <input type="text" placeholder="Ваше имя"\n                       data-ng-model="form.first_name">\n            </div>\n            \n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Фамилия</span>\n                <input type="text" placeholder="Ваша фамилия"\n                       data-ng-model="form.last_name">\n            </div>\n            \n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">E-mail</span>\n                <input type="text" placeholder="Ваша e-mail"\n                       data-ng-model="form.email">\n            </div>\n\n            <div class="form-popup__body_block">\n                <div class="form-popup__body_block_title">Телефон</div>\n                <input type="text" class="common-input js-phone"\n                       data-ng-model="form.phone"\n                       placeholder="+7 (___) ___-__-__">\n            </div>\n\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">День рождения</span>\n                <tools-bday data-ng-if="show_form_popup"\n                            data-model="form.bday"></tools-bday>\n            </div>\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Пол</span>\n                <div class="form-popup__body_block_radio">\n                    <div class="form-popup-block">\n                        <input type="radio" name="sex" id="radio01"\n                               data-ng-model="form.sex"\n                               value="1" class="js-radio form-sex">\n                        <label class="js-lable" for="radio01"><span><i></i></span>Мужской</label>\n                    </div>\n                    \n                    <div class="form-popup-block">\n                        <input type="radio" name="sex" id="radio02"\n                               data-ng-model="form.sex"\n                               value="2" class="js-radio form-sex">\n                        <label class="js-lable" for="radio02"><span><i></i></span>Женский</label>\n                    </div>\n                    \n                </div>\n\n            </div>\n\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Размер обуви</span>\n                <div style="width: 25%">\n                    <input type="text" placeholder="Ваш размер обуви"\n                           data-ng-model="form.size">\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Любимые марки обуви</span>\n                <div class="form-popup__body_block_checker-wrapper">\n                    <div class="form-popup__body_block_checker"\n                         data-ng-repeat="item in favorite_firms_boots track by $index"\n                         data-ng-class="{active : item.active}">\n                        <span data-ng-bind="item.text"\n                              data-ng-click="item.active = !item.active"></span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <div class="form-popup__body_block_title">Любимый стиль обуви</div>\n                <div style="width: 25%">\n                    <select name="" id="" data-ng-model="form.favorite_style_boots" class="js-select common-selectize">\n                        <option value="">Укажите стиль</option>\n                        <option value="классика">классика</option>\n                        <option value="комфорт">комфорт</option>\n                        <option value="мода">мода</option>\n                        <option value="спорт">спорт</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <div class="form-popup__body_block_title">Как часто делаете покупки обуви</div>\n                <div style="width: 25%">\n                    <select name="" id="" data-ng-model="form.how_often" class="js-select common-selectize">\n                        <option value="">Укажите как часто</option>\n                        <option value="режет">реже</option>\n                        <option value="чем 1 раз в год">чем 1 раз в год</option>\n                        <option value="1-2 раза в год">1-2 раза в год</option>\n                        <option value="3-4 раза в год">3-4 раза в год</option>\n                        <option value="и более раз в год">5 и более раз в год</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <div class="form-popup__body_block_title">Самый удобный магазин Respect</div>\n                <div style="width: 25%">\n                    <select name="" id="" data-ng-model="form.most_comfortable" class="js-select common-selectize">\n                        <option value="">Укажите магазин</option>\n                        <option data-ng-repeat="item in shops track by $index"\n                                data-ng-bind="item.text"\n                                data-ng-value="item.text"></option>\n                    </select>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Любимые марки одежды</span>\n                <div class="form-popup__body_block_checker-wrapper">\n                    <div class="form-popup__body_block_checker"\n                         data-ng-repeat="item in favorite_firms_cloth track by $index"\n                         data-ng-class="{active : item.active}">\n                        <span data-ng-bind="item.text"\n                              data-ng-click="item.active = !item.active"></span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <div class="form-popup__body_block_title">Любимый стиль одежды</div>\n                <div style="width: 25%">\n                    <select name="" id="" data-ng-model="form.favorite_style_cloth" class="js-select common-selectize">\n                        <option value="">Укажите стиль</option>\n                        <option value="классика">классика</option>\n                        <option value="casual">casual</option>\n                        <option value="мода">мода</option>\n                        <option value="спорт">спорт</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Социальные сети, которые вы используете</span>\n                <div class="form-popup__body_block_checker-wrapper">\n                    <div class="form-popup__body_block_checker"\n                         data-ng-repeat="item in social_list track by $index"\n                         data-ng-class="{active : item.active}">\n                        <span data-ng-bind="item.text"\n                              data-ng-click="item.active = !item.active"></span>\n                    </div>\n                </div>\n            </div>\n\n\n            <div class="form-popup__body_block">\n                <span class="form-popup__body_block_title">Поисковые системы, которые вы используете</span>\n                <div class="form-popup__body_block_checker-wrapper">\n                    <div class="form-popup__body_block_checker"\n                         data-ng-repeat="item in search_list track by $index"\n                         data-ng-class="{active : item.active}">\n                        <span data-ng-bind="item.text"\n                              data-ng-click="item.active = !item.active"></span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="form-popup__body_block">\n                <div class="form-popup__body_block_title">Удобный способ покупки обуви</div>\n                <div style="width: 25%">\n                    <select name="" id="" data-ng-model="form.purchase_type" class="js-select common-selectize">\n                        <option value="">Укажите способ</option>\n                        <option value="заказ через интернет">заказ через интернет</option>\n                        <option value="в торговой точке">в торговой точке</option>\n                    </select>\n                </div>\n            </div>\n\n\n            <div class="form-popup__body_block text_center">\n                <div class="divider"></div>\n                <div class="common-btn common-btn_blue task-item__btn"\n                     data-ng-click="saveForm()"\n                >Отправить\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- /popups -->\n\n\n</div>',
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
            favorite_style_boots: null,
            favorite_style_cloth: null,
            how_often: null,
            purchase_type: null,
            most_comfortable: null,
            size: null
          };

          scope.shops = DATA_OBJ.shops.list;
          scope.favorite_firms_boots = DATA_OBJ.favorite_boots.list;
          scope.favorite_firms_cloth = DATA_OBJ.favorite_clothes.list;
          scope.social_list = DATA_OBJ.socials.list;
          scope.search_list = DATA_OBJ.search.list;

          scope.fill_profile = function () {
            scope.show_form_popup = true;
            jQuery('.js-form-popup').bPopup({
              speed: 450,
              transition: 'fadeIn',
              closeClass: 'js-close-popup',
              positionStyle: 'absolute',
              follow: [true, false],
              modal: true,
              modalClose: true,
              modalColor: '#E6E6E6',
              opacity: 0.9,
              onOpen: function () {

              },
              onClose: function () {
                scope.$apply(function () {
                  scope.show_form_popup = false;
                });
              }
            });
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
            actionService.getTags().view
          ]).then(function (data) {
            scope.exist.profile = data[0].exist;
            scope.exist.view = data[1].exist;
          });
          function validForm(form) {
            var errors = false;
            if (
              (!form.first_name || !form.first_name.length)
              || (!form.last_name || !form.last_name.length)
              || !form.sex
              || (!form.bday || !form.bday[0] || !form.bday[1] || !form.bday[2])
              || (!form.phone || !form.phone.length)
              || (!form.email || !form.email.length)
              || (!getActiveElems(scope.favorite_firms_boots, DATA_OBJ.favorite_boots.tag) || !getActiveElems(scope.favorite_firms_boots, DATA_OBJ.favorite_boots.tag).length)
              || (!getActiveElems(scope.favorite_firms_cloth, DATA_OBJ.favorite_clothes.tag) || !getActiveElems(scope.favorite_firms_cloth, DATA_OBJ.favorite_clothes.tag).length)
              || (!getActiveElems(scope.social_list, DATA_OBJ.socials.tag) || !getActiveElems(scope.social_list, DATA_OBJ.socials.tag).length)
              || (!getActiveElems(scope.search_list, DATA_OBJ.search.tag) || !getActiveElems(scope.search_list, DATA_OBJ.search.tag).length)
              || (!form.favorite_style_boots || !form.favorite_style_boots.length)
              || (!form.favorite_style_cloth || !form.favorite_style_cloth.length)
              || (!form.how_often || !form.how_often.length)
              || (!form.purchase_type || !form.purchase_type.length)
              || (!form.most_comfortable || !form.most_comfortable.length)
              || (!form.size)
            ) {
              errors = true;
            }
            return !errors;
          }

          function getActiveElems(arr, tag) {
            return arr.filter(function (item) {
              return item.active;
            }).map(function (item) {
              return tag + ' ' + item.text;
            });
          }

          scope.saveForm = function () {
            var formData = angular.extend({}, scope.form);
            if (validForm(formData)) {
              var data = {
                firstName: formData.first_name,
                lastName: formData.last_name,
                sex: formData.sex,
                birthDate: formData.bday.join('-')
              };
              if ((scope.user.user.email && scope.user.user.email !== formData.email) || !scope.user.user.email) {
                data.addEmail = formData.email;
              }
              if ((scope.user.user.phone && scope.user.user.phone !== formData.phone) || !scope.user.user.phone) {
                data.addPhone = formData.phone.match(/\d/g).join('');
              }
              var arr = [];
              arr = arr.concat(getActiveElems(scope.favorite_firms_boots, DATA_OBJ.favorite_boots.tag));
              arr = arr.concat(getActiveElems(scope.favorite_firms_cloth, DATA_OBJ.favorite_clothes.tag));
              arr = arr.concat(getActiveElems(scope.social_list, DATA_OBJ.socials.tag));
              arr = arr.concat(getActiveElems(scope.search_list, DATA_OBJ.search.tag));
              arr.push(actionService.getTags().profile);
              function tags_sending() {
                if (!tags.length) return;
                if (tags.length > 9) {
                  sp.send('tags.add', tags.slice(0, 9));
                  tags = tags.slice(9);
                  sp.on('tags.add.success', function (data) {
                    tags_sending();
                  });
                } else {
                  sp.send('tags.add', tags);
                  tags = [];
                }
              }

              var tags = arr;
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
                jQuery('.js-form-popup').bPopup().close()
                scope.$emit('notify', 'Спасибо!');
                scope.$apply(function () {
                  tags_sending();
                });
              })
            }
          };

          sp.on('tags.add.success', function () {
            update();
          });
          scope.transformTitle = actionService.getTitle;
          scope.getIcon = actionService.getIcon;
          scope.initSocials = function (actions, type) {
            setTimeout(function () {
              sp.send('actions.parse', angular.extend([], actions));
              setTimeout(function () {
                jQuery('.js-phone').mask('+7(000) 000-00-00');
                jQuery('.js-select').selectize();
              }, 300);
            }, 10);
          };
          scope.isActive = function () {
            return Object.keys(scope.show).length ? false : true;
          };
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
    angular.bootstrap(elems[i], ['respect.directives.actions']);
  }

}(window.angular, window.SAILPLAY, window.$));