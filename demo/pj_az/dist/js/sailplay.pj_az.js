(function () {

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

        var _domain = _config.DOMAIN.indexOf('http:') != -1 || _config.DOMAIN.indexOf('https:') != -1 ? _config.DOMAIN : 'http:' + _config.DOMAIN;

        if (messageEvent.origin == _domain) {
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
          document.body.removeChild(frame);
          window.removeEventListener("message", onMessage, false);
          _remote_login_init = false;
        }
      }

      var params = {};
      params.partner_id = _config.partner.id;
      params.dep_id = _config.dep_id || '';
      params.background = opts.background || '';
      params.partner_info = opts.partner_info || 0;
      if(opts.reg_match_email_oid) {
        params.reg_match_email_oid = opts.reg_match_email_oid;
      }
      if(opts.css_link) {
        params.css_link = opts.css_link;
      }
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
      req.src = _config.DOMAIN + '/users/logout/';
      document.body.appendChild(req);
      req.onload = function () {
        document.body.removeChild(req);
        _config.auth_hash = '';
        cookies.eraseCookie('sp_auth_hash');
        sp.send('logout.success');
      };


    });

    //USER INFO
    sp.on('load.user.info', function (p, callback) {
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
        callback && callback(res);
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

    //user feedback
    sp.on('users.feedback', function (params, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      params = params || {};

      if (_config.auth_hash) {
        params.auth_hash = _config.auth_hash;
      }
      else {
        sp.send('auth.error');
        return;
      }

      JSONP.get(_config.DOMAIN + _config.urls.users.feedback, params, function (res) {

        callback && callback(res);

        if (res.status === 'ok') {
          sp.send('users.feedback.success', res);
        }
        else {
          sp.send('users.feedback.error', res);
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

      params.lang = params.lang || _config.lang || 'ru';

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
    sp.on('load.badges.list', function (p) {
      if (_config == {}) {
        initError();
        return;
      }
      var params = {
        auth_hash: _config.auth_hash,
        lang: p && p.lang || _config.lang || 'ru'
      };
      if(p){
        if(p.include_rules) {
          params.include_rules = 1;
        }
      }
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
        SAILPLAY.send('tags.add.auth.error', data);
      }
    });

    sp.on('tags.delete', function (data, callback) {
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
          callback && callback(res);
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
    sp.on("tags.exist", function (data, callback) {
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
          callback && callback(res);
        });
      } else {
        sp.send('tags.exist.auth.error', data);
      }

    });
    
    // USER TAGS LIST
    sp.on("tags.list", function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      if (_config.auth_hash || data.user) {
        var obj = {};
        if(data.params) {
          for (var p in data.params) {
            obj[p] = data.params[p];
          }
        }
        if (data.user) {
          for (var p in data.user) {
            obj[p] = data.user[p];
          }
        } else {
          obj.auth_hash = _config.auth_hash;
        }
        obj.lang = data.lang || _config.lang || 'ru';
        JSONP.get(_config.DOMAIN + _config.urls.tags.list, obj, function (res) {
          if (res.status == 'ok') {
            sp.send('tags.list.success', res);
          } else {
            sp.send('tags.list.error', res);
          }
          callback && callback(res);
        });
      } else {
        sp.send('tags.list.auth.error', data);
      }

    });

    /**
     * Add variables to user
     * @object data {custom_vars:{}, user: {}}
     * @function callback
     */
    sp.on('vars.add', function (data, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      if (_config.auth_hash || data.user) {

        var obj = data.custom_vars;

        if (data.user)
          for (var p in data.user) obj[p] = data.user[p];
        else
          obj.auth_hash = _config.auth_hash;

        obj.lang = data.lang || _config.lang || 'ru';

        JSONP.get(_config.DOMAIN + _config.urls.users.custom_variables.add, obj, function (res) {
          if (res.status == 'ok')
            sp.send('vars.add.success', res);
          else
            sp.send('vars.add.error', res);
          callback && callback(res);
        });

      } else {
        sp.send('vars.add.auth.error', data);
      }

    });

    /**
     * Get user variables
     * @object data {names: [], user: {}}
     * @function callback
     */
    sp.on("vars.batch", function (data, callback) {

      if (_config == {}) {
        initError();
        return;
      }

      if (_config.auth_hash || data.user) {

        var obj = {
          names: JSON.stringify(data.names)
        };

        if (data.user)
          for (var p in data.user) obj[p] = data.user[p];
        else
          obj.auth_hash = _config.auth_hash;

        obj.lang = data.lang || _config.lang || 'ru';

        JSONP.get(_config.DOMAIN + _config.urls.users.custom_variables.batch_get, obj, function (res) {
          if (res.status == 'ok')
            sp.send('vars.batch.success', res);
          else
            sp.send('vars.batch.error', res);
          callback && callback(res);
        });

      } else {
        sp.send('vars.batch.auth.error', data);
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

    sp.on('purchases.info', function (data) {
      if (_config == {}) {
        initError();
        return;
      }
      var req_data = {
        auth_hash: _config.auth_hash,
        id: data.id || ''
      };
      JSONP.get(_config.DOMAIN + _config.urls.purchases.get, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('purchases.info.success', res);
        } else {
          sp.send('purchases.info.error', res);
        }
      });
    });

    sp.on('user.referral', function (data, callback) {
      if (_config == {}) {
        initError();
        return;
      }
      var req_data = {
        auth_hash: _config.auth_hash
      };
      JSONP.get(_config.DOMAIN + _config.urls.users.referral, req_data, function (res) {
        if (res.status == 'ok') {
          sp.send('purchases.info.success', res);
        } else {
          sp.send('purchases.info.error', res);
        }
        callback && callback(res);
      });
    });

    sp.on('magic.config', function (name) {
      if (_config == {}) {
        initError();
        return;
      }
      JSONP.get(_config.DOMAIN + _config.urls.loyalty_page_config_by_name, { name: name || 'default' }, function (res) {
        if (res.status == 'ok') {
          sp.send('magic.config.success', res);
        } else {
          sp.send('magic.config.error', res);
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

  if(typeof window !== 'undefined') window.SAILPLAY = SAILPLAY;
  if(typeof module !== 'undefined') module.exports = SAILPLAY;
  if(typeof exports !== 'undefined') exports = SAILPLAY;

}());

(function () {

  if(typeof window.SAILPLAY === 'undefined'){
    console.log('Can\'t find main SAILPLAY module');
    return;
  }

  var sp = window.SAILPLAY;

  var JSONP = sp.jsonp;

  var _actions_config = false;

  sp.actions = {};

  sp.actions.config = function(){
    return _actions_config;
  };

  //ACTIONS SECTION

  //LOAD ACTIONS LIST
  sp.on('load.actions.list', function () {
    if(sp.config() == {}){
      alert('Please init SailPlay HUB first!');
      return;
    }
    var params = {
      auth_hash: sp.config().auth_hash
    };

    JSONP.get(sp.config().DOMAIN + sp.config().urls.actions.load, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        _actions_config = res.data;
        sp.send('load.actions.list.success', res.data);
      } else {
        sp.send('load.actions.list.error', res);
      }
    });
  });

  //LOAD ACTIONS LIST
  sp.on('load.actions.custom.list', function () {
    if(sp.config() == {}){
      alert('Please init SailPlay HUB first!');
      return;
    }
    var params = {
      auth_hash: sp.config().auth_hash
    };

    JSONP.get(sp.config().DOMAIN + sp.config().urls.actions.custom.list, params, function (res) {
      //      console.dir(res);
      if (res.status == 'ok') {
        sp.send('load.actions.custom.list.success', res.actions);
      } else {
        sp.send('load.actions.custom.list.error', res);
      }
    });
  });

  sp.on('set.actions.list', function (actions) {
    _actions_config = actions;
  });

  //PERFORM ACTION

  sp.actions.parse = function(dom, action){

    if(!sp.is_dom(dom)) {
      console.error('sp.actions.parse() need DOM element as first parameter');
      return;
    }

    if(!action) {
      console.error('sp.actions.parse() need Action object as second parameter');
      return;
    }

    if(!_actions_config.connectedAccounts && !action.force) {

      console.error('sp.actions.parse() must execute after event load.actions.list.success');
      return;

    }

    if(!action.socialType){

      //console.dir(action);
      dom.addEventListener('click', function(){
        sp.send('actions.perform', action);
      });

      return;

    }

    if(sp.config().platform === 'mobile' && action.socialType){

      dom.addEventListener('click', function(){
        sp.send('actions.perform', action);
      });

    }

    else {

      parse_frame();

    }

    function parse_frame(){
      var styles = dom.getAttribute('data-styles');
      var text = dom.getAttribute('data-text');

      var action_frame = document.createElement('IFRAME');
      action_frame.style.border = 'none';
      action_frame.style.width = '150px';
      action_frame.style.height = '30px';
      action_frame.style.background = 'transparent';
      action_frame.style.overflow = 'hidden';
      action_frame.setAttribute('scrolling', 'no');

      var account_connected = action.force ? true : (_actions_config.connectedAccounts[action.socialType] || false);

      action_frame.className = [ 'sailplay_action_frame', (action.socialType || ''),  (action.action || ''), (account_connected ? 'account_connected' : '')].join(' ');

      function EncodeQueryData(data)
      {
        var ret = [];
        for (var d in data)
          ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        return ret.join("&");
      }

      var frame_params = {
        auth_hash: sp.config().auth_hash,
        socialType: action.socialType,
        action: action.action,
        link: action.shortLink,
        pic: (action.pic || _actions_config.partnerCustomPic || sp.config().partner.logo),
        msg: (action.msg || _actions_config.messages[action.action] || sp.config().partner.name),
        account_connected: account_connected,
        force: action.force
      };

      if(action['_actionId']) frame_params._actionId = action._actionId;
      if(styles) frame_params.styles = styles;
      if(text) frame_params.text = text;

      if (action.action == 'purchase') {
        frame_params.purchasePublicKey = _actions_config.purchasePublicKey;
      }

      if (action.action == 'badge') {
        frame_params.badgeId= action.badgeId;
      }

      action_frame.src = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/v2/?' + EncodeQueryData(frame_params);
      dom.innerHTML = '';
      dom.appendChild(action_frame);

      action_frame.onload = function() {
        sp.send('actions.parse.success', action);
      };

      //gp speciefied config

    }



  };

  sp.on('actions.parse', function (actions) {

    if(sp.config() == {}){
      return;
    }

    if(actions && Array.isArray(actions)) {
      Actions.social_init(actions);
    }
    else {
      sp.send('actions.parse.error', { message: 'Actions list needed' });
    }

  });

  var Actions = {};

  Actions.social_init = function(actions){

    var social_buttons = document.querySelectorAll('[data-sp-action]');

    for(var i = 0; i < social_buttons.length; i+=1) {

      (function(){
        var btn = social_buttons[i];
        var action_id = Number(btn.getAttribute('data-sp-action'));
        var action = sp.find_by_properties((actions || _actions_config.actions), { _actionId: action_id })[0];
        sp.actions.parse(btn, action);
      }());

    }

  };

  //actions v1 section

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

    var frameUrl = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/?auth_hash=' + sp.config().auth_hash;
    frameUrl += '&socialType=' + action.socialType + '&action=' + action.action + '&link=' + action.shortLink + '&pic=' + (_actions_config.partnerCustomPic ? _actions_config.partnerCustomPic : sp.config().partner.logo);

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

    if(sp.config().platform === 'mobile') {

      end_share(action);
      return;

    }

    sp.send('actions.perform.start', action);

    if (action.socialType && _actions_config.connectedAccounts) {
      if (!_actions_config.connectedAccounts[action.socialType]) {
        Actions.openSocialRegNeedPopup(action);
      } else {
        Actions.share(action);
      }
    }
    else if(!action.socialType){
      var frameUrl = sp.config().DOMAIN + '/popup/' + sp.config().partner.id + '/widgets/custom/' + action.type  + '/?auth_hash=' + sp.config().auth_hash;
      frameUrl += '&lang=' + sp.config().lang;
      frameUrl += '&from_sdk=0';
      var actionFrame = Actions.popupWindow(frameUrl, 'SailPlay', 600, 400);
      var checkPopupInterval = setInterval(function () {
        if (actionFrame == null || actionFrame.closed) {
          sp.send('actions.perform.complete', action);
          clearInterval(checkPopupInterval);
        }
      }, 200);
    }

  };

  sp.on('actions.perform', function (action, callback) {
    if(sp.config() == {}){
      return;
    }
    if (sp.config().auth_hash) {
      Actions.perform(action, callback);
    } else {
      sp.send('actions.perform.auth.error', action);
    }
  });

  function repair_pic_url(url){
    console.log(url);
    if(/^((http|https|ftp):\/\/)/.test(url)){
      return url;
    }
    if(url.indexOf('//') === 0){
      return window.location.protocol + url;
    }
    else {
      return sp.config().DOMAIN + url;
    }
  }

  function end_share(action){

    var handle_params = {
      partner_id: sp.config().partner.id,
      social_type: action.socialType,
      action: action.action,
      purchase_public_key: _actions_config.purchasePublicKey || '',
      badge_id: action.badgeId || '',
      auth_hash: sp.config().auth_hash,
      platform: sp.config().platform
    };

    sp.jsonp.get(sp.config().DOMAIN + sp.config().urls.actions.handle_social_action, handle_params,

      function(res){
        sp.send('actions.perform.success', { response: res, action: action });
      },
      function(res){
        sp.send('actions.perform.error', { error: res, action: action });
      })

  }


}());

/*
 AngularJS v1.6.10
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(y){'use strict';function qe(a){if(G(a))u(a.objectMaxDepth)&&(Oc.objectMaxDepth=Wb(a.objectMaxDepth)?a.objectMaxDepth:NaN);else return Oc}function Wb(a){return Y(a)&&0<a}function M(a,b){b=b||Error;return function(){var d=arguments[0],c;c="["+(a?a+":":"")+d+"] http://errors.angularjs.org/1.6.10/"+(a?a+"/":"")+d;for(d=1;d<arguments.length;d++){c=c+(1==d?"?":"&")+"p"+(d-1)+"=";var e=encodeURIComponent,f;f=arguments[d];f="function"==typeof f?f.toString().replace(/ \{[\s\S]*$/,""):"undefined"==
typeof f?"undefined":"string"!=typeof f?JSON.stringify(f):f;c+=e(f)}return new b(c)}}function ja(a){if(null==a||Za(a))return!1;if(I(a)||F(a)||z&&a instanceof z)return!0;var b="length"in Object(a)&&a.length;return Y(b)&&(0<=b&&(b-1 in a||a instanceof Array)||"function"===typeof a.item)}function q(a,b,d){var c,e;if(a)if(C(a))for(c in a)"prototype"!==c&&"length"!==c&&"name"!==c&&a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else if(I(a)||ja(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in
a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==q)a.forEach(b,d,a);else if(Pc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else for(c in a)ra.call(a,c)&&b.call(d,a[c],c,a);return a}function Qc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function Xb(a){return function(b,d){a(d,b)}}function re(){return++qb}function Yb(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=
b[e];if(G(g)||C(g))for(var k=Object.keys(g),h=0,l=k.length;h<l;h++){var m=k[h],p=g[m];d&&G(p)?da(p)?a[m]=new Date(p.valueOf()):$a(p)?a[m]=new RegExp(p):p.nodeName?a[m]=p.cloneNode(!0):Zb(p)?a[m]=p.clone():(G(a[m])||(a[m]=I(p)?[]:{}),Yb(a[m],[p],!0)):a[m]=p}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function P(a){return Yb(a,xa.call(arguments,1),!1)}function se(a){return Yb(a,xa.call(arguments,1),!0)}function Z(a){return parseInt(a,10)}function $b(a,b){return P(Object.create(a),b)}function D(){}
function ab(a){return a}function ka(a){return function(){return a}}function ac(a){return C(a.toString)&&a.toString!==ha}function x(a){return"undefined"===typeof a}function u(a){return"undefined"!==typeof a}function G(a){return null!==a&&"object"===typeof a}function Pc(a){return null!==a&&"object"===typeof a&&!Rc(a)}function F(a){return"string"===typeof a}function Y(a){return"number"===typeof a}function da(a){return"[object Date]"===ha.call(a)}function bc(a){switch(ha.call(a)){case "[object Error]":return!0;
case "[object Exception]":return!0;case "[object DOMException]":return!0;default:return a instanceof Error}}function C(a){return"function"===typeof a}function $a(a){return"[object RegExp]"===ha.call(a)}function Za(a){return a&&a.window===a}function bb(a){return a&&a.$evalAsync&&a.$watch}function La(a){return"boolean"===typeof a}function te(a){return a&&Y(a.length)&&ue.test(ha.call(a))}function Zb(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function ve(a){var b={};a=a.split(",");var d;for(d=
0;d<a.length;d++)b[a[d]]=!0;return b}function ya(a){return N(a.nodeName||a[0]&&a[0].nodeName)}function cb(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function na(a,b,d){function c(a,b,c){c--;if(0>c)return"...";var d=b.$$hashKey,g;if(I(a)){g=0;for(var f=a.length;g<f;g++)b.push(e(a[g],c))}else if(Pc(a))for(g in a)b[g]=e(a[g],c);else if(a&&"function"===typeof a.hasOwnProperty)for(g in a)a.hasOwnProperty(g)&&(b[g]=e(a[g],c));else for(g in a)ra.call(a,g)&&(b[g]=e(a[g],c));d?b.$$hashKey=d:delete b.$$hashKey;
return b}function e(a,b){if(!G(a))return a;var d=g.indexOf(a);if(-1!==d)return k[d];if(Za(a)||bb(a))throw oa("cpws");var d=!1,e=f(a);void 0===e&&(e=I(a)?[]:Object.create(Rc(a)),d=!0);g.push(a);k.push(e);return d?c(a,e,b):e}function f(a){switch(ha.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(e(a.buffer),
a.byteOffset,a.length);case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(C(a.cloneNode))return a.cloneNode(!0)}
var g=[],k=[];d=Wb(d)?d:NaN;if(b){if(te(b)||"[object ArrayBuffer]"===ha.call(b))throw oa("cpta");if(a===b)throw oa("cpi");I(b)?b.length=0:q(b,function(a,c){"$$hashKey"!==c&&delete b[c]});g.push(a);k.push(b);return c(a,b,d)}return e(a,d)}function cc(a,b){return a===b||a!==a&&b!==b}function sa(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d===typeof b&&"object"===d)if(I(a)){if(!I(b))return!1;if((d=a.length)===b.length){for(c=0;c<d;c++)if(!sa(a[c],
b[c]))return!1;return!0}}else{if(da(a))return da(b)?cc(a.getTime(),b.getTime()):!1;if($a(a))return $a(b)?a.toString()===b.toString():!1;if(bb(a)||bb(b)||Za(a)||Za(b)||I(b)||da(b)||$a(b))return!1;d=R();for(c in a)if("$"!==c.charAt(0)&&!C(a[c])){if(!sa(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&u(b[c])&&!C(b[c]))return!1;return!0}return!1}function db(a,b,d){return a.concat(xa.call(b,d))}function Ta(a,b){var d=2<arguments.length?xa.call(arguments,2):[];return!C(b)||b instanceof
RegExp?b:d.length?function(){return arguments.length?b.apply(a,db(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function Sc(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=void 0:Za(b)?d="$WINDOW":b&&y.document===b?d="$DOCUMENT":bb(b)&&(d="$SCOPE");return d}function eb(a,b){if(!x(a))return Y(b)||(b=b?2:null),JSON.stringify(a,Sc,b)}function Tc(a){return F(a)?JSON.parse(a):a}function dc(a,b){a=a.replace(we,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+
a)/6E4;return X(d)?b:d}function Uc(a,b){a=new Date(a.getTime());a.setMinutes(a.getMinutes()+b);return a}function ec(a,b,d){d=d?-1:1;var c=a.getTimezoneOffset();b=dc(b,c);return Uc(a,d*(b-c))}function za(a){a=z(a).clone().empty();var b=z("<div></div>").append(a).html();try{return a[0].nodeType===Ma?N(b):b.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/,function(a,b){return"<"+N(b)})}catch(d){return N(b)}}function Vc(a){try{return decodeURIComponent(a)}catch(b){}}function fc(a){var b={};q((a||"").split("&"),
function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=Vc(e),u(e)&&(f=u(f)?Vc(f):!0,ra.call(b,e)?I(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function gc(a){var b=[];q(a,function(a,c){I(a)?q(a,function(a){b.push(ia(c,!0)+(!0===a?"":"="+ia(a,!0)))}):b.push(ia(c,!0)+(!0===a?"":"="+ia(a,!0)))});return b.length?b.join("&"):""}function fb(a){return ia(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ia(a,
b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function xe(a,b){var d,c,e=Ga.length;for(c=0;c<e;++c)if(d=Ga[c]+b,F(d=a.getAttribute(d)))return d;return null}function ye(a,b){var d,c,e={};q(Ga,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});q(Ga,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":","\\:")+"]"))&&(d=e,c=e.getAttribute(b))});
d&&(ze?(e.strictDi=null!==xe(d,"strict-di"),b(d,c?[c]:[],e)):y.console.error("AngularJS: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."))}function Wc(a,b,d){G(d)||(d={});d=P({strictDi:!1},d);var c=function(){a=z(a);if(a.injector()){var c=a[0]===y.document?"document":za(a);throw oa("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",
function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=gb(b,d.strictDi);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;y&&e.test(y.name)&&(d.debugInfoEnabled=!0,y.name=y.name.replace(e,""));if(y&&!f.test(y.name))return c();y.name=y.name.replace(f,"");ea.resumeBootstrap=function(a){q(a,function(a){b.push(a)});return c()};C(ea.resumeDeferredBootstrap)&&
ea.resumeDeferredBootstrap()}function Ae(){y.name="NG_ENABLE_DEBUG_INFO!"+y.name;y.location.reload()}function Be(a){a=ea.element(a).injector();if(!a)throw oa("test");return a.get("$$testability")}function Xc(a,b){b=b||"_";return a.replace(Ce,function(a,c){return(c?b:"")+a.toLowerCase()})}function De(){var a;if(!Yc){var b=rb();(ta=x(b)?y.jQuery:b?y[b]:void 0)&&ta.fn.on?(z=ta,P(ta.fn,{scope:Ua.scope,isolateScope:Ua.isolateScope,controller:Ua.controller,injector:Ua.injector,inheritedData:Ua.inheritedData}),
a=ta.cleanData,ta.cleanData=function(b){for(var c,e=0,f;null!=(f=b[e]);e++)(c=ta._data(f,"events"))&&c.$destroy&&ta(f).triggerHandler("$destroy");a(b)}):z=S;ea.element=z;Yc=!0}}function hb(a,b,d){if(!a)throw oa("areq",b||"?",d||"required");return a}function sb(a,b,d){d&&I(a)&&(a=a[a.length-1]);hb(C(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ha(a,b){if("hasOwnProperty"===a)throw oa("badname",b);}function Zc(a,b,d){if(!b)return a;b=
b.split(".");for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&C(a)?Ta(e,a):a}function tb(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=z(xa.call(a,0,e))),c.push(b);return c||a}function R(){return Object.create(null)}function hc(a){if(null==a)return"";switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=!ac(a)||I(a)||da(a)?eb(a):a.toString()}return a}function Ee(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=
M("$injector"),c=M("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||M;return b(a,"module",function(){var a={};return function(f,g,k){var h={};if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,c,d,g){g||(g=e);return function(){g[d||"push"]([b,c,arguments]);return E}}function b(a,c,d){d||(d=e);return function(b,e){e&&C(e)&&(e.$$moduleName=f);d.push([a,c,arguments]);return E}}if(!g)throw d("nomod",f);var e=[],n=[],B=[],v=
a("$injector","invoke","push",n),E={_invokeQueue:e,_configBlocks:n,_runBlocks:B,info:function(a){if(u(a)){if(!G(a))throw c("aobj","value");h=a;return this}return h},requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator",n),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider",
"register"),directive:b("$compileProvider","directive"),component:b("$compileProvider","component"),config:v,run:function(a){B.push(a);return this}};k&&v(k);return E})}})}function pa(a,b){if(I(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(G(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function Fe(a,b){var d=[];Wb(b)&&(a=ea.copy(a,null,b));return JSON.stringify(a,function(a,b){b=Sc(a,b);if(G(b)){if(0<=d.indexOf(b))return"...";d.push(b)}return b})}
function Ge(a){P(a,{errorHandlingConfig:qe,bootstrap:Wc,copy:na,extend:P,merge:se,equals:sa,element:z,forEach:q,injector:gb,noop:D,bind:Ta,toJson:eb,fromJson:Tc,identity:ab,isUndefined:x,isDefined:u,isString:F,isFunction:C,isObject:G,isNumber:Y,isElement:Zb,isArray:I,version:He,isDate:da,lowercase:N,uppercase:ub,callbacks:{$$counter:0},getTestability:Be,reloadWithDebugInfo:Ae,$$minErr:M,$$csp:Ia,$$encodeUriSegment:fb,$$encodeUriQuery:ia,$$stringify:hc});jc=Ee(y);jc("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Ie});
a.provider("$compile",$c).directive({a:Je,input:ad,textarea:ad,form:Ke,script:Le,select:Me,option:Ne,ngBind:Oe,ngBindHtml:Pe,ngBindTemplate:Qe,ngClass:Re,ngClassEven:Se,ngClassOdd:Te,ngCloak:Ue,ngController:Ve,ngForm:We,ngHide:Xe,ngIf:Ye,ngInclude:Ze,ngInit:$e,ngNonBindable:af,ngPluralize:bf,ngRepeat:cf,ngShow:df,ngStyle:ef,ngSwitch:ff,ngSwitchWhen:gf,ngSwitchDefault:hf,ngOptions:jf,ngTransclude:kf,ngModel:lf,ngList:mf,ngChange:nf,pattern:bd,ngPattern:bd,required:cd,ngRequired:cd,minlength:dd,ngMinlength:dd,
maxlength:ed,ngMaxlength:ed,ngValue:of,ngModelOptions:pf}).directive({ngInclude:qf}).directive(vb).directive(fd);a.provider({$anchorScroll:rf,$animate:sf,$animateCss:tf,$$animateJs:uf,$$animateQueue:vf,$$AnimateRunner:wf,$$animateAsyncRun:xf,$browser:yf,$cacheFactory:zf,$controller:Af,$document:Bf,$$isDocumentHidden:Cf,$exceptionHandler:Df,$filter:gd,$$forceReflow:Ef,$interpolate:Ff,$interval:Gf,$http:Hf,$httpParamSerializer:If,$httpParamSerializerJQLike:Jf,$httpBackend:Kf,$xhrFactory:Lf,$jsonpCallbacks:Mf,
$location:Nf,$log:Of,$parse:Pf,$rootScope:Qf,$q:Rf,$$q:Sf,$sce:Tf,$sceDelegate:Uf,$sniffer:Vf,$templateCache:Wf,$templateRequest:Xf,$$testability:Yf,$timeout:Zf,$window:$f,$$rAF:ag,$$jqLite:bg,$$Map:cg,$$cookieReader:dg})}]).info({angularVersion:"1.6.10"})}function wb(a,b){return b.toUpperCase()}function xb(a){return a.replace(eg,wb)}function kc(a){a=a.nodeType;return 1===a||!a||9===a}function hd(a,b){var d,c,e=b.createDocumentFragment(),f=[];if(lc.test(a)){d=e.appendChild(b.createElement("div"));
c=(fg.exec(a)||["",""])[1].toLowerCase();c=$[c]||$._default;d.innerHTML=c[1]+a.replace(gg,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=db(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";q(f,function(a){e.appendChild(a)});return e}function S(a){if(a instanceof S)return a;var b;F(a)&&(a=Q(a),b=!0);if(!(this instanceof S)){if(b&&"<"!==a.charAt(0))throw mc("nosel");return new S(a)}if(b){b=y.document;var d;a=(d=hg.exec(a))?[b.createElement(d[1])]:
(d=hd(a,b))?d.childNodes:[];nc(this,a)}else C(a)?id(a):nc(this,a)}function oc(a){return a.cloneNode(!0)}function yb(a,b){!b&&kc(a)&&z.cleanData([a]);a.querySelectorAll&&z.cleanData(a.querySelectorAll("*"))}function jd(a,b,d,c){if(u(c))throw mc("offargs");var e=(c=zb(a))&&c.events,f=c&&c.handle;if(f)if(b){var g=function(b){var c=e[b];u(d)&&cb(c||[],d);u(d)&&c&&0<c.length||(a.removeEventListener(b,f),delete e[b])};q(b.split(" "),function(a){g(a);Ab[a]&&g(Ab[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,
f),delete e[b]}function pc(a,b){var d=a.ng339,c=d&&ib[d];c&&(b?delete c.data[b]:(c.handle&&(c.events.$destroy&&c.handle({},"$destroy"),jd(a)),delete ib[d],a.ng339=void 0))}function zb(a,b){var d=a.ng339,d=d&&ib[d];b&&!d&&(a.ng339=d=++ig,d=ib[d]={events:{},data:{},handle:void 0});return d}function qc(a,b,d){if(kc(a)){var c,e=u(d),f=!e&&b&&!G(b),g=!b;a=(a=zb(a,!f))&&a.data;if(e)a[xb(b)]=d;else{if(g)return a;if(f)return a&&a[xb(b)];for(c in b)a[xb(c)]=b[c]}}}function Bb(a,b){return a.getAttribute?-1<
(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Cb(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),c=d;q(b.split(" "),function(a){a=Q(a);c=c.replace(" "+a+" "," ")});c!==d&&a.setAttribute("class",Q(c))}}function Db(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),c=d;q(b.split(" "),function(a){a=Q(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});c!==d&&a.setAttribute("class",
Q(c))}}function nc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function kd(a,b){return Eb(a,"$"+(b||"ngController")+"Controller")}function Eb(a,b,d){9===a.nodeType&&(a=a.documentElement);for(b=I(b)?b:[b];a;){for(var c=0,e=b.length;c<e;c++)if(u(d=z.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function ld(a){for(yb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}
function Fb(a,b){b||yb(a);var d=a.parentNode;d&&d.removeChild(a)}function jg(a,b){b=b||y;if("complete"===b.document.readyState)b.setTimeout(a);else z(b).on("load",a)}function id(a){function b(){y.document.removeEventListener("DOMContentLoaded",b);y.removeEventListener("load",b);a()}"complete"===y.document.readyState?y.setTimeout(a):(y.document.addEventListener("DOMContentLoaded",b),y.addEventListener("load",b))}function md(a,b){var d=Gb[b.toLowerCase()];return d&&nd[ya(a)]&&d}function kg(a,b){var d=
function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=b[d||c.type],g=f?f.length:0;if(g){if(x(c.immediatePropagationStopped)){var k=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();k&&k.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};var h=f.specialHandlerWrapper||lg;1<g&&(f=pa(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||h(a,c,
f[l])}};d.elem=a;return d}function lg(a,b,d){d.call(a,b)}function mg(a,b,d){var c=b.relatedTarget;c&&(c===a||ng.call(a,c))||d.call(a,b)}function bg(){this.$get=function(){return P(S,{hasClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Db(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Cb(a,b)}})}}function Na(a,b){var d=a&&a.$$hashKey;if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"===d||"object"===d&&null!==
a?a.$$hashKey=d+":"+(b||re)():d+":"+a}function od(){this._keys=[];this._values=[];this._lastKey=NaN;this._lastIndex=-1}function pd(a){a=Function.prototype.toString.call(a).replace(og,"");return a.match(pg)||a.match(qg)}function rg(a){return(a=pd(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function gb(a,b){function d(a){return function(b,c){if(G(b))q(b,Xb(a));else return a(b,c)}}function c(a,b){Ha(a,"service");if(C(b)||I(b))b=n.instantiate(b);if(!b.$get)throw Aa("pget",a);return p[a+
"Provider"]=b}function e(a,b){return function(){var c=E.invoke(b,this);if(x(c))throw Aa("undef",a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){hb(x(a)||I(a),"modulesToLoad","not an array");var b=[],c;q(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],g=n.get(e[0]);g[e[1]].apply(g,e[2])}}if(!m.get(a)){m.set(a,!0);try{F(a)?(c=jc(a),E.modules[a]=c,b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):C(a)?b.push(n.invoke(a)):
I(a)?b.push(n.invoke(a)):sb(a,"module")}catch(e){throw I(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1===e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Aa("modulerr",a,e.stack||e.message||e);}}});return b}function k(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===h)throw Aa("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=h,a[b]=c(b,e),a[b]}catch(g){throw a[b]===h&&delete a[b],g;}finally{l.shift()}}function e(a,c,g){var f=[];a=gb.$$annotate(a,b,g);for(var h=0,
k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Aa("itkn",l);f.push(c&&c.hasOwnProperty(l)?c[l]:d(l,g))}return f}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);I(a)&&(a=a[a.length-1]);d=a;if(Ba||"function"!==typeof d)d=!1;else{var g=d.$$ngIsClass;La(g)||(g=d.$$ngIsClass=/^(?:class\b|constructor\()/.test(Function.prototype.toString.call(d)));d=g}return d?(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=
I(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,annotate:gb.$$annotate,has:function(b){return p.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var h={},l=[],m=new Hb,p={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,ka(b),!1)}),constant:d(function(a,b){Ha(a,"constant");p[a]=b;B[a]=b}),decorator:function(a,b){var c=n.get(a+
"Provider"),d=c.$get;c.$get=function(){var a=E.invoke(d,c);return E.invoke(b,null,{$delegate:a})}}}},n=p.$injector=k(p,function(a,b){ea.isString(b)&&l.push(b);throw Aa("unpr",l.join(" <- "));}),B={},v=k(B,function(a,b){var c=n.get(a+"Provider",b);return E.invoke(c.$get,c,void 0,a)}),E=v;p.$injectorProvider={$get:ka(v)};E.modules=n.modules=R();var A=g(a),E=v.get("$injector");E.strictDi=b;q(A,function(a){a&&E.invoke(a)});E.loadNewModules=function(a){q(g(a),function(a){a&&E.invoke(a)})};return E}function rf(){var a=
!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ya(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;C(c)?c=c():Zb(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):Y(c)||(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=F(a)?a:Y(a)?a.toString():
d.hash();var b;a?(b=k.getElementById(a))?f(b):(b=e(k.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var k=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||jg(function(){c.$evalAsync(g)})});return g}]}function jb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;I(a)&&(a=a.join(" "));I(b)&&(b=b.join(" "));return a+" "+b}function sg(a){F(a)&&(a=a.split(" "));var b=R();q(a,function(a){a.length&&(b[a]=!0)});return b}function Ja(a){return G(a)?a:{}}function tg(a,
b,d,c){function e(a){try{a.apply(null,xa.call(arguments,1))}finally{if(v--,0===v)for(;E.length;)try{E.pop()()}catch(b){d.error(b)}}}function f(){w=null;k()}function g(){A=H();A=x(A)?null:A;sa(A,t)&&(A=t);s=t=A}function k(){var a=s;g();if(J!==h.url()||a!==A)J=h.url(),s=A,q(K,function(a){a(h.url(),A)})}var h=this,l=a.location,m=a.history,p=a.setTimeout,n=a.clearTimeout,B={};h.isMock=!1;var v=0,E=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){v++};h.notifyWhenNoOutstandingRequests=
function(a){0===v?a():E.push(a)};var A,s,J=l.href,ic=b.find("base"),w=null,H=c.history?function(){try{return m.state}catch(a){}}:D;g();h.url=function(b,d,e){x(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=s===e;if(J===b&&(!c.history||f))return h;var k=J&&Ka(J)===Ka(b);J=b;s=e;!c.history||k&&f?(k||(w=b),d?l.replace(b):k?(d=l,e=b.indexOf("#"),e=-1===e?"":b.substr(e),d.hash=e):l.href=b,l.href!==b&&(w=b)):(m[d?"replaceState":"pushState"](e,"",b),g());w&&(w=b);return h}return w||
l.href.replace(/%27/g,"'")};h.state=function(){return A};var K=[],T=!1,t=null;h.onUrlChange=function(b){if(!T){if(c.history)z(a).on("popstate",f);z(a).on("hashchange",f);T=!0}K.push(b);return b};h.$$applicationDestroyed=function(){z(a).off("hashchange popstate",f)};h.$$checkUrlChange=k;h.baseHref=function(){var a=ic.attr("href");return a?a.replace(/^(https?:)?\/\/[^/]*/,""):""};h.defer=function(a,b){var c;v++;c=p(function(){delete B[c];e(a)},b||0);B[c]=!0;return c};h.defer.cancel=function(a){return B[a]?
(delete B[a],n(a),e(D),!0):!1}}function yf(){this.$get=["$window","$log","$sniffer","$document",function(a,b,d,c){return new tg(a,c,b,d)}]}function zf(){this.$get=function(){function a(a,c){function e(a){a!==p&&(n?n===a&&(n=a.n):n=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!==b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw M("$cacheFactory")("iid",a);var g=0,k=P({},c,{id:a}),h=R(),l=c&&c.capacity||Number.MAX_VALUE,m=R(),p=null,n=null;return b[a]={put:function(a,b){if(!x(b)){if(l<Number.MAX_VALUE){var c=
m[a]||(m[a]={key:a});e(c)}a in h||g++;h[a]=b;g>l&&this.remove(n.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return h[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b===p&&(p=b.p);b===n&&(n=b.n);f(b.n,b.p);delete m[a]}a in h&&(delete h[a],g--)},removeAll:function(){h=R();g=0;m=R();p=n=null},destroy:function(){m=k=h=null;delete b[a]},info:function(){return P({},k,{size:g})}}}var b={};a.info=function(){var a={};q(b,function(b,e){a[e]=b.info()});
return a};a.get=function(a){return b[a]};return a}}function Wf(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function $c(a,b){function d(a,b,c){var d=/^([@&<]|=(\*?))(\??)\s*([\w$]*)$/,e=R();q(a,function(a,g){a=a.trim();if(a in p)e[g]=p[a];else{var f=a.match(d);if(!f)throw aa("iscp",b,g,a,c?"controller bindings definition":"isolate scope definition");e[g]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||g};f[4]&&(p[a]=e[g])}});return e}function c(a){var b=
a.charAt(0);if(!b||b!==N(b))throw aa("baddir",a);if(a!==a.trim())throw aa("baddir",a);}function e(a){var b=a.require||a.controller&&a.name;!I(b)&&G(b)&&q(b,function(a,c){var d=a.match(l);a.substring(d[0].length)||(b[c]=d[0]+c)});return b}var f={},g=/^\s*directive:\s*([\w-]+)\s+(.*)$/,k=/(([\w-]+)(?::([^;]+))?;?)/,h=ve("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,m=/^(on[a-z]+|formaction)$/,p=R();this.directive=function ic(b,d){hb(b,"name");Ha(b,"directive");F(b)?(c(b),hb(d,"directiveFactory"),
f.hasOwnProperty(b)||(f[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];q(f[b],function(g,f){try{var h=a.invoke(g);C(h)?h={compile:ka(h)}:!h.compile&&h.link&&(h.compile=ka(h.link));h.priority=h.priority||0;h.index=f;h.name=h.name||b;h.require=e(h);var k=h,l=h.restrict;if(l&&(!F(l)||!/[EACM]/.test(l)))throw aa("badrestrict",l,b);k.restrict=l||"EA";h.$$moduleName=g.$$moduleName;d.push(h)}catch(m){c(m)}});return d}])),f[b].push(d)):q(b,Xb(ic));return this};this.component=
function w(a,b){function c(a){function e(b){return C(b)||I(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:b}var g=b.template||b.templateUrl?b.template:"",f={controller:d,controllerAs:ug(b.controller)||b.controllerAs||"$ctrl",template:e(g),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",require:b.require};q(b,function(a,b){"$"===b.charAt(0)&&(f[b]=a)});return f}if(!F(a))return q(a,Xb(Ta(this,w))),this;var d=b.controller||function(){};
q(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a,C(d)&&(d[b]=a))});c.$inject=["$injector"];return this.directive(a,c)};this.aHrefSanitizationWhitelist=function(a){return u(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return u(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};var n=!0;this.debugInfoEnabled=function(a){return u(a)?(n=a,this):n};var B=!1;this.preAssignBindingsEnabled=function(a){return u(a)?
(B=a,this):B};var v=!1;this.strictComponentBindingsEnabled=function(a){return u(a)?(v=a,this):v};var E=10;this.onChangesTtl=function(a){return arguments.length?(E=a,this):E};var A=!0;this.commentDirectivesEnabled=function(a){return arguments.length?(A=a,this):A};var s=!0;this.cssClassDirectivesEnabled=function(a){return arguments.length?(s=a,this):s};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate","$$sanitizeUri",function(a,
b,c,e,p,V,O,qa,L,r){function la(){try{if(!--Ea)throw ga=void 0,aa("infchng",E);O.$apply(function(){for(var a=0,b=ga.length;a<b;++a)try{ga[a]()}catch(d){c(d)}ga=void 0})}finally{Ea++}}function rc(a,b){if(b){var c=Object.keys(b),d,e,g;d=0;for(e=c.length;d<e;d++)g=c[d],this[g]=b[g]}else this.$attr={};this.$$element=a}function Oa(a,b,c){Aa.innerHTML="<span "+b+">";b=Aa.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);d.value=c;a.attributes.setNamedItem(d)}function Pa(a,b){try{a.addClass(b)}catch(c){}}
function ba(a,b,c,d,e){a instanceof z||(a=z(a));var g=Sa(a,b,a,c,d,e);ba.$$addScopeClass(a);var f=null;return function(b,c,d){if(!a)throw aa("multilink");hb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var h=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;h&&h.$$boundTransclude&&(h=h.$$boundTransclude);f||(f=(d=d&&d[0])?"foreignobject"!==ya(d)&&ha.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==f?z(fa(f,z("<div></div>").append(a).html())):c?Ua.clone.call(a):
a;if(k)for(var l in k)d.data("$"+l+"Controller",k[l].instance);ba.$$addScopeInfo(d,b);c&&c(d,b);g&&g(b,d,d,h);c||(a=g=null);return d}}function Sa(a,b,c,d,e,g){function f(a,c,d,e){var g,k,l,m,p,n,H;if(K)for(H=Array(c.length),m=0;m<h.length;m+=3)g=h[m],H[g]=c[g];else H=c;m=0;for(p=h.length;m<p;)k=H[h[m++]],c=h[m++],g=h[m++],c?(c.scope?(l=a.$new(),ba.$$addScopeInfo(z(k),l)):l=a,n=c.transcludeOnThisElement?Qa(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?Qa(a,b):null,c(g,l,k,d,n)):g&&g(a,k.childNodes,
void 0,e)}for(var h=[],k=I(a)||a instanceof z,l,m,p,n,K,H=0;H<a.length;H++){l=new rc;11===Ba&&Ca(a,H,k);m=sc(a[H],[],l,0===H?d:void 0,e);(g=m.length?Y(m,a[H],l,b,c,null,[],[],g):null)&&g.scope&&ba.$$addScopeClass(l.$$element);l=g&&g.terminal||!(p=a[H].childNodes)||!p.length?null:Sa(p,g?(g.transcludeOnThisElement||!g.templateOnThisElement)&&g.transclude:b);if(g||l)h.push(H,g,l),n=!0,K=K||g;g=null}return n?f:null}function Ca(a,b,c){var d=a[b],e=d.parentNode,g;if(d.nodeType===Ma)for(;;){g=e?d.nextSibling:
a[b+1];if(!g||g.nodeType!==Ma)break;d.nodeValue+=g.nodeValue;g.parentNode&&g.parentNode.removeChild(g);c&&g===a[b+1]&&a.splice(b+1,1)}}function Qa(a,b,c){function d(e,g,f,h,k){e||(e=a.$new(!1,k),e.$$transcluded=!0);return b(e,g,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:h})}var e=d.$$slots=R(),g;for(g in b.$$slots)e[g]=b.$$slots[g]?Qa(a,b.$$slots[g],c):null;return d}function sc(a,b,c,d,e){var g=c.$attr,f;switch(a.nodeType){case 1:f=ya(a);X(b,Da(f),"E",d,e);for(var h,l,
m,p,n=a.attributes,K=0,H=n&&n.length;K<H;K++){var B=!1,w=!1;h=n[K];l=h.name;m=h.value;h=Da(l);(p=Na.test(h))&&(l=l.replace(qd,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()}));(h=h.match(Ra))&&ea(h[1])&&(B=l,w=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));h=Da(l.toLowerCase());g[h]=l;if(p||!c.hasOwnProperty(h))c[h]=m,md(a,h)&&(c[h]=!0);va(a,b,m,h,p);X(b,h,"A",d,e,B,w)}"input"===f&&"hidden"===a.getAttribute("type")&&a.setAttribute("autocomplete","off");if(!Ka)break;g=a.className;
G(g)&&(g=g.animVal);if(F(g)&&""!==g)for(;a=k.exec(g);)h=Da(a[2]),X(b,h,"C",d,e)&&(c[h]=Q(a[3])),g=g.substr(a.index+a[0].length);break;case Ma:ma(b,a.nodeValue);break;case 8:if(!Ja)break;M(a,b,c,d,e)}b.sort(ka);return b}function M(a,b,c,d,e){try{var f=g.exec(a.nodeValue);if(f){var h=Da(f[1]);X(b,h,"M",d,e)&&(c[h]=Q(f[2]))}}catch(k){}}function rd(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw aa("uterdir",b,c);1===a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);
d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return z(d)}function S(a,b,c){return function(d,e,g,f,h){e=rd(e[0],b,c);return a(d,e,g,f,h)}}function U(a,b,c,d,e,g){var f;return a?ba(b,c,d,e,g):function(){f||(f=ba(b,c,d,e,g),b=c=g=null);return f.apply(this,arguments)}}function Y(a,b,d,e,g,f,h,k,l){function m(a,b,c,d){if(a){c&&(a=S(a,c,d));a.require=t.require;a.directiveName=L;if(O===t||t.$$isolateScope)a=ta(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=S(b,c,d));b.require=t.require;b.directiveName=
L;if(O===t||t.$$isolateScope)b=ta(b,{isolateScope:!0});k.push(b)}}function p(a,e,g,f,l){function m(a,b,c,d){var e;bb(a)||(d=c,c=b,b=a,a=void 0);qa&&(e=E);c||(c=qa?L.parent():L);if(d){var g=l.$$slots[d];if(g)return g(a,b,e,c,ua);if(x(g))throw aa("noslot",d,za(L));}else return l(a,b,e,c,ua)}var n,t,v,s,T,E,V,L;b===g?(f=d,L=d.$$element):(L=z(g),f=new rc(L,d));T=e;O?s=e.$new(!0):H&&(T=e.$parent);l&&(V=m,V.$$boundTransclude=l,V.isSlotFilled=function(a){return!!l.$$slots[a]});w&&(E=ca(L,f,V,w,s,e,O));O&&
(ba.$$addScopeInfo(L,s,!0,!(A&&(A===O||A===O.$$originalDirective))),ba.$$addScopeClass(L,!0),s.$$isolateBindings=O.$$isolateBindings,t=oa(e,f,s,s.$$isolateBindings,O),t.removeWatches&&s.$on("$destroy",t.removeWatches));for(n in E){t=w[n];v=E[n];var Ib=t.$$bindings.bindToController;if(B){v.bindingInfo=Ib?oa(T,f,v.instance,Ib,t):{};var r=v();r!==v.instance&&(v.instance=r,L.data("$"+t.name+"Controller",r),v.bindingInfo.removeWatches&&v.bindingInfo.removeWatches(),v.bindingInfo=oa(T,f,v.instance,Ib,t))}else v.instance=
v(),L.data("$"+t.name+"Controller",v.instance),v.bindingInfo=oa(T,f,v.instance,Ib,t)}q(w,function(a,b){var c=a.require;a.bindToController&&!I(c)&&G(c)&&P(E[b].instance,W(b,c,L,E))});q(E,function(a){var b=a.instance;if(C(b.$onChanges))try{b.$onChanges(a.bindingInfo.initialChanges)}catch(d){c(d)}if(C(b.$onInit))try{b.$onInit()}catch(e){c(e)}C(b.$doCheck)&&(T.$watch(function(){b.$doCheck()}),b.$doCheck());C(b.$onDestroy)&&T.$on("$destroy",function(){b.$onDestroy()})});n=0;for(t=h.length;n<t;n++)v=h[n],
wa(v,v.isolateScope?s:e,L,f,v.require&&W(v.directiveName,v.require,L,E),V);var ua=e;O&&(O.template||null===O.templateUrl)&&(ua=s);a&&a(ua,g.childNodes,void 0,l);for(n=k.length-1;0<=n;n--)v=k[n],wa(v,v.isolateScope?s:e,L,f,v.require&&W(v.directiveName,v.require,L,E),V);q(E,function(a){a=a.instance;C(a.$postLink)&&a.$postLink()})}l=l||{};for(var n=-Number.MAX_VALUE,H=l.newScopeDirective,w=l.controllerDirectives,O=l.newIsolateScopeDirective,A=l.templateDirective,s=l.nonTlbTranscludeDirective,T=!1,E=
!1,qa=l.hasElementTranscludeDirective,v=d.$$element=z(b),t,L,V,r=e,ua,la=!1,u=!1,y,Ca=0,Oa=a.length;Ca<Oa;Ca++){t=a[Ca];var Pa=t.$$start,D=t.$$end;Pa&&(v=rd(b,Pa,D));V=void 0;if(n>t.priority)break;if(y=t.scope)t.templateUrl||(G(y)?($("new/isolated scope",O||H,t,v),O=t):$("new/isolated scope",O,t,v)),H=H||t;L=t.name;if(!la&&(t.replace&&(t.templateUrl||t.template)||t.transclude&&!t.$$tlb)){for(y=Ca+1;la=a[y++];)if(la.transclude&&!la.$$tlb||la.replace&&(la.templateUrl||la.template)){u=!0;break}la=!0}!t.templateUrl&&
t.controller&&(w=w||R(),$("'"+L+"' controller",w[L],t,v),w[L]=t);if(y=t.transclude)if(T=!0,t.$$tlb||($("transclusion",s,t,v),s=t),"element"===y)qa=!0,n=t.priority,V=v,v=d.$$element=z(ba.$$createComment(L,d[L])),b=v[0],ja(g,xa.call(V,0),b),V[0].$$parentNode=V[0].parentNode,r=U(u,V,e,n,f&&f.name,{nonTlbTranscludeDirective:s});else{var F=R();if(G(y)){V=[];var Qa=R(),M=R();q(y,function(a,b){var c="?"===a.charAt(0);a=c?a.substring(1):a;Qa[a]=b;F[b]=null;M[b]=c});q(v.contents(),function(a){var b=Qa[Da(ya(a))];
b?(M[b]=!0,F[b]=F[b]||[],F[b].push(a)):V.push(a)});q(M,function(a,b){if(!a)throw aa("reqslot",b);});for(var Sa in F)F[Sa]&&(F[Sa]=U(u,F[Sa],e))}else V=z(oc(b)).contents();v.empty();r=U(u,V,e,void 0,void 0,{needsNewScope:t.$$isolateScope||t.$$newScope});r.$$slots=F}if(t.template)if(E=!0,$("template",A,t,v),A=t,y=C(t.template)?t.template(v,d):t.template,y=Ha(y),t.replace){f=t;V=lc.test(y)?sd(fa(t.templateNamespace,Q(y))):[];b=V[0];if(1!==V.length||1!==b.nodeType)throw aa("tplrt",L,"");ja(g,v,b);Oa=
{$attr:{}};y=sc(b,[],Oa);var N=a.splice(Ca+1,a.length-(Ca+1));(O||H)&&Z(y,O,H);a=a.concat(y).concat(N);da(d,Oa);Oa=a.length}else v.html(y);if(t.templateUrl)E=!0,$("template",A,t,v),A=t,t.replace&&(f=t),p=ia(a.splice(Ca,a.length-Ca),v,d,g,T&&r,h,k,{controllerDirectives:w,newScopeDirective:H!==t&&H,newIsolateScopeDirective:O,templateDirective:A,nonTlbTranscludeDirective:s}),Oa=a.length;else if(t.compile)try{ua=t.compile(v,d,r);var tc=t.$$originalDirective||t;C(ua)?m(null,Ta(tc,ua),Pa,D):ua&&m(Ta(tc,
ua.pre),Ta(tc,ua.post),Pa,D)}catch(X){c(X,za(v))}t.terminal&&(p.terminal=!0,n=Math.max(n,t.priority))}p.scope=H&&!0===H.scope;p.transcludeOnThisElement=T;p.templateOnThisElement=E;p.transclude=r;l.hasElementTranscludeDirective=qa;return p}function W(a,b,c,d){var e;if(F(b)){var g=b.match(l);b=b.substring(g[0].length);var f=g[1]||g[3],g="?"===g[2];"^^"===f?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e=f?c.inheritedData(h):c.data(h)}if(!e&&!g)throw aa("ctreq",b,a);}else if(I(b))for(e=
[],f=0,g=b.length;f<g;f++)e[f]=W(a,b[f],c,d);else G(b)&&(e={},q(b,function(b,g){e[g]=W(a,b,c,d)}));return e||null}function ca(a,b,c,d,e,g,f){var h=R(),k;for(k in d){var l=d[k],m={$scope:l===f||l.$$isolateScope?e:g,$element:a,$attrs:b,$transclude:c},p=l.controller;"@"===p&&(p=b[l.name]);m=V(p,m,!0,l.controllerAs);h[l.name]=m;a.data("$"+l.name+"Controller",m.instance)}return h}function Z(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=$b(a[d],{$$isolateScope:b,$$newScope:c})}function X(b,c,e,g,h,k,l){if(c===
h)return null;var m=null;if(f.hasOwnProperty(c)){h=a.get(c+"Directive");for(var p=0,n=h.length;p<n;p++)if(c=h[p],(x(g)||g>c.priority)&&-1!==c.restrict.indexOf(e)){k&&(c=$b(c,{$$start:k,$$end:l}));if(!c.$$bindings){var H=m=c,K=c.name,t={isolateScope:null,bindToController:null};G(H.scope)&&(!0===H.bindToController?(t.bindToController=d(H.scope,K,!0),t.isolateScope={}):t.isolateScope=d(H.scope,K,!1));G(H.bindToController)&&(t.bindToController=d(H.bindToController,K,!0));if(t.bindToController&&!H.controller)throw aa("noctrl",
K);m=m.$$bindings=t;G(m.isolateScope)&&(c.$$isolateBindings=m.isolateScope)}b.push(c);m=c}}return m}function ea(b){if(f.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,e=c.length;d<e;d++)if(b=c[d],b.multiElement)return!0;return!1}function da(a,b){var c=b.$attr,d=a.$attr;q(a,function(d,e){"$"!==e.charAt(0)&&(b[e]&&b[e]!==d&&(d=d.length?d+(("style"===e?";":" ")+b[e]):b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,e){a.hasOwnProperty(e)||"$"===e.charAt(0)||(a[e]=b,"class"!==e&&"style"!==e&&(d[e]=c[e]))})}
function ia(a,b,d,g,f,h,k,l){var m=[],p,n,H=b[0],t=a.shift(),B=$b(t,{templateUrl:null,transclude:null,replace:null,$$originalDirective:t}),v=C(t.templateUrl)?t.templateUrl(b,d):t.templateUrl,O=t.templateNamespace;b.empty();e(v).then(function(c){var e,K;c=Ha(c);if(t.replace){c=lc.test(c)?sd(fa(O,Q(c))):[];e=c[0];if(1!==c.length||1!==e.nodeType)throw aa("tplrt",t.name,v);c={$attr:{}};ja(g,b,e);var w=sc(e,[],c);G(t.scope)&&Z(w,!0);a=w.concat(a);da(d,c)}else e=H,b.html(c);a.unshift(B);p=Y(a,e,d,f,b,t,
h,k,l);q(g,function(a,c){a===e&&(g[c]=b[0])});for(n=Sa(b[0].childNodes,f);m.length;){c=m.shift();K=m.shift();var s=m.shift(),A=m.shift(),w=b[0];if(!c.$$destroyed){if(K!==H){var T=K.className;l.hasElementTranscludeDirective&&t.replace||(w=oc(e));ja(s,z(K),w);Pa(z(w),T)}K=p.transcludeOnThisElement?Qa(c,p.transclude,A):A;p(n,c,w,g,K)}}m=null}).catch(function(a){bc(a)&&c(a)});return function(a,b,c,d,e){a=e;b.$$destroyed||(m?m.push(b,c,d,a):(p.transcludeOnThisElement&&(a=Qa(b,p.transclude,e)),p(n,b,c,
d,a)))}}function ka(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function $(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw aa("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,za(d));}function ma(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&ba.$$addBindingClass(a);return function(a,c){var e=c.parent();b||ba.$$addBindingClass(e);ba.$$addBindingInfo(e,d.expressions);
a.$watch(d,function(a){c[0].nodeValue=a})}}})}function fa(a,b){a=N(a||"html");switch(a){case "svg":case "math":var c=y.document.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function pa(a,b){if("srcdoc"===b)return qa.HTML;var c=ya(a);if("src"===b||"ngSrc"===b){if(-1===["img","video","audio","source","track"].indexOf(c))return qa.RESOURCE_URL}else if("xlinkHref"===b||"form"===c&&"action"===b||"link"===c&&"href"===b)return qa.RESOURCE_URL}
function va(a,c,d,e,g){var f=pa(a,e),k=h[e]||g,l=b(d,!g,f,k);if(l){if("multiple"===e&&"select"===ya(a))throw aa("selmulti",za(a));if(m.test(e))throw aa("nodomevents");c.push({priority:100,compile:function(){return{pre:function(a,c,g){c=g.$$observers||(g.$$observers=R());var h=g[e];h!==d&&(l=h&&b(h,!0,f,k),d=h);l&&(g[e]=l(a),(c[e]||(c[e]=[])).$$inter=!0,(g.$$observers&&g.$$observers[e].$$scope||a).$watch(l,function(a,b){"class"===e&&a!==b?g.$updateClass(a,b):g.$set(e,a)}))}}}})}}function ja(a,b,c){var d=
b[0],e=b.length,g=d.parentNode,f,h;if(a)for(f=0,h=a.length;f<h;f++)if(a[f]===d){a[f++]=c;h=f+e-1;for(var k=a.length;f<k;f++,h++)h<k?a[f]=a[h]:delete a[f];a.length-=e-1;a.context===d&&(a.context=c);break}g&&g.replaceChild(c,d);a=y.document.createDocumentFragment();for(f=0;f<e;f++)a.appendChild(b[f]);z.hasData(d)&&(z.data(c,z.data(d)),z(d).off("$destroy"));z.cleanData(a.querySelectorAll("*"));for(f=1;f<e;f++)delete b[f];b[0]=c;b.length=1}function ta(a,b){return P(function(){return a.apply(null,arguments)},
a,b)}function wa(a,b,d,e,g,f){try{a(b,d,e,g,f)}catch(h){c(h,za(d))}}function na(a,b){if(v)throw aa("missingattr",a,b);}function oa(a,c,d,e,g){function f(b,c,e){C(d.$onChanges)&&!cc(c,e)&&(ga||(a.$$postDigest(la),ga=[]),m||(m={},ga.push(h)),m[b]&&(e=m[b].previousValue),m[b]=new Jb(e,c))}function h(){d.$onChanges(m);m=void 0}var k=[],l={},m;q(e,function(e,h){var m=e.attrName,n=e.optional,K,B,w,v;switch(e.mode){case "@":n||ra.call(c,m)||(na(m,g.name),d[h]=c[m]=void 0);n=c.$observe(m,function(a){if(F(a)||
La(a))f(h,a,d[h]),d[h]=a});c.$$observers[m].$$scope=a;K=c[m];F(K)?d[h]=b(K)(a):La(K)&&(d[h]=K);l[h]=new Jb(uc,d[h]);k.push(n);break;case "=":if(!ra.call(c,m)){if(n)break;na(m,g.name);c[m]=void 0}if(n&&!c[m])break;B=p(c[m]);v=B.literal?sa:cc;w=B.assign||function(){K=d[h]=B(a);throw aa("nonassign",c[m],m,g.name);};K=d[h]=B(a);n=function(b){v(b,d[h])||(v(b,K)?w(a,b=d[h]):d[h]=b);return K=b};n.$stateful=!0;n=e.collection?a.$watchCollection(c[m],n):a.$watch(p(c[m],n),null,B.literal);k.push(n);break;case "<":if(!ra.call(c,
m)){if(n)break;na(m,g.name);c[m]=void 0}if(n&&!c[m])break;B=p(c[m]);var O=B.literal,s=d[h]=B(a);l[h]=new Jb(uc,d[h]);n=a.$watch(B,function(a,b){if(b===a){if(b===s||O&&sa(b,s))return;b=s}f(h,a,b);d[h]=a},O);k.push(n);break;case "&":n||ra.call(c,m)||na(m,g.name);B=c.hasOwnProperty(m)?p(c[m]):D;if(B===D&&n)break;d[h]=function(b){return B(a,b)}}});return{initialChanges:l,removeWatches:k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}}var Ia=/^\w/,Aa=y.document.createElement("div"),Ja=A,Ka=
s,Ea=E,ga;rc.prototype={$normalize:Da,$addClass:function(a){a&&0<a.length&&L.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&L.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=td(a,b);c&&c.length&&L.addClass(this.$$element,c);(c=td(b,a))&&c.length&&L.removeClass(this.$$element,c)},$set:function(a,b,d,e){var g=md(this.$$element[0],a),f=ud[a],h=a;g?(this.$$element.prop(a,b),e=g):f&&(this[f]=b,h=f);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Xc(a,
"-"));g=ya(this.$$element);if("a"===g&&("href"===a||"xlinkHref"===a)||"img"===g&&"src"===a)this[a]=b=null==b?b:r(b,"src"===a);else if("img"===g&&"srcset"===a&&u(b)){for(var g="",f=Q(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(f)?k:/(,)/,f=f.split(k),k=Math.floor(f.length/2),l=0;l<k;l++)var m=2*l,g=g+r(Q(f[m]),!0),g=g+(" "+Q(f[m+1]));f=Q(f[2*l]).split(/\s/);g+=r(Q(f[0]),!0);2===f.length&&(g+=" "+Q(f[1]));this[a]=b=g}!1!==d&&(null==b?this.$$element.removeAttr(e):Ia.test(e)?this.$$element.attr(e,
b):Oa(this.$$element[0],e,b));(a=this.$$observers)&&q(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=R()),e=d[a]||(d[a]=[]);e.push(b);O.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||x(c[a])||b(c[a])});return function(){cb(e,b)}}};var Fa=b.startSymbol(),Ga=b.endSymbol(),Ha="{{"===Fa&&"}}"===Ga?ab:function(a){return a.replace(/\{\{/g,Fa).replace(/}}/g,Ga)},Na=/^ngAttr[A-Z]/,Ra=/^(.+)Start$/;ba.$$addBindingInfo=n?function(a,b){var c=
a.data("$binding")||[];I(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:D;ba.$$addBindingClass=n?function(a){Pa(a,"ng-binding")}:D;ba.$$addScopeInfo=n?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:D;ba.$$addScopeClass=n?function(a,b){Pa(a,b?"ng-isolate-scope":"ng-scope")}:D;ba.$$createComment=function(a,b){var c="";n&&(c=" "+(a||"")+": ",b&&(c+=b+" "));return y.document.createComment(c)};return ba}]}function Jb(a,b){this.previousValue=a;this.currentValue=b}
function Da(a){return a.replace(qd,"").replace(vg,function(a,d,c){return c?d.toUpperCase():d})}function td(a,b){var d="",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],k=0;k<e.length;k++)if(g===e[k])continue a;d+=(0<d.length?" ":"")+g}return d}function sd(a){a=z(a);var b=a.length;if(1>=b)return a;for(;b--;){var d=a[b];(8===d.nodeType||d.nodeType===Ma&&""===d.nodeValue.trim())&&wg.call(a,b,1)}return a}function ug(a,b){if(b&&F(b))return b;if(F(a)){var d=vd.exec(a);if(d)return d[3]}}
function Af(){var a={},b=!1;this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,c){Ha(b,"controller");G(b)?P(a,b):a[b]=c};this.allowGlobals=function(){b=!0};this.$get=["$injector","$window",function(d,c){function e(a,b,c,d){if(!a||!G(a.$scope))throw M("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,g,k,h){var l,m,p;k=!0===k;h&&F(h)&&(p=h);if(F(f)){h=f.match(vd);if(!h)throw wd("ctrlfmt",f);m=h[1];p=p||h[3];f=a.hasOwnProperty(m)?a[m]:Zc(g.$scope,m,!0)||(b?Zc(c,m,!0):
void 0);if(!f)throw wd("ctrlreg",m);sb(f,m,!0)}if(k)return k=(I(f)?f[f.length-1]:f).prototype,l=Object.create(k||null),p&&e(g,p,l,m||f.name),P(function(){var a=d.invoke(f,l,g,m);a!==l&&(G(a)||C(a))&&(l=a,p&&e(g,p,l,m||f.name));return l},{instance:l,identifier:p});l=d.instantiate(f,g,m);p&&e(g,p,l,m||f.name);return l}}]}function Bf(){this.$get=["$window",function(a){return z(a.document)}]}function Cf(){this.$get=["$document","$rootScope",function(a,b){function d(){e=c.hidden}var c=a[0],e=c&&c.hidden;
a.on("visibilitychange",d);b.$on("$destroy",function(){a.off("visibilitychange",d)});return function(){return e}}]}function Df(){this.$get=["$log",function(a){return function(b,d){a.error.apply(a,arguments)}}]}function vc(a){return G(a)?da(a)?a.toISOString():eb(a):a}function If(){this.$get=function(){return function(a){if(!a)return"";var b=[];Qc(a,function(a,c){null===a||x(a)||C(a)||(I(a)?q(a,function(a){b.push(ia(c)+"="+ia(vc(a)))}):b.push(ia(c)+"="+ia(vc(a))))});return b.join("&")}}}function Jf(){this.$get=
function(){return function(a){function b(a,e,f){null===a||x(a)||(I(a)?q(a,function(a,c){b(a,e+"["+(G(a)?c:"")+"]")}):G(a)&&!da(a)?Qc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):d.push(ia(e)+"="+ia(vc(a))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function wc(a,b){if(F(a)){var d=a.replace(xg,"").trim();if(d){var c=b("Content-Type"),c=c&&0===c.indexOf(xd),e;(e=c)||(e=(e=d.match(yg))&&zg[e[0]].test(d));if(e)try{a=Tc(d)}catch(f){if(!c)return a;throw Kb("baddata",a,f);}}}return a}function yd(a){var b=
R(),d;F(a)?q(a.split("\n"),function(a){d=a.indexOf(":");var e=N(Q(a.substr(0,d)));a=Q(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):G(a)&&q(a,function(a,d){var f=N(d),g=Q(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function zd(a){var b;return function(d){b||(b=yd(a));return d?(d=b[N(d)],void 0===d&&(d=null),d):b}}function Ad(a,b,d,c){if(C(c))return c(a,b,d);q(c,function(c){a=c(a,b,d)});return a}function Hf(){var a=this.defaults={transformResponse:[wc],transformRequest:[function(a){return G(a)&&"[object File]"!==
ha.call(a)&&"[object Blob]"!==ha.call(a)&&"[object FormData]"!==ha.call(a)?eb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:pa(xc),put:pa(xc),patch:pa(xc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer",jsonpCallbackParam:"callback"},b=!1;this.useApplyAsync=function(a){return u(a)?(b=!!a,this):b};var d=this.interceptors=[],c=this.xsrfWhitelistedOrigins=[];this.$get=["$browser","$httpBackend","$$cookieReader","$cacheFactory",
"$rootScope","$q","$injector","$sce",function(e,f,g,k,h,l,m,p){function n(b){function c(a,b){for(var d=0,e=b.length;d<e;){var g=b[d++],f=b[d++];a=a.then(g,f)}b.length=0;return a}function d(a,b){var c,e={};q(a,function(a,d){C(a)?(c=a(b),null!=c&&(e[d]=c)):e[d]=a});return e}function g(a){var b=P({},a);b.data=Ad(a.data,a.headers,a.status,f.transformResponse);a=a.status;return 200<=a&&300>a?b:l.reject(b)}if(!G(b))throw M("$http")("badreq",b);if(!F(p.valueOf(b.url)))throw M("$http")("badreq",b.url);var f=
P({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer,jsonpCallbackParam:a.jsonpCallbackParam},b);f.headers=function(b){var c=a.headers,e=P({},b.headers),g,f,h,c=P({},c.common,c[N(b.method)]);a:for(g in c){f=N(g);for(h in e)if(N(h)===f)continue a;e[g]=c[g]}return d(e,pa(b))}(b);f.method=ub(f.method);f.paramSerializer=F(f.paramSerializer)?m.get(f.paramSerializer):f.paramSerializer;e.$$incOutstandingRequestCount();var h=[],k=[];b=
l.resolve(f);q(s,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&k.push(a.response,a.responseError)});b=c(b,h);b=b.then(function(b){var c=b.headers,d=Ad(b.data,zd(c),void 0,b.transformRequest);x(d)&&q(c,function(a,b){"content-type"===N(b)&&delete c[b]});x(b.withCredentials)&&!x(a.withCredentials)&&(b.withCredentials=a.withCredentials);return B(b,d).then(g,g)});b=c(b,k);return b=b.finally(function(){e.$$completeOutstandingRequest(D)})}function B(c,
d){function e(a){if(a){var c={};q(a,function(a,d){c[d]=function(c){function d(){a(c)}b?h.$applyAsync(d):h.$$phase?d():h.$apply(d)}});return c}}function k(a,c,d,e,g){function f(){m(c,a,d,e,g)}L&&(200<=a&&300>a?L.put(z,[a,c,yd(d),e,g]):L.remove(z));b?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function m(a,b,d,e,g){b=-1<=b?b:0;(200<=b&&300>b?s.resolve:s.reject)({data:a,status:b,headers:zd(d),config:c,statusText:e,xhrStatus:g})}function t(a){m(a.data,a.status,pa(a.headers()),a.statusText,a.xhrStatus)}
function B(){var a=n.pendingRequests.indexOf(c);-1!==a&&n.pendingRequests.splice(a,1)}var s=l.defer(),qa=s.promise,L,r,la=c.headers,y="jsonp"===N(c.method),z=c.url;y?z=p.getTrustedResourceUrl(z):F(z)||(z=p.valueOf(z));z=v(z,c.paramSerializer(c.params));y&&(z=E(z,c.jsonpCallbackParam));n.pendingRequests.push(c);qa.then(B,B);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(L=G(c.cache)?c.cache:G(a.cache)?a.cache:A);L&&(r=L.get(z),u(r)?r&&C(r.then)?r.then(t,t):I(r)?m(r[1],r[0],
pa(r[2]),r[3],r[4]):m(r,200,{},"OK","complete"):L.put(z,qa));x(r)&&((r=J(c.url)?g()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(la[c.xsrfHeaderName||a.xsrfHeaderName]=r),f(c.method,z,d,k,la,c.timeout,c.withCredentials,c.responseType,e(c.eventHandlers),e(c.uploadEventHandlers)));return qa}function v(a,b){0<b.length&&(a+=(-1===a.indexOf("?")?"?":"&")+b);return a}function E(a,b){var c=a.split("?");if(2<c.length)throw Kb("badjsonp",a);c=fc(c[1]);q(c,function(c,d){if("JSON_CALLBACK"===c)throw Kb("badjsonp",
a);if(d===b)throw Kb("badjsonp",b,a);});return a+=(-1===a.indexOf("?")?"?":"&")+b+"=JSON_CALLBACK"}var A=k("$http");a.paramSerializer=F(a.paramSerializer)?m.get(a.paramSerializer):a.paramSerializer;var s=[];q(d,function(a){s.unshift(F(a)?m.get(a):m.invoke(a))});var J=Ag(c);n.pendingRequests=[];(function(a){q(arguments,function(a){n[a]=function(b,c){return n(P({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){n[a]=function(b,c,d){return n(P({},d||
{},{method:a,url:b,data:c}))}})})("post","put","patch");n.defaults=a;return n}]}function Lf(){this.$get=function(){return function(){return new y.XMLHttpRequest}}}function Kf(){this.$get=["$browser","$jsonpCallbacks","$document","$xhrFactory",function(a,b,d,c){return Bg(a,c,a.defer,b,d[0])}]}function Bg(a,b,d,c,e){function f(a,b,d){a=a.replace("JSON_CALLBACK",b);var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m);f.removeEventListener("error",
m);e.body.removeChild(f);f=null;var g=-1,B="unknown";a&&("load"!==a.type||c.wasCalled(b)||(a={type:"error"}),B=a.type,g="error"===a.type?404:200);d&&d(g,B)};f.addEventListener("load",m);f.addEventListener("error",m);e.body.appendChild(f);return m}return function(e,k,h,l,m,p,n,B,v,E){function A(a){H="timeout"===a;r&&r();w&&w.abort()}function s(a,b,c,e,g,f){u(T)&&d.cancel(T);r=w=null;a(b,c,e,g,f)}k=k||a.url();if("jsonp"===N(e))var J=c.createCallback(k),r=f(k,J,function(a,b){var d=200===a&&c.getResponse(J);
s(l,a,d,"",b,"complete");c.removeCallback(J)});else{var w=b(e,k),H=!1;w.open(e,k,!0);q(m,function(a,b){u(a)&&w.setRequestHeader(b,a)});w.onload=function(){var a=w.statusText||"",b="response"in w?w.response:w.responseText,c=1223===w.status?204:w.status;0===c&&(c=b?200:"file"===ma(k).protocol?404:0);s(l,c,b,w.getAllResponseHeaders(),a,"complete")};w.onerror=function(){s(l,-1,null,null,"","error")};w.ontimeout=function(){s(l,-1,null,null,"","timeout")};w.onabort=function(){s(l,-1,null,null,"",H?"timeout":
"abort")};q(v,function(a,b){w.addEventListener(b,a)});q(E,function(a,b){w.upload.addEventListener(b,a)});n&&(w.withCredentials=!0);if(B)try{w.responseType=B}catch(K){if("json"!==B)throw K;}w.send(x(h)?null:h)}if(0<p)var T=d(function(){A("timeout")},p);else p&&C(p.then)&&p.then(function(){A(u(p.$$timeoutId)?"timeout":"abort")})}}function Ff(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler",
"$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(p,a).replace(n,b)}function k(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function h(f,h,p,n){function s(a){try{var b=a;a=p?e.getTrusted(p,b):e.valueOf(b);return n&&!u(a)?a:hc(a)}catch(d){c(Ea.interr(f,d))}}if(!f.length||-1===f.indexOf(a)){var J;h||(h=g(f),J=ka(h),J.exp=f,J.expressions=[],J.$$watchDelegate=k);return J}n=!!n;var q,w,H=0,K=[],T=[];J=f.length;for(var t=[],r=[];H<J;)if(-1!==(q=f.indexOf(a,
H))&&-1!==(w=f.indexOf(b,q+l)))H!==q&&t.push(g(f.substring(H,q))),H=f.substring(q+l,w),K.push(H),T.push(d(H,s)),H=w+m,r.push(t.length),t.push("");else{H!==J&&t.push(g(f.substring(H)));break}p&&1<t.length&&Ea.throwNoconcat(f);if(!h||K.length){var O=function(a){for(var b=0,c=K.length;b<c;b++){if(n&&x(a[b]))return;t[r[b]]=a[b]}return t.join("")};return P(function(a){var b=0,d=K.length,e=Array(d);try{for(;b<d;b++)e[b]=T[b](a);return O(e)}catch(g){c(Ea.interr(f,g))}},{exp:f,expressions:K,$$watchDelegate:function(a,
b){var c;return a.$watchGroup(T,function(d,e){var g=O(d);b.call(this,g,d!==e?c:g,a);c=g})}})}}var l=a.length,m=b.length,p=new RegExp(a.replace(/./g,f),"g"),n=new RegExp(b.replace(/./g,f),"g");h.startSymbol=function(){return a};h.endSymbol=function(){return b};return h}]}function Gf(){this.$get=["$rootScope","$window","$q","$$q","$browser",function(a,b,d,c,e){function f(f,h,l,m){function p(){n?f.apply(null,B):f(A)}var n=4<arguments.length,B=n?xa.call(arguments,4):[],v=b.setInterval,E=b.clearInterval,
A=0,s=u(m)&&!m,J=(s?c:d).defer(),q=J.promise;l=u(l)?l:0;q.$$intervalId=v(function(){s?e.defer(p):a.$evalAsync(p);J.notify(A++);0<l&&A>=l&&(J.resolve(A),E(q.$$intervalId),delete g[q.$$intervalId]);s||a.$apply()},h);g[q.$$intervalId]=J;return q}var g={};f.cancel=function(a){return a&&a.$$intervalId in g?(g[a.$$intervalId].promise.$$state.pur=!0,g[a.$$intervalId].reject("canceled"),b.clearInterval(a.$$intervalId),delete g[a.$$intervalId],!0):!1};return f}]}function yc(a){a=a.split("/");for(var b=a.length;b--;)a[b]=
fb(a[b].replace(/%2F/g,"/"));return a.join("/")}function Bd(a,b){var d=ma(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=Z(d.port)||Cg[d.protocol]||null}function Cd(a,b,d){if(Dg.test(a))throw kb("badpath",a);var c="/"!==a.charAt(0);c&&(a="/"+a);a=ma(a);for(var c=(c&&"/"===a.pathname.charAt(0)?a.pathname.substring(1):a.pathname).split("/"),e=c.length;e--;)c[e]=decodeURIComponent(c[e]),d&&(c[e]=c[e].replace(/\//g,"%2F"));d=c.join("/");b.$$path=d;b.$$search=fc(a.search);b.$$hash=decodeURIComponent(a.hash);
b.$$path&&"/"!==b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function zc(a,b){return a.slice(0,b.length)===b}function va(a,b){if(zc(b,a))return b.substr(a.length)}function Ka(a){var b=a.indexOf("#");return-1===b?a:a.substr(0,b)}function lb(a){return a.replace(/(#.+)|#$/,"$1")}function Ac(a,b,d){this.$$html5=!0;d=d||"";Bd(a,this);this.$$parse=function(a){var d=va(b,a);if(!F(d))throw kb("ipthprfx",a,b);Cd(d,this,!0);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=gc(this.$$search),
d=this.$$hash?"#"+fb(this.$$hash):"";this.$$url=yc(this.$$path)+(a?"?"+a:"")+d;this.$$absUrl=b+this.$$url.substr(1);this.$$urlUpdatedByLocation=!0};this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;u(f=va(a,c))?(g=f,g=d&&u(f=va(d,f))?b+(va("/",f)||f):a+g):u(f=va(b,c))?g=b+f:b===c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function Bc(a,b,d){Bd(a,this);this.$$parse=function(c){var e=va(a,c)||va(b,c),f;x(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",x(e)&&(a=c,
this.replace())):(f=va(d,e),x(f)&&(f=e));Cd(f,this,!1);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;zc(f,e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?f[1]:c);this.$$path=c;this.$$compose()};this.$$compose=function(){var b=gc(this.$$search),e=this.$$hash?"#"+fb(this.$$hash):"";this.$$url=yc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+(this.$$url?d+this.$$url:"");this.$$urlUpdatedByLocation=!0};this.$$parseLinkUrl=function(b,d){return Ka(a)===Ka(b)?(this.$$parse(b),!0):!1}}function Dd(a,b,d){this.$$html5=
!0;Bc.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a===Ka(c)?f=c:(g=va(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$compose=function(){var b=gc(this.$$search),e=this.$$hash?"#"+fb(this.$$hash):"";this.$$url=yc(this.$$path)+(b?"?"+b:"")+e;this.$$absUrl=a+d+this.$$url;this.$$urlUpdatedByLocation=!0}}function Lb(a){return function(){return this[a]}}function Ed(a,b){return function(d){if(x(d))return this[a];this[a]=
b(d);this.$$compose();return this}}function Nf(){var a="!",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return u(b)?(a=b,this):a};this.html5Mode=function(a){if(La(a))return b.enabled=a,this;if(G(a)){La(a.enabled)&&(b.enabled=a.enabled);La(a.requireBase)&&(b.requireBase=a.requireBase);if(La(a.rewriteLinks)||F(a.rewriteLinks))b.rewriteLinks=a.rewriteLinks;return this}return b};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(d,c,e,f,g){function k(a,
b,d){var e=l.url(),g=l.$$state;try{c.url(a,b,d),l.$$state=c.state()}catch(f){throw l.url(e),l.$$state=g,f;}}function h(a,b){d.$broadcast("$locationChangeSuccess",l.absUrl(),a,l.$$state,b)}var l,m;m=c.baseHref();var p=c.url(),n;if(b.enabled){if(!m&&b.requireBase)throw kb("nobase");n=p.substring(0,p.indexOf("/",p.indexOf("//")+2))+(m||"/");m=e.history?Ac:Dd}else n=Ka(p),m=Bc;var B=n.substr(0,Ka(n).lastIndexOf("/")+1);l=new m(n,B,"#"+a);l.$$parseLinkUrl(p,p);l.$$state=c.state();var v=/^\s*(javascript|mailto):/i;
f.on("click",function(a){var e=b.rewriteLinks;if(e&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!==a.which&&2!==a.button){for(var h=z(a.target);"a"!==ya(h[0]);)if(h[0]===f[0]||!(h=h.parent())[0])return;if(!F(e)||!x(h.attr(e))){var e=h.prop("href"),k=h.attr("href")||h.attr("xlink:href");G(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=ma(e.animVal).href);v.test(e)||!e||h.attr("target")||a.isDefaultPrevented()||!l.$$parseLinkUrl(e,k)||(a.preventDefault(),l.absUrl()!==c.url()&&(d.$apply(),g.angular["ff-684208-preventDefault"]=
!0))}}});lb(l.absUrl())!==lb(p)&&c.url(l.absUrl(),!0);var q=!0;c.onUrlChange(function(a,b){zc(a,B)?(d.$evalAsync(function(){var c=l.absUrl(),e=l.$$state,g;a=lb(a);l.$$parse(a);l.$$state=b;g=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;l.absUrl()===a&&(g?(l.$$parse(c),l.$$state=e,k(c,!1,e)):(q=!1,h(c,e)))}),d.$$phase||d.$digest()):g.location.href=a});d.$watch(function(){if(q||l.$$urlUpdatedByLocation){l.$$urlUpdatedByLocation=!1;var a=lb(c.url()),b=lb(l.absUrl()),g=c.state(),f=l.$$replace,
m=a!==b||l.$$html5&&e.history&&g!==l.$$state;if(q||m)q=!1,d.$evalAsync(function(){var b=l.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,l.$$state,g).defaultPrevented;l.absUrl()===b&&(c?(l.$$parse(a),l.$$state=g):(m&&k(b,f,g===l.$$state?null:l.$$state),h(a,g)))})}l.$$replace=!1});return l}]}function Of(){var a=!0,b=this;this.debugEnabled=function(b){return u(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){bc(a)&&(a.stack&&f?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+
a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||D;return function(){var a=[];q(arguments,function(b){a.push(c(b))});return Function.prototype.apply.call(e,b,a)}}var f=Ba||/\bEdge\//.test(d.navigator&&d.navigator.userAgent);return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,arguments)}}()}}]}function Eg(a){return a+""}function Fg(a,
b){return"undefined"!==typeof a?a:b}function Fd(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function Gg(a,b){switch(a.type){case r.MemberExpression:if(a.computed)return!1;break;case r.UnaryExpression:return 1;case r.BinaryExpression:return"+"!==a.operator?1:!1;case r.CallExpression:return!1}return void 0===b?Gd:b}function U(a,b,d){var c,e,f=a.isPure=Gg(a,d);switch(a.type){case r.Program:c=!0;q(a.body,function(a){U(a.expression,b,f);c=c&&a.expression.constant});a.constant=c;break;
case r.Literal:a.constant=!0;a.toWatch=[];break;case r.UnaryExpression:U(a.argument,b,f);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case r.BinaryExpression:U(a.left,b,f);U(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case r.LogicalExpression:U(a.left,b,f);U(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case r.ConditionalExpression:U(a.test,b,f);U(a.alternate,b,f);
U(a.consequent,b,f);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case r.Identifier:a.constant=!1;a.toWatch=[a];break;case r.MemberExpression:U(a.object,b,f);a.computed&&U(a.property,b,f);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=a.constant?[]:[a];break;case r.CallExpression:c=d=a.filter?!b(a.callee.name).$stateful:!1;e=[];q(a.arguments,function(a){U(a,b,f);c=c&&a.constant;e.push.apply(e,a.toWatch)});a.constant=
c;a.toWatch=d?e:[a];break;case r.AssignmentExpression:U(a.left,b,f);U(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case r.ArrayExpression:c=!0;e=[];q(a.elements,function(a){U(a,b,f);c=c&&a.constant;e.push.apply(e,a.toWatch)});a.constant=c;a.toWatch=e;break;case r.ObjectExpression:c=!0;e=[];q(a.properties,function(a){U(a.value,b,f);c=c&&a.value.constant;e.push.apply(e,a.value.toWatch);a.computed&&(U(a.key,b,!1),c=c&&a.key.constant,e.push.apply(e,a.key.toWatch))});a.constant=
c;a.toWatch=e;break;case r.ThisExpression:a.constant=!1;a.toWatch=[];break;case r.LocalsExpression:a.constant=!1,a.toWatch=[]}}function Hd(a){if(1===a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:void 0}}function Id(a){return a.type===r.Identifier||a.type===r.MemberExpression}function Jd(a){if(1===a.body.length&&Id(a.body[0].expression))return{type:r.AssignmentExpression,left:a.body[0].expression,right:{type:r.NGValueParameter},operator:"="}}function Kd(a){this.$filter=
a}function Ld(a){this.$filter=a}function Mb(a,b,d){this.ast=new r(a,d);this.astCompiler=d.csp?new Ld(b):new Kd(b)}function Cc(a){return C(a.valueOf)?a.valueOf():Hg.call(a)}function Pf(){var a=R(),b={"true":!0,"false":!1,"null":null,undefined:void 0},d,c;this.addLiteral=function(a,c){b[a]=c};this.setIdentifierFns=function(a,b){d=a;c=b;return this};this.$get=["$filter",function(e){function f(b,c){var d,g;switch(typeof b){case "string":return g=b=b.trim(),d=a[g],d||(d=new Nb(n),d=(new Mb(d,e,n)).parse(b),
d.constant?d.$$watchDelegate=m:d.oneTime?d.$$watchDelegate=d.literal?l:h:d.inputs&&(d.$$watchDelegate=k),a[g]=d),p(d,c);case "function":return p(b,c);default:return p(D,c)}}function g(a,b,c){return null==a||null==b?a===b:"object"!==typeof a||(a=Cc(a),"object"!==typeof a||c)?a===b||a!==a&&b!==b:!1}function k(a,b,c,d,e){var f=d.inputs,h;if(1===f.length){var k=g,f=f[0];return a.$watch(function(a){var b=f(a);g(b,k,f.isPure)||(h=d(a,void 0,void 0,[b]),k=b&&Cc(b));return h},b,c,e)}for(var l=[],m=[],p=0,
n=f.length;p<n;p++)l[p]=g,m[p]=null;return a.$watch(function(a){for(var b=!1,c=0,e=f.length;c<e;c++){var k=f[c](a);if(b||(b=!g(k,l[c],f[c].isPure)))m[c]=k,l[c]=k&&Cc(k)}b&&(h=d(a,void 0,void 0,m));return h},b,c,e)}function h(a,b,c,d,e){function g(a){return d(a)}function f(a,c,d){l=a;C(b)&&b(a,c,d);u(a)&&d.$$postDigest(function(){u(l)&&h()})}var h,l;return h=d.inputs?k(a,f,c,d,e):a.$watch(g,f,c)}function l(a,b,c,d){function e(a){var b=!0;q(a,function(a){u(a)||(b=!1)});return b}var g,f;return g=a.$watch(function(a){return d(a)},
function(a,c,d){f=a;C(b)&&b(a,c,d);e(a)&&d.$$postDigest(function(){e(f)&&g()})},c)}function m(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,d=!1,e=c!==l&&c!==h?function(c,e,g,f){g=d&&f?f[0]:a(c,e,g,f);return b(g,c,e)}:function(c,d,e,g){e=a(c,d,e,g);c=b(e,c,d);return u(e)?c:e},d=!a.inputs;c&&c!==k?(e.$$watchDelegate=c,e.inputs=a.inputs):b.$stateful||(e.$$watchDelegate=k,e.inputs=a.inputs?a.inputs:[a]);e.inputs&&(e.inputs=e.inputs.map(function(a){return a.isPure===
Gd?function(b){return a(b)}:a}));return e}var n={csp:Ia().noUnsafeEval,literals:na(b),isIdentifierStart:C(d)&&d,isIdentifierContinue:C(c)&&c};f.$$getAst=function(a){var b=new Nb(n);return(new Mb(b,e,n)).getAst(a).ast};return f}]}function Rf(){var a=!0;this.$get=["$rootScope","$exceptionHandler",function(b,d){return Md(function(a){b.$evalAsync(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return u(b)?(a=b,this):a}}function Sf(){var a=!0;this.$get=["$browser","$exceptionHandler",function(b,
d){return Md(function(a){b.defer(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return u(b)?(a=b,this):a}}function Md(a,b,d){function c(){return new e}function e(){var a=this.promise=new f;this.resolve=function(b){h(a,b)};this.reject=function(b){m(a,b)};this.notify=function(b){n(a,b)}}function f(){this.$$state={status:0}}function g(){for(;!J&&u.length;){var a=u.shift();if(!a.pur){a.pur=!0;var c=a.value,c="Possibly unhandled rejection: "+("function"===typeof c?c.toString().replace(/ \{[\s\S]*$/,
""):x(c)?"undefined":"string"!==typeof c?Fe(c,void 0):c);bc(a.value)?b(a.value,c):b(c)}}}function k(c){!d||c.pending||2!==c.status||c.pur||(0===J&&0===u.length&&a(g),u.push(c));!c.processScheduled&&c.pending&&(c.processScheduled=!0,++J,a(function(){var e,f,k;k=c.pending;c.processScheduled=!1;c.pending=void 0;try{for(var l=0,p=k.length;l<p;++l){c.pur=!0;f=k[l][0];e=k[l][c.status];try{C(e)?h(f,e(c.value)):1===c.status?h(f,c.value):m(f,c.value)}catch(n){m(f,n),n&&!0===n.$$passToExceptionHandler&&b(n)}}}finally{--J,
d&&0===J&&a(g)}}))}function h(a,b){a.$$state.status||(b===a?p(a,s("qcycle",b)):l(a,b))}function l(a,b){function c(b){g||(g=!0,l(a,b))}function d(b){g||(g=!0,p(a,b))}function e(b){n(a,b)}var f,g=!1;try{if(G(b)||C(b))f=b.then;C(f)?(a.$$state.status=-1,f.call(b,c,d,e)):(a.$$state.value=b,a.$$state.status=1,k(a.$$state))}catch(h){d(h)}}function m(a,b){a.$$state.status||p(a,b)}function p(a,b){a.$$state.value=b;a.$$state.status=2;k(a.$$state)}function n(c,d){var e=c.$$state.pending;0>=c.$$state.status&&
e&&e.length&&a(function(){for(var a,c,f=0,g=e.length;f<g;f++){c=e[f][0];a=e[f][3];try{n(c,C(a)?a(d):d)}catch(h){b(h)}}})}function B(a){var b=new f;m(b,a);return b}function v(a,b,c){var d=null;try{C(c)&&(d=c())}catch(e){return B(e)}return d&&C(d.then)?d.then(function(){return b(a)},B):b(a)}function r(a,b,c,d){var e=new f;h(e,a);return e.then(b,c,d)}function A(a){if(!C(a))throw s("norslvr",a);var b=new f;a(function(a){h(b,a)},function(a){m(b,a)});return b}var s=M("$q",TypeError),J=0,u=[];P(f.prototype,
{then:function(a,b,c){if(x(a)&&x(b)&&x(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&k(this.$$state);return d},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return v(b,w,a)},function(b){return v(b,B,a)},b)}});var w=r;A.prototype=f.prototype;A.defer=c;A.reject=B;A.when=r;A.resolve=w;A.all=function(a){var b=new f,c=0,d=I(a)?[]:{};q(a,function(a,e){c++;r(a).then(function(a){d[e]=
a;--c||h(b,d)},function(a){m(b,a)})});0===c&&h(b,d);return b};A.race=function(a){var b=c();q(a,function(a){r(a).then(b.resolve,b.reject)});return b.promise};return A}function ag(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};
f.supported=e;return f}]}function Qf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++qb;this.$$ChildScope=null;this.$$suspended=!1}b.prototype=a;return b}var b=10,d=M("$rootScope"),c=null,e=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(f,g,k){function h(a){a.currentScope.$$destroyed=!0}function l(a){9===
Ba&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++qb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$suspended=this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function p(a){if(s.$$phase)throw d("inprog",
s.$$phase);s.$$phase=a}function n(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function B(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function v(){}function r(){for(;w.length;)try{w.shift()()}catch(a){f(a)}e=null}function A(){null===e&&(e=k.defer(function(){s.$apply(r)}))}m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);
d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!==this)&&d.$on("$destroy",h);return d},$watch:function(a,b,d,e){var f=g(a);b=C(b)?b:D;if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var h=this,k=h.$$watchers,l={fn:b,last:v,get:f,exp:e||a,eq:!!d};c=null;k||(k=h.$$watchers=[],k.$$digestWatchIndex=-1);k.unshift(l);k.$$digestWatchIndex++;n(this,1);return function(){var a=cb(k,l);0<=a&&(n(h,-1),a<k.$$digestWatchIndex&&
k.$$digestWatchIndex--);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});q(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,
b){function c(a){e=a;var b,d,g,h;if(!x(e)){if(G(e))if(ja(e))for(f!==p&&(f=p,q=f.length=0,l++),a=e.length,q!==a&&(l++,f.length=q=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==n&&(f=n={},q=0,l++);a=0;for(b in e)ra.call(e,b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(q++,f[b]=g,l++));if(q>a)for(b in l++,f)ra.call(e,b)||(q--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),p=[],n={},B=!0,q=0;return this.$watch(m,
function(){B?(B=!1,b(e,e,d)):b(e,h,d);if(k)if(G(e))if(ja(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)ra.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,g,h,l,m,n,q,B=b,w,A=[],z,y;p("$digest");k.$$checkUrlChange();this===s&&null!==e&&(k.defer.cancel(e),r());c=null;do{q=!1;w=this;for(n=0;n<J.length;n++){try{y=J[n],l=y.fn,l(y.scope,y.locals)}catch(x){f(x)}c=null}J.length=0;a:do{if(n=!w.$$suspended&&w.$$watchers)for(n.$$digestWatchIndex=n.length;n.$$digestWatchIndex--;)try{if(a=
n[n.$$digestWatchIndex])if(m=a.get,(g=m(w))!==(h=a.last)&&!(a.eq?sa(g,h):X(g)&&X(h)))q=!0,c=a,a.last=a.eq?na(g,null):g,l=a.fn,l(g,h===v?g:h,w),5>B&&(z=4-B,A[z]||(A[z]=[]),A[z].push({msg:C(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:h}));else if(a===c){q=!1;break a}}catch(F){f(F)}if(!(n=!w.$$suspended&&w.$$watchersCount&&w.$$childHead||w!==this&&w.$$nextSibling))for(;w!==this&&!(n=w.$$nextSibling);)w=w.$parent}while(w=n);if((q||J.length)&&!B--)throw s.$$phase=null,d("infdig",
b,A);}while(q||J.length);for(s.$$phase=null;H<u.length;)try{u[H++]()}catch(D){f(D)}u.length=H=0;k.$$checkUrlChange()},$suspend:function(){this.$$suspended=!0},$isSuspended:function(){return this.$$suspended},$resume:function(){this.$$suspended=!1},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===s&&k.$$applicationDestroyed();n(this,-this.$$watchersCount);for(var b in this.$$listenerCount)B(this,this.$$listenerCount[b],b);a&&a.$$childHead===
this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail===this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=D;this.$on=this.$watch=this.$watchGroup=function(){return D};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){s.$$phase||
J.length||k.defer(function(){J.length&&s.$digest()});J.push({scope:this,fn:g(a),locals:b})},$$postDigest:function(a){u.push(a)},$apply:function(a){try{p("$apply");try{return this.$eval(a)}finally{s.$$phase=null}}catch(b){f(b)}finally{try{s.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&w.push(b);a=g(a);A()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=
0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(delete c[d],B(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=db([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){f(n)}else d.splice(l,1),l--,m--;if(g)break;e=e.$parent}while(e);h.currentScope=
null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=db([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=
null;return e}};var s=new m,J=s.$$asyncQueue=[],u=s.$$postDigestQueue=[],w=s.$$applyAsyncQueue=[],H=0;return s}]}function Ie(){var a=/^\s*(https?|s?ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(b){return u(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return u(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f;f=ma(d&&d.trim()).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function Ig(a){if("self"===
a)return a;if(F(a)){if(-1<a.indexOf("***"))throw wa("iwcard",a);a=Nd(a).replace(/\\\*\\\*/g,".*").replace(/\\\*/g,"[^:/.?&;]*");return new RegExp("^"+a+"$")}if($a(a))return new RegExp("^"+a.source+"$");throw wa("imatcher");}function Od(a){var b=[];u(a)&&q(a,function(a){b.push(Ig(a))});return b}function Uf(){this.SCE_CONTEXTS=fa;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=Od(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=Od(a));return b};
this.$get=["$injector",function(d){function c(a,b){return"self"===a?Pd(b,Qd):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw wa("unsafe");};d.has("$sanitize")&&(f=d.get("$sanitize"));var g=e(),k={};k[fa.HTML]=e(g);k[fa.CSS]=e(g);k[fa.URL]=e(g);k[fa.JS]=
e(g);k[fa.RESOURCE_URL]=e(k[fa.URL]);return{trustAs:function(a,b){var c=k.hasOwnProperty(a)?k[a]:null;if(!c)throw wa("icontext",a,b);if(null===b||x(b)||""===b)return b;if("string"!==typeof b)throw wa("itype",a);return new c(b)},getTrusted:function(d,e){if(null===e||x(e)||""===e)return e;var g=k.hasOwnProperty(d)?k[d]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(d===fa.RESOURCE_URL){var g=ma(e.toString()),p,n,q=!1;p=0;for(n=a.length;p<n;p++)if(c(a[p],g)){q=!0;break}if(q)for(p=0,n=b.length;p<
n;p++)if(c(b[p],g)){q=!1;break}if(q)return e;throw wa("insecurl",e.toString());}if(d===fa.HTML)return f(e);throw wa("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Tf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ba)throw wa("iequirks");var c=pa(fa);c.isEnabled=function(){return a};c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=
function(a,b){return b},c.valueOf=ab);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;q(fa,function(a,b){var d=N(b);c[("parse_as_"+d).replace(Dc,wb)]=function(b){return e(a,b)};c[("get_trusted_"+d).replace(Dc,wb)]=function(b){return f(a,b)};c[("trust_as_"+d).replace(Dc,wb)]=function(b){return g(a,b)}});return c}]}function Vf(){this.$get=["$window","$document",function(a,b){var d={},c=!((!a.nw||
!a.nw.process)&&a.chrome&&(a.chrome.app&&a.chrome.app.runtime||!a.chrome.app&&a.chrome.runtime&&a.chrome.runtime.id))&&a.history&&a.history.pushState,e=Z((/android (\d+)/.exec(N((a.navigator||{}).userAgent))||[])[1]),f=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},k=g.body&&g.body.style,h=!1,l=!1;k&&(h=!!("transition"in k||"webkitTransition"in k),l=!!("animation"in k||"webkitAnimation"in k));return{history:!(!c||4>e||f),hasEvent:function(a){if("input"===a&&Ba)return!1;if(x(d[a])){var b=g.createElement("div");
d[a]="on"+a in b}return d[a]},csp:Ia(),transitions:h,animations:l,android:e}}]}function Xf(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$exceptionHandler","$templateCache","$http","$q","$sce",function(b,d,c,e,f){function g(k,h){g.totalPendingRequests++;if(!F(k)||x(d.get(k)))k=f.getTrustedResourceUrl(k);var l=c.defaults&&c.defaults.transformResponse;I(l)?l=l.filter(function(a){return a!==wc}):l===wc&&(l=null);return c.get(k,P({cache:d,transformResponse:l},a)).finally(function(){g.totalPendingRequests--}).then(function(a){d.put(k,
a.data);return a.data},function(a){h||(a=Jg("tpload",k,a.status,a.statusText),b(a));return e.reject(a)})}g.totalPendingRequests=0;return g}]}function Yf(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,b,d){a=a.getElementsByClassName("ng-binding");var g=[];q(a,function(a){var c=ea.element(a).data("$binding");c&&q(c,function(c){d?(new RegExp("(^|\\s)"+Nd(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!==c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,
b,d){for(var g=["ng-","data-ng-","ng\\:"],k=0;k<g.length;++k){var h=a.querySelectorAll("["+g[k]+"model"+(d?"=":"*=")+'"'+b+'"]');if(h.length)return h}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function Zf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,h,l){C(f)||(l=h,h=f,f=D);var m=xa.call(arguments,3),p=u(l)&&!l,n=(p?c:d).defer(),
q=n.promise,v;v=b.defer(function(){try{n.resolve(f.apply(null,m))}catch(b){n.reject(b),e(b)}finally{delete g[q.$$timeoutId]}p||a.$apply()},h);q.$$timeoutId=v;g[v]=n;return q}var g={};f.cancel=function(a){return a&&a.$$timeoutId in g?(g[a.$$timeoutId].promise.$$state.pur=!0,g[a.$$timeoutId].reject("canceled"),delete g[a.$$timeoutId],b.defer.cancel(a.$$timeoutId)):!1};return f}]}function ma(a){if(!F(a))return a;Ba&&(W.setAttribute("href",a),a=W.href);W.setAttribute("href",a);return{href:W.href,protocol:W.protocol?
W.protocol.replace(/:$/,""):"",host:W.host,search:W.search?W.search.replace(/^\?/,""):"",hash:W.hash?W.hash.replace(/^#/,""):"",hostname:W.hostname,port:W.port,pathname:"/"===W.pathname.charAt(0)?W.pathname:"/"+W.pathname}}function Ag(a){var b=[Qd].concat(a.map(ma));return function(a){a=ma(a);return b.some(Pd.bind(null,a))}}function Pd(a,b){a=ma(a);b=ma(b);return a.protocol===b.protocol&&a.host===b.host}function $f(){this.$get=ka(y)}function Rd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}
var d=a[0]||{},c={},e="";return function(){var a,g,k,h,l;try{a=d.cookie||""}catch(m){a=""}if(a!==e)for(e=a,a=e.split("; "),c={},k=0;k<a.length;k++)g=a[k],h=g.indexOf("="),0<h&&(l=b(g.substring(0,h)),x(c[l])&&(c[l]=b(g.substring(h+1))));return c}}function dg(){this.$get=Rd}function gd(a){function b(d,c){if(G(d)){var e={};q(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",
Sd);b("date",Td);b("filter",Kg);b("json",Lg);b("limitTo",Mg);b("lowercase",Ng);b("number",Ud);b("orderBy",Vd);b("uppercase",Og)}function Kg(){return function(a,b,d,c){if(!ja(a)){if(null==a)return a;throw M("filter")("notarray",a);}c=c||"$";var e;switch(Ec(b)){case "function":break;case "boolean":case "null":case "number":case "string":e=!0;case "object":b=Pg(b,d,c,e);break;default:return a}return Array.prototype.filter.call(a,b)}}function Pg(a,b,d,c){var e=G(a)&&d in a;!0===b?b=sa:C(b)||(b=function(a,
b){if(x(a))return!1;if(null===a||null===b)return a===b;if(G(b)||G(a)&&!ac(a))return!1;a=N(""+a);b=N(""+b);return-1!==a.indexOf(b)});return function(f){return e&&!G(f)?ga(f,a[d],b,d,!1):ga(f,a,b,d,c)}}function ga(a,b,d,c,e,f){var g=Ec(a),k=Ec(b);if("string"===k&&"!"===b.charAt(0))return!ga(a,b.substring(1),d,c,e);if(I(a))return a.some(function(a){return ga(a,b,d,c,e)});switch(g){case "object":var h;if(e){for(h in a)if(h.charAt&&"$"!==h.charAt(0)&&ga(a[h],b,d,c,!0))return!0;return f?!1:ga(a,b,d,c,!1)}if("object"===
k){for(h in b)if(f=b[h],!C(f)&&!x(f)&&(g=h===c,!ga(g?a:a[h],f,d,c,g,g)))return!1;return!0}return d(a,b);case "function":return!1;default:return d(a,b)}}function Ec(a){return null===a?"null":typeof a}function Sd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){x(c)&&(c=b.CURRENCY_SYM);x(e)&&(e=b.PATTERNS[1].maxFrac);var f=c?/\u00A4/g:/\s*\u00A4\s*/g;return null==a?a:Wd(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(f,c)}}function Ud(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==
a?a:Wd(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function Qg(a){var b=0,d,c,e,f,g;-1<(c=a.indexOf(Xd))&&(a=a.replace(Xd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)===Fc;e++);if(e===(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)===Fc;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Yd&&(d=d.splice(0,Yd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function Rg(a,b,d,c){var e=a.d,f=e.length-a.i;b=x(b)?Math.min(Math.max(d,f),c):+b;d=
b+a.i;c=e[d];if(0<d){e.splice(Math.max(a.i,d));for(var g=d;g<e.length;g++)e[g]=0}else for(f=Math.max(0,f),a.i=1,e.length=Math.max(1,d=b+1),e[0]=0,g=1;g<d;g++)e[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)e.unshift(0),a.i++;e.unshift(1);a.i++}else e[d-1]++;for(;f<Math.max(0,b);f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Wd(a,b,d,c,e){if(!F(a)&&!Y(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,k=Math.abs(a)+"",h="";if(f)h="\u221e";
else{g=Qg(k);Rg(g,e,b.minFrac,b.maxFrac);h=g.d;k=g.i;e=g.e;f=[];for(g=h.reduce(function(a,b){return a&&!b},!0);0>k;)h.unshift(0),k++;0<k?f=h.splice(k,h.length):(f=h,h=[0]);k=[];for(h.length>=b.lgSize&&k.unshift(h.splice(-b.lgSize,h.length).join(""));h.length>b.gSize;)k.unshift(h.splice(-b.gSize,h.length).join(""));h.length&&k.unshift(h.join(""));h=k.join(d);f.length&&(h+=c+f.join(""));e&&(h+="e+"+e)}return 0>a&&!g?b.negPre+h+b.negSuf:b.posPre+h+b.posSuf}function Ob(a,b,d,c){var e="";if(0>a||c&&0>=
a)c?a=-a+1:(a=-a,e="-");for(a=""+a;a.length<b;)a=Fc+a;d&&(a=a.substr(a.length-b));return e+a}function ca(a,b,d,c,e){d=d||0;return function(f){f=f["get"+a]();if(0<d||f>-d)f+=d;0===f&&-12===d&&(f=12);return Ob(f,b,c,e)}}function mb(a,b,d){return function(c,e){var f=c["get"+a](),g=ub((d?"STANDALONE":"")+(b?"SHORT":"")+a);return e[g][f]}}function Zd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function $d(a){return function(b){var d=Zd(b.getFullYear());b=+new Date(b.getFullYear(),
b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Ob(b,a)}}function Gc(a,b){return 0>=a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Td(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,k=b[8]?a.setUTCFullYear:a.setFullYear,h=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Z(b[9]+b[10]),g=Z(b[9]+b[11]));k.call(a,Z(b[1]),Z(b[2])-1,Z(b[3]));f=Z(b[4]||0)-f;g=Z(b[5]||0)-g;k=Z(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));h.call(a,f,g,k,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,d,f){var g="",k=[],h,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;F(c)&&(c=Sg.test(c)?Z(c):b(c));Y(c)&&(c=new Date(c));if(!da(c)||!isFinite(c.getTime()))return c;for(;d;)(l=Tg.exec(d))?(k=db(k,l,1),d=k.pop()):(k.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=dc(f,m),c=ec(c,f,!0));q(k,function(b){h=Ug[b];g+=h?h(c,a.DATETIME_FORMATS,m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Lg(){return function(a,b){x(b)&&(b=2);return eb(a,b)}}function Mg(){return function(a,
b,d){b=Infinity===Math.abs(Number(b))?Number(b):Z(b);if(X(b))return a;Y(a)&&(a=a.toString());if(!ja(a))return a;d=!d||isNaN(d)?0:Z(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?Hc(a,d,d+b):0===d?Hc(a,b,a.length):Hc(a,Math.max(0,d+b),d)}}function Hc(a,b,d){return F(a)?a.slice(b,d):xa.call(a,b,d)}function Vd(a){function b(b){return b.map(function(b){var c=1,d=ab;if(C(b))d=b;else if(F(b)){if("+"===b.charAt(0)||"-"===b.charAt(0))c="-"===b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(d=a(b),d.constant))var e=
d(),d=function(a){return a[e]}}return{get:d,descending:c}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function c(a,b){var c=0,d=a.type,h=b.type;if(d===h){var h=a.value,l=b.value;"string"===d?(h=h.toLowerCase(),l=l.toLowerCase()):"object"===d&&(G(h)&&(h=a.index),G(l)&&(l=b.index));h!==l&&(c=h<l?-1:1)}else c=d<h?-1:1;return c}return function(a,f,g,k){if(null==a)return a;if(!ja(a))throw M("orderBy")("notarray",a);I(f)||(f=[f]);0===f.length&&
(f=["+"]);var h=b(f),l=g?-1:1,m=C(k)?k:c;a=Array.prototype.map.call(a,function(a,b){return{value:a,tieBreaker:{value:b,type:"number",index:b},predicateValues:h.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="string",e="null";else if("object"===c)a:{if(C(e.valueOf)&&(e=e.valueOf(),d(e)))break a;ac(e)&&(e=e.toString(),d(e))}return{value:e,type:c,index:b}})}});a.sort(function(a,b){for(var d=0,e=h.length;d<e;d++){var g=m(a.predicateValues[d],b.predicateValues[d]);if(g)return g*h[d].descending*
l}return(m(a.tieBreaker,b.tieBreaker)||c(a.tieBreaker,b.tieBreaker))*l});return a=a.map(function(a){return a.value})}}function Ra(a){C(a)&&(a={link:a});a.restrict=a.restrict||"AC";return ka(a)}function Pb(a,b,d,c,e){this.$$controls=[];this.$error={};this.$$success={};this.$pending=void 0;this.$name=e(b.name||b.ngForm||"")(d);this.$dirty=!1;this.$valid=this.$pristine=!0;this.$submitted=this.$invalid=!1;this.$$parentForm=Qb;this.$$element=a;this.$$animate=c;ae(this)}function ae(a){a.$$classCache={};
a.$$classCache[be]=!(a.$$classCache[nb]=a.$$element.hasClass(nb))}function ce(a){function b(a,b,c){c&&!a.$$classCache[b]?(a.$$animate.addClass(a.$$element,b),a.$$classCache[b]=!0):!c&&a.$$classCache[b]&&(a.$$animate.removeClass(a.$$element,b),a.$$classCache[b]=!1)}function d(a,c,d){c=c?"-"+Xc(c,"-"):"";b(a,nb+c,!0===d);b(a,be+c,!1===d)}var c=a.set,e=a.unset;a.clazz.prototype.$setValidity=function(a,g,k){x(g)?(this.$pending||(this.$pending={}),c(this.$pending,a,k)):(this.$pending&&e(this.$pending,
a,k),de(this.$pending)&&(this.$pending=void 0));La(g)?g?(e(this.$error,a,k),c(this.$$success,a,k)):(c(this.$error,a,k),e(this.$$success,a,k)):(e(this.$error,a,k),e(this.$$success,a,k));this.$pending?(b(this,"ng-pending",!0),this.$valid=this.$invalid=void 0,d(this,"",null)):(b(this,"ng-pending",!1),this.$valid=de(this.$error),this.$invalid=!this.$valid,d(this,"",this.$valid));g=this.$pending&&this.$pending[a]?void 0:this.$error[a]?!1:this.$$success[a]?!0:null;d(this,a,g);this.$$parentForm.$setValidity(a,
g,this)}}function de(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function Ic(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function Va(a,b,d,c,e,f){var g=N(b[0].type);if(!e.android){var k=!1;b.on("compositionstart",function(){k=!0});b.on("compositionupdate",function(a){if(x(a.data)||""===a.data)k=!1});b.on("compositionend",function(){k=!1;l()})}var h,l=function(a){h&&(f.defer.cancel(h),h=null);if(!k){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&
"false"===d.ngTrim||(e=Q(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",l);else{var m=function(a,b,c){h||(h=f.defer(function(){h=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut drop",m)}b.on("change",l);if(ee[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!h){var b=this.validity,
c=b.badInput,d=b.typeMismatch;h=f.defer(function(){h=null;b.badInput===c&&b.typeMismatch===d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Rb(a,b){return function(d,c){var e,f;if(da(d))return d;if(F(d)){'"'===d.charAt(0)&&'"'===d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(Vg.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),
ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},q(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function ob(a,b,d,c){return function(e,f,g,k,h,l,m){function p(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function n(a){return u(a)&&!da(a)?q(a)||void 0:a}function q(a,b){var c=k.$options.getOption("timezone");E&&E!==c&&(b=Uc(b,dc(E)));var e=d(a,b);!isNaN(e)&&c&&(e=ec(e,c));return e}
Jc(e,f,g,k);Va(e,f,g,k,h,l);var r,E;k.$$parserName=a;k.$parsers.push(function(a){if(k.$isEmpty(a))return null;if(b.test(a))return q(a,r)});k.$formatters.push(function(a){if(a&&!da(a))throw pb("datefmt",a);if(p(a)){r=a;var b=k.$options.getOption("timezone");b&&(E=b,r=ec(r,b,!0));return m("date")(a,c,b)}E=r=null;return""});if(u(g.min)||g.ngMin){var A;k.$validators.min=function(a){return!p(a)||x(A)||d(a)>=A};g.$observe("min",function(a){A=n(a);k.$validate()})}if(u(g.max)||g.ngMax){var s;k.$validators.max=
function(a){return!p(a)||x(s)||d(a)<=s};g.$observe("max",function(a){s=n(a);k.$validate()})}}}function Jc(a,b,d,c){(c.$$hasNativeValidators=G(b[0].validity))&&c.$parsers.push(function(a){var c=b.prop("validity")||{};return c.badInput||c.typeMismatch?void 0:a})}function fe(a){a.$$parserName="number";a.$parsers.push(function(b){if(a.$isEmpty(b))return null;if(Wg.test(b))return parseFloat(b)});a.$formatters.push(function(b){if(!a.$isEmpty(b)){if(!Y(b))throw pb("numfmt",b);b=b.toString()}return b})}function Wa(a){u(a)&&
!Y(a)&&(a=parseFloat(a));return X(a)?void 0:a}function Kc(a){var b=a.toString(),d=b.indexOf(".");return-1===d?-1<a&&1>a&&(a=/e-(\d+)$/.exec(b))?Number(a[1]):0:b.length-d-1}function ge(a,b,d){a=Number(a);var c=(a|0)!==a,e=(b|0)!==b,f=(d|0)!==d;if(c||e||f){var g=c?Kc(a):0,k=e?Kc(b):0,h=f?Kc(d):0,g=Math.max(g,k,h),g=Math.pow(10,g);a*=g;b*=g;d*=g;c&&(a=Math.round(a));e&&(b=Math.round(b));f&&(d=Math.round(d))}return 0===(a-b)%d}function he(a,b,d,c,e){if(u(c)){a=a(c);if(!a.constant)throw pb("constexpr",
d,c);return a(b)}return e}function Lc(a,b){function d(a,b){if(!a||!a.length)return[];if(!b||!b.length)return a;var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],f=0;f<b.length;f++)if(e===b[f])continue a;c.push(e)}return c}function c(a){var b=a;I(a)?b=a.map(c).join(" "):G(a)&&(b=Object.keys(a).filter(function(b){return a[b]}).join(" "));return b}function e(a){var b=a;if(I(a))b=a.map(e);else if(G(a)){var c=!1,b=Object.keys(a).filter(function(b){b=a[b];!c&&x(b)&&(c=!0);return b});c&&b.push(void 0)}return b}
a="ngClass"+a;var f;return["$parse",function(g){return{restrict:"AC",link:function(k,h,l){function m(a,b){var c=[];q(a,function(a){if(0<b||s[a])s[a]=(s[a]||0)+b,s[a]===+(0<b)&&c.push(a)});return c.join(" ")}function p(a){if(a===b){var c=z,c=m(c&&c.split(" "),1);l.$addClass(c)}else c=z,c=m(c&&c.split(" "),-1),l.$removeClass(c);u=a}function n(a){a=c(a);a!==z&&r(a)}function r(a){if(u===b){var c=z&&z.split(" "),e=a&&a.split(" "),g=d(c,e),c=d(e,c),g=m(g,-1),c=m(c,1);l.$addClass(c);l.$removeClass(g)}z=
a}var v=l[a].trim(),E=":"===v.charAt(0)&&":"===v.charAt(1),v=g(v,E?e:c),A=E?n:r,s=h.data("$classCounts"),u=!0,z;s||(s=R(),h.data("$classCounts",s));"ngClass"!==a&&(f||(f=g("$index",function(a){return a&1})),k.$watch(f,p));k.$watch(v,A,E)}}}]}function Sb(a,b,d,c,e,f,g,k,h){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=void 0;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=
!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=void 0;this.$name=h(d.name||"",!1)(a);this.$$parentForm=Qb;this.$options=Tb;this.$$updateEvents="";this.$$updateEventHandler=this.$$updateEventHandler.bind(this);this.$$parsedNgModel=e(d.ngModel);this.$$parsedNgModelAssign=this.$$parsedNgModel.assign;this.$$ngModelGet=this.$$parsedNgModel;this.$$ngModelSet=this.$$parsedNgModelAssign;this.$$pendingDebounce=null;this.$$parserValid=void 0;this.$$currentValidationRunId=
0;Object.defineProperty(this,"$$scope",{value:a});this.$$attr=d;this.$$element=c;this.$$animate=f;this.$$timeout=g;this.$$parse=e;this.$$q=k;this.$$exceptionHandler=b;ae(this);Xg(this)}function Xg(a){a.$$scope.$watch(function(b){b=a.$$ngModelGet(b);b===a.$modelValue||a.$modelValue!==a.$modelValue&&b!==b||a.$$setModelValue(b);return b})}function Mc(a){this.$$options=a}function ie(a,b){q(b,function(b,c){u(a[c])||(a[c]=b)})}function Fa(a,b){a.prop("selected",b);a.attr("selected",b)}var Oc={objectMaxDepth:5},
Yg=/^\/(.+)\/([a-z]*)$/,ra=Object.prototype.hasOwnProperty,N=function(a){return F(a)?a.toLowerCase():a},ub=function(a){return F(a)?a.toUpperCase():a},Ba,z,ta,xa=[].slice,wg=[].splice,Zg=[].push,ha=Object.prototype.toString,Rc=Object.getPrototypeOf,oa=M("ng"),ea=y.angular||(y.angular={}),jc,qb=0;Ba=y.document.documentMode;var X=Number.isNaN||function(a){return a!==a};D.$inject=[];ab.$inject=[];var I=Array.isArray,ue=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
Q=function(a){return F(a)?a.trim():a},Nd=function(a){return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Ia=function(){if(!u(Ia.rules)){var a=y.document.querySelector("[ng-csp]")||y.document.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Ia.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==b.indexOf("no-inline-style")}}else{a=Ia;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,
noInlineStyle:!1}}}return Ia.rules},rb=function(){if(u(rb.name_))return rb.name_;var a,b,d=Ga.length,c,e;for(b=0;b<d;++b)if(c=Ga[b],a=y.document.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return rb.name_=e},we=/:/g,Ga=["ng-","data-ng-","ng:","x-ng-"],ze=function(a){var b=a.currentScript;if(!b)return!0;if(!(b instanceof y.HTMLScriptElement||b instanceof y.SVGScriptElement))return!1;b=b.attributes;return[b.getNamedItem("src"),b.getNamedItem("href"),b.getNamedItem("xlink:href")].every(function(b){if(!b)return!0;
if(!b.value)return!1;var c=a.createElement("a");c.href=b.value;if(a.location.origin===c.origin)return!0;switch(c.protocol){case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":return!0;default:return!1}})}(y.document),Ce=/[A-Z]/g,Yc=!1,Ma=3,He={full:"1.6.10",major:1,minor:6,dot:10,codeName:"crystalline-persuasion"};S.expando="ng339";var ib=S.cache={},ig=1;S._data=function(a){return this.cache[a[this.expando]]||{}};var eg=/-([a-z])/g,$g=/^-ms-/,Ab={mouseleave:"mouseout",mouseenter:"mouseover"},
mc=M("jqLite"),hg=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,lc=/<|&#?\w+;/,fg=/<([\w:-]+)/,gg=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,$={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option;$.tbody=$.tfoot=$.colgroup=$.caption=$.thead;$.th=$.td;var ng=y.Node.prototype.contains||
function(a){return!!(this.compareDocumentPosition(a)&16)},Ua=S.prototype={ready:id,toString:function(){var a=[];q(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?z(this[a]):z(this[this.length+a])},length:0,push:Zg,sort:[].sort,splice:[].splice},Gb={};q("multiple selected checked disabled readOnly required open".split(" "),function(a){Gb[N(a)]=a});var nd={};q("input select option textarea button form details".split(" "),function(a){nd[a]=!0});var ud={ngMinlength:"minlength",
ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern",ngStep:"step"};q({data:qc,removeData:pc,hasData:function(a){for(var b in ib[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)pc(a[b])}},function(a,b){S[b]=a});q({data:qc,inheritedData:Eb,scope:function(a){return z.data(a,"$scope")||Eb(a.parentNode||a,["$isolateScope","$scope"])},isolateScope:function(a){return z.data(a,"$isolateScope")||z.data(a,"$isolateScopeNoTemplate")},controller:kd,injector:function(a){return Eb(a,
"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:Bb,css:function(a,b,d){b=xb(b.replace($g,"ms-"));if(u(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Ma&&2!==c&&8!==c&&a.getAttribute){var c=N(b),e=Gb[c];if(u(d))null===d||!1===d&&e?a.removeAttribute(b):a.setAttribute(b,e?c:d);else return a=a.getAttribute(b),e&&null!==a&&(a=c),null===a?void 0:a}},prop:function(a,b,d){if(u(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(x(d)){var c=
a.nodeType;return 1===c||c===Ma?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(x(b)){if(a.multiple&&"select"===ya(a)){var d=[];q(a.options,function(a){a.selected&&d.push(a.value||a.text)});return d}return a.value}a.value=b},html:function(a,b){if(x(b))return a.innerHTML;yb(a,!0);a.innerHTML=b},empty:ld},function(a,b){S.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==ld&&x(2===a.length&&a!==Bb&&a!==kd?b:c)){if(G(b)){for(e=0;e<g;e++)if(a===qc)a(this[e],b);else for(f in b)a(this[e],
f,b[f]);return this}e=a.$dv;g=x(e)?Math.min(g,1):g;for(f=0;f<g;f++){var k=a(this[f],b,c);e=e?e+k:k}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});q({removeData:pc,on:function(a,b,d,c){if(u(c))throw mc("onargs");if(kc(a)){c=zb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=kg(a,e));c=0<=b.indexOf(" ")?b.split(" "):[b];for(var g=c.length,k=function(b,c,g){var k=e[b];k||(k=e[b]=[],k.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f));k.push(d)};g--;)b=c[g],Ab[b]?(k(Ab[b],mg),
k(b,void 0,!0)):k(b)}},off:jd,one:function(a,b,d){a=z(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;yb(a);q(new S(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];q(a.childNodes,function(a){1===a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new S(b);for(var d=0,c=b.length;d<
c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;q(new S(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){var d=z(b).eq(0).clone()[0],c=a.parentNode;c&&c.replaceChild(d,a);d.appendChild(a)},remove:Fb,detach:function(a){Fb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;if(c){b=new S(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}}},addClass:Db,removeClass:Cb,toggleClass:function(a,b,d){b&&q(b.split(" "),function(b){var e=
d;x(e)&&(e=!Bb(a,b));(e?Db:Cb)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:oc,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=zb(a);if(g=(g=g&&g.events)&&g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=
!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:D,type:f,target:a},b.type&&(c=P(c,b)),b=pa(g),e=d?[c].concat(d):[c],q(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){S.prototype[b]=function(b,c,e){for(var f,g=0,k=this.length;g<k;g++)x(f)?(f=a(this[g],b,c,e),u(f)&&(f=z(f))):nc(f,a(this[g],b,c,e));return u(f)?f:this}});S.prototype.bind=S.prototype.on;S.prototype.unbind=S.prototype.off;var ah=Object.create(null);
od.prototype={_idx:function(a){if(a===this._lastKey)return this._lastIndex;this._lastKey=a;return this._lastIndex=this._keys.indexOf(a)},_transformKey:function(a){return X(a)?ah:a},get:function(a){a=this._transformKey(a);a=this._idx(a);if(-1!==a)return this._values[a]},set:function(a,b){a=this._transformKey(a);var d=this._idx(a);-1===d&&(d=this._lastIndex=this._keys.length);this._keys[d]=a;this._values[d]=b},delete:function(a){a=this._transformKey(a);a=this._idx(a);if(-1===a)return!1;this._keys.splice(a,
1);this._values.splice(a,1);this._lastKey=NaN;this._lastIndex=-1;return!0}};var Hb=od,cg=[function(){this.$get=[function(){return Hb}]}],pg=/^([^(]+?)=>/,qg=/^[^(]*\(\s*([^)]*)\)/m,bh=/,/,ch=/^\s*(_?)(\S+?)\1\s*$/,og=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Aa=M("$injector");gb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw F(d)&&d||(d=a.name||rg(a)),Aa("strictdi",d);b=pd(a);q(b[1].split(bh),function(a){a.replace(ch,function(a,b,d){c.push(d)})})}a.$inject=
c}}else I(a)?(b=a.length-1,sb(a[b],"fn"),c=a.slice(0,b)):sb(a,"fn",!0);return c};var je=M("$animate"),uf=function(){this.$get=D},vf=function(){var a=new Hb,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=F(b)?b.split(" "):I(b)?b:[],q(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){q(b,function(b){var c=a.get(b);if(c){var d=sg(b.attr("class")),e="",f="";q(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});q(b,function(a){e&&
Db(a,e);f&&Cb(a,f)});a.delete(b)}});b.length=0}return{enabled:D,on:D,off:D,pin:D,push:function(g,k,h,l){l&&l();h=h||{};h.from&&g.css(h.from);h.to&&g.css(h.to);if(h.addClass||h.removeClass)if(k=h.addClass,l=h.removeClass,h=a.get(g)||{},k=e(h,k,!0),l=e(h,l,!1),k||l)a.set(g,h),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},sf=["$provide",function(a){var b=this,d=null,c=null;this.$$registeredAnimations=Object.create(null);this.register=function(c,d){if(c&&"."!==c.charAt(0))throw je("notcsel",
c);var g=c+"-animation";b.$$registeredAnimations[c.substr(1)]=g;a.factory(g,d)};this.customFilter=function(a){1===arguments.length&&(c=C(a)?a:null);return c};this.classNameFilter=function(a){if(1===arguments.length&&(d=a instanceof RegExp?a:null)&&/[(\s|\/)]ng-animate[(\s|\/)]/.test(d.toString()))throw d=null,je("nongcls","ng-animate");return d};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var e;a:{for(e=0;e<d.length;e++){var f=d[e];if(1===f.nodeType){e=f;break a}}e=void 0}!e||
e.parentNode||e.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(c,d,h,l){d=d&&z(d);h=h&&z(h);d=d||h.parent();b(c,d,h);return a.push(c,"enter",Ja(l))},move:function(c,d,h,l){d=d&&z(d);h=h&&z(h);d=d||h.parent();b(c,d,h);return a.push(c,"move",Ja(l))},leave:function(b,c){return a.push(b,"leave",Ja(c),function(){b.remove()})},addClass:function(b,c,d){d=Ja(d);d.addClass=jb(d.addclass,c);return a.push(b,
"addClass",d)},removeClass:function(b,c,d){d=Ja(d);d.removeClass=jb(d.removeClass,c);return a.push(b,"removeClass",d)},setClass:function(b,c,d,f){f=Ja(f);f.addClass=jb(f.addClass,c);f.removeClass=jb(f.removeClass,d);return a.push(b,"setClass",f)},animate:function(b,c,d,f,m){m=Ja(m);m.from=m.from?P(m.from,c):c;m.to=m.to?P(m.to,d):d;m.tempClasses=jb(m.tempClasses,f||"ng-inline-animate");return a.push(b,"animate",m)}}}]}],xf=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||
a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},wf=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$$isDocumentHidden","$timeout",function(a,b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){c()?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=
function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;q(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:D,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},
pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(q(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},tf=function(){this.$get=
["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);k||h.complete();k=!0});return h}var g=e||{};g.$$prepared||(g=na(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var k,h=new d;return{start:f,end:f}}}]},aa=M("$compile"),uc=new function(){};$c.$inject=["$provide","$$sanitizeUriProvider"];
Jb.prototype.isFirstChange=function(){return this.previousValue===uc};var qd=/^((?:x|data)[:\-_])/i,vg=/[:\-_]+(.)/g,wd=M("$controller"),vd=/^(\S+)(\s+as\s+([\w$]+))?$/,Ef=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&b instanceof z&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},xd="application/json",xc={"Content-Type":xd+";charset=utf-8"},yg=/^\[|^\{(?!\{)/,zg={"[":/]$/,"{":/}$/},xg=/^\)]\}',?\n/,Kb=M("$http"),Ea=ea.$interpolateMinErr=M("$interpolate");Ea.throwNoconcat=
function(a){throw Ea("noconcat",a);};Ea.interr=function(a,b){return Ea("interr",a,b.toString())};var Mf=function(){this.$get=function(){function a(a){var b=function(a){b.data=a;b.called=!0};b.id=a;return b}var b=ea.callbacks,d={};return{createCallback:function(c){c="_"+(b.$$counter++).toString(36);var e="angular.callbacks."+c,f=a(c);d[e]=b[c]=f;return e},wasCalled:function(a){return d[a].called},getResponse:function(a){return d[a].data},removeCallback:function(a){delete b[d[a].id];delete d[a]}}}},
dh=/^([^?#]*)(\?([^#]*))?(#(.*))?$/,Cg={http:80,https:443,ftp:21},kb=M("$location"),Dg=/^\s*[\\/]{2,}/,eh={$$absUrl:"",$$html5:!1,$$replace:!1,absUrl:Lb("$$absUrl"),url:function(a){if(x(a))return this.$$url;var b=dh.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Lb("$$protocol"),host:Lb("$$host"),port:Lb("$$port"),path:Ed("$$path",function(a){a=null!==a?a.toString():"";return"/"===a.charAt(0)?a:"/"+
a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(F(a)||Y(a))a=a.toString(),this.$$search=fc(a);else if(G(a))a=na(a,{}),q(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw kb("isrcharg");break;default:x(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:Ed("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};q([Dd,Bc,Ac],function(a){a.prototype=Object.create(eh);
a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==Ac||!this.$$html5)throw kb("nostate");this.$$state=x(b)?null:b;this.$$urlUpdatedByLocation=!0;return this}});var Xa=M("$parse"),Hg={}.constructor.prototype.valueOf,Ub=R();q("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Ub[a]=!0});var fh={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Nb=function(a){this.options=a};Nb.prototype={constructor:Nb,lex:function(a){this.text=a;this.index=0;for(this.tokens=
[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdentifierStart(this.peekMultichar()))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Ub[b],e=Ub[d];Ub[a]||c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,
text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdentifierStart:function(a){return this.options.isIdentifierStart?this.options.isIdentifierStart(a,
this.codePointAt(a)):this.isValidIdentifierStart(a)},isValidIdentifierStart:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isIdentifierContinue:function(a){return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,this.codePointAt(a)):this.isValidIdentifierContinue(a)},isValidIdentifierContinue:function(a,b){return this.isValidIdentifierStart(a,b)||this.isNumber(a)},codePointAt:function(a){return 1===a.length?a.charCodeAt(0):(a.charCodeAt(0)<<10)+a.charCodeAt(1)-
56613888},peekMultichar:function(){var a=this.text.charAt(this.index),b=this.peek();if(!b)return a;var d=a.charCodeAt(0),c=b.charCodeAt(0);return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=u(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw Xa("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<this.text.length;){var d=N(this.text.charAt(this.index));
if("."===d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"===d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"===a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!==a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){var a=this.index;for(this.index+=this.peekMultichar().length;this.index<this.text.length;){var b=
this.peekMultichar();if(!this.isIdentifierContinue(b))break;this.index+=b.length}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,16))):d+=
fh[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var r=function(a,b){this.lexer=a;this.options=b};r.Program="Program";r.ExpressionStatement="ExpressionStatement";r.AssignmentExpression="AssignmentExpression";r.ConditionalExpression="ConditionalExpression";r.LogicalExpression="LogicalExpression";r.BinaryExpression="BinaryExpression";r.UnaryExpression="UnaryExpression";
r.CallExpression="CallExpression";r.MemberExpression="MemberExpression";r.Identifier="Identifier";r.Literal="Literal";r.ArrayExpression="ArrayExpression";r.Property="Property";r.ObjectExpression="ObjectExpression";r.ThisExpression="ThisExpression";r.LocalsExpression="LocalsExpression";r.NGValueParameter="NGValueParameter";r.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},
program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:r.Program,body:a}},expressionStatement:function(){return{type:r.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();if(this.expect("=")){if(!Id(a))throw Xa("lval");
a={type:r.AssignmentExpression,left:a,right:this.assignment(),operator:"="}}return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:r.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:r.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a=
{type:r.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:r.BinaryExpression,
operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:r.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:r.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?
a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=na(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?a={type:r.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:r.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):
"["===b.text?(a={type:r.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:r.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:r.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.filterChain());while(this.expect(","))
}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:r.Identifier,name:a.text}},constant:function(){return{type:r.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:r.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;
b={type:r.Property,kind:"init"};this.peek().constant?(b.key=this.constant(),b.computed=!1,this.consume(":"),b.value=this.expression()):this.peek().identifier?(b.key=this.identifier(),b.computed=!1,this.peek(":")?(this.consume(":"),b.value=this.expression()):b.value=b.key):this.peek("[")?(this.consume("["),b.key=this.expression(),this.consume("]"),b.computed=!0,this.consume(":"),b.value=this.expression()):this.throwError("invalid key",this.peek());a.push(b)}while(this.expect(","))}this.consume("}");
return{type:r.ObjectExpression,properties:a}},throwError:function(a,b){throw Xa("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw Xa("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw Xa("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,
e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:r.ThisExpression},$locals:{type:r.LocalsExpression}}};var Gd=2;Kd.prototype={compile:function(a){var b=this;this.state={nextId:0,filters:{},fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};U(a,b.$filter);var d="",c;this.stage="assign";if(c=Jd(a))this.state.computing=
"assign",d=this.nextId(),this.recurse(c,d),this.return_(d),d="fn.assign="+this.generateFunction("assign","s,v,l");c=Hd(a.body);b.stage="inputs";q(c,function(a,c){var d="fn"+c;b.state[d]={vars:[],body:[],own:{}};b.state.computing=d;var k=b.nextId();b.recurse(a,k);b.return_(k);b.state.inputs.push({name:d,isPure:a.isPure});a.watchId=c});this.state.computing="fn";this.stage="main";this.recurse(a);a='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+
d+this.watchFns()+"return fn;";a=(new Function("$filter","getStringValue","ifDefined","plus",a))(this.$filter,Eg,Fg,Fd);this.state=this.stage=void 0;return a},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;q(b,function(b){a.push("var "+b.name+"="+d.generateFunction(b.name,"s"));b.isPure&&a.push(b.name,".isPure="+JSON.stringify(b.isPure)+";")});b.length&&a.push("fn.inputs=["+b.map(function(a){return a.name}).join(",")+"];");return a.join("")},generateFunction:function(a,
b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;q(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,e,f){var g,k,h=this,l,m,p;c=c||D;if(!f&&u(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,
this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case r.Program:q(a.body,function(b,c){h.recurse(b.expression,void 0,void 0,function(a){k=a});c!==a.body.length-1?h.current().body.push(k,";"):h.return_(k)});break;case r.Literal:m=this.escape(a.value);this.assign(b,m);c(b||m);break;case r.UnaryExpression:this.recurse(a.argument,void 0,void 0,function(a){k=a});m=a.operator+"("+this.ifDefined(k,0)+")";this.assign(b,m);c(m);break;case r.BinaryExpression:this.recurse(a.left,
void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){k=a});m="+"===a.operator?this.plus(g,k):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(k,0):"("+g+")"+a.operator+"("+k+")";this.assign(b,m);c(m);break;case r.LogicalExpression:b=b||this.nextId();h.recurse(a.left,b);h.if_("&&"===a.operator?b:h.not(b),h.lazyRecurse(a.right,b));c(b);break;case r.ConditionalExpression:b=b||this.nextId();h.recurse(a.test,b);h.if_(b,h.lazyRecurse(a.alternate,b),h.lazyRecurse(a.consequent,
b));c(b);break;case r.Identifier:b=b||this.nextId();d&&(d.context="inputs"===h.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);h.if_("inputs"===h.stage||h.not(h.getHasOwnProperty("l",a.name)),function(){h.if_("inputs"===h.stage||"s",function(){e&&1!==e&&h.if_(h.isNull(h.nonComputedMember("s",a.name)),h.lazyAssign(h.nonComputedMember("s",a.name),"{}"));h.assign(b,h.nonComputedMember("s",a.name))})},b&&h.lazyAssign(b,h.nonComputedMember("l",
a.name)));c(b);break;case r.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();h.recurse(a.object,g,void 0,function(){h.if_(h.notNull(g),function(){a.computed?(k=h.nextId(),h.recurse(a.property,k),h.getStringValue(k),e&&1!==e&&h.if_(h.not(h.computedMember(g,k)),h.lazyAssign(h.computedMember(g,k),"{}")),m=h.computedMember(g,k),h.assign(b,m),d&&(d.computed=!0,d.name=k)):(e&&1!==e&&h.if_(h.isNull(h.nonComputedMember(g,a.property.name)),h.lazyAssign(h.nonComputedMember(g,
a.property.name),"{}")),m=h.nonComputedMember(g,a.property.name),h.assign(b,m),d&&(d.computed=!1,d.name=a.property.name))},function(){h.assign(b,"undefined")});c(b)},!!e);break;case r.CallExpression:b=b||this.nextId();a.filter?(k=h.filter(a.callee.name),l=[],q(a.arguments,function(a){var b=h.nextId();h.recurse(a,b);l.push(b)}),m=k+"("+l.join(",")+")",h.assign(b,m),c(b)):(k=h.nextId(),g={},l=[],h.recurse(a.callee,k,g,function(){h.if_(h.notNull(k),function(){q(a.arguments,function(b){h.recurse(b,a.constant?
void 0:h.nextId(),void 0,function(a){l.push(a)})});m=g.name?h.member(g.context,g.name,g.computed)+"("+l.join(",")+")":k+"("+l.join(",")+")";h.assign(b,m)},function(){h.assign(b,"undefined")});c(b)}));break;case r.AssignmentExpression:k=this.nextId();g={};this.recurse(a.left,void 0,g,function(){h.if_(h.notNull(g.context),function(){h.recurse(a.right,k);m=h.member(g.context,g.name,g.computed)+a.operator+k;h.assign(b,m);c(b||m)})},1);break;case r.ArrayExpression:l=[];q(a.elements,function(b){h.recurse(b,
a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(b||m);break;case r.ObjectExpression:l=[];p=!1;q(a.properties,function(a){a.computed&&(p=!0)});p?(b=b||this.nextId(),this.assign(b,"{}"),q(a.properties,function(a){a.computed?(g=h.nextId(),h.recurse(a.key,g)):g=a.key.type===r.Identifier?a.key.name:""+a.key.value;k=h.nextId();h.recurse(a.value,k);h.assign(h.member(b,g,a.computed),k)})):(q(a.properties,function(b){h.recurse(b.value,a.constant?void 0:
h.nextId(),void 0,function(a){l.push(h.escape(b.key.type===r.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,m));c(b||m);break;case r.ThisExpression:this.assign(b,"s");c(b||"s");break;case r.LocalsExpression:this.assign(b,"l");c(b||"l");break;case r.NGValueParameter:this.assign(b,"v"),c(b||"v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,
b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},
not:function(a){return"!("+a+")"},isNull:function(a){return a+"==null"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){var d=/[^$_a-zA-Z0-9]/g;return/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b)?a+"."+b:a+'["'+b.replace(d,this.stringEscapeFn)+'"]'},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},lazyRecurse:function(a,b,d,c,e,f){var g=
this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(F(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(Y(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw Xa("esc");},nextId:function(a,
b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};Ld.prototype={compile:function(a){var b=this;U(a,b.$filter);var d,c;if(d=Jd(a))c=this.recurse(d);d=Hd(a.body);var e;d&&(e=[],q(d,function(a,c){var d=b.recurse(a);d.isPure=a.isPure;a.input=d;e.push(d);a.watchId=c}));var f=[];q(a.body,function(a){f.push(b.recurse(a.expression))});a=0===a.body.length?D:1===a.body.length?f[0]:function(a,b){var c;q(f,function(d){c=
d(a,b)});return c};c&&(a.assign=function(a,b,d){return c(a,d,b)});e&&(a.inputs=e);return a},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case r.Literal:return this.value(a.value,b);case r.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case r.BinaryExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case r.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),
this["binary"+a.operator](c,e,b);case r.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case r.Identifier:return f.identifier(a.name,b,d);case r.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d):this.nonComputedMember(c,e,b,d);case r.CallExpression:return g=[],q(a.arguments,function(a){g.push(f.recurse(a))}),
a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var p=[],n=0;n<g.length;++n)p.push(g[n](a,c,d,f));a=e.apply(void 0,p,f);return b?{context:void 0,name:void 0,value:a}:a}:function(a,c,d,f){var p=e(a,c,d,f),n;if(null!=p.value){n=[];for(var q=0;q<g.length;++q)n.push(g[q](a,c,d,f));n=p.value.apply(p.context,n)}return b?{value:n}:n};case r.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,f,g){var p=
c(a,d,f,g);a=e(a,d,f,g);p.context[p.name]=a;return b?{value:a}:a};case r.ArrayExpression:return g=[],q(a.elements,function(a){g.push(f.recurse(a))}),function(a,c,d,e){for(var f=[],n=0;n<g.length;++n)f.push(g[n](a,c,d,e));return b?{value:f}:f};case r.ObjectExpression:return g=[],q(a.properties,function(a){a.computed?g.push({key:f.recurse(a.key),computed:!0,value:f.recurse(a.value)}):g.push({key:a.key.type===r.Identifier?a.key.name:""+a.key.value,computed:!1,value:f.recurse(a.value)})}),function(a,
c,d,e){for(var f={},n=0;n<g.length;++n)g[n].computed?f[g[n].key(a,c,d,e)]=g[n].value(a,c,d,e):f[g[n].key]=g[n].value(a,c,d,e);return b?{value:f}:f};case r.ThisExpression:return function(a){return b?{value:a}:a};case r.LocalsExpression:return function(a,c){return b?{value:c}:c};case r.NGValueParameter:return function(a,c,d){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=u(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,
e,f);d=u(d)?-d:-0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=Fd(k,c);return d?{value:k}:k}},"binary-":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=(u(k)?k:0)-(u(c)?c:0);return d?{value:k}:k}},"binary*":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=
a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,k){e=a(e,f,g,k)?b(e,f,g,k):d(e,f,g,k);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:void 0,name:void 0,value:a}:a}},identifier:function(a,b,d){return function(c,e,f,g){c=e&&a in e?e:c;d&&1!==d&&c&&null==c[a]&&(c[a]={});e=c?c[a]:void 0;return b?{context:c,name:a,value:e}:
e}},computedMember:function(a,b,d,c){return function(e,f,g,k){var h=a(e,f,g,k),l,m;null!=h&&(l=b(e,f,g,k),l+="",c&&1!==c&&h&&!h[l]&&(h[l]={}),m=h[l]);return d?{context:h,name:l,value:m}:m}},nonComputedMember:function(a,b,d,c){return function(e,f,g,k){e=a(e,f,g,k);c&&1!==c&&e&&null==e[b]&&(e[b]={});f=null!=e?e[b]:void 0;return d?{context:e,name:b,value:f}:f}},inputs:function(a,b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};Mb.prototype={constructor:Mb,parse:function(a){a=this.getAst(a);var b=
this.astCompiler.compile(a.ast),d=a.ast;b.literal=0===d.body.length||1===d.body.length&&(d.body[0].expression.type===r.Literal||d.body[0].expression.type===r.ArrayExpression||d.body[0].expression.type===r.ObjectExpression);b.constant=a.ast.constant;b.oneTime=a.oneTime;return b},getAst:function(a){var b=!1;a=a.trim();":"===a.charAt(0)&&":"===a.charAt(1)&&(b=!0,a=a.substring(2));return{ast:this.ast.ast(a),oneTime:b}}};var wa=M("$sce"),fa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},
Dc=/_([a-z])/g,Jg=M("$compile"),W=y.document.createElement("a"),Qd=ma(y.location.href);Rd.$inject=["$document"];gd.$inject=["$provide"];var Yd=22,Xd=".",Fc="0";Sd.$inject=["$locale"];Ud.$inject=["$locale"];var Ug={yyyy:ca("FullYear",4,0,!1,!0),yy:ca("FullYear",2,0,!0,!0),y:ca("FullYear",1,0,!1,!0),MMMM:mb("Month"),MMM:mb("Month",!0),MM:ca("Month",2,1),M:ca("Month",1,1),LLLL:mb("Month",!1,!0),dd:ca("Date",2),d:ca("Date",1),HH:ca("Hours",2),H:ca("Hours",1),hh:ca("Hours",2,-12),h:ca("Hours",1,-12),mm:ca("Minutes",
2),m:ca("Minutes",1),ss:ca("Seconds",2),s:ca("Seconds",1),sss:ca("Milliseconds",3),EEEE:mb("Day"),EEE:mb("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Ob(Math[0<a?"floor":"ceil"](a/60),2)+Ob(Math.abs(a%60),2))},ww:$d(2),w:$d(1),G:Gc,GG:Gc,GGG:Gc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},Tg=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,Sg=/^-?\d+$/;
Td.$inject=["$locale"];var Ng=ka(N),Og=ka(ub);Vd.$inject=["$parse"];var Je=ka({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===ha.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),vb={};q(Gb,function(a,b){function d(a,d,e){a.$watch(e[c],function(a){e.$set(b,!!a)})}if("multiple"!==a){var c=Da("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==
e[c]&&d(a,b,e)});vb[c]=function(){return{restrict:"A",priority:100,link:e}}}});q(ud,function(a,b){vb[b]=function(){return{priority:100,link:function(a,c,e){if("ngPattern"===b&&"/"===e.ngPattern.charAt(0)&&(c=e.ngPattern.match(Yg))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});q(["src","srcset","href"],function(a){var b=Da("ng-"+a);vb[b]=function(){return{priority:99,link:function(d,c,e){var f=a,g=a;"href"===a&&"[object SVGAnimatedString]"===ha.call(c.prop("href"))&&
(g="xlinkHref",e.$attr[g]="xlink:href",f=null);e.$observe(b,function(b){b?(e.$set(g,b),Ba&&f&&c.prop(f,e[g])):"href"===a&&e.$set(g,null)})}}}});var Qb={$addControl:D,$$renameControl:function(a,b){a.$name=b},$removeControl:D,$setValidity:D,$setDirty:D,$setPristine:D,$setSubmitted:D};Pb.$inject=["$element","$attrs","$scope","$animate","$interpolate"];Pb.prototype={$rollbackViewValue:function(){q(this.$$controls,function(a){a.$rollbackViewValue()})},$commitViewValue:function(){q(this.$$controls,function(a){a.$commitViewValue()})},
$addControl:function(a){Ha(a.$name,"input");this.$$controls.push(a);a.$name&&(this[a.$name]=a);a.$$parentForm=this},$$renameControl:function(a,b){var d=a.$name;this[d]===a&&delete this[d];this[b]=a;a.$name=b},$removeControl:function(a){a.$name&&this[a.$name]===a&&delete this[a.$name];q(this.$pending,function(b,d){this.$setValidity(d,null,a)},this);q(this.$error,function(b,d){this.$setValidity(d,null,a)},this);q(this.$$success,function(b,d){this.$setValidity(d,null,a)},this);cb(this.$$controls,a);
a.$$parentForm=Qb},$setDirty:function(){this.$$animate.removeClass(this.$$element,Ya);this.$$animate.addClass(this.$$element,Vb);this.$dirty=!0;this.$pristine=!1;this.$$parentForm.$setDirty()},$setPristine:function(){this.$$animate.setClass(this.$$element,Ya,Vb+" ng-submitted");this.$dirty=!1;this.$pristine=!0;this.$submitted=!1;q(this.$$controls,function(a){a.$setPristine()})},$setUntouched:function(){q(this.$$controls,function(a){a.$setUntouched()})},$setSubmitted:function(){this.$$animate.addClass(this.$$element,
"ng-submitted");this.$submitted=!0;this.$$parentForm.$setSubmitted()}};ce({clazz:Pb,set:function(a,b,d){var c=a[b];c?-1===c.indexOf(d)&&c.push(d):a[b]=[d]},unset:function(a,b,d){var c=a[b];c&&(cb(c,d),0===c.length&&delete a[b])}});var ke=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||D}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Pb,compile:function(d,f){d.addClass(Ya).addClass(nb);var g=f.name?"name":
a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var p=f[0];if(!("action"in e)){var n=function(b){a.$apply(function(){p.$commitViewValue();p.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",n);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",n)},0,!1)})}(f[1]||p.$$parentForm).$addControl(p);var q=g?c(p.$name):D;g&&(q(a,p),e.$observe(g,function(b){p.$name!==b&&(q(a,void 0),p.$$parentForm.$$renameControl(p,b),q=c(p.$name),q(a,p))}));d.on("$destroy",function(){p.$$parentForm.$removeControl(p);
q(a,void 0);P(p,Qb)})}}}}}]},Ke=ke(),We=ke(!0),Vg=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,gh=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,hh=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,Wg=/^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,le=/^(\d{4,})-(\d{2})-(\d{2})$/,
me=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Nc=/^(\d{4,})-W(\d\d)$/,ne=/^(\d{4,})-(\d\d)$/,oe=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,ee=R();q(["date","datetime-local","month","time","week"],function(a){ee[a]=!0});var pe={text:function(a,b,d,c,e,f){Va(a,b,d,c,e,f);Ic(c)},date:ob("date",le,Rb(le,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":ob("datetimelocal",me,Rb(me,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:ob("time",oe,Rb(oe,["HH","mm",
"ss","sss"]),"HH:mm:ss.sss"),week:ob("week",Nc,function(a,b){if(da(a))return a;if(F(a)){Nc.lastIndex=0;var d=Nc.exec(a);if(d){var c=+d[1],e=+d[2],f=d=0,g=0,k=0,h=Zd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),k=b.getMilliseconds());return new Date(c,0,h.getDate()+e,d,f,g,k)}}return NaN},"yyyy-Www"),month:ob("month",ne,Rb(ne,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f){Jc(a,b,d,c);fe(c);Va(a,b,d,c,e,f);var g,k;if(u(d.min)||d.ngMin)c.$validators.min=function(a){return c.$isEmpty(a)||
x(g)||a>=g},d.$observe("min",function(a){g=Wa(a);c.$validate()});if(u(d.max)||d.ngMax)c.$validators.max=function(a){return c.$isEmpty(a)||x(k)||a<=k},d.$observe("max",function(a){k=Wa(a);c.$validate()});if(u(d.step)||d.ngStep){var h;c.$validators.step=function(a,b){return c.$isEmpty(b)||x(h)||ge(b,g||0,h)};d.$observe("step",function(a){h=Wa(a);c.$validate()})}},url:function(a,b,d,c,e,f){Va(a,b,d,c,e,f);Ic(c);c.$$parserName="url";c.$validators.url=function(a,b){var d=a||b;return c.$isEmpty(d)||gh.test(d)}},
email:function(a,b,d,c,e,f){Va(a,b,d,c,e,f);Ic(c);c.$$parserName="email";c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||hh.test(d)}},radio:function(a,b,d,c){var e=!d.ngTrim||"false"!==Q(d.ngTrim);x(d.name)&&b.attr("name",++qb);b.on("click",function(a){var g;b[0].checked&&(g=d.value,e&&(g=Q(g)),c.$setViewValue(g,a&&a.type))});c.$render=function(){var a=d.value;e&&(a=Q(a));b[0].checked=a===c.$viewValue};d.$observe("value",c.$render)},range:function(a,b,d,c,e,f){function g(a,c){b.attr(a,
d[a]);d.$observe(a,c)}function k(a){p=Wa(a);X(c.$modelValue)||(m?(a=b.val(),p>a&&(a=p,b.val(a)),c.$setViewValue(a)):c.$validate())}function h(a){n=Wa(a);X(c.$modelValue)||(m?(a=b.val(),n<a&&(b.val(n),a=n<p?p:n),c.$setViewValue(a)):c.$validate())}function l(a){q=Wa(a);X(c.$modelValue)||(m&&c.$viewValue!==b.val()?c.$setViewValue(b.val()):c.$validate())}Jc(a,b,d,c);fe(c);Va(a,b,d,c,e,f);var m=c.$$hasNativeValidators&&"range"===b[0].type,p=m?0:void 0,n=m?100:void 0,q=m?1:void 0,r=b[0].validity;a=u(d.min);
e=u(d.max);f=u(d.step);var E=c.$render;c.$render=m&&u(r.rangeUnderflow)&&u(r.rangeOverflow)?function(){E();c.$setViewValue(b.val())}:E;a&&(c.$validators.min=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||x(p)||b>=p},g("min",k));e&&(c.$validators.max=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||x(n)||b<=n},g("max",h));f&&(c.$validators.step=m?function(){return!r.stepMismatch}:function(a,b){return c.$isEmpty(b)||x(q)||ge(b,p||0,q)},g("step",l))},checkbox:function(a,b,d,c,e,
f,g,k){var h=he(k,a,"ngTrueValue",d.ngTrueValue,!0),l=he(k,a,"ngFalseValue",d.ngFalseValue,!1);b.on("click",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return sa(a,h)});c.$parsers.push(function(a){return a?h:l})},hidden:D,button:D,submit:D,reset:D,file:D},ad=["$browser","$sniffer","$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,
f,g,k){k[0]&&(pe[N(g.type)]||pe.text)(e,f,g,k[0],b,a,d,c)}}}}],ih=/^(true|false|\d+)$/,of=function(){function a(a,d,c){var e=u(c)?c:9===Ba?"":null;a.prop("value",e);d.$set("value",c)}return{restrict:"A",priority:100,compile:function(b,d){return ih.test(d.ngValue)?function(b,d,f){b=b.$eval(f.ngValue);a(d,f,b)}:function(b,d,f){b.$watch(f.ngValue,function(b){a(d,f,b)})}}}},Oe=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,
e.ngBind);c=c[0];b.$watch(e.ngBind,function(a){c.textContent=hc(a)})}}}}],Qe=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=x(a)?"":a})}}}}],Pe=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(b){return a.valueOf(b)});
d.$$addBindingClass(c);return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){var d=f(b);c.html(a.getTrustedHtml(d)||"")})}}}}],nf=ka({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Re=Lc("",!0),Te=Lc("Odd",0),Se=Lc("Even",1),Ue=Ra({compile:function(a,b){b.$set("ngCloak",void 0);a.removeClass("ng-cloak")}}),Ve=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],fd={},jh={blur:!0,focus:!0};
q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var b=Da("ng-"+a);fd[b]=["$parse","$rootScope",function(d,c){return{restrict:"A",compile:function(e,f){var g=d(f[b]);return function(b,d){d.on(a,function(d){var e=function(){g(b,{$event:d})};jh[a]&&c.$$phase?b.$evalAsync(e):b.$apply(e)})}}}}]});var Ye=["$animate","$compile",function(a,b){return{multiElement:!0,transclude:"element",priority:600,
terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,e,f,g){var k,h,l;d.$watch(e.ngIf,function(d){d?h||g(function(d,f){h=f;d[d.length++]=b.$$createComment("end ngIf",e.ngIf);k={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),h&&(h.$destroy(),h=null),k&&(l=tb(k.clone),a.leave(l).done(function(a){!1!==a&&(l=null)}),k=null))})}}}],Ze=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ea.noop,compile:function(c,
e){var f=e.ngInclude||e.src,g=e.onload||"",k=e.autoscroll;return function(c,e,m,p,n){var q=0,r,E,A,s=function(){E&&(E.remove(),E=null);r&&(r.$destroy(),r=null);A&&(d.leave(A).done(function(a){!1!==a&&(E=null)}),E=A,A=null)};c.$watch(f,function(f){var m=function(a){!1===a||!u(k)||k&&!c.$eval(k)||b()},w=++q;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&w===q){var b=c.$new();p.template=a;a=n(b,function(a){s();d.enter(a,null,e).done(m)});r=b;A=a;r.$emit("$includeContentLoaded",f);c.$eval(g)}},function(){c.$$destroyed||
w!==q||(s(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(s(),p.template=null)})}}}}],qf=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){ha.call(d[0]).match(/SVG/)?(d.empty(),a(hd(e.template,y.document).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],$e=Ra({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),mf=function(){return{restrict:"A",
priority:100,require:"ngModel",link:function(a,b,d,c){var e=d.ngList||", ",f="false"!==d.ngTrim,g=f?Q(e):e;c.$parsers.push(function(a){if(!x(a)){var b=[];a&&q(a.split(g),function(a){a&&b.push(f?Q(a):a)});return b}});c.$formatters.push(function(a){if(I(a))return a.join(e)});c.$isEmpty=function(a){return!a||!a.length}}}},nb="ng-valid",be="ng-invalid",Ya="ng-pristine",Vb="ng-dirty",pb=M("ngModel");Sb.$inject="$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate".split(" ");
Sb.prototype={$$initGetterSetters:function(){if(this.$options.getOption("getterSetter")){var a=this.$$parse(this.$$attr.ngModel+"()"),b=this.$$parse(this.$$attr.ngModel+"($$$p)");this.$$ngModelGet=function(b){var c=this.$$parsedNgModel(b);C(c)&&(c=a(b));return c};this.$$ngModelSet=function(a,c){C(this.$$parsedNgModel(a))?b(a,{$$$p:c}):this.$$parsedNgModelAssign(a,c)}}else if(!this.$$parsedNgModel.assign)throw pb("nonassign",this.$$attr.ngModel,za(this.$$element));},$render:D,$isEmpty:function(a){return x(a)||
""===a||null===a||a!==a},$$updateEmptyClasses:function(a){this.$isEmpty(a)?(this.$$animate.removeClass(this.$$element,"ng-not-empty"),this.$$animate.addClass(this.$$element,"ng-empty")):(this.$$animate.removeClass(this.$$element,"ng-empty"),this.$$animate.addClass(this.$$element,"ng-not-empty"))},$setPristine:function(){this.$dirty=!1;this.$pristine=!0;this.$$animate.removeClass(this.$$element,Vb);this.$$animate.addClass(this.$$element,Ya)},$setDirty:function(){this.$dirty=!0;this.$pristine=!1;this.$$animate.removeClass(this.$$element,
Ya);this.$$animate.addClass(this.$$element,Vb);this.$$parentForm.$setDirty()},$setUntouched:function(){this.$touched=!1;this.$untouched=!0;this.$$animate.setClass(this.$$element,"ng-untouched","ng-touched")},$setTouched:function(){this.$touched=!0;this.$untouched=!1;this.$$animate.setClass(this.$$element,"ng-touched","ng-untouched")},$rollbackViewValue:function(){this.$$timeout.cancel(this.$$pendingDebounce);this.$viewValue=this.$$lastCommittedViewValue;this.$render()},$validate:function(){if(!X(this.$modelValue)){var a=
this.$$lastCommittedViewValue,b=this.$$rawModelValue,d=this.$valid,c=this.$modelValue,e=this.$options.getOption("allowInvalid"),f=this;this.$$runValidators(b,a,function(a){e||d===a||(f.$modelValue=a?b:void 0,f.$modelValue!==c&&f.$$writeModelToScope())})}},$$runValidators:function(a,b,d){function c(){var c=!0;q(h.$validators,function(d,e){var g=Boolean(d(a,b));c=c&&g;f(e,g)});return c?!0:(q(h.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;q(h.$asyncValidators,function(e,
g){var h=e(a,b);if(!h||!C(h.then))throw pb("nopromise",h);f(g,void 0);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?h.$$q.all(c).then(function(){g(d)},D):g(!0)}function f(a,b){k===h.$$currentValidationRunId&&h.$setValidity(a,b)}function g(a){k===h.$$currentValidationRunId&&d(a)}this.$$currentValidationRunId++;var k=this.$$currentValidationRunId,h=this;(function(){var a=h.$$parserName||"parse";if(x(h.$$parserValid))f(a,null);else return h.$$parserValid||(q(h.$validators,function(a,
b){f(b,null)}),q(h.$asyncValidators,function(a,b){f(b,null)})),f(a,h.$$parserValid),h.$$parserValid;return!0})()?c()?e():g(!1):g(!1)},$commitViewValue:function(){var a=this.$viewValue;this.$$timeout.cancel(this.$$pendingDebounce);if(this.$$lastCommittedViewValue!==a||""===a&&this.$$hasNativeValidators)this.$$updateEmptyClasses(a),this.$$lastCommittedViewValue=a,this.$pristine&&this.$setDirty(),this.$$parseAndValidate()},$$parseAndValidate:function(){var a=this.$$lastCommittedViewValue,b=this;if(this.$$parserValid=
x(a)?void 0:!0)for(var d=0;d<this.$parsers.length;d++)if(a=this.$parsers[d](a),x(a)){this.$$parserValid=!1;break}X(this.$modelValue)&&(this.$modelValue=this.$$ngModelGet(this.$$scope));var c=this.$modelValue,e=this.$options.getOption("allowInvalid");this.$$rawModelValue=a;e&&(this.$modelValue=a,b.$modelValue!==c&&b.$$writeModelToScope());this.$$runValidators(a,this.$$lastCommittedViewValue,function(d){e||(b.$modelValue=d?a:void 0,b.$modelValue!==c&&b.$$writeModelToScope())})},$$writeModelToScope:function(){this.$$ngModelSet(this.$$scope,
this.$modelValue);q(this.$viewChangeListeners,function(a){try{a()}catch(b){this.$$exceptionHandler(b)}},this)},$setViewValue:function(a,b){this.$viewValue=a;this.$options.getOption("updateOnDefault")&&this.$$debounceViewValueCommit(b)},$$debounceViewValueCommit:function(a){var b=this.$options.getOption("debounce");Y(b[a])?b=b[a]:Y(b["default"])&&(b=b["default"]);this.$$timeout.cancel(this.$$pendingDebounce);var d=this;0<b?this.$$pendingDebounce=this.$$timeout(function(){d.$commitViewValue()},b):this.$$scope.$root.$$phase?
this.$commitViewValue():this.$$scope.$apply(function(){d.$commitViewValue()})},$overrideModelOptions:function(a){this.$options=this.$options.createChild(a);this.$$setUpdateOnEvents()},$processModelValue:function(){var a=this.$$format();this.$viewValue!==a&&(this.$$updateEmptyClasses(a),this.$viewValue=this.$$lastCommittedViewValue=a,this.$render(),this.$$runValidators(this.$modelValue,this.$viewValue,D))},$$format:function(){for(var a=this.$formatters,b=a.length,d=this.$modelValue;b--;)d=a[b](d);
return d},$$setModelValue:function(a){this.$modelValue=this.$$rawModelValue=a;this.$$parserValid=void 0;this.$processModelValue()},$$setUpdateOnEvents:function(){this.$$updateEvents&&this.$$element.off(this.$$updateEvents,this.$$updateEventHandler);if(this.$$updateEvents=this.$options.getOption("updateOn"))this.$$element.on(this.$$updateEvents,this.$$updateEventHandler)},$$updateEventHandler:function(a){this.$$debounceViewValueCommit(a&&a.type)}};ce({clazz:Sb,set:function(a,b){a[b]=!0},unset:function(a,
b){delete a[b]}});var lf=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Sb,priority:1,compile:function(b){b.addClass(Ya).addClass("ng-untouched").addClass(nb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;if(f=f[2])g.$options=f.$options;g.$$initGetterSetters();b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,
c,e,f){function g(){k.$setTouched()}var k=f[0];k.$$setUpdateOnEvents();c.on("blur",function(){k.$touched||(a.$$phase?b.$evalAsync(g):b.$apply(g))})}}}}}],Tb,kh=/(\s+|^)default(\s+|$)/;Mc.prototype={getOption:function(a){return this.$$options[a]},createChild:function(a){var b=!1;a=P({},a);q(a,function(d,c){"$inherit"===d?"*"===c?b=!0:(a[c]=this.$$options[c],"updateOn"===c&&(a.updateOnDefault=this.$$options.updateOnDefault)):"updateOn"===c&&(a.updateOnDefault=!1,a[c]=Q(d.replace(kh,function(){a.updateOnDefault=
!0;return" "})))},this);b&&(delete a["*"],ie(a,this.$$options));ie(a,Tb.$$options);return new Mc(a)}};Tb=new Mc({updateOn:"",updateOnDefault:!0,debounce:0,getterSetter:!1,allowInvalid:!1,timezone:null});var pf=function(){function a(a,d){this.$$attrs=a;this.$$scope=d}a.$inject=["$attrs","$scope"];a.prototype={$onInit:function(){var a=this.parentCtrl?this.parentCtrl.$options:Tb,d=this.$$scope.$eval(this.$$attrs.ngModelOptions);this.$options=a.createChild(d)}};return{restrict:"A",priority:10,require:{parentCtrl:"?^^ngModelOptions"},
bindToController:!0,controller:a}},af=Ra({terminal:!0,priority:1E3}),lh=M("ngOptions"),mh=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,jf=["$compile","$document","$parse",function(a,b,d){function c(a,b,c){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function f(a){var b;
if(!q&&ja(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&"$"!==c.charAt(0)&&b.push(c)}return b}var p=a.match(mh);if(!p)throw lh("iexp",a,za(b));var n=p[5]||p[7],q=p[6];a=/ as /.test(p[0])&&p[1];var r=p[9];b=d(p[2]?p[1]:n);var E=a&&d(a)||b,A=r&&d(r),s=r?function(a,b){return A(c,b)}:function(a){return Na(a)},u=function(a,b){return s(a,t(a,b))},z=d(p[2]||p[1]),w=d(p[3]||""),H=d(p[4]||""),y=d(p[8]),x={},t=q?function(a,b){x[q]=b;x[n]=a;return x}:function(a){x[n]=a;return x};return{trackBy:r,getTrackByValue:u,
getWatchables:d(y,function(a){var b=[];a=a||[];for(var d=f(a),e=d.length,g=0;g<e;g++){var k=a===d?g:d[g],l=a[k],k=t(l,k),l=s(l,k);b.push(l);if(p[2]||p[1])l=z(c,k),b.push(l);p[4]&&(k=H(c,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},d=y(c)||[],g=f(d),k=g.length,n=0;n<k;n++){var p=d===g?n:g[n],q=t(d[p],p),B=E(c,q),p=s(B,q),A=z(c,q),x=w(c,q),q=H(c,q),B=new e(p,B,A,x,q);a.push(B);b[p]=B}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[u(a)]},getViewValueFromOption:function(a){return r?
na(a.viewValue):a.viewValue}}}}}var e=y.document.createElement("option"),f=y.document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=D},post:function(d,k,h,l){function m(a){var b=(a=s.getOptionFromViewValue(a))&&a.element;b&&!b.selected&&(b.selected=!0);return a}function p(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);b.value=a.selectValue}var n=l[0],r=l[1],v=
h.multiple;l=0;for(var E=k.children(),A=E.length;l<A;l++)if(""===E[l].value){n.hasEmptyOption=!0;n.emptyOption=E.eq(l);break}k.empty();l=!!n.emptyOption;z(e.cloneNode(!1)).val("?");var s,x=c(h.ngOptions,k,d),y=b[0].createDocumentFragment();n.generateUnknownOptionValue=function(a){return"?"};v?(n.writeValue=function(a){if(s){var b=a&&a.map(m)||[];s.items.forEach(function(a){a.element.selected&&-1===Array.prototype.indexOf.call(b,a)&&(a.element.selected=!1)})}},n.readValue=function(){var a=k.val()||
[],b=[];q(a,function(a){(a=s.selectValueMap[a])&&!a.disabled&&b.push(s.getViewValueFromOption(a))});return b},x.trackBy&&d.$watchCollection(function(){if(I(r.$viewValue))return r.$viewValue.map(function(a){return x.getTrackByValue(a)})},function(){r.$render()})):(n.writeValue=function(a){if(s){var b=k[0].options[k[0].selectedIndex],c=s.getOptionFromViewValue(a);b&&b.removeAttribute("selected");c?(k[0].value!==c.selectValue&&(n.removeUnknownOption(),k[0].value=c.selectValue,c.element.selected=!0),
c.element.setAttribute("selected","selected")):n.selectUnknownOrEmptyOption(a)}},n.readValue=function(){var a=s.selectValueMap[k.val()];return a&&!a.disabled?(n.unselectEmptyOption(),n.removeUnknownOption(),s.getViewValueFromOption(a)):null},x.trackBy&&d.$watch(function(){return x.getTrackByValue(r.$viewValue)},function(){r.$render()}));l&&(a(n.emptyOption)(d),k.prepend(n.emptyOption),8===n.emptyOption[0].nodeType?(n.hasEmptyOption=!1,n.registerOption=function(a,b){""===b.val()&&(n.hasEmptyOption=
!0,n.emptyOption=b,n.emptyOption.removeClass("ng-scope"),r.$render(),b.on("$destroy",function(){var a=n.$isEmptyOptionSelected();n.hasEmptyOption=!1;n.emptyOption=void 0;a&&r.$render()}))}):n.emptyOption.removeClass("ng-scope"));d.$watchCollection(x.getWatchables,function(){var a=s&&n.readValue();if(s)for(var b=s.items.length-1;0<=b;b--){var c=s.items[b];u(c.group)?Fb(c.element.parentNode):Fb(c.element)}s=x.getOptions();var d={};s.items.forEach(function(a){var b;if(u(a.group)){b=d[a.group];b||(b=
f.cloneNode(!1),y.appendChild(b),b.label=null===a.group?"null":a.group,d[a.group]=b);var c=e.cloneNode(!1);b.appendChild(c);p(a,c)}else b=e.cloneNode(!1),y.appendChild(b),p(a,b)});k[0].appendChild(y);r.$render();r.$isEmpty(a)||(b=n.readValue(),(x.trackBy||v?sa(a,b):a===b)||(r.$setViewValue(b),r.$render()))})}}}}],bf=["$locale","$interpolate","$log",function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,k){function h(a){g.text(a||"")}var l=k.count,m=k.$attr.when&&g.attr(k.$attr.when),
p=k.offset||0,n=f.$eval(m)||{},r={},v=b.startSymbol(),E=b.endSymbol(),A=v+l+"-"+p+E,s=ea.noop,u;q(k,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+N(c[2]),n[c]=g.attr(k.$attr[b]))});q(n,function(a,d){r[d]=b(a.replace(c,A))});f.$watch(l,function(b){var c=parseFloat(b),e=X(c);e||c in n||(c=a.pluralCat(c-p));c===u||e&&X(u)||(s(),e=r[c],x(e)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),s=D,h()):s=f.$watch(e,h),u=c)})}}}],cf=["$parse","$animate","$compile",function(a,b,d){var c=
M("ngRepeat"),e=function(a,b,c,d,e,m,p){a[c]=d;e&&(a[e]=m);a.$index=b;a.$first=0===b;a.$last=b===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(b&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var k=g.ngRepeat,h=d.$$createComment("end ngRepeat",k),l=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw c("iexp",k);var m=l[1],p=l[2],n=l[3],r=l[4],l=m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);
if(!l)throw c("iidexp",m);var v=l[3]||l[1],u=l[2];if(n&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(n)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(n)))throw c("badident",n);var A,s,x,z,w={$id:Na};r?A=a(r):(x=function(a,b){return Na(b)},z=function(a){return a});return function(a,d,f,g,l){A&&(s=function(b,c,d){u&&(w[u]=b);w[v]=c;w.$index=d;return A(a,w)});var m=R();a.$watchCollection(p,function(f){var g,p,r=d[0],t,A=R(),w,B,y,C,F,D,G;n&&(a[n]=f);if(ja(f))F=
f,p=s||x;else for(G in p=s||z,F=[],f)ra.call(f,G)&&"$"!==G.charAt(0)&&F.push(G);w=F.length;G=Array(w);for(g=0;g<w;g++)if(B=f===F?g:F[g],y=f[B],C=p(B,y,g),m[C])D=m[C],delete m[C],A[C]=D,G[g]=D;else{if(A[C])throw q(G,function(a){a&&a.scope&&(m[a.id]=a)}),c("dupes",k,C,y);G[g]={id:C,scope:void 0,clone:void 0};A[C]=!0}for(t in m){D=m[t];C=tb(D.clone);b.leave(C);if(C[0].parentNode)for(g=0,p=C.length;g<p;g++)C[g].$$NG_REMOVED=!0;D.scope.$destroy()}for(g=0;g<w;g++)if(B=f===F?g:F[g],y=f[B],D=G[g],D.scope){t=
r;do t=t.nextSibling;while(t&&t.$$NG_REMOVED);D.clone[0]!==t&&b.move(tb(D.clone),null,r);r=D.clone[D.clone.length-1];e(D.scope,g,v,y,u,B,w)}else l(function(a,c){D.scope=c;var d=h.cloneNode(!1);a[a.length++]=d;b.enter(a,null,r);r=d;D.clone=a;A[D.id]=D;e(D.scope,g,v,y,u,B,w)});m=A})}}}}],df=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Xe=["$animate",function(a){return{restrict:"A",
multiElement:!0,link:function(b,d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ef=Ra(function(a,b,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,c){b.css(c,"")});a&&b.css(a)},!0)}),ff=["$animate","$compile",function(a,b){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(d,c,e,f){var g=[],k=[],h=[],l=[],m=function(a,b){return function(c){!1!==c&&a.splice(b,1)}};d.$watch(e.ngSwitch||
e.on,function(c){for(var d,e;h.length;)a.cancel(h.pop());d=0;for(e=l.length;d<e;++d){var r=tb(k[d].clone);l[d].$destroy();(h[d]=a.leave(r)).done(m(h,d))}k.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&q(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");k.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],gf=Ra({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){a=d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function(a,
b,c){return c[b-1]!==a});q(a,function(a){c.cases["!"+a]=c.cases["!"+a]||[];c.cases["!"+a].push({transclude:e,element:b})})}}),hf=Ra({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),nh=M("ngTransclude"),kf=["$compile",function(a){return{restrict:"EAC",compile:function(b){var d=a(b.contents());b.empty();return function(a,b,f,g,k){function h(){d(a,function(a){b.append(a)})}if(!k)throw nh("orphan",
za(b));f.ngTransclude===f.$attr.ngTransclude&&(f.ngTransclude="");f=f.ngTransclude||f.ngTranscludeSlot;k(function(a,c){var d;if(d=a.length)a:{d=0;for(var f=a.length;d<f;d++){var g=a[d];if(g.nodeType!==Ma||g.nodeValue.trim()){d=!0;break a}}d=void 0}d?b.append(a):(h(),c.$destroy())},null,f);f&&!k.isSlotFilled(f)&&h()}}}}],Le=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"===d.type&&a.put(d.id,b[0].text)}}}],oh={$setViewValue:D,$render:D},ph=["$element",
"$scope",function(a,b){function d(){g||(g=!0,b.$$postDigest(function(){g=!1;e.ngModelCtrl.$render()}))}function c(a){k||(k=!0,b.$$postDigest(function(){b.$$destroyed||(k=!1,e.ngModelCtrl.$setViewValue(e.readValue()),a&&e.ngModelCtrl.$render())}))}var e=this,f=new Hb;e.selectValueMap={};e.ngModelCtrl=oh;e.multiple=!1;e.unknownOption=z(y.document.createElement("option"));e.hasEmptyOption=!1;e.emptyOption=void 0;e.renderUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);
a.prepend(e.unknownOption);Fa(e.unknownOption,!0);a.val(b)};e.updateUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);Fa(e.unknownOption,!0);a.val(b)};e.generateUnknownOptionValue=function(a){return"? "+Na(a)+" ?"};e.removeUnknownOption=function(){e.unknownOption.parent()&&e.unknownOption.remove()};e.selectEmptyOption=function(){e.emptyOption&&(a.val(""),Fa(e.emptyOption,!0))};e.unselectEmptyOption=function(){e.hasEmptyOption&&Fa(e.emptyOption,!1)};b.$on("$destroy",
function(){e.renderUnknownOption=D});e.readValue=function(){var b=a.val(),b=b in e.selectValueMap?e.selectValueMap[b]:b;return e.hasOption(b)?b:null};e.writeValue=function(b){var c=a[0].options[a[0].selectedIndex];c&&Fa(z(c),!1);e.hasOption(b)?(e.removeUnknownOption(),c=Na(b),a.val(c in e.selectValueMap?c:b),Fa(z(a[0].options[a[0].selectedIndex]),!0)):e.selectUnknownOrEmptyOption(b)};e.addOption=function(a,b){if(8!==b[0].nodeType){Ha(a,'"option value"');""===a&&(e.hasEmptyOption=!0,e.emptyOption=
b);var c=f.get(a)||0;f.set(a,c+1);d()}};e.removeOption=function(a){var b=f.get(a);b&&(1===b?(f.delete(a),""===a&&(e.hasEmptyOption=!1,e.emptyOption=void 0)):f.set(a,b-1))};e.hasOption=function(a){return!!f.get(a)};e.$hasEmptyOption=function(){return e.hasEmptyOption};e.$isUnknownOptionSelected=function(){return a[0].options[0]===e.unknownOption[0]};e.$isEmptyOptionSelected=function(){return e.hasEmptyOption&&a[0].options[a[0].selectedIndex]===e.emptyOption[0]};e.selectUnknownOrEmptyOption=function(a){null==
a&&e.emptyOption?(e.removeUnknownOption(),e.selectEmptyOption()):e.unknownOption.parent().length?e.updateUnknownOption(a):e.renderUnknownOption(a)};var g=!1,k=!1;e.registerOption=function(a,b,f,g,k){if(f.$attr.ngValue){var q,r=NaN;f.$observe("value",function(a){var d,f=b.prop("selected");u(r)&&(e.removeOption(q),delete e.selectValueMap[r],d=!0);r=Na(a);q=a;e.selectValueMap[r]=a;e.addOption(a,b);b.attr("value",r);d&&f&&c()})}else g?f.$observe("value",function(a){e.readValue();var d,f=b.prop("selected");
u(q)&&(e.removeOption(q),d=!0);q=a;e.addOption(a,b);d&&f&&c()}):k?a.$watch(k,function(a,d){f.$set("value",a);var g=b.prop("selected");d!==a&&e.removeOption(d);e.addOption(a,b);d&&g&&c()}):e.addOption(f.value,b);f.$observe("disabled",function(a){if("true"===a||a&&b.prop("selected"))e.multiple?c(!0):(e.ngModelCtrl.$setViewValue(null),e.ngModelCtrl.$render())});b.on("$destroy",function(){var a=e.readValue(),b=f.value;e.removeOption(b);d();(e.multiple&&a&&-1!==a.indexOf(b)||a===b)&&c(!0)})}}],Me=function(){return{restrict:"E",
require:["select","?ngModel"],controller:ph,priority:1,link:{pre:function(a,b,d,c){var e=c[0],f=c[1];if(f){if(e.ngModelCtrl=f,b.on("change",function(){e.removeUnknownOption();a.$apply(function(){f.$setViewValue(e.readValue())})}),d.multiple){e.multiple=!0;e.readValue=function(){var a=[];q(b.find("option"),function(b){b.selected&&!b.disabled&&(b=b.value,a.push(b in e.selectValueMap?e.selectValueMap[b]:b))});return a};e.writeValue=function(a){q(b.find("option"),function(b){var c=!!a&&(-1!==Array.prototype.indexOf.call(a,
b.value)||-1!==Array.prototype.indexOf.call(a,e.selectValueMap[b.value]));c!==b.selected&&Fa(z(b),c)})};var g,k=NaN;a.$watch(function(){k!==f.$viewValue||sa(g,f.$viewValue)||(g=pa(f.$viewValue),f.$render());k=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}else e.registerOption=D},post:function(a,b,d,c){var e=c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},Ne=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){var c,e;u(d.ngValue)||
(u(d.value)?c=a(d.value,!0):(e=a(b.text(),!0))||d.$set("value",b.text()));return function(a,b,d){var h=b.parent();(h=h.data("$selectController")||h.parent().data("$selectController"))&&h.registerOption(a,b,d,c,e)}}}}],cd=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){c&&(d.required=!0,c.$validators.required=function(a,b){return!d.required||!c.$isEmpty(b)},d.$observe("required",function(){c.$validate()}))}}},bd=function(){return{restrict:"A",require:"?ngModel",link:function(a,
b,d,c){if(c){var e,f=d.ngPattern||d.pattern;d.$observe("pattern",function(a){F(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw M("ngPattern")("noregexp",f,a,za(b));e=a||void 0;c.$validate()});c.$validators.pattern=function(a,b){return c.$isEmpty(b)||x(e)||e.test(b)}}}}},ed=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=-1;d.$observe("maxlength",function(a){a=Z(a);e=X(a)?-1:a;c.$validate()});c.$validators.maxlength=function(a,b){return 0>e||c.$isEmpty(b)||
b.length<=e}}}}},dd=function(){return{restrict:"A",require:"?ngModel",link:function(a,b,d,c){if(c){var e=0;d.$observe("minlength",function(a){e=Z(a)||0;c.$validate()});c.$validators.minlength=function(a,b){return c.$isEmpty(b)||b.length>=e}}}}};y.angular.bootstrap?y.console&&console.log("WARNING: Tried to load AngularJS more than once."):(De(),Ge(ea),ea.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM",
"PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,
6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,
c){var e=a|0,f=c;void 0===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),z(function(){ye(y.document,Wc)}))})(window);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.6.10
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(x,p){'use strict';function s(f,k){var e=!1,a=!1;this.ngClickOverrideEnabled=function(b){return p.isDefined(b)?(b&&!a&&(a=!0,t.$$moduleName="ngTouch",k.directive("ngClick",t),f.decorator("ngClickDirective",["$delegate",function(a){if(e)a.shift();else for(var b=a.length-1;0<=b;){if("ngTouch"===a[b].$$moduleName){a.splice(b,1);break}b--}return a}])),e=b,this):e};this.$get=function(){return{ngClickOverrideEnabled:function(){return e}}}}function v(f,k,e){n.directive(f,["$parse","$swipe",function(a,
b){return function(l,u,g){function h(c){if(!d)return!1;var a=Math.abs(c.y-d.y);c=(c.x-d.x)*k;return r&&75>a&&0<c&&30<c&&.3>a/c}var m=a(g[f]),d,r,c=["touch"];p.isDefined(g.ngSwipeDisableMouse)||c.push("mouse");b.bind(u,{start:function(c,a){d=c;r=!0},cancel:function(c){r=!1},end:function(c,d){h(c)&&l.$apply(function(){u.triggerHandler(e);m(l,{$event:d})})}},c)}}])}var n=p.module("ngTouch",[]);n.info({angularVersion:"1.6.10"});n.provider("$touch",s);s.$inject=["$provide","$compileProvider"];n.factory("$swipe",
[function(){function f(a){a=a.originalEvent||a;var b=a.touches&&a.touches.length?a.touches:[a];a=a.changedTouches&&a.changedTouches[0]||b[0];return{x:a.clientX,y:a.clientY}}function k(a,b){var l=[];p.forEach(a,function(a){(a=e[a][b])&&l.push(a)});return l.join(" ")}var e={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"},pointer:{start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"}};return{bind:function(a,
b,l){var e,g,h,m,d=!1;l=l||["mouse","touch","pointer"];a.on(k(l,"start"),function(c){h=f(c);d=!0;g=e=0;m=h;b.start&&b.start(h,c)});var r=k(l,"cancel");if(r)a.on(r,function(c){d=!1;b.cancel&&b.cancel(c)});a.on(k(l,"move"),function(c){if(d&&h){var a=f(c);e+=Math.abs(a.x-m.x);g+=Math.abs(a.y-m.y);m=a;10>e&&10>g||(g>e?(d=!1,b.cancel&&b.cancel(c)):(c.preventDefault(),b.move&&b.move(a,c)))}});a.on(k(l,"end"),function(c){d&&(d=!1,b.end&&b.end(f(c),c))})}}}]);var t=["$parse","$timeout","$rootElement",function(f,
k,e){function a(a,d,b){for(var c=0;c<a.length;c+=2){var g=a[c+1],e=b;if(25>Math.abs(a[c]-d)&&25>Math.abs(g-e))return a.splice(c,c+2),!0}return!1}function b(b){if(!(2500<Date.now()-u)){var d=b.touches&&b.touches.length?b.touches:[b],e=d[0].clientX,d=d[0].clientY;if(!(1>e&&1>d||h&&h[0]===e&&h[1]===d)){h&&(h=null);var c=b.target;"label"===p.lowercase(c.nodeName||c[0]&&c[0].nodeName)&&(h=[e,d]);a(g,e,d)||(b.stopPropagation(),b.preventDefault(),b.target&&b.target.blur&&b.target.blur())}}}function l(a){a=
a.touches&&a.touches.length?a.touches:[a];var b=a[0].clientX,e=a[0].clientY;g.push(b,e);k(function(){for(var a=0;a<g.length;a+=2)if(g[a]===b&&g[a+1]===e){g.splice(a,a+2);break}},2500,!1)}var u,g,h;return function(h,d,k){var c=f(k.ngClick),n=!1,q,s,t,v;d.on("touchstart",function(a){n=!0;q=a.target?a.target:a.srcElement;3===q.nodeType&&(q=q.parentNode);d.addClass("ng-click-active");s=Date.now();a=a.originalEvent||a;a=(a.touches&&a.touches.length?a.touches:[a])[0];t=a.clientX;v=a.clientY});d.on("touchcancel",
function(a){n=!1;d.removeClass("ng-click-active")});d.on("touchend",function(c){var h=Date.now()-s,f=c.originalEvent||c,m=(f.changedTouches&&f.changedTouches.length?f.changedTouches:f.touches&&f.touches.length?f.touches:[f])[0],f=m.clientX,m=m.clientY,w=Math.sqrt(Math.pow(f-t,2)+Math.pow(m-v,2));n&&750>h&&12>w&&(g||(e[0].addEventListener("click",b,!0),e[0].addEventListener("touchstart",l,!0),g=[]),u=Date.now(),a(g,f,m),q&&q.blur(),p.isDefined(k.disabled)&&!1!==k.disabled||d.triggerHandler("click",
[c]));n=!1;d.removeClass("ng-click-active")});d.onclick=function(a){};d.on("click",function(a,b){h.$apply(function(){c(h,{$event:b||a})})});d.on("mousedown",function(a){d.addClass("ng-click-active")});d.on("mousemove mouseup",function(a){d.removeClass("ng-click-active")})}}];v("ngSwipeLeft",-1,"swipeleft");v("ngSwipeRight",1,"swiperight")})(window,window.angular);
//# sourceMappingURL=angular-touch.min.js.map

/*!
 * angular-translate - v2.17.1 - 2018-04-16
 * 
 * Copyright (c) 2018 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(t,e){"function"==typeof define&&define.amd?define([],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():e()}(0,function(){
t.$inject = ["t"];
e.$inject = ["t", "e", "n", "a"];
n.$inject = ["t", "e"];
a.$inject = ["t", "e", "n", "a", "i"];
i.$inject = ["t", "e"];
o.$inject = ["t", "e"];
f.$inject = ["t", "e"];
g.$inject = ["t"];function t(t){"use strict";var e=t.storageKey(),n=t.storage(),a=function(){var a=t.preferredLanguage();angular.isString(a)?t.use(a):n.put(e,t.use())};a.displayName="fallbackFromIncorrectStorageValue",n?n.get(e)?t.use(n.get(e)).catch(a):a():angular.isString(t.preferredLanguage())&&t.use(t.preferredLanguage())}function e(t,e,n,a){"use strict";var r,i,s,o,u,l,c,f,g,p,h,d,v,m,$,y,b={},S=[],L=t,j=[],w="translate-cloak",C=!1,N=!1,O=".",E=!1,k=!1,P=0,A=!0,z="default",T={default:function(t){return(t||"").split("-").join("_")},java:function(t){var e=(t||"").split("-").join("_"),n=e.split("_");return n.length>1?n[0].toLowerCase()+"_"+n[1].toUpperCase():e},bcp47:function(t){var e=(t||"").split("_").join("-"),n=e.split("-");switch(n.length){case 1:n[0]=n[0].toLowerCase();break;case 2:n[0]=n[0].toLowerCase(),4===n[1].length?n[1]=n[1].charAt(0).toUpperCase()+n[1].slice(1).toLowerCase():n[1]=n[1].toUpperCase();break;case 3:n[0]=n[0].toLowerCase(),n[1]=n[1].charAt(0).toUpperCase()+n[1].slice(1).toLowerCase(),n[2]=n[2].toUpperCase();break;default:return e}return n.join("-")},"iso639-1":function(t){return(t||"").split("_").join("-").split("-")[0].toLowerCase()}},x=function(){if(angular.isFunction(a.getLocale))return a.getLocale();var t,n,r=e.$get().navigator,i=["language","browserLanguage","systemLanguage","userLanguage"];if(angular.isArray(r.languages))for(t=0;t<r.languages.length;t++)if((n=r.languages[t])&&n.length)return n;for(t=0;t<i.length;t++)if((n=r[i[t]])&&n.length)return n;return null};x.displayName="angular-translate/service: getFirstBrowserLanguage";var F=function(){var t=x()||"";return T[z]&&(t=T[z](t)),t};F.displayName="angular-translate/service: getLocale";var I=function(t,e){for(var n=0,a=t.length;n<a;n++)if(t[n]===e)return n;return-1},_=function(){return this.toString().replace(/^\s+|\s+$/g,"")},V=function(t){return angular.isString(t)?t.toLowerCase():t},R=function(t){if(t){for(var e=[],n=V(t),a=0,r=S.length;a<r;a++)e.push(V(S[a]));if((a=I(e,n))>-1)return S[a];if(i){var s;for(var o in i)if(i.hasOwnProperty(o)){var u=!1,l=Object.prototype.hasOwnProperty.call(i,o)&&V(o)===V(t);if("*"===o.slice(-1)&&(u=V(o.slice(0,-1))===V(t.slice(0,o.length-1))),(l||u)&&(s=i[o],I(e,V(s))>-1))return s}}var c=t.split("_");return c.length>1&&I(e,V(c[0]))>-1?c[0]:void 0}},D=function(t,e){if(!t&&!e)return b;if(t&&!e){if(angular.isString(t))return b[t]}else angular.isObject(b[t])||(b[t]={}),angular.extend(b[t],K(e));return this};this.translations=D,this.cloakClassName=function(t){return t?(w=t,this):w},this.nestedObjectDelimeter=function(t){return t?(O=t,this):O};var K=function(t,e,n,a){var r,i,s;e||(e=[]),n||(n={});for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s=t[r],angular.isObject(s)?K(s,e.concat(r),n,r):(i=e.length?""+e.join(O)+O+r:r,e.length&&r===a&&(n[""+e.join(O)]="@:"+i),n[i]=s));return n};K.displayName="flatObject",this.addInterpolation=function(t){return j.push(t),this},this.useMessageFormatInterpolation=function(){return this.useInterpolation("$translateMessageFormatInterpolation")},this.useInterpolation=function(t){return p=t,this},this.useSanitizeValueStrategy=function(t){return n.useStrategy(t),this},this.preferredLanguage=function(t){return t?(U(t),this):r};var U=function(t){return t&&(r=t),r};this.translationNotFoundIndicator=function(t){return this.translationNotFoundIndicatorLeft(t),this.translationNotFoundIndicatorRight(t),this},this.translationNotFoundIndicatorLeft=function(t){return t?(v=t,this):v},this.translationNotFoundIndicatorRight=function(t){return t?(m=t,this):m},this.fallbackLanguage=function(t){return M(t),this};var M=function(t){return t?(angular.isString(t)?(o=!0,s=[t]):angular.isArray(t)&&(o=!1,s=t),angular.isString(r)&&I(s,r)<0&&s.push(r),this):o?s[0]:s};this.use=function(t){if(t){if(!b[t]&&!h)throw new Error("$translateProvider couldn't find translationTable for langKey: '"+t+"'");return u=t,this}return u},this.resolveClientLocale=function(){return F()};var H=function(t){return t?(L=t,this):f?f+L:L};this.storageKey=H,this.useUrlLoader=function(t,e){return this.useLoader("$translateUrlLoader",angular.extend({url:t},e))},this.useStaticFilesLoader=function(t){return this.useLoader("$translateStaticFilesLoader",t)},this.useLoader=function(t,e){return h=t,d=e||{},this},this.useLocalStorage=function(){return this.useStorage("$translateLocalStorage")},this.useCookieStorage=function(){return this.useStorage("$translateCookieStorage")},this.useStorage=function(t){return c=t,this},this.storagePrefix=function(t){return t?(f=t,this):t},this.useMissingTranslationHandlerLog=function(){return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")},this.useMissingTranslationHandler=function(t){return g=t,this},this.usePostCompiling=function(t){return C=!!t,this},this.forceAsyncReload=function(t){return N=!!t,this},this.uniformLanguageTag=function(t){return t?angular.isString(t)&&(t={standard:t}):t={},z=t.standard,this},this.determinePreferredLanguage=function(t){var e=t&&angular.isFunction(t)?t():F();return r=S.length?R(e)||e:e,this},this.registerAvailableLanguageKeys=function(t,e){return t?(S=t,e&&(i=e),this):S},this.useLoaderCache=function(t){return!1===t?$=void 0:!0===t?$=!0:void 0===t?$="$translationCache":t&&($=t),this},this.directivePriority=function(t){return void 0===t?P:(P=t,this)},this.statefulFilter=function(t){return void 0===t?A:(A=t,this)},this.postProcess=function(t){return y=t||void 0,this},this.keepContent=function(t){return k=!!t,this},this.$get=["$log","$injector","$rootScope","$q",function(t,e,n,a){var i,f,z,T=e.get(p||"$translateDefaultInterpolation"),x=!1,V={},G={},q=function(t,e,n,o,l,g){!u&&r&&(u=r);var p=l&&l!==u?R(l)||l:u;if(l&&lt(l),angular.isArray(t)){return function(t){for(var r={},i=[],s=0,u=t.length;s<u;s++)i.push(function(t){var i=a.defer(),s=function(e){r[t]=e,i.resolve([t,e])};return q(t,e,n,o,l,g).then(s,s),i.promise}(t[s]));return a.all(i).then(function(){return r})}(t)}var h=a.defer();t&&(t=_.apply(t));var d=function(){var t=G[p]||G[r];if(f=0,c&&!t){var e=i.get(L);if(t=G[e],s&&s.length){var n=I(s,e);f=0===n?1:0,I(s,r)<0&&s.push(r)}}return t}();if(d){var v=function(){l||(p=u),it(t,e,n,o,p,g).then(h.resolve,h.reject)};v.displayName="promiseResolved",d.finally(v).catch(angular.noop)}else it(t,e,n,o,p,g).then(h.resolve,h.reject);return h.promise},Y=function(t){return v&&(t=[v,t].join(" ")),m&&(t=[t,m].join(" ")),t},B=function(t){u=t,c&&i.put(q.storageKey(),u),n.$emit("$translateChangeSuccess",{language:t}),T.setLocale(u);var e=function(t,e){V[e].setLocale(u)};e.displayName="eachInterpolatorLocaleSetter",angular.forEach(V,e),n.$emit("$translateChangeEnd",{language:t})},J=function(t){if(!t)throw"No language key specified for loading.";var r=a.defer();n.$emit("$translateLoadingStart",{language:t}),x=!0;var i=$;"string"==typeof i&&(i=e.get(i));var s=angular.extend({},d,{key:t,$http:angular.extend({},{cache:i},d.$http)}),o=function(e){var a={};n.$emit("$translateLoadingSuccess",{language:t}),angular.isArray(e)?angular.forEach(e,function(t){angular.extend(a,K(t))}):angular.extend(a,K(e)),x=!1,r.resolve({key:t,table:a}),n.$emit("$translateLoadingEnd",{language:t})};o.displayName="onLoaderSuccess";var u=function(t){n.$emit("$translateLoadingError",{language:t}),r.reject(t),n.$emit("$translateLoadingEnd",{language:t})};return u.displayName="onLoaderError",e.get(h)(s).then(o,u),r.promise};if(c&&(!(i=e.get(c)).get||!i.put))throw new Error("Couldn't use storage '"+c+"', missing get() or put() method!");if(j.length){var Q=function(t){var n=e.get(t);n.setLocale(r||u),V[n.getInterpolationIdentifier()]=n};Q.displayName="interpolationFactoryAdder",angular.forEach(j,Q)}var W=function(t){var e=a.defer();if(Object.prototype.hasOwnProperty.call(b,t))e.resolve(b[t]);else if(G[t]){var n=function(t){D(t.key,t.table),e.resolve(t.table)};n.displayName="translationTableResolver",G[t].then(n,e.reject)}else e.reject();return e.promise},X=function(t,e,n,r,i){var s=a.defer(),o=function(a){if(Object.prototype.hasOwnProperty.call(a,e)&&null!==a[e]){r.setLocale(t);var o=a[e];if("@:"===o.substr(0,2))X(t,o.substr(2),n,r,i).then(s.resolve,s.reject);else{var l=r.interpolate(a[e],n,"service",i,e);l=ut(e,a[e],l,n,t),s.resolve(l)}r.setLocale(u)}else s.reject()};return o.displayName="fallbackTranslationResolver",W(t).then(o,s.reject),s.promise},Z=function(t,e,n,a,r){var i,s=b[t];if(s&&Object.prototype.hasOwnProperty.call(s,e)&&null!==s[e]){if(a.setLocale(t),i=a.interpolate(s[e],n,"filter",r,e),i=ut(e,s[e],i,n,t,r),!angular.isString(i)&&angular.isFunction(i.$$unwrapTrustedValue)){var o=i.$$unwrapTrustedValue();if("@:"===o.substr(0,2))return Z(t,o.substr(2),n,a,r)}else if("@:"===i.substr(0,2))return Z(t,i.substr(2),n,a,r);a.setLocale(u)}return i},tt=function(t,n,a,r){return g?e.get(g)(t,u,n,a,r):t},et=function(t,e,n,r,i,o){var u=a.defer();if(t<s.length){var l=s[t];X(l,e,n,r,o).then(function(t){u.resolve(t)},function(){return et(t+1,e,n,r,i,o).then(u.resolve,u.reject)})}else if(i)u.resolve(i);else{var c=tt(e,n,i);g&&c?u.resolve(c):u.reject(Y(e))}return u.promise},nt=function(t,e,n,a,r){var i;if(t<s.length){var o=s[t];(i=Z(o,e,n,a,r))||""===i||(i=nt(t+1,e,n,a))}return i},at=function(t,e,n,a,r){return et(z>0?z:f,t,e,n,a,r)},rt=function(t,e,n,a){return nt(z>0?z:f,t,e,n,a)},it=function(t,e,n,r,i,o){var u=a.defer(),l=i?b[i]:b,c=n?V[n]:T;if(l&&Object.prototype.hasOwnProperty.call(l,t)&&null!==l[t]){var f=l[t];if("@:"===f.substr(0,2))q(f.substr(2),e,n,r,i,o).then(u.resolve,u.reject);else{var p=c.interpolate(f,e,"service",o,t);p=ut(t,f,p,e,i),u.resolve(p)}}else{var h;g&&!x&&(h=tt(t,e,r)),i&&s&&s.length?at(t,e,c,r,o).then(function(t){u.resolve(t)},function(t){u.reject(Y(t))}):g&&!x&&h?r?u.resolve(r):u.resolve(h):r?u.resolve(r):u.reject(Y(t))}return u.promise},st=function(t,e,n,a,r){var i,o=a?b[a]:b,u=T;if(V&&Object.prototype.hasOwnProperty.call(V,n)&&(u=V[n]),o&&Object.prototype.hasOwnProperty.call(o,t)&&null!==o[t]){var l=o[t];"@:"===l.substr(0,2)?i=st(l.substr(2),e,n,a,r):(i=u.interpolate(l,e,"filter",r,t),i=ut(t,l,i,e,a,r))}else{var c;g&&!x&&(c=tt(t,e,r)),a&&s&&s.length?(f=0,i=rt(t,e,u,r)):i=g&&!x&&c?c:Y(t)}return i},ot=function(t){l===t&&(l=void 0),G[t]=void 0},ut=function(t,n,a,r,i,s){var o=y;return o&&("string"==typeof o&&(o=e.get(o)),o)?o(t,n,a,r,i,s):a},lt=function(t){b[t]||!h||G[t]||(G[t]=J(t).then(function(t){return D(t.key,t.table),t}))};q.preferredLanguage=function(t){return t&&U(t),r},q.cloakClassName=function(){return w},q.nestedObjectDelimeter=function(){return O},q.fallbackLanguage=function(t){if(void 0!==t&&null!==t){if(M(t),h&&s&&s.length)for(var e=0,n=s.length;e<n;e++)G[s[e]]||(G[s[e]]=J(s[e]));q.use(q.use())}return o?s[0]:s},q.useFallbackLanguage=function(t){if(void 0!==t&&null!==t)if(t){var e=I(s,t);e>-1&&(z=e)}else z=0},q.proposedLanguage=function(){return l},q.storage=function(){return i},q.negotiateLocale=R,q.use=function(t){if(!t)return u;var e=a.defer();e.promise.then(null,angular.noop),n.$emit("$translateChangeStart",{language:t});var r=R(t);return S.length>0&&!r?a.reject(t):(r&&(t=r),l=t,!N&&b[t]||!h||G[t]?G[t]?G[t].then(function(t){return l===t.key&&B(t.key),e.resolve(t.key),t},function(t){return!u&&s&&s.length>0&&s[0]!==t?q.use(s[0]).then(e.resolve,e.reject):e.reject(t)}):(e.resolve(t),B(t)):(G[t]=J(t).then(function(n){return D(n.key,n.table),e.resolve(n.key),l===t&&B(n.key),n},function(t){return n.$emit("$translateChangeError",{language:t}),e.reject(t),n.$emit("$translateChangeEnd",{language:t}),a.reject(t)}),G[t].finally(function(){ot(t)}).catch(angular.noop)),e.promise)},q.resolveClientLocale=function(){return F()},q.storageKey=function(){return H()},q.isPostCompilingEnabled=function(){return C},q.isForceAsyncReloadEnabled=function(){return N},q.isKeepContent=function(){return k},q.refresh=function(t){function e(t){var e=J(t);return G[t]=e,e.then(function(e){b[t]={},D(t,e.table),i[t]=!0},angular.noop),e}if(!h)throw new Error("Couldn't refresh translation table, no loader registered!");n.$emit("$translateRefreshStart",{language:t});var r=a.defer(),i={};if(r.promise.then(function(){for(var t in b)b.hasOwnProperty(t)&&(t in i||delete b[t]);u&&B(u)},angular.noop).finally(function(){n.$emit("$translateRefreshEnd",{language:t})}),t)b[t]?e(t).then(r.resolve,r.reject):r.reject();else{var o=s&&s.slice()||[];u&&-1===o.indexOf(u)&&o.push(u),a.all(o.map(e)).then(r.resolve,r.reject)}return r.promise},q.instant=function(t,e,n,a,i){var o=a&&a!==u?R(a)||a:u;if(null===t||angular.isUndefined(t))return t;if(a&&lt(a),angular.isArray(t)){for(var l={},c=0,f=t.length;c<f;c++)l[t[c]]=q.instant(t[c],e,n,a,i);return l}if(angular.isString(t)&&t.length<1)return t;t&&(t=_.apply(t));var p,h=[];r&&h.push(r),o&&h.push(o),s&&s.length&&(h=h.concat(s));for(var d=0,$=h.length;d<$;d++){var y=h[d];if(b[y]&&void 0!==b[y][t]&&(p=st(t,e,n,o,i)),void 0!==p)break}if(!p&&""!==p)if(v||m)p=Y(t);else{p=T.interpolate(t,e,"filter",i);var S;g&&!x&&(S=tt(t,e,i)),g&&!x&&S&&(p=S)}return p},q.versionInfo=function(){return"2.17.1"},q.loaderCache=function(){return $},q.directivePriority=function(){return P},q.statefulFilter=function(){return A},q.isReady=function(){return E};var ct=a.defer();ct.promise.then(function(){E=!0}),q.onReady=function(t){var e=a.defer();return angular.isFunction(t)&&e.promise.then(t),E?e.resolve():ct.promise.then(e.resolve),e.promise},q.getAvailableLanguageKeys=function(){return S.length>0?S:null},q.getTranslationTable=function(t){return(t=t||q.use())&&b[t]?angular.copy(b[t]):null};var ft=n.$on("$translateReady",function(){ct.resolve(),ft(),ft=null}),gt=n.$on("$translateChangeEnd",function(){ct.resolve(),gt(),gt=null});if(h){if(angular.equals(b,{})&&q.use()&&q.use(q.use()),s&&s.length)for(var pt=0,ht=s.length;pt<ht;pt++){var dt=s[pt];!N&&b[dt]||(G[dt]=J(dt).then(function(t){return D(t.key,t.table),n.$emit("$translateChangeEnd",{language:t.key}),t}))}}else n.$emit("$translateReady",{language:q.use()});return q}]}function n(t,e){"use strict";var n,a={};return a.setLocale=function(t){n=t},a.getInterpolationIdentifier=function(){return"default"},a.useSanitizeValueStrategy=function(t){return e.useStrategy(t),this},a.interpolate=function(n,a,r,i,s){a=a||{},a=e.sanitize(a,"params",i,r);var o;return angular.isNumber(n)?o=""+n:angular.isString(n)?(o=t(n)(a),o=e.sanitize(o,"text",i,r)):o="",o},a}function a(t,e,n,a,i){"use strict";var s=function(){return this.toString().replace(/^\s+|\s+$/g,"")},o=function(t){return angular.isString(t)?t.toLowerCase():t};return{restrict:"AE",scope:!0,priority:t.directivePriority(),compile:function(u,l){var c=l.translateValues?l.translateValues:void 0,f=l.translateInterpolation?l.translateInterpolation:void 0,g=l.translateSanitizeStrategy?l.translateSanitizeStrategy:void 0,p=u[0].outerHTML.match(/translate-value-+/i),h="^(.*)("+e.startSymbol()+".*"+e.endSymbol()+")(.*)",d="^(.*)"+e.startSymbol()+"(.*)"+e.endSymbol()+"(.*)";return function(u,v,m){u.interpolateParams={},u.preText="",u.postText="",u.translateNamespace=r(u);var $={},y=function(t){if(angular.isFunction(y._unwatchOld)&&(y._unwatchOld(),y._unwatchOld=void 0),angular.equals(t,"")||!angular.isDefined(t)){var n=s.apply(v.text()),a=n.match(h);if(angular.isArray(a)){u.preText=a[1],u.postText=a[3],$.translate=e(a[2])(u.$parent);var r=n.match(d);angular.isArray(r)&&r[2]&&r[2].length&&(y._unwatchOld=u.$watch(r[2],function(t){$.translate=t,j()}))}else $.translate=n||void 0}else $.translate=t;j()};!function(t,e,n){if(e.translateValues&&angular.extend(t,a(e.translateValues)(u.$parent)),p)for(var r in n)Object.prototype.hasOwnProperty.call(e,r)&&"translateValue"===r.substr(0,14)&&"translateValues"!==r&&(t[o(r.substr(14,1))+r.substr(15)]=n[r])}(u.interpolateParams,m,l);var b=!0;m.$observe("translate",function(t){void 0===t?y(""):""===t&&b||($.translate=t,j()),b=!1});for(var S in m)m.hasOwnProperty(S)&&"translateAttr"===S.substr(0,13)&&S.length>13&&function(t){m.$observe(t,function(e){$[t]=e,j()})}(S);if(m.$observe("translateDefault",function(t){u.defaultText=t,j()}),g&&m.$observe("translateSanitizeStrategy",function(t){u.sanitizeStrategy=a(t)(u.$parent),j()}),c&&m.$observe("translateValues",function(t){t&&u.$parent.$watch(function(){angular.extend(u.interpolateParams,a(t)(u.$parent))})}),p){for(var L in m)Object.prototype.hasOwnProperty.call(m,L)&&"translateValue"===L.substr(0,14)&&"translateValues"!==L&&function(t){m.$observe(t,function(e){var n=o(t.substr(14,1))+t.substr(15);u.interpolateParams[n]=e})}(L)}var j=function(){for(var t in $)$.hasOwnProperty(t)&&void 0!==$[t]&&w(t,$[t],u,u.interpolateParams,u.defaultText,u.translateNamespace)},w=function(e,n,a,r,i,s){n?(s&&"."===n.charAt(0)&&(n=s+n),t(n,r,f,i,a.translateLanguage,a.sanitizeStrategy).then(function(t){C(t,a,!0,e)},function(t){C(t,a,!1,e)})):C(n,a,!1,e)},C=function(e,a,r,i){if(r||void 0!==a.defaultText&&(e=a.defaultText),"translate"===i){(r||!r&&!t.isKeepContent()&&void 0===m.translateKeepContent)&&v.empty().append(a.preText+e+a.postText);var s=t.isPostCompilingEnabled(),o=void 0!==l.translateCompile,u=o&&"false"!==l.translateCompile;(s&&!o||u)&&n(v.contents())(a)}else{var c=m.$attr[i];"data-"===c.substr(0,5)&&(c=c.substr(5)),c=c.substr(15),v.attr(c,e)}};(c||p||m.translateDefault)&&u.$watch("interpolateParams",j,!0),u.$on("translateLanguageChanged",j);var N=i.$on("$translateChangeSuccess",j);v.text().length?y(m.translate?m.translate:""):m.translate&&y(m.translate),j(),u.$on("$destroy",N)}}}}function r(t){"use strict";return t.translateNamespace?t.translateNamespace:t.$parent?r(t.$parent):void 0}function i(t,e){"use strict";return{restrict:"A",priority:t.directivePriority(),link:function(n,a,r){var i,o,u,l={},c=function(){angular.forEach(i,function(e,i){e&&(l[i]=!0,n.translateNamespace&&"."===e.charAt(0)&&(e=n.translateNamespace+e),t(e,o,r.translateInterpolation,void 0,n.translateLanguage,u).then(function(t){a.attr(i,t)},function(t){a.attr(i,t)}))}),angular.forEach(l,function(t,e){i[e]||(a.removeAttr(e),delete l[e])})};s(n,r.translateAttr,function(t){i=t},c),s(n,r.translateValues,function(t){o=t},c),s(n,r.translateSanitizeStrategy,function(t){u=t},c),r.translateValues&&n.$watch(r.translateValues,c,!0),n.$on("translateLanguageChanged",c);var f=e.$on("$translateChangeSuccess",c);c(),n.$on("$destroy",f)}}}function s(t,e,n,a){"use strict";e&&("::"===e.substr(0,2)?e=e.substr(2):t.$watch(e,function(t){n(t),a()},!0),n(t.$eval(e)))}function o(t,e){"use strict";return{compile:function(n){var a=function(e){e.addClass(t.cloakClassName())},r=function(e){e.removeClass(t.cloakClassName())};return a(n),function(n,i,s){var o=r.bind(this,i),u=a.bind(this,i);s.translateCloak&&s.translateCloak.length?(s.$observe("translateCloak",function(e){t(e).then(o,u)}),e.$on("$translateChangeSuccess",function(){t(s.translateCloak).then(o,u)})):t.onReady(o)}}}}function u(){"use strict";return{restrict:"A",scope:!0,compile:function(){return{pre:function(t,e,n){t.translateNamespace=l(t),t.translateNamespace&&"."===n.translateNamespace.charAt(0)?t.translateNamespace+=n.translateNamespace:t.translateNamespace=n.translateNamespace}}}}}function l(t){"use strict";return t.translateNamespace?t.translateNamespace:t.$parent?l(t.$parent):void 0}function c(){"use strict";return{restrict:"A",scope:!0,compile:function(){return function(t,e,n){n.$observe("translateLanguage",function(e){t.translateLanguage=e}),t.$watch("translateLanguage",function(){t.$broadcast("translateLanguageChanged")})}}}}function f(t,e){"use strict";var n=function(n,a,r,i){if(!angular.isObject(a)){var s=this||{__SCOPE_IS_NOT_AVAILABLE:"More info at https://github.com/angular/angular.js/commit/8863b9d04c722b278fa93c5d66ad1e578ad6eb1f"};a=t(a)(s)}return e.instant(n,a,r,i)};return e.statefulFilter()&&(n.$stateful=!0),n}function g(t){"use strict";return t("translations")}return t.$inject=["$translate"],e.$inject=["$STORAGE_KEY","$windowProvider","$translateSanitizationProvider","pascalprechtTranslateOverrider"],n.$inject=["$interpolate","$translateSanitization"],a.$inject=["$translate","$interpolate","$compile","$parse","$rootScope"],i.$inject=["$translate","$rootScope"],o.$inject=["$translate","$rootScope"],f.$inject=["$parse","$translate"],g.$inject=["$cacheFactory"],angular.module("pascalprecht.translate",["ng"]).run(t),t.displayName="runTranslate",angular.module("pascalprecht.translate").provider("$translateSanitization",function(){"use strict";var t,e,n,a=null,r=!1,i=!1;(n={sanitize:function(t,e){return"text"===e&&(t=o(t)),t},escape:function(t,e){return"text"===e&&(t=s(t)),t},sanitizeParameters:function(t,e){return"params"===e&&(t=l(t,o)),t},escapeParameters:function(t,e){return"params"===e&&(t=l(t,s)),t},sce:function(t,e,n){return"text"===e?t=u(t):"params"===e&&"filter"!==n&&(t=l(t,s)),t},sceParameters:function(t,e){return"params"===e&&(t=l(t,u)),t}}).escaped=n.escapeParameters,this.addStrategy=function(t,e){return n[t]=e,this},this.removeStrategy=function(t){return delete n[t],this},this.useStrategy=function(t){return r=!0,a=t,this},this.$get=["$injector","$log",function(s,o){var u={},l=function(t,e,a,r){return angular.forEach(r,function(r){if(angular.isFunction(r))t=r(t,e,a);else if(angular.isFunction(n[r]))t=n[r](t,e,a);else{if(!angular.isString(n[r]))throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+r+"'");if(!u[n[r]])try{u[n[r]]=s.get(n[r])}catch(t){throw u[n[r]]=function(){},new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+r+"'")}t=u[n[r]](t,e,a)}}),t},c=function(){r||i||(o.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."),i=!0)};return s.has("$sanitize")&&(t=s.get("$sanitize")),s.has("$sce")&&(e=s.get("$sce")),{useStrategy:function(t){return function(e){t.useStrategy(e)}}(this),sanitize:function(t,e,n,r){if(a||c(),n||null===n||(n=a),!n)return t;r||(r="service");var i=angular.isArray(n)?n:[n];return l(t,e,r,i)}}}];var s=function(t){var e=angular.element("<div></div>");return e.text(t),e.html()},o=function(e){if(!t)throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");return t(e)},u=function(t){if(!e)throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sce service.");return e.trustAsHtml(t)},l=function(t,e,n){if(angular.isDate(t))return t;if(angular.isObject(t)){var a=angular.isArray(t)?[]:{};if(n){if(n.indexOf(t)>-1)throw new Error("pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object")}else n=[];return n.push(t),angular.forEach(t,function(t,r){angular.isFunction(t)||(a[r]=l(t,e,n))}),n.splice(-1,1),a}return angular.isNumber(t)?t:!0===t||!1===t?t:angular.isUndefined(t)||null===t?t:e(t)}}),angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider",{}).provider("$translate",e),e.displayName="displayName",angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",n),n.displayName="$translateDefaultInterpolation",angular.module("pascalprecht.translate").constant("$STORAGE_KEY","NG_TRANSLATE_LANG_KEY"),angular.module("pascalprecht.translate").directive("translate",a),a.displayName="translateDirective",angular.module("pascalprecht.translate").directive("translateAttr",i),i.displayName="translateAttrDirective",angular.module("pascalprecht.translate").directive("translateCloak",o),o.displayName="translateCloakDirective",angular.module("pascalprecht.translate").directive("translateNamespace",u),u.displayName="translateNamespaceDirective",angular.module("pascalprecht.translate").directive("translateLanguage",c),c.displayName="translateLanguageDirective",angular.module("pascalprecht.translate").filter("translate",f),f.displayName="translateFilterFactory",angular.module("pascalprecht.translate").factory("$translationCache",g),g.displayName="$translationCache","pascalprecht.translate"});
/**
 * dirPagination - AngularJS module for paginating (almost) anything.
 *
 *
 * Credits
 * =======
 *
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ
 * for the idea on how to dynamically invoke the ng-repeat directive.
 *
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js
 *
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>
 */

(function() {

    /**
     * Config
     */
    var moduleName = 'angularUtils.directives.dirPagination';
    var DEFAULT_ID = '__default';

    /**
     * Module
     */
    angular.module(moduleName, [])
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])
        .directive('dirPaginateNoCompile', noCompileDirective)
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])
        .service('paginationService', paginationService)
        .provider('paginationTemplate', paginationTemplateProvider)
        .run(['$templateCache',dirPaginationControlsTemplateInstaller]);

    function dirPaginateDirective($compile, $parse, paginationService) {

        return  {
            terminal: true,
            multiElement: true,
            priority: 100,
            compile: dirPaginationCompileFn
        };

        function dirPaginationCompileFn(tElement, tAttrs){

            var expression = tAttrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/v1.4.x/src/ng/directive/ngRepeat.js#L339
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            addNoCompileAttributes(tElement);

            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.
            var rawId = tAttrs.paginationId || DEFAULT_ID;
            paginationService.registerInstance(rawId);

            return function dirPaginationLinkFn(scope, element, attrs){

                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;
                
                // (TODO: this seems sound, but I'm reverting as many bug reports followed it's introduction in 0.11.0.
                // Needs more investigation.)
                // In case rawId != paginationId we deregister using rawId for the sake of general cleanliness
                // before registering using paginationId
                // paginationService.deregisterInstance(rawId);
                paginationService.registerInstance(paginationId);

                var repeatExpression = getRepeatExpression(expression, paginationId);
                addNgRepeatToElement(element, attrs, repeatExpression);

                removeTemporaryAttributes(element);
                var compiled =  $compile(element);

                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function() {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 <= result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    paginationService.setAsyncModeFalse(paginationId);
                    scope.$watchCollection(function() {
                        return collectionGetter(scope);
                    }, function(collection) {
                        if (collection) {
                            var collectionLength = (collection instanceof Array) ? collection.length : Object.keys(collection).length;
                            paginationService.setCollectionLength(paginationId, collectionLength);
                        }
                    });
                }

                // Delegate to the link function returned by the new compilation of the ng-repeat
                compiled(scope);
                 
                // (TODO: Reverting this due to many bug reports in v 0.11.0. Needs investigation as the
                // principle is sound)
                // When the scope is destroyed, we make sure to remove the reference to it in paginationService
                // so that it can be properly garbage collected
                // scope.$on('$destroy', function destroyDirPagination() {
                //     paginationService.deregisterInstance(paginationId);
                // });
            };
        }

        /**
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.
         *
         * @param expression
         * @param paginationId
         * @returns {*}
         */
        function getRepeatExpression(expression, paginationId) {
            var repeatExpression,
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);

            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:\s*[^|\s]*)/, "$1 : '" + paginationId + "'");
            } else {
                repeatExpression = expression;
            }

            return repeatExpression;
        }

        /**
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the
         * appropriate multi-element ng-repeat to the first and last element in the range.
         * @param element
         * @param attrs
         * @param repeatExpression
         */
        function addNgRepeatToElement(element, attrs, repeatExpression) {
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)
                attrs.$set('ngRepeatStart', repeatExpression);
                element.eq(element.length - 1).attr('ng-repeat-end', true);
            } else {
                attrs.$set('ngRepeat', repeatExpression);
            }
        }

        /**
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.
         * @param tElement
         */
        function addNoCompileAttributes(tElement) {
            angular.forEach(tElement, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).attr('dir-paginate-no-compile', true);
                }
            });
        }

        /**
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.
         * @param element
         */
        function removeTemporaryAttributes(element) {
            angular.forEach(element, function(el) {
                if (el.nodeType === 1) {
                    angular.element(el).removeAttr('dir-paginate-no-compile');
                }
            });
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');
        }

        /**
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.
         *
         * @param scope
         * @param attrs
         * @param paginationId
         * @returns {*}
         */
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {
            var currentPageGetter;
            if (attrs.currentPage) {
                currentPageGetter = $parse(attrs.currentPage);
            } else {
                // If the current-page attribute was not set, we'll make our own.
                // Replace any non-alphanumeric characters which might confuse
                // the $parse service and give unexpected results.
                // See https://github.com/michaelbromley/angularUtils/issues/233
                var defaultCurrentPage = (paginationId + '__currentPage').replace(/\W/g, '_');
                scope[defaultCurrentPage] = 1;
                currentPageGetter = $parse(defaultCurrentPage);
            }
            return currentPageGetter;
        }
    }

    /**
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */
    function noCompileDirective() {
        return {
            priority: 5000,
            terminal: true
        };
    }

    function dirPaginationControlsTemplateInstaller($templateCache) {
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }

    function dirPaginationControlsDirective(paginationService, paginationTemplate) {

        var numberRegex = /^\d+$/;

        var DDO = {
            restrict: 'AE',
            scope: {
                maxSize: '=?',
                onPageChange: '&?',
                paginationId: '=?',
                autoHide: '=?'
            },
            link: dirPaginationControlsLinkFn
        };

        // We need to check the paginationTemplate service to see whether a template path or
        // string has been specified, and add the `template` or `templateUrl` property to
        // the DDO as appropriate. The order of priority to decide which template to use is
        // (highest priority first):
        // 1. paginationTemplate.getString()
        // 2. attrs.templateUrl
        // 3. paginationTemplate.getPath()
        var templateString = paginationTemplate.getString();
        if (templateString !== undefined) {
            DDO.template = templateString;
        } else {
            DDO.templateUrl = function(elem, attrs) {
                return attrs.templateUrl || paginationTemplate.getPath();
            };
        }
        return DDO;

        function dirPaginationControlsLinkFn(scope, element, attrs) {

            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.
            var rawId = attrs.paginationId ||  DEFAULT_ID;
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;

            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';
                if (window.console) {
                    console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
                }
            }

            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };
            scope.range = {
                lower: 1,
                upper: 1,
                total: 1
            };

            scope.$watch('maxSize', function(val) {
                if (val) {
                    paginationRange = Math.max(scope.maxSize, 5);
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }
            }, function(length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return (paginationService.getItemsPerPage(paginationId));
                }
            }, function(current, previous) {
                if (current != previous && typeof previous !== 'undefined') {
                    goToPage(scope.pagination.current);
                }
            });

            scope.$watch(function() {
                if (paginationService.isRegistered(paginationId)) {
                    return paginationService.getCurrentPage(paginationId);
                }
            }, function(currentPage, previousPage) {
                if (currentPage != previousPage) {
                    goToPage(currentPage);
                }
            });

            scope.setCurrent = function(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    num = parseInt(num, 10);
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            /**
             * Custom "track by" function which allows for duplicate "..." entries on long lists,
             * yet fixes the problem of wrongly-highlighted links which happens when using
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153
             * @param id
             * @param index
             * @returns {string}
             */
            scope.tracker = function(id, index) {
                return id + '_' + index;
            };

            function goToPage(num) {
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {
                    var oldPageNumber = scope.pagination.current;

                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;
                    updateRangeValues();

                    // if a callback has been set, then call it with the page number as the first argument
                    // and the previous page number as a second argument
                    if (scope.onPageChange) {
                        scope.onPageChange({
                            newPageNumber : num,
                            oldPageNumber : oldPageNumber
                        });
                    }
                }
            }

            function generatePagination() {
                if (paginationService.isRegistered(paginationId)) {
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;
                    scope.pagination.last = scope.pages[scope.pages.length - 1];
                    if (scope.pagination.last < scope.pagination.current) {
                        scope.setCurrent(scope.pagination.last);
                    } else {
                        updateRangeValues();
                    }
                }
            }

            /**
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";
             */
            function updateRangeValues() {
                if (paginationService.isRegistered(paginationId)) {
                    var currentPage = paginationService.getCurrentPage(paginationId),
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),
                        totalItems = paginationService.getCollectionLength(paginationId);

                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);
                    scope.range.total = totalItems;
                }
            }
            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }

        /**
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
         * links used in pagination
         *
         * @param currentPage
         * @param rowsPerPage
         * @param paginationRange
         * @param collectionLength
         * @returns {Array}
         */
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
            var pages = [];
            var totalPages = Math.ceil(collectionLength / rowsPerPage);
            var halfWay = Math.ceil(paginationRange / 2);
            var position;

            if (currentPage <= halfWay) {
                position = 'start';
            } else if (totalPages - halfWay < currentPage) {
                position = 'end';
            } else {
                position = 'middle';
            }

            var ellipsesNeeded = paginationRange < totalPages;
            var i = 1;
            while (i <= totalPages && i <= paginationRange) {
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                    pages.push('...');
                } else {
                    pages.push(pageNumber);
                }
                i ++;
            }
            return pages;
        }

        /**
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *
         * @param i
         * @param currentPage
         * @param paginationRange
         * @param totalPages
         * @returns {*}
         */
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
            var halfWay = Math.ceil(paginationRange/2);
            if (i === paginationRange) {
                return totalPages;
            } else if (i === 1) {
                return i;
            } else if (paginationRange < totalPages) {
                if (totalPages - halfWay < currentPage) {
                    return totalPages - paginationRange + i;
                } else if (halfWay < currentPage) {
                    return currentPage - halfWay + i;
                } else {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    /**
     * This filter slices the collection into pages based on the current page number and number of items per page.
     * @param paginationService
     * @returns {Function}
     */
    function itemsPerPageFilter(paginationService) {

        return function(collection, itemsPerPage, paginationId) {
            if (typeof (paginationId) === 'undefined') {
                paginationId = DEFAULT_ID;
            }
            if (!paginationService.isRegistered(paginationId)) {
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }
            var end;
            var start;
            if (angular.isObject(collection)) {
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;
                if (paginationService.isAsyncMode(paginationId)) {
                    start = 0;
                } else {
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
                }
                end = start + itemsPerPage;
                paginationService.setItemsPerPage(paginationId, itemsPerPage);

                if (collection instanceof Array) {
                    // the array just needs to be sliced
                    return collection.slice(start, end);
                } else {
                    // in the case of an object, we need to get an array of keys, slice that, then map back to
                    // the original object.
                    var slicedObject = {};
                    angular.forEach(keys(collection).slice(start, end), function(key) {
                        slicedObject[key] = collection[key];
                    });
                    return slicedObject;
                }
            } else {
                return collection;
            }
        };
    }

    /**
     * Shim for the Object.keys() method which does not exist in IE < 9
     * @param obj
     * @returns {Array}
     */
    function keys(obj) {
        if (!Object.keys) {
            var objKeys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    objKeys.push(i);
                }
            }
            return objKeys;
        } else {
            return Object.keys(obj);
        }
    }

    /**
     * This service allows the various parts of the module to communicate and stay in sync.
     */
    function paginationService() {

        var instances = {};
        var lastRegisteredInstance;

        this.registerInstance = function(instanceId) {
            if (typeof instances[instanceId] === 'undefined') {
                instances[instanceId] = {
                    asyncMode: false
                };
                lastRegisteredInstance = instanceId;
            }
        };

        this.deregisterInstance = function(instanceId) {
            delete instances[instanceId];
        };
        
        this.isRegistered = function(instanceId) {
            return (typeof instances[instanceId] !== 'undefined');
        };

        this.getLastInstanceId = function() {
            return lastRegisteredInstance;
        };

        this.setCurrentPageParser = function(instanceId, val, scope) {
            instances[instanceId].currentPageParser = val;
            instances[instanceId].context = scope;
        };
        this.setCurrentPage = function(instanceId, val) {
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
        };
        this.getCurrentPage = function(instanceId) {
            var parser = instances[instanceId].currentPageParser;
            return parser ? parser(instances[instanceId].context) : 1;
        };

        this.setItemsPerPage = function(instanceId, val) {
            instances[instanceId].itemsPerPage = val;
        };
        this.getItemsPerPage = function(instanceId) {
            return instances[instanceId].itemsPerPage;
        };

        this.setCollectionLength = function(instanceId, val) {
            instances[instanceId].collectionLength = val;
        };
        this.getCollectionLength = function(instanceId) {
            return instances[instanceId].collectionLength;
        };

        this.setAsyncModeTrue = function(instanceId) {
            instances[instanceId].asyncMode = true;
        };

        this.setAsyncModeFalse = function(instanceId) {
            instances[instanceId].asyncMode = false;
        };

        this.isAsyncMode = function(instanceId) {
            return instances[instanceId].asyncMode;
        };
    }

    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function paginationTemplateProvider() {

        var templatePath = 'angularUtils.directives.dirPagination.template';
        var templateString;

        /**
         * Set a templateUrl to be used by all instances of <dir-pagination-controls>
         * @param {String} path
         */
        this.setPath = function(path) {
            templatePath = path;
        };

        /**
         * Set a string of HTML to be used as a template by all instances
         * of <dir-pagination-controls>. If both a path *and* a string have been set,
         * the string takes precedence.
         * @param {String} str
         */
        this.setString = function(str) {
            templateString = str;
        };

        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                },
                getString: function() {
                    return templateString;
                }
            };
        };
    }
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/main.html',
    '<div class="sp_wrapper" data-ng-show="loaded"><div class="bns_inner_block clearfix"><div class="bns_top" data-ng-if="!auth && !isLogged" data-ng-style="{\'background-image\': \'url(\' + headerBg + \')\'}"><div class="bns_top_info"><div class="bns_top_slide"><img data-ng-src="{{ \'logo\' | translate }}"><div class="bns_slide_text_container"><span class="bns_slide_text" data-ng-bind-html="\'header_text\' | translate | to_trusted"></span></div><div class="bns_top_slide_linck"><a data-ng-href="{{ config.data && config.data.login_link }}" data-ng-bind="\'login\' | translate"></a></div></div></div></div><div data-ng-if="auth"><div class="bns_top" data-ng-style="{\'background-image\': \'url(\' + $parent.headerBg + \')\'}"><div class="bns_top_info clearfix" data-sailplay-profile=""><div class="bns_top_info_left" data-ng-if="!showHistory"><div class="bns_ava_block"><img data-ng-src="{{ user().user.pic }}" class="bns_ava"><div class="bns_ava_block_right"><span class="bns_name" data-ng-bind="user().user.name ? user().user.name : (\'empty_name\' | translate)"></span> <a href="#" data-ng-click="$event.preventDefault();show_history();" data-ng-bind="\'history_button\' | translate"></a></div></div><div class="bns_top_info_stat"><div class="bns_ne_pod_bal_block"><div class="bns_ne_pod_bal" data-ng-bind="user().user_points.unconfirmed | number"></div><div class="bns_ne_pod_bal_name_container"><span class="bns_ne_pod_bal_name" data-ng-bind="\'unconfirmed_points\' | translate"></span> <a href="javascript:void(0);">{{ \'unconfirmed_points_hint.title\' | translate }} <span class="bns_tile" data-ng-bind="\'unconfirmed_points_hint.text\' | translate"></span></a></div></div><div class="bns_stat_now"><img data-ng-src="{{ user().last_badge && user().last_badge.pic }}"><div class="bns_stat_name_container"><div class="bns_stat_name" data-ng-bind="user().last_badge && user().last_badge.name ? (\'you_have\' | translate) + (user().last_badge.name | tryParseField) : (\'empty_status\' | translate)"></div><a href="#" data-scroll-to=".bns_tab_block" data-ng-click="$event.preventDefault();open_badge(user().last_badge)" data-ng-bind="\'status_button\' | translate"></a></div></div></div></div><div class="bns_top_popup bns_top_popup_hist" data-sailplay-history="" data-ng-if="showHistory"><a href="#" class="close" data-ng-click="$event.preventDefault();clear_show(\'showHistory\');"></a><div class="bns_top_popup_hist"><h2 data-ng-bind="\'history_title\' | translate"></h2><div class="bns_top_popup_hist_item" data-dir-paginate="item in history() | itemsPerPage:5" data-pagination-id="history_pages"><span class="date" data-ng-bind="item.action_date | date:(\'history_date_format\' | translate)"></span> <span class="name" data-ng-bind="item | history_item"></span> <span class="bal" data-ng-class="{bal_min: item.points_delta < 0, bal_plus: item.points_delta >= 0}" data-ng-bind="item.points_delta && ((item.points_delta > 0 ? \'+\' : \'\') + (item.points_delta | number)) + \' \' + (item.points_delta |sailplay_pluralize:(\'pluralize.points\' | translate))"></span></div><dir-pagination-controls data-max-size="5" data-pagination-id="history_pages" data-template-url="/html/ui/ui.pagination.controls.html" data-auto-hide="true"></dir-pagination-controls></div></div><div class="bns_top_info_right" data-ng-show="true || !showHistory"><sailplay-pizzameter data-model="user().user_points.confirmed" style="width:100%; height: 100%;"></sailplay-pizzameter></div></div></div><div class="bns_tab"><a href="#" data-ng-repeat="tab in tabs track by $index" data-ng-click="$event.preventDefault();$parent.$parent.activeTab = tab.alias;" data-ng-class="{act: tab.alias == $parent.activeTab}" data-ng-bind="tab.name | translate"></a></div><div data-ng-switch="$parent.activeTab"><div class="bns_tab_block" id="gift" data-ng-switch-when="gifts" data-sailplay-gifts=""><div class="bns_gift_item" data-ng-repeat="gift in gifts() | orderBy:\'name\'"><div class="img-container" data-ng-style="{\'background-image\': \'url(\'+(gift.pic_full | sailplay_pic)+\')\'}"></div><div class="bns_gift_item_bottom"><span class="bns_gift_name" data-ng-bind="gift | giftName"></span> <span class="bns_gift_desc" data-ng-bind="gift | giftDesc"></span></div><a href="#" data-ng-class="{act: user().user_points.confirmed >= gift.points}" data-ng-click="$event.preventDefault();get(gift);">{{ (gift.points | number) + \' \' + (gift.points | sailplay_pluralize:(\'pluralize.points\' | translate)) }} <span class="bns_til" data-ng-if="user().user_points.confirmed < gift.points" data-ng-bind="(gift.points - user().user_points.confirmed) | giftTillNext"></span></a></div></div><div class="bns_tab_block" id="qust" data-ng-switch-when="actions" data-sailplay-actions=""><div class="bns_qust_item" data-ng-repeat="action in actions"><div data-ng-if="action._actionId"><div class="bns_qust_left"><img data-ng-src="{{ action_data(action).image }}"></div><div class="bns_qust_right"><span class="bns_qust_right_name" data-ng-bind-html="action_data(action).name | to_trusted"></span> <span class="bns_qust_right_bal" data-ng-bind="(action.points | number) + \' \' + (action.points | sailplay_pluralize:(\'pluralize.points\' | translate))"></span> <a href="#" data-sailplay-action="" data-action="action" data-text="{{ (action_data(action).openButtonText || \'make_action\') | translate }}" data-ng-bind="(action_data(action).openButtonText || \'make_action\') | translate" data-styles="{{ action_styles(action_data(action)) }}"></a></div></div><div data-ng-if="!action._actionId" data-ng-click="$event.preventDefault();$parent.$parent.open_custom_action = action;body_lock(true);"><div class="bns_qust_left"><img data-ng-src="{{ action.icon | sailplay_pic }}"></div><div class="bns_qust_right"><span class="bns_qust_right_name" data-ng-bind="action.description | sailplayActionCustomTranslateJson"></span> <span class="bns_qust_right_bal" data-ng-bind="(action.points | number) + \' \' + (action.points | sailplay_pluralize:(\'pluralize.points\' | translate))"></span> <a href="#" class="bns_qust_right_button" data-ng-click="$event.preventDefault();$parent.$parent.open_custom_action = action;body_lock(true);" data-ng-bind="action.button_text | sailplayActionCustomTranslateJson"></a></div></div></div><div class="bns_tab_block_popup" data-ng-if="open_custom_action && open_custom_action.type != \'static_page\' && open_custom_action.type != \'collect_tags\'"><div class="bns_tab_block_popup-layout" data-ng-click="$parent.open_custom_action=null;body_lock(false);"></div><div data-sailplay-action-custom="" class="bns_tab_block_popup-content" data-action="$parent.open_custom_action"></div></div><div class="bns_tab_block_popup" data-ng-if="(open_custom_action) && (open_custom_action.type == \'static_page\' || open_custom_action.type == \'collect_tags\')"><div class="bns_tab_block_popup-layout" data-ng-click="$parent.open_custom_action=null;body_lock(false);"></div><div data-sailplay-action-custom-noiframe-static-page="" class="action static_page bns_tab_block_popup-content noiframe-custom-action" data-action="$parent.open_custom_action"></div></div></div><div class="bns_tab_block" id="achiv" data-ng-switch-when="badges" data-sailplay-badges=""><div class="bns_achiv_line" data-ng-repeat="line in badges().multilevel_badges"><div class="bns_achiv_item_container"><div class="bns_achiv_item" data-ng-repeat="badge in line" data-ng-click="open(badge)" data-ng-class="{act: badge.is_received, open: badge.id == $parent.$parent.opened}"><img data-ng-src="{{ (badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs) | sailplay_pic }}"> <span>{{ badge.name | tryParseField }} <strong data-ng-show="badge.points" data-ng-bind="(badge.points | number) + \' \' + (badge.points |sailplay_pluralize:(\'pluralize.points\' | translate))"></strong></span><data-badge-info data-badges="line"></data-badge-info></div></div><data-badge-info data-badges="line"></data-badge-info></div></div></div></div></div><notify-popup></notify-popup></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/ui/ui.notify.popup.html',
    '<div class="bns_popup_wrapper" data-ng-if="data"><div class="bns_popup_layout"></div><div class="bns_popup"><a href="#" class="close" data-ng-click="$event.preventDefault();$parent.data = null;body_lock(false);"></a><h2 data-ng-bind="$parent.data.title"></h2><span class="bns_popup_text" data-ng-bind-html="$parent.data.text | to_trusted"></span></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('templates');
} catch (e) {
  module = angular.module('templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/html/ui/ui.pagination.controls.html',
    '<div class="bns_hist_page" data-ng-if="1 < pages.length || !autoHide"><span data-ng-bind="\'pages\' | translate"></span> <a href="#" data-ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" data-ng-class="{ \'act\' : pagination.current == pageNumber }" data-ng-click="setCurrent(pageNumber);$event.preventDefault();" data-ng-bind="pageNumber"></a></div>');
}]);
})();

