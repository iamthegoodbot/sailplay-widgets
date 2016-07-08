(function () {

  angular.module('ym', ['core', 'ui', 'sp', 'templates'])

    .directive('sailplayYm', function ($rootScope, $locale, sp_api, sp) {

      return {
        restrict: 'E',
        replace: false,
        scope: true,
        templateUrl: '/html/main.html',
        link: function (scope, element) {

          $(element).on('click', '.bns_hist_js', function () {
            $(element).find('.bns_overlay_hist').fadeIn();
            return false;
          }).on('click', '.bns_overlay, .close_overlay', function () {
            $(element).find('.bns_overlay').fadeOut();
            $('html').removeClass('overflow_hidden');
            return false;
          }).on('click', '.bns_por_js', function () {
            $(element).find('.bns_overlay_about').fadeIn();
            return false;
          }).on('click', '.bns_edit_prof_js', function () {
            $(element).find('.bns_overlay_edit_prof').fadeIn();
            $('html').addClass('overflow_hidden');
            return false;
          }).on('click', '.bns_overlay_iner', function (event) {
            event.stopPropagation()
          }).on('click', '.bns_logout', function () {
            sp_api.call('logout');
            return false;
          });

          $(element).find('.cycle-slideshow').cycle();

          sp.on('logout.success', function(){
            window.location.reload();
          });

          scope.user = sp_api.data('load.user.info');

          scope.global = $rootScope;

          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

        }
      }

    });

  window.addEventListener('DOMContentLoaded', function () {

    var app_container = document.getElementsByTagName('sailplay-ym')[0];

    app_container && angular.bootstrap(app_container, ['ym']);

  });

}());
