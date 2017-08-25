(function () {

  angular.module('sg', [
      'sg.services',
      'sg.ui',
      'sg.directives'
    ])

    .directive('sailplaySg', function (api, sp) {
      return {
        restrict: 'E',
        replace: false,
        template: '<!-- Preloader -->\n<div id="sp_preloader">\n    <div id="sp_status">&nbsp;</div>\n</div>\n<div class="sp_widget">\n\n    <div data-ng-if="isAuth()">\n        \n        <section class="sp_l-section sp_top-sec">\n            <div class="sp_top-sec__title">show grow</div>\n            <h1 class="sp_top-sec__head">Loyalty Program</h1>\n            <div class="sp_top-sec__list">\n                <div class="sp_top-sec__item this-icon-1">\n                    <div class="sp_top-sec__item-head">Order in-store</div>\n                    <div class="sp_top-sec__item-title">Get bonus points for your purchases</div>\n                </div>\n                <div class="sp_top-sec__item this-icon-2">\n                    <div class="sp_top-sec__item-head">Earn extra points</div>\n                    <div class="sp_top-sec__item-title">Join our Facebook group, tell your friends about us and get\n                        bonus points for free\n                    </div>\n                </div>\n                <div class="sp_top-sec__item this-icon-3">\n                    <div class="sp_top-sec__item-head">Get awesome gifts</div>\n                    <div class="sp_top-sec__item-title">You can redeem your points for our products</div>\n                </div>\n            </div>\n        </section>\n\n        <profile-d></profile-d>\n\n        <status-d></status-d>\n\n        <gifts-d></gifts-d>\n\n        <badges-d></badges-d>\n\n        <actions-d></actions-d>\n    </div>\n    \n    <auth-d></auth-d>\n\n</div>\n<!-- /wrapper -->\n',
        scope: true,
        link: function (scope) {
          scope.isAuth = api.isAuth;
        }
      }
    });


  function startApp() {


    SAILPLAY.send('init', {partner_id: window.PARTNER_ID, lang: 'en', domain: 'http://sailplay.net'});

    SAILPLAY.on('init.success', function () {

      angular.bootstrap(document.querySelector('sailplay-sg'), ['sg']);

    });

  }

  startApp();

}());