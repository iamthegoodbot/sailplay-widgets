(function(){

  angular.module('visavis', [ 'pagination' ])

    .run(function(){

      if(!SAILPLAY) return;

      SAILPLAY.on('login.success', function(){

        SAILPLAY.send('load.user.info');
        SAILPLAY.send('load.user.history');
        SAILPLAY.send('load.gifts.list');
        SAILPLAY.send('load.actions.list');
        SAILPLAY.send('load.badges.list');

      });

    })

    .filter('short_number', function(){
      return function(number){
        function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
          number = Number(number);
          forceLetter = forceLetter || false;
          if(forceLetter !== false) {
            return annotate(number, maxPlaces, forcePlaces, forceLetter)
          }
          var abbr;
          if(number >= 1e12) {
            abbr = 'T';
          }
          else if(number >= 1e9) {
            abbr = 'B';
          }
          else if(number >= 1e6) {
            abbr = 'M';
          }
          else if(number >= 1e3) {
            abbr = 'K';
          }
          else {
            abbr = '';
          }
          return annotate(number, maxPlaces, forcePlaces, abbr);
        }

        function annotate(number, maxPlaces, forcePlaces, abbr) {
          // set places to false to not round
          var rounded = 0;
          switch(abbr) {
            case 'T':
              rounded = number / 1e12;
              break;
            case 'B':
              rounded = number / 1e9;
              break;
            case 'M':
              rounded = number / 1e6;
              break;
            case 'K':
              rounded = number / 1e3;
              break;
            case '':
              rounded = number;
              break;
          }
          if(maxPlaces !== false) {
            var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
            if(test.test(('' + rounded))) {
              rounded = rounded.toFixed(maxPlaces);
            }
          }
          if(forcePlaces !== false) {
            rounded = Number(rounded).toFixed(forcePlaces);
          }
          var splitted = rounded.toString().split('.');
          var decimal = splitted[1] ? splitted[1][0] : '0';
          return splitted[0] + ( decimal != '0' ? ('.' + decimal) : '') + abbr;
        }

        return abbreviate(number, 2, false, false);
      }
    });

}());