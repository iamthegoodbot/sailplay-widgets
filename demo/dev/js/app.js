(function(){

  window.onload = function(){
    var domain = 'http://skazka.loc';
    //var domain = 'http://sailplay.ru';
//    SAILPLAY.send('init', { partner_id: 74, domain: 'http://saike.dev.sailplay.ru', lang: 'ru'}); //инициируем модуль для партнера с id = 5
    SAILPLAY.send('init', { partner_id: 1188, domain: domain, lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });

    SAILPLAY.on('init.success', function(){
      SAILPLAY.send('login.remote', { background: 'transparent' });
    });

    SAILPLAY.on('login.success', function(){
      SAILPLAY.send('load.actions.list');
    });

    SAILPLAY.on('load.actions.list.success', function(data){
      console.dir(data);
      sp_app.draw_actions(data.actions);
    });

    SAILPLAY.on('logout.success', function(){
//      SAILPLAY.send('login.remote', { background: 'transparent' });
    });

    SAILPLAY.on('actions.perform.error', function(err){
      sp_app.log(JSON.stringify(err));
    });

    SAILPLAY.on('actions.perform.success', function(action){
      SAILPLAY.send('load.actions.list');
      sp_app.log(JSON.stringify(action));
    });

    SAILPLAY.on('actions.social.connect.success', function(action){
      SAILPLAY.send('load.actions.list');
    });

//    SAILPLAY.on('actions.social.connect.error', function(action){
//      sp_app.log(JSON.stringify(action));
//    });


    var sp_app = {
      logout: function(){
        SAILPLAY.send('logout');
      },
      log: function(text){
        document.getElementById('logger').innerHTML = text;
      },
      draw_actions: function(actions){
        var wrapper = document.getElementById('actions_wrapper');
        wrapper.innerHTML = '';
        for(var i = 0; i < actions.length; i+=1){
          var act = actions[i];
          var li = document.createElement('li');

          li.innerHTML = '<span>' + act._actionId + ' ' + act.points + '<span data-sp-action="' + act._actionId + '"></span>' +'</span>';
          wrapper.appendChild(li);
        }
        SAILPLAY.send('actions.parse', actions);
      }
    };

    window.SP_APP = sp_app;

  };

}());