(function () {

  angular.module('core', [
    'ipCookie'
  ])

    .run(function (sp, ipCookie, sp_api, $rootScope, actions_data) {

      $rootScope.config = window.sailplay_config || {};

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1,
        domain: $rootScope.config.domain || 'http://sailplay.ru',
        lang: 'ru'

      });

      $rootScope.remote_login_options = {
        background: 'rgba(0, 0, 0, 0.5)',
        lang: 'ru',
        disabled_options: ['socials', 'agreement']
      };


      $rootScope.loaded = false;

      $rootScope.auth = false;

      sp.on('init.success', function () {

        $rootScope.$apply(function () {

          $rootScope.loaded = true;

          // $rootScope.$broadcast('login.remote');

          $rootScope.config.auth_hash && sp.send('login', $rootScope.config.auth_hash);

        });

      });

      sp.on('login.error', function () {

        $rootScope.$apply(function () {

          $rootScope.loaded = true;

        });

      });

      sp.on('login.success', function () {

        $rootScope.$apply(function () {

          $rootScope.auth = true;

          loadData();

        })

      });

      sp.on('logout.success', function () {

        $(".js-slick-slider").slick('unslick');

        $rootScope.$apply(function () {

          $rootScope.auth = false;

        });

      });

      sp.on('tags.add.success', function () {

        setTimeout(function () {

          $rootScope.$apply(loadData);

        }, 3000);

      });


      sp.on('users.update.success', function () {

        $rootScope.$apply(loadData);

      });

      sp.on('actions.perform.success', function (res) {

        $rootScope.$apply(loadData);

      });

      sp.on('gift.purchase.force_complete.success', function (res) {

        $rootScope.$apply(loadData);

      });

      sp.on('gifts.purchase.success', function () {

        $rootScope.$apply(loadData);

      });

      sp.on('actions.perform.error', function (res) {

        sp_api.call('load.actions.list');

        $rootScope.$apply();

      });

      $rootScope.$on('update', function () {
        loadData();
      });

      function getTimeZone() {
        var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
      }

      function loadData() {

        sp_api.reset();

        if ($(".js-slick-slider").length) {
          $(".js-slick-slider").slick('unslick');
        }

        sp_api.call('load.actions.list');

        sp_api.call('load.actions.custom.list');

        sp_api.call('load.actions.custom.list');

        sp_api.call('load.badges.list', {include_rules: 1});

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.user.history', {tz: getTimeZone()});

      }

    });

}());
