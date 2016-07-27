# SailPlay виджеты для Lecafier

## Установка

Добавьте на страницу следующий код:

    <script type="text/javascript">

            window._lecafier_config = {
                partner_id: ' ** PARTNER_ID ** ',
                auth_hash: ' ** AUTH_HASH ** '
            };

            document.addEventListener('DOMContentLoaded', function () {

                var _s = document.createElement("link");
                _s.type = "text/css";
                _s.rel = "stylesheet";
                _s.href = "//d3sailplay.cdnvideo.ru/media/assets/assetfile/107a812aea864e0edacbe42e485020d0.css";
                document.getElementsByTagName("head")[0].appendChild(_s);

                var _j = document.createElement("script");
                _j.type = "text/javascript";
                _j.src = "//d3sailplay.cdnvideo.ru/media/assets/assetfile/ef7419debc76bacd6ddd27fbfd228502.js";
                document.getElementsByTagName("head")[0].appendChild(_j);

            });


## Размещение
Разместите в необходимых местах сами виджеты:
   
    <sailplay-lecafier></sailplay-lecafier>

## Пример

Вы можете посмотреть пример тут: [DEMO](http://test.dev4you.info/lecafier/ "Demo")

## Разработка

npm i

gulp - for dev
gulp build - for prod