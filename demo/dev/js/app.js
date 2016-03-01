(function(){

  window.onload = function(){
    //var domain = 'http://sailplay.ru';
    //SAILPLAY.send('init', { partner_id: 151, domain: 'http://dev.sailplay.ru', lang: 'ru'}); //инициируем модуль для партнера с id = 5
    //SAILPLAY.send('init', { partner_id: 5, domain: 'http://sailplay.ru', lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });
    SAILPLAY.send('init', { partner_id: 1188, domain: 'http://skazka.loc', lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });
    //SAILPLAY.send('init', { partner_id: 1188, domain: 'http://192.168.5.250:8080', lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });
//    SAILPLAY.send('init', { partner_id: 1404, domain: 'http://sailplay.ru', static_url: '/sailplay/widgets/demo/dev' });
//    SAILPLAY.send('init', { partner_id: 1527, domain: 'http://sailplay.ru', static_url: '/sailplay/widgets/demo/dev' });

    SAILPLAY.on('init.success', function(){
      //SAILPLAY.send('login', 'a74df059493ae3c8a9f232a675ef5014672f4988');
      SAILPLAY.send('login.remote', { background: 'transparent' });
      console.dir(SAILPLAY.config());
    });

    SAILPLAY.on('login.success', function(){
      SAILPLAY.send('load.actions.list');
      SAILPLAY.send('load.user.info');
    });

    SAILPLAY.on('load.actions.list.success', function(data){
      console.dir(data);
      sp_app.draw_actions(data.actions);
      SAILPLAY.send('load.badges.list');
    });

    SAILPLAY.on('load.badges.list.success', function(data){
      console.dir(data);
      sp_app.draw_badges(data.one_level_badges.length > 0 ? data.one_level_badges : data.multilevel_badges[1]);
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
      sp_app.log(JSON.stringify(action));
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

          li.innerHTML = '<span>' + act._actionId + ' ' + act.points + '<span data-sp-action="' + act._actionId + '" data-styles="http://saike.ru/sailplay/widgets/demo/dev/css/action_btns.css"></span>' +'</span>';
          wrapper.appendChild(li);
        }
        SAILPLAY.send('actions.parse', actions);
      },
      draw_badges: function(badges){
        var wrapper = document.getElementById('badges_wrapper');
        wrapper.innerHTML = '';
        for(var i = 0; i < badges.length; i+=1){
          var badge = badges[i];
          console.dir(badge);
          var li = document.createElement('li');
          var badge_dom = document.createElement('span');
          badge_dom.innerHTML = badge.name;
          var badge_fb = document.createElement('span');
          var badge_tw = document.createElement('span');
          var badge_gp = document.createElement('span');
          badge_dom.appendChild(badge_fb);
          badge_dom.appendChild(badge_tw);
          badge_dom.appendChild(badge_gp);
          li.appendChild(badge_dom);
          wrapper.appendChild(li);
          if(badge.actions){
            SAILPLAY.actions.parse(badge_fb, badge.actions.fb);
            SAILPLAY.actions.parse(badge_tw, badge.actions.tw);
            SAILPLAY.actions.parse(badge_gp, badge.actions.gp);
          }
        }
        //SAILPLAY.send('actions.parse', actions);
      }
    };

    window.SP_APP = sp_app;

  };

}());