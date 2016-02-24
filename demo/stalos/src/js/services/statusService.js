(function (angular, sp) {

    angular.module('stalos.services.statuses', [])

        .service('statusService', function () {

            var self = this;

            self.getLastStatus = function(statuses){
                var result = [];
                result = statuses.filter(function(status){
                    return status.is_received;
                });
                return result.length ? result[result.length-1] ? result[result.length-1] : result[0] : statuses[0];
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