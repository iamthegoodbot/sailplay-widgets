(function (angular, sp) {

    angular.module('pof.services.badges', [])

        .service('badgeService', function () {

            var self = this;

            var sumForStatuses = [1000, 10000, 50000];
            var badgeImage = {
                302: {
                    origin: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/98d314190f2348d83db0ebd6a1e2d170.png',
                    active: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/0a8c688e8494adede3ca01b4d74d930c.png'
                },
                303: {
                    origin: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/4de6c80f2f43d714ba6691ab96464b31.png',
                    active: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/34c161b0c58681fd63319d1e5e887afb.png'
                },
                305: {
                    origin: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/ad14b8c38bdad35f04d25e9747d33180.png',
                    active: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/226c6117ceaa4f3bdcec0bce525e9291.png'
                },
                304: {
                    origin: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/3544c75404e5a70ab512130b29e5c214.png',
                    active: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/947509f8982044f96bba51ecfcec85b9.png'
                }
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

            self.getSumForStatuses = function () {
                return sumForStatuses;
            };

            self.getHintToStatus = function (status) {
                var str = 'Buy for more than $';
                var obj = self.getSumForStatuses();
                return obj[status] ? str + obj[status] : 0;
            };

            self.getBadgeImage = function (index) {
                return badgeImage[index] || { origin: '' , active : ''};
            };

        });

}(window.angular, window.SAILPLAY));