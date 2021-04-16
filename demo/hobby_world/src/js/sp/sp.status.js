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

        scope.getActiveBadge = function() {
          if (!scope.badges().multilevel_badges[0][0].is_received) return 0
          if (scope.badges().multilevel_badges[0][2].is_received) return 3
          if (scope.badges().multilevel_badges[0][1].is_received) return 2
          if (scope.badges().multilevel_badges[0][0].is_received) return 1
        }
        /**
         * Get purchases sum for status from rules
         * @param status
         * @returns {*}
         */
        scope.getSumForStatus = function (status) {
          var purchase_rule = status && status.rules && status.rules.filter(function (rule) {
            return rule.event_id == spPurchaseTag
          })[0];
          return purchase_rule && purchase_rule.value_to_success;
        };

        /**
         * Get percents for status bar
         * @returns {string}
         */
        scope.getStatusPercents = function () {
          if(!scope.badges || !scope.badges() || !scope.badges().multilevel_badges[0]) return 0;
          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          }).length;
          var len = scope.badges().multilevel_badges[0].length;
          var percents = (100 / len * received_statuses) + 1;
          percents = percents > 100 ? 100 : percents < 0 ? 0 : percents;
          return percents + '%';
        };

        var horizontal_width = 730;

        scope.horizontal = $(window).width() <= horizontal_width ? true : false;

        $(window).resize(function(){
          var ww = $(window).width();
          if(ww <= horizontal_width) {
            if(scope.horizontal) return;
            console.log('resize');
            scope.horizontal = true;
            scope.$digest();
          } else {
            if(!scope.horizontal) return;
            console.log('resize');
            scope.horizontal = false;
            scope.$digest();
          }
        });

      }

    };

  });