(function () {

  angular.module('sp.share', [])

    .service('spShare', function () {

      var _data = {};

      function _init(shareParams) {
        _data.baseUrl = shareParams.baseUrl;
        _data.sharedLink = encodeURIComponent(_data.baseUrl);
        _data.shareImage = encodeURIComponent(_data.baseUrl + shareParams.shareImage);
        _data.shareTitle = encodeURIComponent(shareParams.shareTitle);
        _data.shareDescription = encodeURIComponent(shareParams.shareDescription);
        _data.host = shareParams.link || window.location.host;
        _data.fbAppId = encodeURIComponent(shareParams.fbAppId);
      }

      function _share(network) {
        _data.network = network;
        makeLinks(_data);
      }

      function _shareCustom(network, shareParams) {

        if (_data.baseUrl && shareParams.sharedLink && shareParams.sharedLink.indexOf('http') !== 0) {
          shareParams.sharedLink = _data.baseUrl + shareParams.sharedLink;
        }
        if (_data.baseUrl && shareParams.shareImage && shareParams.shareImage.indexOf('http') !== 0) {
          shareParams.shareImage = _data.baseUrl + shareParams.shareImage;
        }

        var customShareData = {};
        customShareData.network = network;
        customShareData.fbAppId = _data.fbAppId;
        customShareData.sharedLink = encodeURIComponent(shareParams.sharedLink);
        customShareData.shareImage = encodeURIComponent(shareParams.shareImage);
        customShareData.shareTitle = encodeURIComponent(shareParams.shareTitle);
        customShareData.shareDescription = encodeURIComponent(shareParams.shareDescription);

        makeLinks(customShareData);
      }

      function makeLinks(sd) {

        switch (sd.network) {
          case "vk":
            sharePopup("http://vkontakte.ru/share.php?url=" + sd.sharedLink + '&image=' + sd.shareImage + '&title=' + sd.shareTitle + '&description=' + sd.shareDescription);
            break;
          case "fb":
            sharePopup('https://www.facebook.com/dialog/feed?app_id=' + sd.fbAppId + '&display=popup&name=' + sd.shareTitle + '&description=' + sd.shareDescription + '&picture=' + sd.shareImage + '&link=' + sd.sharedLink + '&redirect_uri=' + sd.sharedLink, 550, 300);
            break;
          case "tw":
            sharePopup("https://twitter.com/intent/tweet?original_referer=" + sd.sharedLink + "&tw_p=tweetbutton&url=" + sd.sharedLink + "&text=" /*+ sd.shareTitle +' '*/ + sd.shareDescription);
            break;
          case "ok":
            sharePopup("http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + sd.sharedLink + "&st.comments=" + sd.shareTitle + ". " + sd.shareDescription, 480);
            break;
          case "gp":
            sharePopup("https://plus.google.com/share?url=" + window.location.href);
            break;
        }

        function sharePopup(url, width, height) {
          if (!width) width = 400;
          if (!height) height = 400;

          var share_window = window.open(url, '_blank', 'height=' + height + ',width=' + width + ',menubar=no,toolbar=no,location=no');
          var uri_regex = new RegExp(_data.host);

          var watch_timer = setInterval(function () {
            try {
              if (share_window.closed) {
                clearInterval(watch_timer);
                return;
              }
              if (uri_regex.test(share_window.location)) {
                clearInterval(watch_timer);
                share_window.close();
              }
            } catch (e) {
            }
          }, 200);

        }
      }

      return {
        share: _share,
        custom: _shareCustom,
        init: _init
      };

    })

}());
