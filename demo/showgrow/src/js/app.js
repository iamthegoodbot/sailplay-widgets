(function () {

  var html = `<!-- Preloader -->
    <div id="sp_preloader">
      <div id="sp_status">&nbsp;</div>
    </div>

    <div class="sp_widget">
      <div data-ng-if="isAuth() && api_user.program == 'V1'">
          <section class="sp_l-section sp_top-sec">
            <div class="sp_top-sec__title">welcome to</div>
            <h1 class="sp_top-sec__head">ShowPoints Loyalty Program</h1>
            <div class="sp_top-sec__list">
                <div class="sp_top-sec__item this-icon-1">
                  <div class="sp_top-sec__item-head">Order in-store</div>
                  <div class="sp_top-sec__item-title">Get bonus points for your purchases</div>
                </div>
                <div class="sp_top-sec__item this-icon-2">
                  <div class="sp_top-sec__item-head">Earn extra points</div>
                  <div class="sp_top-sec__item-title">Join our Facebook group, tell your friends about us and get                        bonus points for free                    </div>
                </div>
                <div class="sp_top-sec__item this-icon-3">
                  <div class="sp_top-sec__item-head">Get awesome gifts</div>
                  <div class="sp_top-sec__item-title">You can redeem your points for our products</div>
                </div>
            </div>
          </section>
          <profile-d></profile-d>
          <status-d></status-d>
          <badges-d></badges-d>
          <gifts-d></gifts-d>
          <actions-d></actions-d>
      </div>
      <div data-ng-if="isAuth() && api_user.program == 'V2'">
          <img src="https://sailplays3.cdnvideo.ru/media/assets/assetfile/d5146641fdbff2daa65b9cb19d329955.jpg" class="v2">
          <profile-d template="new"></profile-d>
          <status-d></status-d>
          <badges-d></badges-d>
          <gifts-d></gifts-d>
          <actions-d></actions-d>
      </div>
      <auth-d></auth-d>
    </div>
    <!-- /wrapper -->
  `

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