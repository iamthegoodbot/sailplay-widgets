(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, $timeout) {

      $rootScope.config = window._lecafier_config || {};

      var _tags = [];


      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1582,
        domain: $rootScope.config.domain || 'http://sailplay.ru',
        lang: 'ru'

      });

      $rootScope.loaded = false;

      $rootScope.auth = false;

      sp.on('init.success', function () {

        if (window.auth_hash) {

          sp.send('login', window.auth_hash);

        } else {

          authError();
          $rootScope.loaded = true;

        }

        $rootScope.$apply();

      });

      sp.on('login.error', function () {

        console.log('login error');

        authError();

        $rootScope.loaded = true;

        $rootScope.$apply();

      });

      sp.on('login.success', function () {

        $rootScope.loaded = true;

        $rootScope.auth = true;

        //load data for widgets
        sp_api.call('load.user.info', {all: 1});
        sp_api.call('load.gifts.list', {verbose: 1});
        sp_api.call('load.actions.list');
        sp_api.call('load.badges.list');
        sp_api.call('load.user.history');
        sp_api.call('tags.exist', {tags: _tags});

        $rootScope.$apply();

      });

      sp.on('actions.perform.success', function (res) {

        sp_api.call('load.actions.list');

        sp_api.call('load.user.info', {all: 1});

        sp_api.call('load.user.history');

        $rootScope.$broadcast('notifier:notify', {

          header: 'Благодарим Вас',
          body: res && res.data && res.data.response && res.data.response.points ? 'На ваш счет начислено ' + res.data.response.points + ' бонусных баллов.' : 'На ваш счет начислены бонусные баллы.'

        });

        $rootScope.$apply();

      });

      sp.on('actions.perform.error', function () {
        sp_api.call('load.actions.list');
      });

      sp.on('tags.add.success', function () {

        $timeout(function () {

          sp_api.call('tags.exist', {tags: _tags});
          sp_api.call('load.user.history');

        }, 3000);

      });

      function authError() {

        $rootScope.$broadcast('notifier:notify', {

          header: 'Ошибка',
          body: 'Неверный auth_hash'

        });

      }


    });

}());
