(function () {
  //extend standard functionality
  angular.findByProperty = function (arr, prop, value, index) {
    if (angular.isArray(arr)) {
      for (var i = 0, len = arr.length; i < len; i += 1) {
        if (arr[i] && arr[i][prop] === value) {
          if (index) {
            return {
              obj: arr[i],
              index: [i]
            };
          } else {
            return arr[i];
          }
        }
      }
    }
    return false;
  };

})();