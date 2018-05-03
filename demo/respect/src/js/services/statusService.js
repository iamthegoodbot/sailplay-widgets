(function (angular, sp) {

  angular.module('respect.services.statuses', [])

    .service('statusService', function () {

      var self = this;

      var OFFSETS = [0, 12000, 35000];

      self.getOffsets = function () {
        return OFFSETS;
      };

      self.getNumOfStatus = function (last) {
        var num = 1;
        if (!last || !last.id) return num;
        switch (last.id) {
          case 324:
            num = 1;
            break;
          case 325:
            num = 2;
            break;
          case 326:
            num = 3;
            break;
          default:
            num = 1;
            break;
        }
        return num;
      };

      self.getLastStatus = function (statuses) {
        var result = [];
        result = statuses.filter(function (status) {
          return status.is_received;
        });
        return result.length ? result[result.length - 1] ? result[result.length - 1] : result[0] : statuses[0];
      };

      self.getNextStatus = function (statuses) {
        var next = statuses[0] || {};
        for (var i = 0, len = statuses.length; i < len; i++) {
          if (statuses[i].is_received
            && ((statuses[i + 1] && !statuses[i + 1].is_received)
            || !statuses[i + 1])) {
            next = statuses[i + 1];
            break;
          }
        }
        return next;
      };

      self.getOffsetToNextStatus = function (sum) {
        var points = sum ? sum : 0;
        var offsets = self.getOffsets();
        var result = offsets[1] - sum < 0 ? 0 : offsets[1] - points;
        for (var i = 0, len = offsets.length; i < len; i++) {
          if (sum > offsets[i] && (offsets[i+1] && sum < offsets[i+1])) {
            result = offsets[i + 1] - points;
            break;
          }
        }
        return result;
      };

      self.offsetToNextStatusInPercents = function(sum){
        var points = sum ? sum : 0;
        var offsets = self.getOffsets();
        var result = 0;
        var p = Math.round(points/offsets[1] * 100);
        for (var i = 0, len = offsets.length; i < len; i++) {
          if (sum > offsets[i] && (offsets[i+1] && sum < offsets[i+1])) {
            p = Math.round(points/offsets[i + 1] * 100);
            break;
          }
        }
        result = p > 100 ? 100 : p < 0 ? 0 : p ;
        return result;
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