angular.module('sp_pj_az', [
  'core',
  'ui',
  'sp',
  'templates'
])


// .filter('translate', function(){
//
// })

  .constant('headerBg', [
    '//sailplays3.cdnvideo.ru/media/assets/assetfile/86c4a3bb2ad1a46927ab5a5b6610d938.png',
    '//sailplays3.cdnvideo.ru/media/assets/assetfile/1e07a33e1efba4cd5debe2d875439618.png',
    '//sailplays3.cdnvideo.ru/media/assets/assetfile/c425ff894ab6d0efe5a58a3b4e6ac092.png'
  ])

  .directive('sailplayPjAz', ["$rootScope", "$locale", "headerBg", "$filter", "$timeout", "sp_api", "getTimeZone", function ($rootScope, $locale, headerBg, $filter, $timeout, sp_api, getTimeZone) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: '/html/main.html',
      link: function (scope, element) {

        scope.headerBg = headerBg[Math.floor(Math.random() * ((headerBg.length - 1) - 0 + 1) + 0)];
        // $rootScope.debug = true;

        scope.show_history = function () {
          scope.showHistory = true;
        };

        scope.activeTab = 'gifts';

        scope.tabs = [
          {
            alias: 'gifts',
            name: 'tabs.gifts'
          },
          {
            alias: 'actions',
            name: 'tabs.actions'
          },
          {
            alias: 'badges',
            name: 'tabs.badges'
          }
        ];

        scope.clear_all_show = function () {

          var array = [
            'showGifts',
            'showBadges',
            'showBadgesInfo',
            'showActions',
            'showHistory',
            'showStatus'
          ];

          array.forEach(function (item) {
            scope.clear_show(item);
          });

        };

        scope.$on('clear_all_show', scope.clear_all_show);

        scope.clear_show = function (name) {
          scope[name] = null;
          scope.body_lock(false);
          $timeout(function(){
            sp_api.call('load.actions.custom.list');
            sp_api.call('load.user.info', {all: 1, purchases: 1});
            sp_api.call('load.user.history', {tz: getTimeZone()});
            sp_api.call('load.badges.list');
          }, 1200)
        };

        scope.get_gift = function (gift) {
          scope.$emit('gift:get', gift);
        };

        scope.open_badge = function (badge) {
          scope.activeTab = 'badges';
          $timeout(function () {
            scope.$emit('badge:open', badge);
          }, 100);
        };

        scope.get_action = function (gift) {
          scope.$emit('action:get', gift);
        };

        scope.body_lock = function (state) {
          if (state) {
            $('body').css('overflow', 'hidden');
          } else {
            $('body').css('overflow', '');
          }
        };

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

      }
    }
  }]);

