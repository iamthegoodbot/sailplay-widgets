# SailPlay виджеты для Mario Berluchi

## Установка

Добавьте на страницу следующий код:

    <script type="text/javascript">
       /**
        * ДЕЙСТВИЯ
        * name - Название;
        * desc - Описание;
        * tag - Тэг для проверки;
        * variable - Название переменной ( не должно повторятся );
        * imgLink - Ссылка на картинку действия;
        * imgClass - CSS класс картинки, для выравнивания;
        */
       var SP_CUSTOM_ACTION = [
           {
               name: 'Оставь отзыв о магазине',
               desc: 'Оставить отзыв возможно как о магазине в целом <a href="http://marioberluchi.ru/reviewsplus/allreviews">http://marioberluchi.ru/reviewsplus/allreviews</a>.<br>\nТак и о любом понравившемся тебе товаре отдельно',
               points: '50 баллов',
               tag: 'Оставил отзыв',
               variable: 'view',
               imgLink: 'image/task-icon-05.png',
               imgClass: 'task-item__ico5'
           }
       ];
       /**
        * Тест
        */
       var SP_TEST = {
           name: 'Пройти опрос',
           points: '50 баллов',
           tag: 'Прошел опрос',
           data: [
               {
                   q: 'Вопрос 1',
                   a: [
                       {
                           title: 'Ответ 1',
                           tag: 'Вопрос 1 ответ 1'
                       },
                       {
                           title: 'Ответ 2',
                           tag: 'Вопрос 1 ответ 2'
                       },
                       {
                           title: 'Ответ 3',
                           tag: 'Вопрос 1 ответ 3'
                       },
                       {
                           title: 'Ответ 4',
                           tag: 'Вопрос 1 ответ 4'
                       }
                   ]
               }
           ]
       };
       var AUTH_HASH = 'ТУТ AUTH HASH';
       document.addEventListener('DOMContentLoaded', function () {
           var s = document.createElement("script");
           s.type = "text/javascript";
           s.src = "dist/js/main.min.js";
           document.getElementsByTagName("head")[0].appendChild(s);
           var ss = document.createElement("link");
           ss.type = "text/css";
           ss.rel = "stylesheet";
           ss.href = "dist/css/main.css";
           document.getElementsByTagName("head")[0].appendChild(ss);
       });
    </script>


## Размещение
Разместите в необходимых местах сами виджеты:
   
    <app></app>

## Пример

Вы можете посмотреть пример тут: [DEMO](http://dev4you.info/test/mario/ "Demo")

## Разработка

npm i gulp gulp-less gulp-filter gulp-jsmin gulp-connect gulp-uglifyjs del gulp-concat stream-series less-plugin-clean-css less-plugin-autoprefix

gulp - for dev
gulp prod - for prod