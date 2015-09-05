window.isShowWaitWindow = false;
jQuery.fn.showWaitWindow = function(options)
{
	// if (window.isShowWaitWindow) {
	// 	return false;
	// }
	// window.isShowWaitWindow = true;

        var options = jQuery.extend({Class:'waitWindowLoader', Class2:'waitWindowOpacity', Class3:'waitWindowLayer', MinHeight: 0, MinWidth: 0, centerWindow: false}, options);
        return this.each(function()
        {
                var w = jQuery(this).outerWidth();
                var h = jQuery(this).outerHeight();

                pos = jQuery(this).offset();

                if (w < options.MinWidth) {
                	w = options.MinWidth;
                }
                if (h < options.MinHeight) {
                	h = options.MinHeight;
                }

                jQuery("body").append("<div id='ajaxLoader_" + this.id + "_opacity' style='top:" + pos["top"] + "px; left:" + pos["left"] + "px; width:" + w + "px;height:" + h + "px; position:absolute;' class='" + options.Class2+"'></div><div id='ajaxLoader_" + this.id + "' class='" + options.Class3 + "' style='display:none; top:" + pos["top"] + "px; left:" + pos["left"] + "px; width:" + w + "px;height:" + h + "px; position:absolute;'><div class='" + options.Class + "'></div></div>");

                if (options.centerWindow) {
                	var nLoaderTop = jQuery(window).scrollTop() + parseInt((jQuery('document').height()) / 2) + (pos["top"] / 2) - (jQuery('.' + options.Class).height() / 2);
                	jQuery("." + options.Class).css('top', nLoaderTop + 'px');
                }

                jQuery("#ajaxLoader_" + this.id).css("display", "block");
        });
}
jQuery.fn.closeWaitWindow = function()
{
	// window.isShowWaitWindow = false;
        return this.each(function()
        {
        	jQuery('#ajaxLoader_' + this.id).remove();
            jQuery('#ajaxLoader_' + this.id + '_opacity').remove();
        });
}