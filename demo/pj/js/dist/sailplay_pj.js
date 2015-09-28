var SAILPLAY = (function () {

  //methods that not supported in old browsers
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/ ) {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;

      for (; from < len; from++) {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }

  var cookies = {
    createCookie: function(name,value,days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
      }
      else var expires = "";
      document.cookie = name+"="+value+expires+"; path=/";
    },
    readCookie: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    },
    eraseCookie: function(name) {
      cookies.createCookie(name,"",-1);
    }
  };

  //simple jsonp service
  var JSONP = {
    currentScript: null,
    get: function (url, data, success, error) {
      var src = url + (url.indexOf("?") + 1 ? "&" : "?");
      var head = document.getElementsByTagName("head")[0];
      var newScript = document.createElement("script");
      var params = [];

      //auth_hash checking
      if(!_config.auth_hash){
        delete data.auth_hash;
      }

      window.JSONP_CALLBACK = window.JSONP_CALLBACK || {};

      var callback_name = 'sailplay_' + new Date().getTime() + Math.random().toString().replace('.', '');

      var jsonpTimeout = setTimeout(function () {
        try {
          head.removeChild(newScript);
        }
        catch(err) {}
        delete window.JSONP_CALLBACK[callback_name];
      }, 20000);

      window.JSONP_CALLBACK[callback_name] = function (data) {
        clearTimeout(jsonpTimeout);
        newScript && head.removeChild(newScript);
        delete window.JSONP_CALLBACK[callback_name];
        success && success(data);
      };

      data["callback"] = 'JSONP_CALLBACK.' + callback_name;

      for (var param_name in data) {
        params.push(param_name + "=" + encodeURIComponent(data[param_name]));
      }
      src += params.join("&");

      newScript.type = "text/javascript";
      newScript.src = src;
      newScript.onerror = function (ex) {
        newScript && head.removeChild(newScript);
        delete window.JSONP_CALLBACK[callback_name];
        error && error(ex);
      };

      head.insertBefore(newScript, head.firstChild);
    },
    success: null
  };

  var sp = {};

  //observer pattern
  var _handlers = {};

  sp.on = function (event, handler) {
    if (typeof (_handlers[event]) == "undefined")
      _handlers[event] = [];
    _handlers[event].push(handler);
  };

  sp.send = function (event, data) {
    if (_handlers[event]) {
      for (var i = 0; i < _handlers[event].length; i++) {
        _handlers[event][i](data);
      }
    }
  };

  //private config
  var _config = {};
  var _actions_config = {};
  var _proxy = false;

  function initError(){
    alert('Please init SailPlay HUB first!');
  }

  function remoteInit(elm){
    if(typeof Porthole === 'undefined'){
      alert('SailPlay: Porthole.js library need to be installed');
      return;
    }
    if(elm.nodeType == 1 && elm.tagName == 'IFRAME'){

      function onMessage(messageEvent) {

        if(messageEvent.data.name == 'login.success'){
          sp.send('login.do', messageEvent.data.auth_hash);
          return;
        }
        if(messageEvent.data.name == 'login.cancel'){
          sp.send('login.cancel');
          return;
        }
        if(messageEvent.data.name == 'login.check'){
          if(messageEvent.data.auth_hash == 'None'){
            sp.send('logout');
          }
          else {
            sp.send('login.do', messageEvent.data.auth_hash)
          }
          return;
        }
        if(messageEvent.data.name == 'logout.success'){
          _config.auth_hash = '';
          cookies.eraseCookie('sp_auth_hash');
          sp.send('logout.success');
        }
      }

      elm.src = _config.DOMAIN + '/users/auth-page/?partner_id=' + _config.partner.id + '&dep_id=' + _config.dep_id;

      _proxy = new Porthole.WindowProxy('', elm.name);

      _proxy.addEventListener(onMessage);

    }
    else {
      alert('SailPlay: provide <iframe> DOM element as parameter (Remote login)');
    }
  }

  //init function
  sp.on('init', function (params) {
    if (!params) {
      alert('SailPlay: provide required parameters');
    }
    if (!params.partner_id) {
      alert('SailPlay: provide partner_id');
      return;
    }
    JSONP.get('http://sailplay.ru' + '/js-api/' + params.partner_id + '/config/', { lang: params.lang || 'ru' }, function (response) {
      if (response && response.status == 'ok') {
        _config = response.config;
        _config.DOMAIN = 'http://sailplay.ru';
        _config.dep_id = params.dep_id || '';
        _config.env.staticUrl = params.static_url || _config.env.staticUrl;
        sp.send('init.success', _config);
        //        console.dir(_config);
      } else {
        sp.send('init.error', response);
        alert('SailPlay: app load failed!');
      }
    });

  });

  sp.on('init.remote', function(elm){
    remoteInit(elm);
  });

  //////////////////
  //bind hub events
  sp.on('language.set', function(lang){
    if(_config == {}){
      initError();
      return;
    }
    if(typeof lang == 'string'){
      JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/config/', { lang: lang }, function (response) {
        if (response && response.status == 'ok') {
          _config.lang = response.config.lang;
          sp.send('language.set.success', _config.lang);
          //        console.dir(_config);
        } else {
          sp.send('language.set.error', response);
        }
      });
    }
  });

  sp.config = function(){
    return _config;
  };

  //////////////////
  //bind api events

  //LOGIN & LOGOUT
  sp.on('login.do', function(auth_hash){
    _config.auth_hash = auth_hash;
//    cookies.createCookie('sp_auth_hash', _config.auth_hash);
    var params = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('login.success', res.user);
      } else {
        _config.auth_hash = '';
//        cookies.eraseCookie('sp_auth_hash');
        sp.send('login.error', res);
      }
    });
  });


  sp.on('login', function (auth_hash) {

    if(_config == {}){
      initError();
      return;
    }

    sp.send('login.do', auth_hash);

  });

  sp.on('logout', function () {
    if(_config == {}){
      initError();
      return;
    }
    if(_config.auth_hash && _proxy){
      _proxy.post({name: 'logout'});
    }
    _config.auth_hash = '';
    cookies.eraseCookie('sp_auth_hash');
    sp.send('logout.success');

  });

  //USER INFO
  sp.on('load.user.info', function () {
    if(_config == {}){
      initError();
      return;
    }
    var params = {
      auth_hash: _config.auth_hash,
      user_status: 1,
      badges: 1,
      last_badge: 1
    };
    JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
      if (res.status == 'ok') {
        sp.send('load.user.info.success', res);
      } else {
        sp.send('load.user.info.error', res);
      }
    });
  });

  //USER HISTORY
  sp.on('load.user.history', function () {
    if(_config == {}){
      initError();
      return;
    }
    var params = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.users.history, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.user.history.success', res.history);
      } else {
        sp.send('load.user.history.error', res);
      }
    });
  });

  //GIFTS GET INFO
  sp.on('gifts.get', function (giftId) {
    if(_config == {}){
      initError();
      return;
    }
    var params = {
      gift_id: giftId,
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.gifts.get, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('gifts.get.success', res.gift);
      } else {
        sp.send('gifts.get.error', res);
      }
    });
  });

  //GIFTS LIST
  sp.on('load.gifts.list', function () {
    if(_config == {}){
      initError();
      return;
    }
    var params = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.gifts.list, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.gifts.list.success', res.gifts);
      } else {
        sp.send('load.gifts.list.error', res);
      }
    });
  });

  //GET GIFT
  function forceCompleteGiftPurchase(giftPurchase) {
    var params = {
      gift_public_key: giftPurchase.gift_public_key,
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.gifts.purchase.force_confirm, params, function (res) {
      if (res.status == 'ok') {
        sp.send('gift.purchase.force_complete.success', res);
      } else {
        sp.send('gift.purchase.force_complete.error', res);
      }
      //      console.dir(res);
    });
  }

  //CREATE GIFT PURCHASE V1
  sp.on('gifts.purchase', function (gift) {
    if(_config == {}){
      initError();
      return;
    }
    if (!_config.auth_hash) {
      sp.send('gifts.purchase.auth.error', gift);
    } else {
      var params = {
        gift_id: gift.id,
        dep_id: _config.dep_id || _config.partner.depId || '',
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.gifts.purchase.purchase, params, function (res) {
        if (res.status == 'ok') {
          sp.send('gifts.purchase.success', res);
          if (res.is_completed) {
            var requestedPurchase = res;
            if (!requestedPurchase.request_to_partner_url) {
              forceCompleteGiftPurchase(requestedPurchase);
            } else {
              var reqGiftPurchase = {
                gift_public_key: requestedPurchase['gift_public_key'],
                gift_sku: requestedPurchase['gift_sku'],
                auth_hash: _config.auth_hash
              };
              if (requestedPurchase['user_phone']) {
                reqGiftPurchase['user_phone'] = requestedPurchase['user_phone'];
              }
              if (requestedPurchase['email']) {
                reqGiftPurchase['email'] = requestedPurchase['email'];
              }
              JSONP.get(requestedPurchase.request_to_partner_url, reqGiftPurchase, function (res) {
                sp.send('gifts.purchase.partner_request.success', res);
              }, function (res) {
                sp.send('gifts.purchase.partner_request.error', res);
                forceCompleteGiftPurchase(requestedPurchase);
              });
            }
          }
        } else {
          sp.send('gift.purchase.error', res);
        }
        //        console.dir(res);
      });
    }
  });

  //BADGES LIST
  sp.on('load.badges.list', function () {
    if(_config == {}){
      initError();
      return;
    }
    var params = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.badges.list, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.badges.list.success', res);
      } else {
        sp.send('load.badges.list.error', res);
      }
    });
  });

  //ACTIONS SECTION

  //LOAD ACTIONS LIST
  sp.on('load.actions.list', function () {
    if(_config == {}){
      initError();
      return;
    }
    var params = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.actions.load, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        _actions_config = res.data;
        sp.send('load.actions.list.success', res.data);
      } else {
        sp.send('load.actions.list.error', res);
      }
    });
  });

  //PERFORM ACTION
  var Actions = {};

  Actions.openSocialRegNeedPopup = function (action) {
    var w;
    if (action.socialType == 'vk')
      w = Actions.popupWindow(_actions_config.social.vk.authUrl, 'social_reg', 840, 400);
    else
      w = Actions.popupWindow(_actions_config.social[action.socialType].authUrl, 'social_reg');

    var checkPopupInterval = setInterval(function () {
      if (w == null || w.closed) {
        sp.send('actions.social.connect.complete');
        clearInterval(checkPopupInterval);
      }
    }, 100);
  };

  Actions.popupWindow = function (url, title, w, h) {
    var width, height, left, top;
    if (w !== undefined && h !== undefined) {
      width = w;
      height = h;
      left = (screen.width / 2) - (w / 2);
      top = (screen.height / 2) - (h / 2);
    } else {
      width = screen.width / 2;
      height = screen.height / 2;
      left = width - (width / 2);
      top = height - (height / 2);
    }

    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

  };

  Actions.share = function (action) {

    var frameUrl = _config.DOMAIN + '/js-api/' + _config.partner.id + '/actions/social-widget/?auth_hash=' + _config.auth_hash;
    frameUrl += '&socialType=' + action.socialType + '&action=' + action.action + '&link=' + action.shortLink + '&pic=' + (_actions_config.partnerCustomPic ? _actions_config.partnerCustomPic : _config.partner.logo);

    frameUrl += '&msg=' + _actions_config.messages[action.action];
    frameUrl += '&_actionId=' + action['_actionId'];

    if (action.action == 'purchase') {
      frameUrl += '&purchasePublicKey=' + _actions_config.purchasePublicKey;
    }

    var socialFrame = Actions.popupWindow(frameUrl, 'social_action', 200, 210);
    var checkPopupInterval = setInterval(function () {
      if (socialFrame == null || socialFrame.closed) {
        sp.send('actions.perform.complete', action);
        clearInterval(checkPopupInterval);
      }
    }, 200);

  };

  Actions.perform = function(action){
    var frameUrl = _config.DOMAIN + '/popup/' + _config.partner.id + '/widgets/custom/' + action.type  + '/?auth_hash=' + _config.auth_hash;
    frameUrl += '&lang=' + _config.lang;
    frameUrl += '&from_sdk=0';
    var actionFrame = Actions.popupWindow(frameUrl, 'SailPlay', 600, 400);
    var checkPopupInterval = setInterval(function () {
      if (actionFrame == null || actionFrame.closed) {
        sp.send('actions.perform.complete', action);
        clearInterval(checkPopupInterval);
      }
    }, 200);
  };

  sp.on('actions.perform', function (action) {
    if(_config == {}){
      initError();
      return;
    }
    if (_config.auth_hash) {
      sp.send('actions.perform.start', action);
      if (action.socialType && _actions_config.connectedAccounts) {
        if (!_actions_config.connectedAccounts[action.socialType]) {
          Actions.openSocialRegNeedPopup(action);
        } else {
          Actions.share(action);
        }
      }
      else if(!action.socialType){
        Actions.perform(action);
      }
    } else {
      sp.send('actions.perform.auth.error', action);
    }
  });

  //PROMO-CODES SECTION
  sp.on('promocodes.apply', function (promocode) {
    if(_config == {}){
      initError();
      return;
    }
    promocode.auth_hash = _config.auth_hash;
    if (_config.auth_hash) {
      JSONP.get(_config.DOMAIN + _config.urls.promocodes.apply, promocode, function (res) {
        if (res.status == 'ok') {
          sp.send('promocodes.apply.success', res);
        } else {
          sp.send('promocodes.apply.error', res);
        }
      });
    } else {
      sp.send('promocodes.apply.auth.error', action);
    }
  });

  //TAGS SECTIONS
  sp.on('tags.add', function (tags) {
    if(_config == {}){
      initError();
      return;
    }
    if (_config.auth_hash) {
      var tagsObj = {
        tags: tags.join(','),
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.tags.add, tagsObj, function (res) {
        if (res.status == 'ok') {
          sp.send('tags.add.success', res);
        } else {
          sp.send('tags.add.error', res);
        }
      });
    } else {
      SAILPLAY.trigger('tags.add.auth.error', tags);
    }
  });

  //LEADERBOARD SECTION
  sp.on('leaderboard.load', function () {
    if(_config == {}){
      initError();
      return;
    }
    var tagsObj = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.leaderboard.data, tagsObj, function (res) {
      if (res.status == 'ok') {
        sp.send('leaderboard.load.success', res.data);
      } else {
        sp.send('leaderboard.load.error', res);
      }
    });
  });

  return sp;
}());
angular.module('pj.filters', [])
  .filter('short_number', function(){
    return function(number){
      function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
        number = Number(number);
        forceLetter = forceLetter || false;
        if(forceLetter !== false) {
          return annotate(number, maxPlaces, forcePlaces, forceLetter)
        }
        var abbr;
        if(number >= 1e12) {
          abbr = 'T';
        }
        else if(number >= 1e9) {
          abbr = 'B';
        }
        else if(number >= 1e6) {
          abbr = 'M';
        }
        else if(number >= 1e3) {
          abbr = 'K';
        }
        else {
          abbr = '';
        }
        return annotate(number, maxPlaces, forcePlaces, abbr);
      }

      function annotate(number, maxPlaces, forcePlaces, abbr) {
        // set places to false to not round
        var rounded = 0;
        switch(abbr) {
          case 'T':
            rounded = number / 1e12;
            break;
          case 'B':
            rounded = number / 1e9;
            break;
          case 'M':
            rounded = number / 1e6;
            break;
          case 'K':
            rounded = number / 1e3;
            break;
          case '':
            rounded = number;
            break;
        }
        if(maxPlaces !== false) {
          var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
          if(test.test(('' + rounded))) {
            rounded = rounded.toFixed(maxPlaces);
          }
        }
        if(forcePlaces !== false) {
          rounded = Number(rounded).toFixed(forcePlaces);
        }
        var splitted = rounded.toString().split('.');
        var decimal = splitted[1] ? splitted[1][0] : '0';
        return splitted[0] + ( decimal != '0' ? ('.' + decimal) : '') + abbr;
      }

      return abbreviate(number, 2, false, false);
    }
  })

  .filter('truncate', function(){

    return function(string, len){

      if(!len || !string || string.length <= len) return string;
      return string.substring(0, len) + '...';
    }

  })

  //transform string to trusted html
  .filter('to_html', ['$sce', function($sce){
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }])

  .filter('static', [ 'config', function(config){

    return function(file) {
      var static_url = config.env.staticUrl;
      if(static_url) return static_url + file;
      return '';
    };

  }])

  .filter('media', [ 'config', function(config){

    return function(file) {
      var static_url = config.env.mediaUrl;
      if(static_url) return static_url + file;
      return '';
    };

  }])

  .filter('humanizeUserHistoryAction', ["$rootScope", function($rootScope) {

    return function(historyItem) {
      switch (historyItem.action) {
        case 'event':
          return historyItem.name;
        case 'extra':
          return historyItem.name;
        case 'sharing':
          switch (historyItem.social_action) {
            case 'like':
              return $rootScope.translate.history.items.enter_group + historyItem.social_type;
            case 'purchase':
              return $rootScope.translate.history.items.share_purchase + historyItem.social_type;
            case 'partner_page':
              return $rootScope.translate.history.items.social_share + historyItem.social_type;
            case 'badge':
              return $rootScope.translate.history.items.share_badge + historyItem.social_type;
          }
      }
      return $rootScope.translate.history.items[historyItem.action];
    }
  }])

  .filter('divide', function() {
    return function(items, divide_count, index) {
      var divide = (items || []).slice(index, index+divide_count);
      return divide;
    };
  });

