# SailPlay виджеты для Alpina Publisher

## Установка

Добавьте на страницу следующий код:

   <script src="dist/js/sailplay.alpina.js"></script>

   <link rel="stylesheet" href="dist/css/sailplay.alpina.css">

   <script>
     $(document).ready(function () {

       var AUTH_HASH = 'AUTH_HASH';

       var EMAIL = 'EMAIL';

       startLoyaltyApp(AUTH_HASH);

     });
   </script>


## Размещение
Разместите в необходимых местах сами виджеты:
   
    <app></app>

## Пример

Вы можете посмотреть пример тут: [DEMO](http://78.46.209.148/test/alpina_publisher/ "Demo")

## Разработка

npm i

gulp