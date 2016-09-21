(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {
        "inviteFriend": {
          name: 'Refer a friend',
          tag: 'Promoter',
          pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/52f3aa5849849e22de2c2901e4bec460.png'
        }
      },
      "social": {
        "fb": {
          "like": {
            "name": "Like us on Facebook",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/88dad9278dcb0be82fbbe438d6896f93.png'
          }
        },
        "gp": {
          "partner_page": {
            "name": "Tell about us on G+",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/bbc394e07931fba967c4e73de13ada19.png'
          }
        }

      }
    })

    .constant('reviews_data', [
      {
        name: 'Leave a review on Google',
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/bbc394e07931fba967c4e73de13ada19.png',
        points: 100,
        buttons: [
          {
            name: 'Review Rainbow',
            link: 'https://www.google.com/webhp?sourceid=chrome-instant&rlz=1C1OPRB_enUS508US508&ion=1&espv=2&ie=UTF-8#q=aces%20dental%20rainbow&lrd=0x80c8c7ae1622e309:0xa7d3e66393ad392c,3',
            tag: 'G: Review Rainbow'
          },
          {
            name: 'Review Sunset',
            link: 'https://www.google.com/webhp?sourceid=chrome-instant&rlz=1C1OPRB_enUS508US508&ion=1&espv=2&ie=UTF-8#q=aces+dental+sunset&lrd=0x80c8cffd9b854223:0xf0175d958af0960d,3',
            tag: 'G: Review Sunset'
          },
          {
            name: 'Review Flagstaff',
            link: 'https://www.google.com/webhp?sourceid=chrome-instant&rlz=1C1OPRB_enUS508US508&ion=1&espv=2&ie=UTF-8#q=aces+dental+flagstaff&lrd=0x872d8f2afcabab67:0x75c9c1ef9e99e76a,3',
            tag: 'G: Review Flagstaff'
          }
        ]
      },
      {
        name: 'Leave a review on Yelp',
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/52f3aa5849849e22de2c2901e4bec460.png',
        points: 100,
        buttons: [
          {
            name: 'Review Rainbow',
            link: 'https://www.yelp.com/biz/aces-braces-and-dental-las-vegas',
            tag: 'Y: Review Rainbow'
          }
        ]
      }
    ])

    .service('spAction', function (actions_data) {

      var that = this;

      that.get_action_data = function (action) {

        var data = {};

        if (!action) return data;

        if (action.socialType) data = actions_data.social[action.socialType] && actions_data.social[action.socialType][action.action];

        if (actions_data.system[action.type]) data = actions_data.system[action.type];

        return data;

      };

      return that;

    })

    .directive('sailplayAction', function (sp, $rootScope) {

      return {

        restrict: 'A',
        replace: false,
        scope: {
          action: '='
        },
        link: function (scope, elm) {

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/7c53c042125a6df1c6460064f2cee9f3.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    })

    .directive('sailplayActions', function (sp_api, sp, spAction, reviews_data, tagHelper) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');

          scope.exist = sp_api.data('tags.exist');

          scope.open_review = null;

          scope.reviews = reviews_data;

          scope.check_tag = tagHelper.checkTag;

          scope.check_in_list = function (action) {
            return scope.action_data(action) && Object.keys(scope.action_data(action)).length && (!scope.action_data(action).tag || scope.action_data(action).tag && scope.exist && scope.exist() && scope.check_tag(scope.action_data(action).tag, scope.exist()) ) || false
          };

          scope.perform_action = function (action) {

            sp.send('actions.perform', action);

          };

          scope.link = function (button) {

            var tag = button.tag;

            scope.open_review = false;

            sp_api.call('tags.add', {tags: [tag]});

            window.open(button.link)

          };

          scope.check_review = function (tag, array) {

            if (!tag || !array) return false;

            var _tags = tag.buttons.map(function (item) {
              return item.tag
            });

            return _tags.every(function(tag){
              return scope.check_tag(tag, array);
            });

          };


          scope.action_data = spAction.get_action_data;

          scope.edit_profile = function () {
            scope.$emit('profile:open');
          };

        }

      };

    });

}());
