# SailPlay виджеты для платформы CORDOVA

Это демонстрационный проект с реализацией социальных действий SailPLay на платформе CORDOVA.

## Установка

Добавьте на страницу следующий код:

    <!-- Подключаем SailPlay SDK -->
    <script type="text/javascript" src="js/sailplay.hub.js"></script>
    <!-- Подключаем модуль действий -->
    <script type="text/javascript" src="js/sailplay.hub.actions.js"></script>
    <script>

      window.onload = function(){

        SAILPLAY.send('init', { partner_id: {your_partner_id}, platform: 'mobile' }); //инициируем виджеты для платформ: (cordova, phonegap)

        SAILPLAY.on('init.success', function(){
          SAILPLAY.send('login', '792eb7b5a60f19dfa7d414de84005b8b5a40aaae'); //авторизуем пользователя
          SAILPLAY.send('load.actions.list'); //загружаем список действий
        });
        
        SAILPLAY.on('load.actions.list.success', function(data){  //после успешной загрузке списка действий
          SAILPLAY.send('actions.parse', data.actions); //запускаем парсер кнопок
          //парсер находит в документе все элементы с атрибутом: data-sp-action="{action._actionId}"
          //и устанавливает необходимые обработчики
        });
        
        //Так же возможно парсить отдельно DOM элемент с помощью метода: SAILPLAY.actions.parse({dom}, {action});

      };

    </script>

## Для работы виджетов необходим cordova-плагин: [cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser "cordova-plugin-inappbrowser")

Просто добавьте плагин в cordova приложение с помощью команды: 

    cordova plugin add cordova-plugin-inappbrowser

## Пример

Вы можете скачать собранную версию приложения под ANDROID тут: [SailPlay widgets app](http://saike.ru/sailplay/widgets/demo/phonagap/platforms/android/build/outputs/apk/android-debug.apk "SailPlay widgets app")

