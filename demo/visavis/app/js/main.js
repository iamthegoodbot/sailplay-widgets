$(function(){
    $('body')
        .on('click', '[data-show-test]', function(e){
            var $this = $(this);

            $this.closest('[data-toggle-task]')
                .addClass('show_test');
            e.preventDefault();
        })
        .on('click', '[data-toggle-history]', function(e){
            var $parent = $(this).closest('.spvv-inline');

            if (!$parent.hasClass('show_left-block')){
                $parent.addClass('show_left-block show_left_higher');
            } else {
                $parent.removeClass('show_left-block');
                setTimeout( function(){
                    $parent.removeClass('show_left_higher');
                }, 700);
            }

            e.preventDefault();
        })
        .on('click', '[data-toggle-status]', function(e){
            var $parent = $(this).closest('.spvv-inline');

            if (!$parent.hasClass('show_right-block')){
                $parent.addClass('show_right-block show_right_higher');
            } else {
                $parent.removeClass('show_right-block');
                setTimeout( function(){
                    $parent.removeClass('show_right_higher');
                }, 700);
            }

            e.preventDefault();
        })
        .on('click', '.spvv-quest__i', function(e){
            $(this).toggleClass('selected');
            e.preventDefault();
        })







});