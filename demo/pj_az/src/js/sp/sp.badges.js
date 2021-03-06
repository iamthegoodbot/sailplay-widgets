(function () {

  angular.module('sp.badges', [])

    .filter('badgeName', function ($rootScope, tryParseFieldFilter) {
      return function (badgeName) {
        tryParseFieldFilter(badgeName)
      }
    })

    .filter('badgeDescr', function ($rootScope, tryParseFieldFilter) {
      return function (badgeDescr) {
        tryParseFieldFilter(badgeDescr)
      }
    })

    .directive('badgeInfo', function ($rootScope, SailPlayShare, $window, $filter) {
      return {

        restrict: 'E',
        replace: true,
        template:
        '<div class="bns_achiv_item_info" data-ng-if="badge">' +
          '<div class="bns_achiv_item_info_text" data-ng-bind="$parent.badge.descr | tryParseField"></div>' +
          '<div class="bns_achiv_item_info_socials">' +
            '<img width="40px" data-ng-click="$parent.share_badge($parent.badge, \'fb\')" src="//sailplay.cdnvideo.ru/static/partners/pj/img/icons/share/fb.png" alt="FB">' +
            // '<img width="40px" data-ng-click="$parent.share_badge($parent.badge, \'vk\')" src="//sailplay.cdnvideo.ru/static/partners/pj/img/icons/share/vk.png" alt="VK">' +
          '</div>' +
        '</div>',
        scope: {
          badges: '='
        },
        link: function (scope, elm, attrs) {

          scope.badge = null;

          $rootScope.$on('badge:open', function (e, badge) {
            var new_badge = badge && scope.badges.filter(function (item) {
              return item.id == badge.id
            })[0];
            if (!badge || !new_badge || new_badge && scope.badge && new_badge.id === scope.badge.id) {
              scope.badge = null;
              return;
            }
            scope.badge = scope.badges.filter(function (item) {
              return item.id == badge.id
            })[0];
          });

          scope.share_badge = function (badge, network) {

            let share_url = 'https://sailplay.com/js-api/1590/actions/social-widget/sharing-dummy/?';
            share_url+= 'sharing_message=' + encodeURIComponent($filter('tryParseField')(badge.share_msg));
            share_url+='&title=' + encodeURIComponent($filter('tryParseField')(badge.name));
            share_url+='&sharing_pic=' + encodeURIComponent($filter('sailplay_pic')(badge.thumbs.url_250x250));
            share_url+='&sharing_pic_width=' + encodeURIComponent('250px');
            share_url+='&sharing_pic_height=' + encodeURIComponent('250px');
            share_url+='&sharing_url=' + encodeURIComponent($rootScope.config.data && $rootScope.config.data.share_url || $window.location.href);

            console.log(share_url);
            SailPlayShare(network, share_url);
          };

        }

      };
    })

    .directive('sailplayBadges', function (sp, sp_api, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = () => {
            var data = sp_api.data('load.badges.list')()
            if($rootScope.config.lang == 'az') {
              return {multilevel_badges: [data.multilevel_badges[1], data.multilevel_badges[0]]}
            } else {
              return data
            }
            
          }

          scope.user = sp_api.data('load.user.info');

          scope.opened = null;

          scope.open = function (badge) {
            scope.$emit('badge:open', badge);
          };

          scope.$parent.$on('badge:open', function (e, badge) {
            scope.opened = !badge || badge.id === scope.opened ? null : badge.id;
          });

          scope.badge_config = {
            selector: '.bns_top_achiv',
            data: {
              // infinite: false,
              slidesToShow: 5,
              slidesToScroll: 1,
              slide: '.bns_top_achiv_item',
              responsive: [
                {
                  breakpoint: 930,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 3
                  }
                }]
            }
          };

        }

      };

    });

}());
