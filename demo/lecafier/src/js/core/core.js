(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, $timeout) {

      $rootScope.config = window._lecafier_config || {};

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1582,
        domain: $rootScope.config.domain || 'http://sailplay.ru',
        lang: 'ru'

      });

      $rootScope.loaded = false;

      $rootScope.auth = false;

      sp.on('init.success', function () {

        var auth_hash = $rootScope.config.auth_hash || window.auth_hash;

        if (auth_hash) {

          sp.send('login', auth_hash);

        } else {

          $rootScope.loaded = true;

        }

        $rootScope.$apply();

      });

      sp.on('login.error', function () {

        console.log('login error');

        $rootScope.loaded = true;

        $rootScope.$apply();

      });

      sp.on('login.success', function () {

        $rootScope.loaded = true;

        $rootScope.auth = true;

        //load data for widgets
        sp_api.call('load.user.info', {all: 1, purchases: 1});

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.actions.list');

        sp_api.call('load.user.history');

        $rootScope.$apply();

      });

      sp.on('actions.perform.success', function (res) {

        sp_api.call('load.actions.list');

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        if($("#gift-slider").data('owlCarousel')) {

          $("#gift-slider").data('owlCarousel').destroy();

        }

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.user.history');

        $rootScope.$apply();

      });

      sp.on('gift.purchase.force_complete.success', function (res) {

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        if($("#gift-slider").data('owlCarousel')) {

          $("#gift-slider").data('owlCarousel').destroy();

        }

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.user.history');

        $rootScope.$apply();

      });


      sp.on('actions.perform.error', function () {

        sp_api.call('load.actions.list');

        $rootScope.$apply();

      });


    });

}());
