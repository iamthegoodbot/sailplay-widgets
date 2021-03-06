angular.module('core', [
  'pascalprecht.translate'
])

.config(function ($translateProvider) {

  //$translateProvider.translations('default', window._SP_LOCALE || {});

  $translateProvider.useLoader('magicTranslations');

  $translateProvider.preferredLanguage(window.sailplay_config.lang);

  $translateProvider.useSanitizeValueStrategy(null);

})

.factory('magicTranslations', function(magicConfig, $q, sp, $window){
  return function(){
    var deferred = $q.defer()

    sp.send('init', {
      partner_id: $window.sailplay_config.partner_id || 1652,
      domain: $window.sailplay_config.domain || '//sailplay.ru',
      lang: $window.sailplay_config.lang || 'en'
    });
    sp.on('init.success', function () {

      sp.send('magic.config', $window.sailplay_config.config || 'default')

    });

    sp.on('magic.config.success', function (res) {
      
      magicConfig.set(res.config.config)
      deferred.resolve(res.config.config.lang[$window.sailplay_config.lang || 'en'])
      //$translateProvider.translations('default', res.config.lang || {});

    })
    return deferred.promise
  }
})

.service('magicConfig', function(){
  var config = {}
  this.set = function(newConfig){
    config = newConfig
  }
  this.get = function(){
    return config
  }
})

.factory('getTimeZone', function(){
  return function() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }
})

.run(function (sp, sp_api, $rootScope, getTimeZone, magicConfig) {

  $rootScope.config = window.sailplay_config || {};

  $rootScope.config.partner_id = window.sailplay_config.partner_id || 1652

  $rootScope.remote_login_options = {
    background: 'rgba(0, 0, 0, 0.5)',
    lang: $rootScope.config.lang || 'en',
    disabled_options: ['socials', 'agreement']
  };


  $rootScope.loaded = false;

  if(window.sessionStorage && window.sessionStorage.getItem('splogged')) {
    $rootScope.isLogged = !!window.sessionStorage.getItem('splogged')
  } else {
    $rootScope.isLogged = false
  }

  $rootScope.auth = false;

  sp.on('magic.config.success', function (res) {
      //$translateProvider.translations('default', res.config.lang || {});

      $rootScope.$apply(function () {

        $rootScope.loaded = true;

        $rootScope.config.auth_hash && sp.send('login', $rootScope.config.auth_hash);

      });
  })    

  sp.on('login.error', function () {

    $rootScope.$apply(function () {

      $rootScope.loaded = true;

    });

  });

  sp.on('login.success', function () {

    window.sessionStorage && window.sessionStorage.setItem('splogged', true)

    sp_api.reset();

    $rootScope.$apply(function () {

      $rootScope.auth = true;

      $rootScope.isLogged = true

      loadData();

    })

  });

  sp.on('logout.success', function () {

    window.sessionStorage && window.sessionStorage.removeItem('splogged')

    sp_api.reset();
    //
    // if ($(".js-slick-slider.slick-initialized").length) {
    //   $(".js-slick-slider.slick-initialized").slick('unslick');
    // }

    $rootScope.$apply(function () {

      $rootScope.auth = false;

      $rootScope.isLogged = false

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

    // $rootScope.$apply(loadData);

  });

  sp.on('actions.perform.error', function (res) {

    sp_api.call('load.actions.list');

    sp_api.call('load.actions.custom.list');

    $rootScope.$apply();

  });

  $rootScope.$on('update', function () {
    loadData();
  });

  function loadData() {

    $rootScope.$broadcast('clear_all_show');

    var slick_selector = '.slick-initialized';
    if ($(slick_selector).length) {
      $(slick_selector).slick('unslick');
    }

    sp_api.call('load.actions.list');

    sp_api.call('load.actions.custom.list');

    sp_api.call('load.badges.list', {include_rules: 1});

    sp_api.call('load.user.info', {all: 1, purchases: 1});

    sp_api.call('load.gifts.list', {verbose: 1});

    sp_api.call('load.user.history', {tz: getTimeZone()});

  }
});