window.spbootstrap = function(){
  var app_container = document.getElementsByTagName('sailplay-pj-az')[0];
  app_container && angular.bootstrap(app_container, ['sp_pj_az']);
}
angular.module('core', [
  'pascalprecht.translate'
])

.config(["$translateProvider", function ($translateProvider) {

  //$translateProvider.translations('default', window._SP_LOCALE || {});

  $translateProvider.useLoader('magicTranslations');

  $translateProvider.preferredLanguage(window.sailplay_config.lang);

  $translateProvider.useSanitizeValueStrategy(null);

}])

.factory('magicTranslations', ["magicConfig", "$q", "sp", "$window", function(magicConfig, $q, sp, $window){
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
}])

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

.run(["sp", "sp_api", "$rootScope", "getTimeZone", "magicConfig", function (sp, sp_api, $rootScope, getTimeZone, magicConfig) {

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
}]);
(function () {

  angular.module('sp.actions', [])

    .service('actions_data', ["$rootScope", "magicConfig", function ($rootScope, magicConfig) {
      var default_data = {
        "system": {
          "inviteFriend": {
            "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/64e9e256af12573ae97a7e9dc22297a4.png",
            "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/e78e9f5ba99b40b3ccb0555ee00c983e.png",
            "styles": {
              "fb_share_btn": {
                "font-family": "Arial",
                "box-sizing": "border-box",
                "width": "100%",
                "height": "100%",
                "text-decoration": "none",
                "color": "white",
                "font-weight": "bold",
                "position": "absolute",
                "left": "0",
                "top": "0",
                "font-size": "18px",
                "line-height": "20px",
                "cursor": "pointer",
                "display": "inline-block",
                "padding-right": "10px"
              }
            }
          }
        },
        "social": {
          "fb": {
            "like": {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/bddfada95d885611c8dbcfd3d8b4c6a0.png",
              "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c12fd472b45e6d0ecee244d4d9d2216.png",
              "styles": {
                "span": {
                  "position": "relative",
                  display: "inline-block",
                  width: "370px",
                  height: "120px",
                  "display": "flex",
                  transform: "translate(0px, -40px)",
                  "justify-content": "center",
                  "align-items": "center"
                },
                "fb_share_btn": {
                  "font-family": "Arial",
                  "box-sizing": "border-box",
                  "width": "100%",
                  "height": "100%",
                  "text-decoration": "none",
                  "color": "white",
                  "font-weight": "bold",
                  "position": "absolute",
                  "bottom": "-33px",
                  "left": 0,
                  "font-size": "18px",
                  "line-height": "20px",
                  "cursor": "pointer",
                  width: "370px",
                  height: "120px",
                  "display": "flex",
                  transform: "translate(0px, -40px)",
                  "justify-content": "center",
                  "align-items": "center"
                }
              }
            },
            "partner_page": {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/bddfada95d885611c8dbcfd3d8b4c6a0.png",
              "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c12fd472b45e6d0ecee244d4d9d2216.png",
              "styles": {
                "span": {
                  "position": "relative"
                },
                "fb_share_btn": {
                  "font-family": "Arial",
                  "box-sizing": "border-box",
                  "width": "100%",
                  "height": "100%",
                  "text-decoration": "none",
                  "color": "white",
                  "font-weight": "bold",
                  "position": "absolute",
                  "bottom": "-33px",
                  "left": 0,
                  "font-size": "18px",
                  "line-height": "20px",
                  "cursor": "pointer",
                  "padding-right": "10px",
                  display: "inline-block",
                  width: "370px",
                  height: "120px",
                  "display": "flex",
                  transform: "translate(0px, -40px)",
                  "justify-content": "center",
                  "align-items": "center"
                }
              }
            },
            "purchase": {
              "image": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/bddfada95d885611c8dbcfd3d8b4c6a0.png",
              "image_h": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/3c12fd472b45e6d0ecee244d4d9d2216.png",
              "styles": {
                "span": {
                  "position": "relative"
                },
                "fb_share_btn": {
                  "font-family": "Arial",
                  "box-sizing": "border-box",
                  "width": "100%",
                  "height": "100%",
                  "text-decoration": "none",
                  "color": "white",
                  "font-weight": "bold",
                  "position": "absolute",
                  "bottom": "-33px",
                  "left": 0,
                  "font-size": "18px",
                  "line-height": "20px",
                  "cursor": "pointer",
                  "padding-right": "10px",
                  display: "inline-block",
                  width: "370px",
                  height: "120px",
                  "display": "flex",
                  transform: "translate(0px, -40px)",
                  "justify-content": "center",
                  "align-items": "center"
                }
              }
            }
          }
        }
      };

      if(magicConfig.get().lang[$rootScope.config.lang].actions){
        angular.merge(default_data, magicConfig.get().lang[$rootScope.config.lang].actions);
      }

      return default_data;
    }])

    .service('spAction', ["actions_data", "$rootScope", function (actions_data, $rootScope) {

      var self = this;

      self.stringify_widget_css = function (prefix, obj) {

        var css_string = '';

        for (var selector in obj) {

          if (obj.hasOwnProperty(selector)) {

            css_string += prefix + ' .' + selector + '{ ';

            var selector_styles = obj[selector];

            for (var prop in selector_styles) {

              if (selector_styles.hasOwnProperty(prop)) {

                css_string += prop + ':' + selector_styles[prop] + ' !important;';

              }

            }

            css_string += ' }';

          }

        }

        return css_string;

      };

      self.get_action_data = function (action) {

        var data = {};

        if (!action) return data;

        if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

        if (action.type == "static_page" || action.type == "collect_tags") data = actions_data.static_page

        if (actions_data.system[action.type]) data = actions_data.system[action.type];

        return data;

      };

      return self;

    }])

    .directive('sailplayAction', ["sp", "$rootScope", "$compile", "$timeout", function (sp, $rootScope, $compile, $timeout) {

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          init_state = elm[0].innerHTML;

          elm.on('click', function (e) {
            e.preventDefault();
          });

          function parse_action(action) {
            $timeout(function () {
              attrs.styles && elm.attr('data-styles', attrs.styles);
              attrs.text && elm.attr('data-text', attrs.text);
              sp.actions && action && sp.actions.parse(elm[0], action);
            }, 0);
          }

          scope.$watch('action', function (new_value) {
            if (new_value) {
              elm.append($compile(init_state)(scope.$parent));
              parse_action(new_value);
            }
          });

        }

      };

    }])

    /**
     * @ngdoc directive
     * @name sailplay.actions.directive:sailplayActionCustom
     * @scope
     * @restrict A
     *
     * @description
     * Renders SailPlay custom action in element.
     *
     * @param {object}  action   A SailPlay custom action object, received from api.
     *
     */
    .directive('sailplayActionCustom', ["sp", "$document", function (sp, $document) {

      var init_state;

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          var iframe = $document[0].createElement('iframe');

          iframe.style.backgroundColor = "transparent";
          iframe.frameBorder = "0";
          iframe.allowTransparency = "true";

          elm.append(iframe);

          scope.$watch('action', function (action) {

            if (action) {

              var config = sp.config();

              iframe.src = (config && ((config.DOMAIN + config.urls.actions.custom.render.replace(':action_id', action.id) + '?auth_hash=' + config.auth_hash + '&lang=' + config.lang + '&config=' + 'pjamodals'))) || '';

              iframe.className = ['sailplay_action_custom_frame', action.type].join(' ');

            }
            else {
              iframe.src = '';
            }

          });

        }

      };

    }])

    // lang filter for static_page no iframe kostyl

    .filter('sailplayActionCustomTranslateJson', ["$rootScope", "tryParseFieldFilter", function($rootScope, tryParseFieldFilter){
      return function(json){
        return tryParseFieldFilter(json)
      }
    }])

    // static_page no iframe kostyl
    .directive('sailplayActionCustomNoiframeStaticPage', ["sp", "sp_api", "$document", "$http", "$rootScope", "getTimeZone", "$timeout", function (sp, sp_api, $document, $http, $rootScope, getTimeZone, $timeout) {

      var init_state;

      return {

        template: `
          <a class="close" data-ng-click="$parent.$parent.open_custom_action=null;$parent.$parent.body_lock(false);"></a>

          <div class="container">
            <div class="row">
              <div>
                <h1 class="contentt header">
                  {{ action.content.header | sailplayActionCustomTranslateJson }}
                </h1>
              </div>
            </div>

            <div class="row">
              <p class="contentt message">
              <img ng-hide="!action.content.image" class="contentt image" data-ng-src="{{ action.content.image }}"/> 
                <span data-ng-bind="action.content.message | sailplayActionCustomTranslateJson"></span>
                
              </p>
            </div>

            <div class="row">
              <div>
                <p>
                  <a class="contentt button" href="{{ action.content.url }}" data-ng-click="complete()" target="_blank" >{{ action.content.button_text | sailplayActionCustomTranslateJson }}</a>
                </p>
              </div>
            </div>

          </div>
        `,
        restrict: 'A',
        scope: {
          action: '='
        },
        link: function (scope, elm, attrs) {

          //elm.append();

          scope.complete = angular.noop

          scope.$watch('action', function (action) {

            if (action) {

              scope.complete = function(){
                var domain = !!$rootScope.config.domain ? $rootScope.config.domain : '//sailplay.ru'
                var partner_id = $rootScope.config.partner_id
                var auth_hash = $rootScope.config.auth_hash

                var completeUrl = domain + '/js-api/' + partner_id + '/actions/custom/complete/'

                return sp.jsonp.get(completeUrl, {auth_hash: auth_hash, action_id: action.id}, function (res) {
                    if(res.status === 'error'){
                      //reject(data);
                    } else {
                      $timeout(function(){
                        sp_api.call('load.actions.custom.list');
                        sp_api.call('load.user.info', {all: 1, purchases: 1});
                        sp_api.call('load.user.history', {tz: getTimeZone()});
                        sp_api.call('load.actions.list');
                      }, 2000)
                      //resolve(data);
                    }
                  })
              }

            }
            else {
              scope.complete = angular.noop
            }

          });

        }

      };

    }])

    .directive('sailplayActions', ["sp_api", "sp", "spAction", "tagHelper", "$rootScope", "$filter", "$timeout", function (sp_api, sp, spAction, tagHelper, $rootScope, $filter, $timeout) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = [];

          scope.show = null;

          scope.action_data = spAction.get_action_data;



          $rootScope.$on('action:get', function (e, action) {
            scope.show = action;
          });

          scope.createActions = function (new_val, old_val) {

            var actions = [];

            if (sp_api.data('load.actions.list')() && sp_api.data('load.actions.list')().actions) {
              actions = actions.concat(sp_api.data('load.actions.list')().actions);
            }

            if (sp_api.data('load.actions.custom.list')() && sp_api.data('load.actions.custom.list')()) {
              actions = actions.concat(sp_api.data('load.actions.custom.list')());
            }

            scope.actions = angular.copy(actions);

          };

          /**
           * Выполнение действия
           * @param action
           */
          scope.perform_action = function (action) {
            sp.send('actions.perform', action);
          };

          sp.on('actions.perform.success', function (res) {

            sp_api.call('load.actions.list');

            sp_api.call('load.actions.custom.list');
            
            $rootScope.$apply(function () {

              scope.show = null;

              var msg;

              if (res.data.response.status == 'ok') {
                msg = {
                  title: $filter('translate')('actions_messages.success.title'),
                  text: $filter('translate')('actions_messages.success.text') + res.data.response.points + ' ' + $filter('sailplay_pluralize')(res.data.response.points, $filter(translate)('pluralize.points'))
                };
              } else {
                msg = {
                  title: $filter('translate')('actions_messages.error.title'),
                  text: res.data.response.message || $filter('translate')('actions_messages.error.text')
                };
              }

              $rootScope.$broadcast('notify:show', msg);

            });
          });

          scope.action_styles = function (action_data) {
            return action_data && action_data.styles && spAction.stringify_widget_css('', action_data.styles);
          };

          scope.$watch(function () {
            return angular.toJson([
              sp_api.data('load.actions.list')(),
              sp_api.data('load.actions.custom.list')()
            ])
          }, scope.createActions);

        }

      };

    }]);

}());

