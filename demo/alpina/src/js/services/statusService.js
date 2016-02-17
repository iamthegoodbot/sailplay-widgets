(function (angular, sp) {

    angular.module('alpina.services.statuses', [])

        .service('statusService', function () {

            var self = this;

            var IMAGES = {
                306: {
                    origin: 'http://dev4you.info/test/alpina/image/status-01.png',
                    active: 'http://dev4you.info/test/alpina/image/status-01.png'
                },
                307: {
                    origin: 'http://dev4you.info/test/alpina/image/status-02-disabled.png',
                    active: 'http://dev4you.info/test/alpina/image/status-02.png'
                },
                308: {
                    origin: 'http://dev4you.info/test/alpina/image/status-03-disabled.png',
                    active: 'http://dev4you.info/test/alpina/image/status-03.png'
                }
            };

            self.getLastStatus = function(statuses){
                var result = [];
                result = statuses.filter(function(status){
                    return status.is_received;
                });
                return result.length ? result[-1] ? result[-1] : result[0] : statuses[0];
            };

            self.getImages = function (index) {
                return IMAGES[index] || { origin: '' , active : ''};
            };

            self.loadList = function () {
                return new Promise(function (resolve, reject) {
                    sp.on('load.badges.list.success', function (res) {
                        self.data = res;
                        self.sending = false;
                        resolve(angular.extend([], self.data));
                    });
                    if (!self.sending) {
                        sp.send('load.badges.list');
                    }
                    self.sending = true;
                });
            };

            self.getList = function () {
                if (self.data) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend([], self.data));
                    });
                } else {
                    return self.loadList();
                }
            };

        });

}(window.angular, window.SAILPLAY));