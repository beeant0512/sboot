(function ($, window, document, undefined) {
    // 'use strict';
    $.fn.button = function (parameters) {
        var elements = $(this),
        queryValues = [].slice.call(arguments, 1);

        elements.each(function (index, element) {
            var
                settings = ( $.isPlainObject(parameters) )
                    ? $.extend(true, {}, $.fn.button.settings, parameters)
                    : $.extend({}, $.fn.button.settings),

                methodInvoked = (typeof parameters === 'string');
            var module = {
                init:function(settings){
                    console.log(settings);
                },
                set: {
                    text: function () {
                        console.log('set text');
                        element.innerHTML = queryValues;
                    }
                },
                invoke: function (parameters) {
                    console.log('invoke');
                    parameters = parameters.split(" ");
                    if($.isFunction(this[parameters[0]][parameters[1]])){
                        this[parameters[0]][parameters[1]].apply('',queryValues);
                    }
                }
            };
            if (methodInvoked) {
                module.invoke(parameters,queryValues);
            } else {
                module.init(settings);
            }
        });
    };
})($, window, document);
