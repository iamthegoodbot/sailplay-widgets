(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.faq', ['ngSanitize'])

    .directive('faqCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <h2 class="content_head">Часто задаваемые вопросы</h2>\n    <div class="faq_main" data-ng-if="model && model.length">\n        <div class="faq_item" data-ng-repeat="item in model track by $index">\n            <span class="faq_head" data-ng-bind="item.q"></span>\n            <span class="faq_desc" data-ng-bind-html="\'Ответ: \' + item.a"></span>\n        </div>\n    </div>\n</div>',
        scope: {
          model: '='
        },
        link: function (scope) {
        }
      }

    }]);

}(window.angular, window.SAILPLAY, window.$));