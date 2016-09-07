# SailPlay виджеты для Pich Shop

## Установка

Добавьте на страницу следующий код:

    <link rel="stylesheet" href="dist/css/sailplay.pichshop.css">

    <script type="text/javascript" src="config.js"></script>

    <script type="text/javascript" src="dist/js/sailplay.pichshop.js"></script>

    <script type="text/javascript">

        window._pichshop_config.auth_hash = "AUTH_HASH";
        window._pichshop_config.partner_id = PARTNER_ID;

    </script>

В файле config.js, есть список статусов statusList, пример:

    [
        {
            name: 'Зубная фея',
            limit: [0, 2000],
            image: {
              origin: 'dist/image/status/origin/1.png',
              active: 'dist/image/status/active/1.png'
            }
        }
    ]

Так же настройки действий customActions, пример:

    {
      type: 'tag',
      tag: 'Отзыв на Маркете',
      name: 'Отзыв на Маркете',
      points: 100,
      image: 'dist/image/pig_icon.png'
    },

## Размещение
Разместите в необходимых местах сами виджеты:

### Главная страница

    <sailplay-pichshop></sailplay-pichshop>

### Страница истории

    <sailplay-history></sailplay-history>

### Страница подарков

    <sailplay-gifts></sailplay-gifts>

### Страница опроса

    <sailplay-test></sailplay-test>

### Страница профиля

    <sailplay-profile></sailplay-profile>

## Пример

Вы можете посмотреть пример тут: [DEMO](http://test.dev4you.info/pichshop/ "Demo")

## Разработка

npm i

gulp - for dev

gulp build - for prod