# SailPlay виджеты для Visavis

## Установка

Добавьте на страницу следующий код:

    <script type="text/javascript" src="js/dist/sailplay_visavis.min.js"></script>
    <link rel="stylesheet" href="styles/app.css"/>
    <script>

      window.onload = function(){

        SAILPLAY.send('init', { partner_id: 1483, domain: 'http://sailplay.ru'} }); //инициируем виджеты

        SAILPLAY.on('init.success', function(){
          SAILPLAY.send('login', 'ТУТ ВСТАВЛЯЕИ AUTH HASH'); //авторизуем пользователя
        });

      };
      
      var spData - Объект действий

    </script>


## Размещение
Разместите в необходимых местах сами виджеты:
   
    <sailplay-banner></sailplay-banner>

    <sailplay-profile></sailplay-profile>

    <sailplay-gifts></sailplay-gifts>

    <sailplay-tasks></sailplay-tasks>

    <sailplay-extra></sailplay-extra>


## Пример

Вы можете посмотреть пример тут: [DEMO](http://dev4you.info/test/visavis/ "Demo")

