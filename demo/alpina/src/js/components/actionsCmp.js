(function (angular, sp, jQuery) {

    angular.module('alpina.directives.actions', ['alpina.services.users', 'alpina.services.actions', 'alpina.tools.bDaySelect'])

        .directive('actionsCmp', ['userService', 'actionService', function (userService, actionService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    <section class="container std-section" data-ng-show="!show_form">\n        <div class="tasks-section common-shaded-cell">\n            <div class="tasks-section__head">Список заданий</div>\n            <div class="tasks-section__capt"\n                 data-ng-bind="actions && actions.length || !form_exist ? \'За выполнение которых вы получите баллы\' : \'Нет доступных действий\'"></div>\n            <div class="tasks-section__row" data-ng-class="{visibilityHidden : hidden}">\n\n                <div class="tasks-section__col" data-ng-repeat="action in actions">\n                    <div class="tasks-cell {{ getIcon(action) }}">\n                        <div class="tasks-cell__right">\n                            <div class="tasks-cell__text" data-ng-bind="transformTitle(action)"></div>\n                            <div class="tasks-cell__gift" data-ng-bind="getActionPoints(action)"></div>\n                            <span data-ng-if="action.socialType && user"\n                                  href="#" class="tasks-cell__iframe-wrap" data-sp-action="{{ action._actionId }}"\n                                  data-styles="{{ css_link }}">Выполнить</span>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="tasks-section__col" data-ng-if="!form_exist">\n                    <div class="tasks-cell this-icon5">\n                        <div class="tasks-cell__right">\n                            <div class="tasks-cell__text">Дополнительные <br>сведения</div>\n                            <div class="tasks-cell__gift">20 баллов</div>\n                            <span class="tasks-cell__btn js-open-task"\n                                  data-ng-click="showForm()" data-task="js-task-1">Выполнить</span>\n                        </div>\n                    </div>\n                </div>\n                <!-- /col -->\n\n                <!--<div class="tasks-section__col" data-ng-if="false">-->\n                    <!--<div class="tasks-cell this-icon6">-->\n                        <!--<div class="tasks-cell__right">-->\n                            <!--<div class="tasks-cell__text">Подпишитесь на <br>нашу рассылку</div>-->\n                            <!--<div class="tasks-cell__gift">150 баллов</div>-->\n                            <!--<span class="tasks-cell__btn js-open-task" data-task="js-task-2"-->\n                                  <!--data-ng-click="showSubscribe()">Выполнить</span>-->\n                        <!--</div>-->\n                    <!--</div>-->\n                <!--</div>-->\n                <!-- /col -->\n\n            </div>\n            <!-- /row -->\n        </div>\n    </section>\n\n    <section class="container std-section js-task-1" data-ng-if="show_form">\n        <div class="common-shaded-cell form-cell">\n            <div class="form-cell__head">Список заданий</div>\n            <div class="form-cell__capt">За выполнение которых вы получите баллы</div>\n\n            <div class="form-cell-top">\n                <div class="form-cell-top-close" data-ng-click="closeOtherActions()"></div>\n                <div class="tasks-cell-static this-icon5">\n                    <div class="tasks-cell__right">\n                        <div class="tasks-cell__text">Дополнительные <br>сведения</div>\n                        <div class="tasks-cell__gift">20 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <form class="form-cell-body" data-ng-submit="sendForm()">\n                <div class="form-cell-body__inner">\n                    <div class="form-cell-set">\n                        <div class="form-cell-set__head this-head1">Есть ли у вас дети?</div>\n                        <div class="common-inline-param">\n                            <input name="has_childrens" type="radio" class="js-create-radio"\n                                   data-ng-value="1"\n                                   data-ng-model="has_childrens">\n                            <div class="common-radio-label js-label-satellite">Да</div>\n                        </div>\n                        <div class="common-inline-param">\n                            <input name="has_childrens" type="radio" class="js-create-radio"\n                                   data-ng-value="0"\n                                   data-ng-model="has_childrens">\n                            <div class="common-radio-label js-label-satellite">Нет</div>\n                        </div>\n                    </div>\n                    <!-- /set -->\n                    <div class="form-cell-set" data-ng-show="has_childrens">\n                        <div class="form-cell-set__head">Возраст детей</div>\n                        <select name="customnameforchildrenselect0" id="" class="js-create-select common-selectize">\n                            <option value="" chacked="chacked">Укажите возраст ребенка</option>\n                            <option value="1 год">1 год</option>\n                            <option value="2 года">2 года</option>\n                            <option value="3 года">3 года</option>\n                            <option value="4 года">4 года</option>\n                            <option value="5 лет">5 лет</option>\n                            <option value="6 лет">6 лет</option>\n                            <option value="7 лет">7 лет</option>\n                            <option value="8 лет">8 лет</option>\n                            <option value="9 лет">9 лет</option>\n                            <option value="10 лет">10 лет</option>\n                            <option value="11 лет">11 лет</option>\n                            <option value="12 лет">12 лет</option>\n                            <option value="13 лет">13 лет</option>\n                            <option value="14 лет">14 лет</option>\n                            <option value="15 лет">15 лет</option>\n                            <option value="16 лет">16 лет</option>\n                            <option value="17 лет">17 лет</option>\n                            <option value="18 лет">18 лет</option>\n                        </select>\n\n                        <div class="js-container-toclone">\n\n                        </div>\n                        <select name="" id="" class="js-select-toclone common-selectize common-selectize_clone"\n                                style=\'display: none;\'>\n                            <option value="" chacked="chacked">Укажите возраст ребенка</option>\n                            <option value="1 год">1 год</option>\n                            <option value="2 года">2 года</option>\n                            <option value="3 года">3 года</option>\n                            <option value="4 года">4 года</option>\n                            <option value="5 лет">5 лет</option>\n                            <option value="6 лет">6 лет</option>\n                            <option value="7 лет">7 лет</option>\n                            <option value="8 лет">8 лет</option>\n                            <option value="9 лет">9 лет</option>\n                            <option value="10 лет">10 лет</option>\n                            <option value="11 лет">11 лет</option>\n                            <option value="12 лет">12 лет</option>\n                            <option value="13 лет">13 лет</option>\n                            <option value="14 лет">14 лет</option>\n                            <option value="15 лет">15 лет</option>\n                            <option value="16 лет">16 лет</option>\n                            <option value="17 лет">17 лет</option>\n                            <option value="18 лет">18 лет</option>\n                        </select>\n                        <div class="form-cell-set__append js-clone-child">Добавить ребенка <span\n                                class="form-cell-set__append-ico"></span></div>\n                    </div>\n                    <!-- /set -->\n\n                    <div class="form-cell-set">\n                        <div class="form-cell-set__head">Ваша дата рождения</div>\n                        <div class="form-cell-set__day">\n                            <select name="b_day" id="" class="js-create-select common-selectize">\n                                <option value="" chacked="chacked">День</option>\n                                <option value="01">01</option>\n                                <option value="02">02</option>\n                                <option value="03">03</option>\n                                <option value="04">04</option>\n                                <option value="05">05</option>\n                                <option value="06">06</option>\n                                <option value="07">07</option>\n                                <option value="08">08</option>\n                                <option value="09">09</option>\n                                <option value="10">10</option>\n                                <option value="11">11</option>\n                                <option value="12">12</option>\n                                <option value="13">13</option>\n                                <option value="14">14</option>\n                                <option value="15">15</option>\n                                <option value="16">16</option>\n                                <option value="17">17</option>\n                                <option value="18">18</option>\n                                <option value="19">19</option>\n                                <option value="20">20</option>\n                                <option value="21">21</option>\n                                <option value="22">22</option>\n                                <option value="23">23</option>\n                                <option value="24">24</option>\n                                <option value="25">25</option>\n                                <option value="26">26</option>\n                                <option value="27">27</option>\n                                <option value="28">28</option>\n                                <option value="29">29</option>\n                                <option value="30">30</option>\n                                <option value="31">31</option>\n                            </select>\n                        </div>\n                        <!-- /day -->\n                        <div class="form-cell-set__month">\n                            <select name="b_month" id="" class="common-selectize js-create-select">\n                                <option value="" chacked="chacked">месяц</option>\n                                <option value="1">январь</option>\n                                <option value="2">февраль</option>\n                                <option value="3">март</option>\n                                <option value="4">апрель</option>\n                                <option value="5">май</option>\n                                <option value="6">июнь</option>\n                                <option value="7">июль</option>\n                                <option value="8">август</option>\n                                <option value="9">сентябрь</option>\n                                <option value="10">октябрь</option>\n                                <option value="11">ноябрь</option>\n                                <option value="12">декабрь</option>\n                            </select>\n                        </div>\n                        <!-- /month -->\n                        <div class="form-cell-set__year">\n                            <select name="b_year" id="" class="common-selectize js-create-select years">\n                                <option value="" chacked="chacked">год</option>\n                            </select>\n                        </div>\n                        <!-- /year -->\n                    </div>\n                    <!-- /set -->\n\n                    <div class="form-cell-set">\n                        <div class="form-cell-set__head">Ваше хобби</div>\n                        <select name="hobbies" id="" class="js-create-select common-selectize hobbs">\n                            <option value="" chacked="chacked">Укажите ваше хобби</option>\n                        </select>\n                    </div>\n                    <!-- /set -->\n\n                    <div class="form-cell-set">\n                        <div class="form-cell-set__head">Сфера работы</div>\n                        <select name="proff" id="" class="js-create-select common-selectize profs">\n                            <option value="" chacked="chacked">Укажите сферу работы</option>\n                        </select>\n                    </div>\n                    <!-- /set -->\n\n                    <input type="submit" class="common-btn common-submit form-cell-body__btn"\n                           value="Сохранить изменения">\n\n                </div>\n                <!-- /form-cell-body__inner -->\n            </form>\n            <!-- /form.form-cell-body -->\n        </div>\n        <!-- /form-cell -->\n    </section>\n\n    <section class="container std-section js-task-2" data-ng-if="false">\n        <div class="common-shaded-cell form-cell">\n            <div class="form-cell__head">Список заданий</div>\n            <div class="form-cell__capt">За выполнение которых вы получите баллы</div>\n\n            <div class="form-cell-top">\n                <div class="tasks-cell-static this-icon5">\n                    <div class="form-cell-top-close" data-ng-click="closeOtherActions()"></div>\n\n                    <div class="tasks-cell__right">\n                        <div class="tasks-cell__text">Подписаться <br>на рассылку</div>\n                        <div class="tasks-cell__gift">150 баллов</div>\n                    </div>\n                </div>\n            </div>\n            <form class="form-cell-body" data-ng-submit="subscribe(subscribeEmail)">\n                <div class="form-cell-body__inner">\n                    <div class="form-cell-set">\n                        <div class="form-cell-set__head">E-mail</div>\n                        <input type="email" class="common-input"\n                               data-ng-model="subscribeEmail" placeholder="Укажите ваш E-mail">\n                    </div>\n                    <!-- /set -->\n\n                    <input type="submit" class="common-btn common-submit form-cell-body__btn"\n                           value="Сохранить изменения">\n\n                </div>\n                <!-- /form-cell-body__inner -->\n            </form>\n            <!-- /form.form-cell-body -->\n        </div>\n        <!-- /form-cell -->\n    </section>\n</div>',
                scope: true,
                link: function (scope, el) {
                    var timeOut;
                    scope.actions = null;
                    scope.hidden = true;
                    scope.css_link = actionService.getActionsCssLink();
                    scope.user = null;
                    scope.show_form = false;
                    //scope.show_subscribe = false;
                    //scope.subscribe_exist = false;
                    scope.form_exist = false;
                    scope.subscribeEmail = null;
                    function update() {
                        scope.hidden = true;
                        //scope.show_subscribe = false;
                        scope.show_form = false;
                        userService.loadInfo().then(function (info) {
                            scope.user = info;
                            scope.$digest();
                        });
                        actionService.loadList().then(function (actions) {
                            scope.actions = angular.extend([], actions);
                            if (scope.actions.length) {
                                setTimeout(function () {
                                    sp.send('actions.parse', angular.extend([], actions));
                                    timeOut = setTimeout(function () {
                                        var iframes = scope.actions.filter(function (item) {
                                            return item.socialType;
                                        });
                                        if (iframes.length == document.querySelectorAll('.tasks-section__col iframe').length) {
                                            clearTimeout(timeOut);
                                            setTimeout(function () {
                                                scope.hidden = false;
                                                scope.$digest();
                                            }, 300);
                                        } else {
                                            if (typeof  timeOut == 'function') {
                                                timeOut();
                                            }
                                            scope.$digest();
                                        }
                                    }, 100);
                                }, 100);
                            } else {
                                scope.hidden = false;
                            }
                            scope.$digest();
                        });
                    };

                    scope.getActionPoints = function (action) {
                        return action.points + ' баллов';
                    };
                    sp.on('actions.perform.success', function (data) {
                        update();
                        scope.$digest();
                    });
                    scope.closeOtherActions = function () {
                        scope.show_form = false;
                        //scope.show_subscribe = false;
                    };
                    scope.transformTitle = actionService.getTitle;
                    scope.getIcon = actionService.getIcon;
                    update();

                    var tags = [actionService.getTag('fillProfile')];
                    userService.existTags(tags).then(function (data) {
                        if (data) {
                            if (data[0]) {
                                scope.form_exist = data[0].exist;
                            }
                            //if (data[1]) {
                            //    scope.subscribe_exist = data[1].exist;
                            //}
                        }
                        scope.$digest();
                    });

                    // SUBSCRIBE
                    scope.subscribe = function (email) {
                        if (!email) return;
                        scope.show_subscribe = false;
                        scope.subscribe_exist = true;
                        sp.send('tags.add', {
                            tags: [actionService.getTag('subscribe')],
                            identify: {
                                email: email
                            }
                        });
                    };

                    sp.on('tags.add.success', function () {
                        update();
                    });

                    // FORM
                    scope.has_childrens = true;
                    function validForm(obj) {
                        if (!obj) return false;
                        var errors = 0;
                        for (var item in obj) {
                            if (obj.hasOwnProperty(item)) {
                                if (obj[item].length == 0) {
                                    if (obj.has_childrens == 0 && item.indexOf('customnameforchildrenselect') != -1) {
                                    } else {
                                        errors++;
                                    }
                                }
                            }
                        }
                        if (errors > 0) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    var paramObj = {};
                    scope.sendForm = function () {
                        if(!EMAIL) {
                            console.log('Email undefined');
                        }
                        scope.form_exist = true;
                        paramObj = {};
                        var serialized = jQuery(el).find('form').eq(0).serializeArray();
                        jQuery.each(serialized, function (_, kv) {
                            paramObj[kv.name] = kv.value;
                            if (serialized.length - 1 == _) {
                                send(paramObj);
                            }
                        });
                        function send() {
                            if (validForm(paramObj)) {
                                scope.show_form = false;
                                var bday = paramObj.b_year + '-' + paramObj.b_month + '-' + paramObj.b_day;
                                sp.send('user.update', { birthDate : bday , email: EMAIL});
                            }
                        }
                    };
                    sp.on('user.update.success', function () {
                        scope.$apply(function () {
                            var tags = [];
                            tags.push(actionService.getTag('fillProfile'));
                            if (paramObj.proff) {
                                tags.push(actionService.getProfessionsTag(paramObj.proff));
                            }
                            if (paramObj.hobbies) {
                                tags.push(actionService.getHobbiesTag(paramObj.hobbies));
                            }
                            if(paramObj.has_childrens) {
                                tags.push(actionService.getTag('hasChildren'));
                                for (var item in paramObj) {
                                    if (paramObj.hasOwnProperty(item)) {
                                        if (item.indexOf('customnameforchildrenselect') != -1) {
                                            tags.push(actionService.getTag('children') + ' ' + paramObj[item])
                                        }
                                    }
                                }
                            }
                            sp.send('tags.add', tags);
                        });
                    });
                    function appendToSelect(array, className) {
                        var elem = jQuery('.js-create-select.' + className);
                        if (!elem || !array) return;
                        if (!elem[0] || !elem[0].selectize) {
                            elem.selectize();
                        }
                        for (var i = 0, len = array.length; i < len; i++) {
                            elem[0].selectize.addOption({value: array[i], text: array[i]});
                        }
                    }

                    var current_year = new Date().getFullYear();
                    var arr = [];
                    for (var i = 90; i > 0; i--) {
                        arr.push(current_year - i);
                    }
                    scope.showSubscribe = function () {
                        scope.show_subscribe = true;
                    };
                    scope.showForm = function () {
                        scope.show_form = true;
                        setTimeout(function () {
                            jQuery('.js-create-select').selectize();
                            appendToSelect(actionService.getHobbies(), 'hobbs');
                            appendToSelect(actionService.getProfessions(), 'profs');
                            appendToSelect(arr.reverse(), 'years');
                            var cloneCounter = createCounter();
                            var selectToClone = jQuery('.js-select-toclone');
                            var containerToClone = jQuery('.js-container-toclone');
                            jQuery(el).on('click', '.js-clone-child', function () {
                                var newChild = selectToClone.clone();
                                var childNum = cloneCounter();
                                newChild.attr('name', 'customnameforchildrenselect' + childNum);
                                newChild.appendTo(containerToClone).selectize();
                                if (childNum >= 4) {
                                    $(this).hide()
                                }
                            });
                        }, 100);
                    };

                    function createCounter() {
                        var count = 1;
                        return function () {
                            return count++;
                        }
                    }


                }
            }

        }]);

    document.createElement('actions-cmp');
    var elems = document.querySelectorAll('actions-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['alpina.directives.actions']);
    }

}(window.angular, window.SAILPLAY, window.$));