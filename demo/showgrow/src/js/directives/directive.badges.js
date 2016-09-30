(function () {

  angular.module('sg.directives.badges', [])

    .directive('badgesD', function (api, badgeS, sp) {
      return {
        restrict: 'E',
        replace: false,
        template: "<section class=\"sp_l-centered sp_badges-sec\" data-ng-show=\"badges && badges.length\">\n    <div class=\"sp_common-sec-head\">Badges</div>\n    <div class=\"sp_badges-sec__row\">\n        \n        <div class=\"sp_badges-sec__col\" data-ng-repeat=\"item in badges\">\n            <div class=\"sp_badges-cell\">\n                <div class=\"sp_badges-cell__img\"><img data-ng-src=\"{{ item.thumbs.url_250x250 }}\" alt=\"\"></div>\n                <div class=\"sp_badges-cell__name\" data-ng-bind=\"item.name\"></div>\n            </div>\n        </div>\n      \n    </div>\n</section>",
        scope: true,
        link: function (scope, el) {
          scope.badges = api.data('badges.list')() && api.data('badges.list')().one_level_badges.filter(function (item) {
              return item.is_received
            }) || [];
          function update(){
            self.badges.list();
          }
          sp.on('actions.perform.success', function (data) {
            update();
          });
        }
      }

    });

}());