# SailPlay виджеты для Trends&Brands

## Установка

Добавьте на страницу следующий код:

    <script type="text/javascript" src="js/dist/tb.sailplay.min.js"></script>
    <link rel="stylesheet" href="styles/app.css"/>
    <script>

      window.onload = function(){

        SAILPLAY.send('init', { partner_id: 1404, static_url: 'http://saike.ru/sailplay/widgets/demo/tb/' }); //инициируем виджеты

        SAILPLAY.on('init.success', function(){
          SAILPLAY.send('login', '792eb7b5a60f19dfa7d414de84005b8b5a40aaae'); //авторизуем пользователя
          SAILPLAY.send('thanks.show', { points: 400, share_points: 30, url: 'http://www.trendsbrands.ru/' }); //показать thanks виджет
        });

      };

    </script>


## Размещение
Разместите в необходимых местах сами виджеты:

    <sailplay-header></sailplay-header>

    <sailplay-profile></sailplay-profile>

    <sailplay-gifts></sailplay-gifts>

    <sailplay-actions></sailplay-actions>

    <sailplay-thanks></sailplay-thanks>

## Статика
Вы можете разместить статику в любом удобном для Вас месте и указать ссылку в init

    SAILPLAY.send('init', { partner_id: 1404, static_url: 'ССЫЛКА_НА_СТАТИКУ' }); //инициируем виджеты

## Пример

Вы можете посмотреть пример тут: [DEMO](http://saike.ru/sailplay/widgets/demo/tb/ "Demo")

