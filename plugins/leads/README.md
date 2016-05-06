# SAILPLAY.HUB.LEADS

## Описание

SAILPLAY.HUB.LEADS расширяет стандартный функционал SAALPLAY.HUB, позволяя быстро и удобно работать с лид-формами SailPlay

## Установка

Если вы используете npm:

    npm install sailplay-hub-leads --save
    
SAILPLAY.HUB.LEADS требует для работы сам хаб, поэтому необходимо добавить на страницу теги:

    <script src="путь до файла sailplay.hub.js"></script>
    <script src="путь до файла sailplay.hub.leads.js"></script>

## Принцип работы

В первую очередь, необходимо запустить хаб для вашей компании: 

```javascript
    SAILPLAY.send('init', { partner_id: 206 }); //инициируем модуль для партнера с айди = 206
```

Плагин добавляет в хаб следущие события:

##leads.parse

```javascript
   SAILPLAY.send('leads.parse'); //Находит все формы в документе, которые помечены атрибутом "data-sp-lead" и добавляет к ним функционал лид-формы
```

Пример html кода формы для парсинга    
    
```html
    <form data-sp-lead="test_1" data-sp-tags="test4,test5" >
    
    <label>phone<input type="text" name="phone"/></label>
    <label>email<input type="email" name="email"/></label>

    <input type="submit" value="Подписаться">

  </form>
```

Где:

* атрибут data-sp-lead - уникальный идентификатор формы, используется для работы с формой после создания.
  
* атрибут data-sp-tags - необязательный параметр. В нем можно указать теги через запятую, которые необходимо добавить к полбзователю.
  
## leads.submit

```javascript
   SAILPLAY.send('leads.submit', 'lead_name', callback); //Отправляет форму с указанным именем на сервер.
```

Принимает два параметра:

* имя формы - имя формы, указанное при создании.

* функция обратного вызова, запускаемая после отправки формы. 
  
После отправки формы нициирует следущие события:

### leads.submit.success - форма отправлена успешно
### leads.submit.error - при отправке формы произошла ошибка

Обы события возвращают объект, содержащий отправленную лид-форму и ответы сервера.

## Так же плагин расширяет глобальный объект SAILPLAY свойством leads.

С помощью него можно проводить все те же самые процедуры, без событийной системы.

Метод SAILPLAY.leads работает в зависимости от переданных параметров.

1. если не передать параметры, то он вернет объект со списком всех текущих лидформ

2. если передать только имя в качестве первого параметра - вернет лидформу с указанным именем

3. если передать имя в качестве первого параметра и DOM элемент формы в качестве второго - создаст новую лидформу, так же можно передать дополнительные опции в качестве третьего параметра


## Пример испозьзования SAILPLAY.leads

```javascript

    window.addEventListener('DOMContentLoaded', function(){
    
      SAILPLAY.send('leads.parse');

      SAILPLAY.send('init', { partner_id: 366, domain: '//sailplay.ru' });


      SAILPLAY.on('init.success', function(){

        SAILPLAY.leads('test3', document.getElementById('form'), { tags: [ 'test666', 'test111', 'test999' ] });

        console.dir(SAILPLAY.leads());

      });

      SAILPLAY.on('leads.submit.success', function(res){
        console.dir(res);
      });

      SAILPLAY.on('leads.submit.error', function(res){
        console.dir(res);
      });

    });
```
    
## Пример можно посмотреть тут:

[http://saike.ru/sailplay/widgets/demo/metropolis/](http://saike.ru/sailplay/widgets/demo/metropolis/)


