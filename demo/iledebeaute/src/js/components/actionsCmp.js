(function (angular, sp, jQuery) {

  angular.module('iledebeaute.directives.actions', [])

    .directive('actionsCmp', [function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<div>\n    \t<h2 class="content_head">Получи больше бонусов</h2>\n\t\t\t<span class="text">Выполняйте задания и получайте за них бонусы, которые вы можете потратить на привилегии. </span>\n\t\t\t<div class="select_qust">\n\t\t\t\t<div class="sq_item">\n\t\t\t\t\t<div class="sq_item_left">\n\t\t\t\t\t\t<span class="name">Вступить в группу\n\tв ВКонтакте</span>\n\t\t\t\t\t\t<span class="sum_bonus">70 бонусов</span>\n\t\t\t\t\t\t<a href="#">Получить</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sq_item_right sir_vk">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="sq_item">\n\t\t\t\t\t<div class="sq_item_left">\n\t\t\t\t\t\t<span class="name">Вступить в группу\n\tв twiter</span>\n\t\t\t\t\t\t<span class="sum_bonus">70 бонусов</span>\n\t\t\t\t\t\t<a href="#">Получить</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sq_item_right sir_tw">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="sq_item">\n\t\t\t\t\t<div class="sq_item_left">\n\t\t\t\t\t\t<span class="name">Вступить в группу\nв Одноклассниках</span>\n\t\t\t\t\t\t<span class="sum_bonus">70 бонусов</span>\n\t\t\t\t\t\t<a href="#">Получить</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sq_item_right sir_ok">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="sq_item">\n\t\t\t\t\t<div class="sq_item_left">\n\t\t\t\t\t\t<span class="name">Подписаться\nв Facebook</span>\n\t\t\t\t\t\t<span class="sum_bonus">70 бонусов</span>\n\t\t\t\t\t\t<a href="#">Получить</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sq_item_right sir_fb">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="sq_item">\n\t\t\t\t\t<div class="sq_item_left">\n\t\t\t\t\t\t<span class="name">Пригласить друга</span>\n\t\t\t\t\t\t<span class="sum_bonus">70 бонусов</span>\n\t\t\t\t\t\t<a href="#">Получить</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sq_item_right sir_fr">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="sq_item">\n\t\t\t\t\t<div class="sq_item_left">\n\t\t\t\t\t\t<span class="name">Пройти опрос</span>\n\t\t\t\t\t\t<span class="sum_bonus">70 бонусов</span>\n\t\t\t\t\t\t<a href="#">Получить</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="sq_item_right sir_qust">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="opros_main">\n\t\t\t\t<span class="opros_head">\n\t\t\t\t\tПрохождение опроса<b>+50 баллов</b>\n\t\t\t\t</span>\n\t\t\t\t<div class="opros_item">\n\t\t\t\t\t<span class="qust_from">2 вопрос из 5</span>\n\t\t\t\t\t<span class="qust_text">\n\t\t\t\t\t\tКакой цвет вы предпочитаете в весенних луках?\n\t\t\t\t\t</span>\n\t\t\t\t\t<div class="answer">\n\t\t\t\t\t\t<div class="check">\n\t\t\t\t\t\t\t<input type="radio" id="ans1" name="answ" value="1"/>\n\t\t\t\t\t\t\t<label for="ans1">Алебастрово-пурпурный</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="check">\n\t\t\t\t\t\t\t<input type="radio" id="ans2" name="answ" value="2"/>\n\t\t\t\t\t\t\t<label for="ans2">Сложный берилловый</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="check">\n\t\t\t\t\t\t\t<input type="radio" id="ans3" name="answ" value="3"/>\n\t\t\t\t\t\t\t<label for="ans3">Камелопардовый фельдграу</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="check">\n\t\t\t\t\t\t\t<input type="radio" id="ans4" name="answ" value="4"/>\n\t\t\t\t\t\t\t<label for="ans4">Свой вариант</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<textarea name="user_ansver" placeholder="Напишите свой вариант"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a href="#" class="next_qust">Далее</a>\n\t\t\t\t</div>\n\t\t\t</div>\n</div>',
        scope: {
          model: '='
        },
        link: function (scope) {
        }
      }

    }]);

  document.createElement('actions-cmp');
  var elems = document.querySelectorAll('actions-сmp');
  for (var i = 0; i < elems.length; i += 1) {
    angular.bootstrap(elems[i], ['iledebeaute.directives.actions']);
  }

}(window.angular, window.SAILPLAY, window.$));