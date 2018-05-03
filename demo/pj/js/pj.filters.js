angular.module('pj.filters', [])
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
  })

  .filter('truncate', function(){

    return function(string, len){

      if(!len || !string || string.length <= len) return string;
      return string.substring(0, len) + '...';
    }

  })

  //transform string to trusted html
  .filter('to_html', ['$sce', function($sce){
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }])

  .filter('static', [ 'config', function(config){

    return function(file) {
      var static_url = config.env.staticUrl;
      if(static_url) return static_url + file;
      return '';
    };

  }])

  .filter('media', [ 'config', function(config){

    return function(file) {
      var static_url = config.env.mediaUrl;
      if(static_url) return static_url + file;
      return '';
    };

  }])

  .filter('humanizeUserHistoryAction', function($rootScope) {

    return function(historyItem) {
      switch (historyItem.action) {
        case 'event':
          return historyItem.name;
        case 'extra':
          return historyItem.name;
        case 'sharing':
          switch (historyItem.social_action) {
            case 'like':
              return $rootScope.translate.history.items.enter_group + historyItem.social_type;
            case 'purchase':
              return $rootScope.translate.history.items.share_purchase + historyItem.social_type;
            case 'partner_page':
              return $rootScope.translate.history.items.social_share + historyItem.social_type;
            case 'badge':
              return $rootScope.translate.history.items.share_badge + historyItem.social_type;
          }
      }
      return $rootScope.translate.history.items[historyItem.action];
    }
  })

  .filter('divide', function() {
    return function(items, divide_count, index) {
      var divide = (items || []).slice(index, index+divide_count);
      return divide;
    };
  });
