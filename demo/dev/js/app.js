(function(){

  window.onload = function(){
    var domain = 'http://skazka.loc';
//    SAILPLAY.send('init', { partner_id: 74, domain: 'http://dev.sailplay.ru', lang: 'ru', static_url: 'http://saike.ru/sailplay/pj/widgets/' }); //инициируем модуль для партнера с id = 5
    SAILPLAY.send('init', { partner_id: 1188, domain: domain, lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });

    SAILPLAY.on('init.success', function(){
      SAILPLAY.send('login.remote', { background: 'transparent' });
    });

    SAILPLAY.on('login.success', function(){
      SAILPLAY.send('logout');
    });
  };

}());
