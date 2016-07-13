var SAILPLAY = (function () {

  //methods that not supported in old browsers
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
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
    createCookie: function (name, value, days) {
      var expires;
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      else expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    readCookie: function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    eraseCookie: function (name) {
      cookies.createCookie(name, "", -1);
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
      if (!_config.auth_hash) {
        delete data.auth_hash;
      }

      window.JSONP_CALLBACK = window.JSONP_CALLBACK || {};

      var callback_name = 'sailplay_' + new Date().getTime() + Math.random().toString().replace('.', '');

      var jsonpTimeout = setTimeout(function () {
        try {
          head.removeChild(newScript);
        }
        catch (err) {
        }
        delete window.JSONP_CALLBACK[callback_name];
      }, 10000);

      window.JSONP_CALLBACK[callback_name] = function (data) {
        clearTimeout(jsonpTimeout);
        try {
          head.removeChild(newScript);
        }
        catch (err) {
        }
        delete window.JSONP_CALLBACK[callback_name];
        success && success(data);
      };

      data["callback"] = 'JSONP_CALLBACK.' + callback_name;
      if (_config.dep_id) data.dep_id = _config.dep_id;

      for (var param_name in data) {
        params.push(param_name + "=" + encodeURIComponent(data[param_name]));
      }
      src += params.join("&");

      newScript.type = "text/javascript";
      newScript.src = src;
      newScript.onerror = function (ex) {
        try {
          head.removeChild(newScript);
        }
        catch (err) {
        }
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

  sp.send = function (event, data, callback) {
    if (_handlers[event]) {
      for (var i = 0; i < _handlers[event].length; i++) {
        _handlers[event][i](data, callback);
      }
    }
  };

  //private config
  var _config = {};
  var _remote_login_init = false;

  function initError() {
    alert('Please init SailPlay HUB first!');
  }

  function remoteLogin(opts) {

    var frame;

    opts = opts || {};

    if (opts.node && opts.node.nodeType == 1 && opts.node.tagName == 'IFRAME') {
      frame = opts.node;
    }
    else {
      frame = document.createElement('IFRAME');
      frame.style.border = 'none';
      frame.style.position = 'fixed';
      frame.style.top = '0';
      frame.style.left = '0';
      frame.style.bottom = '0';
      frame.style.right = '0';
      frame.style.width = '410px';
      frame.style.height = '510px';
      frame.created = true;
      frame.style.background = 'transparent';
      frame.style.margin = 'auto';
      frame.style.zIndex = '100000';
      document.body.appendChild(frame);
    }

    var frame_id = frame.id || 'sailplay_login_frame_' + new Date().getTime();

    frame.name = frame_id;
    frame.id = frame_id;

    function onMessage(messageEvent) {

      var data = {};

      if (messageEvent.origin == _config.DOMAIN) {
        try {
          data = JSON.parse(messageEvent.data);
        }
        catch (e) {

        }
      }
      if (data.name == 'login.success') {
        sp.send('login.do', data.auth_hash);
        return;
      }
      if (data.name == 'login.cancel') {
        sp.send('login.cancel');
        cancelLogin();
        return;
      }
      if (data.name == 'login.check') {
        if (data.auth_hash == 'None') {
          sp.send('logout');
        }
        else {
          cancelLogin();
          sp.send('login.do', data.auth_hash)
        }
        return;
      }
      if (data.name == 'logout.success') {
        _config.auth_hash = '';
        sp.send('logout.success');
      }

    }

    function cancelLogin() {
      if (frame.created) {
        try {
          document.body.removeChild(frame)
        }
        catch (e) {

        }
      }
    }

    var params = {};
    params.partner_id = _config.partner.id;
    params.dep_id = _config.dep_id || '';
    params.background = opts.background || '';
    params.partner_info = opts.partner_info || 0;
    if (opts.lang) {
      params.lang = opts.lang;
    }
    params.disabled_options = opts.disabled_options || '';
    params.texts = JSON.stringify(opts.texts || '');


    var params_string = [];

    var src = _config.DOMAIN + '/users/auth-page/?';
    for (var param_name in params) {
      params_string.push(param_name + "=" + encodeURIComponent(params[param_name]));
    }
    src += params_string.join("&");

    frame.setAttribute('src', src);

    if (!_remote_login_init) {
      window.addEventListener("message", onMessage, false);
      _remote_login_init = true;
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
    JSONP.get((params.domain || 'http://sailplay.ru') + '/js-api/' + params.partner_id + '/config/', {
      lang: params.lang || 'ru',
      dep_id: (params.dep_id || '')
    }, function (response) {
      if (response && response.status == 'ok') {

        _config = response.config;
        _config.DOMAIN = (params.domain || 'http://sailplay.ru');
        _config.dep_id = params.dep_id || '';
        _config.env.staticUrl = params.static_url || _config.env.staticUrl;
        _config.social_networks = ['fb', 'vk', 'tw', 'gp', 'ok'];
        _config.platform = params.platform || 'desktop';

        //postmessage events init
        //1. bind action events
        function onActionMessage(messageEvent) {
          var data = {};
          if (messageEvent.origin == _config.DOMAIN) {
            try {
              data = JSON.parse(messageEvent.data);
            }
            catch (e) {

            }

            switch (data && data.name) {
              case 'actions.perform.success':
                sp.send('actions.perform.success', data);
                break;
              case 'actions.perform.error':
                sp.send('actions.perform.error', data);
                break;
              case 'actions.social.connect.complete':
                sp.send('actions.social.connect.complete', data);
                break;
              case 'actions.social.connect.success':
                sp.send('actions.social.connect.success', data);
                break;
              case 'actions.social.connect.error':
                sp.send('actions.social.connect.error', data);
                break;
              case 'friend_invite_cookie':
                break;
              case 'actions.social.gp.like.mouseenter':
                sp.send('actions.social.gp.like.mouseenter');
                break;
              case 'actions.social.gp.like.mouseleave':
                sp.send('actions.social.gp.like.mouseleave');
                break;
            }

          }
        }

        window.addEventListener("message", onActionMessage, false);

        //2. recieve ref_hash info
        _config.ref_hash = sp.url_params().ref_hash || '';
        //var cookie_frame = document.createElement('IFRAME');
        //cookie_frame.style.width = 0;
        //cookie_frame.style.height = 0;
        //cookie_frame.style.top = '-10000px';
        //cookie_frame.style.left = '-10000px';
        //cookie_frame.src = _config.DOMAIN + '/js-api/' + _config.partner.id + '/actions/social-widget/v2/';
        //document.body.appendChild(cookie_frame);
        //cookie_frame.onload = function(){
        //  document.body.removeChild(cookie_frame);
        //};

        sp.send('init.success', _config);
        //        console.dir(_config);
      } else {
        sp.send('init.error', response);
        alert('SailPlay: app load failed!');
      }
    });

  });

  sp.on('login.remote', function (options) {
    remoteLogin(options);
  });

  //////////////////
  //bind hub events
  sp.on('language.set', function (lang) {
    if (_config == {}) {
      initError();
      return;
    }
    if (typeof lang == 'string') {
      JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/config/', {lang: lang}, function (response) {
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

  //////////////////
  //bind api events

  //LOGIN & LOGOUT
  sp.on('login.do', function (auth_hash) {
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

    if (_config == {}) {
      initError();
      return;
    }

    sp.send('login.do', auth_hash);

  });

  sp.on('logout', function () {
    if (_config == {}) {
      initError();
      return;
    }
    var req = document.createElement('iframe');
    req.width = 0;
    req.height = 0;
    req.style.border = 'none';
    req.src = _config.DOMAIN + '/users/logout';
    document.body.appendChild(req);
    req.onload = function () {
      document.body.removeChild(req);
      _config.auth_hash = '';
      cookies.eraseCookie('sp_auth_hash');
      sp.send('logout.success');
    };


  });

  //USER INFO
  sp.on('load.user.info', function (p) {
    if (_config == {}) {
      initError();
      return;
    }
    var params = {
      user_status: 1,
      badges: 1,
      last_badge: 1
    };
    if (p && p.purchases) {
      params.purchases = p.purchases;
    }
    if (p && p.all) {
      params.all = p.all;
    }
    if (p && p.user) {
      for (var param in p.user) {
        params[param] = p.user[param];
      }
    }
    else {
      params.auth_hash = _config.auth_hash;
    }
    JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
      if (res.status == 'ok') {
        sp.send('load.user.info.success', res);
      } else {
        sp.send('load.user.info.error', res);
      }
    });
  });

  sp.on('users.update', function (params, callback) {

    if (_config == {}) {
      initError();
      return;
    }

    params = params || {};

    if (_config.auth_hash) {
      params.auth_hash = _config.auth_hash;
    }

    JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/users/update/', params, function (res) {

      callback && callback(res);

      if (res.status === 'ok') {
        sp.send('users.update.success', res);
      }
      else {
        sp.send('users.update.error', res);
      }
    });

  });

  //USER HISTORY
  sp.on('load.user.history', function (params) {
    if (_config == {}) {
      initError();
      return;
    }

    params = params || {};

    if (_config.auth_hash) {
      params.auth_hash = _config.auth_hash;
    }

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
    if (_config == {}) {
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
  sp.on('load.gifts.list', function (params) {

    if (_config == {}) {
      initError();
      return;
    }

    params = params || {};

    if (_config.auth_hash) {
      params.auth_hash = _config.auth_hash;
    }

    JSONP.get(_config.DOMAIN + _config.urls.gifts.list, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.gifts.list.success', res.gifts);
      } else {
        sp.send('load.gifts.list.error', res);
      }
    });
  });

  //GIFT CATEGORIES
  sp.on('load.gifts.categories', function (params) {

    if (_config == {}) {
      initError();
      return;
    }

    params = params || {};

    JSONP.get(_config.DOMAIN + _config.urls.gifts.categories_list, params, function (res) {
      if (res.status == 'ok') {
        sp.send('load.gifts.categories.success', res.categories);
      } else {
        sp.send('load.gifts.categories.error', res);
      }
    });

  });

  //GET GIFT
  function forceCompleteGiftPurchase(giftPurchase, opts) {
    var params = {
      gift_public_key: giftPurchase.gift_public_key,
      auth_hash: _config.auth_hash
    };
    if (opts && opts.no_user_sms) {
      params.no_user_sms = opts.no_user_sms;
    }
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
  sp.on('gifts.purchase', function (p) {
    if (_config == {}) {
      initError();
      return;
    }
    var gift = p.gift || {};
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
              forceCompleteGiftPurchase(requestedPurchase, p.options);
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
                forceCompleteGiftPurchase(requestedPurchase, p.options);
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
    if (_config == {}) {
      initError();
      return;
    }
    var params = {
      auth_hash: _config.auth_hash
    };
    JSONP.get(_config.DOMAIN + _config.urls.badges.list, params, function (res) {

      //      console.dir(res);
      if (res.status == 'ok') {

        function create_badge_actions(badge) {
          if (badge && badge.is_received) {

            badge.actions = {};

            for (var sn in _config.social_networks) {

              badge.actions[_config.social_networks[sn]] = {

                socialType: _config.social_networks[sn],
                action: 'badge',
                shortLink: window.location.href,
                pic: badge.thumbs.url_250x250,
                badgeId: badge.id,
                msg: badge.share_msg

              };

            }
          }
        }

        for (var ch in res.multilevel_badges) {

          var multi_line = res.multilevel_badges[ch];

          for (var b in multi_line) {

            create_badge_actions(multi_line[b]);

          }

        }

        for (var olb in res.one_level_badges) {

          create_badge_actions(res.one_level_badges[olb]);

        }

        sp.send('load.badges.list.success', res);
      } else {
        sp.send('load.badges.list.error', res);
      }
    });
  });

  //PROMO-CODES SECTION
  sp.on('promocodes.apply', function (promocode) {
    if (_config == {}) {
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

  // user update
  sp.on("user.update", function (params) {
    if (_config == {}) {
      initError();
      return;
    }
    JSONP.get(_config.DOMAIN + "/js-api/" + _config.partner.id + "/users/update/", params, function (res) {
      if (res.status == 'ok') {
        sp.send('user.update.success', res);
      } else {
        sp.send('user.update.error', res);
      }
    })
  });

  //TAGS SECTIONS
  sp.on('tags.add', function (data, callback) {
    if (_config == {}) {
      initError();
      return;
    }
    if (_config.auth_hash || data.user) {
      var tagsObj = {
        tags: data.tags && data.tags.join(',') || []
      };
      if (data.user) {
        for (var p in data.user) {
          tagsObj[p] = data.user[p];
        }
      }
      else {
        tagsObj.auth_hash = _config.auth_hash;
      }
      JSONP.get(_config.DOMAIN + _config.urls.tags.add, tagsObj, function (res) {
        callback && callback(res);
        if (res.status == 'ok') {
          sp.send('tags.add.success', res);
        } else {
          sp.send('tags.add.error', res);
        }
      });
    } else {
      SAILPLAY.send('tags.add.auth.error', tags);
    }
  });

  sp.on('tags.delete', function (data) {
    if (_config == {}) {
      initError();
      return;
    }
    if (_config.auth_hash || data.user) {
      var tagsObj = {
        tags: data.tags && data.tags.join(',') || []
      };
      if (data.user) {
        for (var p in data.user) {
          tagsObj[p] = data.user[p];
        }
      }
      else {
        tagsObj.auth_hash = _config.auth_hash;
      }
      JSONP.get(_config.DOMAIN + _config.urls.tags.delete, tagsObj, function (res) {
        if (res.status == 'ok') {
          sp.send('tags.delete.success', res);
        } else {
          sp.send('tags.delete.error', res);
        }
      });
    } else {
      SAILPLAY.send('tags.delete.auth.error', data);
    }
  });

  // tag exist
  sp.on("tags.exist", function (data) {
    if (_config == {}) {
      initError();
      return;
    }
    if (_config.auth_hash || data.user) {
      var obj = {
        tags: JSON.stringify(data.tags)
      };
      if (data.user) {
        for (var p in data.user) {
          obj[p] = data.user[p];
        }
      }
      else {
        obj.auth_hash = _config.auth_hash;
      }
      obj.lang = data.lang || _config.lang || 'ru';
      JSONP.get(_config.DOMAIN + _config.urls.tags.exist, obj, function (res) {
        if (res.status == 'ok') {
          sp.send('tags.exist.success', res);
        } else {
          sp.send('tags.exist.error', res);
        }
      });
    } else {
      sp.send('tags.exist.auth.error', tags);
    }

  });

  //ADD CUSTOM VARIABLES
  sp.on('vars.add', function (data, callback) {
    if (_config == {}) {
      initError();
      return;
    }
    if (_config.auth_hash || data.user) {
      var obj = data.custom_vars;
      if (data.user) {
        for (var p in data.user) {
          obj[p] = data.user[p];
        }
      }
      else {
        obj.auth_hash = _config.auth_hash;
      }
      JSONP.get(_config.DOMAIN + '/js-api/' + _config.partner.id + '/users/custom-variables/add/', obj, function (res) {
        if (res.status == 'ok') {
          sp.send('vars.add.success', res);
        } else {
          sp.send('vars.add.error', res);
        }
        callback && callback(res);
      });
    } else {
      sp.send('vars.add.auth.error', data);
    }
  });

  //LEADERBOARD SECTION
  sp.on('leaderboard.load', function () {
    if (_config == {}) {
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
  sp.on('load.reviews.list', function (data) {
    if (_config == {}) {
      initError();
      return;
    }

    var req_data = {};

    if (data) {
      req_data.page = data.page || 1
    }

    JSONP.get(_config.DOMAIN + _config.urls.reviews.list, req_data, function (res) {
      if (res.status == 'ok') {
        sp.send('load.reviews.list.success', {page: res.page, pages: res.pages, reviews: res.reviews});
      } else {
        sp.send('load.reviews.list.error', res);
      }
    });
  });

  sp.on('reviews.add', function (data) {
    if (_config == {}) {
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

  sp.on('purchases.add', function (data) {
    if (_config == {}) {
      initError();
      return;
    }
    var req_data = {
      auth_hash: _config.auth_hash,
      price: data.price || '',
      order_num: data.order_num || ''
    };
    JSONP.get(_config.DOMAIN + _config.urls.purchase, req_data, function (res) {
      if (res.status == 'ok') {
        sp.send('purchases.add.success', res);
      } else {
        sp.send('purchases.add.error', res);
      }
    });
  });

  //utils
  sp.config = function () {
    return _config;
  };

  sp.find_by_properties = function (arr, props) {
    var filtered_arr = [];
    for (var i = 0; i < arr.length; i += 1) {
      var seeked = arr[i];
      var good = true;
      for (var p in props) {
        if (props[p] != seeked[p]) {
          good = false;
        }
      }
      if (good) filtered_arr.push(seeked);
    }
    return filtered_arr;
  };

  sp.jsonp = JSONP;

  sp.cookies = cookies;

  sp.is_dom = function (obj) {
    //Returns true if it is a DOM node

    function isNode(o) {
      return (
        typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
      );
    }

    //Returns true if it is a DOM element
    function isElement(o) {
      return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
      );
    }

    return isNode(obj) || isElement(obj);

  };

  sp.url_params = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var uri_component = pair && pair[1] ? pair[1].replace(/%([^\d].)/, "%25$1") : '';
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(uri_component);
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        query_string[pair[0]] = [query_string[pair[0]], decodeURIComponent(uri_component)];
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(uri_component));
      }
    }
    return query_string;
  };

  return sp;

}());
(function () {

  if(typeof window.SAILPLAY === 'undefined'){
    console.log('Can\'t find main SAILPLAY module');
    return;
  }

  var sp = window.SAILPLAY;

  var Leads = function(){

    var leads = {};

    return function(name, form, params){

      if(!name && !form && !params) {
        return leads;
      }

      if(name && !form && !params){
        return leads[name];
      }


      if(name && form && (!sp.is_dom(form) || form.tagName.toUpperCase() !== 'FORM')) {
        console.error('Provide DOM form element as second parameter');
        return leads;
      }

      leads[name] = new Lead(name, form, params);

      return leads[name];

    };

  };

  var Lead = function(name, form, params){

    var self = this;

    self.name = name;

    self.form = form;

    self.tags = params && params.tags || (form.getAttribute('data-sp-tags') || '').split(',');

    self.submit = function(callback){

      if(!sp.config() || JSON.stringify(sp.config()) === '{}') {
        console.error('Need "init.success" event triggered.');
        return;
      }

      var params = sp.serialize(self.form);

      sp.send('user.update', params, function(user_res){

        if(user_res.status === 'ok' && self.tags.length > 0){

          sp.send('tags.add', { user: params, tags: self.tags }, function(res){
            if(res.status === 'ok') {
              sp.send('leads.submit.success', { lead: self, response: user_res, tags: res });
            }
            else {
              sp.send('leads.submit.error', { lead: self, response: user_res, tags: res });
            }
            callback && callback({ lead: self, response: user_res, tags: res });
          });

        }

        else if (user_res.status === 'ok' && self.tags.length == 0){
          sp.send('leads.submit.success', { lead: self, response: user_res });
          callback && callback({ lead: self, response: user_res });
        }

        else {
          sp.send('leads.submit.error', { lead: self, response: user_res });
          callback && callback({ lead: self, response: user_res });
        }


      });

    };

    self.form.addEventListener('submit', function(e){
      e.preventDefault();
      self.submit();
    });

  };

  sp.leads = new Leads();

  sp.on('leads.parse', function(){

    var forms = document.querySelectorAll('[data-sp-lead]');

    for(var d = 0; d < forms.length; d+=1) {

      var form = forms[d];

      sp.leads(form.getAttribute('data-sp-lead'), form);

    }

  });

  sp.on('leads.submit', function(name, callback){
    var lead = sp.leads(name);

    if(!lead) {
      console.error('Lead with name ' + name + ' not found.');
      return;
    }

    lead.submit(callback);

  });

  sp.serialize = function(form) {
    if (!form || form.nodeName !== "FORM") {
      return;
    }
    var i, j, q = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
      if (form.elements[i].name === "") {
        continue;
      }
      switch (form.elements[i].nodeName) {
        case 'INPUT':
          switch (form.elements[i].type) {
            case 'text':
            case 'email':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
              q[form.elements[i].name] = form.elements[i].value;
              break;
            case 'checkbox':
            case 'radio':
              if (form.elements[i].checked) {
                q[form.elements[i].name] = form.elements[i].value;
              }
              break;
            case 'file':
              break;
          }
          break;
        case 'TEXTAREA':
          q[form.elements[i].name] = form.elements[i].value;
          break;
        case 'SELECT':
          switch (form.elements[i].type) {
            case 'select-one':
              q[form.elements[i].name] = form.elements[i].value;
              break;
            case 'select-multiple':
              for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                if (form.elements[i].options[j].selected) {
                  q[form.elements[i].name] = form.elements[i].options[j].value;
                }
              }
              break;
          }
          break;
        case 'BUTTON':
          switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
              q[form.elements[i].name] = form.elements[i].value;
              break;
          }
          break;
      }
    }
    return q;
  }

}());

(function (doc, cssText) {
    var styleEl = doc.createElement("style");
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, ".bns_overlay {\n" +
"  position: fixed;\n" +
"  left: 0px;\n" +
"  top: 0px;\n" +
"  width: 100%;\n" +
"  height: 100%;\n" +
"  z-index: 10000;\n" +
"  background-color: rgba(0, 0, 0, 0.3);\n" +
"  display: none;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner {\n" +
"  position: absolute;\n" +
"  left: 50%;\n" +
"  top: 50%;\n" +
"  width: 714px;\n" +
"  height: 314px;\n" +
"  margin-left: -357px;\n" +
"  margin-top: -157px;\n" +
"  font-family: 'Franklin Gothic Book';\n" +
"  -webkit-box-shadow: 0 0 10px 0 #000000;\n" +
"  box-shadow: 0 0 10px 0 #000000;\n" +
"  border-radius: 20px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_left {\n" +
"  float: left;\n" +
"  width: 310px;\n" +
"  height: 100%;\n" +
"  position: absolute;\n" +
"  top: 0px;\n" +
"  left: 0px;\n" +
"  border-radius: 20px 0 0 20px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right {\n" +
"  float: right;\n" +
"  width: 404px;\n" +
"  height: 100%;\n" +
"  background-color: #FFFFFF;\n" +
"  background-repeat: no-repeat;\n" +
"  background-position: 1px 2px;\n" +
"  border-radius: 0 20px 20px 0;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_text {\n" +
"  float: left;\n" +
"  width: 80%;\n" +
"  margin-left: 10%;\n" +
"  line-height: 26px;\n" +
"  font-size: 16px;\n" +
"  color: #484754;\n" +
"  margin-top: 52px;\n" +
"  padding-bottom: 20px;\n" +
"  border-bottom: 1px solid #484754;\n" +
"  text-align: center;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_error {\n" +
"  float: left;\n" +
"  width: 90%;\n" +
"  margin-left: 5%;\n" +
"  line-height: 40px;\n" +
"  border: 1px solid #ECCCD1;\n" +
"  background-color: #F3DEDE;\n" +
"  color: #B04344;\n" +
"  font-size: 17px;\n" +
"  text-align: center;\n" +
"  margin-top: 20px;\n" +
"  font-weight: 500;\n" +
"  opacity: 0;\n" +
"  -webkit-transition: all 300ms ease;\n" +
"  -moz-transition: all 300ms ease;\n" +
"  -ms-transition: all 300ms ease;\n" +
"  -o-transition: all 300ms ease;\n" +
"  transition: all 300ms ease;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_error.act {\n" +
"  opacity: 1;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_input {\n" +
"  float: left;\n" +
"  width: 80%;\n" +
"  margin-left: 10%;\n" +
"  position: relative;\n" +
"  border: 1px solid #A3A2A8;\n" +
"  border-radius: 5px;\n" +
"  overflow: hidden;\n" +
"  margin-top: 16px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_input .bns_ava {\n" +
"  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUBAMAAABPKxEfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFAAAASEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUSEhUO1y0YgAAABB0Uk5TAAoTHSYwQ01WYGlzfIaPmW0HVXIAAABlSURBVAjXY2BgYFBRYAAB6/+/QQzG9///XwTSbP////8GpLmB9C8o/RtIcwHpn0jyIPUPQfrj/v8zANFM3U0gSnIxA/N2AQbm+/8M/P5fZuD9///5+/9/GOz/gwGDPwFaDkz9AwAYPlK/4K7iRAAAAABJRU5ErkJggg==');\n" +
"  background-position: center center;\n" +
"  background-repeat: no-repeat;\n" +
"  border-right: 1px solid #A3A2A8;\n" +
"  position: absolute;\n" +
"  left: 0px;\n" +
"  top: 0px;\n" +
"  width: 39px;\n" +
"  height: 100%;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right .bns_over_input input {\n" +
"  float: left;\n" +
"  width: 100%;\n" +
"  height: 32px;\n" +
"  padding-left: 50px;\n" +
"  color: #A3A2A8;\n" +
"  font-size: 15px;\n" +
"  box-sizing: border-box;\n" +
"  border: 0px;\n" +
"  background-color: transparent;\n" +
"  outline: none;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_overlay_right input[type=\"submit\"] {\n" +
"  float: left;\n" +
"  width: 60%;\n" +
"  margin-left: 20%;\n" +
"  height: 34px;\n" +
"  background-color: #337AB7;\n" +
"  color: #fff;\n" +
"  font-size: 17px;\n" +
"  font-weight: 500;\n" +
"  border: 0px;\n" +
"  margin-top: 20px;\n" +
"  border-radius: 5px;\n" +
"}\n" +
".bns_overlay .bns_overlay_iner .bns_close {\n" +
"  position: absolute;\n" +
"  right: -15px;\n" +
"  top: -15px;\n" +
"  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAMAAADL21gSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVxQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhIOjo6nZ2dmJiYj4+Ps7OzsLCwsbGxrKysqamppqamoaGhnZ2dnp6emJiYvr6+v7+/lpaWlJSUk5OTtLS0ysrKwMDAvb29u7u7ubm5uLi41NTUtbW10tLS09PT0NDQz8/PzMzM39/f2NjY2dnZ09PT0tLSz8/Pzs7Oy8vLzMzMysrK3Nzc2NjY5eXl39/f7e3t6+vr7Ozs5+fn6Ojo5OTk8fHx8PDw7u7u6urq6urq9fX19/f39vb29fX1f39/r6+vx8fH39/f////znEf1gAAAG90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCYoKSotLi8xMjM2OEdOUFVbXFxfYGJlZ2dra2ttbm9xeH+Bg4SFhoeHh4mKi5KWlpqbnZ6goKGmqrG2vb6+wcHEysvN0NHY5ufoZ2qJBQAAAaRJREFUOMudlGdXwjAUhk2T1i6stFgKiCA4UMS99957770VGfn/50htK6G0yPH90JOTPL25yX1za2r+I6CrIkAhmtGFIOUCAsjwkqL6NX+D18PRTlgBEX3htrGdw4Pd8d6WkMwjqoxBnBJdusOmHpYTjXWMLRiAYmD4AxP6nIrJLAQlcYSmLWzTZbvKERRAYuM1LtNNp8bBX4jitA3soKuEwlihAO3tL0zlcySQyxc+080e64gUH37WpzPZIpPN6L+kU34aWIFGzIVskTGG63HOCEWxgdvSpeLgLSmhHwiKcVsAImSfaqQOpSFcQhEMXgixP/sh7yyZcJZk8HmENyB5H5MUyeCLZqEKKGZC3hn37c7M7apKvKoroLjQvdtlvnfVI2CURRl1K8tmq2BWGIrRF+cCf/UELa8ARhlwtsp8iwQJ0207me6UMJ1u3/Cf9i3kXhfbszMnHQGh9LnQ9ZHBVxJJz7X5BWR7eIxHa118tJCntVRc5iAoe8KspMWTEytHx6uT3Ymo6nHrBrzk04KhoCq7NAyr9dSybG2F1lPsYfYu9g3htxWjfGcaSgAAAABJRU5ErkJggg==');\n" +
"  display: block;\n" +
"  width: 36px;\n" +
"  height: 35px;\n" +
"}"));

(function () {

  if(!SAILPLAY || !window.sailplay_config) return;

  var sp = SAILPLAY;

  var lead_template =
    '<div id="sailplay_lead" class="bns_overlay bns_overlay_email">\
      <div class="bns_overlay_iner">\
        <a href="#" class="bns_close"></a>\
        <div class="bns_overlay_left" style="background-image: url(\'data:image/png;base64,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\');"></div>\
        <form novalidate class="bns_overlay_right" style="background-image: url(\'data:image/png;base64,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\');">\
          <span class="bns_over_text">\
            Оставьте свой email и получите муфту для коляски в подарок при оформлении заказа\
          </span>\
          <span class="bns_over_error">\
            E-mail адрес не введен\
          </span>\
          <div class="bns_over_input">\
            <div class="bns_ava"></div>\
            <input type="text" name="email" placeholder="Адрес эл. почты" required />\
          </div>\
          <input type="submit" value="Отправить" />\
        </form>\
      </div>\
    </div>';

  sp.send('init', window.sailplay_config);

  sp.on('init.success', function(){

    document.body.insertAdjacentHTML( 'beforeend', lead_template );

    var lead = document.getElementById('sailplay_lead');
    var close_btn = lead.querySelector('.bns_close');
    var form = lead.getElementsByTagName('form')[0];
    var error = form.querySelector('.bns_over_error');

    sp.on('lead.show', function(){
      lead.style.display = 'block';
    });

    sp.on('lead.hide', function(){
      lead.style.display = 'none';
    });

    function close(e){
      if(e.target === this){
        e.preventDefault();
        sp.send('lead.hide');
        return false;
      }

    }

    close_btn.addEventListener('click', close);
    lead.addEventListener('click', close);

    //sp.leads('kolyaski', form, { tags: [ ] });

    form.addEventListener('submit', function(e){

      e.preventDefault();

      error.style.opacity = 0;

      var params = sp.serialize(form);

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(re.test(params.email)){
        sp.send('user.update', params);
      }
      else {
        error.innerText = 'E-mail адрес введен некорректно';
        error.style.opacity = 1;
      }

    });

    sp.on('user.update.success', function(){
      sp.cookies.createCookie('sailplay_lead_submitted', true);
      sp.send('lead.hide');
      error.style.opacity = 0;

    });

    sp.on('user.update.error', function(data){

      error.innerText = data.message;
      error.style.opacity = 1;

    });

    if(!sp.cookies.readCookie('sailplay_lead_submitted')){
      setTimeout(function(){

        sp.send('lead.show');

      }, window.sailplay_config.timeout || 20000);
    }

  });

  //$(document).ready(function () {
  //  $('.open_popup').click(function () {
  //    $('.bns_overlay_email').fadeIn();
  //    return false;
  //  })
  //  $('.bns_overlay, .bns_close').click(function () {
  //    $('.bns_overlay').fadeOut();
  //    return false;
  //  })
  //  $('.bns_overlay_iner').click(function (event) {
  //    event.stopPropagation()
  //  })
  //  $('.bns_overlay_right input[type="submit"]').click(function () {
  //    if ($('.bns_overlay_right input[type="text"]').val() == '') {
  //      $('.bns_over_error').addClass('act');
  //      return false;
  //    } else {
  //      $('.bns_over_error').removeClass('act');
  //    }
  //
  //  })
  //});

}());
