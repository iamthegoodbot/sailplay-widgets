  (function () {

  angular.module('sg.services.actions', [])

    .service('actionS', function ($q) {

      var self = this;

      var cssLink = '//d3sailplay.cdnvideo.ru/media/assets/assetfile/2b7a1c69c47253cc63282b2df2cff4a9.css';

      self.getCss = function(){
        return cssLink;
      };

      self.getTitle = function (action) {
        if (!action) return 'No description';
        var obj = {
          like: 'Like us on ',
          partner_page: 'Share our website on '
        };
        var socObj = {
          fb: 'Facebook',
          tw: 'Twitter',
          gp: 'Google+',
          ok: 'Ok',
          vk: 'Vk'
        };
        var result = (obj[action.action] ? obj[action.action] : '') + (socObj[action.socialType] ? socObj[action.socialType] : '');
        return result || 'Custom action';
      };

      self.getIcon = function (action) {
        if (!action) return '';
        var obj = {
          partner_page: {
            fb: 'this-icon-2',
            tw: 'this-icon-5',
            gp: 'this-icon-3'
          },
          like: {
            fb: 'this-icon-1',
            tw: 'this-icon-5',
            gp: 'this-icon-3'
          },
          fill: 'this-icon-6'

        };
        if (action.socialType && obj[action.action] && obj[action.action][action.socialType]) {
          return obj[action.action][action.socialType];
        } else {
          return obj['other'];
        }
      };

      return self;

    });

}());