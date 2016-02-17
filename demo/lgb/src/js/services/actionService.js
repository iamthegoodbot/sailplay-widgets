(function (angular, sp) {

    angular.module('lgb.services.actions', [])

        .service('actionService', function () {

            var self = this;

            var CSS_LINK = '//sailplays3.cdnvideo.ru/media/assets/assetfile/cdff1a2d1d3f25c2ad62bf61ea7654ae.css';

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

            self.getTitle = function (action) {
                if (!action) return 'No description';
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
                return result || 'Custom action';
            };

            self.getIcon = function (action) {
                if (!action) return '';
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

            self.getList = function () {
                if (self.actions) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend([], self.actions));
                    });
                } else {
                    return self.loadList();
                }
            };

            self.getActionsCssLink = function () {
                return CSS_LINK;
            };

        });

}(window.angular, window.SAILPLAY));