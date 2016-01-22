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
                try {
                    head.removeChild(newScript);
                }
                catch (err) {}
                delete window.JSONP_CALLBACK[callback_name];
                success && success(data);
            };

            data["callback"] = 'JSONP_CALLBACK.' + callback_name;
            if(_config.dep_id) data.dep_id = _config.dep_id;

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
                catch (err) {}
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
    var _remote_login_init = false;

    function initError(){
        alert('Please init SailPlay HUB first!');
    }

    function remoteLogin(opts){

        var frame;

        opts = opts || {};

        if(opts.node && opts.node.nodeType == 1 && opts.node.tagName == 'IFRAME'){
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

            var data= {};

            if(messageEvent.origin == _config.DOMAIN){
                try {
                    data = JSON.parse(messageEvent.data);
                }
                catch(e){

                }
            }
            if(data.name == 'login.success'){
                sp.send('login.do', data.auth_hash);
                return;
            }
            if(data.name == 'login.cancel'){
                sp.send('login.cancel');
                cancelLogin();
                return;
            }
            if(data.name == 'login.check'){
                if(data.auth_hash == 'None'){
                    sp.send('logout');
                }
                else {
                    cancelLogin();
                    sp.send('login.do', data.auth_hash)
                }
                return;
            }
            if(data.name == 'logout.success'){
                _config.auth_hash = '';
                sp.send('logout.success');
            }

        }

        function cancelLogin(){
            if(frame.created){
                try {
                    document.body.removeChild(frame)
                }
                catch(e){

                }
            }
        }

        var params = {};
        params.partner_id = _config.partner.id;
        params.dep_id = _config.dep_id || '';
        params.background = opts.background || '';
        params.partner_info = opts.partner_info || 0;


        var params_string = [];

        var src = _config.DOMAIN + '/users/auth-page/?';
        for (var param_name in params) {
            params_string.push(param_name + "=" + encodeURIComponent(params[param_name]));
        }
        src += params_string.join("&");

        frame.setAttribute('src', src);

        if(!_remote_login_init){
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
        JSONP.get((params.domain || '//sailplay.ru') + '/js-api/' + params.partner_id + '/config/', { lang: params.lang || 'ru', dep_id: (params.dep_id || '') }, function (response) {
            if (response && response.status == 'ok') {

                _config = response.config;
                _config.DOMAIN = (params.domain || '//sailplay.ru');
                _config.dep_id = params.dep_id || '';
                _config.env.staticUrl = params.static_url || _config.env.staticUrl;
                _config.social_networks = [ 'fb', 'vk', 'tw', 'gp', 'ok' ];

                //postmessage events init
                //1. bind action events
                function onActionMessage(messageEvent) {
                    var data= {};
                    //console.log('MESSAGE: ', messageEvent.origin , _config.DOMAIN);
                    //console.dir(messageEvent)
                    if(messageEvent.origin == _config.DOMAIN){
                        try {
                            data = JSON.parse(messageEvent.data);
                        }
                        catch (e){

                        }
                        //console.log("LALAL", data , data.name);
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
                        }

                    }
                }

                window.addEventListener("message", onActionMessage, false);

                //2. bind login events

                sp.send('init.success', _config);
                //        console.dir(_config);
            } else {
                sp.send('init.error', response);
                alert('SailPlay: app load failed!');
            }
        });

    });

    sp.on('login.remote', function(options){
        remoteLogin(options);
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
        var req = document.createElement('iframe');
        req.width = 0;
        req.height = 0;
        req.style.border = 'none';
        req.src = _config.DOMAIN + '/users/logout';
        document.body.appendChild(req);
        req.onload = function(){
            document.body.removeChild(req);
        };
        _config.auth_hash = '';
        cookies.eraseCookie('sp_auth_hash');
        sp.send('logout.success');

    });

    //USER INFO
    sp.on('load.user.info', function (p) {
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
        if(p && p.purchases) {
            params.purchases = p.purchases;
        }
        if(p && p.all) {
            params.all = p.all;
        }
        JSONP.get(_config.DOMAIN + _config.urls.users.info, params, function (res) {
            if (res.status == 'ok') {
                sp.send('load.user.info.success', res);
            } else {
                sp.send('load.user.info.error', res);
            }
        });
    });

    // user update
    sp.on("user.update", function(params) {
        if(_config == {}){
            initError();
            return;
        }
        JSONP.get(_config.DOMAIN + "/js-api/" + _config.partner.id + "/users/update/", params, function(res) {
            if (res.status == 'ok') {
                sp.send('user.update.success', res);
            } else {
                sp.send('user.update.error', res);
            }
        })
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

                function create_badge_actions(badge){
                    if(badge && badge.is_received) {

                        badge.actions = {};

                        for(var sn in _config.social_networks){

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

                for(var ch in res.multilevel_badges){

                    var multi_line = res.multilevel_badges[ch];

                    for(var b in multi_line){

                        create_badge_actions(multi_line[b]);

                    }

                }

                for(var olb in res.one_level_badges){

                    create_badge_actions(res.one_level_badges[olb]);

                }

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
    //actions v2 section
    sp.actions = {};

    sp.actions.parse = function(dom, action){

        if(!sp.is_dom(dom)) {
            console.error('sp.actions.parse() need DOM element as first parameter');
            return;
        }

        //console.log('ACTION HERE', action);
        if(!action) {
            console.error('sp.actions.parse() need Action object as second parameter');
            return;
        }

        if(!_actions_config.connectedAccounts) {
            console.error('sp.actions.parse() must execute after event load.actions.list.success');
            return;
        }

        var styles = dom.getAttribute('data-styles');


        var action_frame = document.createElement('IFRAME');
        action_frame.style.border = 'none';
        action_frame.style.width = '150px';
        action_frame.style.height = '30px';
        action_frame.style.background = 'transparent';
        action_frame.style.overflow = 'hidden';
        action_frame.setAttribute('scrolling', 'no');
        action_frame.className = 'sailplay_action_frame';

        function EncodeQueryData(data)
        {
            var ret = [];
            for (var d in data)
                ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            return ret.join("&");
        }

        var frame_params = {
            auth_hash: _config.auth_hash,
            socialType: action.socialType,
            action: action.action,
            link: action.shortLink,
            pic: (action.pic || _actions_config.partnerCustomPic || _config.partner.logo),
            msg: (action.msg || _actions_config.messages[action.action] || _config.partner.name),
            account_connected: _actions_config.connectedAccounts[action.socialType] || false
        };

        if(action['_actionId']) frame_params._actionId = action._actionId;
        if(styles) frame_params.styles = styles;

        if (action.action == 'purchase') {
            frame_params.purchasePublicKey = _actions_config.purchasePublicKey;
        }

        if (action.action == 'badge') {
            frame_params.badgeId= action.badgeId;
        }

        action_frame.src = _config.DOMAIN + '/js-api/' + _config.partner.id + '/actions/social-widget/v2/?' + EncodeQueryData(frame_params);;
        dom.innerHTML = '';
        dom.appendChild(action_frame);

    };

    sp.on('actions.parse', function (actions) {
        if(_config == {}){
            initError();
            return;
        }

        if(actions && Array.isArray(actions)) {
            Actions.social_init(actions);
        }
        else {
            sp.send('actions.perform.error', { message: 'Actions list needed' });
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

    // tag exist
    sp.on("tags.exist", function(tags) {
        if(_config == {}){
            initError();
            return;
        }
        if (_config.auth_hash && tags) {
            var obj = {
                tags : JSON.stringify(tags),
                auth_hash: _config.auth_hash
            };
            JSONP.get(_config.DOMAIN + _config.urls.tags.exist, obj, function(res) {
                if (res.status == 'ok') {
                    sp.send('tags.exist.success', res);
                } else {
                    sp.send('tags.exist.error', res);
                }
            });
        } else {
            SAILPLAY.trigger('tags.exist.auth.error', tags);
        }
    });

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
    sp.on('load.reviews.list', function (data) {
        if(_config == {}){
            initError();
            return;
        }

        var req_data = {};

        if(data){
            req_data.page = data.page || 1
        }

        JSONP.get(_config.DOMAIN + _config.urls.reviews.list, req_data, function (res) {
            if (res.status == 'ok') {
                sp.send('load.reviews.list.success', { page: res.page, pages: res.pages, reviews: res.reviews });
            } else {
                sp.send('load.reviews.list.error', res);
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

    sp.on('purchases.add', function (data) {
        if(_config == {}){
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
    sp.config = function(){
        return _config;
    };

    sp.find_by_properties = function(arr, props){
        var filtered_arr = [];
        for(var i = 0; i < arr.length; i+=1) {
            var seeked = arr[i];
            var good = true;
            for(var p in props){
                if(props[p] != seeked[p]){
                    good = false;
                }
            }
            if(good) filtered_arr.push(seeked);
        }
        return filtered_arr;
    };

    sp.jsonp = JSONP;

    sp.is_dom = function(obj){
        //Returns true if it is a DOM node

        function isNode(o){
            return (
                typeof Node === "object" ? o instanceof Node :
                o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
            );
        }

        //Returns true if it is a DOM element
        function isElement(o){
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        }

        return isNode(obj) || isElement(obj);

    };

    return sp;

}());