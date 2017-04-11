angular.module('sp.status', [])

  .constant('spPurchaseTag', 10000017)

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

        /**
         * Get purchases sum for status from rules
         * @param status
         * @returns {*}
         */
        scope.getSumForStatus = function (status) {
          var purchase_rule = status.rules.filter(function (rule) {
            return rule.event_id == spPurchaseTag
          })[0];
          return purchase_rule && purchase_rule.value_to_success;
        };

        /**
         * Get percents for status bar
         * @returns {string}
         */
        scope.getStatusPercents = function () {
          var received_statuses = scope.badges().multilevel_badges[1].filter(function (badge) {
            return badge.is_received
          }).length;
          var len = scope.badges().multilevel_badges[1].length;
          var percents = 100 / len * received_statuses;
          percents = percents > 100 ? 100 : percents < 0 ? 0 : percents;
          return {
            'width': percents + '%'
          };
        };

      }

    };

  });