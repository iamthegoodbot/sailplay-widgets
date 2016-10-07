$(document).ready(function() {
	$('.js-gift-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 150,
        infinite: false,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.js-task-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 150,
        infinite: false,
        prevArrow: '<div class="slick-prev"></div>',
        nextArrow: '<div class="slick-next"></div>',
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.js-open-history-popup').click(function(e) {
    	e.preventDefault();
    	$('.js-history-popup').bPopup({
            speed: 450,
            transition: 'fadeIn',
            closeClass: 'js-close-popup',
            positionStyle: 'absolute',
            follow: [true,false],
            modal: true,
            modalClose: true,
            modalColor: '#000000',
            opacity: 0.5
        });
    });
    $('.js-open-status-popup').click(function(e) {
    	e.preventDefault();
    	$('.js-status-popup').bPopup({
            speed: 450,
            transition: 'fadeIn',
            closeClass: 'js-close-popup',
            positionStyle: 'absolute',
            follow: [true,false],
            modal: true,
            modalClose: true,
            modalColor: '#000000',
            opacity: 0.5
        });
    });
    $('.js-open-gift-popup').click(function(e) {
    	e.preventDefault();
    	$('.js-gift-popup').bPopup({
            speed: 450,
            transition: 'fadeIn',
            closeClass: 'js-close-popup',
            positionStyle: 'absolute',
            follow: [true,false],
            modal: true,
            modalClose: true,
            modalColor: '#000000',
            opacity: 0.5
        });
    });
    $('.js-open-profile-popup').click(function(e) {
        e.preventDefault();
        $('.js-profile-popup').bPopup({
            speed: 450,
            transition: 'fadeIn',
            closeClass: 'js-close-popup',
            positionStyle: 'absolute',
            follow: [true,false],
            modal: true,
            modalClose: true,
            modalColor: '#000000',
            opacity: 0.5
        });
    });

    // для примера - попап выполненного задания
    $('.js-task-popup').bPopup({
        speed: 450,
        transition: 'fadeIn',
        closeClass: 'js-close-popup',
        positionStyle: 'absolute',
        follow: [true,false],
        modal: true,
        modalClose: true,
        modalColor: '#000000',
        opacity: 0.5
    });

    // progress bar
    $(window).load(function() {
    	var bar = $('.js-status-bar');
    	var barInners = $('.js-status-bar__inner');
    	var commonWidth = bar.data('width');

    	var fullParts = Math.floor(commonWidth/25);
    	var mod = (commonWidth % 25)/25 * 100;
    	console.log(mod);
    	var step;
    	for(step = 0; step < fullParts; step++) {
    		(function() {
    			var tmp = step;
    			setTimeout(function() {
    				barInners.eq(tmp).width('100%');
    			}, 500 * tmp);
    		})();
    	}
    	setTimeout(function() {
			barInners.eq(step).width(mod + '%');
		}, 500 * step);
    });

    // init radio and selects
    $('.js-create-radio').each(function() {
        $(this).prettyCheckable({
            customClass: 'sp_cmn-radio-wrap js-target'
        });
    });
    $('.js-create-checkbox').each(function() {
        $(this).prettyCheckable({
            customClass: 'sp_cmn-checkbox-wrap js-target'
        });
    });
    $('.js-satellite').click(function() {
        $(this).siblings('.js-target').find('a').click();
    });
    $('.js-create-select').selectize({});

    // phone mask
    $('.js-create-mask').mask('+7(000) 000-00-00', {placeholder: "+7(___)___-__-__"})


});