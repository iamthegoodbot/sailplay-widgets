(function (angular, sp, sp_custom_action, sp_test) {

    angular.module('mario.services.actions', [])

        .service('actionService', function () {

            var self = this;

            var cssLink = 'http://marioberluchi.ru/wa-apps/shop/plugins/sailplay/bonus/css/btns_styles.css';

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

            self.getActionsByGroup = function (actions, group) {
                if (!actions || !group) return;
                return actions.filter(function (item) {
                    return item.action == group;
                });
            };


            self.getCustomAction = function(){
                return sp_custom_action || [];
            };

            self.getTests = function () {
                return sp_test ? sp_test.data || [] : [];
            };

            self.getTestTag = function(){
              return sp_test ? sp_test.tag || null : null;
            };

            self.getTestData = function(){
                return sp_test || null;
            };

            self.getActionsCssLink = function () {
                return cssLink;
            };

        });

}(window.angular, window.SAILPLAY, window.SP_CUSTOM_ACTION, window.SP_TEST));