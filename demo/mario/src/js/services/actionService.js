(function (angular, sp) {

    angular.module('mario.services.actions', [])

        .service('actionService', function () {

            var self = this;

            var TAGS = {
                profile: 'Заполнил профиль',
                view: 'Оставил отзыв',
                test: 'Прошел опрос',
                instagram: 'Опубликовать лук в instagram'
            };

            var cssLink = 'http://dev4you.info/test/mario/btns_styles.css';

            self.loadList = function () {
                self.actions = [];
                return new Promise(function (resolve, reject) {
                    sp.on('load.actions.list.success', function (data) {
                        self.actions = data.actions.filter(function (item) {
                            return item.socialType;
                        });
                        self.sending = false;
                        resolve(angular.extend([], self.actions));
                    });
                    if (!self.sending) {
                        sp.send('load.actions.list');
                    }
                    self.sending = true;

                });
            };

            self.getList = function () {
                if (self.actions) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend([], self.actions));
                    });
                } else {
                    return self.loadList();
                }
            };

            self.getTags = function(){
                return TAGS;
            };

            self.getActionsByGroup = function (actions, group) {
                if (!actions || !group) return;
                return actions.filter(function (item) {
                    return item.action == group;
                });
            };

            self.getTests = function () {
                return [
                    {
                        q: 'Вопрос 1',
                        a: [
                            {
                                title: 'Ответ 1',
                                tag: 'Вопрос 1 ответ 1'
                            },
                            {
                                title: 'Ответ 2',
                                tag: 'Вопрос 1 ответ 2'
                            },
                            {
                                title: 'Ответ 3',
                                tag: 'Вопрос 1 ответ 3'
                            },
                            {
                                title: 'Ответ 4',
                                tag: 'Вопрос 1 ответ 4'
                            }
                        ]
                    },
                    {
                        q: 'Вопрос 2',
                        a: [
                            {
                                title: 'Ответ 1',
                                tag: 'Вопрос 2 ответ 1'
                            },
                            {
                                title: 'Ответ 2',
                                tag: 'Вопрос 2 ответ 2'
                            },
                            {
                                title: 'Ответ 3',
                                tag: 'Вопрос 2 ответ 3'
                            },
                            {
                                title: 'Ответ 4',
                                tag: 'Вопрос 2 ответ 4'
                            }
                        ]
                    },
                    {
                        q: 'Вопрос 3',
                        a: [
                            {
                                title: 'Ответ 1',
                                tag: 'Вопрос 3 ответ 1'
                            },
                            {
                                title: 'Ответ 2',
                                tag: 'Вопрос 3 ответ 2'
                            },
                            {
                                title: 'Ответ 3',
                                tag: 'Вопрос 3 ответ 3'
                            },
                            {
                                title: 'Ответ 4',
                                tag: 'Вопрос 3 ответ 4'
                            }
                        ]
                    },
                ];
            };

            self.getActionsCssLink = function () {
                return cssLink;
            };

        });

}(window.angular, window.SAILPLAY));