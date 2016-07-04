(function () {

  angular.module('mtt', ['core', 'ui', 'sp', 'templates'])

    .directive('sailplayMtt', function ($rootScope, $locale, sp_api) {

      return {
        restrict: 'E',
        replace: false,
        scope: true,
        templateUrl: '/html/main.html',
        link: function (scope, element) {

          $(element).on('click', '.bps_left a', function () {
            $('.bns_overlay_hist').fadeIn();
            return false;
          }).on('click', '.top_text_white_bg a', function () {
            $('.bns_about_page').slideToggle();
            return false;
          }).on('click', '.bns_about_close', function () {
            $('.bns_about_page').slideUp();
            return false;
          }).on('click', '.bns_overlay, .close_overlay', function () {
            $('.bns_overlay').fadeOut();
            return false;
          }).on('click', '.bns_overlay_iner', function (event) {
            event.stopPropagation()
          }).on('click', '.mb_item_prof', function () {
            $('.mb_item').removeClass('act');
            $(this).addClass('act');
            $('.mb_popup').hide();
            $('.mb_popup_prof').slideDown(function () {
              $("html, body").animate({scrollTop: $(document).height()}, 300);
            });
            return false;
          }).on('click', '.mb_item_prof_opr', function () {
            $('.mb_item').removeClass('act');
            $(this).addClass('act');
            $('.mb_popup').hide();
            $('.mb_popup_op').slideDown(function () {
              $("html, body").animate({scrollTop: $(document).height()}, 300);
            });
            return false;
          }).on('click', '.bon_open_news, .close_news', function () {
            var text = $('.bon_open_news').text();
            $('.bon_open_news').text(
              text == "Все новости" ? "Свернуть список новостей" : "Все новости");
            $('.bon_news').toggleClass('act');

            return false;
          });


          $(element).find('.cycle-slideshow').cycle();

          scope.user = sp_api.data('load.user.info');
          scope.global = $rootScope;
          $locale.NUMBER_FORMATS.GROUP_SEP = ' ';


        }
      }

    });

  window.addEventListener('DOMContentLoaded', function () {

    var app_container = document.getElementsByTagName('sailplay-mtt')[0];

    app_container && angular.bootstrap(app_container, ['mtt']);

  });

}());
