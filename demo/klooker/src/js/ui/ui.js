(function () {

  angular.module('ui', [
    'angularUtils.directives.dirPagination'
  ])

    .directive('badgesTable', function(sp_api, $timeout){

      return {

        restrict: 'A',
        replace: false,
        scope: true,
        link: function(scope){

          var badges = sp_api.data('load.badges.list');
          var user = sp_api.data('load.user.info');

          scope.levels = [ 30, 50, 100 ];

          scope.user_points = 0;

          scope.$watch(function(){

            return angular.toJson([user() && user().user_points.confirmed]);

          }, function(){

            var points = user() && user().user_points.confirmed;

            function count(){

              if(scope.user_points < points) {

                scope.user_points++;
                $timeout(count, 40);

              }

            }

            count();

          });

          scope.arc_style = function(){

            var deg_rotate = 0;

            if(user()){

              var procents = 100*(scope.user_points/scope.levels[2]);

              deg_rotate = -180+parseInt(procents*1.8);

            }

            if(deg_rotate > 0) {
              deg_rotate = 0;
            }

            var style_object = {
              'transform': 'rotate('+deg_rotate+'deg)',
              '-moz-transform': 'rotate('+deg_rotate+'deg)',
              '-webkit-transform': 'rotate('+deg_rotate+'deg)',
              '-o-transform': 'rotate('+deg_rotate+'deg)',
              '-ms-transform': 'rotate('+deg_rotate+'deg)'
            };

            var style_string = '';

            for(var i in style_object){

              style_string+=(i + ':' + style_object[i] + ';');

            }

            return style_string;


          };

          scope.$watch('procents', function(){

              //if($('.bns_circle_main').length>0){
              //  var procent = parseInt($('.bns_circle_main').attr('data-procent'));
              //  var degRotate =  -180+parseInt(procent*1.8);
              //  $('.bns_circle_line').css();
              //  $('.bns_circle_line').css();
              //  $('.bns_circle_line').css();
              //  $('.bns_circle_line').css();
              //  $('.bns_circle_line').css();
              //}
              //if($('#num').length>0){
              //  var numFrom = 0;
              //  var numTo = parseInt($('#num').attr('data-finishNum'));
              //  function tick(){
              //    if(numFrom < numTo) {
              //      numFrom ++;
              //      $('#num').html(numFrom);
              //      setTimeout(tick, 40);
              //    }
              //  }
              //  setTimeout(tick, 40);
              //}

          });

        }

      };

    })

    .directive('overlayClick', function(){

      return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function(scope, elm, attrs){

          elm.on('click', function(e){
            if(e.target === elm[0]){
              scope.$apply(function () {
                scope.$eval(attrs.overlayClick);
              });
            }
          });

        }
      };

    })

    .directive('slickCarouselSlide', function ($compile) {
      return {

        link: function (scope, element, attrs) {
          if (scope.$last) { // all are rendered
            $(element).parent().slick({
              infinite: false,
              nextArrow: '<img class="slider_arrow right" src="dist/img/right_arrow.png"/>',
              prevArrow: '<img class="slider_arrow left" src="dist/img/left_arrow.png"/>',
              slidesToShow: 4,
              slidesToScroll: 4,
              responsive: [
                {
                  breakpoint: 1190,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                  }
                },
                {
                  breakpoint: 880,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
            });
          }
        }

      };
    })

    .directive('notifier', function(){

       return {

         restrict: 'E',
         replace: true,
         scope: true,
         templateUrl: '/html/ui/ui.notifier.html',
         link: function(scope){

           var new_data = {

             header: '',
             body: ''

           };

           scope.$on('notifier:notify', function(e, data){

            scope.data = data;
            scope.show_notifier = true;

           });

           scope.reset_notifier = function(){
             scope.data = angular.copy(new_data);
             scope.show_notifier = false;
           };

           scope.reset_notifier();

         }

       }

    });

}());
