angular.module('sp.status', [])

  .constant('spPurchaseTag', 10000017)

  .filter('spBadgeDesc', function () {
    return function (badge) {
      if (!badge) return {};
      return JSON.parse(badge.descr || '{}');
    }
  })

  .directive('sailplayStatus', function (sp, sp_api, spPurchaseTag, SailPlayShare, $window, $rootScope) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.badges = sp_api.data('load.badges.list');

        scope.user = sp_api.data('load.user.info');

        scope.history = sp_api.data('load.user.history');

        scope.showBadgesInfo = scope.badges && scope.badges() && scope.badges().one_level_badges[0];

        scope.getPurchasesSum = function () {
          if (!scope.history || !scope.history()) return 0;
          var sum = scope.history().filter(function (item) {
            return item.is_completed && item.action == 'purchase'
          }).reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.price;
          }, 0);
          return sum;
        };

        scope.getBadgeStyle = function(){
          return {
            width: (100 /scope.badges().multilevel_badges[0].length) + '%'
          }
        };

        /**
         * Get sum from next status
         * @param sum
         * @returns {*}
         */
        scope.toNextStatus = function (sum) {
          if (!scope.badges || !scope.badges()) return;
          var not_received_status = scope.badges().multilevel_badges[0].filter(function (badge) {
            return !badge.is_received
          })[0];
          var result = not_received_status && scope.getSumForStatus(not_received_status) && (scope.getSumForStatus(not_received_status) - sum);

          return result;
        };

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

          if (!scope.badges || !scope.badges()) return;

          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          });

          var not_received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return !badge.is_received
          });

          var len = scope.badges().multilevel_badges[0].length;
          var step = 100 / len;
          var percents = 0;
          var current_sum = scope.user().purchases.sum;
          var styles = {};

          if (received_statuses.length) {
            percents += step * received_statuses.length;
          }

          if (not_received_statuses.length) {
            var total = scope.getSumForStatus(not_received_statuses[0]);

            if (received_statuses.length) {
              current_sum -= scope.getSumForStatus(received_statuses[received_statuses.length - 1]);
              total -= scope.getSumForStatus(received_statuses[received_statuses.length - 1]);
            }

            percents += (current_sum * 100 / total) / len;
          }

          percents = percents > 100 ? null : percents < 0 ? 0 : percents;

          styles.width = percents + '%';

          return styles;

        };

        /**
         * Get percents for status bar
         * @returns {string}
         */
        scope.getNextStatusPercents = function () {
          if (!scope.badges || !scope.badges()) return;
          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          }).length;
          var len = scope.badges().multilevel_badges[0].length;
          var percents = 100 / len * (received_statuses + 1);
          var styles = {
            width: percents + '%'
          };
          if (percents > 100) {
            styles.display = 'none'
          }
          return styles;
        };

        /**
         * Get current status
         */
        scope.getCurrentStatus = function () {
          if (!scope.badges || !scope.badges()) return null;
          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          });
          return received_statuses.length ? received_statuses[received_statuses.length - 1] : null;
        };

        scope.selected_status = scope.getCurrentStatus();

        scope.share = function (network, badge) {
          SailPlayShare(network, $rootScope.config.data.share_url || $window.location.href, badge.name, badge.share_msg, badge.thumbs.url_250x250);
        };

      }

    };

  });