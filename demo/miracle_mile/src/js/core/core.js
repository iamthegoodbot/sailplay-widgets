(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, custom_data, spProfileTag, actions_data) {

      $rootScope.config = window.sailplay_config || {};

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1588,
        domain: $rootScope.config.domain || 'http://sailplay.net',
        lang: 'en'

      });

      $rootScope.remote_login_options = {
        background: 'rgba(0, 0, 0, 0.5)',
        lang: 'en',
        disabled_options: ['socials', 'agreement']
      };


      // custom actions action tags
      var TAGS = custom_data.map(function (item) {
        return item.buttons.map(function (button) {
          return button.tag;
        })
      }).reduce(function (a, b) {
        return a.concat(b);
      });


      // Tag for fill profile
      TAGS.push(spProfileTag);

      $rootScope.loaded = false;

      $rootScope.auth = false;

      sp.on('init.success', function () {

        $rootScope.$apply(function () {

          $rootScope.loaded = true;

          $rootScope.$broadcast('login.remote');

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

        $(".bns_gift_main").slick('unslick');

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

        if ($(".bns_gift_main").length) {

          $(".bns_gift_main.slick-initialized").slick('unslick');

        }

        sp_api.call('load.actions.list');

        sp_api.call('load.badges.list');

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.user.history', {tz: getTimeZone()});

        if (TAGS) sp_api.call('tags.exist', {tags: TAGS});

      }

    });

}());
