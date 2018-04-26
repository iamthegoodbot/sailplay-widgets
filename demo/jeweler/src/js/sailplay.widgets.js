(function () {

  angular.module('sailplay.widgets', ['core', 'ui', 'sailplay', 'templates'])

    .config(function (SailPlayProvider, SailPlayActionsDataProvider, SailPlayBadgesProvider) {

      //possible values:
      //url,cookie,remote
      SailPlayProvider.set_auth_type('config');

      SailPlayProvider.set_cookie_name('auth_hash');

      window._CONFIG && SailPlayProvider.set_config({
        partner_id: _CONFIG.SAILPLAY.partner_id,
        domain: _CONFIG.SAILPLAY.domain,
        lang: 'ru'
      });

      _LOCALE && SailPlayActionsDataProvider.set_actions_data(_LOCALE.actions);

      SailPlayBadgesProvider.set_limits([0, 100000]);

    })

    .run(function ($rootScope, SailPlay) {

      $rootScope.locale = _LOCALE || {};

      $rootScope.$on('sailplay-init-success', function () {

        SailPlay.authorize();

      });

    })

    .directive('sailplayWidgets', function (SailPlay, ipCookie, $document, $rootScope) {

      return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/html/app.html',
        link: function (scope) {

          scope.global = $rootScope;

          scope.show_history = false;

          scope.show_statuses_list = false;

          scope.show_profile_info = false;

          scope.show_profile_action = true;

          scope.fill_profile = function () {

            scope.show_profile_info = true;

          };

          scope.body_lock = function (state) {

            if (state) {
              $('body').addClass('body_lock');
            }
            else {
              $('body').removeClass('body_lock');
            }

          };

          scope.close_profile = function () {

            scope.show_profile_action = false;

            scope.show_profile_info = false;

            scope.hide_hist = ipCookie('profile_form') && ipCookie('profile_form').custom_vars.hide_hist === 'Да';

            scope.body_lock(false);

          };

          scope.open_profile = function () {
            scope.show_profile_info = true;
            scope.body_lock(true);
          };

          SailPlay.on('tags.exist.success', function (res) {

            if (res.status === 'ok' && res.tags[0].exist) {

              scope.show_profile_action = false;
              scope.$apply();

            }

          });

          scope.hide_hist = ipCookie('profile_form') && ipCookie('profile_form').custom_vars.hide_hist === 'Да';

        }
      }

    });


  setTimeout(function(){

    var app_container = document.getElementsByTagName('sailplay-widgets')[0];

    app_container && angular.bootstrap(app_container, ['sailplay.widgets']);

  }, 100)

}());
