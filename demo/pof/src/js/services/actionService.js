(function (angular, sp) {

    angular.module('pof.services.actions', [])

        .service('actionService', function () {

            var self = this;

            var cssLink = 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/044553480a4264ca4c4dfc949414201f.css';

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
                        resolve(angular.extend([],  self.actions));
                    });
                } else {
                    return self.loadList();
                }
            };

            self.getQuestions = function () {
                return [
                    {
                        title: "Вопрос",
                        answers: [
                            {
                                title: 'Ответ 1',
                                tag: 'Ответ 1'
                            },
                            {
                                title: 'Ответ 2',
                                tag: 'Ответ 2'
                            },
                            {
                                title: 'Ответ 3',
                                tag: 'Ответ 3'
                            },
                            {
                                title: 'Ответ 4',
                                tag: 'Ответ 4'
                            }
                        ]
                    }]
            };

            self.getActionsCssLink = function(){
              return cssLink;
            };

        });

}(window.angular, window.SAILPLAY));