(function () {

  angular.module('sp.badges', [])

    .filter('badgeName', ["$rootScope", "tryParseFieldFilter", function ($rootScope, tryParseFieldFilter) {
      return function (badgeName) {
        tryParseFieldFilter(badgeName)
      }
    }])

    .filter('badgeDescr', ["$rootScope", "tryParseFieldFilter", function ($rootScope, tryParseFieldFilter) {
      return function (badgeDescr) {
        tryParseFieldFilter(badgeDescr)
      }
    }])

    .directive('badgeInfo', ["$rootScope", "SailPlayShare", "$window", function ($rootScope, SailPlayShare, $window) {
      return {

        restrict: 'E',
        replace: true,
        template: '<div class="bns_achiv_item_info" data-ng-if="badge">\n\n    <div class="bns_achiv_item_info_text" data-ng-bind="$parent.badge.descr | tryParseField"></div>\n\n    <div class="bns_achiv_item_info_socials">\n\n        <img width="40px" data-ng-click="$parent.share_badge($parent.badge, \'fb\')"\n             src="//sailplay.cdnvideo.ru/static/partners/pj/img/icons/share/fb.png" alt="FB">\n\n        <!--<img width="40px" data-ng-click="$parent.share_badge($parent.badge, \'vk\')"-->\n             <!--src="//sailplay.cdnvideo.ru/static/partners/pj/img/icons/share/vk.png" alt="VK">-->\n\n    </div>\n\n</div>',
        scope: {
          badges: '='
        },
        link: function (scope, elm, attrs) {

          scope.badge = null;

          $rootScope.$on('badge:open', function (e, badge) {
            var new_badge = badge && scope.badges.filter(function (item) {
              return item.id == badge.id
            })[0];
            if (!badge || !new_badge || new_badge && scope.badge && new_badge.id === scope.badge.id) {
              scope.badge = null;
              return;
            }
            scope.badge = scope.badges.filter(function (item) {
              return item.id == badge.id
            })[0];
          });

          scope.share_badge = function (badge, network) {
            SailPlayShare(network, $rootScope.config.data && $rootScope.config.data.share_url || $window.location.href, badge.name, badge.share_msg, badge.thumbs.url_250x250);
          };

        }

      };
    }])

    .directive('sailplayBadges', ["sp", "sp_api", "$rootScope", function (sp, sp_api, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.badges = () => {
            var data = sp_api.data('load.badges.list')()
            if($rootScope.config.lang == 'az') {
              return {multilevel_badges: [data.multilevel_badges[1], data.multilevel_badges[0]]}
            } else {
              return data
            }
            
          }

          scope.user = sp_api.data('load.user.info');

          scope.opened = null;

          scope.open = function (badge) {
            scope.$emit('badge:open', badge);
          };

          scope.$parent.$on('badge:open', function (e, badge) {
            scope.opened = !badge || badge.id === scope.opened ? null : badge.id;
          });

          scope.badge_config = {
            selector: '.bns_top_achiv',
            data: {
              // infinite: false,
              slidesToShow: 5,
              slidesToScroll: 1,
              slide: '.bns_top_achiv_item',
              responsive: [
                {
                  breakpoint: 930,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 3
                  }
                }]
            }
          };

        }

      };

    }]);

}());

