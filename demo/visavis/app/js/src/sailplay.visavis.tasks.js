(function () {

		var dataObject = [
				{"type": 'action', "title": "Размести свой лук в соцсетях" , "url": "http://visavis-fashion.ru", "tag": "tag", "scores": 12, "order": 1},
				{"type": 'action', "title": "Оставить отзыв" , "url": "http://visavis-fashion.ru", "tag": "tag", "scores": 12, "order": 2},
				{"type": 'action', "title": "Совершить покупку" , "url": "http://visavis-fashion.ru", "tag": "tag", "scores": 12, "order": 4},
				{
						"type": "test",
						"order": 3,
						"title": "Пройти опрос",
						"name": "Опрос 1",
						"scores": 553,
						"tag": "Закончил опрос 1",
						"questions": [
								{
										"text": "Вопрос 1",
										"options": [
												{"text": "Вариант 1", "tag": "Тег 1"},
												{"text": "Вариант 2", "tag": "Тег 2"},
												{"text": "Вариант 3", "tag": "Тег 3"}
										]
								},
								{
										"text": "Вопрос 2",
										"options": [
												{"text": "Вариант 1", "tag": "Тег 1"},
												{"text": "Вариант 2", "tag": "Тег 2"},
												{"text": "Вариант 3", "tag": "Тег 3"}
										]
								},
								{
										"text": "Вопрос 3",
										"options": [
												{"text": "Вариант 1", "tag": "Тег 1"},
												{"text": "Вариант 2", "tag": "Тег 2"},
												{"text": "Вариант 3", "tag": "Тег 3"}
										]
								}
						]
				}
		]

		angular.module('visavis.tasks', [])

				.directive('sailplayTasks', function () {

						return {
								restrict: 'E',
								replace: true,
								template: '' +
								'<div class="spvv">' +
										'<div class="spvv-tasks">' +
												'<div class="spvv-simple__title"> задания</div>' +
												'<div class="spvv-simple__subtitle"> за выполнение которых, вы получите баллы</div>' +
												'<div class="spvv-tasks__slider "  data-ng-class="{\'show_test\': show_test}">' +
														'<div class="spvv-tasks__list">' +
																'<div class="spvv-tasks__list-inner">' +

																		'<a class="spvv-task" href="javascript:void(0)" data-ng-repeat="item in data | orderBy: \'order\'" data-ng-click="$parent.current_data = item; item.type == \'test\' ? test(item) : action(item) ;"> ' +
																		'<span class="spvv-task__inner">' +
																				'<span class="spvv-task__name">' +
																					 '{{ item.title }}' +
																				'</span>' +
																				'<span class="spvv-task__count">' +
																						'<span>{{ item.scores }}</span> баллов' +
																				'</span>' +
																		'</span>' +
																		'</a>'+

																'</div>' +
														'</div>' +

														'<div class="spvv-test hidden" data-ng-if="show_test">' +
																'<div class="spvv-test__head">' +
																	'<a class="spvv-test__head-back" href="javascript: void(0);" data-ng-click="back()"></a>' +
																	'<div class="spvv-test__head-title">{{ test_data.title }}</div>' +
																	'<div class="spvv-test__head-points"><span>{{ test_data.scores }}</span> баллов</div>' +
																'</div>' +
																'<div class="spvv-test__list">' +
																		'<div class="spvv-quest">' +
																				'<div class="spvv-quest__hint"> Вопрос {{ step + 1 }} / {{ test_data.questions.length }}</div>' +
																				'<div class="spvv-quest__title">{{ test_data.questions[step].text }}</div>' +
																				'<div class="spvv-quest__content">' +

																					 '<div class="spvv-quest__i"' +
																						' data-ng-repeat="item_test in test_data.questions[step].options | orderBy: \'order\'"' +
																						' data-ng-click="select($event, item_test);" >' +
																								'<div class="spvv-quest__i-text">' +
																									'<div class="text">Далее</div>' +
																								'</div>' +
																								'{{ item_test.text }}' +
																						'</div>' +

																				'</div>' +
																		'</div>' +
																'</div>' +
														'</div>' +

												'</div>' +
										'</div>' +
								'</div>',
								scope: true,
								link: function (scope) {

								 //		example data
									scope.data = dataObject;

									scope.current_data = {};

							  scope.test_data = {};
									scope.show_test = false;
									scope.step = 0;
									scope.tags = [];

						   scope.test = function (item){
								   scope.show_test = true;
								   scope.test_data = item;
									};

									scope.select = function(e, item){
											var className = 'selected';
											var elem = angular.element(e.currentTarget);
											if(elem.hasClass(className)) {
													scope.tags.push(item.tag);
													if(scope.step + 1 == scope.test_data.questions.length) {
															scope.tags.unshift(scope.test_data.tag);
															SAILPLAY.send('tags.add', scope.tags);
													} else {
															++scope.step;
													}

											} else {
													elem.parent().children().removeClass(className);
													elem.addClass(className);
											}

									};

									scope.back = function(){
											if(scope.step > 0)
											{
													scope.step--;
													scope.tags.pop();
											}
											else
											{
													scope.tags = [];
													scope.show_test = false;
											}
									};

									scope.action = function(item){
											SAILPLAY.send('tags.add',new Array(item.tag));
									};

									SAILPLAY.on('tags.add.success', function(res){
											console.log('tags added: ', res);
											scope.$apply(function(){
													if(scope.current_data.type && scope.current_data.type == 'action') {
															window.location.href = scope.current_data.url;
													} else if(scope.current_data.type && scope.current_data.type == 'test'){
															scope.show_test = false;
													}
											})
									});


								}
						}

				});

		window.addEventListener('load', function () {
				document.createElement('sailplay-tasks');
				var banners = document.querySelectorAll('sailplay-tasks');
				for (var i = 0; i < banners.length; i += 1) {
						angular.bootstrap(banners[i], ['visavis.tasks']);
				}
		});

}());