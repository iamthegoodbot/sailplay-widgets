# SailPlay виджеты для LGB

## Установка

Добавьте на страницу следующий код:

   <script type="text/javascript">
          var AUTH_HASH = 'AUTH HASH';
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

Вы можете посмотреть пример тут: [DEMO](http://dev4you.info/test/lgb/ "Demo")

## Разработка

npm i gulp gulp-less gulp-filter gulp-jsmin gulp-connect gulp-uglifyjs del gulp-concat stream-series less-plugin-clean-css less-plugin-autoprefix

gulp - for dev
gulp prod - for prod