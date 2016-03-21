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

  //PERFORM ACTION
  //actions v2 section
  function mobile_social_parse(dom, action){

    console.log(sp.config().partner.logo);

    var data = {
      message: (action.msg || _actions_config.messages[action.action] || sp.config().partner.name),
      title: (sp.config().partner.name || 'SailPlay'),
      link: action.shortLink,
      pic: repair_pic_url(action.pic || _actions_config.partnerCustomPic || sp.config().partner.logo)
    };


    dom.onclick = function() {

      console.dir(action);

      socialShare(action, data.title, data.link, data.message, data.pic);

    };

  }

  sp.actions.parse = function(dom, action){

    if(!sp.is_dom(dom)) {
      console.error('sp.actions.parse() need DOM element as first parameter');
      return;
    }

    if(!action) {
      console.error('sp.actions.parse() need Action object as second parameter');
      return;
    }

    if(!_actions_config.connectedAccounts) {

      console.error('sp.actions.parse() must execute after event load.actions.list.success');
      return;

    }

    if(!action.socialType){

      //console.dir(action);
      dom.addEventListener('click', function(){
        console.dir(action);
        sp.send('actions.perform', action);
      });

      return;

    }

    if(sp.config().platform === 'mobile' && action.socialType){

      if(action.action == 'like'){

        switch (action.socialType) {

          case 'fb':

            mobile_social_parse(dom, action);

            break;

          case 'vk':

            mobile_social_parse(dom, action);

            break;

          case 'ok':

            mobile_social_parse(dom, action);

            break;

        }

      }

      else {

        console.log('parse social mobile', action);

        mobile_social_parse(dom, action);

      }

    }

    else {

      parse_frame(false);

    }

    function parse_frame(force){
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
        auth_hash: sp.config().auth_hash,
        socialType: action.socialType,
        action: action.action,
        link: action.shortLink,
        pic: (action.pic || _actions_config.partnerCustomPic || sp.config().partner.logo),
        msg: (action.msg || _actions_config.messages[action.action] || sp.config().partner.name),
        account_connected: force ? true : (_actions_config.connectedAccounts[action.socialType] || false)
      };

      if(action['_actionId']) frame_params._actionId = action._actionId;
      if(styles) frame_params.styles = styles;

      if (action.action == 'purchase') {
        frame_params.purchasePublicKey = _actions_config.purchasePublicKey;
      }

      if (action.action == 'badge') {
        frame_params.badgeId= action.badgeId;
      }

      action_frame.src = sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/v2/?' + EncodeQueryData(frame_params);;
      dom.innerHTML = '';
      dom.appendChild(action_frame);
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
  };

  sp.on('actions.perform', function (action) {
    if(sp.config() == {}){
      return;
    }
    if (sp.config().auth_hash) {
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

  function shareFB(title,url,desc,image) {

    var share_url;
    var t=encodeURIComponent(title);
    var d=encodeURIComponent(desc);
    var u=encodeURIComponent(url);
    var i=encodeURIComponent(image);
    var app_id = _actions_config.social.fb.appId;
    share_url='https://www.facebook.com/dialog/feed';
    share_url+='&app_id=' + app_id;
    share_url+='&redirect_uri=' + sp.config().DOMAIN + '/js-api/' + sp.config().partner.id + '/actions/social-widget/v2/';
    share_url+='&link=' + u;
    share_url+='&description=' + d;
    share_url+='&caption=' + t;
    share_url+='&picture=' + i;
    share_url+='&display=popup';

    return share_url;
  }

  function shareVK(title,url,desc,image) {
    var t=encodeURIComponent(title);
    var d=encodeURIComponent(desc);
    var u=encodeURIComponent(url);
    var i=encodeURIComponent(image);
    var share_url='http://vk.com/share.php';
    share_url+='?title='+t+'&description='+d+'&url='+u;
    share_url+='&image='+i;
    share_url+='&noparse=1';
    return share_url;
  }

  function shareOD(title,url,desc,image) {
    var t=encodeURIComponent(title);
    var d=encodeURIComponent(desc);
    var u=encodeURIComponent(url);
    var i=encodeURIComponent(image);
    var ok_url = 'http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl='+u;
    ok_url += '&st.comments=' + desc;
    return ok_url;
  }

  function shareTW(title,url,desc,image) {
    var d=encodeURIComponent(desc);
    var u=encodeURIComponent(url);
    var share_url='https://twitter.com/intent/tweet?';
    share_url+='text='+ d;
    share_url+='&url='+u;
    return share_url;
  }

  function followVK(){
    return 'https://vk.com/widget_community.php?act=a_subscribe_box&oid=-' + _actions_config.social.vk.groupId + '&state=1';
  }

  function likeFB(){
    return 'https://www.facebook.com/v2.5/plugins/like.php?app_id=' + _actions_config.social.fb.appId + '&container_width=613&href=https%3A%2F%2Ffacebook.com%2F' + _actions_config.social.fb.groupId +'&layout=button&locale=en_US&sdk=joey&share=false&show_faces=true';
  }

  function likeOK(){
    return 'https://connect.ok.ru/dk?cmd=WidgetGroupConfirm&st.cmd=WidgetGroupConfirm&st._aid=ExternalGroupWidget_joinConfirm&st.groupId=' + _actions_config.social.ok.groupId;
    //return sp.config().DOMAIN + _actions_config.social.ok.likePopupUrl + '?ok_group_id=' + _actions_config.social.ok.groupId;
  }

  function socialShare(action,title,url,desc,image, dom) {

    var s_type = action.socialType;
    var u = '';
    if(action.action == 'like'){

      switch(action.socialType){
        case 'vk':
          u = followVK();
          break;
        case 'fb':
          u = likeFB();
          break;
        case 'ok':
          u = likeOK();
          break;

      }

    }
    else {
      switch(action.socialType){
        case 'vk':
          u = shareVK(title,url,desc,image);
          break;
        case 'fb':
          u = shareFB(title,url,desc,image);
          break;
        case 'ok':
          u = shareOD(title,url,desc,image);
          break;
        case 'tw':
          u = shareTW(title,url,desc,image);
          break;
      }
    }

    if(url != ''){

      var popup;
      var popup_checker;
      function end_share(){
        clearInterval(popup_checker);

        var handle_params = {
          partner_id: sp.config().partner.id,
          social_type: s_type,
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
      popup = Actions.popupWindow(u,'_blank',626,436);

      popup.addEventListener('loadstop', function() {
        popup.executeScript({
          code: 'window.doCancel = function(){ window.location.href = "' + sp.config().DOMAIN + '"; }'
        });
        popup.executeScript({
          code: '' +
          'var table = document.getElementsByClassName("uiGrid")[0];' +
          'table.style.zoom = 5;' +
          'table.style.width = "100%";' +
          'table.style.marginTop = "10%";' +
          'var form = document.getElementById("u_0_0");' +
          'form && form.addEventListener("submit", function(e){' +
          'window.location.href = "' + sp.config().DOMAIN + '";' +
          '});'
        });

        if(action.socialType = 'ok' && action.action == 'like'){

          popup.executeScript({
            code: '' +
            'if(window.localStorage.getItem("joined")) {' +
              'window.localStorage.removeItem("joined");' +
              'window.location.href = "' + sp.config().DOMAIN + '";' +
            '}' +
            'document.addEventListener("click", function(e){' +
              'var t = e.target;' +
              'while(t.parentNode){' +
                'if(t.innerHTML.indexOf("Join") >= 0) { ' +
                  'window.localStorage.setItem("joined", "1")' +
                '}' +
                't = t.parentNode;' +
              '}' +
            '});'
          });

        }
      });

      popup.addEventListener('loadstart', function(event) {
        if(event.url && (event.url.indexOf(sp.config().DOMAIN) === 0 || event.url.indexOf('st._aid=ExternalShareWidget_SharePost') >= 0 || event.url.indexOf('/tweet/complete') >= 0 || event.url.indexOf('/plugins/close_popup.php') >= 0)){
          popup.close();
          popup = null;
          end_share();
        }
      });
      popup.addEventListener('exit', function(event) {
          popup.close();
          popup = null;
          end_share();
      });
      popup_checker = setInterval(function(){
        if(popup.closed || popup == null){
          end_share();
        }
      }, 100);
    }
    return false;
  }



}());
