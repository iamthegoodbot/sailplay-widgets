(function () {

  angular.module('sg.services.gifts', [])

    .service('giftS', function ($q) {

      var self = this;

      self.gifts = {};


      return self;

    });

}());