angular.module('pj.services', [])
  .service('translate', ["$rootScope", function ($rootScope) {

    var self = this;

    self.lang = 'ru';

    self.setLang = function (lang) {
      self.lang = lang;
      $rootScope.translate = self[self.lang];
    };

    self.ru = {
      "badges": {
        "intro": "Поздравляем, вы получили новый бейдж!",
        "bonus_points": "бонусных баллов!",
        "this_badge": "Этот бейдж дает вам дополнительно",
        "share_this_news": "Поделитесь этой новостью:",
        "title": "Список бейджиков",
        "descr": "За каждый бейджик Вы получаете 15 дополнительных баллов!"
      },
      "profile": {
        "no_name": "Имя не указано",
        "confirmed_points": "Подтвержденные баллы",
        "history_link": "История начислений",
        "unconfirmed_points": "Неподтвержденные баллы",
        "what_is_it": "Что это?",
        "what_is_unconfirmed_points": "Что такое<br> неподтвержденные<br> бонусные баллы?",
        "purchases": "За покупки и другие действия вам начисляются бонусные баллы",
        "confirm_points": "Баллы подтверждаются после выкупа заказа и фактической оплаты",
        "points_to_gift": "Подтвержденные бонусные баллы можно обменять на подарки"
      },
      "purchase": {
        bonus_for_sharing: 'баллов за каждый рассказ о покупке',
        purchase_points: 'баллов будет подтверждено',
        hello: 'Добро<br/>пожаловать<br/>в ПапаБонус',
        promo_text: "Закажите пиццу и приглашайте друзей, чтобы зарабатывать бонусые баллы и получать подарки!",
        link_text: 'Перейти в ПапаБонус',
        papa_bonus: 'ПапаБонус'
      },
      "history": {
        "title": "История начислений",
        "no_descr": "Нет описания",
        "items": {
          "purchase": "Покупка",
          "gift_purchase": "Подарок",
          "badge": "Бейджик",
          "registration": "Регистрация",
          "referral": "Регистрация друга",
          "referred": "Регистрация по приглашению",
          "referred_purchase": "Покупка приглашенного пользователя",
          "promocode": "За ввод промокода",
          "enter_group": "Вступление в группу ",
          "share_purchase": "Рассказ о покупке в ",
          "social_share": "Рассказ в ",
          "share_badge": "Рассказ о бейджике в "
        }
      },
      "gifts": {
        "title": "Список подарков",
        "descr": "Потратьте ваши баллы на подарки",
        "auth_request": "Чтобы получить подарок, необходимо авторизоваться",
        "login": "Войти",
        "need_more_1": "Чтобы получить этот подарок, необходимо набрать еще",
        "need_more_2": "баллов",
        "get_points": "Заработать",
        "enough_points": "У Вас достаточно баллов. Вы можете получить этот подарок.",
        "to_basket": "В корзину",
        "points": "баллов"
      },
      "actions": {
        "title": "Список заданий",
        "descr": "Выполняйте задания и получайте за них дополнительные баллы",
        "no_descr": "Нет описания",
        "earn_points": 'Получить баллы',
        "share": 'Поделиться',
        "join": 'Вступить',
        "ac_connected": 'Ваш аккаунт успешно привязан. Нажмите "Поделиться", чтобы получить бонусные баллы.',
        "ac_connected_join": 'Ваш аккаунт успешно привязан. Нажмите "Вступить", чтобы получить бонусные баллы.',
        "system": {
          "emailBinding": "Указать E-mail",
          "fillProfile": "Заполнить профиль",
          "inviteFriend": "Пригласить друга"
        },
        "social": {
          "vk": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в VK"
            },
            "purchase": {
              "name": "Рассказать о покупке в VK"
            }
          },
          "fb": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в FB"
            },
            "purchase": {
              "name": "Рассказать о покупке в FB"
            }
          },
          "gp": {
            "like": {
              "name": "Лайкнуть в GP"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в GP"
            },
            "purchase": {
              "name": "Рассказать о покупке в GP"
            }
          },
          "ok": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о PapaJohns в OK"
            },
            "purchase": {
              "name": "Рассказать о покупке в OK"
            }
          },
          "tw": {
            "partner_page": {
              "name": "Рассказать о PapaJohns в TW"
            },
            "purchase": {
              "name": "Рассказать о покупке в Tw"
            }
          }
        }
      }
    };

    self.en = {
      "badges": {
        "intro": "Congratulations, you received a new badge!",
        "bonus_points": "bonus points!",
        "this_badge": "This badge gives you",
        "share_this_news": "Share that:",
        "title": "List of badges",
        "descr": "You get 15 extra points for every badge received!"
      },
      "profile": {
        "no_name": "Name is not specified",
        "confirmed_points": "Active points",
        "history_link": "Transactions history",
        "unconfirmed_points": "Inactive points",
        "what_is_it": "What is this?",
        "what_is_unconfirmed_points": "What is<br> inactive<br> bonus points?",
        "purchases": "You earn bonus points for purchases and other actions",
        "confirm_points": "Points are activated after you pay for your purchase",
        "points_to_gift": "Active bonus points can be redeemed for special gifts"
      },
      "purchase": {
        bonus_for_sharing: 'for each share',
        purchase_points: 'points earned',
        hello: 'Welcome<br/>to<br/>PapaBonus',
        promo_text: "Order pizza and invite friends to earn more bonus points and get free pizza.",
        link_text: 'Go to Papa Bonus',
        papa_bonus: 'Papa Bonus'
      },

      "history": {
        "title": "Transactions history",
        "no_descr": "No description",
        "items": {
          "purchase": "Purchase",
          "gift_purchase": "Gift",
          "badge": "Badge",
          "registration": "Sign up",
          "referral": "Invite friend",
          "referred": "Registration from friend's invite",
          "referred_purchase": "Friend's purchase",
          "promocode": "Promocode activation",
          "enter_group": "Joined our group on ",
          "share_purchase": "Shared a purchase on ",
          "social_share": "Shared our website on ",
          "share_badge": "Shared a badge on "
        }
      },
      "gifts": {
        "title": "List of gifts",
        "descr": "Redeem your points for gifts",
        "auth_request": "You need to be authorized to get our gifts",
        "login": "Sign in",
        "need_more_1": "To get this gift you need more",
        "need_more_2": "points",
        "get_points": "Earn",
        "enough_points": "You have enough bonus points to get this gift.",
        "to_basket": "Add to order",
        "points": "points"
      },
      "actions": {
        "title": "List of quests",
        "descr": "Complete quests to get extra points",
        "no_descr": "No description",
        "earn_points": 'Earn points',
        "share": 'Share',
        "join": 'Join',
        "ac_connected": 'Your account was successfully linked to your profile. Press "Share" to earn bonus points.',
        "ac_connected_join": 'Your account was successfully linked to your profile. Press "Join" to earn bonus points.',
        "system": {
          "emailBinding": "Enter email",
          "fillProfile": "Fill profile",
          "inviteFriend": "Invite friend"
        },
        "social": {
          "vk": {
            "like": {
              "name": "Join the group"
            },
            "partner_page": {
              "name": "Share our website on VK"
            },
            "purchase": {
              "name": "Share your purchase on VK"
            }
          },
          "fb": {
            "like": {
              "name": "Like Facebook group"
            },
            "partner_page": {
              "name": "Share our website on Facebook"
            },
            "purchase": {
              "name": "Share your purchase on Facebook"
            }
          },
          "gp": {
            "like": {
              "name": "Like G+ group"
            },
            "partner_page": {
              "name": "Share our website on G+"
            },
            "purchase": {
              "name": "Share your purchase on G+"
            }
          },
          "ok": {
            "like": {
              "name": "Join the group"
            },
            "partner_page": {
              "name": "Share our website on Odnoklassniki"
            },
            "purchase": {
              "name": "Share you purchase on Odnoklassniki"
            }
          },
          "tw": {
            "partner_page": {
              "name": "Share our website on twitter"
            },
            "purchase": {
              "name": "Share your purchase on twitter"
            }
          }
        }
      }
    };

  }]);
