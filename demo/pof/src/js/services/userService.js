(function (angular, sp) {

    angular.module('pof.services.users', [])

        .service('userService', function () {

            var self = this;

            self.loadInfo = function () {
                return new Promise(function (resolve, reject) {
                    sp.on('load.user.info.success', function (user) {
                        self.info = user;
                        self.sending_info = false;
                        resolve(angular.extend({}, self.info));
                    });
                    if(!self.sending_info) {
                        sp.send('load.user.info', {purchases: 1, all: 1});
                    }
                    self.sending_info = true;
                });
            };

            self.getInfo = function () {
                if (self.info) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend({}, self.info));
                    });
                } else {
                    return self.loadInfo();
                }
            };

            self.loadHistory = function () {
                return new Promise(function (resolve, reject) {
                    sp.on('load.user.history.success', function (history) {
                        self.history = history;
                        self.sending_history = false;
                        resolve(angular.extend([], self.history));
                    });
                    if(!self.sending_history) {
                        sp.send('load.user.history');
                    }
                    self.sending_history = true;

                });
            };

            self.getHistory =function () {
                if (self.history) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend([], self.history));
                    });
                } else {
                    return self.loadHistory();
                }
            };

            self.existTags =function (tags) {
                return new Promise(function (resolve, reject) {
                    sp.on('tags.exist.success', function (res) {
                        resolve(angular.extend({},  res.tags));
                    });
                    sp.send('tags.exist', tags);
                });
            };

            self.getHistoryActionName = function (action) {
                if (!action) return 'No description';
                var history_items = {
                    "purchase": "Purchase",
                    "gift_purchase": "Gift",
                    "badge": "Badge",
                    "registration": "Sign up",
                    "referral": "Invite friend",
                    "referred": "Registration from friend's invite",
                    "referred_purchase": "Friend's purchase",
                    "promocode": "Promocode activation",
                    "enter_group": "Joined our group on ",
                    "share_purchase": "Shared a purchase on ",
                    "social_share": "Shared our website on ",
                    "share_badge": "Shared a badge on "
                };
                switch (action.action) {
                    case 'event':
                        return action.name;
                    case 'extra':
                        return action.name;
                    case 'sharing':
                        switch (action.social_action) {
                            case 'like':
                                return history_items.enter_group + action.social_type;
                            case 'purchase':
                                return history_items.share_purchase + action.social_type;
                            case 'partner_page':
                                return history_items.social_share + action.social_type;
                            case 'badge':
                                return history_items.share_badge + action.social_type;
                        }
                }
                return history_items[action.action] || 'No description';
            };

            self.show_history_points =function (num) {
                if (num || num == 0) {
                    return (num > 0 ? '+ ' : num == 0 ? '' : '- ') + Math.abs(num) + ' points';
                }
            };

            self.toDateObj = function (date) {
                return new Date(date);
            }
        });

}(window.angular, window.SAILPLAY));