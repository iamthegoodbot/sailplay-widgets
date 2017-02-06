(function () {

  angular.module('sp.status', [])

    .constant('spPurchaseTag', 10000001)

    .filter('spBadgeDesc', function () {
      return function (badge) {
        if (!badge) return {};
        return JSON.parse(badge.descr || '{}');
      }
    })

    .directive('sailplayStatus', function (sp, sp_api, spPurchaseTag) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = sp_api.data('load.badges.list');

          scope.user = sp_api.data('load.user.info');

          // Badges popup
          scope.show_badges = null;

          /**
           * Get next status
           */
          scope.getNextStatus = function () {
            return scope.badges().multilevel_badges[0].filter(function (badge) {
              return !badge.is_received
            })[0];
          };

          /**
           * Get purchases for status from rules
           * @param status
           * @returns {*}
           */
          scope.getPurchasesForStatus = function (status) {
            var purchase_rule = status.rules.filter(function (rule) {
              return rule.event_id == spPurchaseTag
            })[0];
            return purchase_rule && purchase_rule.value_to_success;
          };

          /**
           * Get current status
           */
          scope.getCurrentStatus = function () {
            return scope.badges().multilevel_badges[0].filter(function (badge) {
              return badge.is_received
            })[0];
          };

          /**
           * Get percents for status bar
           * @param purchases
           * @returns {string}
           */
          scope.getStatusPercents = function (purchases) {
            var last = scope.badges().multilevel_badges[0][scope.badges().multilevel_badges[0].length - 1];
            var percents = 0;
            if (last) percents = purchases * 100 / scope.getPurchasesForStatus(last);
            percents = percents > 100 ? 100 : percents < 0 ? 0 : percents;
            return {
              'height': percents + '%'
            };
          };

        }

      };

    });

}());
