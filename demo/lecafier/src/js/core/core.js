(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, spShare, $filter, spAction) {

      $rootScope.config = window._lecafier_config || {};

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1582,
        domain: $rootScope.config.domain || 'http://sailplay.ru',
        lang: 'ru'

      });

      spShare.init({
        baseUrl: document.location.protocol + '//' + document.location.host,
        fbAppId: $rootScope.config.fbAppId
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

        sp_api.call('load.badges.list');

        sp_api.call('load.user.history');

        $rootScope.$apply();

      });

      sp.on('actions.perform.success', function (res) {

        sp_api.call('load.actions.list');

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        if ($("#gift-slider").data('owlCarousel')) {

          $("#gift-slider").data('owlCarousel').destroy();

        }

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.badges.list');

        sp_api.call('load.user.history');

        var _data = res.data;

        // BAD
        $rootScope.$broadcast('notify.show', {
          title: 'Подтверждение',
          img: 'l' + $('.rankimg .status').attr('class'),
          header: 'ПОЗДРАВЛЯЕМ!',
          text: 'Вам зачислено <br><span class="orange">' + _data.response.points + ' ' + $filter('sailplay_pluralize')(_data.response.points, 'кофейная капеля,кофейные капли,кофейных капель') + '</span><br> за ' + spAction.get_action_data(_data.action).notify
        });

        $rootScope.$apply();

      });

      sp.on('gift.purchase.force_complete.success', function (res) {

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        if ($("#gift-slider").data('owlCarousel')) {

          $("#gift-slider").data('owlCarousel').destroy();

        }

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.badges.list');

        sp_api.call('load.user.history');

        $rootScope.$apply();

      });

      sp.on('actions.perform.error', function (res) {

        sp_api.call('load.actions.list');

        $rootScope.$broadcast('notify.show', {
          title: 'Ошибка',
          img: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/2e2f4177c30b7b90a2407a7d7921e6f6.png',
          header: 'Oooops!',
          text: 'К сожалению, что-то пошло не так,<br> пожалуйста, проверьте правильность<br> выполенных действий'
        });

        $rootScope.$apply();

      });

    });

}());
