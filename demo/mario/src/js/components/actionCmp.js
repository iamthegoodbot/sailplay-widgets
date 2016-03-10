(function (angular, sp, jQuery) {

    angular.module('mario.directives.actions', ['mario.services.users', 'mario.services.actions'])

        .directive('actionsCmp', ['$sce', 'userService', 'actionService', function ($sce, userService, actionService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<section class="l-section tasks-cell shaded-cell" id="tasks">\n    <div class="tasks-cell__head">Доступные задания</div>\n\n    <div class="tasks-cell__row" data-ng-if="isActive()">\n\n        <div class="tasks-cell__col" data-ng-if="getTestData && !exist.test">\n            <div class="task-item shaded-cell" data-ng-click="startTest()">\n                <div class="task-item__left">\n                    <img class="task-item__ico1" src="image/task-icon-01.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head" data-ng-bind="getTestData.name"></div>\n                        <div class="task-item__gift" data-ng-bind="getTestData.points"></div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n        <div class="tasks-cell__col" data-ng-if="actions.partner_page && actions.partner_page.length">\n            <div class="task-item shaded-cell" data-ng-click="initSocials(actions.partner_page, \'partner_page\');">\n                <div class="task-item__left">\n                    <img class="task-item__ico2" src="image/task-icon-02.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Расскажи о Mario Berluchi<br> в социальных сетях</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n        <div class="tasks-cell__col" data-ng-if="actions.like && actions.like.length">\n            <div class="task-item shaded-cell" data-ng-click="initSocials(actions.like, \'like\');">\n                <div class="task-item__left">\n                    <img class="task-item__ico4" src="image/task-icon-04.png" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head">Вступить в группу Mario Berluchi в социальных сетях</div>\n                        <div class="task-item__gift">50 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n        <div class="tasks-cell__col" data-ng-repeat="action in customActions" \n             data-ng-if="!exist[action.variable]">\n            <div class="task-item shaded-cell" data-ng-click="openAuth(action.variable)">\n                <div class="task-item__left">\n                    <img class="{{ action.imgClass }}" data-ng-src="{{ action.imgLink }}" alt="">\n                </div>\n                <div class="task-item__right">\n                    <div class="task-item__right-inner">\n                        <div class="task-item__head" data-ng-bind="action.name"></div>\n                        <div class="task-item__gift">{{ action.points }}</div>\n                    </div>\n                </div>\n            </div>\n            <!-- /task item -->\n        </div>\n        <!-- /col -->\n        \n    </div>\n    <!-- /row -->\n\n    <div class="task-view shaded-cell" data-ng-if="getTestData && show && show.test">\n        <div class="task-view__close" data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico1" src="image/task-icon-01.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            {{ getTestData.name }}\n                            <span class="task-view__gift" data-ng-bind="getTestData.points"></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <div class="interv__quest-count">\n                    Вопрос {{ testStep }} / {{ testData.length }}\n                </div>\n                <div class="interv__quest" data-ng-bind="testData[testStep - 1].q"></div>\n                <div class="interv__answer-row">\n\n                    <div class="interv__answer" data-ng-repeat="a in testData[testStep - 1].a">\n                        <div class="custom-radio__wrap interv__radio js-create-radio">\n                            <div class="custom-radio">\n                                <a href="#" class="custom-radio__text" data-ng-click="setAnswer(a);$event.preventDefault();">Далее</a>\n                                <input type="radio" hidden name="name1">\n                            </div>\n                        </div>\n                        <div class="interv__answer-label js-label-satellite" data-ng-bind="a.title"></div>\n                    </div>\n                    <!-- answer -->\n                </div>\n                <!-- /row -->\n\n\n            </div>\n            <!-- /task-view__body -->\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell"\n         data-ng-repeat="action in customActions" \n         data-ng-if="show && show[action.variable]">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="{{ action.imgClass }}" data-ng-src="{{ action.imgLink }}" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            {{ action.name }}\n                            <span class="task-view__gift">{{ action.points }}</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body" data-ng-bind-html="getHtml(action.desc)"></div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell like" data-ng-if="show && show.like">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico4" src="image/task-icon-04.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Вступить в группу Mario Berluchi в социальных сетях\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <img src="//dev4you.info/test/mario/image/status.gif" class="task-preloader" alt="">\n                <div class="task-view__soc-wrap clearfix vHidden">\n                    <div class="task-view__soc-item col-3" data-ng-repeat="action in actions.like">\n                        <span data-styles="{{ cssLink }}" data-sp-action="{{ action._actionId }}"></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell partner_page" data-ng-if="show && show.partner_page">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <img class="task-item__ico2" src="image/task-icon-02.png" alt="">\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Расскажи о Mario Berluchi в социальных сетях\n                            <span class="task-view__gift">50 баллов</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <img src="//dev4you.info/test/mario/image/status.gif" class="task-preloader" alt="">\n               <div class="task-view__soc-wrap clearfix vHidden">\n                   <div class="task-view__soc-item col-3" data-ng-repeat="action in actions.partner_page">\n                       <span data-styles="{{ cssLink }}" data-sp-action="{{ action._actionId }}"></span>\n                   </div>\n               </div>\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n    <div class="task-view shaded-cell"\n         data-ng-if="auth">\n        <div class="task-view__close"  data-ng-click="clear()"></div>\n        <div class="task-view__left">\n            <!--<img class="{{ action.imgClass }}" data-ng-src="{{ action.imgLink }}" alt="">-->\n        </div>\n        <!-- /left -->\n\n        <div class="task-view__right">\n            <div class="task-view__header">\n                <div class="task-view__header-out">\n                    <div class="task-view__header-inner">\n                        <div class="task-view__head">\n                            Для получения бонусов необходимо вступить в наш клуб\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="task-view__body">\n                <a href="http://marioberluchi.ru/signup/" class="common-btn reg" >Зарегистрироваться</a>\n            </div>\n        </div>\n        <!-- /right -->\n    </div>\n    <!-- /task view -->\n\n</section>\n',
                scope: true,
                link: function (scope) {
                    scope.show = {};
                    scope.actions = {};
                    scope.exist = {};
                    scope.cssLink = actionService.getActionsCssLink();
                    scope.clear = function () {
                        scope.auth = false;
                        scope.show = {};
                    };
                    scope.getHtml = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                    scope.openAuth = function (variable) {
                        if (!scope.user) {
                            scope.auth = true;
                        } else {
                            if(variable) {
                                scope.show[variable] = true;
                            }
                        }
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

                    scope.customActions = actionService.getCustomAction();
                    var actionsTags = scope.customActions.map(function (item) {
                        return item.tag;
                    });
                    if (actionService.getTestTag()) {
                        actionsTags.unshift(actionService.getTestTag());
                    }
                    userService.existTags(actionsTags).then(function (data) {
                        var iter = 0;
                        if (actionService.getTestTag()) {
                            scope.exist.test = data[iter].exist;
                            iter++;
                        }
                        for (var i = 0, len = scope.customActions.length; i < len; i++) {
                            scope.exist[scope.customActions[i].variable] = data[i + iter].exist;
                        }
                    });
                    scope.tags = [];
                    scope.getTestData = actionService.getTestData();
                    scope.setAnswer = function (answer) {
                        scope.tags.push(answer.tag);
                        if (scope.testStep == scope.testData.length) {
                            scope.tags.push(actionService.getTestTag());
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
                        if (!scope.user) {
                            scope.auth = true;
                        } else {
                            scope.show[type] = true;
                            setTimeout(function () {
                                sp.send('actions.parse', angular.extend([], actions));
                                scope.initAction(type);
                            }, 10);
                        }
                    };
                    scope.startTest = function () {
                        if (!scope.user) {
                            scope.auth = true;
                        } else {
                            scope.tags = [];
                            scope.show.test = true;
                            scope.testData = actionService.getTests();
                            scope.testStep = 1;
                            setTimeout(function () {
                                initTestBtns();
                            }, 10);
                        }
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
                        if (timeOut) {
                            clearTimeout(timeOut);
                        }
                        var elem = jQuery('.task-view.' + type);
                        if (!elem) return;
                        timeOut = setTimeout(function () {
                            elem.find('.task-preloader').hide();
                            elem.find('.task-view__soc-wrap').removeClass('vHidden');
                        }, 3000);

                    };
                    scope.isActive = function () {
                        return Object.keys(scope.show).length || scope.auth ? false : true;
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