(function(SP, d){

  SP.static = function(url){
    var static_url = SP.config() && SP.config().env ? SP.config().env.staticUrl : '/';
    if(static_url) return static_url + url;
    return '';
  };

  Handlebars.registerHelper('static', function(url){
    var static_url = SP.config() && SP.config().env ? SP.config().env.staticUrl : '/';
    if(static_url) return static_url + url;
    return '';
  });

  //insert font-face rules
  function load_static(){
    var rule =
      "@font-face {  " +
        "font-family: 'Intro';  " +
        "src: url('" + SP.static('sp-font/Intro.eot') + "');  " +
        "src: local('☺'), " +
        "url('" + SP.static('sp-font/Intro.woff') + "') format('woff'), " +
        "url('" + SP.static('sp-font/Intro.ttf') + "') format('truetype'), " +
        "url('" + SP.static('sp-font/Intro.svg') + "') format('svg');  " +
        "font-weight: normal;  " +
        "font-style: normal;" +
        "}" +
        "@font-face {  " +
        "font-family: 'intro_regular';  " +
        "src: url('" + SP.static('sp-font/Intro.eot') + "');  " +
        "src: local('☺'), " +
        "url('" + SP.static('sp-font/Intro.woff') + "') format('woff'), " +
        "url('" + SP.static('sp-font/Intro.ttf') + "') format('truetype'), " +
        "url('" + SP.static('sp-font/Intro.svg') + "') format('svg');  " +
        "font-weight: normal;  " +
        "font-style: normal;" +
        "}" +
        "@font-face {  " +
        "font-family: 'FuturisC';  " +
        "src: url('" + SP.static('sp-font/FuturisC.eot') + "');  " +
        "src: local('☺'), " +
        "url('" + SP.static('sp-font/FuturisC.woff') + "') format('woff'), " +
        "url('" + SP.static('sp-font/FuturisC.ttf') + "') format('truetype'), " +
        "url('" + SP.static('sp-font/FuturisC.svg') + "') format('svg');  " +
        "font-weight: normal;  font-style: normal;" +
        "}" +
        "@font-face {  " +
        "font-family: 'futurisc';  " +
        "src: url('" + SP.static('sp-font/FuturisC.eot') + "');  " +
        "src: local('☺'), " +
        "url('" + SP.static('sp-font/FuturisC.woff') + "') format('woff'), " +
        "url('" + SP.static('sp-font/FuturisC.ttf') + "') format('truetype'), " +
        "url('" + SP.static('sp-font/FuturisC.svg') + "') format('svg');  " +
        "font-weight: normal;  " +
        "font-style: normal;" +
        "}";

    var s = document.createElement('style');
    s.type = "text/css";
    document.getElementsByTagName('head')[0].appendChild(s);
    s.innerHTML = rule;
  }


  SP.find = function(arr, params){
    var find_array = [];
    for(var i = 0; i < arr.length; i+=1){
      var item = arr[i];
      var similar = true;
      for(var prop in params){
        if(item[prop] != params[prop]){
          similar = false;
        }
      }
      if(similar) find_array.push(item);
    }
    return find_array;
  };





  SP.widget = function(options){

    var new_widget = {};

    d.createElement(options.name);

    var template = options.template;

    var roots = d.getElementsByTagName(options.name);

    new_widget.instances = [];

    for (var r = 0; r < roots.length; r+=1){
      var root = roots[r];
      var inst = {
        root: root,
        scope: {},
        render: function(){
          render(this);
        },
        init: function(){
//          console.dir(this);
          options.init && options.init(this);
        }
      };
      new_widget.instances.push(inst);
      inst.init();
    }

    //render method
    function render(inst){

      var scope = inst.scope || {};

      //render handlebars template
      var render = Handlebars.compile(template);

      inst.root.innerHTML = render(scope);

      //add events
      var clicks = inst.root.querySelectorAll('[data-sp-click]');

      for(var c = 0; c < clicks.length; c+=1){
        var clickable = clicks[c];
        clickable.onclick = function(e){
          e.preventDefault();
          var evaluated = this.getAttribute('data-sp-click').split(')')[0];
          var method_name = evaluated.split('(')[0];
          var params = evaluated.split('(')[1] ? evaluated.split('(')[1].split(',') : [];
          scope[method_name](e, params);
        };
      }

      options.on_render && options.on_render(inst, root);

    }

  };

  var header = {
    name: 'sailplay-header',
    template:
      '<div class="sptb">' +
        '<div class="sptb-row">  ' +
        '<div class="sptb-promo">' +
        '<div class="sptb-promo-img" style="background-image: url({{{static promo_img}}})"></div>' +
        '<div class="sptb-promo-text"> ' +
        '<div class="title"> Бонусная программа </div> ' +
        '<div class="text"> Регистрируйся, совершай покупки,выполняй задания,<br/>  копи баллы и обменивай их на подарки! </div> ' +
        '</div>  ' +
        '</div>  ' +
        '</div>  ' +
        '</div>',
    init: function(widget){

      var scope = widget.scope;

      scope.promo_img = 'sp-img/promo.png';

      SP.on('init.success', function(){
        widget.render();
      });
    }
  };

  var profile = {
    name: 'sailplay-profile',
    template:
      '<div class="sptb">  ' +
        '<div class="sptb-row">' +
          '<div class="sptb-item sptb-item-orange sptb-item-right">  ' +
            '<div class="sptb-level-outer"> ' +
              '<div class="sptb-level sptb-history-slider" style="padding-top: 0;" data-slider>' +
                '{{#badges}}' +
                '<div class="sptb-level-item">  ' +
                  '<i class="sptb-level-icon" style="background-image: {{#get_badge_pic}}{{ thumbs.url_250x250 }},{{thumbs.url_gs}},{{is_received}}{{/get_badge_pic}}"></i>' +
                  '<div class="sptb-level-name">  {{name}}  </div>  ' +
                  '<div class="sptb-level-subname">  {{descr}}  </div>' +
                '</div>' +
//                '<div class="sptb-level-item-arrow"></div> ' +
                '{{/badges}}' +
              '</div>  ' +
            '</div>  ' +
            '<div class="sptb-list"> ' +
              '<div class="sptb-history-list">' +

              '</div>' +
              '<a class="sptb-rating-btn sptb-btn" href="#" data-sp-click="hide_history"> Вернуться назад </a>  ' +
            '</div>  ' +
            '<div class="sptb-detail-info "> ' +
              '<div class="sptb-info">' +
                '<div class="sptb-info-ava" style="background-image: {{{user_pic user.pic}}};"></div>' +
                '<div class="sptb-info-text">  ' +
                  '<span class="titles">Здравствуй,</span>  ' +
                  '<div class="texts">{{ user.name }}</div>' +
                '</div> ' +
              '</div> ' +
              '<div class="sptb-info-footer">' +
                '<a class="sptb-info-btn sptb-btn" href="#" data-sp-click="show_history">История начислений</a>' +
                '<div class="sptb-info-count">  ' +
                  '<span class="count">  {{ user_points.confirmed }}  </span>  ' +
                  '<span class="count-text"> ' +
                    '<a class="sptb-info-link" href="#" data-sp-click="toggle_points_info">+{{ user_points.unconfirmed }} баллов</a> ' +
                    '<div class="sptb-info-popup hidden">' +
                      '<a class="sptb-info-popup-close" style="background-image: url({{{static close_popup_icon}}});" href="#" data-sp-click="toggle_points_info"></a>' +
                      '<div class="sptb-info-popup-text">“+{{ user_points.unconfirmed }} баллов” - количество неподтвержденных баллов, которые будут подтверждены после фактической оплаты заказа</div> ' +
                    '</div>  ' +
                  '</span>' +
                '</div> ' +
              '</div>  ' +
            '</div>' +
          '</div>' +
          '<div class="sptb-item sptb-item-orange sptb-item-small sptb-level-con"> ' +
            '<i class="sptb-level-icon sptb-level-img-small" style="background-image: {{{get_status_pic user_status.pic }}};"></i> ' +
            '<div class="sptb-level-title"> Ваш статус: {{{get_status user_status.name }}} </div> ' +
            '<a class="sptb-level-btn sptb-btn" href="#" data-sp-click="show_badges">' +
              '<span class="hidden show-list">Закрыть список</span>' +
              '<span class=" show-badge">Список бейджей</span> ' +
            '</a>  ' +
          '</div>  ' +
        '</div>  ' +
      '</div>',
    init: function(widget){
      var self = widget;

      var root = function(){
        return self.root.children[0];
      };

      self.scope.is_badges_show = false;

      self.scope.close_popup_icon = 'sp-img/icon-close-sp.png';

      var items_template =
          '<div class="sptb-rating-list">' +
            '{{#history}}' +
            '<div class="sptb-rating-item">  ' +
              '<div class="sptb-rating-name t-ellps">  {{ name }}  </div>  ' +
              '<div class="sptb-rating-date">  {{ action_date }}  </div>  ' +
              '<div class="sptb-rating-count">  {{ points_delta }} балла  </div>' +
            '</div> ' +
            '{{/history}}' +
          '</div> ' +
          '<div class="sptb-rating-pager">' +
            '{{#pages}}' +
            '<a class="sptb-rating-page-item {{{selected @index}}}" href="#" data-page="{{@index}}">{{{page_index @index}}}</a>' +
            '{{/pages}}' +
//            '<a class="sptb-rating-page-item" href="#">&raquo;</a> ' +
          '</div> ';


      var pagination = {
        page: 0,
        pages: [],
        history: [],
        next_page: function(){

        },
        render: function(){

          var render = Handlebars.compile(items_template);

          root().getElementsByClassName('sptb-history-list')[0].innerHTML = render(pagination);
          var page_btns = root().getElementsByClassName('sptb-history-list')[0].getElementsByClassName('sptb-rating-page-item');
          for(var btn in page_btns){
            var b = page_btns[btn];
            b.onclick = function(e){
              e.preventDefault();
              SP.send('user.history.page', this.getAttribute('data-page'));
            };
          }
        }
      };

      Handlebars.registerHelper('page_index', function(index){
        return index+1;
      });

      Handlebars.registerHelper('selected', function(index){
        return pagination.page == index ? 'selected' : '';
      });

      SP.on('user.history.page', function(page){
        pagination.page = page;
        pagination.history = pagination.pages[page];
        pagination.render();
      });

      SP.on('load.user.info.success', function(res){
        self.scope.user = res.user;
        self.scope.user_status = res.user_status;
        self.scope.user_points = res.user_points;
        self.render();
      });

      self.scope.show_history = function(){
        SP.send('load.user.history');
      };

      self.scope.hide_history = function(){
        root().classList.remove('sptb-state-show-list');
      };

      SP.on('load.user.history.success', function(res){
        self.scope.history = res.map(function(item){
          item.name = get_action_name(item);
          item.action_date = get_action_date(item);
          return item;
        });
        pagination.page = 0;
        if(self.scope.history.length < 7){
          pagination.pages = [];
          pagination.history = self.scope.history;
        }
        else {
          pagination.pages = array_chunk(self.scope.history, 6);
          pagination.history = pagination.pages[pagination.page];
        }
        pagination.render();
        setTimeout(function(){
          root().classList.add('sptb-state-show-list');
        }, 0);
      });

      function get_action_date(action){
          var date = action.action_date.split('T')[0].split('-');
          return date[2].trim() + '.' + date[1].trim() + '.' + date[0].trim();
      }

      function array_chunk (arr, len) {

        var chunks = [],
          i = 0,
          n = arr.length;

        while (i < n) {
          chunks.push(arr.slice(i, i += len));
        }

        return chunks;
      }

      var history_items = {
        "purchase": "Покупка",
        "gift_purchase": "Подарок",
        "badge": "Бейджик",
        "registration": "Регистрация",
        "referral": "Регистрация друга",
        "referred": "Регистрация по приглашению",
        "referred_purchase": "Покупка приглашенного пользователя",
        "promocode": "За ввод промокода",
        "enter_group": "Вступление в группу ",
        "share_purchase": "Рассказ о покупке в ",
        "social_share": "Рассказ в ",
        "share_badge": "Рассказ о бейджике в "
      };

      function get_action_name(action){
        switch (action.action) {
          case 'event':
            return action.name;
          case 'extra':
            return action.name;
          case 'sharing':
            switch (action.social_action) {
              case 'like':
                return history_items.enter_group + action.social_type;
              case 'purchase':
                return history_items.share_purchase + action.social_type;
              case 'partner_page':
                return history_items.social_share + action.social_type;
              case 'badge':
                return history_items.share_badge + action.social_type;
            }
        }
        return history_items[action.action] || 'Нет описания';
      }

      Handlebars.registerHelper('user_pic', function(options) {
        return 'url(' + (options.fn(this) || SP.static('sp-img/image-1.png')) + ')';
      });

      Handlebars.registerHelper('get_badge_pic', function(options) {
        var url = options.fn(this);
        var gs = url.split(',')[1];
        var full = url.split(',')[0];
        var src;
        if(url.split(',')[2] == 'true'){
          src = full;
        }
        else {
          src = gs;
        }
        src = src || SP.static('sp-img/icon-man.png');
        return 'url(' + src + ')';
      });

      Handlebars.registerHelper('get_status', function(status_name){
        return status_name || 'Нет статуса';
      });

      Handlebars.registerHelper('get_status_pic', function(status_pic){
        var src = status_pic || SP.static('sp-img/icon-man.png');
        return 'url(' + src + ')';
      });

      Handlebars.registerHelper('user_pic', function(user_pic){
        var src = user_pic || SP.static('sp-img/icon-man.png');
        return 'url(' + src + ')';
      });

      self.scope.show_badges = function(){
        if(!self.scope.is_badges_show){
          self.scope.is_badges_show = true;
          root().classList.remove('sptb-state-show-list');
          SP.send('load.badges.list');
        }
        else {
          self.scope.is_badges_show = false;
          root().classList.remove('sptb-state-show-badge');
        }
      };

      SP.on('load.badges.list.success', function(res){
        self.scope.badges = res.multilevel_badges[0];
        self.render();
        setTimeout(function(){
          root().classList.add('sptb-state-show-badge');
        }, 0);
      });

      self.scope.toggle_points_info = function(){
        root().getElementsByClassName('sptb-info-popup')[0].classList.toggle('hidden');
      };
    },
    on_render: function(self, root){
      $(root).find('[data-slider]').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<div class="rsArrowLeft"></div>',
        nextArrow: '<div class="rsArrowRight"></div>'
      });
    }
  };

  var gifts = {
    name: 'sailplay-gifts',
    template:
      '<div class="sptb">' +
        '<div class="sptb-row"> ' +
          '<div class="sptb-item sptb-item-small sptb-item-blue sptb-item-right">' +
            '<div class="sptb-item-task-con">  ' +
              '<div class="sptb-item-task-title">  Подарки  </div>  ' +
              '<div class="sptb-item-task-subtitle">  на которые ты можешь <br/>  потратить баллы  </div>' +
            '</div>' +
            '<div class="sptb-item-gift-detail">  ' +
              '<div class="sptb-gift-img"> ' +
                '<div class="sptb-gift-count">{{selected_gift.points}}</div> ' +
                  '<i class="sptb-gift-icon type-gift" style="background-image: {{{gift_pic selected_gift.thumbs.url_250x250}}};"></i> ' +
                  '<svg width="180px" height="180px" class="sptb-gift-svg">' +
                    '<path fill="none" stroke="#93db7a" stroke-width="8px" d="{{{gift_completion selected_gift.points}}}"/>' +
                  '</svg>  ' +
                '</div>' +
              '</div> ' +
            '</div> ' +
            '<div class="sptb-item sptb-item-blue"> ' +
              '<div class="sptb-slider " data-slider>' +
                '{{#gifts}}' +
                '<div class="sptb-slider-item" >  ' +
                  '<div class="sptb-gift {{#completed}}{{points}}{{/completed}}" data-sp-click="show_gift({{id}})"> ' +
                    '<div class="sptb-gift-img">' +
                      '<div class="sptb-gift-count">{{ points }}</div>' +
                      '<i class="sptb-gift-icon type-gift" style="background-image: {{{gift_pic thumbs.url_250x250}}};"></i>' +
                      '<svg width="180px" height="180px" class="sptb-gift-svg">  ' +
                        '<path fill="none" stroke="#93db7a" stroke-width="8px" d="{{{gift_completion points}}}"/>' +
                      '</svg> ' +
                    '</div> ' +
                    '<div class="sptb-gift-title"> {{ name }} </div>  ' +
                  '</div>' +
                '</div> ' +
                '{{/gifts}}' +
              '</div> ' +
              '<div class="sptb-question"> ' +
                '<div class="sptb-question-title"> {{selected_gift.name}} </div> ' +
                '<div class="sptb-question-subtitle"> {{selected_gift.descr}}  </div> ' +
                '<div class="sptb-question-buttons">' +
                  '<a class="sptb-btn sptb-question-back" href="#" data-sp-click="hide_gift">Назад</a>' +
                  '{{#if user}}' +
                    '{{#if selected_gift.completed}}' +
                    '<a class="sptb-btn sptb-question-back" href="#" data-sp-click="gift_purchase">Получить</a> ' +
                    '{{else}}' +
                    '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="show_actions">Еще {{{points_delta_gift selected_gift.points}}} баллов</a>  ' +
                    '{{/if}}' +
                  '{{else}}' +
                  '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="login_request">Войти</a>  ' +
                  '{{/if}}' +
                '</div>  ' +
              '</div>  ' +
            '</div>  ' +
          '</div>  ' +
          '<div class="sptb-popup sptb-gift-coupon {{#show_coupon_popup}}visible{{/show_coupon_popup}} {{#is_discount}}sptb-is-discount{{/is_discount}}">' +
            '<a class="sptb-popup-close" href="#" data-sp-click="hide_coupon_popup">&#215;</a>' +
            '<div class="sptb-popup-title" style="padding-top: 40px;"> ПОЗДРАВЛЯЕМ! </div>' +
            '<div class="sptb-no-disc-message">' +
              '<div class="sptb-gift-coupon-text">' +
                'Для получения подарка свяжитесь с нами и сообщите номер полученного купона. Спасибо!' +
              '</div>' +
              '<div class="sptb-gift-coupon-text" style="margin-top: 20px; font-size: 14px;">' +
                'Телефон <span class="sptb-mark">(Бесплатно по России)</span>:' +
                '<div class="sptb-bold" style="font-size: 16px; margin-top: 6px;">8 (800) 555-54-76</div>' +
              '</div>' +
              '<div class="sptb-gift-coupon-text" style="margin-top: 20px; font-size: 14px;">' +
                'Почта:' +
                '<div class="sptb-bold" style="font-size: 16px; margin-top: 6px;">info@tbff.ru</div>' +
              '</div>' +
            '</div>' +
            '<div class="sptb-disc-message">' +
              '<div class="sptb-gift-coupon-text">' +
              'Вы получили купон на скидку!' +
              '</div>' +
            '</div>' +
            '<div class="sptb-gift-coupon-footer">  ' +
              'Номер вашего купона: </br>' +
              '<div class="sptb-bold"> {{ coupon.coupon_number }} </div>' +
            '</div>' +
//            '<a class="sptb-popup-btn sptb-btn" href="{{data.url}}">Воспользоваться баллами</a> ' +
          '</div>  ' +
      '</div>',
    init: function(self){
      var scope = self.scope;

      scope.close_icon = 'sp-img/icon-close-light.png';

      var root = function(){
        return self.root.getElementsByClassName('sptb')[0];
      };

      scope.user_points = {};

      scope.user = false;

      scope.selected_gift = false;

      SP.on('load.user.info.success', function(res){
        scope.user_points = res.user_points;
        scope.user = res.user;
        self.render();
      });

      SP.on('load.gifts.list.success', function(res){
        scope.gifts = res;
        self.render();
      });

      Handlebars.registerHelper('gift_pic', function(gift_pic){
        return 'url(' + (gift_pic || SP.static('sp-img/icon-gift-complete.png')) + ')';
      });

      function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
      }

      function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
          "M", start.x, start.y,
          "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;
      }

      Handlebars.registerHelper('gift_completion', function(points){
        points = points || 0;
        var user_points = scope.user_points.confirmed || 0;
        var angle = 360*(user_points/points);
        return describeArc(90, 90, 86, 0, (angle < 359 ? angle : 359));
      });

      scope.completed = function(){
        return function(val, render){

          var points = parseInt(render(val));
          var user_points = scope.user_points.confirmed || 0;

          var completed = user_points > points ? 'type-complete' : '';

          return completed;
        };
      };

      scope.show_gift = function(e, params){
        scope.selected_gift = SP.find(scope.gifts, { id: params[0] })[0] || false;
        var user_points = scope.user_points.confirmed || 0;
        scope.selected_gift.completed = user_points - scope.selected_gift.points >= 0;
        self.render();
        root().classList.add('sptb-state-show-gift');
      };

      scope.hide_gift = function(){
        scope.selected_gift = false;
        root().classList.remove('sptb-state-show-gift');
      };

      scope.login_request = function(){
        SP.send('login.request');
      };

      scope.show_actions = function(){
        SP.send('actions.show');
      };

      Handlebars.registerHelper('points_delta_gift', function(gift_points){
//        console.log(gift_points + ' ' + scope.user_points.confirmed);
          return gift_points - scope.user_points.confirmed;
      });

      scope.gift_purchase = function(){
        SP.send('gifts.purchase', scope.selected_gift);
      };

      scope.show_coupon_popup = false;

      scope.is_discount = false;

      scope.hide_coupon_popup = function(){
        scope.show_coupon_popup = false;
        self.render();
      };

      SP.on('gifts.purchase.success', function(res){
        scope.coupon = res;
        scope.show_coupon_popup = true;
        scope.is_discount = scope.selected_gift && scope.selected_gift.name.match(/скидка/gi);
        self.render();
      });

    },
    on_render: function(self, root){
      $(root).find('[data-slider]').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<div class="rsArrowLeft"></div>',
        nextArrow: '<div class="rsArrowRight"></div>'
      });
    }
  };

  var actions = {
    name: 'sailplay-actions',
    template:
      '<div class="sptb">' +
        '<div class="sptb-row"> ' +
          '<div class="sptb-item sptb-item-red sptb-item-right">' +
            '<div class="sptb-last-slider" data-slider>  ' +
              '{{#actions}}' +
              '<div class="sptb-slider-item"> ' +
                '<div class="sptb-task-item" data-sp-click="show_action({{_actionId}})">' +
                  '<div class="sptb-task-img" style="background-image: url({{pic}});">  ' +
                    '<div class="sptb-task-img-count">  {{points}}  </div>' +
                  '</div>' +
                  '<div class="sptb-task-name">{{name}}</div> ' +
                '</div>  ' +
              '</div>' +
              '{{/actions}}' +
            '</div>' +
            '<div class="sptb-last-question ">  ' +
              '<div class="sptb-question-title">  {{selected_action.name}}  </div>  ' +
              '<div class="sptb-question-subtitle">  {{selected_action.descr}}  </div>  ' +
              '<div class="sptb-question-buttons"> ' +
                '<a class="sptb-btn sptb-question-back" href="#" data-sp-click="hide_action">Назад</a> ' +
                '{{#if user}}'+
                '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="earn_points">Выполнить</a> ' +
                '{{else}}'+
                '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="login_request">Войти</a> ' +
                '{{/if}}'+
              '</div>' +
            '</div> ' +
          '</div> ' +
          '<div class="sptb-item sptb-item-red sptb-item-small"> ' +
            '<div class="sptb-last-con">' +
              '<div class="sptb-item-task-title">Задания</div>' +
              '<div class="sptb-item-task-subtitle">за выполнение которых <br/>ты получишь баллы</div> ' +
            '</div> ' +
            '<div class="sptb-last-detail "> ' +
              '<div class="sptb-task-img" style="background-image: url({{selected_action.pic}});">' +
                '<div class="sptb-task-img-count">{{ selected_action.points }}</div> ' +
              '</div> ' +
            '</div> ' +
          '</div> ' +
        '</div>  ' +
      '</div>',
    init: function(self){

      var scope = self.scope;

      scope.actions = [];

      scope.user = false;

      scope.selected_action = false;

      var root = function(){
        return self.root.getElementsByClassName('sptb')[0];
      };

      SP.on('load.actions.list.success', function(data){
        function get_name(action){
          if(action.name) return action.name;
          if(action.descr) return action.descr;
          if(system_actions.system[action.type]) return system_actions.system[action.type].name;
          if(action.socialType && system_actions.social[action.socialType]) return system_actions.social[action.socialType][action.action].name;
          return 'Нет описания';
        }
        function get_pic(action){
          if(action.pic) return action.pic;
          if(action.img) return SP.static(action.img);
          if(system_actions.system[action.type]) return SP.static(system_actions.system[action.type].pic);
          if(action.socialType && system_actions.social[action.socialType]) return SP.static(system_actions.social[action.socialType][action.action].pic);
          return '';
        }
        function get_descr(action){
          if(action.descr) return action.descr;
          if(system_actions.system[action.type]) return system_actions.system[action.type].descr;
          if(action.socialType && system_actions.social[action.socialType]) return system_actions.social[action.socialType][action.action].descr;
          return '';
        }
        scope.actions = data.actions.concat(tb_actions)
          .filter(function(action){
            return action.action != 'purchase';
          })
          .map(function(action){
          action.name = get_name(action);
          action.pic = get_pic(action);
          action.descr = get_descr(action);
          return action;
        });
        self.render();
      });

      SP.on('load.user.info.success', function(res){
        scope.user = res.user;
      });

      scope.earn_points = function(){
        if(scope.selected_action.url){
          window.open(scope.selected_action.url, '_blank');
        }
        else {
          SP.send('actions.perform', scope.selected_action);
        }
      };

      SP.on('actions.social.connect.complete', function () {
        SP.send('load.actions.list');
      });

      SP.on('actions.perform.complete', function () {
        SP.send('load.actions.list');
      });

      scope.show_action = function(e, params){
        scope.selected_action = SP.find(scope.actions, { _actionId: params[0] })[0];
//        console.dir(scope.selected_action);
        self.render();
        root().classList.add('sptb-state-show-task');
      };

      scope.hide_action = function(){
        scope.selected_action = false;
        root().classList.remove('sptb-state-show-task');
      };

      scope.login_request = function(){
        SP.send('login.request');
      };

      var tb_actions = [
        {
          _actionId: 'comment',
          name: 'Оставь комментарий',
          url: 'http://club.trendsbrands.ru/',
          img: 'sp-img/actions/TrendsBrands-17.png',
          descr: 'Принимай участие в обсуждении интересных тем в T&B Club, нам важно твое мнение',
          points: 10
        },
        {
          _actionId: 'repost',
          name: 'СДЕЛAЙ РЕПОСТ СТAТЬИ T&B CLUB',
          url: 'http://club.trendsbrands.ru/',
          img: 'sp-img/actions/TrendsBrands-18.png',
          descr: 'Понравилась статья в T&B Club? Скорее делай репост и зарабатывай баллы.',
          points: 10
        },
        {
          _actionId: 'author',
          name: 'стань автором T&B club',
          url: 'http://club.trendsbrands.ru/',
          img: 'sp-img/actions/TrendsBrands-19.png',
          descr: 'Напиши пост для T&B Club и если он будет опубликован, получи дополнительные баллы.',
          points: 10
        },
        {
          _actionId: 'meeting',
          name: 'СТАНЬ УЧАСТНИЦЕЙ ВСТРЕЧИ T&B CLUB',
          url: 'http://club.trendsbrands.ru/',
          img: 'sp-img/actions/TrendsBrands-20.png',
          descr: 'Присоединяйся к нашей следующей встрече и ты узнаешь много нового и интересного.',
          points: 10
        },
        {
          _actionId: 'share_shopping',
          name: 'Расскажи о своем шоппинге',
          url: 'http://club.trendsbrands.ru/',
          img: 'sp-img/actions/TrendsBrands-21.png',
          points: 10,
          descr: 'Сделай шейр своей покупки в любимой соц. сети и получи бонусные баллы'
        }
      ];

      var system_actions = {
        "system": {
          "inviteFriend": {
            name: 'Пригласить подругу',
            pic: 'sp-img/actions/TrendsBrands-25.png',
            descr: 'Понравился шопинг в Trends brands? Пригласи подругу и получите баллы на двоих.'
          }
        },
        "social": {
          "vk": {
            "like": {
              "name": "follow us",
              "pic": "sp-img/actions/TrendsBrands-23.png",
              descr: 'Подписывайся на наши странички в соц. сетях чтобы ничего не пропустить.'
            },
            "partner_page": {
              "name": "Расскажи о нас друзьям в VK",
              "pic": "sp-img/actions/TrendsBrands-26.png",
              descr: 'Тебе понравился наш магазин? Посоветуй его своим подругам, и получи баллы.'
            }
          },
          "fb": {
            "like": {
              "name": "follow us",
              "pic": "sp-img/actions/TrendsBrands-24.png",
              descr: 'Подписывайся на наши странички в соц. сетях чтобы ничего не пропустить.'
            },
            "partner_page": {
              "name": "Расскажи о нас друзьям в FB",
              "pic": "sp-img/actions/TrendsBrands-28.png",
              descr: 'Тебе понравился наш магазин? Посоветуй его своим подругам, и получи баллы.'
            }
          },
          "tw": {
            "partner_page": {
              "name": "Расскажи о нас друзьям в TW",
              "pic": "sp-img/actions/TrendsBrands-27.png",
              descr: 'Тебе понравился наш магазин? Посоветуй его своим подругам, и получи баллы.'
            }
          }
        }
      };

    },
    on_render: function(self, root){
      $(root).find('[data-slider]').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<div class="rsArrowLeft"></div>',
        nextArrow: '<div class="rsArrowRight"></div>'
      });
    }
  };
  
  var thanks = {
    name: 'sailplay-thanks',
    template:
      '{{#if is_show}}' +
      '<div class="sptb" style="display: block;">  ' +
      '{{else}}' +
      '<div class="sptb" style="display: none;">  ' +
      '{{/if}}' +
        '<div class="sptb-popup ">' +
          '<a class="sptb-popup-close" style="background-image: url({{{static close_icon}}})" href="#" data-sp-click="hide_popup"></a>' +
          '<div class="sptb-popup-title"> Ты получаешь <span>{{ data.points }}</span> баллов! </div>' +
          '<div class="sptb-popup-subtitle">Расскажи о покупке и получи еще <b>{{ data.share_points }} баллов</b></div>' +
          '<div class="sptb-popup-sharing">  ' +
            '{{#actions}}' +
              '<a class="sptb-popup-item" style="background-image: url({{{social_icon socialType}}});" href="#" data-sp-click="share_purchase({{socialType}})"></a>  ' +
            '{{/actions}}' +
          '</div>' +
          '<a class="sptb-popup-btn sptb-btn" href="{{data.url}}">Воспользоваться баллами</a> ' +
        '</div>  ' +
      '</div>',
    init: function(self){


      var scope = self.scope;

      scope.close_icon = 'sp-img/icon-close-light.png';

      Handlebars.registerHelper('social_icon', function(type){
        return SP.static(scope.social_icons[type]);
      });

      scope.social_icons = {
        vk: 'sp-img/icon-share-vk.png',
        fb: 'sp-img/icon-share-fb.png',
        tw:'sp-img/icon-share-tw.png'
      };

      scope.data = {};
      scope.actions = [];

      scope.is_show = false;

      SP.on('load.actions.list.success', function(data){
        scope.actions = data.actions.filter(function(action){
          return action.action == 'purchase';
        });
        self.render();
      });

//      self.render();

      var root = function(){
        return self.root.getElementsByClassName('sptb')[0];
      };

      SP.on('thanks.show', function(data){
        scope.data = data;
        scope.is_show = true;
        self.render();
      });

      SP.on('thanks.hide', function(){
        scope.is_show = false;
        self.render();
      });

      scope.spend_points = function(){
        SP.send('points.spend.request');
      };

      scope.hide_popup = function(){
        SP.send('thanks.hide');
      };

      scope.share_purchase = function(e, params){
        var share_action = SP.find(scope.actions, {socialType: params[0]})[0];
        SP.send('actions.perform', share_action);
      };

    }
  };



  $(d).ready(function(){

    SP.widget(header);
    SP.widget(profile);
    SP.widget(gifts);
    SP.widget(actions);
    SP.widget(thanks);

    SP.on('login.success', function(){
      SP.send('load.user.info');
      SP.send('load.gifts.list');
      SP.send('load.actions.list');
    });

    SP.on('login.error', function(){
      SP.send('load.gifts.list');
      SP.send('load.actions.list');
    });

    SAILPLAY.on('gifts.purchase.force_complete.success', function () {
      SAILPLAY.send('load.user.info');
      SAILPLAY.send('load.user.history');
    });

    SAILPLAY.on('gifts.purchase.success', function () {
      SAILPLAY.send('load.user.info');
      SAILPLAY.send('load.user.history');
    });

    SAILPLAY.on('init.success', function(){
      load_static();
    });

  });
  
}(SAILPLAY, document));
