var SAILPLAY = (function(w, d){

  var sp = {};

  if(getMobileOperatingSystem()=='unknown') {
    var input_date = '<div class="__sp__lead_autocomplete __sp__dates __centered" style="width: 24%;" data-ng-init="show_day_selector = false;" data-ng-class="{ state_show_list: show_day_selector }">' +
        '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_day_selector = false;"></div>' +
        '<div data-ng-click="show_day_selector = !show_day_selector">' +
        '<span class="__sp__field_value">{{ birth_date_obj[2] || \'День\' }}</span>' +
        '</div>' +
        '<div class="suggestion_wrapper">' +
        '<ul>' +
        '<li data-ng-repeat="day in dates.days()" data-ng-click="birth_date_obj[2] = day; set_birth_date(); $parent.show_day_selector = false;">{{ day }}</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="__sp__lead_autocomplete __sp__dates __centered" style="width: 40%;" data-ng-init="show_month_selector = false;" data-ng-class="{ state_show_list: show_month_selector }">' +
        '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_month_selector = false;"></div>' +
        '<div data-ng-click="show_month_selector = !show_month_selector">' +
        '<span class="__sp__field_value">{{ dates.months()[birth_date_obj[1]] || \'Месяц\' }}</span>' +
        '</div>' +
        '<div class="suggestion_wrapper">' +
        '<ul>' +
        '<li data-ng-repeat="(num,month) in dates.months()" data-ng-click="birth_date_obj[1] = num; set_birth_date(); $parent.show_month_selector = false;">{{ month }}</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="__sp__lead_autocomplete __sp__dates __centered" style="width: 32%;" data-ng-init="show_year_selector = false;" data-ng-class="{ state_show_list: show_year_selector }">' +
        '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_year_selector = false;"></div>' +
        '<div data-ng-click="show_year_selector = !show_year_selector">' +
        '<span class="__sp__field_value">{{ birth_date_obj[0] || \'Год\' }}</span>' +
        '</div>' +
        '<div class="suggestion_wrapper">' +
        '<ul>' +
        '<li data-ng-repeat="year in dates.years()" data-ng-click="birth_date_obj[0] = year; set_birth_date(); $parent.show_year_selector = false;">{{ year }}</li>' +
        '</ul>' +
        '</div>' +
        '</div>';
    var mob_class = '';
  } else {
    var input_date = '<input type="date" max="2000-01-01" data-ng-model="form.birthDate">';
    var mob_class = 'for_mobile';
  }
  angular.module('mno.lead', [ 'mno.data', 'ui.mask' ])

    .constant('config', {
      partner_id: 1438,
      domain: 'http://sailplay.ru',
      additional_tags: d.getElementById('__sp__roche') && d.getElementById('__sp__roche').getAttribute('data-tags') && d.getElementById('__sp__roche').getAttribute('data-tags').split(',')
    })

    .directive('visavisMno', function(data, sailplay, dates, config){
      return {
        restrict: 'E',
        replace: true,
        template:
          '<div class="__sp__lead_wrapper" data-ng-cloak data-ng-show="is_show_lead" data-ng-click="hide_lead($event)">' +
            '<link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">' +
            '<form class="__sp__lead_form" data-ng-show="!form_submitted" data-ng-submit="submit_lead()">' +
              '<div class="__sp__lead_cancel ion-close-round" data-ng-click="hide_lead()"></div>' +
              '<div class="__sp__lead_inner">' +
                '<div class="__sp__lead_title">Бесплатная регистрация в социальной Акции "День МНО"</div>' +
                '<div class="__sp_lead_field">' +
                  '<div class="__sp__lead_error" data-ng-show="!is_valid()">Пожалуйста, заполните все поля анкеты</div>' +
                  '<input type="text" data-ng-model="form.lastName" placeholder="Фамилия"/>' +
                '</div>' +
                '<div class="__sp_lead_field">' +
                  '<input type="text" data-ng-model="form.firstName" placeholder="Имя" />' +
                '</div>' +
                '<div class="__sp_lead_field">' +
                  '<input type="text" data-ng-model="form.middleName" placeholder="Отчество" />' +
                '</div>' +
                '<div class="__sp_lead_field">' +
                  '<input type="text" data-ng-model="form.phone" placeholder="+_ (___) ___-____" data-ui-mask="+9 (999) 999-9999"/>' +
                '</div>' +
                '<div class="__sp_lead_field">' +
                  '<span class="__sp_lead_policy_help" style="margin: 2px 0 4px 2px;">День рождения</span></br>' + input_date +
          /* '<input type="date" max="2000-01-01" min="1930-01-01">' +

                  '<div class="__sp__lead_autocomplete __sp__dates __centered" style="width: 24%;" data-ng-init="show_day_selector = false;" data-ng-class="{ state_show_list: show_day_selector }">' +
                    '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_day_selector = false;"></div>' +
                    '<div data-ng-click="show_day_selector = !show_day_selector">' +
                      '<span class="__sp__field_value">{{ birth_date_obj[2] || \'День\' }}</span>' +
                    '</div>' +
                    '<div class="suggestion_wrapper">' +
                      '<ul>' +
                        '<li data-ng-repeat="day in dates.days()" data-ng-click="birth_date_obj[2] = day; set_birth_date(); $parent.show_day_selector = false;">{{ day }}</li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +
                  '<div class="__sp__lead_autocomplete __sp__dates __centered" style="width: 40%;" data-ng-init="show_month_selector = false;" data-ng-class="{ state_show_list: show_month_selector }">' +
                    '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_month_selector = false;"></div>' +
                    '<div data-ng-click="show_month_selector = !show_month_selector">' +
                      '<span class="__sp__field_value">{{ dates.months()[birth_date_obj[1]] || \'Месяц\' }}</span>' +
                    '</div>' +
                    '<div class="suggestion_wrapper">' +
                      '<ul>' +
                        '<li data-ng-repeat="(num,month) in dates.months()" data-ng-click="birth_date_obj[1] = num; set_birth_date(); $parent.show_month_selector = false;">{{ month }}</li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +
                  '<div class="__sp__lead_autocomplete __sp__dates __centered" style="width: 32%;" data-ng-init="show_year_selector = false;" data-ng-class="{ state_show_list: show_year_selector }">' +
                    '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_year_selector = false;"></div>' +
                    '<div data-ng-click="show_year_selector = !show_year_selector">' +
                      '<span class="__sp__field_value">{{ birth_date_obj[0] || \'Год\' }}</span>' +
                    '</div>' +
                    '<div class="suggestion_wrapper">' +
                      '<ul>' +
                        '<li data-ng-repeat="year in dates.years()" data-ng-click="birth_date_obj[0] = year; set_birth_date(); $parent.show_year_selector = false;">{{ year }}</li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +*/
                '</div>' +


                '<div class="__sp_lead_field">' +
                  '<div class="__sp__lead_autocomplete __sp__dates '+mob_class+'" data-ng-init="show_city_selector = false;" data-ng-class="{ state_show_list: show_city_selector }">' +
                    '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_city_selector = false;"></div>' +
                    '<div data-ng-click="show_city_selector = !show_city_selector">' +
                      '<span class="__sp__field_value __sp__text_left">{{ tags[0] || \'Город\' }}</span>' +
                    '</div>' +
                    '<div class="suggestion_wrapper">' +
                      '<ul>' +
                        '<li data-ng-repeat="city in data.cities" data-ng-click="tags[0] = city.name; tags[1] = \'\'; $parent.show_city_selector = false;">{{ city.name }}</li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="__sp_lead_field">' +
                  '<div class="__sp__lead_autocomplete __sp__dates '+mob_class+'" data-ng-init="show_clinic_selector = false;" data-ng-class="{ state_show_list: show_clinic_selector }">' +
                    '<div class="__sp__lead_dropdown_overlay" data-ng-click="show_clinic_selector = false;"></div>' +
                    '<div data-ng-click="show_clinic_selector = !show_clinic_selector">' +
                      '<span class="__sp__field_value __sp__text_left">{{ tags[1] || \'Лечебно профилактическое учреждение\' }}</span>' +
                    '</div>' +
                    '<div class="suggestion_wrapper">' +
                      '<ul>' +
                        '<li data-ng-repeat="clinic in get_clinics(tags[0])" data-ng-click="tags[1] = clinic; $parent.show_clinic_selector = false;">{{ clinic }}</li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="__sp_lead_field">' +
                  '<span class="__sp_lead_policy_help">' +
                    '<span class="__sp_lead_policy_check" data-ng-class="{ checked: policy_accept }" data-ng-click="policy_accept = !policy_accept">' +
                      '<i class="ion-checkmark-round" data-ng-show="policy_accept"></i>' +
                    '</span>' +
                    'Регистрируясь на сайте <a href="http://www.mnoportal.ru">www.mnoportal.ru</a>, я даю согласие входящим в группу компаний "Рош" лицам, в том числе компании «Roche Diagnostics GmbH» и ООО "Рош Диагностика Рус", на обработку указанных данных (сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу (включая трансграничную передачу), обезличивание, блокирование, удаление, уничтожение. Настоящее согласие выдается в целях регистрации в акции "День МНО" и информирования меня, как потребителя, о новых продуктах и услугах, предлагаемых ООО «Рош Диагностика Рус» на 5 (пять) лет и может быть отозвано по моему письменному заявлению, отправленному в адрес ООО «Рош Диагностика Рус». По истечении указанного срока действие согласия считается продлённым на каждые следующие пять лет при отсутствии моего письменного отзыва, отправленного в адрес ООО «Рош Диагностика Рус»' +
                  '</span>' +
                '</div>' +
              '</div>' +
              '<div class="__sp_lead_policy_agreement" data-ng-show="show_policy_rules">' +
                '<div class="__sp__lead_cancel ion-close-round" data-ng-click="show_policy_rules = false;"></div>' +
                '<div class="__sp_lead_warning" data-ng-show="policy_accept_notify">ВНИМАНИЕ, ПЕРЕД РЕГИСТРАЦИЕЙ ОЗНАКОМЬТЕСЬ С ИНФОРМАЦИЕЙ</div>' +
                'МНО (международное нормализованное отношение) - показатель свертываемости крови, который необходимо регулярно, как минимум раз в месяц, измерять пациентам, принимающим непрямые антикоагулянты (например: варфарин, маркумар, синкумар, фенилин и др.) </br></br> <strong>О необходимости измерения показателя МНО проконсультируйтесь со своим лечащим врачом или по телефону бесплатной горячей линии </br> 8-800-100-19-68.</strong>' +
              '</div>' +
              '<button data-ng-if="policy_accept_notify" class="__sp_lead_submit_btn" data-ng-disabled="!policy_accept" type="submit">' +
                '<span>ЗАВЕРШИТЬ РЕГИСТРАЦИЮ <i class="ion-chevron-right"></i></span>' +
              '</button>' +
              '<button data-ng-if="!policy_accept_notify" class="__sp_lead_submit_btn" data-ng-disabled="!policy_accept || !is_valid()" type="submit">ПРОДОЛЖИТЬ <i class="ion-chevron-right"></i></button>' +
            '</form>' +
            '<div class="__sp__lead_form __submitted" data-ng-show="form_submitted">' +
              '<div class="__sp__lead_cancel ion-close-round" data-ng-click="hide_lead();"></div>' +
              '<div class="__sp__lead_inner">' +
                'Спасибо, что зарегистрировались, за несколько дней до мероприятия Вам придет СМС-напоминание.' +
              '</div>' +
            '</div>' +
          '</div>',
        scope: true,
        link: function(scope, elm){

          scope.is_show_lead = false;

          scope.policy_accept = true;

          scope.show_policy_rules = false;

          scope.policy_accept_notify = false;

          scope.birth_date_obj = [];

          scope.form_submitted = false;

          scope.set_birth_date = function(){
            if(scope.birth_date_obj.length == 3){
              scope.form.birthDate = scope.birth_date_obj.join('-');
            }
            else {
              scope.form.birthDate = '';
            }
          };

          var blank_form = {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            birthDate: ''
          };

          scope.form = angular.copy(blank_form);

          scope.tags = ['', ''];

          scope.data = angular.copy(data);

          scope.show_lead = function(){
            scope.is_show_lead = true;
          };

          scope.hide_lead = function($event){
            if($event && $event.target == elm[0]) {
              scope.is_show_lead = false;
              scope.form_submitted = false;
            }
            else if(!$event) {
              scope.is_show_lead = false;
              scope.form_submitted = false;
            }
          };

          sp.show_mno_lead = function(){
            scope.$apply(function(){
              scope.show_lead();
            });
          };

          scope.submit_lead = function(){
            if(!scope.policy_accept_notify) {
              scope.policy_accept_notify = true;
              scope.show_policy_rules = true;
            }
            else {
              var tags = angular.copy(scope.tags).concat(config.additional_tags);
              sailplay.submit_lead(scope.form, function(res){
                if(res.status == 'ok'){
                  sailplay.add_tags({phone: scope.form.phone }, tags, function(res){
                    scope.policy_accept_notify = false;
                    scope.show_policy_rules = false;
                    scope.form = angular.copy(blank_form);
                    scope.tags = ['', ''];
                    scope.birth_date_obj = [];
                    scope.form_submitted = true;
                  });
                }
              });
            }
          };

          scope.dates = dates.dates;

          scope.get_clinics = function(city_name){
            var current_city = false;
            for(var c in scope.data.cities) {
              if(scope.data.cities[c].name == city_name) current_city = scope.data.cities[c];
            }
            return current_city.clinics;
          };

          scope.is_valid = function(){
            var valid = true;

            for(var i in scope.form){
              if(scope.form[i] == blank_form[i]){
                valid = false;
                scope.errors[i] = true;
              }
            }

            for(var t in scope.tags){
              if(!scope.tags[t] || scope.tags[t] == ''){
                valid = false;
              }
            }

            return valid;

          };

          scope.errors = {};

        }
      };
    })

    .service('sailplay', function($http, config){

      var self = this;

      self.submit_lead = function(form, callback){
        $http.jsonp((config.domain || 'http://sailplay.ru') + '/js-api/' + config.partner_id + '/users/update/?callback=JSON_CALLBACK', { params: form })
          .success(function(res){
            callback && callback(res);
          });
      };

      self.add_tags = function(user, tags, callback){
        var params = angular.copy(user);
        params.tags = tags.join(',');
        $http.jsonp((config.domain || 'http://sailplay.ru') + '/js-api/' + config.partner_id + '/tags/add/?callback=JSON_CALLBACK', { params: params })
          .success(function(res){
            callback && callback(res);
          });
      };

    })

    .service('dates', function(){

      var self = this;

      function get_range_array(min, max){
        var list = [];
        for (var i = min; i <= max; i++) {
          list.push(i);
        }
        return list;
      }

      self.dates = {

        days: function(){
          return get_range_array(1,31);
        },
        months: function(){
          return {
            1: 'Января',
            2: 'Февраля',
            3: 'Марта',
            4: 'Апреля',
            5: 'Мая',
            6: 'Июня',
            7: 'Июля',
            8: 'Августа',
            9: 'Сентября',
            10: 'Октября',
            11: 'Ноября',
            12: 'Декабря'
          };
        },
        years: function(){
          var current_year = new Date().getFullYear();
          return get_range_array(current_year - 100, current_year).reverse();
        }

      };

    });

  w.addEventListener('load', function(){
    var body = d.getElementsByTagName('body')[0];
    if(body){
      var root = d.createElement('visavis-mno');
      body.appendChild(root);
      angular.bootstrap(root, ['mno.lead']);
    }
  });

  return sp;

}(window, document));

/*
$('.new_select_city').change(function(){
  var city = $(this).val();
  $('.new_select_clin option').filter(function(){
    if($(this).attr('data-city')==city){
      $(this).show();
    } else {
      $(this).hide();
    }
  })
});

*/
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}