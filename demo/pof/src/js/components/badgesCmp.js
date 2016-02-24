(function (angular, sp, jQuery) {

    angular.module('pof.directives.badges', ['pof.services.badges', 'pof.services.actions'])

        .directive('badgesCmp', ['actionService', 'badgeService', function (actionService, badgeService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\n    <section class="l-section badges-sec"\n             data-ng-if="badges">\n        <h1 class="section-header badges-sec__head">Badges\n            <span class="section-header__title">\n                {{ badges && badges.length ? \'Get 15 extra points for every badge received\' : \'Badges list is empty\' }}</span></h1>\n        <div class="badges-sec__inner" data-ng-if="badges && badges.length">\n            <div class="badges-sec__col"\n                 data-ng-repeat="badge in badges">\n                <div class="badges-sec__col-head"\n                     data-ng-click="setActiveBadge($index)" >{{ badge.name }}</div>\n                <div class="badges-sec__col-img">\n                    <img data-ng-src="{{ showBadgeImage(badge) }}" alt=""\n                         data-ng-click="setActiveBadge($index);"\n                         class="img-soft-response">\n                </div>\n            </div>\n        </div>\n        <!-- /inner -->\n\n        <section class="l-centered badges-active" data-ng-if="active_data && show">\n            <!-- положение можно задать либо классом либо непосредственно в style -->\n            <div class="badges-active__pointer this-pointer-{{ active }}"></div>\n            <!-- <div class="badges-active__pointer this-pointer-2"></div> -->\n            <!-- <div class="badges-active__pointer this-pointer-3"></div> -->\n            <!-- <div class="badges-active__pointer this-pointer-4"></div> -->\n            <!-- <div class="badges-active__pointer this-pointer-4" style="left: 50%;"></div> -->\n            <div class="badges-active__img">\n                <img data-ng-src="{{ showBadgeImage(active_data) }}" alt="">\n            </div>\n            <div class="badges-active__text">\n                <div class="badges-active__head">{{ active_data.name }}</div>\n                <div class="badges-active__title">{{ active_data.descr }}</div>\n                <div class="badges-active__points"\n                     data-ng-if="active_data.points">+{{ active_data.points }} points</div>\n            </div>\n            <div class="share-set badges-active__share" data-ng-if="active_data.actions">\n                <span class="share-set__item this-fb"  data-styles="{{ css_link }}"></span>\n                <span class="share-set__item this-tw"  data-styles="{{ css_link }}"></span>\n                <span class="share-set__item this-go"  data-styles="{{ css_link }}"></span>\n            </div>\n        </section>\n    </section>\n\n</div>',
                scope: true,
                link: function (scope) {
                    scope.show = false;
                    scope.badges = [];
                    scope.active_data = [];
                    function getBadgeById(data, id){
                        if(!data || !id) return {};
                        return data.filter(function(item){
                            return item.id == id;
                        })[0];
                    }
                    function update() {
                        actionService.loadList().then(function () {
                            badgeService.loadList().then(function (data) {
                                var arr = data.multilevel_badges[1].splice(0, 4);
                                scope.badges = [];
                                scope.badges.push(getBadgeById(arr, 302));
                                scope.badges.push(getBadgeById(arr, 303));
                                scope.badges.push(getBadgeById(arr, 304));
                                scope.badges.push(getBadgeById(arr, 305));
                                scope.setActiveBadge();
                                scope.$digest();
                            });
                        });
                    }

                    update();
                    sp.on('actions.perform.success', function (data) {
                        scope.$apply(function () {
                            update();
                        });
                    });
                    scope.css_link = actionService.getActionsCssLink();
                    scope.showBadgeImage = function (badge) {
                        if (!badge) return;
                        var imgs = badgeService.getBadgeImage(badge.id);
                        return badge.is_received ? imgs.active : imgs.origin;
                    };
                    scope.setActiveBadge = function (index) {
                        var current = scope.active || false;
                        if (index + 1 == current && scope.show) {
                            scope.show = false;
                            return false;
                        }
                        scope.show = typeof index != 'undefined' ? true : false;
                        scope.active = index ? index + 1 : 1;
                        scope.active_data = scope.badges[scope.active - 1];
                        if (scope.active_data && scope.active_data.actions && scope.show) {
                            var active_date = scope.active_data;
                            setTimeout(function () {
                                var badge_fb = document.querySelector('.share-set.badges-active__share .share-set__item.this-fb');
                                var badge_tw = document.querySelector('.share-set.badges-active__share .share-set__item.this-tw');
                                var badge_gp = document.querySelector('.share-set.badges-active__share .share-set__item.this-go');
                                sp.actions.parse(badge_fb, active_date.actions.fb);
                                sp.actions.parse(badge_tw, active_date.actions.tw);
                                sp.actions.parse(badge_gp, active_date.actions.gp);
                            }, 0)
                        }
                    };
                }
            }

        }]);

    document.createElement('profile-cmp');
    var elems = document.querySelectorAll('profile-cmp');
    for (var i = 0; i < elems.length; i += 1) {
        angular.bootstrap(elems[i], ['pof.directives.profile']);
    }

}(window.angular, window.SAILPLAY, window.$));