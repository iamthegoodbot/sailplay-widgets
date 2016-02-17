(function (angular, sp, jQuery) {

    angular.module('mario.directives.actions', ['mario.services.users', 'mario.services.actions'])

        .directive('actionsCmp', ['userService', 'actionService', function (userService, actionService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<section class="l-section tasks-cell shaded-cell" id="tasks">\n    <div class="tasks-cell__head">Доступные задания</div>\n\n    <div class="tasks-cell__row" data-ng-if="isActive()">\n\n        <div class="tasks-cell__col" data-ng-if="!exist.test">\n            <div class="task-item shaded-cell" data-ng-click="startTest()">\n                <div class="task-item__left">\n                    <img class="task-item__ico1" src="image/task-icon-01.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Пройти опрос</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n\n        <div class="tasks-cell__col" data-ng-if="actions.partner_page && actions.partner_page.length">\n            <div class="task-item shaded-cell" data-ng-click="show.partner_page = true;initSocials(actions.partner_page, \'partner_page\');">\n                <div class="task-item__left">\n                    <img class="task-item__ico2" src="image/task-icon-02.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Расскажи о Mario Berluchi<br> в социальных сетях</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n\n        <div class="tasks-cell__col"  data-ng-if="!exist.profile">\n            <div class="task-item shaded-cell" data-ng-click="show.profile = true">\n                <div class="task-item__left">\n                    <img class="task-item__ico3" src="image/task-icon-03.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Заполни профиль</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n\n        <div class="tasks-cell__col" data-ng-if="actions.like && actions.like.length">\n            <div class="task-item shaded-cell" data-ng-click="show.like = true;initSocials(actions.like, \'like\');">\n                <div class="task-item__left">\n                    <img class="task-item__ico4" src="image/task-icon-04.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Вступить в группу Mario Berluchi в социальных сетях</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n\n        <div class="tasks-cell__col" data-ng-if="!exist.view">\n            <div class="task-item shaded-cell" data-ng-click="show.view = true">\n                <div class="task-item__left">\n                    <img class="task-item__ico5" src="image/task-icon-05.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Оставь отзыв о магазине</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n\n        <div class="tasks-cell__col" data-ng-if="!exist.instagram">\n            <div class="task-item shaded-cell" data-ng-click="show.instagram = true">\n                <div class="task-item__left">\n                    <img class="task-item__ico6" src="image/task-icon-06.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Опубликовать лук с Mario Berluchi в Instagram</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n    </div>\n    <!-- /row -->\n\n    <div class="task-view shaded-cell" data-ng-if="show && show.test">\n        <div class="task-view__close" data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico1" src="image/task-icon-01.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Пройти опрос\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <div class="interv__quest-count">\n                    Вопрос {{ testStep }} / {{ testData.length }}\n                </div>\n                <div class="interv__quest" data-ng-bind="testData[testStep - 1].q"></div>\n                <div class="interv__answer-row">\n\n                    <div class="interv__answer" data-ng-repeat="a in testData[testStep - 1].a">\n                        <div class="custom-radio__wrap interv__radio js-create-radio">\n                            <div class="custom-radio">\n                                <a href="#" class="custom-radio__text" data-ng-click="setAnswer(a);$event.preventDefault();">Далее</a>\n                                <input type="radio" hidden name="name1">\n                            </div>\n                        </div>\n                        <div class="interv__answer-label js-label-satellite" data-ng-bind="a.title"></div>\n                    </div>\n                    <!-- answer -->\n                </div>\n                <!-- /row -->\n\n\n            </div>\n            <!-- /task-view__body -->\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell" data-ng-if="show && show.instagram">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico6" src="image/task-icon-06.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Опубликовать лук с Mario Berluchi в Instagram\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                1. Разместите отзыв/фотографию в инстаграм.<br>\n                2. Оставьте отзыв и отметьте наш аккаунт на фото @marioberluchi.<br>\n                3. Отправьте нам письмо <a href="mailto:shop@marioberluchi.ru">shop@marioberluchi.ru</a> с указанием ссылки на эту фотографию или ваш аккаунт<br>\n                4. Получите баллы!\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell" data-ng-if="show && show.profile">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico3" src="image/task-icon-03.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Опубликовать лук с Mario Berluchi в Instagram\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                Перейди на страницу <a href="http://marioberluchi.ru/my/profile/">"мой профиль"</a> и укажи информацию о себе - это позволит нам лучше узнать тебя и делать приятные предложения по случаю :)\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell" data-ng-if="show && show.view">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico5" src="image/task-icon-05.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Оставь отзыв о магазине\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                Оставить отзыв возможно как о магазине в целом <a href="http://marioberluchi.ru/reviewsplus/allreviews">http://marioberluchi.ru/reviewsplus/allreviews</a>.<br>\n                Так и о любом понравившемся тебе товаре отдельно\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell like" data-ng-if="show && show.like">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico4" src="image/task-icon-04.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Вступить в группу Mario Berluchi в социальных сетях\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <img src="//dev4you.info/test/mario/image/status.gif" class="task-preloader" alt="">\n                <div class="task-view__soc-wrap clearfix vHidden">\n                    <div class="task-view__soc-item col-3" data-ng-repeat="action in actions.like">\n                        <span data-styles="{{ cssLink }}" data-sp-action="{{ action._actionId }}"></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell partner_page" data-ng-if="show && show.partner_page">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico2" src="image/task-icon-02.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Расскажи о Mario Berluchi в социальных сетях\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <img src="//dev4you.info/test/mario/image/status.gif" class="task-preloader" alt="">\n               <div class="task-view__soc-wrap clearfix vHidden">\n                   <div class="task-view__soc-item col-3" data-ng-repeat="action in actions.partner_page">\n                       <span data-styles="{{ cssLink }}" data-sp-action="{{ action._actionId }}"></span>\n                   </div>\n               </div>\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n</section>\n',
                scope: true,
                link: function (scope) {
                    scope.show = {};
                    scope.actions = {};
                    scope.exist = {};
                    scope.cssLink = actionService.getActionsCssLink();
                    scope.clear = function () {
                        scope.show = {};
                    };
                    function update() {
                        scope.clear();
                        userService.loadInfo().then(function (user) {
                            scope.user = user;
                            scope.$digest();
                        });
                        actionService.loadList().then(function (actions) {
                            scope.actions.like = actionService.getActionsByGroup(actions, 'like');
                            scope.actions.partner_page = actionService.getActionsByGroup(actions, 'partner_page');
                            scope.$digest();
                        });
                    }

                    userService.existTags([
                        actionService.getTags().profile,
                        actionService.getTags().view,
                        actionService.getTags().test,
                        actionService.getTags().instagram
                    ]).then(function (data) {
                        scope.exist.profile = data[0].exist;
                        scope.exist.view = data[1].exist;
                        scope.exist.test = data[2].exist;
                        scope.exist.instagram = data[3].exist;
                    });
                    scope.tags = [];
                    scope.setAnswer = function (answer) {
                        scope.tags.push(answer.tag);
                        if (scope.testStep == scope.testData.length) {
                            scope.tags.push(actionService.getTags().test);
                            sp.send('tags.add', angular.extend([], scope.tags));
                            scope.exist.test = true;
                            scope.clear();
                        } else {
                            scope.testStep++;
                            setTimeout(function () {
                                initTestBtns();
                            }, 10);
                        }
                    };
                    scope.initSocials = function (actions, type) {
                        setTimeout(function () {
                            sp.send('actions.parse', angular.extend([], actions));
                            scope.initAction(type);
                        }, 10);
                    };
                    scope.startTest = function () {
                        scope.tags = [];
                        scope.show.test = true;
                        scope.testData = actionService.getTests();
                        scope.testStep = 1;
                        setTimeout(function () {
                            initTestBtns();
                        }, 10)
                    };
                    function initTestBtns() {
                        jQuery('.js-create-radio').simpleRadio();
                        jQuery('.js-label-satellite').hover(function () {
                            jQuery(this).siblings('.js-create-radio').addClass('hover');
                        }, function () {
                            jQuery(this).siblings('.js-create-radio').removeClass('hover');
                        }).click(function () {
                            jQuery(this).siblings('.js-create-radio').click();
                        });
                    }
                    var timeOut;
                    scope.initAction = function (type) {
                        if(timeOut) {
                            clearTimeout(timeOut);
                        }
                        var elem = jQuery('.task-view.' + type);
                        console.log(elem);
                        if (!elem) return;
                        timeOut = setTimeout(function(){
                            elem.find('.task-preloader').hide();
                            elem.find('.task-view__soc-wrap').removeClass('vHidden');
                        }, 3000);

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
        angular.bootstrap(elems[i], ['mario.directives.actions']);
    }

}(window.angular, window.SAILPLAY, window.$));