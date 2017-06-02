# SailPlay widget for Papa Johns AZ

## Установка
Вставить этот код в < head > для загрузки скриптов и стилей:

    <link rel="stylesheet" href="./dist/css/sailplay.pj_az.css"/>

    <script src="./dist/js/sailplay.pj_az.js"></script>
    
    <script src="locale.ru.js"></script>

    <script type="text/javascript">
     document.addEventListener('DOMContentLoaded', function () {

        window.sailplay_config = {
            auth_hash: 'AUTH_HASH',
            lang: 'ru',
            data: {
                pizzameter_cost: 379,
                login_link: "login.html"
            }
        };

    });
    </script>


## Расположение
Вставить этот код в < body >, скрипт преобразует его в "личный кабинет":

    <sailplay-pj_az></sailplay-pj_az>

## Пример
Для примера, аузхеш берем из GET параметров

### Неавторизованный
http://78.46.209.148/test/pj_az/

### Авторизованный
http://78.46.209.148/test/pj_az/?auth_hash={{ AUTH_HASH }}