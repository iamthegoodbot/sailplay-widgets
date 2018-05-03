(function (angular, sp) {

    angular.module('alpina.services.gifts', [])

        .service('giftService', function () {

            var self = this;

            self.loadList = function () {
                return new Promise(function (resolve, reject) {
                    sp.on('load.gifts.list.success', function (gifts) {
                        self.gifts = gifts;
                        self.sending = false;
                        resolve(angular.extend([], self.gifts));
                    });
                    if (!self.sending) {
                        sp.send('load.gifts.list');
                    }
                    self.sending = true;
                });
            };

            self.getPrice = function (gift) {
                if (!gift) return '';
                return gift.points + ' баллов';
            };

            self.getGiftsPages = function (gifts) {
                var array = gifts;
                var result = [];
                while (array.length > 0) {
                    result.push(array.splice(0, 3));
                }
                return result;
            };

            self.getList = function () {
                if (self.gifts) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend([], self.gifts));
                    });
                } else {
                    return self.loadList();
                }


            };

        });

}(window.angular, window.SAILPLAY));