angular.module('sp.gifts', [])

  .filter('giftName', ["$rootScope", "tryParseFieldFilter", function($rootScope, tryParseFieldFilter){
    return function(gift){
      return tryParseFieldFilter(gift.name)
    }
  }])
  .filter('giftDesc', ["$rootScope", "tryParseFieldFilter", function($rootScope, tryParseFieldFilter){
    return function(gift){
      return tryParseFieldFilter(gift.descr)
    }
  }])

  .filter('giftTillNext', ["$rootScope", "translateFilter", "numberFilter", "sailplay_pluralizeFilter", function($rootScope, translateFilter, numberFilter, sailplay_pluralizeFilter){
    return function (points){
      var lang = $rootScope.config.lang
      if(lang == 'az'){
        return (numberFilter(points)) + ' ' + (sailplay_pluralizeFilter(points, translateFilter('pluralize.points'))) + ' ' + translateFilter('need_earn_more')
      } else {
        return translateFilter('need_earn_more') + (numberFilter(points)) + ' ' + (sailplay_pluralizeFilter(points, translateFilter('pluralize.points')))        
      }
    }
  }])

  .directive('sailplayGifts', ["sp", "sp_api", "$rootScope", "$filter", "magicConfig", "$timeout", function (sp, sp_api, $rootScope, $filter, magicConfig, $timeout) {
    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.gifts = sp_api.data('load.gifts.list');

        scope.user = sp_api.data('load.user.info');

        scope.get = function (gift) {
          if (!gift || scope.user().user_points.confirmed < gift.points) return;
          sp.send('gifts.purchase', {gift: gift});
        };

        $rootScope.$on('gift:get', function (e, gift) {
          scope.gift_get = gift;
        });

        sp.on('gifts.purchase.success', function () {
          $rootScope.$apply(function () {
            scope.gift_get = null;
            $rootScope.$broadcast('notify:show', {
              title: $filter('translate')('gifts_messages.success.title'),
              text: $filter('translate')('gifts_messages.success.text')
            });
            if(magicConfig.get() && magicConfig.get().gift_cb.name){
              var fnName = magicConfig.get().gift_cb.name
              var timeout = magicConfig.get().gift_cb.timeout
              $timeout(()=>{
                window[fnName]()
              }, timeout || 0)
            }
          });
        });

        sp.on('gifts.purchase.error', function (res) {
          $rootScope.$apply(function () {
            scope.gift_get = null;
            $rootScope.$broadcast('notify:show', {
              title: $filter('translate')('gifts_messages.error.title'),
              text: res.message || $filter('translate')('gifts_messages.error.text')
            });
          });
        });

      }

    };
  }]);

