(function(SP, d){

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
          console.dir(this);
          options.init && options.init(this);
        }
      };
      new_widget.instances.push(inst);
      inst.init();
    }

    //render method
    function render(inst){

      var scope = inst.scope || {};

      //render mustache template
      Mustache.parse(template);

      inst.root.innerHTML = Mustache.render(template, scope);

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
        '<div class="sptb-promo-img"></div>' +
        '<div class="sptb-promo-text"> ' +
        '<div class="title"> Бонусная программа </div> ' +
        '<div class="text"> Регистрируйся, совершай покупки,выполняй задания,<br/>  копи баллы и обменивай их на подарки! </div> ' +
        '</div>  ' +
        '</div>  ' +
        '</div>  ' +
        '</div>',
    init: function(widget){
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
        '<div class="sptb-level ">' +
        '{{#badges}}' +
        '<div class="sptb-level-item">  ' +
        '<i class="sptb-level-icon" style="background-image: {{#get_badge_pic}}{{ thumbs.url_250x250 }},{{thumbs.url_gs}},{{is_received}}{{/get_badge_pic}}"> ' +
        '<span class="sptb-level-icon-count">{{points}}</span>  ' +
        '</i>  ' +
        '<div class="sptb-level-name">  {{name}}  </div>  ' +
        '<div class="sptb-level-subname">  {{descr}}  </div>' +
        '</div>' +
        '<div class="sptb-level-item-arrow"></div> ' +
        '{{/badges}}' +
        '</div>  ' +
        '</div>  ' +
        '<div class="sptb-list "> ' +
        '<div class="sptb-rating-list">' +
        '{{#history}}' +
        '<div class="sptb-rating-item">  ' +
        '<div class="sptb-rating-name t-ellps">  {{#name_filter}}{{ name }}{{/name_filter}}  </div>  ' +
        '<div class="sptb-rating-date">  {{#date}} {{ action_date }} {{/date}}  </div>  ' +
        '<div class="sptb-rating-count">  {{ points_delta }} балла  </div>' +
        '</div> ' +
        '{{/history}}' +
        '</div> ' +
        '<div class="sptb-rating-pager">' +
        '<a class="sptb-rating-page-item" href="#">1</a>' +
        '<a class="sptb-rating-page-item" href="#">2</a>' +
        '<a class="sptb-rating-page-item" href="#">3</a>' +
        '<a class="sptb-rating-page-item" href="#">4</a>' +
        '<a class="sptb-rating-page-item" href="#">&raquo;</a> ' +
        '</div> ' +
        '<a class="sptb-rating-btn sptb-btn" href="#" data-sp-click="hide_history"> Вернуться назад </a>  ' +
        '</div>  ' +
        '<div class="sptb-detail-info "> ' +
        '<div class="sptb-info">' +
        '<div class="sptb-info-ava" style="background-image: {{#user_pic }}{{user.pic}}{{/user_pic}};"></div>' +
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
        '<a class="sptb-info-popup-close" href="#" data-sp-click="toggle_points_info"></a>' +
        '<div class="sptb-info-popup-text">“+N баллов” - количество неподтвержденныхбаллов, которые будут подтверждены послефактической оплаты заказа</div> ' +
        '</div>  ' +
        '</span>' +
        '</div> ' +
        '</div>  ' +
        '</div>' +
        '</div>' +
        '<div class="sptb-item sptb-item-orange sptb-item-small sptb-level-con"> ' +
        '<i class="sptb-level-icon sptb-level-img-small" style="background-image: {{#get_status_pic}}{{ user_status.pic }}{{/get_status_pic}};"></i> ' +
        '<div class="sptb-level-title"> Твой статус: {{#get_status}}{{ user_status.name }}{{/get_status}}  </div> ' +
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
          return item;
        });
        self.render();
        root().classList.add('sptb-state-show-list');
      });

      self.scope.date = function(){
        return function(text, render){
          var date = render(text).split('T')[0].split('-');
          return date[2].trim() + '.' + date[1].trim() + '.' + date[0].trim();
        };
      };

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
        return history_items[action.action];
      }

      self.scope.name_filter = function(){
        return function(text, render){
          var name = render(text) || 'Нет описания';
          return name;
        };
      };

      self.scope.user_pic = function(){
        return function(text, render){
          var src = render(text) || 'sp-img/image-1.png';
          return 'url(' + src + ')';
        };
      };

      self.scope.get_status = function(){
        return function(text, render){
          var status = render(text) || 'Нет статуса';
          return status;
        };
      };

      self.scope.get_status_pic = function(){
        return function(text, render){
          var src = render(text) || 'sp-img/icon-man.png';
          return 'url(' + src + ')';
        };
      };

      self.scope.get_badge_pic = function(){
        return function(text, render){
          var gs = render(text).split(',')[1];
          var full = render(text).split(',')[0];
          var src;
          if(render(text).split(',')[2] == 'true'){
            src = full;
          }
          else {
            src = gs;
          }
          src = src || 'sp-img/icon-man.png';
          return 'url(' + src + ')';
        };
      };

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
        root().classList.add('sptb-state-show-badge');
      });

      self.scope.toggle_points_info = function(){
        root().getElementsByClassName('sptb-info-popup')[0].classList.toggle('hidden');
      };
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
                  '<i class="sptb-gift-icon type-gift" style="background-image: {{#gift_pic}}{{ selected_gift.thumbs.url_250x250 }}{{/gift_pic}};"></i> ' +
                  '<svg width="180px" height="180px" class="sptb-gift-svg">' +
                    '<path fill="none" stroke="#93db7a" stroke-width="8px" d="{{#gift_completion}}{{selected_gift.points}}{{/gift_completion}}"/>' +
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
                      '<i class="sptb-gift-icon type-gift" style="background-image: {{#gift_pic}}{{ thumbs.url_250x250 }}{{/gift_pic}};"></i>' +
                      '<svg width="180px" height="180px" class="sptb-gift-svg">  ' +
                        '<path fill="none" stroke="#93db7a" stroke-width="8px" d="{{#gift_completion}}{{points}}{{/gift_completion}}"/>' +
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
                  '{{#user}}' +
                  '{{#selected_gift.completed}}' +
                  '<a class="sptb-btn sptb-question-back" href="#" data-sp-click="gift_purchase">Получить</a> ' +
                  '{{/selected_gift.completed}}' +
                  '{{^selected_gift.completed}}' +
                  '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="show_actions">Еще {{#points_delta}}{{selected_gift.points}}{{/points_delta}} баллов</a>  ' +
                  '{{/selected_gift.completed}}' +
                  '{{/user}}' +
                  '{{^user}}' +
                  '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="login_request">Войти</a>  ' +
                  '{{/user}}' +
                '</div>  ' +
              '</div>  ' +
            '</div>  ' +
          '</div>  ' +
      '</div>',
    init: function(self){
      var scope = self.scope;

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

      scope.gift_pic = function(){
        return function(text, render){
          var src = render(text) || 'sp-img/icon-gift-complete.png';
          return 'url(' + src + ')';
        };
      };

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

      scope.gift_completion = function(){
        return function(text, render){
          var points = render(text) || 0;
          var user_points = scope.user_points.confirmed || 0;
          var angle = 360*(user_points/points);
          var completion = describeArc(90, 90, 86, 0, (angle < 359 ? angle : 359));
          return completion;
        };
      };

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

      scope.points_delta = function(){
        return function(val, render){
          var gift_points = render(val);
          return gift_points - scope.user_points.confirmed;;
        };
      };

      scope.gift_purchase = function(){
        SP.send('gifts.purchase', scope.selected_gift);
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
                  '<div class="sptb-task-img type-vk">  ' +
                    '<div class="sptb-task-img-count">  {{points}}  </div>' +
                  '</div>' +
                  '<div class="sptb-task-name">{{#get_name}}{{_actionId}}{{/get_name}}</div> ' +
                '</div>  ' +
              '</div>' +
              '{{/actions}}' +
            '</div>' +
            '<div class="sptb-last-question ">  ' +
              '<div class="sptb-question-title">  {{#get_name}}{{selected_action._actionId}}{{/get_name}}  </div>  ' +
              '<div class="sptb-question-subtitle">  {{selected_action.descr}}  </div>  ' +
              '<div class="sptb-question-buttons"> ' +
                '<a class="sptb-btn sptb-question-back" href="#" data-sp-click="hide_action">Назад</a> ' +
                '{{#user}}'+
                '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="earn_points">Выполнить</a> ' +
                '{{/user}}'+
                '{{^user}}'+
                '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="login_request">Войти</a> ' +
                '{{/user}}'+
              '</div>' +
            '</div> ' +
          '</div> ' +
          '<div class="sptb-item sptb-item-red sptb-item-small"> ' +
            '<div class="sptb-last-con">' +
              '<div class="sptb-item-task-title">Задания</div>' +
              '<div class="sptb-item-task-subtitle">за выполнение которых <br/>ты получишь баллы</div> ' +
            '</div> ' +
            '<div class="sptb-last-detail "> ' +
              '<div class="sptb-task-img type-write">' +
                '<div class="sptb-task-img-count">{{ selected_action.points }}</div> ' +
              '</div> ' +
            '</div> ' +
          '</div> ' +
        '</div>  ' +
      '</div>',
    templateo:
      '<div class="sptb {{#selected_action}}sptb-state-show-task{{/selected_action}}">  ' +
        '<div class="sptb-row">'+
        '<div class="sptb-item sptb-item-red sptb-item-right">' +
        '<div class="sptb-last-slider" data-slider>  ' +
        '{{#actions}}' +
        '<div class="sptb-slider-item"> ' +
        '<div class="sptb-task-item" data-sp-click="show_action({{_actionId}})">' +
        '<div class="sptb-task-img">  ' +
        '<div class="sptb-task-img-count">  {{points}}  </div>' +
        '</div>' +
        '<div class="sptb-task-name">{{#get_name}}{{_actionId}}{{/get_name}}</div> ' +
        '</div> ' +
        '</div>  ' +
        '{{/actions}}' +
        '</div>' +
        '<div class="sptb-last-question hidden"> ' +
        '<div class="sptb-question-title"> {{#get_name}}{{selected_action._actionId}}{{/get_name}} </div> ' +
        '<div class="sptb-question-subtitle"> {{selected_action.descr}}  </div> ' +
        '<div class="sptb-question-buttons">' +
        '<a class="sptb-btn sptb-question-back" href="#" data-sp-click="hide_action">Назад</a>' +
        '{{#user}}'+
        '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="earn_points">Выполнить</a> ' +
        '{{/user}}'+
        '{{^user}}'+
        '<a class="sptb-btn sptb-question-more" href="#" data-sp-click="login_request">Войти</a> ' +
        '{{/user}}'+
        '</div>  ' +
        '</div>  ' +
        '</div> ' +
        '<div class="sptb-item sptb-item-red sptb-item-small">' +
        '<div class="sptb-last-con">  ' +
        '<div class="sptb-item-task-title">  Задания  </div>  ' +
        '<div class="sptb-item-task-subtitle">  за выполнение которых <br/>  ты получишь баллы  </div>' +
        '</div>' +
        '<div class="sptb-last-detail hidden">  ' +
        '<div class="sptb-task-img type-write"> ' +
        '<div class="sptb-task-img-count"> {{ selected_action.points }} </div>  ' +
        '</div>' +
        '</div> ' +
        '</div>  ' +
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
        scope.actions = data.actions;
        self.render();
      });

      SP.on('load.user.info.success', function(res){
        scope.user = res.user;
      });

      scope.earn_points = function(){
        SP.send('actions.perform', scope.selected_action);
      };

      SP.on('actions.social.connect.complete', function () {
        SP.send('load.actions.list');
      });

      SP.on('actions.perform.complete', function () {
        SP.send('load.actions.list');
      });

      scope.show_action = function(e, params){
        scope.selected_action = SP.find(scope.actions, { _actionId: params[0] })[0];
        console.dir(scope.selected_action);
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

      scope.system_actions = {
        emailBinding: 'partners/pj/img/icons/actions/email_binding.png',
        fillProfile: 'partners/pj/img/icons/actions/fill_profile.png',
        inviteFriend: 'partners/pj/img/icons/actions/invite_friend.png'
      };

      var action_names = {
        "system": {
          "emailBinding": "Указать E-mail",
          "fillProfile": "Заполнить профиль",
          "inviteFriend": "Пригласить друга"
        },
        "social": {
          "vk": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о TB в VK"
            },
            "purchase": {
              "name": "Рассказать о покупке в VK"
            }
          },
          "fb": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о TB в FB"
            },
            "purchase": {
              "name": "Рассказать о покупке в FB"
            }
          },
          "gp": {
            "like": {
              "name": "Лайкнуть в GP"
            },
            "partner_page": {
              "name": "Рассказать о TB в GP"
            },
            "purchase": {
              "name": "Рассказать о покупке в GP"
            }
          },
          "ok": {
            "like": {
              "name": "Вступить в группу"
            },
            "partner_page": {
              "name": "Рассказать о TB в OK"
            },
            "purchase": {
              "name": "Рассказать о покупке в OK"
            }
          },
          "tw": {
            "partner_page": {
              "name": "Рассказать о TB в TW"
            },
            "purchase": {
              "name": "Рассказать о покупке в Tw"
            }
          }
        }
      };

      scope.get_name = function(){
        return function(val, render){
          var action_id = render(val);
          var action = SP.find(scope.actions, { _actionId: action_id })[0] || false;
          if(!action){
            return '';
          }
          return action_names.system[action.type] || action_names.social[action.socialType][action.action].name ||  action.descr || 'Нет описания';
        };
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
      '<div class="sptb" style="display: none;">  ' +
        '<div class="sptb-popup ">' +
        '<a class="sptb-popup-close" href="#" data-sp-click="hide_popup"></a>' +
        '<div class="sptb-popup-title"> Ты получаешь <span>{{ data.points }}</span> баллов! </div>' +
        '<div class="sptb-popup-subtitle">Расскажи о покупке и получи еще <b>{{ data.share_points }} баллов</b></div>' +
        '<div class="sptb-popup-sharing">  ' +
        '<a class="sptb-popup-item type-vk" href="#" data-sp-click="share_purchase(vk)"></a>  ' +
        '<a class="sptb-popup-item type-fb" href="#" data-sp-click="share_purchase(fb)"></a>  ' +
        '<a class="sptb-popup-item type-tw" href="#" data-sp-click="share_purchase(tw)"></a>' +
        '</div>' +
        '<a class="sptb-popup-btn sptb-btn" href="#" data-sp-click="spend_points">Воспользоваться баллами</a> ' +
        '</div>  ' +
        '</div>',
    init: function(self){

      var scope = self.scope;

      scope.data = {};

//      self.render();

      var root = function(){
        return self.root.getElementsByClassName('sptb')[0];
      };

      SP.on('thanks.show', function(data){
        scope.data = data;
        self.render();
        root().style.display = 'block';
      });

      SP.on('thanks.hide', function(){
        root().style.display = 'none';
      });

      scope.spend_points = function(){
        SP.send('points.spend.request');
      };

      scope.hide_popup = function(){
        SP.send('thanks.hide');
      };

      scope.share_purchase = function(e, params){
        SP.send('purchase.share.request', { type: params[0] });
      };

    }
  };



  window.onload = function(){

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

    SAILPLAY.on('gift.purchase.force_complete.success', function () {
      SAILPLAY.send('load.user.info');
      SAILPLAY.send('load.user.history');
    });

    SAILPLAY.send('init', { partner_id: 206, domain: 'http://dev.sailplay.ru' });
    SAILPLAY.on('init.success', function(){
      SAILPLAY.send('login', '38c6285d1b1bce88a1071f116704263bf2511b18');
    });

  };
  
}(SAILPLAY, document));
