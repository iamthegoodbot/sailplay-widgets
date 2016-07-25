(function () {

  angular.module('sp.share', [])


    .service('sailplayShare', function () {

      var shareData = {};

      function _init(shareParams) {
        shareData.baseUrl = shareParams.baseUrl;
        shareData.sharedLink = encodeURIComponent(shareData.baseUrl);
        shareData.shareImage = encodeURIComponent(shareData.baseUrl + shareParams.shareImage);
        shareData.shareTitle = encodeURIComponent(shareParams.shareTitle);
        shareData.shareDescription = encodeURIComponent(shareParams.shareDescription);
        shareData.fbAppId = encodeURIComponent(shareParams.fbAppId);
      }

      function _share(network) {
        shareData.network = network;
        _makeLinks(shareData);
      }

      function _shareCustom(network, shareParams) {

        if (shareData.baseUrl && shareParams.sharedLink && shareParams.sharedLink.indexOf('http') !== 0) {
          shareParams.sharedLink = shareData.baseUrl + shareParams.sharedLink;
        }
        if (shareData.baseUrl && shareParams.shareImage && shareParams.shareImage.indexOf('http') !== 0) {
          shareParams.shareImage = shareData.baseUrl + shareParams.shareImage;
        }

        var customShareData = {};
        customShareData.network = network;
        customShareData.fbAppId = shareData.fbAppId;
        customShareData.sharedLink = encodeURIComponent(shareParams.sharedLink);
        customShareData.shareImage = encodeURIComponent(shareParams.shareImage);
        customShareData.shareTitle = encodeURIComponent(shareParams.shareTitle);
        customShareData.shareDescription = encodeURIComponent(shareParams.shareDescription);

        _makeLinks(customShareData);

      }

      function _makeLinks(sd) {

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
        }

        function sharePopup(url, width, height) {

          if (!width) width = 400;
          if (!height) height = 400;

          var share_window = window.open(url, '_blank', 'height=' + height + ',width=' + width + ',menubar=no,toolbar=no,location=no');
          var uri_regex = new RegExp('manifest.mts.ru');

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
        shareCustom: _shareCustom,
        init: _init
      };

    })


}());
