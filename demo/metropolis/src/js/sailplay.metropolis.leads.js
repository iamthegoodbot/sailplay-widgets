(function () {

  window.addEventListener('DOMContentReady', function(){

    if(!window) return;
    if(!SAILPLAY) {

      console.error("Cannot find module 'sailplay-hub'");
      return;

    }

    SAILPLAY.leads = new Leads();

  });

  var Leads = function(){


  };

  var Lead = function(name, form, tags){

    var self = this;

    self.name = name;

  };

}());
