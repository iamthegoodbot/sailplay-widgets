(function () {

  angular.module('sp', [
    'sp.profile',
    'sp.gifts',
    'sp.history',
    'sp.actions',
    'sp.badges'
  ])

    .service('sp', function($window){

      return $window.SAILPLAY || {};

    })

    .service('sp_api', function($q, sp){

      var self = this;

      var data = {};

      self.data = function(key, value){

        if(typeof value !== 'undefined'){

          data[key] = angular.copy(value);

        }

        return function (){
          return data[key];
        };

      };

      self.call = function(name, params, callback){

        return $q(function(resolve, reject){

          sp.send(name, params);

          sp.on(name+'.success', function(res){

            self.data(name, res);
            console.log('sailplay.api:' + name);
            console.dir(self.data(name)());
            resolve(res);

          });

          sp.on(name+'.error', function(res){

            self.data(name, null);
            reject(res);

          });

        }).then(function(res){

          callback && callback(res.data);

        });

      };

    })

    .filter('sailplay_pic', function(sp){

      function repair_pic_url(url){
        if(/^((http|https|ftp):\/\/)/.test(url)){
          return url;
        }
        if(url.indexOf('//') === 0){
          return window.location.protocol + url;
        }
        else {
          return sp.config().DOMAIN + url;
        }
      }

      return function(pic_url) {

        if(!pic_url) return '';

        return repair_pic_url(pic_url);

      };

    });

}());
