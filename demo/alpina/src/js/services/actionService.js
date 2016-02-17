(function (angular, sp) {

    angular.module('alpina.services.actions', [])

        .service('actionService', function () {

            var self = this;

            var CSS_LINK = 'http://dev4you.info/test/alpina/btns_styles.css';

            var TAGS = {
                fillProfile: 'Заполнил профиль',
                subscribe: 'Подписался на рассылку',
                hasChildren: 'У меня есть дети',
                children: 'У меня есть ребенок'
            };

            var HOBBIES = [
                'музыка',
                'рисование',
                'психология',
                'литература',
                'путешествия',
                'автомобили',
                'философия',
                'мода',
                'спорт',
                'политика',
                'танцы',
                'кулинария',
                'фотография',
                'астрология',
                'наука',
                'программирование'
            ];

            var PROFESSIONS = [
                'психология и психоанализ',
                'экономика',
                'бухгалтерия',
                'HR',
                'финансовый менеджмент',
                'банковское дело',
                'право',
                'юриспруденция',
                'менеджмент',
                'маркетинг',
                'продажи',
                'политика',
                'стартап',
                'лингвистика',
                'образование',
                'искусство и творчество',
                'фитнес',
                'медицина',
                'теология',
                'наука',
                'IT и программирование'
            ];

            self.getProfessionsTag = function(tag){
              return 'Моя профессия ' + tag;
            };

            self.getHobbiesTag = function(hobby){
              return 'Мое хобби ' + hobby;
            };

            self.getProfessions = function(){
              return PROFESSIONS;
            };

            self.getHobbies = function(){
              return HOBBIES;
            };

            self.getTag = function (tag) {
                if (!tag) return;
                return TAGS[tag] ? TAGS[tag] : null;
            };

            self.loadList = function () {
                self.actions = [];
                return new Promise(function (resolve, reject) {
                    sp.on('load.actions.list.success', function (data) {
                        self.actions = data.actions.filter(function (item) {
                            return item.socialType;
                        });
                        self.sending = false;
                        resolve(angular.extend([], self.actions));
                    });
                    if (!self.sending) {
                        sp.send('load.actions.list');
                    }
                    self.sending = true;

                });
            };

            self.getTitle = function (action) {
                if (!action) return 'Нет описания';
                var obj = {
                    like: 'Вступить в группу ',
                    partner_page: 'Рассказать о нас друзьям в '
                };
                var socObj = {
                    fb: 'Fb',
                    tw: 'Tw',
                    gp: 'Google+',
                    ok: 'Ok',
                    vk: 'Vk'
                };
                var result = (obj[action.action] ? obj[action.action] : '') + (socObj[action.socialType] ? socObj[action.socialType] : '');
                return result || 'Нет описания';
            };

            self.getIcon = function (action) {
                if (!action) return '';
                var obj = {
                    partner_page: {
                        vk: 'this-icon1',
                        fb: 'this-icon2',
                        tw: 'this-icon3',
                        ok: 'this-icon4'
                    },
                    like: {
                        vk: 'this-icon1',
                        fb: 'this-icon2',
                        tw: 'this-icon3',
                        ok: 'this-icon4'
                    },
                    other: 'this-icon6',
                    fill: 'this-icon5'

                };
                if (action.socialType && obj[action.action] && obj[action.action][action.socialType]) {
                    return obj[action.action][action.socialType];
                } else {
                    return obj['other'];
                }
            };

            self.getList = function () {
                if (self.actions) {
                    return new Promise(function (resolve, reject) {
                        resolve(angular.extend([], self.actions));
                    });
                } else {
                    return self.loadList();
                }
            };

            self.getActionsCssLink = function () {
                return CSS_LINK;
            };

        });

}(window.angular, window.SAILPLAY));