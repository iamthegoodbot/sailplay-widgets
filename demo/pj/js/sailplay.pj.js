(function (SP) {

  if (typeof SP == 'undefined') {
    alert('SailPlay HUB needed to work');
    return;
  }

  var sp_app = angular.module('sailplay.pj', ['pj.filters', 'pj.services']);

  sp_app.service('config', function () {
    return SP.config() || {};
  });

  sp_app.run(function ($rootScope, translate, config) {

    translate.setLang(config.lang || translate.lang || 'ru');

    SAILPLAY.on('language.set.success', function (lang) {
      translate.setLang(lang);
      $rootScope.$apply();
    });

    SAILPLAY.on('login.success', function () {
      SAILPLAY.send('load.user.info');
      SAILPLAY.send('load.user.history');
    });

  });

  sp_app.directive('sailplayUserProfile', function () {
    var template = "";
    template += "<table class=\"user_info_wrapper myriad\" data-ng-show=\"user_obj\" data-ng-cloak>";
    template += "   <tr>";
    template += "      <td style=\"padding-left: 40px; width: 10%;\"> <img data-ng-src=\"{{ user_obj.user.pic }}\" alt=\"user_icon\" class=\"oldify user_pic\"\/>  <\/td>";
    template += "      <td style=\"border-right: 1px dotted #bdbbb5; padding-right: 30px; width: 20%;\">";
    template += "         <p class=\"rockwell\" style=\"font-size: 18px;\" data-ng-bind=\"user_obj.user.name || translate.profile.no_name\"><\/p>";
    template += "         <p data-ng-show=\"user_obj.last_badge.name\" class=\"myriad user_badge\" data-ng-bind=\"user_obj.last_badge.name\"><\/p>";
    template += "      <\/td>";
    template += "      <td style=\"padding-left: 30px; width: 10%;\">";
    template += "         <div class=\"points_circle confirmed oldify\">  <span class=\"rockwell\" data-ng-bind=\"user_obj.user_points.confirmed | short_number\"><\/span><\/div>";
    template += "      <\/td>";
    template += "      <td style=\"border-right: 1px dotted #bdbbb5; padding-right: 20px; width: 20%;\">";
    template += "         <p style=\"font-size: 14px;\" data-ng-bind=\"translate.profile.confirmed_points\"><\/p>";
    template += "         <a href=\"#\" style=\"font-size: 14px; text-decoration: underline;\" class=\"green_text\" data-ng-bind=\"translate.profile.history_link\" data-ng-click='$event.preventDefault();change_type(\"history\")'><\/a>";
    template += "      <\/td>";
    template += "      <td style=\"padding-left: 30px; width: 10%;\">";
    template += "         <div class=\"points_circle unconfirmed oldify\">  <span class=\"rockwell\" data-ng-bind=\"user_obj.user_points.unconfirmed | short_number\"><\/span><\/div>";
    template += "      <\/td>";
    template += "      <td style=\"padding-right: 20px; width: 20%;\">";
    template += "         <p style=\"font-size: 14px;\" data-ng-bind=\"translate.profile.unconfirmed_points\"><\/p>";
    template += "         <div style=\"position: relative;\">";
    template += "            <a class=\"green_text\" style=\"font-size: 14px; text-decoration: underline; position: relative;\" data-ng-click=\"show_points_help = !show_points_help\" data-ng-bind=\"translate.profile.what_is_it\"><\/a> ";
    template += "            <div class=\"hint help_points\" data-ng-show=\"show_points_help\">";
    template += "               <div class=\"close_btn\" data-ng-click=\"show_points_help = !show_points_help\">×<\/div>";
    template += "               <div class=\"caption\" data-ng-bind-html=\"translate.profile.what_is_unconfirmed_points | to_html\"><\/div>";
    template += "               <div class=\"steps\">";
    template += "                  <div class=\"step step1\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"unconfirmed_points_circle diameter50\">100<\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.purchases\"><\/div>";
    template += "                     <div class=\"arrow\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"step step2\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"card_pic\"><\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.confirm_points\"><\/div>";
    template += "                     <div class=\"arrow\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"step step3\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"points_circle diameter50\">400<\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.points_to_gift\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"clearfix\"><\/div>";
    template += "               <\/div>";
    template += "            <\/div>";
    template += "         <\/div>";
    template += "      <\/td>";
    template += "   <\/tr>";
    template += "<\/table>";

    return {
      restrict: 'E',
      scope: true,
      replace: true,
      template: template,
      link: function (scope) {

        scope.user_obj = false;
        scope.loaded = true;

        scope.change_type = function(type){
          $rootScope.$emit('route', type);
        };

        SAILPLAY.on('language.set.success', function () {
          SAILPLAY.send('load.user.info');
        });

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.user_obj = res;
          });
        });

        SAILPLAY.on('logout', function () {
          scope.$apply(function () {
            scope.user_obj = false;
          });
        });
      }
    };

  });
  sp_app.directive('sailplayUserPizzaProfile', function ($rootScope) {
    var template = "";
    template += "<table class=\"user_info_wrapper myriad\" data-ng-show=\"user_obj\" data-ng-cloak>";
    template += "   <tr>";
    template += "      <td style=\"padding-left: 30px; padding-right: 30px; width: 2%;  border-right: 1px dotted #bdbbb5;\" rowspan=\"2\">";
    template += "         <sailplay-pizzameter style=\"width: 250px; height: 250px\"></sailplay-pizzameter>";
    template += "      <\/td>";
    template += "      <td style=\"padding-right: 15px; width: 10%; vertical-align: bottom; padding-bottom: 0px;\"> <img style=\"float: right;\" data-ng-src=\"{{ user_obj.user.pic }}\" alt=\"user_icon\" class=\"oldify user_pic\"\/> <\/td>";
    template += " 		 <td style=\"vertical-align: bottom;  padding-bottom: 10px; padding-left: 0px;\">";
    template += "         <p class=\"rockwell\" style=\"font-size: 18px;\" data-ng-bind=\"user_obj.user.name || translate.profile.no_name\"><\/p>";
    template += "         <p data-ng-show=\"user_obj.last_badge.name\" class=\"myriad user_badge\" data-ng-bind=\"user_obj.last_badge.name\"><\/p>";
    template += "         <a href=\"#\" style=\"font-size: 14px; text-decoration: underline;\" class=\"green_text\" data-ng-bind=\"translate.profile.history_link\"  data-ng-click='$event.preventDefault();change_type(\"history\")'><\/a>";
    template += " 		 </td>";
    template += " 	</tr>";
    template += " 	<tr>";
    template += " 		<td style=\"padding-right: 15px; width: 25%;vertical-align: top; padding-top: 10px;text-align: right;\">";
    template += " 			<div class=\"points_circle unconfirmed oldify\">  <span class=\"rockwell\" data-ng-bind=\"user_obj.user_points.unconfirmed | short_number\"><\/span><\/div> ";
    template += " 		</td>";
    template += "      <td style=\"border-right: 1px dotted #bdbbb5; padding-right: 30px; width: 35%; vertical-align: top; padding-top: 25px;padding-left: 0px;\">";
    template += "         <p style=\"font-size: 14px;\" data-ng-bind=\"translate.profile.unconfirmed_points\"><\/p>";
    template += "         <div style=\"position: relative;\">";
    template += "            <a class=\"green_text\" style=\"font-size: 14px; text-decoration: underline; position: relative;\" data-ng-click=\"show_points_help = !show_points_help\" data-ng-bind=\"translate.profile.what_is_it\"><\/a> ";
    template += "            <div class=\"hint help_points\" data-ng-show=\"show_points_help\">";
    template += "               <div class=\"close_btn\" data-ng-click=\"show_points_help = !show_points_help\">×<\/div>";
    template += "               <div class=\"caption\" data-ng-bind-html=\"translate.profile.what_is_unconfirmed_points | to_html\"><\/div>";
    template += "               <div class=\"steps\">";
    template += "                  <div class=\"step step1\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"unconfirmed_points_circle diameter50\">100<\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.purchases\"><\/div>";
    template += "                     <div class=\"arrow\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"step step2\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"card_pic\"><\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.confirm_points\"><\/div>";
    template += "                     <div class=\"arrow\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"step step3\">";
    template += "                     <div class=\"step_pic\">";
    template += "                        <div class=\"points_circle diameter50\">400<\/div>";
    template += "                     <\/div>";
    template += "                     <div class=\"text_help\" data-ng-bind=\"translate.profile.points_to_gift\"><\/div>";
    template += "                  <\/div>";
    template += "                  <div class=\"clearfix\"><\/div>";
    template += "               <\/div>";
    template += "            <\/div>";
    template += "         <\/div>";
    template += "      <\/td>";
    template += "   <\/tr>";
    template += "<\/table>";

    return {
      restrict: 'E',
      scope: true,
      replace: true,
      template: template,
      link: function (scope) {

        scope.user_obj = false;
        scope.loaded = true;

        scope.show_points_help = false;

        SAILPLAY.on('language.set.success', function () {
          SAILPLAY.send('load.user.info');
        });

        scope.change_type = function(type){
          $rootScope.$emit('route', type);
        };

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.user_obj = res;
          });
        });

        SAILPLAY.on('logout', function () {
          scope.$apply(function () {
            scope.user_obj = false;
          });
        });
      }
    };

  });

  sp_app.directive('sailplayUserHistory', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="user_history_wrapper myriad" data-ng-show="user && history.length > 0" data-ng-cloak>  ' +
      '<div class="user_history_inner">' +
      '<h3 class="rockwell" data-ng-bind="translate.history.title"></h3>' +
      '<table class="myriad user_history_list">' +
      '<tr data-ng-repeat="action in history">  ' +
      '<td style="width: 20%;"> ' +
      '<span class="history_item_date" data-ng-bind="action.action_date | date:\'dd.MM.yyyy\'"></span>  ' +
      '</td>  ' +
      '<td style="width: 70%; padding-right: 20px;"> ' +
      '<span data-ng-bind="action.name || (action | humanizeUserHistoryAction ) || translate.history.no_descr"></span>  ' +
      '</td>  ' +
      '<td style="text-align: right; width: 10%;"> ' +
      '<span data-ng-if="action.points_delta >= 0" class="history_item_points rockwell green_text" data-ng-bind="\'+\' + action.points_delta"></span> ' +
      '<span data-ng-if="action.points_delta < 0" class="history_item_points rockwell red_text" data-ng-bind="action.points_delta"></span>  ' +
      '</td>' +
      '</tr></table> </div> </div>',
      link: function (scope) {

        scope.history = [];

        SAILPLAY.on('language.set.success', function () {
          SAILPLAY.send('load.user.history');
        });

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.user = res.user;
          });
        });

        SAILPLAY.on('load.user.history', function () {
          scope.$apply(function () {
            scope.loaded = false;
          });
        });

        SAILPLAY.on('load.user.history.success', function (res) {
          scope.$apply(function () {
            scope.loaded = true;
            scope.history = res;
          });
        });

        SAILPLAY.on('load.user.history.error', function () {
          scope.$apply(function () {
            scope.loaded = true;
            scope.history = [];
          });
        });

        SAILPLAY.on('logout', function () {
          scope.$apply(function () {
            scope.user = false;
          });
        });

      }
    };
  });

  sp_app.directive('sailplayGifts', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="gifts_wrapper myriad" data-ng-show="gifts.length > 0" data-ng-cloak>  ' +
      '<div class="gifts_inner">' +
      '<h3 class="rockwell" data-ng-bind="translate.gifts.title"></h3>' +
      '<p class="sub_title" data-ng-bind="translate.gifts.descr"></p>' +
      '<ul class="gifts_list">  ' +
      '<li class="gift" data-ng-repeat="gift in gifts" data-ng-click="selectGift(gift)"> ' +
      '<div class="gift_tools">' +
      '<p data-ng-if="!user_obj" class="myriad" style="margin-top: 40px;">{{ translate.gifts.auth_request }}  <br/>  ' +
      '<button type="button" class="pj_btn rockwell" data-ng-click="loginRequest(gift)" data-ng-bind="translate.gifts.login"></button>' +
      '</p>' +
      '<p data-ng-if="user_obj" style="margin-top: 40px;">  ' +
      '<p class="myriad" data-ng-if="user_obj && (user_obj.user_points.confirmed - gift.points) < 0">  ' +
      '{{ translate.gifts.need_more_1 }} {{ (gift.points - user_obj.user_points.confirmed) | short_number }} {{ translate.gifts.need_more_2 }} <br/> ' +
      '<button type="button" data-ng-click="earnPoints(gift)" class="pj_btn rockwell" data-ng-bind="translate.gifts.get_points"></button>  ' +
      '</p>  ' +
      '<p class="myriad" data-ng-if="user_obj && (user_obj.user_points.confirmed - gift.points) >= 0">  ' +
      '{{ translate.gifts.enough_points }} <br/> ' +
      '<button type="button" class="pj_btn rockwell" data-ng-click="createPurchase(gift)" data-ng-bind="translate.gifts.to_basket"></button>  ' +
      '</p>' +
      '</p> ' +
      '</div> ' +
      '<div class="gift_points">' +
      '<h3 class="rockwell" data-ng-bind="gift.points | short_number"></h3>' +
      '<p class="myriad" data-ng-bind="translate.gifts.points"></p> ' +
      '</div> ' +
      '<img data-ng-src="{{ gift.thumbs.url_250x250 }}" alt="{{ gift.name }}"/> ' +
      '<p class="rockwell truncate gift_name" data-ng-bind="gift.name"></p>  ' +
      '</li>' +
      '</ul> ' +
      '</div>' +
      '</div>',
      link: function (scope) {

        SAILPLAY.send('load.gifts.list');

        SAILPLAY.on('language.set.success', function () {
          SAILPLAY.send('load.gifts.list');
        });

        scope.gifts = [];
        scope.loaded = true;

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.user_obj = res;
          });
        });

        SAILPLAY.on('load.gifts.list.success', function (gifts) {
          scope.$apply(function () {
            scope.gifts = gifts;
          });
        });

        SAILPLAY.on('logout', function () {
          scope.$apply(function () {
            scope.user_obj = false;
          });
        });

        SAILPLAY.on('gift.purchase.force_complete.success', function () {
          SAILPLAY.send('load.user.info');
          SAILPLAY.send('load.user.history');
        });

        scope.createPurchase = function (gift) {
          SAILPLAY.send('gifts.purchase', gift);
        };

        scope.earnPoints = function (gift) {
          SAILPLAY.send('gifts.earn_points', gift);
        };

        scope.loginRequest = function (gift) {
          SAILPLAY.send('gifts.login.request', gift);
        };

      }
    };
  });

  sp_app.directive('sailplayBadges', function ($filter) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="badges_wrapper" data-ng-show="badges != {}" data-ng-cloak>' +
      '<h3 class="rockwell" data-ng-bind="translate.badges.title"></h3>  ' +
      '<p class="myriad" data-ng-bind="translate.badges.descr"></p>  ' +
      '<div data-ng-repeat="badge_chain in badges.multilevel_badges">' +
      '<table class="badges_list">  ' +
      '<tr data-ng-init="divide_index = 0">' +
      '<td style="width: 20px;">  ' +
      '<img class="slider_arrow" src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/021caa0f7be7e572c26b84388ef000cb.png" alt="<" data-ng-click="divide_index = divide_index-1" data-ng-show="divide_index > 0"/>' +
      '</td>' +
      '<td data-ng-repeat="badge in badge_chain | divide:5:divide_index" class="badge">  ' +
      '<div class="badge_card" data-ng-click="selectBadge(badge, $parent.$index);">' +
      '<img class="badge_pic" data-ng-src="{{ badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs }}" alt="{{ badge.name }}"/>' +
      '<p class="myriad truncate" data-ng-bind="badge.name"></p>' +
      '<img class="badge_arrow" data-ng-src="{{getArrowUrl()}}" alt=">" data-ng-hide="$last"/>' +
      '<div class="badge_info_arrow" data-ng-show="selectedBadges[$parent.$index] == badge"></div>  ' +
      '</div>' +
      '</td>' +
      '<td style="width: 20px;">  ' +
      '<img class="slider_arrow"  src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/789b1ed470c1422c1a85783de0140152.png" alt=">" data-ng-click="divide_index = divide_index+1" data-ng-show="(divide_index + 5) < badge_chain.length"/>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '<div class="badge_info" data-ng-show="selectedBadges[$index]">  ' +
      '<div class="badge_descr myriad">' +
      '<p data-ng-bind="selectedBadges[$index].descr"></p>  ' +
      '</div>  ' +
      '<p class="clearfix" style="margin-left: 10px;">' +
      '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges[$index], \'fb\')" data-ng-src="{{ \'partners/pj/img/icons/share/fb.png\' | static }}" alt="FB"/>' +
      '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges[$index], \'vk\')" data-ng-src="{{ \'partners/pj/img/icons/share/vk.png\' | static }}" alt="VK"/>  ' +
      '</p>' +
      '</div>  ' +
      '</div>  ' +
      '<div data-ng-show="badges.one_level_badges.length > 0">' +
      '<table class="badges_list" data-ng-init="divide_index = 0;">  ' +
      '<tr>' +
      '<td style="width: 20px;">  ' +
      '<img class="slider_arrow" src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/021caa0f7be7e572c26b84388ef000cb.png" alt="<" data-ng-click="divide_index = divide_index-1" data-ng-show="divide_index > 0"/>' +
      '</td>' +
      '<td data-ng-repeat="badge in badges.one_level_badges | divide:5:divide_index" class="badge">  ' +
      '<div class="badge_card" data-ng-click="selectBadge(badge, \'one_level\');">' +
      '<img class="badge_pic" data-ng-src="{{ badge.is_received ? badge.thumbs.url_250x250 : badge.thumbs.url_gs }}" alt="{{ badge.name }}"/>' +
      '<p class="myriad truncate" data-ng-bind="badge.name"></p>' +
      '<img class="badge_arrow" data-ng-src="{{getArrowUrl()}}" alt=">" data-ng-hide="$last"/>' +
      '<div class="badge_info_arrow" data-ng-show="selectedBadges.one_level == badge"></div>  ' +
      '</div>' +
      '</td>' +
      '<td style="width: 20px;">  ' +
      '<img class="slider_arrow"  src="https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/789b1ed470c1422c1a85783de0140152.png" alt=">" data-ng-click="divide_index = divide_index+1" data-ng-show="(divide_index + 5) < badges.one_level_badges.length"/>' +
      '</td>  ' +
      '</tr>' +
      '</table>' +
      '<div class="badge_info" data-ng-show="selectedBadges.one_level">  ' +
      '<div class="badge_descr myriad">' +
      '<p data-ng-bind="selectedBadges.one_level.descr"></p>  ' +
      '</div>  ' +
      '<p class="clearfix" style="margin-left: 10px;">' +
      '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges.one_level, \'fb\')" data-ng-src="{{ \'partners/pj/img/icons/share/fb.png\' | static }}" alt="FB"/>' +
      '<img width="40px" class="share_badge_btn" data-ng-click="shareBadge(selectedBadges.one_level, \'vk\')" data-ng-src="{{ \'partners/pj/img/icons/share/vk.png\' | static }}" alt="VK"/>  ' +
      '</p>' +
      '</div>  ' +
      '</div>' +
      '</div>',
      link: function (scope, elm) {
        scope.getArrowUrl = function () {
          return "https://d3257v5wstjx8h.cloudfront.net/media/assets/assetfile/6212f474ff61b35c1d2100dceb3f6340.png"
        };
        scope.badges = {};

        SAILPLAY.send('load.badges.list');

        SAILPLAY.on('login.success', function (user) {
          SAILPLAY.send('load.badges.list');
        });

        SAILPLAY.on('language.set.success', function () {
          SAILPLAY.send('load.badges.list');
        });

        scope.loaded = true;

        SAILPLAY.on('load.badges.list.success', function (res) {
          scope.$apply(function () {
            scope.badges = res;
          });
        });

        SAILPLAY.on('load.badges.list.error', function (res) {
          scope.$apply(function () {
            scope.badges = {};
          });
        });

        scope.shareBadge = function (badge, network) {
          var shareData = {
            'url': window.location.href,
            'title': badge.name,
            'descr': badge.descr,
            'img': badge.thumbs.url_250x250
          };
          var url;
          if (network == 'vk') {
            url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + encodeURIComponent(shareData.url);
            url += '&title=' + encodeURIComponent(shareData.title);
            url += '&description=' + encodeURIComponent(shareData.descr);
            url += '&image=' + encodeURIComponent(shareData.img);
            url += '&noparse=true';
          } else if (network == 'fb') {
            url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&t=' + encodeURIComponent(shareData.title);
            url += '&u=' + encodeURIComponent(shareData.url);
          }
          window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };

        scope.selectedBadges = {
          one_level: false
        };

        scope.selectBadge = function (badge, index) {
          if (badge == scope.selectedBadges[index]) {
            scope.selectedBadges[index] = false;
          } else {
            scope.selectedBadges[index] = badge;
          }
        };

      }
    };
  });

  sp_app.directive('sailplayActions', function ($filter, $interval) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="actions_wrapper" data-ng-show="actions.length > 0" data-ng-cloak>  ' +
      '<h3 class="rockwell" style="margin:8px 0" data-ng-bind="translate.actions.title"></h3>' +
      '<p class="myriad" data-ng-bind="translate.actions.descr"></p>' +
      '<ul class="actions_list">  ' +
      '<li colspan="1" class="action" data-ng-repeat="action in actions"> ' +
      '<div class="action_card">' +
      '<img class="action_pic" data-ng-src="{{ system_actions[action.type] || action.actionPic }}" alt="{{ action.descr }}" data-ng-if="!action.socialType"/>' +
      '<div data-ng-if="action.socialType" class="social_logo {{ action.socialType }} {{ action.action }}"></div>' +
      '<div class="action_points rockwell" data-ng-if="action.points > 0" data-ng-bind="' + ' + (action.points | short_number)"></div>' +
      '<p class="myriad action_descr" data-ng-bind="translate.actions.system[action.type] || translate.actions.social[action.socialType][action.action].name || action.descr || translate.actions.no_descr"></p> ' +
      '<div class="earn_points_btn" data-ng-click="earnPoints(action)" data-sp-action="{{ action._actionId }}">' +
      '<button class="pj_btn rockwell" data-ng-bind="translate.actions.earn_points"></button>' +
      '</div>' +
      '</div>  ' +
      '</li>' +
      '</ul> ' +
      '<div class="pj_ac_text" data-ng-show="is_sharable()" >' +
      '<div class="pj_close_btn" data-ng-click="selected_action = false;">×</div>' +
      '<p class="myriad" data-ng-if="selected_action.action == \'like\'" data-ng-bind="translate.actions.ac_connected_join"></p>' +
      '<p class="myriad" data-ng-if="selected_action.action == \'partner_page\'" data-ng-bind="translate.actions.ac_connected"></p>' +
      '<button data-ng-if="selected_action.action == \'like\'" class="pj_btn rockwell"data-ng-bind="translate.actions.join" data-ng-click="earnPoints(selected_action)"></button>' +
      '<button data-ng-if="selected_action.action == \'partner_page\'" class="pj_btn rockwell"data-ng-bind="translate.actions.share" data-ng-click="earnPoints(selected_action)"></button>' +
      '</div>' +
      '</div>',
      link: function (scope) {

        scope.actions = [];

        scope.selected_action = false;

        scope.is_sharable = function () {
          return scope.selected_action && scope.selected_action.account_connected;
        };

        SAILPLAY.send('load.actions.list');

        SAILPLAY.on('login.success', function () {
          var interval = $interval(function () {
            if (scope.actions.length > 0) {
              SAILPLAY.send('load.actions.list');
              $interval.cancel(interval);
            }

          }, 100);
        });

        SAILPLAY.on('language.set.success', function () {
          SAILPLAY.send('load.actions.list');
        });

        SAILPLAY.on('load.actions.list.success', function (data) {
          scope.actions = data.actions;
          scope.$apply();
        });

        SAILPLAY.on('load.actions.list.error', function () {
          scope.actions = [];
          scope.selected_action = false;
          scope.$apply();
        });

        scope.earnPoints = function (action) {
          scope.selected_action = angular.copy(action);
          // if (action.socialType == 'vk') {
            action.force = true;
          // }
          SAILPLAY.send('actions.perform', action);
        };

        SAILPLAY.on('actions.social.connect.complete', function () {
          //if (scope.selected_action) scope.selected_action.account_connected = true;
          SAILPLAY.send('load.actions.list');
        });

        SAILPLAY.on('actions.perform.complete', function () {
          scope.selected_action = false;
          SAILPLAY.send('load.actions.list');
          SAILPLAY.send('load.user.history');
        });

        scope.system_actions = {
          emailBinding: $filter('static')('partners/pj/img/icons/actions/email_binding.png'),
          fillProfile: $filter('static')('partners/pj/img/icons/actions/fill_profile.png'),
          inviteFriend: $filter('static')('partners/pj/img/icons/actions/invite_friend.png')
        };

      }
    }
  });

  sp_app.directive('sailplayBadgePopup', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="receive_badge_popup myriad" data-sailplay-badge-popup data-ng-cloak>' +
      '<div class="window_closer" data-ng-click="closeBadgePopup()">&#215;</div>' +
      '<table>' +
      '<tr>' +
      '<td style="width: 130px;text-align: center;">' +
      '<img class="badge_pic" data-ng-src="{{ badge.pic || badge.thumbs.url_250x250 }}" alt="{{ badge.name }}"/>' +
      '<p style="text-align: center; margin: 8px 0;">{{ badge.name }}</p>' +
      '</td>' +
      '<td>' +
      '<h3 class="rockwell" data-ng-bind="translate.badges.intro"></h3>' +
      '<p style="margin-top: 10px;">{{ translate.badges.this_badge }} <br/> <strong class="red_text" style="font-weight: 600;" data-ng-bind="badge.points + \' \' + translate.badges.bonus_points"></strong></p>' +
      '<p style="margin-top: 20px;">' +
      '<span style="vertical-align: middle; margin-right: 8px;" data-ng-bind="translate.badges.share_this_news"></span>' +
      '<img style="vertical-align: middle;" width="40px" class="share_badge_btn" data-ng-click="shareBadge(badge, \'fb\')" data-ng-src="{{ \'partners/pj/img/icons/share/fb.png\' | static }}" alt="FB"/>' +
      '<img style="vertical-align: middle;" width="40px" class="share_badge_btn" data-ng-click="shareBadge(badge, \'vk\')" data-ng-src="{{ \'partners/pj/img/icons/share/vk.png\' | static }}" alt="VK"/>' +
      '</p>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</div>',
      link: function (scope, elm) {

        scope.badge = {};

        SAILPLAY.on('badge.receive.show', function (badge) {
          scope.badge = angular.copy(badge);
          elm[0].style.display = 'block';
          scope.$apply();
        });

        SAILPLAY.on('badge.receive.hide', function () {
          elm[0].style.display = 'none';
        });

        scope.closeBadgePopup = function () {
          SAILPLAY.send('badge.receive.hide');
        };

        scope.shareBadge = function (badge, network) {
          var shareData = {
            'url': window.location.href,
            'title': badge.name,
            'descr': badge.descr,
            'img': badge.pic
          };
          var url;
          if (network == 'vk') {
            url = 'http://vkontakte.ru/share.php?';
            url += 'url=' + encodeURIComponent(shareData.url);
            url += '&title=' + encodeURIComponent(shareData.title);
            url += '&description=' + encodeURIComponent(shareData.descr);
            url += '&image=' + encodeURIComponent(shareData.img);
            url += '&noparse=true';
          } else if (network == 'fb') {
            url = 'http://www.facebook.com/sharer.php?s=100';
            url += '&t=' + encodeURIComponent(shareData.title);
            url += '&u=' + encodeURIComponent(shareData.url);
          }
          window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
        };

      }
    };
  });

  sp_app.directive('sailplayPizzameter', function (translate, $filter) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div data-ng-cloak class="pizzameter_wrapper" data-ng-style="{ backgroundImage: wrapperBG() }">  ' +
      '<div class="pizza_pieces" data-ng-style="{ backgroundImage: pizzaBG() }"></div>' +
      '<div class="pizzameter_counter" data-ng-style="{ backgroundImage: counterBG() }">  ' +
      '<div class="counter_inner"> ' +
      '<img data-ng-repeat="digit in visible_points track by $index" data-ng-src="{{ getPointsDigitUrl(digit) }}" alt="{{ digit }}"/>  ' +
      '</div>' +
      '</div> ' +
      '</div>',
      link: function (scope) {

        scope.target_points = 0;
        scope.user_points = 0;
        scope.visible_points = '0000'.split('');

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.user_points = res.user_points.confirmed;
            var points_arr = res.user_points.confirmed.toString().split('');
            while (points_arr.length < 4) {
              points_arr.unshift('0');
            }
            scope.visible_points = points_arr;
          });
        });

        SAILPLAY.on('pj.pizzameter', function (target_points) {
          scope.$apply(function () {
            scope.target_points = target_points;
          });
        });

        SAILPLAY.on('purchase.widget.show', function (obj) {
          scope.$apply(function () {
            scope.user_points = obj.user_points || scope.user_points;
            var points_arr = scope.user_points.toString().split('');
            while (points_arr.length < 4) {
              points_arr.unshift('0');
            }
            scope.visible_points = points_arr;

          });
        });

        scope.wrapperBG = function () {
          return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/deck_' + translate.lang + '.png)';
        };

        scope.counterBG = function () {
          return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/counter_' + translate.lang + '.png)';
        };

        scope.pizzaBG = function () {
          var piece_num = 8;
          var delta = scope.user_points / scope.target_points;
          if (delta < 1) {
            delta = Math.round(delta * 10);
            piece_num = delta > 8 ? piece_num : delta;
          }
          return 'url(' + $filter('static')('') + 'partners/pj/img/pizzameter/' + (piece_num || 1) + '_piece.png)';
        };

        scope.getPointsDigitUrl = function (digit) {
          return $filter('static')('') + 'partners/pj/img/pizzameter/digits/' + digit + '.png';
        };

      }
    };
  });

  sp_app.directive('sailplayPurchaseWidget', function (translate) {
    var template = "";
    template += "<div style=\"padding: 20px;\" ng-click=\"goToPapaBonus()\" ng-if=\"redirect_url\">";
    template += "              <table width=\"240px\">";
    template += "                <tr>";
    template += "                  <td colspan=\"1\" style='vertical-align: middle; text-align: center;'>";
    template += "                    <p class='rockwell' style=\"text-align: center; font-size: 18px; font-weight: bold; padding: 10px; white-space: nowrap; overflow: hidden;\" data-ng-bind-html=\"translate.purchase.papa_bonus | to_html\"><\/p>";
    template += "                  <\/td>";
    template += "                <\/tr>";
    template += "                <tr>";
    template += "                  <td colspan=\"1\" style=\"text-align:center;vertical-align: middle;\">";
    template += "                    <sailplay-pizzameter style=\"width:180px; height: 180px; margin:12px 0 26px 0;\"><\/sailplay-pizzameter>";
    template += "                  <\/td>";
    template += "                <\/tr>";
    template += "              <\/table>";
    template += "              <table width=\"240px\">";
    template += "                <tr>";
    template += "                  <td style='vertical-align: middle;'>";
    template += "                    <p style=\"text-align:justify\" ng-bind=\"translate.purchase.promo_text\"><\/p>";
    template += "                  <\/td>";
    template += "                <\/tr>";
    template += "              <\/table>";
    template += "              <table width=\"240px\" style=\"margin: 20px 0px\">";
    template += "                <tr>";
    template += "                  <td width=\"33%\" style='vertical-align: middle;'>";
    template += "                    <div class=\"points_circle confirmed oldify\" style=\"float:left\">";
    template += "                      <span class=\"rockwell\" data-ng-bind=\"purchase_points\"><\/span>";
    template += "                    <\/div>";
    template += "                  <\/td>";
    template += "                  <td style='vertical-align: middle;' >";
    template += "                    <p style=\"font-weight: bold;\" data-ng-bind=\"translate.purchase.purchase_points\"><\/p>";
    template += "                  <\/td>";
    template += "";
    template += "                <\/tr>";
    template += "              <\/table>";
    template += "              <table width=\"240px\" style=\"margin: 10px 0px;  border-top: 1px solid black; border-bottom: 1px solid black\">";
    template += "                <tr>";
    template += "                  <td width = \"10%\"  style=\"padding-right:5px; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
    template += "                    <img src=\"https:\/\/d3257v5wstjx8h.cloudfront.net\/media\/assets\/assetfile\/547050456db67d33008ffeb4002ff7ea.png\" width=\"27\" height=\"27\">";
    template += "                  <\/td>";
    template += "                  <td width = \"10%\" style=\"padding-right:5px; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
    template += "                    <img src=\"https:\/\/d3257v5wstjx8h.cloudfront.net\/media\/assets\/assetfile\/97dd4019dcffa12481ead1af7f836a16.png\" width=\"27\" height=\"27\">";
    template += "                  <\/td>";
    template += "                  <td width = \"10%\" style=\"padding-right:5px; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
    template += "                    <img src=\"https:\/\/d3257v5wstjx8h.cloudfront.net\/media\/assets\/assetfile\/6736393657591fb0d856c6fa4ca9d414.png\" width=\"27\" height=\"27\">";
    template += "                  <\/td>";
    template += "                  <td width = \"70%\" style=\"text-align: center; padding-top:10px; padding-bottom: 10px; vertical-align: middle;\">";
    template += "                    <p style=\"text-align: center\" >+{{bonus_per_invite || 0}} {{translate.purchase.bonus_for_sharing}}<\/p>";
    template += "                  <\/td>";
    template += "                <\/tr>";
    template += "              <\/table>";
    template += "              <table width=\"240px\">";
    template += "                <tr>";
    template += "                  <td style=\"text-align: center\">";
    template += "                    <a href=\"javascript:void(0)\" class=\"pj_btn rockwell ng-binding\" data-ng-click=\"loginRequest(gift)\" data-ng-bind=\"translate.purchase.link_text\" style=\"color: white; border:0; display: block; margin-top: 12px;\"><\/a>";
    template += "                  <\/td>";
    template += "                <\/tr>";
    template += "              <\/table>";
    template += "            <\/div>";
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: template,
      link: function (scope) {

        scope.goToPapaBonus = function () {
          location.href = scope.redirect_url || '/papaBonus';
        };

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.user_points = res.user_points.confirmed;
          });
        });

        SAILPLAY.on('purchase.widget.show', function (obj) {
          scope.$apply(function () {
            scope.purchase_points = obj.purchase_points || scope.purchase_points;
            scope.user_points = obj.user_points || scope.user_points;
            scope.bonus_per_invite = obj.bonus_per_invite || scope.bonus_per_invite;
            scope.redirect_url = obj.redirect_url || scope.redirect_url;
          });
        })
      }
    };
  });

  sp_app.directive('sailplayWidgets', function ($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      template: '<div class="sailplay-widget-wrapper">\n\n    <style>\n        \n        .user_badge:before {\n            display: none;\n        }\n        \n        .n-steps__item .n-steps__corner {\n            fill: url("#gradfirst");\n        }\n\n        .n-steps__corner-line {\n            fill: url("#line");\n        }\n\n        .n-steps__item_state_active + .n-steps__item > .n-steps__corner {\n            fill: url("#gradfirst");\n        }\n\n        .n-steps__item_state_active .n-steps__corner {\n            fill: url("#gradsecond");\n        }\n\n        /* todo вынести в style.css */\n        .n-probonus--logged-in {\n            height: 118px;\n            padding-left: 188px;\n        }\n\n        .n-probonus--logged-in .n-pizzameter {\n            top: 10px;\n            width: 100px;\n        }\n\n        .n-probonus--logged-in .pizzameter_wrapper {\n            width: 100px;\n            height: 100px;\n            left: 24px;\n            top: -21px;\n        }\n\n        .n-probonus--logged-in .n-probonus__head {\n            padding-top: 30px;\n        }\n\n        .user_info_wrapper {\n            background-color: white !important; /* todo убрать, когда sailplay у себя поправит */\n            margin-bottom: -5px;\n        }\n\n        .n-probonus .pizzameter_wrapper {\n            position: absolute;\n            left: 10px;\n            width: 200px;\n            height: 200px;\n            top: 47px;\n        }\n\n        .pizzameter_wrapper {\n            left: 10px;\n            margin: 10px 20px 10px 10px;\n            top: 0;\n        }\n\n        .n-steps__hint {\n            text-align: center;\n        }\n\n        .actions_wrapper .rockwell {\n            margin-bottom: 10px;\n        }\n\n        .n-probinus-authed {\n            height: 277px;\n            position: relative;\n            background-color: #fff;\n        }\n\n        .n-probinus-authed .n-papabonus__attention {\n            border: 1px dotted #bdbbb5;\n            background: #FAE6DD;\n            position: absolute;\n            z-index: 999;\n            right: 0px;\n            width: 562px;\n            top: 199px;\n            height: 66px;\n            padding-top: 10px;\n            padding-left: 20px;\n            padding-right: 20px;\n        }\n\n        .n-probinus-authed table tbody tr:first-child {\n            height: 100px;\n        }\n\n        .n-probinus-authed .n-left__attention {\n            float: left;\n            height: 36px;\n        }\n\n        .n-probinus-authed .n-right__attention {\n            float: right;\n        }\n    </style>\n\n    <div class="n-probonus" data-ng-show="!auth">\n\n        <sailplay-pizzameter></sailplay-pizzameter>\n\n        <div class="n-probonus__head">\n            Участвуйте в бонусной программе\n            <nobr class="n-probonus__name">«ПапаБонус»!</nobr>\n        </div>\n\n        <div class="n-probonus__about">\n            <i class="n-probonus__img"></i>\n            <p>У нас есть потрясающая бонусная программа для вас, благодаря которой вы можете получать баллы за покупки\n                товаров на нашем сайте. За эти баллы вы сможете получать подарки из нашего ассортимента!</p>\n        </div>\n\n    </div>\n\n    <div data-ng-show="auth">\n        <sailplay-user-pizza-profile></sailplay-user-pizza-profile>\n    </div>\n    \n    <div class="n-steps">\n        <ul class="n-steps__list">\n            <li class="n-steps__item"\n                data-ng-class="{ \'n-steps__item_state_active\' : type == \'menu\' }">\n                <a href="#" class="n-steps__inner n-steps__inner-pizza"\n                   data-ng-click="$event.preventDefault();type = \'menu\';">\n                    <p class="n-steps__name">Заказать пиццу</p>\n                    <p class="n-steps__hint">5 баллов за каждые 100 рублей</p>\n                </a>\n            </li>\n            <li class="n-steps__item "\n                data-ng-class="{ \'n-steps__item_state_active\' : type == \'earn\' }">\n                <a href="#" class="n-steps__inner n-steps__inner-earnPoints"\n                   data-ng-click="$event.preventDefault();type = \'earn\';">\n                    <p class="n-steps__name">Заработать дополнительные баллы</p>\n                </a>\n                <svg width="40" height="98" class="n-steps__corner" xmlns="http://www.w3.org/2000/svg" version="1.1"\n                     viewBox="0 0 40 98">\n                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#n-steps__corner"></use>\n                </svg>\n                <svg width="40" height="98" class="n-steps__corner-line" xmlns="http://www.w3.org/2000/svg"\n                     version="1.1" viewBox="0 0 40 98">\n                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#n-steps__corner-line"></use>\n                </svg>\n            </li>\n            <li class="n-steps__item "\n                data-ng-class="{ \'n-steps__item_state_active\' : type == \'gifts\' }">\n                <a href="#" class="n-steps__inner n-steps__inner-gifts"\n                   data-ng-click="$event.preventDefault();type = \'gifts\';">\n                    <p class="n-steps__name">Получить подарки</p>\n                </a>\n                <svg width="40" height="98" class="n-steps__corner" xmlns="http://www.w3.org/2000/svg" version="1.1"\n                     viewBox="0 0 40 98">\n                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#n-steps__corner"></use>\n                </svg>\n                <svg width="40" height="98" class="n-steps__corner-line" xmlns="http://www.w3.org/2000/svg"\n                     version="1.1" viewBox="0 0 40 98">\n                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#n-steps__corner-line"></use>\n                </svg>\n            </li>\n        </ul>\n        <svg width="40" height="98" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 98">\n            <symbol id="n-steps__corner">\n                <polygon class="n-steps__corner" points="1,-1 40,0 40,98 1,99 40,49"></polygon>\n            </symbol>\n            <symbol id="n-steps__corner-line">\n                <polygon class="n-steps__corner-line" points="2,0 40,49 2,98 -0.5,98 37.5,49 -0.5,0"></polygon>\n            </symbol>\n            <linearGradient id="gradsecond" x1="0%" y1="0%" x2="0%" y2="100%">\n                <stop stop-color="#830707" offset="0%"></stop>\n                <stop stop-color="#8c0809" offset="19%"></stop>\n                <stop stop-color="#a20c0d" offset="50%"></stop>\n                <stop stop-color="#b60f18" offset="50%"></stop>\n                <stop stop-color="#af0e18" offset="62%"></stop>\n                <stop stop-color="#920b11" offset="86%"></stop>\n                <stop stop-color="#860a0d" offset="100%"></stop>\n            </linearGradient>\n            <linearGradient id="gradfirst" x1="0%" y1="0%" x2="0%" y2="100%">\n                <stop stop-color="#cb120c" offset="0%"></stop>\n                <stop stop-color="#d81f17" offset="50%"></stop>\n                <stop stop-color="#e0282a" offset="50%"></stop>\n                <stop stop-color="#df2629" offset="60%"></stop>\n                <stop stop-color="#cf1d1b" offset="90%"></stop>\n                <stop stop-color="#cd1a16" offset="100%"></stop>\n            </linearGradient>\n\n            <linearGradient id="line" x1="0%" y1="0%" x2="0%" y2="100%">\n                <stop stop-color="#991208" offset="0%"></stop>\n                <stop stop-color="#b21f0f" offset="50%"></stop>\n                <stop stop-color="#c4281c" offset="50%"></stop>\n                <stop stop-color="#be261b" offset="62%"></stop>\n                <stop stop-color="#a41d12" offset="88%"></stop>\n                <stop stop-color="#9c1a0f" offset="100%"></stop>\n            </linearGradient>\n        </svg>\n    </div>\n\n    <div data-ng-show="type == \'menu\'">\n\n        <ol class="n-actlist">\n            <li class="n-actlist__item n-actlist__item_step_order">\n                <div class="n-actlist__head">Заказать пиццу</div>\n                <div class="n-actlist__text">За каждые 100 рублей, потраченные на&nbsp;пиццу, вы&nbsp;получите 5&nbsp;бонусных\n                    баллов.\n                </div>\n                <a href="/menyu/pizza">\n                    <div class="n-actlist__btn b-btn b-btn_color_green">Заказать пиццу</div>\n                </a>\n            </li>\n            <li class="n-actlist__item n-actlist__item_step_points">\n                <div class="n-actlist__head">Зарабатывайте баллы и&nbsp;награды</div>\n                <div class="n-actlist__text">Рассказывайте о&nbsp;подарках в&nbsp;социальных сетях. Вступайте в&nbsp;группы\n                    ПапаДжон`с в&nbsp;ВКонтакте и&nbsp;Facebook Приглашайте друзей\n                </div>\n                <a href="#" data-ng-click="$event.preventDefault();type = \'earn\';">\n                    <div class="n-actlist__btn b-btn b-btn_color_green">Заработать баллы</div>\n                </a>\n            </li>\n            <li class="n-actlist__item n-actlist__item_step_presents">\n                <div class="n-actlist__head">Получить подарки</div>\n                <div class="n-actlist__text">Накопленные баллы вы&nbsp;cможете потратить на&nbsp;подарки при\n                    следующем\n                    заказе\n                </div>\n                <a href="#" data-ng-click="$event.preventDefault();type = \'gifts\';">\n                    <div class="n-actlist__btn b-btn b-btn_color_green">Выбрать подарок</div>\n                </a>\n            </li>\n        </ol>\n\n    </div>\n\n    <div data-ng-show="type == \'earn\'">\n\n        <sailplay-actions></sailplay-actions>\n\n        <sailplay-badges></sailplay-badges>\n\n    </div>\n\n\n    <div data-ng-show="type == \'gifts\'">\n\n        <sailplay-gifts></sailplay-gifts>\n\n    </div>\n\n    <div data-ng-show="type == \'history\'">\n\n        <sailplay-user-history></sailplay-user-history>\n\n    </div>\n\n</div>',
      link: function (scope, elm) {

        scope.type = 'menu';

        scope.auth = false;

        $rootScope.$on('route', function(obj, args){
          scope.type = args;
        });

        SAILPLAY.on('load.user.info.success', function (res) {
          scope.$apply(function () {
            scope.auth = true;
          });
        });


      }
    };
  });

  SP.on('pj.bootstrap', function (elm) {
    angular.bootstrap(elm, ['sailplay.pj']);
  });

}(SAILPLAY));