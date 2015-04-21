$(function(){
    var $root = $('#sptb');

    $('body')
        .on('click', '[data-sp-show-list]', function(){
            $root.addClass('sptb-state-show-list');
            return false;
        })
        .on('click', '[data-sp-close-list]', function(){
            $root.removeClass('sptb-state-show-list');
            return false;
        })
        .on('click', '[data-sp-show-badge]', function(){

            $root.toggleClass('sptb-state-show-badge')
                .removeClass('sptb-state-show-list');
            return false;
        })
        .on('click', '[data-sp-show-gift]', function(){

            $root.addClass('sptb-state-show-gift');
            return false;
        })
        .on('click', '[data-sp-close-gift]', function(){

            $root.removeClass('sptb-state-show-gift');
            return false;
        })
        .on('click', '[data-sp-show-task]', function(){

            $root.addClass('sptb-state-show-task');
            return false;
        })
        .on('click', '[data-sp-close-task]', function(){

            $root.removeClass('sptb-state-show-task');
            return false;
        });


    $('#slider, #slider1').royalSlider({
        arrowsNav: true,
        loop: false,
        keyboardNavEnabled: true,
        imageAlignCenter: true,
        controlsInside: false,
        imageScaleMode: 'fill',
        autoScaleSlider: true,
        autoScaleSliderHeight: 300,
        controlNavigation: 'bullets',
        thumbsFitInViewport: false,
        navigateByClick: false,
        startSlideId: 0,
        transitionType:'slide',
        globalCaption: false,
        sliderDrag: false,
        sliderTouch: false,
        allowCSS3: false,
        deeplinking: {
            enabled: true,
            change: false
        },
        autoPlay: false
    });





});