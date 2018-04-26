(function () {

  angular.module('sg.services.badges', [])

    .service('badgeS', function ($q) {

      var self = this;

      self.status = {};

      self.status.limits = [500, 4000, 20000];

      self.status.getOffset = function (limit) {
        var arr = self.status.limits;
        if (!limit) return arr[0];
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          var current_limit = arr[i];
          if (limit < current_limit) {
            result.push(current_limit);
          }
        }
        return Math.round(result[0] ? result[0] - limit : 0);
      };

      self.status.next = function (statuses) {
        if (!statuses) return;
        var received = statuses.filter(function (status) {
          return status.is_received;
        });
        if (received.length == statuses.length) return null;
        var result = statuses.filter(function (status) {
          return !status.is_received;
        });
        return result[0] || statuses[0];
      };

      self.status.count = function (statuses) {
        if (!statuses) return;
        return statuses.filter(function (status) {
            return status.is_received;
          }).length || 1;
      };

      self.status.count_percents = function (offset) {
        // TODO: переделать
        if (!offset) return 0;
        var arr = self.status.limits;
        if (offset > arr[arr.length - 1]) return arr[arr.length - 1];
        var multiplier = 33.33333;
        var state = 0;
        for (var i = 0, len = arr.length; i < len; i++) {
          if (offset > arr[i]) {
            state++;
          }
        }
        var current = 0;
        var total = arr[0];
        if (state === 0) {
          current = offset;
          total = arr[state];
        } else {
          current = (offset - arr[state - 1]);
          total = (arr[state] - arr[state - 1]);
        }
        return ( ( (current * 100 ) / total * 0.33333 ) + (state * multiplier) )
      };

      self.status.current = function (statuses) {
        if (!statuses) return;
        var result = [];
        result = statuses.filter(function (status) {
          return status.is_received;
        });
        return result.length ? result[result.length - 1] ? result[result.length - 1] : result[0] : null;
      };


      return self;

    });

}());