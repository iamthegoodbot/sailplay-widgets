(function () {

  angular.module('core', [
    'ipCookie'
  ])

  .run(function(sp, ipCookie, sp_api, $rootScope){

    var klooker_cookie_name = 'klooker_auth_hash';

    sp.send('init', {

      //partner_id: 1188,
      //domain: 'http://skazka.loc'
      partner_id: 1554,
      domain: 'http://sailplay.net',
      lang: 'en'

    });

    sp.on('init.success', function(){

      var auth_hash = ipCookie(klooker_cookie_name);
      if(auth_hash){
        sp.send('login', auth_hash);
      }
      else {
        sp.send('login.remote', { background: 'transparent' });
      }

    });

    sp.on('login.error', function(){

      ipCookie.remove(klooker_cookie_name);
      sp.send('login.remote', { background: 'transparent' });

    });

    sp.on('login.success', function(){

      ipCookie(klooker_cookie_name, sp.config().auth_hash);

      //load data for widgets
      sp_api.call('load.user.info');
      sp_api.call('load.badges.list');
      sp_api.call('load.actions.list');
      sp_api.call('load.user.history');
      sp_api.call('load.gifts.list');

    });

    sp.on('actions.perform.success', function(){
      sp_api.call('load.actions.list');
    });

    sp.on('actions.perform.error', function(){
      sp_api.call('load.actions.list');
    });

    sp.on('actions.perform.complete', function(){
      sp_api.call('load.actions.list');
    });

    sp.on('gifts.purchase.success', function(res){

      console.dir(res);

      $rootScope.$broadcast('notifier:notify', {

        header: 'Gift received!',
        body: res.coupon_number ? 'Coupon number: ' + res.coupon_number : res.success_message

      });

      $rootScope.$apply();

    });

  });

}());
