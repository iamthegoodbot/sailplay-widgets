(function (angular, sp) {

    angular.module('lgb.services.statuses', [])

        .service('statusService', function () {

            var self = this;

            var DESC = ['First look at new products in stock and discounts', 'All Par benets', 'All Birdie benets', 'All Eagle benets'];

            var IMAGES = {
                313: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/782ab96b598a52a9a94a97e6a5ae6f32.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/24776eea219f4c117109376d57609fac.png'
                },
                314: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/4deaa341e13f11edc8009eeb04ab1371.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/e8e81ea9b7b0ab5aed0431f946842eb5.png'
                },
                315: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/8ef1ab8572fd4b404f8b23218f87afd7.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/4de9b1dc81b72a6be13b6bc9a0f8530a.png'
                },
                316: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/0e59ef3bbf9daf61e997e08c6d0a6632.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/6b2cc49d9d56d602b736d5ff5c8051e0.png'
                }
            };

            var BADGES = {
                309: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/dd032e95014dd7485e31b7d24ba07455.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/c4922047fbcd4b3e8f5258ac4906262a.png'
                },
                310: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/f2f785c0980363f512d699502c37287a.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/88abe3efe336329b79b68d179a8bee2e.png'
                },
                311: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/a8758f971bf946454ba285d061915334.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/8a7346214f083187dc763638a6a04706.png'
                },
                312: {
                    origin: '//sailplays3.cdnvideo.ru/media/assets/assetfile/056ffd63fd476adc7691c2883a4a9e18.png',
                    active: '//sailplays3.cdnvideo.ru/media/assets/assetfile/d3e2df03f2133c77bcac0ba95121257a.png'
                }
            };

            var WITHOUT_STATUS = "//sailplays3.cdnvideo.ru/media/assets/assetfile/1a34d54e3daedada56938e91a9631146.png";

            var OFFSETS = [150, 300, 800, 1500];

            self.getBadgeImage = function (index) {
                return BADGES[index] || {origin: '', active: ''};
            };

            self.getPercents = function (sum, gifts) {
                if (!sum) return 0;
                var max = gifts.reduce(function (prev, current) {
                    return (prev.points > current.points) ? prev : current
                });
                return Math.round((sum / max.points) * 100) > 100 ? 100 : Math.round((sum / max.points) * 100);
            };

            self.getStatusOffsets = function () {
                return OFFSETS;
            };

            self.getOffsetToNextStatus = function (sum) {
                var result = 0;
                for (var i = 0, len = OFFSETS.length; i < len; i++) {
                    if (OFFSETS[i] > sum) {
                        result = OFFSETS[i] - sum;
                        break;
                    }
                }
                if(sum >= OFFSETS[OFFSETS.length - 1]) {
                    result = null;
                }
                return result;
            };

            self.getNextStatus = function (statuses) {
                if (!statuses) return;
                var result = [];
                return result = statuses.filter(function (status) {
                        return !status.is_received;
                    })[0] || statuses[0];
            };

            self.getLastStatus = function (statuses) {
                if (!statuses) return;
                var result = [];
                result = statuses.filter(function (status) {
                    return status.is_received;
                });
                return result.length ? result[result.length-1] ? result[result.length-1] : result[0] : null;
            };

            self.getOffsetToStatus = function (index, sum) {
                var offset = OFFSETS[index] - sum;
                if (offset > 0) {
                    return '$' + offset + ' left';
                } else {
                    return '';
                }
            };

            self.getDescToStatus = function (index) {
                return DESC[index];
            };

            self.getImages = function (index) {
                return IMAGES[index] || {origin: WITHOUT_STATUS, active: WITHOUT_STATUS};
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