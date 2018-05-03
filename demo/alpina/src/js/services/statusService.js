(function (angular, sp) {

  angular.module('alpina.services.statuses', [])

    .service('statusService', function () {

      var self = this;

      var IMAGES = {
        306: {
          origin: "https://sailplays3.cdnvideo.ru/media/badges/badge/d7084f67dfcc9e39ac9ed1114be236a8.100x100.png",
          active: "https://sailplays3.cdnvideo.ru/media/badges/badge/d7084f67dfcc9e39ac9ed1114be236a8.100x100.png"
        },
        307: {
          origin: "https://sailplays3.cdnvideo.ru/media/badges/badge/7265cc1cec5008a5246ea3881ebe8c73.250x250_gs_.png",
          active: "https://sailplays3.cdnvideo.ru/media/badges/badge/7265cc1cec5008a5246ea3881ebe8c73.100x100.png"
        },
        308: {
          origin: "https://sailplays3.cdnvideo.ru/media/badges/badge/942e79420a9b53c15429da632125c175.250x250_gs_.png",
          active: "https://sailplays3.cdnvideo.ru/media/badges/badge/942e79420a9b53c15429da632125c175.100x100.png"
        }
      };

      self.getLastStatus = function (statuses) {
        var result = [];
        result = statuses.filter(function (status) {
          return status.is_received;
        });
        return result.length ? result[result.length-1] ? result[result.length-1] : result[0] : statuses[0];
      };

      self.getImages = function (index) {
        return IMAGES[index] || {origin: '', active: ''};
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