(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, $location) {

      $rootScope.config = window._ltp_config || {};

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1559,
        domain: $rootScope.config.domain || 'https://sailplay.net',
        lang: 'en'

      });

      sp.on('init.success', function () {

        if ($rootScope.config.auth_hash) {

          sp.send('login', $rootScope.config.auth_hash);

        } else {

          $rootScope.loaded = true;

        }

        $rootScope.$apply();

      });

      sp.on('login.error', function () {

        console.error('login error');

        $rootScope.loaded = true;

        $rootScope.$apply();

      });

      sp.on('login.success', loadData);

      sp.on('actions.perform.success', loadData);

      sp.on('gift.purchase.force_complete.success', loadData);

      function loadData(){

        //load data for widgets
        sp_api.call('load.user.info', {all: 1, purchases: 1});
        sp_api.call('load.badges.list');
        sp_api.call('load.actions.list');
        sp_api.call('load.user.history');
        sp_api.call('load.gifts.list', {verbose: 1});

        $rootScope.$apply();

      }

      sp.on('gifts.purchase.success', function (res) {

        $rootScope.$broadcast('notifier:notify', {

          header: 'Gift received!',
          body: res.coupon_number ? 'Coupon number: ' + res.coupon_number : res.success_message

        });

        $rootScope.$apply();

      });


    });

}());