(function (SP) {

	if (typeof SP == 'undefined') {
		alert('SailPlay HUB needed to work');
		return;
	}

	var sp_app = angular.module('sailplay.pj', ['pj.filters', 'pj.services']);

	sp_app.service('config', function () {
		return SP.config() || {};
	});

	sp_app.run(["$rootScope", "translate", "config", function ($rootScope, translate, config) {

		translate.setLang(config.lang || translate.lang || 'ru');

		SAILPLAY.on('language.set.success', function (lang) {
			translate.setLang(lang);
			$rootScope.$apply();
		});

    SAILPLAY.on('login.success', function () {
      SAILPLAY.send('load.user.info');
      SAILPLAY.send('load.user.history');
    });

	}]);

	sp_app.directive('sailplayUserProfile', function () {
		var template = "";
		template += "<table class=\"user_info_wrapper myriad\" data-ng-show=\"user_obj\" data-ng-cloak>";
		template += "   <tr>";
		template += "      <td style=\"padding-left: 40px; width: 10%;\"> <img data-ng-src=\"{{ user_obj.user.pic }}\" alt=\"user_icon\" class=\"oldify user_pic\"\/>  <\/td>";
		template += "      <td style=\"border-right: 1px dotted #bdbbb5; padding-right: 30px; width: 20%;\">";
		template += "         <p class=\"rockwell\" style=\"font-size: 18px;\" data-ng-bind=\"user_obj.user.name || translate.profile.no_name\"><\/p>";
		template += "         <p data-ng-show=\"user_obj.last_badge.name\" class=\"myriad user_badge\" data-ng-bind=\"user_obj.last_badge.name\"><\/p>";
		template += "      <\/td>";
		template += "      <td style=\"padding-left: 30px; width: 10%;\">";
		template += "         <div class=\"points_circle confirmed oldify\">  <span class=\"rockwell\" data-ng-bind=\"user_obj.user_points.confirmed | short_number\"><\/span><\/div>";
		template += "      <\/td>";
		template += "      <td style=\"border-right: 1px dotted #bdbbb5; padding-right: 20px; width: 20%;\">";
		template += "         <p style=\"font-size: 14px;\" data-ng-bind=\"translate.profile.confirmed_points\"><\/p>";
		template += "         <a href=\"#\" style=\"font-size: 14px; text-decoration: underline;\" class=\"green_text\" data-ng-bind=\"translate.profile.history_link\"><\/a>";
		template += "      <\/td>";
		template += "      <td style=\"padding-left: 30px; width: 10%;\">";
		template += "         <div class=\"points_circle unconfirmed oldify\">  <span class=\"rockwell\" data-ng-bind=\"user_obj.user_points.unconfirmed | short_number\"><\/span><\/div>";
		template += "      <\/td>";
		template += "      <td style=\"padding-right: 20px; width: 20%;\">";
		template += "         <p style=\"font-size: 14px;\" data-ng-bind=\"translate.profile.unconfirmed_points\"><\/p>";
		template += "         <div style=\"position: relative;\">";
		template += "            <a class=\"green_text\" style=\"font-size: 14px; text-decoration: underline; position: relative;\" data-ng-click=\"show_points_help = !show_points_help\" data-ng-bind=\"translate.profile.what_is_it\"><\/a> ";
		template += "            <div class=\"hint help_points\" data-ng-show=\"show_points_help\">";
		template += "               <div class=\"close_btn\" data-ng-click=\"show_points_help = !show_points_help\">×<\/div>";
		template += "               <div class=\"caption\" data-ng-bind-html=\"translate.profile.what_is_unconfirmed_points | to_html\"><\/div>";
		template += "               <div class=\"steps\">";
		template += "                  <div class=\"step step1\">";
		template += "                     <div class=\"step_pic\">";
		template += "                        <div class=\"unconfirmed_points_circle diameter50\">100<\/div>";
		template += "                     <\/div>";
		template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.purchases\"><\/div>";
		template += "                     <div class=\"arrow\"><\/div>";
		template += "                  <\/div>";
		template += "                  <div class=\"step step2\">";
		template += "                     <div class=\"step_pic\">";
		template += "                        <div class=\"card_pic\"><\/div>";
		template += "                     <\/div>";
		template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.confirm_points\"><\/div>";
		template += "                     <div class=\"arrow\"><\/div>";
		template += "                  <\/div>";
		template += "                  <div class=\"step step3\">";
		template += "                     <div class=\"step_pic\">";
		template += "                        <div class=\"points_circle diameter50\">400<\/div>";
		template += "                     <\/div>";
		template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.points_to_gift\"><\/div>";
		template += "                  <\/div>";
		template += "                  <div class=\"clearfix\"><\/div>";
		template += "               <\/div>";
		template += "            <\/div>";
		template += "         <\/div>";
		template += "      <\/td>";
		template += "   <\/tr>";
		template += "<\/table>";

		return {
			restrict: 'E',
			scope: true,
			replace: true,
			template: template,
			link: function (scope) {

				scope.user_obj = false;
				scope.loaded = true;



				SAILPLAY.on('language.set.success', function () {
					SAILPLAY.send('load.user.info');
				});

				SAILPLAY.on('load.user.info.success', function (res) {
					scope.$apply(function () {
						scope.user_obj = res;
					});
				});

				SAILPLAY.on('logout', function () {
					scope.$apply(function () {
						scope.user_obj = false;
					});
				});
			}
		};

	});
	sp_app.directive('sailplayUserPizzaProfile', function () {
		var template = "";
		template += "<table class=\"user_info_wrapper myriad\" data-ng-show=\"user_obj\" data-ng-cloak>";
		template += "   <tr>";
		template += "      <td style=\"padding-left: 30px; padding-right: 30px; width: 2%;  border-right: 1px dotted #bdbbb5;\" rowspan=\"2\">";
		template += "         <sailplay-pizzameter style=\"width: 250px; height: 250px\"></sailplay-pizzameter>";
		template += "      <\/td>";
		template += "      <td style=\"padding-right: 15px; width: 10%; vertical-align: bottom; padding-bottom: 0px;\"> <img style=\"float: right;\" data-ng-src=\"{{ user_obj.user.pic }}\" alt=\"user_icon\" class=\"oldify user_pic\"\/> <\/td>";
		template += " 		 <td style=\"vertical-align: bottom;  padding-bottom: 10px; padding-left: 0px;\">";
		template += "         <p class=\"rockwell\" style=\"font-size: 18px;\" data-ng-bind=\"user_obj.user.name || translate.profile.no_name\"><\/p>";
		template += "         <p data-ng-show=\"user_obj.last_badge.name\" class=\"myriad user_badge\" data-ng-bind=\"user_obj.last_badge.name\"><\/p>";
		template += "         <a href=\"#\" style=\"font-size: 14px; text-decoration: underline;\" class=\"green_text\" data-ng-bind=\"translate.profile.history_link\"><\/a>";
		template += " 		 </td>";
		template += " 	</tr>";
		template += " 	<tr>";
		template += " 		<td style=\"padding-right: 15px; width: 25%;vertical-align: top; padding-top: 10px;text-align: right;\">";
		template += " 			<div class=\"points_circle unconfirmed oldify\">  <span class=\"rockwell\" data-ng-bind=\"user_obj.user_points.unconfirmed | short_number\"><\/span><\/div> ";
		template += " 		</td>";
		template += "      <td style=\"border-right: 1px dotted #bdbbb5; padding-right: 30px; width: 35%; vertical-align: top; padding-top: 25px;padding-left: 0px;\">";
		template += "         <p style=\"font-size: 14px;\" data-ng-bind=\"translate.profile.unconfirmed_points\"><\/p>";
    template += "         <div style=\"position: relative;\">";
    template += "            <a class=\"green_text\" style=\"font-size: 14px; text-decoration: underline; position: relative;\" data-ng-click=\"show_points_help = !show_points_help\" data-ng-bind=\"translate.profile.what_is_it\"><\/a> ";
    template += "            <div class=\"hint help_points\" data-ng-show=\"show_points_help\">";
    template += "               <div class=\"close_btn\" data-ng-click=\"show_points_help = !show_points_help\">×<\/div>";
    template += "               <div class=\"caption\" data-ng-bind-html=\"translate.profile.what_is_unconfirmed_points | to_html\"><\/div>";
    template += "               <div class=\"steps\">";
    template += "                  <div class=\"step step1\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"unconfirmed_points_circle diameter50\">100<\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.purchases\"><\/div>";
    template += "                     <div class=\"arrow\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"step step2\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"card_pic\"><\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.confirm_points\"><\/div>";
    template += "                     <div class=\"arrow\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"step step3\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"points_circle diameter50\">400<\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.points_to_gift\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"clearfix\"><\/div>";
    template += "               <\/div>";
    template += "            <\/div>";
    template += "         <\/div>";
		template += "      <\/td>";
		template += "   <\/tr>";
		template += "<\/table>";

		return {
			restrict: 'E',
			scope: true,
			replace: true,
			template: template,
			link: function (scope) {

				scope.user_obj = false;
				scope.loaded = true;

        scope.show_points_help = false;

				SAILPLAY.on('language.set.success', function () {
					SAILPLAY.send('load.user.info');
				});

				SAILPLAY.on('load.user.info.success', function (res) {
					scope.$apply(function () {
						scope.user_obj = res;
					});
				});

				SAILPLAY.on('logout', function () {
					scope.$apply(function () {
						scope.user_obj = false;
					});
				});
			}
		};

	});

	sp_app.directive('sailplayUserHistory', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template:
        '<div class="user_history_wrapper myriad" data-ng-show="user && history.length > 0" data-ng-cloak>  ' +
        '<div class="user_history_inner">' +
          '<h3 class="rockwell" data-ng-bind="translate.history.title"></h3>' +
          '<table class="myriad user_history_list">' +
          '<tr data-ng-repeat="action in history">  ' +
          '<td style="width: 20%;"> ' +
          '<span class="history_item_date" data-ng-bind="action.action_date | date:\'dd.MM.yyyy\'"></span>  ' +
          '</td>  ' +
          '<td style="width: 70%; padding-right: 20px;"> ' +
          '<span data-ng-bind="action.name || (action | humanizeUserHistoryAction ) || translate.history.no_descr"></span>  ' +
          '</td>  ' +
          '<td style="text-align: right; width: 10%;"> ' +
          '<span data-ng-if="action.points_delta >= 0" class="history_item_points rockwell green_text" data-ng-bind="\'+\' + action.points_delta"></span> ' +
          '<span data-ng-if="action.points_delta < 0" class="history_item_points rockwell red_text" data-ng-bind="action.points_delta"></span>  ' +
          '</td>' +
          '</tr></table> </div> </div>',
			link: function (scope) {

				scope.history = [];

				SAILPLAY.on('language.set.success', function () {
					SAILPLAY.send('load.user.history');
				});

				SAILPLAY.on('load.user.info.success', function (res) {
					scope.$apply(function () {
						scope.user = res.user;
					});
				});

				SAILPLAY.on('load.user.history', function () {
					scope.$apply(function () {
						scope.loaded = false;
					});
				});

				SAILPLAY.on('load.user.history.success', function (res) {
					scope.$apply(function () {
						scope.loaded = true;
						scope.history = res;
					});
				});

				SAILPLAY.on('load.user.history.error', function () {
					scope.$apply(function () {
						scope.loaded = true;
						scope.history = [];
					});
				});

				SAILPLAY.on('logout', function () {
					scope.$apply(function () {
						scope.user = false;
					});
				});

			}
		};
	});

	sp_app.directive('sailplayGifts', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template: '<div class="gifts_wrapper myriad" data-ng-show="gifts.length > 0" data-ng-cloak>  ' +
                  '<div class="gifts_inner">' +
                    '<h3 class="rockwell" data-ng-bind="translate.gifts.title"></h3>' +
                    '<p class="sub_title" data-ng-bind="translate.gifts.descr"></p>' +
                    '<ul class="gifts_list">  ' +
                      '<li class="gift" data-ng-repeat="gift in gifts" data-ng-click="selectGift(gift)"> ' +
                        '<div class="gift_tools">' +
                          '<p data-ng-if="!user_obj" class="myriad" style="margin-top: 40px;">{{ translate.gifts.auth_request }}  <br/>  ' +
                            '<button type="button" class="pj_btn rockwell" data-ng-click="loginRequest(gift)" data-ng-bind="translate.gifts.login"></button>' +
                          '</p>' +
                          '<p data-ng-if="user_obj" style="margin-top: 40px;">  ' +
                            '<p class="myriad" data-ng-if="user_obj && (user_obj.user_points.confirmed - gift.points) < 0">  ' +
                              '{{ translate.gifts.need_more_1 }} {{ (gift.points - user_obj.user_points.confirmed) | short_number }} {{ translate.gifts.need_more_2 }} <br/> ' +
                              '<button type="button" data-ng-click="earnPoints(gift)" class="pj_btn rockwell" data-ng-bind="translate.gifts.get_points"></button>  ' +
                            '</p>  ' +
                            '<p class="myriad" data-ng-if="user_obj && (user_obj.user_points.confirmed - gift.points) >= 0">  ' +
                              '{{ translate.gifts.enough_points }} <br/> ' +
                              '<button type="button" class="pj_btn rockwell" data-ng-click="createPurchase(gift)" data-ng-bind="translate.gifts.to_basket"></button>  ' +
                            '</p>' +
                          '</p> ' +
                        '</div> ' +
                        '<div class="gift_points">' +
                          '<h3 class="rockwell" data-ng-bind="gift.points | short_number"></h3>' +
                          '<p class="myriad" data-ng-bind="translate.gifts.points"></p> ' +
                        '</div> ' +
                        '<img data-ng-src="{{ gift.thumbs.url_250x250 }}" alt="{{ gift.name }}"/> ' +
                        '<p class="rockwell truncate gift_name" data-ng-bind="gift.name"></p>  ' +
                      '</li>' +
                    '</ul> ' +
                  '</div>' +
                '</div>',
			link: function (scope) {

				SAILPLAY.send('load.gifts.list');

				SAILPLAY.on('language.set.success', function () {
					SAILPLAY.send('load.gifts.list');
				});

				scope.gifts = [];
				scope.loaded = true;

				SAILPLAY.on('load.user.info.success', function (res) {
					scope.$apply(function () {
						scope.user_obj = res;
					});
				});

				SAILPLAY.on('load.gifts.list.success', function (gifts) {
					scope.$apply(function () {
						scope.gifts = gifts;
					});
				});

				SAILPLAY.on('logout', function () {
					scope.$apply(function () {
						scope.user_obj = false;
					});
				});

				SAILPLAY.on('gift.purchase.force_complete.success', function () {
					SAILPLAY.send('load.user.info');
					SAILPLAY.send('load.user.history');
				});

				scope.createPurchase = function (gift) {
					SAILPLAY.send('gifts.purchase', gift);
				};

				scope.earnPoints = function (gift) {
					SAILPLAY.send('gifts.earn_points', gift);
				};

				scope.loginRequest = function (gift) {
					SAILPLAY.send('gifts.login.request', gift);
				};

			}
		};
	});

	sp_app.directive('sailplayBadges', ["$filter", function ($filter) {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template: '<div class="badges_wrapper" data-ng-show="badges != {}" data-ng-cloak>' +
                  '<h3 class="rockwell" data-ng-bind="translate.badges.title"></h3>  ' +
                  '<p class="myriad" data-ng-bind="translate.badges.descr"></p>  ' +
                  '<div data-ng-repeat="badge_chain in badges.multilevel_badges">' +
                    '<table class="badges_list">  ' +
                      '<tr data-ng-init="divide_index = 0">' +
                        '<td style="width: 20px;">  ' +
                          '<img class="slider_arrow" src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/021caa0f7be7e572c26b84388ef000cb.png" alt="<" data-ng-click="divide_index = divide_index-1" data-ng-show="divide_index > 0"/>' +
                        '</td>' +
                        '<td data-ng-repeat="badge in badge_chain | divide:5:divide_index" class="badge">  ' +
                          '<div class="badge_card" data-ng-click="selectBadge(badge, $parent.$index);">' +
                            '<img class="badge_pic" data-ng-src="{{ badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs }}" alt="{{ badge.name }}"/>' +
                            '<p class="myriad truncate" data-ng-bind="badge.name"></p>' +
                            '<img class="badge_arrow" data-ng-src="{{getArrowUrl()}}" alt=">" data-ng-hide="$last"/>' +
                            '<div class="badge_info_arrow" data-ng-show="selectedBadges[$parent.$index] == badge"></div>  ' +
                          '</div>' +
                        '</td>' +
                        '<td style="width: 20px;">  ' +
                          '<img class="slider_arrow"  src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/789b1ed470c1422c1a85783de0140152.png" alt=">" data-ng-click="divide_index = divide_index+1" data-ng-show="(divide_index + 5) < badge_chain.length"/>' +
                        '</td>' +
                      '</tr>' +
                    '</table>' +
                    '<div class="badge_info" data-ng-show="selectedBadges[$index]">  ' +
                      '<div class="badge_descr myriad">' +
                        '<p data-ng-bind="selectedBadges[$index].descr"></p>  ' +
                      '</div>  ' +
                      '<p class="clearfix" style="margin-left: 10px;">' +
                        '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges[$index], \'fb\')" data-ng-src="{{ \'partners/pj/img/icons/share/fb.png\' | static }}" alt="FB"/>' +
                        '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges[$index], \'vk\')" data-ng-src="{{ \'partners/pj/img/icons/share/vk.png\' | static }}" alt="VK"/>  ' +
                      '</p>' +
                    '</div>  ' +
                  '</div>  ' +
                  '<div data-ng-show="badges.one_level_badges.length > 0">' +
                    '<table class="badges_list" data-ng-init="divide_index = 0;">  ' +
                      '<tr>' +
                        '<td style="width: 20px;">  ' +
                          '<img class="slider_arrow" src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/021caa0f7be7e572c26b84388ef000cb.png" alt="<" data-ng-click="divide_index = divide_index-1" data-ng-show="divide_index > 0"/>' +
                        '</td>' +
                        '<td data-ng-repeat="badge in badges.one_level_badges | divide:5:divide_index" class="badge">  ' +
                          '<div class="badge_card" data-ng-click="selectBadge(badge, \'one_level\');">' +
                            '<img class="badge_pic" data-ng-src="{{ badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs }}" alt="{{ badge.name }}"/>' +
                            '<p class="myriad truncate" data-ng-bind="badge.name"></p>' +
                            '<img class="badge_arrow" data-ng-src="{{getArrowUrl()}}" alt=">" data-ng-hide="$last"/>' +
                            '<div class="badge_info_arrow" data-ng-show="selectedBadges.one_level == badge"></div>  ' +
                          '</div>' +
                        '</td>' +
                        '<td style="width: 20px;">  ' +
                          '<img class="slider_arrow"  src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/789b1ed470c1422c1a85783de0140152.png" alt=">" data-ng-click="divide_index = divide_index+1" data-ng-show="(divide_index + 5) < badges.one_level_badges.length"/>' +
                        '</td>  ' +
                      '</tr>' +
                    '</table>' +
                    '<div class="badge_info" data-ng-show="selectedBadges.one_level">  ' +
                      '<div class="badge_descr myriad">' +
                        '<p data-ng-bind="selectedBadges.one_level.descr"></p>  ' +
                      '</div>  ' +
                      '<p class="clearfix" style="margin-left: 10px;">' +
                        '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges.one_level, \'fb\')" data-ng-src="{{ \'partners/pj/img/icons/share/fb.png\' | static }}" alt="FB"/>' +
                        '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges.one_level, \'vk\')" data-ng-src="{{ \'partners/pj/img/icons/share/vk.png\' | static }}" alt="VK"/>  ' +
                      '</p>' +
                    '</div>  ' +
                  '</div>' +
                '</div>',
			link: function (scope, elm) {
				scope.getArrowUrl = function () {
					return "https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/6212f474ff61b35c1d2100dceb3f6340.png"
				};
				scope.badges = {};

				SAILPLAY.send('load.badges.list');

				SAILPLAY.on('login.success', function (user) {
					SAILPLAY.send('load.badges.list');
				});

				SAILPLAY.on('language.set.success', function () {
					SAILPLAY.send('load.badges.list');
				});

				scope.loaded = true;

				SAILPLAY.on('load.badges.list.success', function (res) {
					scope.$apply(function () {
						scope.badges = res;
					});
				});

				SAILPLAY.on('load.badges.list.error', function (res) {
					scope.$apply(function () {
						scope.badges = {};
					});
				});

				scope.shareBadge = function (badge, network) {
					var shareData = {
						'url': window.location.href,
						'title': badge.name,
						'descr': badge.descr,
						'img': badge.thumbs.url_250x250
					};
					var url;
					if (network == 'vk') {
						url = 'http://vkontakte.ru/share.php?';
						url += 'url=' + encodeURIComponent(shareData.url);
						url += '&title=' + encodeURIComponent(shareData.title);
						url += '&description=' + encodeURIComponent(shareData.descr);
						url += '&image=' + encodeURIComponent(shareData.img);
						url += '&noparse=true';
					} else if (network == 'fb') {
						url = 'http://www.facebook.com/sharer.php?s=100';
						url += '&t=' + encodeURIComponent(shareData.title);
						url += '&u=' + encodeURIComponent(shareData.url);
					}
					window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
				};

				scope.selectedBadges = {
					one_level: false
				};

				scope.selectBadge = function (badge, index) {
					if (badge == scope.selectedBadges[index]) {
						scope.selectedBadges[index] = false;
					} else {
						scope.selectedBadges[index] = badge;
					}
				};

			}
		};
	}]);

	sp_app.directive('sailplayActions', ["$filter", "$interval", function ($filter, $interval) {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template:
        '<div class="actions_wrapper" data-ng-show="actions.length > 0" data-ng-cloak>  ' +
          '<h3 class="rockwell" style="margin:8px 0" data-ng-bind="translate.actions.title"></h3>' +
          '<p class="myriad" data-ng-bind="translate.actions.descr"></p>' +
          '<ul class="actions_list">  ' +
            '<li colspan="1" class="action" data-ng-repeat="action in actions"> ' +
              '<div class="action_card">' +
                '<img class="action_pic" data-ng-src="{{ system_actions[action.type] || action.actionPic }}" alt="{{ action.descr }}" data-ng-if="!action.socialType"/>' +
                '<div data-ng-if="action.socialType" class="social_logo {{ action.socialType }} {{ action.action }}"></div>' +
                '<div class="action_points rockwell" data-ng-if="action.points > 0" data-ng-bind="' + ' + (action.points | short_number)"></div>' +
                '<p class="myriad action_descr" data-ng-bind="translate.actions.system[action.type] || translate.actions.social[action.socialType][action.action].name || action.descr || translate.actions.no_descr"></p> ' +
                '<div class="earn_points_btn" data-ng-click="earnPoints(action)" data-sp-action="{{ action._actionId }}">' +
                  '<button class="pj_btn rockwell" data-ng-bind="translate.actions.earn_points"></button>' +
                '</div>' +
              '</div>  ' +
            '</li>' +
          '</ul> ' +
          '<div class="pj_ac_text" data-ng-show="is_sharable()" >' +
            '<div class="pj_close_btn" data-ng-click="selected_action = false;">×</div>' +
            '<p class="myriad" data-ng-if="selected_action.action == \'like\'" data-ng-bind="translate.actions.ac_connected_join"></p>' +
            '<p class="myriad" data-ng-if="selected_action.action == \'partner_page\'" data-ng-bind="translate.actions.ac_connected"></p>' +
            '<button data-ng-if="selected_action.action == \'like\'" class="pj_btn rockwell"data-ng-bind="translate.actions.join" data-ng-click="earnPoints(selected_action)"></button>' +
            '<button data-ng-if="selected_action.action == \'partner_page\'" class="pj_btn rockwell"data-ng-bind="translate.actions.share" data-ng-click="earnPoints(selected_action)"></button>' +
          '</div>' +
        '</div>',
			link: function (scope) {

				scope.actions = [];

        scope.selected_action = false;

        scope.is_sharable = function(){
          return scope.selected_action && scope.selected_action.account_connected;
        };

				SAILPLAY.send('load.actions.list');

				SAILPLAY.on('login.success', function () {
          var interval = $interval(function(){
            if(scope.actions.length > 0) {
              SAILPLAY.send('load.actions.list');
              $interval.cancel(interval);
            }

          }, 100);
				});

				SAILPLAY.on('language.set.success', function () {
					SAILPLAY.send('load.actions.list');
				});

				SAILPLAY.on('load.actions.list.success', function (data) {
					scope.actions = data.actions;
					scope.$apply();
				});

				SAILPLAY.on('load.actions.list.error', function () {
					scope.actions = [];
          scope.selected_action = false;
					scope.$apply();
				});

				scope.earnPoints = function (action) {
          scope.selected_action = angular.copy(action);
					SAILPLAY.send('actions.perform', action);
				};

        SAILPLAY.on('actions.social.connect.complete', function () {
          if(scope.selected_action) scope.selected_action.account_connected = true;
          SAILPLAY.send('load.actions.list');
        });

				SAILPLAY.on('actions.perform.complete', function () {
          scope.selected_action = false;
					SAILPLAY.send('load.actions.list');
				});

				scope.system_actions = {
					emailBinding: $filter('static')('partners/pj/img/icons/actions/email_binding.png'),
					fillProfile: $filter('static')('partners/pj/img/icons/actions/fill_profile.png'),
					inviteFriend: $filter('static')('partners/pj/img/icons/actions/invite_friend.png')
				};

			}
		}
	}]);

	sp_app.directive('sailplayBadgePopup', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template: '<div class="receive_badge_popup myriad" data-sailplay-badge-popup data-ng-cloak>' +
				'<div class="window_closer" data-ng-click="closeBadgePopup()">&#215;</div>' +
				'<table>' +
				'<tr>' +
				'<td style="width: 130px;text-align: center;">' +
				'<img class="badge_pic" data-ng-src="{{ badge.pic || badge.thumbs.url_250x250 }}" alt="{{ badge.name }}"/>' +
				'<p style="text-align: center; margin: 8px 0;">{{ badge.name }}</p>' +
				'</td>' +
				'<td>' +
				'<h3 class="rockwell" data-ng-bind="translate.badges.intro"></h3>' +
				'<p style="margin-top: 10px;">{{ translate.badges.this_badge }} <br/> <strong class="red_text" style="font-weight: 600;" data-ng-bind="badge.points + \' \' + translate.badges.bonus_points"></strong></p>' +
				'<p style="margin-top: 20px;">' +
				'<span style="vertical-align: middle; margin-right: 8px;" data-ng-bind="translate.badges.share_this_news"></span>' +
				'<img style="vertical-align: middle;" width="40px" class="share_badge_btn" data-ng-click="shareBadge(badge, \'fb\')" data-ng-src="{{ \'partners/pj/img/icons/share/fb.png\' | static }}" alt="FB"/>' +
				'<img style="vertical-align: middle;" width="40px" class="share_badge_btn" data-ng-click="shareBadge(badge, \'vk\')" data-ng-src="{{ \'partners/pj/img/icons/share/vk.png\' | static }}" alt="VK"/>' +
				'</p>' +
				'</td>' +
				'</tr>' +
				'</table>' +
				'</div>',
			link: function (scope, elm) {

				scope.badge = {};

				SAILPLAY.on('badge.receive.show', function (badge) {
					scope.badge = angular.copy(badge);
					elm[0].style.display = 'block';
					scope.$apply();
				});

				SAILPLAY.on('badge.receive.hide', function () {
					elm[0].style.display = 'none';
				});

				scope.closeBadgePopup = function () {
					SAILPLAY.send('badge.receive.hide');
				};

				scope.shareBadge = function (badge, network) {
					var shareData = {
						'url': window.location.href,
						'title': badge.name,
						'descr': badge.descr,
						'img': badge.pic
					};
					var url;
					if (network == 'vk') {
						url = 'http://vkontakte.ru/share.php?';
						url += 'url=' + encodeURIComponent(shareData.url);
						url += '&title=' + encodeURIComponent(shareData.title);
						url += '&description=' + encodeURIComponent(shareData.descr);
						url += '&image=' + encodeURIComponent(shareData.img);
						url += '&noparse=true';
					} else if (network == 'fb') {
						url = 'http://www.facebook.com/sharer.php?s=100';
						url += '&t=' + encodeURIComponent(shareData.title);
						url += '&u=' + encodeURIComponent(shareData.url);
					}
					window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
				};

			}
		};
	});

	sp_app.directive('sailplayPizzameter', ["translate", "$filter", function (translate, $filter) {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template: '<div data-ng-cloak class="pizzameter_wrapper" data-ng-style="{ backgroundImage: wrapperBG() }">  ' +
				'<div class="pizza_pieces" data-ng-style="{ backgroundImage: pizzaBG() }"></div>' +
				'<div class="pizzameter_counter" data-ng-style="{ backgroundImage: counterBG() }">  ' +
				'<div class="counter_inner"> ' +
				'<img data-ng-repeat="digit in visible_points track by $index" data-ng-src="{{ getPointsDigitUrl(digit) }}" alt="{{ digit }}"/>  ' +
				'</div>' +
				'</div> ' +
				'</div>',
			link: function (scope) {

				scope.target_points = 0;
				scope.user_points = 0;
				scope.visible_points = '0000'.split('');

				SAILPLAY.on('load.user.info.success', function (res) {
					scope.$apply(function () {
						scope.user_points = res.user_points.confirmed;
						var points_arr = res.user_points.confirmed.toString().split('');
						while (points_arr.length < 4) {
							points_arr.unshift('0');
						}
						scope.visible_points = points_arr;
					});
				});

				SAILPLAY.on('pj.pizzameter', function (target_points) {
					scope.$apply(function () {
						scope.target_points = target_points;
					});
				});

				SAILPLAY.on('purchase.widget.show', function (obj) {
					scope.$apply(function () {
						scope.user_points = obj.user_points || scope.user_points;
            var points_arr = scope.user_points.toString().split('');
            while (points_arr.length < 4) {
              points_arr.unshift('0');
            }
            scope.visible_points = points_arr;

          });
				});

				scope.wrapperBG = function () {
					return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/deck_' + translate.lang + '.png)';
				};

				scope.counterBG = function () {
					return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/counter_' + translate.lang + '.png)';
				};

				scope.pizzaBG = function () {
					var piece_num = 8;
					var delta = scope.user_points / scope.target_points;
					if (delta < 1) {
						delta = Math.round(delta * 10);
						piece_num = delta > 8 ? piece_num : delta;
					}
					return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/' + (piece_num || 1) + '_piece.png)';
				};

				scope.getPointsDigitUrl = function (digit) {
					return $filter('static')('') + 'partners/pj/img/pizzameter/digits/' + digit + '.png';
				};

			}
		};
	}]);

	sp_app.directive('sailplayPurchaseWidget', ["translate", function (translate) {
		var template = "";
		template += "<div style=\"padding: 20px;\" ng-click=\"goToPapaBonus()\" ng-if=\"redirect_url\">";
		template += "              <table width=\"240px\">";
    template += "                <tr>";
    template += "                  <td colspan=\"1\" style='vertical-align: middle; text-align: center;'>";
    template += "                    <p class='rockwell' style=\"text-align: center; font-size: 18px; font-weight: bold; padding: 10px; white-space: nowrap; overflow: hidden;\" data-ng-bind-html=\"translate.purchase.papa_bonus | to_html\"><\/p>";
    template += "                  <\/td>";
    template += "                <\/tr>";
		template += "                <tr>";
		template += "                  <td colspan=\"1\" style=\"text-align:center;vertical-align: middle;\">";
		template += "                    <sailplay-pizzameter style=\"width:180px; height: 180px; margin:12px 0 26px 0;\"><\/sailplay-pizzameter>";
		template += "                  <\/td>";
		template += "                <\/tr>";
		template += "              <\/table>";
		template += "              <table width=\"240px\">";
		template += "                <tr>";
		template += "                  <td style='vertical-align: middle;'>";
		template += "                    <p style=\"text-align:justify\" ng-bind=\"translate.purchase.promo_text\"><\/p>";
		template += "                  <\/td>";
		template += "                <\/tr>";
		template += "              <\/table>";
		template += "              <table width=\"240px\" style=\"margin: 20px 0px\">";
		template += "                <tr>";
		template += "                  <td width=\"33%\" style='vertical-align: middle;'>";
		template += "                    <div class=\"points_circle confirmed oldify\" style=\"float:left\">";
		template += "                      <span class=\"rockwell\" data-ng-bind=\"purchase_points\"><\/span>";
		template += "                    <\/div>";
		template += "                  <\/td>";
		template += "                  <td style='vertical-align: middle;' >";
		template += "                    <p style=\"font-weight: bold;\" data-ng-bind=\"translate.purchase.purchase_points\"><\/p>";
		template += "                  <\/td>";
		template += "";
		template += "                <\/tr>";
		template += "              <\/table>";
		template += "              <table width=\"240px\" style=\"margin: 10px 0px;  border-top: 1px solid black; border-bottom: 1px solid black\">";
		template += "                <tr>";
		template += "                  <td width = \"10%\"  style=\"padding-right:5px; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
		template += "                    <img src=\"https:\/\/d3257v5wstjx8h.cloudfront.net\/media\/assets\/assetfile\/547050456db67d33008ffeb4002ff7ea.png\" width=\"27\" height=\"27\">";
		template += "                  <\/td>";
		template += "                  <td width = \"10%\" style=\"padding-right:5px; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
		template += "                    <img src=\"https:\/\/d3257v5wstjx8h.cloudfront.net\/media\/assets\/assetfile\/97dd4019dcffa12481ead1af7f836a16.png\" width=\"27\" height=\"27\">";
		template += "                  <\/td>";
		template += "                  <td width = \"10%\" style=\"padding-right:5px; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
		template += "                    <img src=\"https:\/\/d3257v5wstjx8h.cloudfront.net\/media\/assets\/assetfile\/6736393657591fb0d856c6fa4ca9d414.png\" width=\"27\" height=\"27\">";
		template += "                  <\/td>";
		template += "                  <td width = \"70%\" style=\"text-align: center; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
		template += "                    <p style=\"text-align: center\" >+{{bonus_per_invite || 0}} {{translate.purchase.bonus_for_sharing}}<\/p>";
		template += "                  <\/td>";
		template += "                <\/tr>";
		template += "              <\/table>";
		template += "              <table width=\"240px\">";
		template += "                <tr>";
		template += "                  <td style=\"text-align: center\">";
		template += "                    <a href=\"javascript:void(0)\" class=\"pj_btn rockwell ng-binding\" data-ng-click=\"loginRequest(gift)\" data-ng-bind=\"translate.purchase.link_text\" style=\"color: white; border:0; display: block; margin-top: 12px;\"><\/a>";
		template += "                  <\/td>";
		template += "                <\/tr>";
		template += "              <\/table>";
		template += "            <\/div>";
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			template: template,
			link: function (scope) {

				scope.goToPapaBonus = function () {
					location.href = scope.redirect_url || '/papaBonus';
				};

				SAILPLAY.on('load.user.info.success', function (res) {
					scope.$apply(function () {
						scope.user_points = res.user_points.confirmed;
					});
				});

				SAILPLAY.on('purchase.widget.show', function (obj) {
					scope.$apply(function () {
						scope.purchase_points = obj.purchase_points || scope.purchase_points;
						scope.user_points = obj.user_points || scope.user_points;
						scope.bonus_per_invite = obj.bonus_per_invite || scope.bonus_per_invite;
						scope.redirect_url = obj.redirect_url || scope.redirect_url;
					});
				})
			}
		};
	}]);

	SP.on('pj.bootstrap', function (elm) {
		angular.bootstrap(elm, ['sailplay.pj']);
	});

}(SAILPLAY));