angular.module('sp.history', [])

  .service('history_texts', ["$rootScope", "magicConfig", function ($rootScope, magicConfig) {
    var lang = $rootScope.config.lang
    return magicConfig.get().lang[lang].history_texts || {};
  }])

  .service('social_list', ["$rootScope", "magicConfig", function ($rootScope, magicConfig) {
    var lang = $rootScope.config.lang
    return magicConfig.get().lang[lang].social_list || {};
  }])

  .filter('history_item', ["$rootScope", "history_texts", "social_list", "$filter", "tryParseFieldFilter", function ($rootScope, history_texts, social_list, $filter, tryParseFieldFilter) {
    return function (historyItem) {

      switch (historyItem.action) {
        case 'gift_purchase':
          return history_texts.gift_purchase + ': ' + tryParseFieldFilter(historyItem.name);
        case 'event':
          return historyItem.name || history_texts.custom_action;
        case 'extra':
          return history_texts.extra || historyItem.name;
        case 'custom_action':
          return historyItem.name || history_texts.custom_action;
        case 'badge':
          return history_texts.badge + ': ' + tryParseFieldFilter(historyItem.name);
        case 'purchase':
          return history_texts.purchase || historyItem.name;
        case 'sharing':
          switch (historyItem.social_action) {
            case 'like': {
              if($rootScope.config.lang == 'az') {
                return (social_list[historyItem.social_type] || historyItem.social_type) + 'da ' + history_texts.enter_group
              } else {
                return history_texts.enter_group + social_list[historyItem.social_type] || historyItem.social_type;                
              }
            }
            case 'purchase': {
              if($rootScope.config.lang == 'az') {
                return (social_list[historyItem.social_type] || historyItem.social_type) + 'da ' + history_texts.share_purchase
              } else {
                return history_texts.share_purchase + social_list[historyItem.social_type] || historyItem.social_type;                
              }
            }
            case 'partner_page': {
              if($rootScope.config.lang == 'az') {
                return (social_list[historyItem.social_type] || historyItem.social_type) + 'da ' + history_texts.social_share
              } else {
                return history_texts.social_share + social_list[historyItem.social_type] || historyItem.social_type;                
              }
            }
            case 'badge':
              return history_texts.share_badge + social_list[historyItem.social_type] || historyItem.social_type;
          }
      }
      return history_texts[historyItem.action];

    }
  }])

  .directive('sailplayHistory', ["sp", "sp_api", function (sp, sp_api) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {
        scope.history = sp_api.data('load.user.history');
      }
    };
  }]);


