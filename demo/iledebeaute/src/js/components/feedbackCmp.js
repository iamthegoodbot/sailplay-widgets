(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.feedback', [])

    .directive('feedbackCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    <h2 class="content_head">Форма обратной связи</h2>\n\t\t\t<span class="text">Обратная связь<br>\nДорогой пользователь!<br><br>\n\nПожалуйста, перед тем как задавать вопрос, убедитесь в том, что его нет в списке ответов на часто задаваемые вопросы!<br>\nДля отправки вопроса выберите из выпадающего списка тему, укажите суть вопроса в поле "Заголовок" и подробно опишите причину вашего обращения в поле "Текст".<br>\nЕсли Ваш вопрос связан с покупками в ИЛЬ ДЕ БОТЭ, с картами ИЛЬ ДЕ БОТЭ или с web-клубом ИЛЬ ДЕ БОТЭ - пожалуйста, не забывайте указывать полное фио, свой номер карты и чека (если требуется), если вопрос связан с sms-подпиской - укажите свой номер телефона.\nВсе вопросы рассматриваются в течение 5 рабочих дней.<br>\nДля того, чтобы получить ответ на Ваш email, пожалуйста, поставьте галочку в поле "Получать уведомления на email".<br><br></span>\n    <h2 class="content_head">Оставить заявку</h2>\n    <div class="feedback_main">\n        <form action="#" class="fedback_form">\n            <div class="fb_row">\n                <div class="input_block fb_col">\n                    <label>Имя:</label>\n                    <input type="text">\n                </div>\n                <div class="input_block fb_col">\n                    <label>E-mail:</label>\n                    <input type="text">\n                </div>\n            </div>\n            <div class="fb_row">\n                <div class="fb_col">\n                    <div class="select_block select_shop">\n                        <select>\n                            <option value="0">Выберите категорию</option>\n                            <option value="1">категория 1</option>\n                            <option value="2">категория 2</option>\n                            <option value="3">категория 3</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n            <div class="fb_row">\n                <label>Сообщение</label>\n                <textarea placeholder="Напишите сообщение"></textarea>\n            </div>\n            <div class="fb_row">\n                <div class="input_block">\n                    <input type="submit" value="Отправить">\n                </div>\n            </div>\n        </form>\n    </div>\n</div>',
        scope: true,
        link: function (scope) {

        }
      }

    }]);

  document.createElement('feedback-cmp');
  var elems = document.querySelectorAll('feedback-cmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['iledebeaute.directives.feedback']);
  }

}(window.angular, window.SAILPLAY, window.$));