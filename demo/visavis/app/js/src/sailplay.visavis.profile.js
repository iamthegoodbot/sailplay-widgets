(function(){

  angular.module('visavis.profile', [ 'visavis' ])

    .directive('sailplayProfile', function($timeout){

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="spvv">\
                    <div class="spvv-inline" data-ng-show="user">\
                      <div class="spvv-bl__left">\
                        <div class="spvv-history">\
                          <div class="spvv-history__i" data-dir-paginate="item in history | itemsPerPage: 10">\
                            <div class="spvv-history__i-date">\
                              {{ item.action_date | date:\'dd.MM.yyyy\' }}\
                            </div>\
                            <div class="spvv-history__i-name t-ellps">\
                              {{ get_action_name(item) || \'Нет описания\' }}\
                            </div>\
                            <div class="spvv-history__i-points t-ellps">\
                              {{ item.points_delta > 0 ? \'+\' : \'\' }}{{ item.points_delta | short_number }} баллов\
                            </div>\
                          </div>\
                        </div>\
                        <dir-pagination-controls></dir-pagination-controls>\
                      </div>\
                      <div class="spvv-bl spvv-bl__points">\
                        <div>\
                          <div class="spvv-bl__title">\
                            Ваши баллы\
                          </div>\
                        </div>\
                        <div class="spvv-bl__count">\
                          {{ user.user_points.confirmed | short_number }}\
                          <i class="spvv-bl__count-icon">\
                            <span class="text">+{{ user.user_points.unconfirmed | short_number }}</span>\
                          </i>\
                          <div class="spvv-bl__count-popup">\
                            Ваши неподтвержденные баллы,\
                            которые станут подтверждены\
                            после факта оплаты заказа\
                          </div>\
                        </div>\
                        <div class="spvv-bl__subcount">\
                          бонусных баллов\
                        </div>\
                        <div class="spvv-bl__btn-con">\
                        <a class="spvv-bl__btn spvv-bl__btn-history" href="#" data-ng-click="$event.preventDefault(); toggle_history();">\
                          <span class="history">История начислений</span>\
                          <span class="close hidden">Закрыть список</span>\
                        </a>\
                      </div>\
                    </div>\
                    <div class="spvv-bl__right" style="padding: 0 6%;">\
                      <div class="spvv-bl spvv-bl__status" style="width: 31%; margin: 0 1.1%; height: auto;" data-ng-repeat="badge in badges">\
                        <div class="spvv-bl__label-img">\
                          <img style="width: 80%; margin: 0 auto;" data-ng-src="{{ badge.thumbs.url_250x250 }}" class="spvv-bl__label"/>\
                        </div>\
                        <div>\
                          <p class="spvv_badge_title">{{ badge.name }}</p>\
                          <p class="spvv_badge_desc">\
                            {{ badge.descr }}\
                          </p>\
                        </div>\
                      </div>\
                      <div class="spvv-bl__btn-con" style="width: 100%; text-align: center;">\
                        <a class="spvv-bl__btn spvv-bl__btn-status" href="#" data-ng-click="$event.preventDefault(); toggle_status();">\
                          <span class="close hidden">Закрыть список</span>\
                        </a>\
                      </div>\
                    </div>\
                    <div class="spvv-bl spvv-bl__status">\
                      <div>\
                        <div class="spvv-bl__title">\
                        Ваш статус\
                        </div>\
                      </div>\
                      <div class="spvv-bl__label-img">\
                        <img class="spvv-bl__label" data-ng-src="{{ user.user_status.pic || \'sp-img/no_badge.png\' }}"/>\
                      </div>\
                      <div class="spvv-bl__btn-con">\
                        <a class="spvv-bl__btn spvv-bl__btn-status" href="#" data-ng-click="$event.preventDefault(); toggle_status();">\
                          <span class="list">Список статусов</span>\
                        </a>\
                      </div>\
                    </div>\
                  </div>\
                 </div>',
        scope: true,
        link: function(scope, elm){

          scope.user = false;

          scope.show_history = false;

          scope.show_status = false;

          scope.badges = [];

          scope.toggle_history = function(){
		          var elem = angular.element(elm[0]).find('.spvv-inline');
            if(!scope.show_history){
		            elem.addClass('show_left_block show_left_higher');
              scope.show_history = true;
            }
            else {
              scope.show_history = false;
		            elem.removeClass('show_left_block');
              $timeout(function(){
		              elem.removeClass('show_left_higher');
              }, 700);
            }
          };

          scope.toggle_status = function(){
		          var elem = angular.element(elm[0]).find('.spvv-inline');
		          console.log(elem)
            if(!scope.show_status){
		            elem.addClass('show_right-block show_right_higher');
              scope.show_status = true;
            }
            else {
              scope.show_status = false;
		            elem.removeClass('show_right-block');
              $timeout(function(){
		              elem.removeClass('show_right_higher');
              }, 700);
            }
          };

          SAILPLAY.on('load.user.info.success', function(user){
            scope.$apply(function(){
              console.dir(user);
              scope.user = user;
            });
          });

          SAILPLAY.on('load.user.history.success', function(history){
            scope.$apply(function(){
              scope.history = history;
              console.dir(history);
            });
          });

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

          scope.get_action_name = function(action){
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
          };

          SAILPLAY.on('load.badges.list.success', function(data){
            console.dir(data);
            scope.$apply(function(){
              scope.badges = data.one_level_badges;
            });
          });

        }
      }

    });

  window.addEventListener('load', function(){
    document.createElement('sailplay-profile');
    var banners = document.querySelectorAll('sailplay-profile');
    for(var i = 0; i < banners.length; i+=1){
      angular.bootstrap(banners[i], [ 'visavis.profile' ]);
    }
  });

}());