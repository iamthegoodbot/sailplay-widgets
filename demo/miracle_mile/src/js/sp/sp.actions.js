(function () {

  angular.module('sp.actions', [])

    .constant('actions_data', {
      "system": {},
      "social": {
        "fb": {
          "like": {
            "name": "Like us on Facebook",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/f6dc3f32f93bc8b51c03510e18e08719.png'
          },
          "partner_page": {
            "name": "Tell about us on Facebook",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/f6dc3f32f93bc8b51c03510e18e08719.png'
          }
        },
        "gp": {
          "like": {
            "name": "Like us on G+",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/4ddefcf2c6541d94c0c8985f039127c2.png'
          },
          "partner_page": {
            "name": "Tell about us on G+",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/4ddefcf2c6541d94c0c8985f039127c2.png'
          }
        },

        "tw": {
          "partner_page": {
            "name": "Tell about us on Twitter",
            pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/7bb17e8772a8cd0814b9c254f341f1d7.png'
          }
        }


      }
    })

    .constant('custom_data', [
      {
        name: 'Leave a review on Yelp',
        desc: 'Write your review on Yelp.com',
        check_tag: true,
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/0b19bbbc5d4389a17e2890be2201401e.png',
        points: 100,
        buttons: [
          {
            name: 'Write a review',
            add_tag: true,
            link: 'https://www.yelp.com/biz/miracle-mile-harley-davidson-great-neck',
            tag: 'Yelp'
          }
        ]
      },
      {
        name: 'Subscribe to E-newsletter',
        desc: 'Sign up for our E-Newsletter at the bottom of this page to find out about special offers and receive 10 bonus points! (Make sure to add your email address to your loyalty account by updating your profile first)',
        check_tag: true,
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/4b8f30e67b23e703ca24752fcf7c4496.png',
        points: 100,
        buttons: [
          {
            name: 'Subscribe',
            add_tag: true,
            link: 'http://www.miraclemilehd.com/join-our-mailing-list--xnewsletter',
            tag: 'E-newsletter'
          }
        ]
      },
      {
        name: 'Schedule a Test Drive',
        desc: 'Schedule a test drive and receive 10 free bonus points! (Make sure to add your email address to your loyalty account by updating your profile first)',
        check_tag: false,
        pic: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/b2a9c1a70427c3563c7030cefe794427.png',
        points: 100,
        buttons: [
          {
            name: 'Schedule a ride',
            add_tag: true,
            link: 'http://www.miraclemilehd.com/schedule-a-test-ride--xsched_ride',
            tag: 'Test Drive'
          }
        ]
      },
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

          elm.attr('data-styles', $rootScope.config.social_styles || 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/bfa189e83d0da8434bdfaecfaecbb9a0.css');

          sp.actions && sp.actions.parse(elm[0], scope.action);

        }

      };

    })

    .directive('sailplayActions', function (sp_api, sp, spAction, custom_data, tagHelper) {

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function (scope) {

          scope.actions = sp_api.data('load.actions.list');

          scope.exist = sp_api.data('tags.exist');

          scope.open_custom = null;

          scope.customs = custom_data;

          scope.check_tag = tagHelper.checkTag;

          scope.check_in_list = function (action) {
            return scope.action_data(action) && Object.keys(scope.action_data(action)).length && (!scope.action_data(action).tag || scope.action_data(action).tag && scope.exist && scope.exist() && scope.check_tag(scope.action_data(action).tag, scope.exist()) ) || false
          };

          scope.perform_action = function (action) {

            sp.send('actions.perform', action);

          };

          scope.link = function (button) {

            if (button && button.add_tag && button.tag) {

              sp_api.call('tags.add', {tags: [button.tag]});
            }

            scope.open_custom = false;

            window.open(button.link)

          };

          scope.check_custom = function (tag, array) {

            if (!tag || !array) return false;

            var _tags = tag.buttons.map(function (item) {
              return item.tag
            });

            return _tags.every(function (tag) {
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
