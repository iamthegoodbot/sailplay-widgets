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
              email: '',
              origin_user_id: ''
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

            sp.send('users.update')

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

            var first = update_user({ email: user.email })

          }

          scope.markets = {
            latimes: 10291361,
            chicagotribune: 10291386,
            sunsentinel: 10291387,
            orlandosentinel: 10291388,
            dailypress: 10291389,
            courant: 10291390,
            baltimoresun: 10291391,
            mcall: 10291392,
            capgaznews: 10291393,
            carrollcountytimes: 10291394
          };

        }

      };

    });

}());