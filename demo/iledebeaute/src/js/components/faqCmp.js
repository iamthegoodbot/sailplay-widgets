(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.faq', [])

    .directive('faqCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <h2 class="content_head">Часто задаваемые вопросы</h2>\n    <div class="faq_main">\n        <div class="faq_item">\n            <span class="faq_head">Как я могу стать участником про граммы лояльности?</span>\n\t\t\t\t\t<span class="faq_desc">Ответ: Вам необходимо зайти на сайт <a href="#">http://iledebeaute.ru/</a>, в навигации выбрать “Программа лояльности”,\nпосле этого вы попадаете в свой личный кабинет</span>\n        </div>\n        <div class="faq_item">\n            <span class="faq_head">Могу ли я пойти на любое событие, которое отражается в моем календаре событий?</span>\n            <span class="faq_desc">Ответ: Все события, которые отражаются в вашем календаре вам доступны</span>\n        </div>\n        <div class="faq_item">\n            <span class="faq_head">Как я могу потратить свои бонусы?</span>\n            <span class="faq_desc">Ответ: В разделе Сокровищница привилегий отражаются все привилегии, которые вам доступны.</span>\n        </div>\n    </div>\n</div>',
        scope: true,
        link: function (scope) {

        }
      }

    }]);

  document.createElement('faq-cmp');
  var elems = document.querySelectorAll('faq-сmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['iledebeaute.directives.faq']);
  }

}(window.angular, window.SAILPLAY, window.$));