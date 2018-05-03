(function (SP, d) {

  if (!angular) return;

  var QUESTIONNAIRE_DATA = {
    q1: {
      q: 'Вы обычно заказываете пиццу для ...',
      num: 2,
      his_version: true,
      a: [
        {
          text: 'Обеда с коллегами',
          tag: 'Обычно я заказываю пиццу для обеда с коллегами'
        }, {
          text: 'Себя, домой',
          tag: 'Обычно я заказываю пиццу домой для себя'
        }, {
          text: 'Моих коллег (я офис-менеджер)',
          tag: 'Обычно я заказываю пиццу для моих коллег'
        }, {
          text: 'Вечеринки в общаге (я студент)',
          tag: 'Обычно я заказываю пиццу для вечеринки'
        }, {
          text: 'Детей, домой',
          tag: 'Обычно я заказываю пиццу для детей'
        }, {
          text: 'Себя в ресторане',
          tag: 'Обычно я заказываю пиццу для себя в ресторане'
        },
      ]
    },
    q2: {
      q: 'Когда вы заказываете пиццу?',
      num: 3,
      his_version: true,
      a: [
        {
          text: 'Когда собираюсь посмотреть кино или сериал',
          tag: 'Я заказываю пиццу когда собираюсь посмотреть кино или сериал'
        },
        {
          text: 'Когда не хочу готовить',
          tag: 'Я заказываю пиццу когда не хочу готовить'
        },
        {
          text: 'По праздникам',
          tag: 'Я заказываю пиццу по праздникам'
        },
        {
          text: 'В выходные',
          tag: 'Я заказываю пиццу в выходные'
        },
        {
          text: 'Когда смотрю спортивный матч (Футбол / Хоккей / Баскетбол и т.д.)',
          tag: 'Я заказываю пиццу когда смотрю спортивный матч'
        },
        {
          text: 'В пятницу днем',
          tag: 'Я заказываю пиццу в пятницу днем'
        },
        {
          text: 'В пятницу вечером',
          tag: 'Я заказываю пиццу в пятницу днем'
        },
        {
          text: 'Время от времени (нет какой-либо закономерности)',
          tag: 'Я заказываю пиццу время от времени'
        }
      ]
    },
    q3: {
      q: 'Как часто вы заказываете доставку еды',
      num: 4,
      type: 1,
      his_version: true,
      a: [
        {
          text: 'Практически каждую неделю',
          tag: 'Я заказываю доставку еды практически каждую неделю'
        },
        {
          text: 'Один, максимум два раза в месяц',
          tag: 'Я заказываю доставку еды один максимум два раза в месяц'
        },
        {
          text: 'Реже, чем раз в месяц',
          tag: 'Я заказываю доставку еды реже чем раз в месяц'
        }
      ]
    },
    q4: {
      q: 'Заказываете ли вы пиццу только в Papa John\'s?',
      num: 5,
      type: 1,
      a: [
        {
          text: 'Да',
          tag: 'Я заказываю пиццу только в Papa John\'s'
        },
        {
          text: 'Нет',
          tag: 'Я заказываю пиццу не только в Papa John\'s',
          options: [
            {text: 'Деливери Клаб', tag: 'Я заказываю пиццу в Деливери Клаб'},
            {text: 'Dominos', tag: 'Я заказываю пиццу в Dominos'},
            {text: 'Pizza Hut', tag: 'Я заказываю пиццу в Pizza Hut'},
            {text: 'Якитория', tag: 'Я заказываю пиццу в Якитория'},
            {text: 'Тануки', tag: 'Я заказываю пиццу в Тануки'},
            {text: 'Империя пиццы', tag: 'Я заказываю пиццу в Империя пиццы'},
            {text: 'ПиццаСушиВок', tag: 'Я заказываю пиццу в ПиццаСушиВок'},
            {text: 'Воккер', tag: 'Я заказываю пиццу в Воккер'},
            {text: 'Чайхана', tag: 'Я заказываю пиццу в Чайхана'},
            {text: 'Транспицца', tag: 'Я заказываю пиццу в Транспицца'},
            {text: 'Иль Патио', tag: 'Я заказываю пиццу в Иль Патио'},
            {text: 'Пицца Фабрика', tag: 'Я заказываю пиццу в Пицца Фабрика'},
            {text: 'Пронто', tag: 'Я заказываю пиццу в Пронто'},
            {text: 'ДоДо пицца', tag: 'Я заказываю пиццу в ДоДо пицца'},
            {text: 'Алло Пицца', tag: 'Я заказываю пиццу в Алло Пицца'},
            {text: 'Менза', tag: 'Я заказываю пиццу в Менза'},
            {text: 'Тарас Бульба', tag: 'Я заказываю пиццу в Тарас Бульба'},
            {text: 'Шоколадница', tag: 'Я заказываю пиццу в Шоколадница'},
            {text: 'Свой вариант', tag: 'Я заказываю пиццу в', his_version: true}
          ]

        }
      ]
    },
    q5: {
      q: 'Заказываете ли вы что-то еще помимо пиццы?',
      num: 6,
      his_version: true,
      a: [
        {
          text: 'Нет',
          tag: 'Помимо пиццы я ничего не заказываю'
        },
        {
          text: 'Роллы',
          tag: 'Помимо пиццы я заказываю роллы'
        },
        {
          text: 'Пироги',
          tag: 'Помимо пиццы я заказываю пироги'
        }
      ]
    },
    q6: {
      q: 'Ваши любимые акции на сайте papajohns.ru',
      num: 7,
      type: 1,
      his_version: true,
      a: [
        {
          text: 'Когда я получаю подарок',
          tag: 'Мои любимые акции на сайте papajohns.ru. когда я полуаю подарок'
        },
        {
          text: 'Когда я получаю бонусные баллы',
          tag: 'Мои любимые акции на сайте papajohns.ru. когда я полуаю бонусные баллы'
        },
        {
          text: 'Когда я получаю скидку',
          tag: 'Мои любимые акции на сайте papajohns.ru. когда я получаю скидку'
        },
        {
          text: 'Не важно',
          tag: 'Мои любимые акции на сайте papajohns.ru. Не важно.'
        }
      ]
    },
    q7: {
      q: 'Есть ли у вас дети',
      type: 1,
      num: 8,
      a: [
        {
          text: 'Есть',
          tag: 'У меня есть дети'
        },
        {
          text: 'Нету',
          tag: 'У меня нету детей'
        }
      ]
    },
    q8: {
      q: 'Ваше хобби',
      his_version: true,
      num: 9,
      a: [
        {
          text: 'Я спортивный болельщик',
          tag: 'Мое хобби - я спортивный болельщик'
        },
        {
          text: 'Люблю смотреть фильмы и сериалы',
          tag: 'Мое хобби - люблю смотреть фильмы и сериалы'
        },
        {
          text: 'Веселиться с друзьями в шумной компании',
          tag: 'Мое хобби - веселиться с друзьями в шумной компании'
        },
        {
          text: 'Мои дети - мое главное хобби',
          tag: 'Мое хобби - мои дети'
        },
        {
          text: 'У меня нет хобби',
          tag: 'У меня нет хобби'
        }
      ]
    },
    q9: {
      q: 'Какие сайты вы чаще всего посещаете?',
      num: 10,
      his_version: true,
      a: [
        {
          text: 'Новостные',
          tag: 'Я посещаю чаще всего новостные сайты'
        },
        {
          text: 'Hi-tech',
          tag: 'Я посещаю чаще всего hi-tech сайты'
        },
        {
          text: 'Автотематика',
          tag: 'Я посещаю чаще всего автотематика сайты'
        },
        {
          text: 'Женские',
          tag: 'Я посещаю чаще всего женские сайты'
        },
        {
          text: 'Соцсети и почта',
          tag: 'Я посещаю чаще всего соцсети и почта'
        }
      ]
    },
    q10: {
      q: 'Почему вы заказываете в “Папа Джонс"',
      num: 11,
      a: [
        {
          text: 'Вкусная пицца',
          tag: 'Я заказываю в “Папа Джонс" потому-что там вкусная пицца'
        },
        {
          text: 'Быстрая доставка',
          tag: 'Я заказываю в “Папа Джонс" потому-что там быстрая доставка'
        },
        {
          text: 'Люблю бонусы и подарки',
          tag: 'Я заказываю в “Папа Джонс" потому-что там люблю бонусы и подарки'
        },
        {
          text: 'Еще не знаю',
          tag: 'Я заказываю в “Папа Джонс" потому-что там еще не знаю'
        }
      ]
    },
    q11: {
      q: 'Тематика ваших любимых TV каналов',
      num: 12,
      his_version: true,
      a: [
        {
          text: 'Авто',
          tag: 'Тематика TV: Авто'
        },
        {
          text: 'Бизнес',
          tag: 'Тематика TV: Бизнес'
        },
        {
          text: 'Детям / Мультфильмы',
          tag: 'Тематика TV: Детям / Мультфильмы'
        },
        {
          text: 'Кино',
          tag: 'Тематика TV: Кино'
        },
        {
          text: 'Мода',
          tag: 'Тематика TV: Мода'
        },
        {
          text: 'Музыка',
          tag: 'Тематика TV: Музыка'
        },
        {
          text: 'Наука и образование',
          tag: 'Тематика TV: Наука и образование'
        },
        {
          text: 'Новости',
          tag: 'Тематика TV: Новости'
        },
        {
          text: 'Обо всем',
          tag: 'Тематика TV: Обо всем'
        },
        {
          text: 'Развлечения',
          tag: 'Тематика TV: Развлечения'
        },
        {
          text: 'Религия',
          tag: 'Тематика TV: Религия'
        },
        {
          text: 'Спорт',
          tag: 'Тематика TV: Спорт'
        },
        {
          text: 'Погода',
          tag: 'Тематика TV: Погода'
        },
        {
          text: 'Политика, общ. жизнь',
          tag: 'Тематика TV: Политика, общ. жизнь'
        },
        {
          text: 'Познавательное',
          tag: 'Тематика TV: Познавательное'
        },
        {
          text: 'Природа',
          tag: 'Тематика TV: Природа'
        }
      ]
    },
    q12: {
      q: 'Ваши любимые игры',
      num: 13,
      his__version: true,
      a: [
        {
          text: 'Онлайн игры',
          tag: 'Любимые игры: Онлайн игры'
        },
        {
          text: 'Игры на приставке',
          tag: 'Любимые игры: Игры на приставке'
        },
        {
          text: 'Игры на смартфоне',
          tag: 'Любимые игры: Игры на смартфоне'
        },
        {
          text: 'Я не играю в игры',
          tag: 'Любимые игры: Я не играю в игры'
        }
      ]
    },
    q13: {
      q: 'Укажите тип онлайн оплаты, которая вам удобна',
      num: 14,
      a: [
        {
          text: 'Картой на сайте',
          tag: 'Тип онлайн оплаты: Картой на сайте'
        },
        {
          text: 'Картой при получении курьеру',
          tag: 'Тип онлайн оплаты: '
        }
      ]
    }
  };

  angular.module('pj_questionnaire_module', [])

    .run(function () {
      if (!SP) return;
    })

    .directive('pjStep', function () {
      return {
        restict: 'E',
        scope: {
          model: '=model'
        },
        template: '\
								{{ type }}\
								<div class="jones-test-item" data-ng-switch="model.type">\
								<div class="jones-test-item__num"\
								data-ng-class="{ \'this-red\' : !valid }">{{ model.num}}<span class="jones-test-item__num-shad"></span></div>\
								<div class="jones-test-item__text">{{ model.q }}</div>\
						  <div class="jones-test-item__fields-wr clear-wrap" data-ng-switch-default>\
								  <div class="jones-test-item__col-left" >\
												<div class="common-block-param jones-test-item__block-param"\
										data-ng-repeat="item in arr_1">\
											<div class="clearfix prettycheckbox labelright common-checkbox blue">\
														<input type="checkbox" \
																data-ng-model="item.model" \
																style="display: none;"\
																name="" id="" class="js-checkbox">\
														<a href="#" \
														data-ng-class="{ checked : item.model }"\
														data-ng-click="click(item);$event.preventDefault();"></a>\
								    </div>\
														<div class="js-label" data-ng-click="click(item);$event.preventDefault();">{{ item.text }}</div>\
												</div>\
														\
															<div class="common-block-param jones-test-item__block-param"\
															data-ng-if="model.a.length % 2 == 0 && model.his_version">\
																	<div class="clearfix prettycheckbox labelright common-checkbox blue">\
																			<input type="checkbox" \
																			style="display: none;"\
																			name="" id="" class="js-checkbox">\
																					<a href="#" \
																					data-ng-class="{ checked : model.show_his_version }"\
																					data-ng-click="click({}, true);$event.preventDefault();"\
																					></a>\
																					</div>\
																							<div class="js-label" data-ng-click="click({}, true);$event.preventDefault();">Свой вариант</div>\
																					</div>\
																			\
										</div>\
										<!-- /left -->\
										<div class="jones-test-item__col-right">\
												<div class="common-block-param jones-test-item__block-param"\
												data-ng-repeat="item in arr_2">\
												<div class="clearfix prettycheckbox labelright common-checkbox blue">\
														<input type="checkbox" \
																data-ng-model="item.model" \
																style="display: none;"\
																name="" id="" class="js-checkbox">\
														<a href="#" \
														data-ng-class="{ checked : item.model }"\
														data-ng-click="click(item);$event.preventDefault();"\
														></a>\
								    </div>\
														<div class="js-label" data-ng-click="click(item);$event.preventDefault();">{{ item.text }}</div>\
														</div>\
														\
															<div class="common-block-param jones-test-item__block-param"\
												 data-ng-if="model.a.length % 2 != 0 && model.his_version">\
												<div class="clearfix prettycheckbox labelright common-checkbox blue">\
														<input type="checkbox" \
																style="display: none;"\
																name="" id="" class="js-checkbox">\
														<a href="#" \
														data-ng-class="{ checked : model.show_his_version }"\
														data-ng-click="click({}, true);$event.preventDefault();"\
														></a>\
								    </div>\
														<div class="js-label" data-ng-click="click({}, true);$event.preventDefault();">Свой вариант</div>\
														</div>\
														\
								 </div>\
												<!-- /right -->\
										</div>\
										<!-- /fields wr -->\
						  <div class="jones-test-item__fields-wr clear-wrap" data-ng-switch-when="1">\
								  <div class="jones-test-item__col-left" >\
										  <div class="common-block-param jones-test-item__block-param has-pretty-child"\
										  data-ng-repeat="item in arr_1">\
														<div class="clearfix prettyradio labelright common-radio blue">\
														 <input type="radio" name="name1" id="" class="js-radio"\
														 data-ng-model="item.model" \
																		style="display: none;">\
														 <a href="#" \
																data-ng-class="{ checked : item.model }"\
																data-ng-click="click(item);$event.preventDefault();"></a>\
																<label for="undefined">null</label></div>\
														  <div class="js-label" data-ng-click="click(item);$event.preventDefault();">{{ item.text }}</div>\
														</div>\
														\
														\
														\
														<div class="common-block-param jones-test-item__block-param has-pretty-child"\
										  data-ng-if="model.a.length % 2 == 0 && model.his_version">\
														<div class="clearfix prettyradio labelright common-radio blue">\
														 <input type="radio" name="name1" id="" class="js-radio"\
																		style="display: none;">\
														 <a href="#" \
																					data-ng-class="{ checked : model.show_his_version }"\
																					data-ng-click="click({}, true);$event.preventDefault();"></a>\
																<label for="undefined">null</label></div>\
														  <div class="js-label" data-ng-click="click({}, true);$event.preventDefault();">Свой вариант</div>\
														</div>\
														\
														\
														\
														\
								  </div>\
								  <!-- /left -->\
								  <div class="jones-test-item__col-right">\
								  <div class="common-block-param jones-test-item__block-param has-pretty-child"\
										  data-ng-repeat="item in arr_2">\
														<div class="clearfix prettyradio labelright common-radio blue">\
														 <input type="radio" name="name1" id="" class="js-radio"\
														 data-ng-model="item.model" \
																		style="display: none;">\
														 <a href="#" \
																data-ng-class="{ checked : item.model }"\
																data-ng-click="click(item);$event.preventDefault();"></a>\
																<label for="undefined">null</label></div>\
														  <div class="js-label" data-ng-click="click(item);$event.preventDefault();">{{ item.text }}</div>\
														</div>\
														\
											<div class="common-block-param jones-test-item__block-param has-pretty-child"\
										  data-ng-if="model.a.length % 2 != 0 && model.his_version">\
														<div class="clearfix prettyradio labelright common-radio blue">\
														 <input type="radio" name="name1" id="" class="js-radio"\
																		style="display: none;">\
																 <a href="#" \
																					data-ng-class="{ checked : model.show_his_version }"\
																					data-ng-click="click({}, true);$event.preventDefault();"></a>\
																<label for="undefined">null</label></div>\
														  <div class="js-label" data-ng-click="click({}, true);$event.preventDefault();">Свой вариант</div>\
														</div>\
														\
														\
								  </div>\
								  <!-- /right -->\
						  </div>\
												  <!-- addition options-->\
														  \
														  <div class="jones-test-item__fields-wr clear-wrap" data-ng-show="show_addition_options">\
								  <div class="jones-test-item__col-left" >\
												<div class="common-block-param jones-test-item__block-param"\
										data-ng-repeat="item in add_arr_1"\
										data-ng-init="item.model = false;">\
											<div class="clearfix prettycheckbox labelright common-checkbox blue">\
														<input type="checkbox" \
																data-ng-model="item.model" \
																style="display: none;"\
																name="" id="" class="js-checkbox">\
														<a href="#" \
														data-ng-class="{ checked : item.model }"\
														data-ng-click="opt_click(item);$event.preventDefault();"></a>\
								    </div>\
														<div class="js-label" data-ng-click="opt_click(item);$event.preventDefault();">{{ item.text }}</div>\
												</div>\
										</div>\
										<!-- /left -->\
										<div class="jones-test-item__col-right">\
												<div class="common-block-param jones-test-item__block-param"\
												data-ng-repeat="item in add_arr_2"\
													data-ng-init="item.model = false;">\
												<div class="clearfix prettycheckbox labelright common-checkbox blue">\
														<input type="checkbox" \
																data-ng-model="item.model" \
																style="display: none;"\
																name="" id="" class="js-checkbox">\
														<a href="#" \
														data-ng-class="{ checked : item.model }"\
														data-ng-click="opt_click(item);$event.preventDefault();"\
														></a>\
								    </div>\
														<div class="js-label" data-ng-click="opt_click(item);$event.preventDefault();">{{ item.text }}</div>\
														</div>\
														\
								 </div>\
												<!-- /right -->\
										</div>\
										<!-- /fields wr -->\
												 \
												 \
												<input type="text" class="common-input" \
												 style="margin-top: 10px;"\
												 data-ng-show="model.show_his_version"\
												 data-ng-model="model.his_version_model" \
												 placeholder="Свой вариант">\
												 \
												 \
										</div>\
														  <!-- /fields wr -->\
														  \
								</div>\
								<!-- /jones-test-item -->',
        link: function (scope, el, attr) {

          scope.valid = false;

          scope.model = null;

          scope.$watch('model.his_version_model', function () {
            scope.check();
          });

          scope.clear = function () {
            for (var i = 0, len = scope.arr_1.length; i < len; i++) {
              scope.arr_1[i].model = false;
            }
            for (var i = 0, len = scope.arr_2.length; i < len; i++) {
              scope.arr_2[i].model = false;
            }
          };

          scope.opt_click = function (item) {
            item.model = !item.model;
            if (item.his_version) {
              scope.model.show_his_version = item.model;
            }
          };

          scope.click = function (item, his_veriant) {
            if (his_veriant) {
              scope.model.his_version_model = '';
            }
            if (scope.model.type == 1) {
              scope.clear();
              if (his_veriant) {
                scope.model.show_his_version = !scope.model.show_his_version;
              } else {
                scope.model.show_his_version = false;
                item.model = true;
                scope.check(item.model);
              }
            } else {
              if (his_veriant) {
                scope.model.show_his_version = !scope.model.show_his_version;
              } else {
                item.model = !item.model;
                scope.check(item.model);
              }
            }
          };

          scope.check = function () {
            var opt = false;
            var arr = scope.arr_1 && scope.arr_2 ? scope.arr_1.concat(scope.arr_2) : [];
            for (var i = 0, len = arr.length; i < len; i++) {

              if (arr[i].options && arr[i].options.length && arr[i].model) {
                opt = arr[i].options;
              }

              if (arr[i].model) {
                if (!scope.valid) {
                  scope.valid = true;
                  scope.model.valid = true;
                }
                break;
              } else {
                scope.valid = false;
                scope.model.valid = false;
              }
            }
            if (scope.model.his_version_model && scope.model.his_version_model.length) {
              scope.valid = true;
              scope.model.valid = true;
            } else if (scope.model.his_version_model && scope.model.his_version_model.length == 0) {
              scope.valid = scope.valid ? scope.valid : false;
              scope.model.valid = scope.model.valid ? scope.model.valid : false;
            }

            if (opt) {
              scope.show_addition_options = true;
              scope.add_arr_1 = opt.slice(0, Math.ceil(opt.length / 2));
              scope.add_arr_2 = opt.slice(Math.ceil(opt.length / 2));
            } else {
              scope.add_arr_1 = [];
              scope.add_arr_2 = [];
              scope.show_addition_options = false;
            }

            scope.$emit('pj.step.change');
          };


          scope.$watch('model', function () {
            scope.arr_1 = scope.model ? scope.model.a.slice(0, Math.ceil(scope.model.a.length / 2)) : [];
            scope.arr_2 = scope.model ? scope.model.a.slice(Math.ceil(scope.model.a.length / 2)) : [];
          });

        }
      }
    })

    .directive('bDay', ['$timeout', function ($timeout) {
      return {
        restict: 'E',
        scope: {
          model: '=',
          disabled: '='
        },
        template: '<div class="jones-test-date">\
								<div class="jones-test-date__day">\
								<select\
								class="common-selectize js-select">\
								</select>\
								</div>\
								<div class="jones-test-date__month">\
										<select \
										 class="common-selectize js-select">\
												<option value="">месяц</option>\
												<option value="1">январь</option>\
												<option value="2">февраль</option>\
												<option value="3">март</option>\
												<option value="4">апрель</option>\
												<option value="5">май</option>\
												<option value="6">июнь</option>\
												<option value="7">июль</option>\
												<option value="8">август</option>\
												<option value="9">сентябрь</option>\
												<option value="10">октябрь</option>\
												<option value="11">ноябрь</option>\
												<option value="12">декабрь</option>\
										</select>\
								</div>\
								<div class="jones-test-date__year">\
								<select \
								  class="common-selectize js-select">\
								</select>\
								</div>\
								</div>',
        replace: true,
        link: function (scope, el, attr) {

          scope.days = {
            1: new Array(31),
            2: new Array(29),
            3: new Array(31),
            4: new Array(30),
            5: new Array(31),
            6: new Array(30),
            7: new Array(31),
            8: new Array(31),
            9: new Array(30),
            10: new Array(31),
            11: new Array(30),
            12: new Array(31)
          };

          var current_year = new Date().getFullYear();
          scope.years = [];
          for (var i = 90; i > 0; i--) {
            scope.years.push({value: current_year - i});
          }

          scope.d = null;
          scope.m = null;
          scope.y = null;

          function generateArray(array) {
            var arr = [];
            for (var i = 0, len = array.length; i < len; i++) {
              arr.push({value: i + 1});
            }
            return arr;
          }

          $(el).find('.jones-test-date__month .js-select').selectize({
            placeholder: 'месяц',
            onDropdownOpen: function () {
              var input = 'selectize-input input',
                wrapper = 'selectize-input';
              $(el).find('.jones-test-date__month .js-select').find('.' + input).attr('readonly', true);
              $(el).find('.jones-test-date__month .js-select').find('.' + input + ', .' + wrapper).css('cursor', 'pointer');
            },
            onChange: function (a) {
              scope.m = a;
              if (scope.days[scope.m].length) {
                if (Object.keys(selectD.options).length == scope.days[scope.m].length) {
                  return;
                }
                //selectD.clear();
                selectD.clearOptions();
                $.each(scope.days[scope.m], function (i) {
                  selectD.addOption({
                    value: i + 1
                  });
                });

                if (scope.d) {
                  selectD.setValue(scope.d)
                }


              }
            }
          });


          $(el).find('.jones-test-date__day .js-select').selectize({
            options: generateArray(new Array(31)),
            valueField: 'value',
            labelField: 'value',
            sortField: [{field: 'value'}],
            placeholder: 'число',
            onDropdownOpen: function () {
              var input = 'selectize-input input',
                wrapper = 'selectize-input';
              $(el).find('.jones-test-date__day .js-select').find('.' + input).attr('readonly', true);
              $(el).find('.jones-test-date__day .js-select').find('.' + input + ', .' + wrapper).css('cursor', 'pointer');
            },
            onChange: function (a) {
              $timeout(function () {
                scope.d = a;
              });
            }
          });


          $(el).find('.jones-test-date__year .js-select').selectize({
            placeholder: 'год',
            options: scope.years,
            valueField: 'value',
            labelField: 'value',
            sortField: {field: 'value', direction: 'desc'},
            onDropdownOpen: function () {
              var input = 'selectize-input input',
                wrapper = 'selectize-input';
              $(el).find('.jones-test-date__year .js-select').find('.' + input).attr('readonly', true);
              $(el).find('.jones-test-date__year .js-select').find('.' + input + ', .' + wrapper).css('cursor', 'pointer');
            },
            onChange: function (a) {
              $timeout(function () {
                scope.y = a;
              })
            }
          });

          var selectD = $(el).find('.jones-test-date__day .js-select')[0].selectize;
          var selectM = $(el).find('.jones-test-date__month .js-select')[0].selectize;
          var selectY = $(el).find('.jones-test-date__year .js-select')[0].selectize;

          scope.$watch('d + m + y', function (a, b) {
            var separator = '-';
            if (scope.d && scope.m && scope.y) {
              var new_value = scope.y + separator + scope.m + separator + scope.d;
              if (scope.model != new_value) {
                scope.model = new_value;
              }
            }
          });

          scope.$watch('disabled', function () {
            if (scope.disabled) {
              selectD.disable();
              selectM.disable();
              selectY.disable();
            } else {
              selectD.enable();
              selectM.enable();
              selectY.enable();
            }
          });

          scope.$watch('model', function () {
            if (scope.model) {
              selectM.setValue(parseInt(scope.model.split('-')[1]));
              selectD.setValue(parseInt(scope.model.split('-')[2]));
              selectY.setValue(parseInt(scope.model.split('-')[0]));
            }
          });

        }
      }
    }])

    .directive('pjQuestionnaire', ['$timeout', function ($timeout) {
      return {
        restrict: 'E',
        replace: true,
        template: '\
								<div data-ng-show="show">\
						<div id="preloader">\
						<div id="status">&nbsp;</div>\
						</div>\
						<div class="wrapper" style="display: none">\
								<div class="jones-test-outer">\
										<div class="l-section  jones-top-line"></div>\
										<div class="l-centered jones-test-head">\
												<a href="#" class="jones-test-head__logo"><img src="image/logo.png" alt=""></a>\
														<div class="jones-test-head__content">\
																<div class="jones-test-head__text">Получите баллы за опрос</div>\
																<div class="jones-test-head__caption">За прохождение опроса вы получите <span class="jones-test-head__note">100 бонусных баллов</span>\
																</div>\
														</div>\
														<span class="jones-test-head__shadow-left"></span>\
														<span class="jones-test-head__shadow-right"></span>\
												</div>\
												<div class="l-centered jones-test-body">\
														<div class="jones-test-item">\
																<div class="jones-test-item__num"\
																data-ng-class="{ \'this-red\' : !valid_user_info }">1<span class="jones-test-item__num-shad"></span></div>\
																<div class="jones-test-set">\
																		<div class="jones-test-set__left">\
																				<div class="jones-test-set__label this-padded">Ваша имя и фамилия</div>\
																		</div>\
																		<div class="jones-test-set__right">\
																				<div class="jones-test-set__inp-left">\
																						<div class="common-input__wr">\
																								<input type="text" class="common-input"\
																								data-ng-model="first_name"\
				                    data-ng-disabled="locked_first_name"\
																								placeholder="Имя">\
																								</div>\
																						</div>\
																						<div class="jones-test-set__inp-right">\
																								<div class="common-input__wr">\
																										<input type="text" class="common-input"\
						                    data-ng-disabled="locked_last_name"\
																										data-ng-model="last_name" placeholder="Фамилия">\
																										</div>\
																								</div>\
																						</div>\
																				</div>\
																				<!-- /set -->\
																				<div class="jones-test-set">\
																						<div class="jones-test-set__left">\
																								<div class="jones-test-set__label this-sex-label">Пол</div>\
																						</div>\
																			<div class="jones-test-set__right">\
																								    <div class="common-inline-param has-pretty-child">\
																								        <div class="clearfix prettyradio labelright common-radio blue">\
																								            <input type="radio" name="sex"\
																								                   data-ng-model="sex"\
																								                   data-ng-chacked="sex"\
																								                   data-ng-disabled="locked_sex"\
																								                   data-ng-value="1"\
																								                   class="js-radio ng-pristine ng-untouched ng-valid"\
																								                   value="1" style="display: none;">\
																								            <a href="#"\
																								             data-ng-class="{ checked : sex == 1 }"\
																								            data-ng-click="set_sex(1);$event.preventDefault();"></a>\
																								            <label for="undefined">null</label></div>\
																								        <div class="common-inline-param__label js-label"\
																								        data-ng-click="set_sex(1);$event.preventDefault();">муж.</div>\
																								    </div>\
																								    <div class="common-inline-param has-pretty-child">\
																								        <div class="clearfix prettyradio labelright common-radio blue">\
																								            <input type="radio"\
																								                   name="sex"\
																								                   data-ng-model="sex"\
																								                   data-ng-disabled="locked_sex"\
																								                   data-ng-value="2"\
																								                   class="js-radio ng-pristine ng-untouched ng-valid"\
																								                   value="2" style="display: none;">\
																								            <a href="#" data-ng-class="{ checked : sex == 2 }"\
																																				data-ng-click="set_sex(2);$event.preventDefault();"></a>\
																								            <label for="undefined">null</label></div>\
																								        <div class="common-inline-param__label js-label"\
																								        data-ng-click="set_sex(2);$event.preventDefault();">жен.</div>\
																								    </div>\
																								</div>\
																								</div>\
																								<!-- /set -->\
																								<div class="jones-test-set">\
																										<div class="jones-test-set__left">\
																												<div class="jones-test-set__label this-padded">Дата рождения</div>\
																										</div>\
																										<div class="jones-test-set__right">\
																												<b_day data-model="birth_date" data-disabled="locked_birth_date"></b_day>\
																										</div>\
																								</div>\
																								<!-- /set -->\
																								<div class="jones-test-set">\
																										<div class="jones-test-set__left">\
																												<div class="jones-test-set__label this-padded">E-mail</div>\
																										</div>\
																										<div class="jones-test-set__right">\
																												<div class="common-input__wr">\
																														<input type="text" class="common-input"\
																														data-ng-class="{ error : email && !validateEmail(email) && email != \'\' }"\
																														data-ng-disabled="locked_email"\
																														data-ng-model="email" placeholder="E-mail">\
																														</div>\
																												</div>\
																										</div>\
																										<!-- /set -->\
																								</div>\
																								<!-- /jones-test-item -->\
																								<pj_step data-model="data.q1"></pj_step>\
																								<pj_step data-model="data.q2"></pj_step>\
																								<pj_step data-model="data.q3"></pj_step>\
																								<pj_step data-model="data.q4"></pj_step>\
																								<pj_step data-model="data.q5"></pj_step>\
																								<pj_step data-model="data.q6"></pj_step>\
																								<pj_step data-model="data.q7"></pj_step>\
																								<pj_step data-model="data.q8"></pj_step>\
																								<pj_step data-model="data.q9"></pj_step>\
																								<pj_step data-model="data.q10"></pj_step>\
																								<pj_step data-model="data.q11"></pj_step>\
																								<pj_step data-model="data.q12"></pj_step>\
																								<pj_step data-model="data.q13"></pj_step>\
																								<a href="#" class="jones-test-btn"\
																								data-ng-class="{ \'this-disabled\' : !valid_form }"\
																								data-ng-click="submit();$event.preventDefault();">Закончить опрос и получить баллы</a>\
																						</div>\
																						<!-- /test-body -->\
																				</div>\
																				<!-- /jones-test-outer -->\
																		</div>\
																		<!-- /wrapper -->\
																</div>',
        scope: {
          hash: '@'
        },
        link: function (scope, el, attr) {

          scope.validateEmail = function (email) {
            var reValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return reValidEmail.test(email);
          }

          function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
              function (m, key, value) {
                vars[key] = value;
              });
            return vars;
          }

          //user data
          scope.birth_date = null;
          scope.last_name = null;
          scope.first_name = null;
          scope.sex = null;
          scope.email = null;

          scope.show = false;
          scope.user_info_updated = false;
          scope.valid_user_info = false;
          scope.valid_form = false;

          scope.set_sex = function (sex) {
            if (!scope.locked_sex) {
              scope.sex = sex;
            }
          }

          scope.$watch('birth_date + last_name + first_name + sex + email', function () {
            if (
              scope.birth_date && scope.birth_date.length &&
              scope.first_name && scope.first_name.length &&
              scope.last_name && scope.last_name.length &&
              (scope.sex == 2 || scope.sex == 1) &&
              scope.email && scope.email.length && scope.validateEmail(scope.email)) {
              if (!scope.valid_user_info) scope.valid_user_info = true;
            } else {
              if (scope.valid_user_info) scope.valid_user_info = false;
            }
          });

          scope.$on('pj.step.change', function (event) {
            var tags = [];
            var invalid = 0;
            Object.keys(scope.data).forEach(function (key) {
              var item = scope.data[key];
              if (!item.valid) {
                invalid++;
              } else {
              }
            });
            if (!scope.valid_user_info) {
              invalid++;
            }
            if (invalid == 0) {
              scope.valid_form = true;
            } else {
              scope.valid_form = false;
            }
          });


          var AUTH_HASH = null;
          if (scope.hash) {
            AUTH_HASH = scope.hash;
          } else if (getUrlVars()['auth_hash']) {
            AUTH_HASH = getUrlVars()['auth_hash'];
          }

          scope.locked_email = false;
          scope.locked_sex = false;
          scope.locked_first_name = false;
          scope.locked_last_name = false;
          scope.locked_birth_date = false;

          scope.tags = [];
          SP.on('init.success', function () {
            if (AUTH_HASH) {
              SP.send('load.user.info', {
                auth_hash: AUTH_HASH,
                all: 1
              });
              SP.on('load.user.info.success', function (data) {
                scope.$apply(function () {
                  scope.email = data.user.email;
                  scope.last_name = data.user.last_name;
                  scope.first_name = data.user.first_name;
                  scope.birth_date = data.user.birth_date;
                  scope.sex = data.user.sex;
                  if (data.user.email) {
                    scope.locked_email = true;
                  }
                  if (data.user.sex) {
                    scope.locked_sex = true;
                  }
                  if (data.user.first_name) {
                    scope.locked_first_name = true;
                  }
                  if (data.user.last_name) {
                    scope.locked_last_name = true;
                  }
                  if (data.user.birth_date) {
                    scope.locked_birth_date = true;
                  }
                  scope.show = true;
                });
              });
              SP.on('load.user.info.error', function (data) {
                scope.$apply(function () {
                  scope.locked_email = false;
                  scope.show = true;
                });
              });
            } else {
              scope.$apply(function () {
                scope.show = true;
              });
            }
          });

          scope.data = angular.copy(QUESTIONNAIRE_DATA);

          $(el).find('#status').fadeOut();
          $(el).find('.wrapper').fadeIn();
          $(el).find('#preloader').delay(350).fadeOut('slow');
          $('body').delay(350).css({'overflow': 'visible'});


          function update_user_data() {
            var user_data = {};
            if (scope.last_name && scope.last_name.length) {
              user_data.lastName = scope.last_name;
            }
            if (scope.email && scope.email.length) {
              user_data.email = scope.email;
            }
            if (scope.first_name && scope.first_name.length) {
              user_data.firstName = scope.first_name;
            }
            if (scope.birth_date && scope.birth_date.length) {
              user_data.birthDate = scope.birth_date;
            }
            if (scope.sex == 1 || scope.sex == 2) {
              user_data.sex = scope.sex;
            }
            SP.send('user.update', user_data);
            SP.on('user.update.success', function (data) {
              scope.$apply(function () {
                scope.user_info_updated = true;
                check_to_redirect();
                scope.data = angular.copy(QUESTIONNAIRE_DATA);
                //user data
                scope.birth_date = null;
                scope.last_name = null;
                scope.first_name = null;
                scope.sex = null;
                scope.email = null;
              })
            })
            SP.on('user.update.error', function (data) {
              console.log(data)
            });
          }

          var redirecting = false;

          function check_to_redirect() {
            if (scope.tags.length == 0 &&
              scope.vars.length == 0 &&
              scope.user_info_updated) {
              scope.sending = false;
              if (REDIRECT_URL && !redirecting) {
                redirecting = true;
                window.location.href = REDIRECT_URL;
              }
            }
          }

          function update_send_data() {
            var vars = [];
            var tags = [];
            tags.push('Прошел опрос');
            Object.keys(scope.data).forEach(function (key) {
              var item = scope.data[key];
              if (item && item.his_version && item.his_version_model) {
                vars[item.q] = item.his_version_model;
                tags.push(item.q + ' - Свой вариант');
              }
              for (var i = 0, len = item.a.length; i < len; i++) {
                var a = item.a[i];
                if (a && a.model) {
                  if (a.tag) {
                    tags.push(a.tag);
                  }
                  if (a.options) {
                    for (var y = 0, len = a.options.length; y < len; y++) {
                      if (a.options[y].tag && a.options[y].model) {
                        tags.push(a.options[y].tag);
                        if (a.options[y].his_version) {
                          vars[a.options[y].tag] = item.his_version_model;
                          tags.push(a.options[y].tag + ' - Свой вариант');
                        }
                      }
                    }
                  }
                }
              }
            });
            scope.tags = tags;
            scope.vars = vars;
          }

          function tags_sending() {
            if (!scope.tags.length) return;
            if (scope.tags.length > 9) {
              SP.send('tags.add', {
                tags: scope.tags.slice(0, 9),
                email: scope.email
              });
              scope.tags = scope.tags.slice(9);
              SP.on('tags.add.success', function (data) {
                tags_sending();
              });
            } else {
              SP.send('tags.add', {
                tags: scope.tags,
                email: scope.email
              });
              scope.tags = [];
            }

          }

          scope.sending = false;
          scope.submit = function () {
            if (!scope.valid_form || scope.sending) {
              return;
            }
            var once = true;
            scope.sending = true;
            update_send_data();
            tags_sending();
            SP.on('tags.add.success', function (data) {
              check_to_redirect();
              scope.show = false;
              if (once) {
                once = false;
                scope.$apply(function () {
                  scope.show = false;
                });
                var params = scope.vars;
                params.email = scope.email;
                if (scope.vars.length) {
                  SP.send('user.vars.add', params);
                  SP.on('user.vars.add.success', function () {
                    scope.vars = [];
                    check_to_redirect();
                  });
                  SP.on('user.vars.add.error', function (data) {
                    console.log(data);
                  });
                }
                update_user_data();
              }
            });
          };
        }
      }
    }]);

  window.addEventListener('load', function () {
    SP.send('init', {
      domain: '//sailplay.ru',
      partner_id: PJ_PARTNER_ID

    });
    document.createElement('pj_questionnaire');
    var banners = document.querySelectorAll('pj_questionnaire');
    for (var i = 0; i < banners.length; i += 1) {
      angular.bootstrap(banners[i], ['pj_questionnaire_module']);
    }
  });

}(SAILPLAY, document));