angular.module('sp', [

  'sp.actions',
  'sp.gifts',
  'sp.profile',
  'sp.status',
  'sp.badges',
  'sp.pizzameter',
  'sp.history'

])

  .filter('tryParseField', ["$rootScope", function($rootScope){
    return function(field){
      var lang = $rootScope.config.lang
      try {
        var parsed = JSON.parse(field)
        if(typeof parsed != "object"){
          throw "not object"
        } else if(parsed[lang]){
          return parsed[lang]
        } else {
          return parsed.en
        }
      } catch (err) {
        return field
      }
    }
  }])

  .service('sp', ["$window", function ($window) {

    return $window.SAILPLAY || {};

  }])

  .service('config', ["sp", function (sp) {
    return sp.config() || {};
  }])

  .service('sp_api', ["$q", "sp", "$rootScope", function ($q, sp, $rootScope) {

    var self = this;

    var data = {};

    var points = [

      'load.user.info',
      'load.gifts.list',
      'load.user.history',
      'tags.exist',
      'load.badges.list',
      'load.actions.list',
      'load.actions.custom.list'

    ];

    angular.forEach(points, function (point) {

      sp.on(point + '.success', function (res) {

        $rootScope.$apply(function () {
          self.data(point, res);

          if ($rootScope.debug) {
            console.log('sailplay.api:' + point + '.success');
            console.dir(self.data(point)());
          }

        });

      });

      sp.on(point + '.error', function (res) {
        $rootScope.$apply(function () {

          if ($rootScope.debug) {
            console.log('sailplay.api:' + point + '.error');
            console.dir(res);
          }

          self.data(point, null);
        });
      });

    });

    self.data = function (key, value) {

      if (typeof value !== 'undefined') {
        data[key] = angular.copy(value);
      }

      return function () {
        return data[key];
      };

    };

    self.call = function (name, params, callback) {

      sp.send(name, params, callback);

    };

    self.reset = function () {

      data = {};

    }

  }])

  .factory('SailPlayShare', ["$window", function ($window) {
    return function (network, url, title, description, image) {

      var share_url = '';

      switch (network) {

        case 'vk':
          share_url  = 'https://vkontakte.ru/share.php?';
          share_url += 'url='          + encodeURIComponent(url);
          share_url += '&title='       + encodeURIComponent(title);
          share_url += '&description=' + encodeURIComponent(description);
          share_url += '&image='       + encodeURIComponent(image);
          share_url += '&noparse=true';
          break;

        case 'fb':

          share_url = 'https://www.facebook.com/sharer.php?s=100';
          share_url += '&t=' + encodeURIComponent(title);
          share_url += '&u=' + encodeURIComponent(url);
          break;

        case 'tw':

          share_url = 'https://twitter.com/intent/tweet?tw_p=tweetbutton';
          share_url += '&original_referer=' + encodeURIComponent(url);
          share_url += '&url=' + encodeURIComponent(url);
          share_url += '&text=' + encodeURIComponent(description);


      }

      $window.open(share_url, '_blank', 'toolbar=0,status=0,width=626,height=436,location=no');

    }
  }])

  .service('tagHelper', function () {

    var self = this;

    self.checkTag = function (tag, exist) {

      return exist.tags.filter(function (item) {
        return item.name == tag && item.exist
      }).length

    };

    return self;

  })

  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])

  .filter('math_ceil', function () {
    return function (number) {
      return Math.ceil(number);
    };
  })

  .filter('sailplay_pluralize', function () {
    var cases = [2, 0, 1, 1, 1, 2];
    return function (input, titles) {
      input = Math.abs(input);
      titles = titles.split(',');
      return titles[(input % 100 > 4 && input % 100 < 20) ? 2 : cases[(input % 10 < 5) ? input % 10 : 5]];
    }
  })

  .filter('tel', function () {
    return function (tel) {

      if (!tel) {
        return '';
      }

      tel = tel.replace(/[^\d]/g, "");

      //check if number length equals to 10
      if (tel.length >= 10) {
        //reformat and return phone number
        return tel.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5");
      }

      return null

    };
  })

  .filter('str_limit', ["$filter", function ($filter) {
    return function (input, limit) {
      if (!input) return;
      if (input.length <= limit) {
        return input;
      }
      return $filter('limitTo')(input, limit) + '...';
    };
  }])

  .filter('is_default', function () {

    function check(url) {
      if (url === '//sailplay.cdnvideo.ru/static/no_avatar100x100.jpg') {
        return true
      } else {
        return false;
      }
    }

    return function (url) {
      if (!url) return true;
      return check(url)
    }

  })

  .filter('sailplay_pic', ["sp", function (sp) {

    function repair_pic_url(url) {
      if (/^((http|https|ftp):\/\/)/.test(url)) {
        return url;
      }
      if (url.indexOf('//') === 0) {
        return window.location.protocol + url;
      }
      else {
        return sp.config().DOMAIN + url;
      }
    }

    return function (pic_url) {

      if (!pic_url) return '';

      return repair_pic_url(pic_url);

    };

  }]);
