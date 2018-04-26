(function () {

  var html = '<!-- Preloader -->\n    <div id="sp_preloader">\n      <div id="sp_status">&nbsp;</div>\n    </div>\n\n    <div class="sp_widget">\n      <div data-ng-if="isAuth() && api_user.program == \'V1\'">\n          <section class="sp_l-section sp_top-sec">\n            <div class="sp_top-sec__title">welcome to</div>\n            <h1 class="sp_top-sec__head">ShowPoints Loyalty Program</h1>\n            <div class="sp_top-sec__list">\n                <div class="sp_top-sec__item this-icon-1">\n                  <div class="sp_top-sec__item-head">Order in-store</div>\n                  <div class="sp_top-sec__item-title">Get bonus points for your purchases</div>\n                </div>\n                <div class="sp_top-sec__item this-icon-2">\n                  <div class="sp_top-sec__item-head">Earn extra points</div>\n                  <div class="sp_top-sec__item-title">Join our Facebook group, tell your friends about us and get     bonus points for free                    </div>\n                </div>\n                <div class="sp_top-sec__item this-icon-3">\n                  <div class="sp_top-sec__item-head">Get awesome gifts</div>\n                  <div class="sp_top-sec__item-title">You can redeem your points for our products</div>\n                </div>\n            </div>\n          </section>\n          <profile-d></profile-d>\n          <status-d></status-d>\n          <badges-d></badges-d>\n          <gifts-d></gifts-d>\n          <actions-d></actions-d>\n      </div>\n      <div data-ng-if="isAuth() && api_user.program == \'V2\'">\n          <img src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/d5146641fdbff2daa65b9cb19d329955.jpg" class="v2">\n          <profile-d template="new"></profile-d>\n          <status-d></status-d>\n          <badges-d></badges-d>\n          <gifts-d></gifts-d>\n          <actions-d></actions-d>\n      </div>\n<auth-d></auth-d>\n    </div>\n    <!-- /wrapper -->\n  '

  angular.module('sg', [
    'sg.services',
    'sg.ui',
    'sg.directives'
  ])

    .directive('sailplaySg', function (api, sp) {
      return {
        restrict: 'E',
        replace: false,
        template: html,
        scope: true,
        link: function (scope) {
          scope.isAuth = api.isAuth;
          scope.api_user = api.user;
        }
      }
    });


  function startApp() {


    SAILPLAY.send('init', { partner_id: window.PARTNER_ID, lang: 'en', domain: 'http://sailplay.net' });

    SAILPLAY.on('init.success', function () {

      angular.bootstrap(document.querySelector('sailplay-sg'), ['sg']);

    });

  }

  startApp();

}());