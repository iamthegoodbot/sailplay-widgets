(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, $filter, spAction) {

      $rootScope.config = window._pichshop_config || {};

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1601,
        domain: $rootScope.config.domain || 'http://sailplay.ru',
        lang: 'ru'

      });

      var TAGS = $rootScope.config.customActions && $rootScope.config.customActions.map(function (item) {
          return item.tag;
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

        $rootScope.$apply(function () {

          $rootScope.loaded = true;

          $rootScope.auth = true;

          loadData();

        })

      });

      sp.on('tags.add.success', function(){
        $rootScope.$apply(loadData);
      });

      sp.on('vars.add.success', function(){
        $rootScope.$apply(loadData);
      });

      sp.on('actions.perform.success', function (res) {

        var _data = res.data;

        $rootScope.$apply(function(){

          $rootScope.$broadcast('notify.show', {
            title: 'Подтверждение',
            header: 'ПОЗДРАВЛЯЕМ!',
            text: 'Вам зачислено <span class="colored">' + _data.response.points + ' ' + $filter('sailplay_pluralize')(_data.response.points, 'балл,балла,баллов') + '</span> за ' + spAction.get_action_data(_data.action).notify
          });

          loadData();

        });

      });

      sp.on('gift.purchase.force_complete.success', function (res) {
        $rootScope.$apply(loadData);
      });

      sp.on('gifts.purchase.success', function () {

        $rootScope.$apply(function(){

          $rootScope.$broadcast('notify.show', {
            title: 'Подтверждение',
            header: 'Подарок успешно добавлен в корзину!',
            text: '*Для его получения необходимо завершить покупку через корзину'
          });

          loadData();

        });

      });

      sp.on('actions.perform.error', function (res) {

        sp_api.call('load.actions.list');

        $rootScope.$broadcast('notify.show', {
          title: 'Ошибка',
          header: 'Oooops!',
          text: 'К сожалению, что-то пошло не так, пожалуйста, проверьте правильность выполенных действий'
        });

        $rootScope.$apply();

      });

      $rootScope.$on('update', function(){
        loadData();
      });

      function loadData() {

        sp_api.call('load.actions.list');

        sp_api.call('load.user.info', {all: 1, purchases: 1});

        sp_api.call('load.gifts.list', {verbose: 1});

        sp_api.call('load.badges.list');

        sp_api.call('load.user.history');

        if (TAGS) sp_api.call('tags.exist', {tags: TAGS});

      }

    });

}());
