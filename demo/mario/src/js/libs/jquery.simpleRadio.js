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

                var radio = $eachitem.find('input[type="radio"]');
                var switchGroupName = 'simpleRadio-' + radio.attr('name');
                $eachitem.addClass(switchGroupName);

                $eachitem.click(function() {
                    if(!$eachitem.hasClass(settings.activeClass)) {
                        $('.' + switchGroupName).removeClass(settings.activeClass);
                        radio.prop('checked', true)
                        $eachitem.addClass(settings.activeClass);

                    }
                });
            });
        }
    }
    $.fn.simpleRadio = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.simpleRadio' );
        }
    };
})(jQuery);