(function (angular, sp, jQuery) {

    angular.module('lgb.directives.actions', ['lgb.services.users', 'lgb.services.actions', 'lgb.tools.bDaySelect'])

        .directive('actionsCmp', ['userService', 'actionService', function (userService, actionService) {
            return {
                restrict: 'E',
                replace: true,
                template: " <section class=\"l-centered tasks-sec\">\n        \n        <h1 class=\"section-header tasks-sec__head\">Earn more points by:\n            <span class=\"section-header__title\" data-ng-if=\"!actions.length\">Actions list is empty</span>\n        </h1>\n\n        <div class=\"tasks-sec__row\" data-ng-class=\"{visibilityHidden : hidden}\">\n           \n\n            <div class=\"tasks-sec__col\" data-ng-repeat=\"action in actions\">\n                <div class=\"tasks-cell\">\n                    <div class=\"tasks-cell__inner\">\n                        <div class=\"tasks-cell__reward\">\n                            <div class=\"tasks-cell__reward-count\" data-ng-bind=\"action.points\"></div>\n                            <div class=\"tasks-cell__reward-title\">points</div>\n                        </div>\n                        <div class=\"tasks-cell__icon {{ getIcon(action) }}\"></div>\n                        <div class=\"tasks-cell__text\">\n                            <div class=\"tasks-cell__text-inner\" data-ng-bind=\"transformTitle(action)\"></div>\n                        </div>\n                        <div class=\"tasks-cell__btn\" data-ng-if=\"user\">\n                             <span data-ng-if=\"action.socialType && user\"\n                                   href=\"#\" class=\"tasks-cell__iframe-wrap\" data-sp-action=\"{{ action._actionId }}\"\n                                   data-styles=\"{{ css_link }}\">Custom action</span>\n                        </div>\n                        <a href=\"/customer/account/login/\" data-ng-if=\"!user\" class=\"common-btn tasks-cell__btn\">\n                             Login\n                        </a>\n                    </div>\n                </div>\n            </div>\n            <!-- /col -->\n\n            <div class=\"tasks-sec__col\" data-ng-if=\"show_fill_action\">\n                <div class=\"tasks-cell\">\n                    <div class=\"tasks-cell__inner\">\n                        <div class=\"tasks-cell__reward\">\n                            <div class=\"tasks-cell__reward-count\">30</div>\n                            <div class=\"tasks-cell__reward-title\">points</div>\n                        </div>\n                        <div class=\"tasks-cell__icon this-icon-6\"></div>\n                        <div class=\"tasks-cell__text\">\n                            <div class=\"tasks-cell__text-inner\">\n                                Fill your profile\n                            </div>\n                        </div>\n                        <a href=\"#\" data-ng-if=\"user\" class=\"common-btn tasks-cell__btn\" data-ng-click=\"fill_profile();$event.preventDefault();\">Get bonus points</a>\n                        <a href=\"/customer/account/login/\" data-ng-if=\"!user\" class=\"common-btn tasks-cell__btn\">\n                            Login\n                        </a>\n                    </div>\n                </div>\n            </div>\n            <!-- /col -->\n\n        </div>\n        <!-- /row -->\n\n     <!-- popups -->\n     <div class=\"form-popup js-form-popup\" data-ng-if=\"user\" style=\"display: none;\">\n         <div class=\"form-popup__close js-close-popup\"></div>\n         <div class=\"form-popup__head-wr\">\n             <div class=\"form-popup__head\">Fill your profile</div>\n             <div class=\"form-popup__title\">+30 points</div>\n         </div>\n         <div class=\"form-popup__body-wr\">\n             <div class=\"form-popup__body_block\">\n                 <span class=\"form-popup__body_block_title\">First name</span>\n                 <input type=\"text\" placeholder=\"Enter your first name\" data-ng-disabled=\"user.user.first_name\"\n                        data-ng-model=\"form.name\">\n             </div>\n             <div class=\"form-popup__body_block\">\n                 <span class=\"form-popup__body_block_title\">Last name</span>\n                 <input type=\"text\" placeholder=\"Enter your last name\" data-ng-disabled=\"user.user.last_name\"\n                        data-ng-model=\"form.surname\">\n             </div>\n\n             <div class=\"form-popup__body_block\">\n                 <span class=\"form-popup__body_block_title\">Birthday</span>\n                 <tools-bday data-ng-if=\"show_form_popup\" data-model=\"form.bday\"\n                             data-disabled=\"user.user.birth_date\"></tools-bday>\n             </div>\n             <div class=\"form-popup__body_block\">\n                 <span class=\"form-popup__body_block_title\">Gender</span>\n                 <div class=\"form-popup__body_block_radio\">\n                     <div class=\"form-popup-block\">\n                         <input type=\"radio\" id=\"radio01\" name=\"radio\" data-ng-disabled=\"user.user.sex\"\n                                data-ng-checked=\"form.sex === 1\" value=\"1\" data-ng-click=\"form.sex = 1\"/>\n                         <label for=\"radio01\"><span><i></i></span>Male</label>\n                     </div>\n                     <div class=\"form-popup-block\">\n                         <input type=\"radio\" id=\"radio02\" name=\"radio\" data-ng-disabled=\"user.user.sex\"\n                                data-ng-checked=\"form.sex === 2\" value=\"2\" data-ng-click=\"form.sex = 2\"/>\n                         <label for=\"radio02\"><span><i></i></span>Female</label>\n                     </div>\n                 </div>\n\n             </div>\n             <div class=\"form-popup__body_block text_center\">\n                 <div class=\"divider\"></div>\n                 <div class=\"common-btn gift-slider__btn\"\n                      data-ng-click=\"get_points(gift)\"\n                 >Get bonus points\n                 </div>\n             </div>\n         </div>\n     </div>\n     <!-- /popups -->\n     \n     \n    </section>\n",
                scope: true,
                link: function (scope, el) {
                    scope.hidden = true;
                    var timeOut;
                    scope.show_form_popup = false;
                    scope.actions = [];
                    scope.css_link = actionService.getActionsCssLink();
                    scope.form = {
                        name: null,
                        surname: null,
                        bday: [null, null, null],
                        sex: null
                    };
                    var fillTag = 'Fill the profile';
                    scope.show_fill_action = false;
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
                    //userService.existTags([fillTag]).then(function (data) {
                    //    if (data && data[0]) {
                    //        scope.show_fill_action = !data[0].exist;
                    //    }
                    //    scope.$digest();
                    //});
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
                        scope.$digest();
                        update();
                    });
                    function update() {
                        scope.hidden = true;
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
                        actionService.loadList().then(function (actions) {
                            scope.actions = angular.extend([], actions);
                            if (scope.actions.length) {
                                setTimeout(function () {
                                    sp.send('actions.parse', angular.extend([], actions));
                                    scope.hidden = false;
                                    scope.$digest();

                                }, 100);
                            } else {
                                scope.hidden = false;
                                scope.$digest();
                            }
                            scope.$digest();
                        });

                    }

                    update();
                    sp.on('actions.perform.success', function (data) {
                        update();
                        scope.$digest();
                    });
                    sp.on('tags.add.success', function () {
                        update();
                    });
                    scope.transformTitle = actionService.getTitle;
                    scope.getIcon = actionService.getIcon;

                }
            }

        }]);

    document.createElement('actions-cmp');
    var elems = document.querySelectorAll('actions-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['lgb.directives.actions']);
    }

}(window.angular, window.SAILPLAY, window.$));