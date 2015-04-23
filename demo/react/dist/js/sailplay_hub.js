(function(){var a=false,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.PortholeClass=function(){};PortholeClass.extend=function(g){var f=this.prototype;a=true;var e=new this();a=false;for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var k=this._super;this._super=f[h];var j=i.apply(this,arguments);this._super=k;return j}})(d,g[d]):g[d]}function c(){if(!a&&this.init){this.init.apply(this,arguments)}}c.prototype=e;c.prototype.constructor=c;c.extend=arguments.callee;return c}})();(function(c){var b={debug:false,trace:function(d){if(this.debug&&c.console!==undefined){c.console.log("Porthole: "+d)}},error:function(d){if(c.console!==undefined){c.console.error("Porthole: "+d)}}};b.WindowProxy=function(){};b.WindowProxy.prototype={post:function(e,d){},addEventListener:function(d){},removeEventListener:function(d){}};b.WindowProxyBase=PortholeClass.extend({init:function(d){if(d===undefined){d=""}this.targetWindowName=d;this.origin=c.location.protocol+"//"+c.location.host;this.eventListeners=[]},getTargetWindowName:function(){return this.targetWindowName},getOrigin:function(){return this.origin},getTargetWindow:function(){return b.WindowProxy.getTargetWindow(this.targetWindowName)},post:function(e,d){if(d===undefined){d="*"}this.dispatchMessage({data:e,sourceOrigin:this.getOrigin(),targetOrigin:d,sourceWindowName:c.name,targetWindowName:this.getTargetWindowName()})},addEventListener:function(d){this.eventListeners.push(d);return d},removeEventListener:function(g){var d;try{d=this.eventListeners.indexOf(g);this.eventListeners.splice(d,1)}catch(h){this.eventListeners=[]}},dispatchEvent:function(f){var d;for(d=0;d<this.eventListeners.length;d++){try{this.eventListeners[d](f)}catch(g){}}}});b.WindowProxyLegacy=b.WindowProxyBase.extend({init:function(d,e){this._super(e);if(d!==null){this.proxyIFrameName=this.targetWindowName+"ProxyIFrame";this.proxyIFrameLocation=d;this.proxyIFrameElement=this.createIFrameProxy()}else{this.proxyIFrameElement=null;b.trace("proxyIFrameUrl is null, window will be a receiver only");this.post=function(){throw new Error("Receiver only window")}}},createIFrameProxy:function(){var d=document.createElement("iframe");d.setAttribute("id",this.proxyIFrameName);d.setAttribute("name",this.proxyIFrameName);d.setAttribute("src",this.proxyIFrameLocation);d.setAttribute("frameBorder","1");d.setAttribute("scrolling","auto");d.setAttribute("width",30);d.setAttribute("height",30);d.setAttribute("style","position: absolute; left: -100px; top:0px;");if(d.style.setAttribute){d.style.setAttribute("cssText","position: absolute; left: -100px; top:0px;")}document.body.appendChild(d);return d},dispatchMessage:function(e){var d=c.encodeURIComponent;if(this.proxyIFrameElement){var f=this.proxyIFrameLocation+"#"+d(b.WindowProxy.serialize(e));this.proxyIFrameElement.setAttribute("src",f);this.proxyIFrameElement.height=this.proxyIFrameElement.height>50?50:100}}});b.WindowProxyHTML5=b.WindowProxyBase.extend({init:function(d,e){this._super(e);this.eventListenerCallback=null},dispatchMessage:function(d){this.getTargetWindow().postMessage(b.WindowProxy.serialize(d),d.targetOrigin)},addEventListener:function(e){if(this.eventListeners.length===0){var d=this;if(c.addEventListener){this.eventListenerCallback=function(f){d.eventListener(d,f)};c.addEventListener("message",this.eventListenerCallback,false)}else{if(c.attachEvent){this.eventListenerCallback=function(f){d.eventListener(d,c.event)};c.attachEvent("onmessage",this.eventListenerCallback)}}}return this._super(e)},removeEventListener:function(d){this._super(d);if(this.eventListeners.length===0){if(c.removeEventListener){c.removeEventListener("message",this.eventListenerCallback)}else{if(c.detachEvent){if(typeof c.onmessage==="undefined"){c.onmessage=null}c.detachEvent("onmessage",this.eventListenerCallback)}}this.eventListenerCallback=null}},eventListener:function(e,d){var f=b.WindowProxy.unserialize(d.data);if(f&&(e.targetWindowName===""||f.sourceWindowName==e.targetWindowName)){e.dispatchEvent(new b.MessageEvent(f.data,d.origin,e))}}});if(!c.postMessage){b.trace("Using legacy browser support");b.WindowProxy=b.WindowProxyLegacy.extend({})}else{b.trace("Using built-in browser support");b.WindowProxy=b.WindowProxyHTML5.extend({})}b.WindowProxy.serialize=function(d){if(typeof JSON==="undefined"){throw new Error("Porthole serialization depends on JSON!")}return JSON.stringify(d)};b.WindowProxy.unserialize=function(g){if(typeof JSON==="undefined"){throw new Error("Porthole unserialization dependens on JSON!")}try{var d=JSON.parse(g)}catch(f){return false}return d};b.WindowProxy.getTargetWindow=function(d){if(d===""){return parent}else{if(d==="top"||d==="parent"){return c[d]}}return c.frames[d]};b.MessageEvent=function a(f,d,e){this.data=f;this.origin=d;this.source=e};b.WindowProxyDispatcher={forwardMessageEvent:function(i){var g,h=c.decodeURIComponent,f,d;if(document.location.hash.length>0){g=b.WindowProxy.unserialize(h(document.location.hash.substr(1)));f=b.WindowProxy.getTargetWindow(g.targetWindowName);d=b.WindowProxyDispatcher.findWindowProxyObjectInWindow(f,g.sourceWindowName);if(d){if(d.origin===g.targetOrigin||g.targetOrigin==="*"){d.dispatchEvent(new b.MessageEvent(g.data,g.sourceOrigin,d))}else{b.error("Target origin "+d.origin+" does not match desired target of "+g.targetOrigin)}}else{b.error("Could not find window proxy object on the target window")}}},findWindowProxyObjectInWindow:function(d,g){var f;if(d){for(f in d){if(Object.prototype.hasOwnProperty.call(d,f)){try{if(d[f]!==null&&typeof d[f]==="object"&&d[f] instanceof d.Porthole.WindowProxy&&d[f].getTargetWindowName()===g){return d[f]}}catch(h){}}}}return null},start:function(){if(c.addEventListener){c.addEventListener("resize",b.WindowProxyDispatcher.forwardMessageEvent,false)}else{if(c.attachEvent&&c.postMessage!=="undefined"){c.attachEvent("onresize",b.WindowProxyDispatcher.forwardMessageEvent)}else{if(document.body.attachEvent){c.attachEvent("onresize",b.WindowProxyDispatcher.forwardMessageEvent)}else{b.error("Cannot attach resize event")}}}}};if(typeof c.exports!=="undefined"){c.exports.Porthole=b}else{c.Porthole=b}})(this);
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

      data = data || {};

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
      }, 10000);

      window.JSONP_CALLBACK[callback_name] = function (data) {
        clearTimeout(jsonpTimeout);
        head.removeChild(newScript);
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
        head.removeChild(newScript);
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
    JSONP.get((params.domain || 'http://sailplay.ru') + '/js-api/' + params.partner_id + '/config/', { lang: params.lang || 'ru' }, function (response) {
      if (response && response.status == 'ok') {
        _config = response.config;
        _config.DOMAIN = (params.domain || 'http://sailplay.ru');
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
      if (action.socialType) {
        if (!_actions_config.connectedAccounts[action.socialType]) {
          Actions.openSocialRegNeedPopup(action);
        } else {
          Actions.share(action);
        }
      }
      else {
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

  //REVIEWS SECTION
  sp.on('reviews.list.load', function (data) {
    if(_config == {}){
      initError();
      return;
    }

    var req_data = {};

    if(data){
      req_data.page = data.page || ''
    }

    JSONP.get(_config.DOMAIN + _config.urls.reviews.list, req_data, function (res) {
      if (res.status == 'ok') {
        sp.send('reviews.list.load.success', { page: res.page, pages: res.pages, reviews: res.reviews });
      } else {
        sp.send('reviews.list.load.error', res);
      }
    });
  });

  sp.on('reviews.add', function (data) {
    if(_config == {}){
      initError();
      return;
    }
    var req_data = {
      auth_hash: _config.auth_hash,
      rating: data.rating || '',
      review: data.review || ''
    };
    JSONP.get(_config.DOMAIN + _config.urls.reviews.add, req_data, function (res) {
      if (res.status == 'ok') {
        sp.send('reviews.add.success', res);
      } else {
        sp.send('reviews.add.error', res);
      }
    });
  });

  return sp;
}());