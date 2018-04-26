(function (angular, sp, jQuery) {

    angular.module('pof.directives.actions', ['pof.services.users', 'pof.services.actions', 'pof.tools.bDaySelect'])

        .directive('actionsCmp', ['userService', 'actionService', function (userService, actionService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n\n    <div data-ng-class="{visibilityHidden : hidden}">\n        <section class="l-centered tasks-sec">\n\n            <h1 class="section-header tasks-sec__head">List of tasks\n                <span class="section-header__title">\n                    {{ actions && actions.length ? \'Perform the tasks to get bonus points\' : \'List of tasks is empty\' }}</span>\n            </h1>\n\n            <div class="tasks-sec__row">\n\n                <div class="tasks-sec__col" data-ng-repeat="action in actions">\n                    <div class="tasks-cell">\n                        <div class="tasks-cell__inner">\n                            <div class="tasks-cell__reward">\n                                <div class="tasks-cell__reward-count">{{ action.points }}</div>\n                                <div class="tasks-cell__reward-title">points</div>\n                            </div>\n                            <!--this-icon-1-->\n                            <div class="tasks-cell__icon {{ get_icon(action) }}"></div>\n                            <div class="tasks-cell__text">\n                                <div class="tasks-cell__text-inner">\n                                    {{ transform_title(action) }}\n                                </div>\n                            </div>\n                        <span data-ng-if="action.socialType && user"\n                              data-sp-action="{{ action._actionId }}" data-styles="{{ css_link }}"\n                              class="tasks-cell__btn"></span>\n                        <span data-ng-if="!action.socialType && user"\n                              data-ng-click="perform_action(action)"\n                              class="common-btn tasks-cell__btn">Action</span>\n                            <a data-ng-if="!user"\n                               href="/login.php"\n                               class="common-btn tasks-cell__btn">Login</a>\n                        </div>\n                    </div>\n                </div>\n                <!-- /col -->\n                <div class="tasks-sec__col" data-ng-if="show_fill_action">\n                    <div class="tasks-cell">\n                        <div class="tasks-cell__inner">\n                            <div class="tasks-cell__reward">\n                                <div class="tasks-cell__reward-count">30</div>\n                                <div class="tasks-cell__reward-title">points</div>\n                            </div>\n                            <!--this-icon-1-->\n                            <div class="tasks-cell__icon this-icon-6"></div>\n                            <div class="tasks-cell__text">\n                                <div class="tasks-cell__text-inner">\n                                    Fill your profile\n                                </div>\n                            </div>\n                        <span data-ng-click="fill_profile()"\n                              data-ng-if="user"\n                              class="common-btn tasks-cell__btn">Get bonus points</span>\n                            <a data-ng-if="!user"\n                               href="/login.php"\n                               class="common-btn tasks-cell__btn">Login</a>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <!-- /row -->\n        </section>\n\n        <!-- popups -->\n        <div class="form-popup js-form-popup" data-ng-if="user" style="display: none;">\n            <div class="form-popup__close js-close-popup"></div>\n            <div class="form-popup__head-wr">\n                <div class="form-popup__head">Fill your profile</div>\n                <div class="form-popup__title">+30 points</div>\n            </div>\n            <div class="form-popup__body-wr">\n                <div class="form-popup__body_block">\n                    <span class="form-popup__body_block_title">First name</span>\n                    <input type="text" placeholder="Enter your first name" data-ng-disabled="user.user.first_name"\n                           data-ng-model="form.name">\n                </div>\n                <div class="form-popup__body_block">\n                    <span class="form-popup__body_block_title">Last name</span>\n                    <input type="text" placeholder="Enter your last name" data-ng-disabled="user.user.last_name"\n                           data-ng-model="form.surname">\n                </div>\n\n                <div class="form-popup__body_block">\n                    <span class="form-popup__body_block_title">Birthday</span>\n                    <tools-bday data-ng-if="show_form_popup" \n                                data-disabled="user.user.birth_date"\n                                data-model="form.bday"></tools-bday>\n                </div>\n                <div class="form-popup__body_block">\n                    <span class="form-popup__body_block_title">Gender</span>\n                    <div class="form-popup__body_block_radio">\n                        <div class="form-popup-block">\n                            <input type="radio" id="radio01" name="radio" data-ng-disabled="user.user.sex"\n                                   data-ng-checked="form.sex === 1" value="1" data-ng-click="form.sex = 1"/>\n                            <label for="radio01"><span><i></i></span>Male</label>\n                        </div>\n                        <div class="form-popup-block">\n                            <input type="radio" id="radio02" name="radio" data-ng-disabled="user.user.sex"\n                                   data-ng-checked="form.sex === 2" value="2" data-ng-click="form.sex = 2"/>\n                            <label for="radio02"><span><i></i></span>Female</label>\n                        </div>\n                    </div>\n\n                </div>\n                <div class="form-popup__body_block text_center">\n                    <div class="divider"></div>\n                    <div class="common-btn gift-slider__btn"\n                         data-ng-click="get_points(gift)"\n                    >Get bonus points\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- /popups -->\n\n    </div>\n\n</div>',
                scope: true,
                link: function (scope) {
                    scope.actions = [];
                    scope.hidden = true;
                    scope.user = null;
                    var timeOut;
                    scope.form = {
                        name: null,
                        surname: null,
                        bday: [null, null, null],
                        sex: null,
                        q: []
                    };
                    scope.css_link = actionService.getActionsCssLink();
                    var fillTag = 'Fill the profile';
                    scope.show_fill_action = true;
                    userService.loadInfo().then(function (data) {
                        scope.user = data;
                        if (data.user.first_name) {
                            scope.form.name = data.user.first_name;
                        }
                        if (data.user.last_name) {
                            scope.form.surname = data.user.last_name;
                        }
                        if (data.user.birth_date) {
                            scope.form.bday[0] = parseInt(data.user.birth_date.split('-')[2]);
                            scope.form.bday[1] = parseInt(data.user.birth_date.split('-')[1]);
                            scope.form.bday[2] = parseInt(data.user.birth_date.split('-')[0]);
                        }
                        if (data.user.sex) {
                            scope.form.sex = data.user.sex;
                        }
                        scope.$digest();
                    });
                    function check_tag() {
                        userService.existTags([fillTag]).then(function (data) {
                            if (data && data[0]) {
                                scope.show_fill_action = !data[0].exist;
                            }
                            scope.$digest();
                        });
                    }

                    check_tag();

                    scope.questions = actionService.getQuestions();
                    scope.valid_form = function () {
                        if (scope.form.name
                            && scope.form.surname
                            && scope.form.sex
                            && (scope.form.bday[0] && scope.form.bday[1] && scope.form.bday[2])) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    scope.get_points = function () {
                        if (scope.valid_form()) {
                            scope.show_fill_action = false;
                            jQuery('.js-form-popup').bPopup().close();
                            var data = {};
                            data.lastName = scope.form.surname;
                            data.firstName = scope.form.name;
                            data.sex = scope.form.sex;
                            if (scope.form.bday) {
                                data.birthDate = scope.form.bday.join('-');
                            }
                            data.email = scope.user.user.email;
                            sp.send('user.update', data);
                            var tags = [];
                            tags.push(fillTag);
                            sp.on('user.update.success', function () {
                                scope.$apply(function () {
                                    sp.send('tags.add', tags);
                                });
                            })
                        }
                    };
                    sp.on('tags.add.success', function (res) {
                        scope.$apply(function () {
                            scope.show_fill_action = false;
                            scope.loadList();
                        });
                    });
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
                    sp.on('actions.perform.success', function (data) {
                        scope.show = false;
                        scope.loadList();
                        scope.$digest();
                    });
                    scope.loadList = function () {
                        scope.hidden = true;
                        scope.actions = [];
                        setTimeout(function () {
                            actionService.loadList().then(function (data) {
                                scope.actions = data;
                                scope.$digest();
                                if (scope.user) {
                                    setTimeout(function () {
                                        if (scope.actions.length) {
                                            sp.send('actions.parse', angular.extend([], scope.actions));
                                            timeOut = setTimeout(function () {
                                                var iframes = scope.actions.filter(function (item) {
                                                    return item.socialType;
                                                });
                                                if (iframes.length == document.querySelectorAll('.tasks-sec iframe').length) {
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
                                            scope.$digest();
                                        } else {
                                            scope.hidden = false;
                                            scope.$digest();
                                        }
                                        // Чтобы хоть как-то нормально прогружалось, а то страница глючила
                                        scope.$digest();
                                    }, 10);

                                } else {
                                    scope.hidden = false;
                                    scope.$digest();
                                }
                            });
                        }, 10)
                    }

                    scope.loadList();
                    scope.transform_title = function (action) {
                        var obj = {
                            like: 'Like us on ',
                            partner_page: 'Share our website on '
                        };
                        var socObj = {
                            fb: 'Facebook',
                            tw: 'Twitter',
                            gp: 'Google+',
                            ok: 'Ok',
                            vk: 'Vk'
                        };
                        var result = (obj[action.action] ? obj[action.action] : '') + (socObj[action.socialType] ? socObj[action.socialType] : '');
                        return result || 'Action';
                    };
                    scope.perform_action = function (action) {
                        sp.send('actions.perform', action);
                    };
                    scope.get_icon = function (action) {
                        var obj = {
                            partner_page: {
                                fb: 'this-icon-2',
                                tw: 'this-icon-5',
                                gp: 'this-icon-4'
                            },
                            like: {
                                fb: 'this-icon-1',
                                gp: 'this-icon-4'
                            },
                            other: 'this-icon-3',
                            fill: 'this-icon-6'

                        };
                        if (action.socialType && obj[action.action] && obj[action.action][action.socialType]) {
                            return obj[action.action][action.socialType];
                        } else {
                            return obj['other'];
                        }
                    };

                }
            }

        }]);

    document.createElement('actions-cmp');
    var elems = document.querySelectorAll('actions-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['pof.directives.actions']);
    }

}(window.angular, window.SAILPLAY, window.$));