angular.module('sp.pizzameter', [])

  .filter('static', [ 'config', function(config){

    return function(file) {
      var static_url = config.env.staticUrl;
      if(static_url) return static_url + file;
      return '';
    };

  }])

  .directive('sailplayPizzameter', ["$rootScope", "config", "$filter", "magicConfig", function ($rootScope, config, $filter, magicConfig) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        model: '='
      },
      template: '<div data-ng-cloak class="pizzameter_wrapper" data-ng-style="{ backgroundImage: wrapperBG() }">  ' +
      '<div class="pizza_pieces" data-ng-style="{ backgroundImage: pizzaBG() }"></div>' +
      '<div class="pizzameter_counter" data-ng-style="{ backgroundImage: counterBG() }">  ' +
      '<div class="counter_inner"> ' +
      '<img data-ng-repeat="digit in visible_points track by $index" data-ng-src="{{ getPointsDigitUrl(digit) }}" alt="{{ digit }}"/>  ' +
      '</div>' +
      '</div> ' +
      '</div>',
      link: function (scope) {

        scope.target_points = magicConfig.get().pizzameter.cost || 0;
        scope.user_points = 0;
        scope.visible_points = '000000'.split('');

        scope.$watch('model', function(){
          if(!scope.model) return;
          scope.user_points = scope.model;
          var points_arr = scope.model.toString().split('');
          while (points_arr.length < 6) {
            points_arr.unshift('0');
          }
          scope.visible_points = points_arr;
        });

        SAILPLAY.on('pj.pizzameter', function (target_points) {
          scope.$apply(function () {
            scope.target_points = target_points;
          });
        });

        scope.wrapperBG = function () {
          return 'url(' + $filter('translate')('pizzameter.wrapper_bg') + ')';
        };

        scope.counterBG = function () {
          return 'url(' + $filter('translate')('pizzameter.counter_bg') + ')';
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


angular.module('sp.profile', [])

  .directive('sailplayProfile', ["sp", "sp_api", function (sp, sp_api) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.user = sp_api.data('load.user.info');

        scope.logout = function () {
          sp.send('logout');
        };

      }

    };

  }]);


angular.module('sp.status', [])

  .constant('spPurchaseTag', 10000017)

  .filter('spBadgeDesc', function () {
    return function (badge) {
      if (!badge) return {};
      return JSON.parse(badge.descr || '{}');
    }
  })

  .directive('sailplayStatus', ["sp", "sp_api", "spPurchaseTag", "SailPlayShare", "$window", "$rootScope", function (sp, sp_api, spPurchaseTag, SailPlayShare, $window, $rootScope) {

    return {

      restrict: 'A',
      replace: false,
      scope: true,
      link: function (scope) {

        scope.badges = sp_api.data('load.badges.list');

        scope.user = sp_api.data('load.user.info');

        scope.showBadgesInfo = scope.badges && scope.badges() && scope.badges().one_level_badges[0];

        /**
         * Get sum from next status
         * @param sum
         * @returns {*}
         */
        scope.toNextStatus = function (sum) {
          if (!scope.badges || !scope.badges()) return;
          var not_received_status = scope.badges().multilevel_badges[0].filter(function (badge) {
            return !badge.is_received
          })[0];
          var result = not_received_status && scope.getSumForStatus(not_received_status) && (scope.getSumForStatus(not_received_status) - sum);

          return result;
        };

        /**
         * Get purchases sum for status from rules
         * @param status
         * @returns {*}
         */
        scope.getSumForStatus = function (status) {
          var purchase_rule = status.rules.filter(function (rule) {
            return rule.event_id == spPurchaseTag
          })[0];
          return purchase_rule && purchase_rule.value_to_success;
        };

        /**
         * Get percents for status bar
         * @returns {string}
         */
        scope.getStatusPercents = function () {

          if (!scope.badges || !scope.badges()) return;

          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          });

          var not_received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return !badge.is_received
          });

          var len = scope.badges().multilevel_badges[0].length;
          var step = 100 / len;
          var percents = 0;
          var current_sum = scope.user().purchases.sum;
          var styles = {};

          if (received_statuses.length) {
            percents += step * received_statuses.length;
          }

          if (not_received_statuses.length) {
            var total = scope.getSumForStatus(not_received_statuses[0]);

            if (received_statuses.length) {
              current_sum -= scope.getSumForStatus(received_statuses[received_statuses.length - 1]);
              total -= scope.getSumForStatus(received_statuses[received_statuses.length - 1]);
            }

            percents += (current_sum * 100 / total) / len;
          }

          percents = percents > 100 ? null : percents < 0 ? 0 : percents;

          styles.width = percents + '%';

          return styles;

        };

        /**
         * Get percents for status bar
         * @returns {string}
         */
        scope.getNextStatusPercents = function () {
          if (!scope.badges || !scope.badges()) return;
          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          }).length;
          var len = scope.badges().multilevel_badges[0].length;
          var percents = 100 / len * (received_statuses + 1);
          var styles = {
            width: percents + '%'
          };
          if (percents > 100) {
            styles.display = 'none'
          }
          return styles;
        };

        /**
         * Get current status
         */
        scope.getCurrentStatus = function () {
          if (!scope.badges && !scope.badges()) return null;
          var received_statuses = scope.badges().multilevel_badges[0].filter(function (badge) {
            return badge.is_received
          });
          return received_statuses.length ? received_statuses[received_statuses.length - 1] : null;
        };

        scope.selected_status = scope.getCurrentStatus();

        scope.share = function (network, badge) {
          SailPlayShare(network, $rootScope.config.data.share_url || $window.location.href, badge.name, badge.share_msg, badge.thumbs.url_250x250);
        };

      }

    };

  }]);
(function () {

  angular.module('ui', [
    'angularUtils.directives.dirPagination',
    'ngTouch'
  ])

    .directive('notifyPopup', function () {

      return {

        restrict: 'E',
        replace: false,
        templateUrl: '/html/ui/ui.notify.popup.html',
        scope: true,
        link: function (scope) {

          scope.data = null;

          scope.$on('notify:show', function (e, info) {
            scope.data = info;
          });

          scope.$on('notify:hide', function () {
            scope.data = null;
          });

        }

      }

    })

    .directive('scrollTo', function () {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attr) {

          var to = $(attr.scrollTo);
          var time = attr.scrollTime;

          $(el).on('click', function () {

            to = $(attr.scrollTo);

            if (!to.length) return;

            var offset = to.offset().top;

            $("html, body").delay(100).animate({
              scrollTop: offset
            }, time || 500, function () {
              to.addClass('scrolled');
              setTimeout(function () {
                to.removeClass('scrolled')
              }, 1000)
            });

          })

        }
      }
    })

    .directive('spAuth', ["$rootScope", "sp", function ($rootScope, sp) {
      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function (scope, el, attrs) {

          var opts = scope.$eval(attrs.spAuth);

          var options = {
            node: el[0]
          };

          angular.merge(options, opts);

          $rootScope.$on('login.remote', function () {

            sp.send('login.remote', options);

          });

          sp.config() && sp.config().partner && sp.send('login.remote', options);

        }
      }
    }]);

}());
