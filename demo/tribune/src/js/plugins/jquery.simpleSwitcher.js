;(function( $ ) {
    // methods
    var methods = {
        init: function(options) {
            // settings
            var defOptions = {
                activeClass: 'active',
                removeActive: false,
                onSwitchOn: function(eventElement) {
                },
                onSwitchOff: function(eventElement) {
                }
            }
            var settings = $.extend({},defOptions, options);
            var self = this;

            self.each(function() {
                var $eachitem = $(this);
                var groupName = $eachitem.data('switchgroup');
                var groupFlag = groupName != undefined && groupName !== '';
                if(groupFlag) {
                    $eachitem.addClass('simpleSwitcher-' + groupName);
                }
                $eachitem.on('click',function() {
                    var _this = $(this);
                    if(!_this.hasClass(settings.activeClass)) {
                        if(groupFlag) {
                            $('.simpleSwitcher-'+ groupName).removeClass(settings.activeClass)
                        }
                        _this.addClass(settings.activeClass)
                        settings.onSwitchOn(_this);
                    } else if(settings.removeActive) {
                        _this.removeClass(settings.activeClass)
                        settings.onSwitchOff(_this);
                    }
                });
            });
        }
    }
    $.fn.simpleSwitcher = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.simpleSwitcher' );
        }
    };
})(jQuery);