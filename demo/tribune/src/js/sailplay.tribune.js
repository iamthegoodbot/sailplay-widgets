(function(){

  window.addEventListener('DOMContentLoaded', function(){

    angular.bootstrap(document.getElementById('tribune'), [ 'tribune' ]);

  });


  angular.module('tribune', [])

    .service('sp', function($window){

      return $window.SAILPLAY;

    })

    .run(function(sp){

      sp.send('init', { partner_id: 286, domain: '//sailplay.ru' });

    })

    .directive('lead', function(sp, $q){

      return {

        restrict: 'A',
        scope: true,
        link: function(scope, elm, attrs){

          var new_form = {
            user: {
              phone: '',
              email: ''
            },
            custom_vars: {

              FN: '',
              LN: '',
              AltEmail: '',
              Phone: '',
              Market: '',
              AN: ''

            },
            tags: [
              {

                name: 'SMS',
                checked: false

              },
              {

                name: 'Email',
                checked: false

              }
            ]
          };

          scope.reset = function(){

            scope.form = angular.copy(new_form);

          };

          scope.reset();

          scope.submit = function(){

            var data_tags = scope.form.tags.filter(function(tag){return tag.checked;}).map(function(tag){ return tag.name; });

            update_user_full(scope.form.user, scope.form.custom_vars, data_tags)

          };

          function update_user(user, custom_vars, tags){

            return $q(function(resolve, reject){

              sp.send('users.update', user, function(user_res){
                if(user_res.status == 'ok'){

                  sp.send('vars.add', custom_vars, function(vars_res){

                    if(vars_res.status == 'ok'){

                      sp.send('tags.add', tags, function(tags_res){

                        if(tags_res.status == 'ok') {

                          resolve({ user_res: user_res, vars_res: vars_res, tags_res: tags_res });

                        }

                        else {
                          reject({ user_res: user_res, vars_res: vars_res, tags_res: tags_res });
                        }

                      });

                    }
                    else {
                      reject({ user_res: user_res, vars_res: vars_res });
                    }

                  });

                }
                else {
                  reject({ user_res: user_res });
                }
              });

            });

          }

          function update_user_full(user, custom_vars, tags){

            tags.push(custom_vars.Market);

            var user_1 = {

              user: {

                email: user.email

              },
              custom_vars: custom_vars

            };

            var user_2 = {

              user: {

                email: custom_vars.AltEmail

              },
              custom_vars: {

                FN: custom_vars.FN,
                LN: custom_vars.LN,
                AltEmail: user.email,
                Phone: custom_vars.Phone,
                Market: custom_vars.Market,
                AN: custom_vars.AN

              }

            };

            var user_3 = {

              user: {

                phone: custom_vars.Phone

              },
              custom_vars: {

                FN: custom_vars.FN,
                LN: custom_vars.LN,
                email: user.email,
                AltEmail: custom_vars.AltEmail,
                Market: custom_vars.Market,
                AN: custom_vars.AN

              }

            };

            var first = update_user(user_1.user, user_1.custom_vars, tags);
            var second = update_user(user_2.user, user_2.custom_vars, tags);
            var third = update_user(user_3.user, user_3.custom_vars, tags);

            $q.all([ first, second, third ]).then(function(data){

              console.log('ZAEBIS');

            }, function(data){

              console.log('NE ZAEBIS');


            });

          }

          scope.markets = [
            'latimes',
            'chicagotribune',
            'sunsentinel',
            'orlandosentinel',
            'dailypress',
            'courant',
            'baltimoresun',
            'mcall',
            'capgaznews',
            'carrollcountytimes'
          ];

        }

      };

    })

    .directive('select', function($timeout){

      return {

        restrict: 'A',
        link: function(scope, elm){

          $timeout(function(){
            $(elm).selectize({
              onChange: function() {



              }
            });
          }, 0);


        }

      };

    });

}());