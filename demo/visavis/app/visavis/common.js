var obTipParams = {
	show: 'mouseover',
	hide: 'mouseout',
	position: {
		corner: {
			target: 'bottomMiddle',
			tooltip: 'topMiddle'
		},
		adjust: {
	        y: 10
        }
	},
	style: {
		//width: 175,
		padding: 5,
		top: 10,
		background: '#ffffff',
		color: '#0a0a0a',
		textAlign: 'center',
		width: {
			min: 0,
			max: 175
		}
	}
};

var obTipErrorParams = {
	content: 'Error',
	position: {
		corner: {
			target: 'leftMiddle',
			tooltip: 'rightMiddle'
		}
	},
	style: {
		//width: 175,
		padding: 5,
		background: '#ffffff',
		color: '#FF0000',
		textAlign: 'center',
		border: {
	         width: 1,
	         radius: 2,
	         color: '#FF0000'
		},
		width: {
			min: 0,
			max: 175
		}
	}
};

var $shopZoom = {close: function() {}};

$(function(){
	$('#fancybox-img.clickable').live('click', function(e) {
		$shopZoom = $(this).shopZoom({src: $(this).attr('src').replace(/^.*?(\/upload.*?)$/, '$1')});
	});

	/* Bitrix panel */
	if ($('#panel').length) {
		$('#bx-panel-expander, #bx-panel-hider').click(function(){
			if ($('#bx-panel').length && $('#bx-panel').hasClass('bx-panel-folded')) {
				$('.main_outer').css('margin-top', '147px');
			} else if($('#bx-panel').length) {
				$('.main_outer').css('margin-top', '39px');
			}

		});
		if ($('#bx-panel').length && $('#bx-panel').hasClass('bx-panel-folded')) {
			$('.main_outer').css('margin-top', '39px');
		} else if($('#bx-panel').length) {
			$('.main_outer').css('margin-top', '147px');
		}
	}
	/*~ Bitrix panel */

	/* Hints */
	$('.qtip').qtip(obTipParams);
	/* ~Hints */

	/* Auth and registration*/
	$('.auth_button').unbind().live('click', function(){
		var bValidate = $('#auth_form').validate({
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass(errorClass);
			},
			errorPlacement: function(error, element) {
				$(element).addClass(this.errorClass);
			},
			onsubmit: false,
			rules: {}
		}).form();

		if (bValidate) {
			$('#popup_auth').showWaitWindow();
			$.post(
				'/bitrix/templates/vis.main/include_areas/auth.login.php?' + $('#auth_form').serialize(),
				function(response){
					$('#popup_auth').closeWaitWindow();
					$('#content_auth_tab_1').html(response);
				}
			);
		}
		return false;
	});
	$('.reg_button').unbind().live('click', function(){
		var bValidate = $('#reg_form').validate({
			unhighlight: function(element, errorClass, validClass) {
				if ($(element).attr('type') == 'radio') {
					$(element).parents('table').removeClass(errorClass);
				} else {
					$(element).removeClass(errorClass);
				}
			},
			errorPlacement: function(error, element) {
				if ($(element).attr('type') == 'radio') {
					$(element).parents('table').addClass(this.errorClass);
				} else {
					$(element).addClass(this.errorClass);
				}
			},
			onsubmit: false,
			rules: {
				"USER_PHONE": {
					required: true,
					phone: true
				}
			}
		}).form();

		if (bValidate) {
			$('#popup_auth').showWaitWindow();
			$.post(
				'/bitrix/templates/vis.main/include_areas/auth.reg.php?' + $('#reg_form').serialize(),
				function(response){
					$('#popup_auth').closeWaitWindow();
					$('#content_auth_tab_2').html(response);
				}
			);
		}
		return false;
	});
	$('#auth_form_show_password').live('click', function() {
		var $obInput = $('#auth_form_password');
		var $obParent = $obInput.parent(),
			sType = $obInput.attr('type') == 'password' ? 'text' : 'password',
			sVal = $obInput.val();
		$obInput.remove();
		$obParent.prepend($('<input />', {'type': sType, 'name': 'USER_PASSWORD', 'class': 'required', 'id': 'auth_form_password', 'maxlength': 50, 'value': sVal}));
	});
	$('#reg_form_show_password').live('click', function() {
		var $obInput = $('#reg_form_password'),
			$obInputConfirm = $('#reg_form_password_confirm');
		var $obParent = $obInput.parent(),
			$obParentConfirm = $obInputConfirm.parent(),
			sType = $obInput.attr('type') == 'password' ? 'text' : 'password',
			sVal = $obInput.val(),
			sValConfirm = $obInputConfirm.val();
		$obInput.remove();
		$obParent.prepend($('<input />', {'type': sType, 'name': 'USER_PASSWORD', 'class': 'required', 'id': 'reg_form_password', 'maxlength': 50, 'value': sVal}));
		$obInputConfirm.remove();
		$obParentConfirm.prepend($('<input />', {'type': sType, 'name': 'USER_CONFIRM_PASSWORD', 'class': 'required', 'id': 'reg_form_password_confirm', 'maxlength': 50, 'value': sValConfirm}));
	});
	$('.auth_link').live('click', function() {
		if ($('#content_auth_tab_2').hasClass('active')) {
			$('#content_auth_tab_2').removeClass('active');
		}
		if ($('#auth_tab_2').hasClass('active')) {
			$('#auth_tab_2').removeClass('active');
		}
		if (!$('#content_auth_tab_1').hasClass('active')) {
			$('#content_auth_tab_1').addClass('active');
		}
		if (!$('#auth_tab_1').hasClass('active')) {
			$('#auth_tab_1').addClass('active');
		}
		if ($.fancybox.length) {
			$.fancybox.center();
		}
		return false;
	});
	$('.reg_link').live('click', function() {
		if ($('#content_auth_tab_1').hasClass('active')) {
			$('#content_auth_tab_1').removeClass('active');
		}
		if ($('#auth_tab_1').hasClass('active')) {
			$('#auth_tab_1').removeClass('active');
		}
		if (!$('#content_auth_tab_2').hasClass('active')) {
			$('#content_auth_tab_2').addClass('active');
		}
		if (!$('#auth_tab_2').hasClass('active')) {
			$('#auth_tab_2').addClass('active');
		}
		if ($.fancybox.length) {
			$.fancybox.center();
		}
		return false;
	});
    $('.phone', '.b_registration').mask('\8 (999) 999-9999');
	/* ~Auth and registration*/

	/* Basket */
	function reCalcDelivery() {
		// sale.order.ajax/../script_order.js
		deliveryViewControl({region: $("#uf_region_order").val(), city: $("#uf_city_order").val()});
	}
	$('#basket_header').bind('refresh_content', function() {
		$this = $(this);
		$.post('/bitrix/templates/visavis.main/include_areas/header.basket.php', function(response) {
			$this.html(response);
		});
	});
	$('#basketContainer').live('refresh_content', function(){
		var $cont = $(this),
			$form = $('#basketForm'),
			sBasketPath = '/order/';
		$('<input type="hidden" name="BasketRefresh" value="Y" />').appendTo($form);
		$cont.showWaitWindow();
		$.post(sBasketPath, $form.serialize(), function(response){
			$('#basket_header').trigger('refresh_content');
            $('#featuresContainer').trigger('refresh_content');
			$cont.closeWaitWindow();
			$cont.html(response);
			reCalcDelivery();
		});
	});
    $('#featuresContainer').live('refresh_content', function(){
        var $cont = $(this);
        $cont.showWaitWindow();
        $.post('/bitrix/templates/visavis.main/include_areas/get.features.php', function(response) {
            $cont.closeWaitWindow();
            $cont.html(response);
        });
    });
	$('.basket_remove', '#basketContainer').live('click', function() {
		var sBasketPath = '/order/',
			$this = $(this),
			$cont = $this.parents('tr');
		$cont.showWaitWindow();
		$.post(sBasketPath, 'BasketRefresh=Y&DELETE_' + $this.data('id') + '=Y', function(){
			$cont.closeWaitWindow();
			$('#basket_header').trigger('refresh_content');
			$cont.html('<td colspan="6"><a class="undo_delete" href="javascript:void(0)" data-offer="' + $this.data('offer') + '" data-quantity="' + $this.data('quantity') + '">Отменить удаление</a></td>');
			reCalcDelivery();
		});
	});
	$('.basket_favorite', '#basketContainer').live('click', function() {
		var sBasketPath = '/order/',
			$this = $(this),
			$cont = $this.parents('tr');
		$cont.showWaitWindow();
		$.post(sBasketPath, 'BasketRefresh=Y&DELAY_' + $this.data('id') + '=Y', function(){
			$cont.closeWaitWindow();
			$('#basket_header').trigger('refresh_content');
			$cont.html('<td colspan="6"><a class="undo_delete" href="/personal/favorite/">Перейти в избранное</a></td>');
			reCalcDelivery();
		});
	});
	$('.undo_delete', '#basketContainer').live('click', function() {
		var sBasketPath = '/order/',
			sBasketAddPath = '/bitrix/templates/visavis.main/include_areas/add2basket.php',
			$this = $(this),
			$cont = $this.parents('tr');
		$cont.showWaitWindow();
		$.post(sBasketAddPath, 'quantity[' + $this.data('offer') + ']=' + $this.data('quantity'), function(){
			$('#basket_header').trigger('refresh_content');
			$.post(sBasketPath, 'ONLY_PRODUCT_ID=' + $this.data('offer'), function(response){
				$cont.closeWaitWindow();
				$cont.html(response);
			});
			reCalcDelivery();
		});
	});
	var idTime = false;
	$('.quantity_input', '#basketContainer').live('keyup', function() {
		var $obInput = $(this);
		if (idTime) {
			clearTimeout(idTime);
		}
		var value = parseInt($obInput.val());
		var max_value = parseInt($obInput.data('quantity'));
		if(value) {
			if(value > max_value) {
				$obInput.val(max_value);
			}
			idTime = setTimeout(function() {
				$('#basketContainer').trigger('refresh_content');
				idTime = false;
			}, 1000);
		}
	}).numberMask();
	// $('.btn_grey', '.promocode').live('click', function() {
	// 	var $cont  = $('.promocode'),
	// 		sPromoPath = '/bitrix/templates/visavis.main/include_areas/basket.apply.promo.php';
	// 	$cont.showWaitWindow();
	// 	$.post(sPromoPath, 'promo=' + $('input', $cont).val(), function(response){
	// 		$cont.closeWaitWindow();
	// 		$cont.html(response);
	// 	});
	// });
	/* ~Basket */

	// Cycle
	if ( $.fn.cycle ){
		$(".l_index_slideshow").cycle({
			pager:  '.l_index_slideshow-pager',
			pagerAnchorBuilder: function(index, slide) {
				return '.l_index_slideshow-pager li:eq(' + index + ')';
			},
			speed: 400,
			timeout: 5000
		});
	}

	// Text slider
	if ( $.fn.cycle ){
		$(".l_index_text_slideshow").each(function(){
			var _that = $(this);
			_that.cycle({
				speed: 400,
				prev: _that.siblings(".prev"),
				next: _that.siblings(".next"),
				fx: "scrollHorz",
				timeout: 5000
			});
		});
	}

	// jCarousel
	if ( $.fn.jcarousel ){
		$(".l_catalog", ".b_carousel").jcarousel({
			scroll: 6,
			animation: 800,
		});
	}

	// Tabs
	var _tabsWrapper = $(".b_tabs");
	$(".b_tabs-tabs .item", _tabsWrapper).live("click", function(){
		var _that = $(this);

		if ( !_that.hasClass("active") ){
			_that.addClass("active").siblings().removeClass("active");

            //_that.closest(_tabsWrapper).find(".b_tabs-content .item").removeClass("active");
            $(".b_tabs-content .item").each( function() {
                $( this ).removeClass("active");
            });

			$("#content_" + _that.attr("id")).addClass("active");
		}
		if ($.fancybox.length) {
			$.fancybox.center();
		}
	});

	// Fancybox
	if ( $.fn.fancybox ){
		$(".fancybox").fancybox({
			overlayOpacity: 0.8,
			overlayColor: "#484848",
			padding: 0,
			margin: 0,
			centerOnScroll: true,
			scrolling: 'no',
			onComplete: function() {
				$('#fancybox-content').children().css('overflow', 'visible');
			}
		});
	}

	// Toggle aside filter
//	$("dt", ".l_aside_filter").live("click", function(){
//		$(this).next("dd").andSelf().toggleClass("active");
//	});

	// UI Slider
//	if ( $.fn.slider ){
//		var sliderInit = $(".slider_init"),
//			priceFrom = $(".price_from"),
//			priceTo = $(".price_to");
//
//		sliderInit.slider({
//			range: true,
//			min: 100,
//			max: 6000,
//			values: [1000, 4000],
//			slide: function(event, ui) {
//				priceFrom.val(ui.values[0])
//				priceTo.val(ui.values[1])
//			}
//		});
//		priceFrom.val(sliderInit.slider("values", 0));
//		priceTo.val(sliderInit.slider("values", 1))
//	}

	// Toggle linked
//	$(".btn_toggle_linked").on("click", function(e){
//		e.preventDefault();
//		$(this).closest(".linked_wrapper").toggleClass("opened");
//	});

	// Item detailed gallery
//	$("a", ".img_list").live("click", function(e){
//		e.preventDefault();
//		var _that = $(this);
//		if ( !_that.hasClass("active") ){
//			_that.addClass("active").siblings().removeClass("active");
//			_that.parent().siblings(".img_big").children("img").attr("src", _that.attr("href"));
//		}
//	});

	// Toggle order more
	$(".show_more.order").live("click", function(e){
		e.preventDefault();
		$(this).closest("tr").next(".tr_order_more").toggle();
	});
	$(".hide_more.order").on("click", function(e){
		e.preventDefault();
		$(this).closest(".tr_order_more").hide();
	});

	// Toggle private cabinet popover
	$(".btn_private_cabinet").on("mouseover", function(e){
		e.preventDefault();
		$(this).siblings(".popover_private_cabinet").show();
	});
	$(document).on('mouseover', function (e){
		if ($(".private_cabinet", ".l_nav_header_2").has(e.target).length === 0 )
			$(".popover_private_cabinet").hide();
	});

	/* Profile edit */
	$('.profile_edit, .password_edit').fancybox({mode: 'iframe'});
	$('#profile_form').live('submit', function() {
		var bValidate = $(this).validate({
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass(errorClass);
			},
			errorPlacement: function(error, element) {
				$(element).addClass(this.errorClass);
			},
			onsubmit: false,
			rules: {}
		}).form();

		if (bValidate) {
			$(this).ajaxSubmit({
				target: $('#profile_form_container').parent(),
				beforeSubmit: function() {
					$('#profile_form_container').parent().showWaitWindow();
				},
				success: function() {
					$('#profile_form_container').parent().closeWaitWindow();
				},
				error: function() {
					$('#profile_form_container').parent().closeWaitWindow();
				}
			});
		}
		return false;
	});
	if (location.href.indexOf('#profile_edit') !== -1) {
		$('.profile_edit').trigger('click');
	}
	if (location.href.indexOf('#password_edit') !== -1) {
		$('.password_edit').trigger('click');
	}
	/* ~Profile edit */

	/* Top menu */
	$('a.level_0', '.header_row_3').hover(
		function() {
			$(this).parent().parent().find('.subnav_outer').hide();
			$(this).parent().parent().find('a.level_0').css('color', '#aaaaaa');
			$(this).parent().find('.subnav_outer').show();
			$(this).css('color', '#ffffff');
			$('.zoomContainer').css('position', 'static');
		},
		function() {}
	);
	$('.header_row_3').hover(
		function() {},
		function() {
			$(this).find('.subnav_outer').hide();
			$(this).find('a.level_0').css({'color': '#aaaaaa'});
			$('.zoomContainer').css('position', 'absolute');
		}
	);
	/* ~Top menu */

	/* Clear zoom window in catalog.section */
	setInterval(function() {
		if (!$('.needZoomPhoto').length && $('.zoomContainer').length) {
			$('.zoomContainer').remove();
		}
	}, 400);
	/* ~Clear zoom window in catalog.section */

	if(BX.browser.IsIE()) {
		$('input[type=text]').each(function() {
			if ($(this).attr('placeholder')) {
				$(this).placeholder();
			}
		});
	}

	if (location.href.match(/#register/)) {
		if ($('.reg_link').length) {
			$('.reg_link').click();
		}
	}

    var cssFix = function(){
        var u = navigator.userAgent.toLowerCase(),
            is = function(t){return (u.indexOf(t)!=-1)};
        $("html").addClass([
            (!(/opera|webtv/i.test(u))&&/msie (\d)/.test(u))?('ie ie'+RegExp.$1)
                :is('firefox/2')?'gecko ff2'
                :is('firefox/3')?'gecko ff3'
                :is('gecko/')?'gecko'
                :is('opera/9')?'opera opera9':/opera (\d)/.test(u)?'opera opera'+RegExp.$1
                :is('konqueror')?'konqueror'
                :is('applewebkit/')?'webkit safari'
                :is('mozilla/')?'gecko':'',
            (is('x11')||is('linux'))?' linux'
                :is('mac')?' mac'
                :is('win')?' win':''
        ].join(''));
    }();

	// $('.fl', '.subnav_inner').masonry({
	// 	// columnWidth: 200,
 //  		itemSelector: '.sub_nav_header'
	// });
});