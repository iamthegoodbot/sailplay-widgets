# SailPlay виджеты для POF

## Установка

Добавьте на страницу следующий код:

    <script>

      var EMAIL = '%%GLOBAL_CurrentCustomerEmail%%';
      document.addEventListener('DOMContentLoaded', function () {
          if(window.location.pathname.match(/^\/loyalty(.*)$/gmi)) {

              document.getElementsByClassName('TitleHeading')[0].style.display='none';
              document.getElementsByClassName('Content')[0].style.display='none';
              var s = document.createElement("script");
              s.type = "text/javascript";
              s.src = "https://sailplays3.cdnvideo.ru/media/assets/assetfile/6181ae91b2ee26af8405ed60a452add3.js";

              document.getElementsByTagName("head")[0].appendChild(s)
              var ss = document.createElement("link");
              ss.type = "text/css";
              ss.rel = "stylesheet";
              ss.href = "https://sailplays3.cdnvideo.ru/media/assets/assetfile/eda3473f32aff7a13c78058d1d4323d0.css";
              document.getElementsByTagName("head")[0].appendChild(ss);

          }
      });


    </script>


## Размещение
Разместите в необходимых местах сами виджеты:
   
    <app></app>

## Пример

Вы можете посмотреть пример тут: [DEMO](http://dev4you.info/test/pof/ "Demo")

## Разработка

npm i gulp gulp-less gulp-filter gulp-jsmin gulp-connect gulp-uglifyjs del gulp-concat stream-series less-plugin-clean-css less-plugin-autoprefix

gulp - for dev
gulp prod - for prod