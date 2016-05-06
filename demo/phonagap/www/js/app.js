(function(){

  function init(options){

    localStorage.settings = JSON.stringify(options);

    //var domain = 'http://sailplay.ru';
    //SAILPLAY.send('init', { partner_id: 151, domain: 'http://dev.sailplay.ru', lang: 'ru'}); //инициируем модуль для партнера с id = 5
    SAILPLAY.send('init', {
      partner_id: options.partner_id,
      domain: options.domain,
      lang: 'ru',
      platform: 'mobile'
    }); //инициируем модуль для партнера с id = 5
    //SAILPLAY.send('init', { partner_id: 5, domain: 'http://sailplay.ru', lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });
    //SAILPLAY.send('init', { partner_id: 1188, domain: 'http://skazka.loc', lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });
    //SAILPLAY.send('init', { partner_id: 1188, domain: 'http://192.168.5.250:8080', lang: 'ru', static_url: '/sailplay/widgets/demo/dev' });
//    SAILPLAY.send('init', { partner_id: 1404, domain: 'http://sailplay.ru', static_url: '/sailplay/widgets/demo/dev' });
//    SAILPLAY.send('init', { partner_id: 1527, domain: 'http://sailplay.ru', static_url: '/sailplay/widgets/demo/dev' });

    SAILPLAY.on('init.success', function(){
      //SAILPLAY.send('login', 'a74df059493ae3c8a9f232a675ef5014672f4988');
      if(!options.auth_hash){
        SAILPLAY.send('login.remote', { background: 'transparent' });
      }
      else {
        SAILPLAY.send('login', options.auth_hash);
      }
      sp_app.elms.app.style.display = 'block';
      sp_app.elms.settings.style.display = 'none';
      console.log(SAILPLAY.config());
    });

    SAILPLAY.on('login.success', function(){
      SAILPLAY.send('load.actions.list');
      SAILPLAY.send('load.user.info');
      console.log('load info');
    });

    SAILPLAY.on('load.actions.list.success', function(data){
      console.log(data);
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

    //после выполнения действия необходимо перезагрузить список
    SAILPLAY.on('actions.perform.complete', function(action){
      SAILPLAY.send('load.actions.list');
      sp_app.log(JSON.stringify(action));
    });

    //после привязки аккаунта необходимо перезагрузить список действий
    SAILPLAY.on('actions.social.connect.complete', function(action){
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





  }

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

        li.innerHTML = '<span>' + act._actionId + ' ' + act.points + '<span data-sp-action="' + act._actionId + '" data-styles="http://saike.ru/sailplay/widgets/demo/dev/css/action_btns.css">' + act.socialType + ' ' + act.action + '</span>' +'</span>';
        wrapper.appendChild(li);
      }
      SAILPLAY.send('actions.parse', actions);
    },
    draw_badges: function(badges){
      if(!badges) return;
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

  sp_app.start = function(){

    sp_app.log('start');

    sp_app.elms = {};

    sp_app.elms.settings = document.getElementById('settings');
    sp_app.elms.app = document.getElementById('app');

    sp_app.elms.settings.style.display = 'block';

    sp_app.elms.form = sp_app.elms.settings.getElementsByTagName('form')[0];

    sp_app.elms.form.addEventListener('submit', function(e){
      e.preventDefault();
      var form = e.target;
      sp_app.init({ partner_id: form[0].value || 1, domain: form[1].value, auth_hash: form[2].value });
      console.dir(e);
      return false;
    });

    var settings = JSON.parse(localStorage.settings);
    sp_app.elms.form[0].value =  settings && settings.partner_id || '';
    sp_app.elms.form[1].value = settings && settings.domain || '';
    sp_app.elms.form[2].value = settings && settings.auth_hash || '';

    var h1 = document.createElement('h1');
    h1.innerText = 'HELLO, ALLAH!';

    document.body.appendChild(h1);

  };

  sp_app.init = init;

  sp_app.restart = function(){

    location.reload(true);

  };

  sp_app.popup = function(){
    var win = window.open('http://google.com', '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=' + 500 + ', height=' + 400 + ', top=' + 100 + ', left=' + 100);
    setTimeout(function(){
      win.close();
    }, 2000);
  };

  window.SP_APP = sp_app;

  window.addEventListener('load', sp_app.start, false);

}());