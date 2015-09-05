$.fn.shopZoom = function(params) {
	var params = params || {},
		defaultParams = {
			container: 'body',
			toolbar: {
				height: 100,
				color: '#000',
				opacity: .62
			},
			logo: {
				src: '/upload/vis/logo.png'
			},
			zoom: {
				parts: 3,
				scroll: 10
			},
			hidebutton: {
				width: 39	
			},
			getCollection: function () {
				var arPhotos = [];
				$('a', '#fancybox-title').each(function() {
					arPhotos.push({
						preview: $(this).find('img').attr('src'),
						detail: $(this).attr('href')
					});
				});
				return arPhotos;
			},
			getName: function() {
				var sValue = $('#fancybox-content').data('name');
				return sValue && sValue.length ? sValue : '';
			},
			getPrice: function() {
				var sValue = $('#fancybox-content').data('price');
				return sValue && sValue.length ? sValue : '';
			},
			getDescription: function() {
				var sValue = $('#fancybox-content').data('description');
				return sValue && sValue.length ? sValue : '';
			},
			initCallback: false
		};
	
	var shopZoom = this,
		params = $.extend(defaultParams, params),
		mouse = {
			down: false,
			startX: 0,
			startY: 0,
			dropX: 0,
			dropY: 0
		},
		bounds,
		bShowPanel = true,
		bResize = true,
		initWidth = 0,
		origWidth = 0,
		nImgRatio = 1; // =(width/height)
	
	this.mouse = mouse;
	
	function intval(n)
	{
		return parseInt(parseFloat(n));
	}
	
	function getShopZoomCont()
	{
		return $('#shopZoomCont');
	}
	
	function getZoomCont()
	{
		return $('.zoomCont', '#shopZoomCont');
	}
	
	function getImgCont()
	{
		return $('.imgCont', '#shopZoomCont');
	}
	
	function getImg()
	{
		return $('img', '#shopZoomCont .imgCont');
	}
	
	function getPanel()
	{
		return $('.panel', '#shopZoomCont');
	}
	
	function getPanelOverlay()
	{
		return $('.panelOverlay', '#shopZoomCont');
	}
	
	function getInfoCont()
	{
		return $('.infoCont', getPanel());
	}	
	
	function getScrollCont()
	{
		return $('.scrollCont', '#shopZoomCont .panel');
	}
	
	function getScroll()
	{
		return $('.scroll', getScrollCont());
	}
	
	function getImgContLeft()
	{
		return intval(getImgCont().css('left'));
	}
	
	function getImgContTop()
	{
		return intval(getImgCont().css('top'));
	}
	
	function getWindowWidth()
	{
		return intval($(window).width());
	}
	
	function getWindowHeight()
	{
		return intval($(window).height());
	}
	
	function getImgWidth()
	{
		return intval(getImg().width());
	}
	
	function getImgHeight()
	{
		return intval(getImg().height());
	}
	
	function setBounds(nImgWidth, nImgHeight)
	{
		var nWindowWidth = getWindowWidth(),
			nWindowHeight = getWindowHeight(),
			nLeft, nTop;
		
		nLeft = (nImgWidth <= nWindowWidth) ? 0 : nWindowWidth - nImgWidth;
		nTop = (nImgHeight <= nWindowHeight) ? 0 : nWindowHeight - nImgHeight;
		
		bounds =  {left: nLeft, top: nTop, right: 0, bottom: 0};	
	}
	
	function getCorrectPosition(iLeft, iTop)
	{
		var iLeft = intval(iLeft) || 0,
			iTop = intval(iTop) || 0;
		
		if(iLeft < bounds.left) {
			iLeft = bounds.left;
		} else if (iLeft > bounds.right) {
			iLeft = bounds.right;
		}
		
		if(iTop < bounds.top) {
			iTop = bounds.top;
		} else if(iTop > bounds.bottom) {
			iTop = bounds.bottom;
		}
		
		return {left: iLeft, top: iTop};
	}
	
	function setImgWidth(obOldParams, obParams, bAnimate)
	{
		setBounds(obParams.width, obParams.height);
		
		var obPos = getCorrectPosition(getImgContLeft(), getImgContTop());
		
		mouse.dropX = (((Math.abs(getImgContLeft()) + mouse.dropX) * obParams.width) / obOldParams.width) - Math.abs(obPos.left);
		mouse.dropY = (((Math.abs(getImgContTop()) + mouse.dropY) * obParams.height) / obOldParams.height) - Math.abs(obPos.top);
		
		if (bAnimate) {
			getImg().stop(true, true).animate({width: obParams.width + 'px', height: obParams.height + 'px'});
			getImgCont().stop(true, true).animate({width: obParams.width + 'px', height: obParams.height + 'px', left: obPos.left + 'px', top: obPos.top + 'px'});
		} else {
			getImg().css({width: obParams.width + 'px', height: obParams.height + 'px'});
			getImgCont().css({width: obParams.width + 'px', height: obParams.height + 'px', left: obPos.left + 'px', top: obPos.top + 'px'});
		}
	}
	
	function loadImage(src, bFirstRun)
	{
		var src = src || '',
			nWindowWidth = getWindowWidth(),
			nWindowHeight = getWindowHeight(),
			nTimeout = 400;
		
		if (!src.length) {
			return false;
		}
		
		mouse = {
			down: false,
			startX: 0,
			startY: 0,
			dropX: 0,
			dropY: 0
		};
		
		function resizeImage(bFirstRun) {
			var nImgWidth = getImgWidth(),
				nImgHeight = getImgHeight(),
				bCenter = false;
		
			origWidth = nImgWidth;
			
			nImgRatio = nImgWidth / nImgHeight;
			
			if (nImgWidth < nWindowWidth && nImgHeight < nWindowHeight) {
				getImgCont().css('top',  + 'px');
				bCenter = true;
				bResize = false;
			} else if (nImgRatio > 1) {
				if (nImgWidth > nWindowWidth) {
					nImgWidth =  nWindowWidth;
					nImgHeight = nImgWidth / nImgRatio;
				} 
			} else {
				if (nImgHeight > nWindowHeight) {
					nImgHeight =  nWindowHeight;
					nImgWidth = nImgHeight * nImgRatio;
				}
			}
			
			initWidth = nImgWidth;
			
			getImg().css({width: nImgWidth + 'px', height: nImgHeight + 'px'});
			getImgCont().css({width: nImgWidth + 'px', height: nImgHeight + 'px', left: '0px', top: (bCenter ? ((nWindowHeight - nImgHeight) / 2) : 0) + 'px'});
			
			setBounds(nImgWidth, nImgHeight);
			
//			if (!bFirstRun) {
				initSlider();
//			}
		}
		
		if (!bFirstRun) {
			getScroll().slider('value', initWidth);
		}
		getImgCont().fadeOut(nTimeout, function() {
			getShopZoomCont().showWaitWindow();
			if (!bFirstRun) {
				getImg().remove();
			}
			$('<img>', {src: src + "?hash=" + new Date().getTime()})
				.appendTo(getImgCont())
				.load(function() {
					getShopZoomCont().closeWaitWindow()
					getImgCont().fadeIn(nTimeout);
					resizeImage(bFirstRun);
				});
		});
	}
	
	function initSlider()
	{
		getScroll().slider({ 
			min: initWidth, 
			max: origWidth,
			slide: function(e, ui){
				var nOldImgWidth = getImgWidth(),
				nOldImgHeight = getImgHeight();
				var nImgWidth = intval(ui.value);
				
				if (nImgWidth < initWidth) {
					nImgWidth = initWidth;
				} else if (nImgWidth > origWidth) {
					nImgWidth = origWidth;
				}
				nImgHeight = nImgWidth / nImgRatio
				
				setImgWidth({width: nOldImgWidth, height: nOldImgHeight}, {width: nImgWidth, height: nImgHeight}, true);
			}
		});
	}
	
	function mouseEvent(e) {
		var e = e || window.event; 
		
		e.source = e.target ? e.target : e.srcElement;
		e.x = e.pageX ? e.pageX : e.clientX;
		e.y = e.pageY ? e.pageY : e.clientY;
		
		if($(document).scrollLeft()) {
			e.x -= intval($(document).scrollLeft());
		}
		if($(document).scrollTop()) {
			e.y -= intval($(document).scrollTop());
		}
		
		return e;
	}
	
	this.close = function() {
		if (getShopZoomCont().length) {
			getShopZoomCont().fadeOut('fast', function() {getShopZoomCont().remove()});
		}
		$('body').unbind();
	}
	
	this.init = function() {
		var nWindowWidth = getWindowWidth(),
			nWindowHeight = getWindowHeight();
		
		$('<div>', {id: 'shopZoomCont'})
			.css({
				'height': nWindowHeight,
				'min-height': nWindowHeight,
				'max-height': nWindowHeight
			})
			.appendTo($(params.container));
		
		$('<div>', {'class': 'zoomCont'})
			.css({
				'height': nWindowHeight,
				'min-height': nWindowHeight,
				'max-height': nWindowHeight
			})
			.mousedown(function(e) {
				e = mouseEvent(e);
				mouse.down = true;
				mouse.startX = e.x;
				mouse.startY = e.y;
				if (bResize) {
					$(this).css('cursor', 'move');
				}
				return false;
			})
			.mouseup(function() {
				mouse.down = false;
				mouse.dropX = getImgContLeft();
				mouse.dropY = getImgContTop();
				$(this).css('cursor', 'default');
			})
			.appendTo(getShopZoomCont());
		
		$('<div>', {'class': 'imgCont'})
			.appendTo(getZoomCont());
		
		loadImage(params.src, true);
		
		if (bResize) {
			$('<div>', {'class': 'panelOverlay'})
				.css({
					'background-color': params.toolbar.color,
					'opacity': params.toolbar.opacity,
					'-moz-opacity': params.toolbar.opacity,
					'filter': 'alpha(opacity='+ (params.toolbar.opacity * 100) + ')',
					'height': params.toolbar.height,
					'min-height': params.toolbar.height,
					'max-height': params.toolbar.height,
					'top': (nWindowHeight - params.toolbar.height)
				})
				.appendTo(getShopZoomCont());
			
			$('<div>', {'class': 'panel'})
				.css({
					'height': params.toolbar.height,
					'min-height': params.toolbar.height,
					'max-height': params.toolbar.height,
					'top': (nWindowHeight - params.toolbar.height)
				})
				.appendTo(getShopZoomCont());
			
			$('<div>', {'class': 'scrollCont'})
				.appendTo(getPanel());
			
			$('<a>', {href: '', 'class': 'minus'})
				.mousedown(function() {
					return false; // disable drag'n'drop
				})
				.click(function() {
					var nOldImgWidth = getImgWidth(),
						nOldImgHeight = getImgHeight(),
						nImgWidth = initWidth;
					var nImgHeight = nImgWidth / nImgRatio;
					
					getScroll().slider('value', nImgWidth);
					setImgWidth({width: nOldImgWidth, height: nOldImgHeight}, {width: nImgWidth, height: nImgHeight}, true);
					
					return false;
				})
				.appendTo(getScrollCont());
			
			$('<div>', {'class': 'scroll'})
				.appendTo(getScrollCont());
			
//			initSlider();
			
			$('<a>', {href: '', 'class': 'plus'})
				.mousedown(function() {
					return false; // disable drag'n'drop
				})
				.click(function() {
					var nOldImgWidth = getImgWidth(),
						nOldImgHeight = getImgHeight(),
						nImgWidth = origWidth;
					var nImgHeight = nImgWidth / nImgRatio
					
					getScroll().slider('value', nImgWidth);
					setImgWidth({width: nOldImgWidth, height: nOldImgHeight}, {width: nImgWidth, height: nImgHeight}, true);
					
					return false;
				})
				.appendTo(getScrollCont());
			
			$('body').mousemove(function(e) {
				e = mouseEvent(e);
				var nWindowWidth = getWindowWidth(),
					nContHeight = getWindowHeight();
				
				if (bShowPanel) {
					nContHeight -= params.toolbar.height;
				}
				
				if(mouse.down && (e.x <= 0 || e.x >= nWindowWidth - 1 || e.y <= 0 || e.y >= nContHeight - 1)) {
					getZoomCont().trigger('mouseup');
				}
				
				if(mouse.down) {
					getImg().stop(false, true);
					getImgCont().stop(false, true);
					var obPos = getCorrectPosition(intval(mouse.dropX) - intval(mouse.startX) + intval(e.x), intval(mouse.dropY) - intval(mouse.startY) + intval(e.y)); 
					getImgCont().css({left: obPos.left + 'px', top: obPos.top + 'px'});
					return false; // ie move bugfix
				}
			});
			
			$('<div>', {'class': 'infoCont'})
				.appendTo(getPanel());
			
			var sText = params.getName();
			if (params.getDescription().length) {
				sText += '<br>' + params.getDescription();
			}
			$('<div>', {'class': 'nameBlock'})
				.html(sText)
				.appendTo(getInfoCont());
			
			$('<div>', {'class': 'price'})
				.text(params.getPrice())
				.appendTo($('.nameBlock', getInfoCont()));
			
			var arCollection = params.getCollection();
			if (arCollection.length > 1) {
				$('<div>', {'class': 'photoBlock'})
				.appendTo(getInfoCont());
				$.each(arCollection, function(i, obPhoto) {
					var sClass = obPhoto.detail ==  params.src ? 'active' : '';
					$('<a>', {'href': obPhoto.detail, 'class': sClass})
					.html('<img src="' + obPhoto.preview + '" border="0" />')
					.click(function() {
						$(this).siblings('a').each(function() {
							if ($(this).hasClass('active')) {
								$(this).removeClass('active')
							}
						});
						if (!$(this).hasClass('active')) {
							$(this).addClass('active')
						}
						
						loadImage($(this).attr('href'), false);
						
						return false;
					})
					.appendTo($('.photoBlock', getInfoCont()));
				});
			}
			
			$('<div>', {'class': 'hideButton'})
				.css({'left': ((getWindowWidth() - 39) / 2) + 'px'})
				.click(function() {
					if (bShowPanel) {
						getPanel().fadeOut(300);
						getPanelOverlay().fadeOut(300);
					} else {
						getPanel().fadeIn(300);
						getPanelOverlay().fadeIn(300);
					}
					$(this).fadeOut(200, function() {
						$(this).toggleClass('reverse');
						$(this).fadeIn(200);
					});
					bShowPanel = !bShowPanel;
				})
				.appendTo(getShopZoomCont());
		}
		
		getShopZoomCont().mousewheel(function(e, offset) {
			if (bResize) {
				var nOldImgWidth = getImgWidth(),
					nOldImgHeight = getImgHeight(),
					nMinOffset = ((origWidth - initWidth) / (params.zoom.scroll));
				
				if (offset < 0) {
					var nImgWidth = nOldImgWidth - nMinOffset;
					
					if (nImgWidth < initWidth) {
						nImgWidth = initWidth;
					}
					nImgHeight = nImgWidth / nImgRatio;
				} else {
					var nImgWidth = nOldImgWidth + nMinOffset;
					
					if (nImgWidth > origWidth) {
						nImgWidth = origWidth;
					}
					nImgHeight = nImgWidth / nImgRatio
				}
				
				getImg().stop(false, true);
				getImgCont().stop(false, true);
				getScroll().slider('value', nImgWidth);
				setImgWidth({width: nOldImgWidth, height: nOldImgHeight}, {width: nImgWidth, height: nImgHeight}, false);
			}
			
			return false;
		});
		
		$('<a>', {'class': 'close', href: ''})
			.mousedown(function() {
				return false; // disable drag'n'drop
			})
			.click(function() {
				shopZoom.close();
				return false;
			})
			.html("ЗАКРЫТЬ")
			.appendTo(getShopZoomCont());
		
		$('<div>', {'class': 'logo'})
			.mousedown(function() {
				return false; // disable drag'n'drop
			})
			.appendTo(getShopZoomCont());
		$('<img>', {'src': params.logo.src, 'border': 0, 'width': 200}).appendTo($('.logo', getShopZoomCont()));
		
		$(window).resize(function() {
			var nWindowWidth = getWindowWidth(),
				nWindowHeight = getWindowHeight(),
				nImgWidth = getImgWidth(),
				nImgHeight = getImgHeight();
				
			getShopZoomCont().css({
				'height': nWindowHeight,
				'min-height': nWindowHeight,
				'max-height': nWindowHeight
			});
			
			getZoomCont().css({
				'height': nWindowHeight,
				'min-height': nWindowHeight,
				'max-height': nWindowHeight
			});
			
			setBounds(nImgWidth, nImgHeight);
			var obPos = getCorrectPosition(getImgContLeft(), getImgContTop());
			getImgCont().css({left: obPos.left + 'px', top: obPos.top + 'px'});
			
			getPanelOverlay().css({'top': (nWindowHeight - params.toolbar.height)});
			getPanel().css({'top': (nWindowHeight - params.toolbar.height)});
	
			
			$('.hideButton', getShopZoomCont()).css({'left': ((nWindowWidth - params.hidebutton.width) / 2) + 'px'})
		});
		
		if (typeof(params.initCallback) == 'function') {
			params.initCallback();
		}
	}
	
	this.init();
	
	return this; 
};