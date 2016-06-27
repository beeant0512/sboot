(function ($, window, document, undefined) {
    'use strict';
    /*$.fn.button = function (parameters) {
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
     $.fn.button.settings = {
     count: 60,
     template: '%s'
     }*/

    $.fn.button = function (parameters) {
        var elements = $(this),
            queryValues = [].slice.call(arguments, 1),
            invokeReturn,
            el = elements.each(function (index, element) {
                var $this = $(this),
                    data = $(this).data('sboot.button'),
                    methodInvoked = (typeof parameters === 'string');
                if (!data) {
                    $this.data('sboot.button', (data = new Button(this, parameters, queryValues)))
                } else {
                    data.queryValues = queryValues;
                }
                ;
                if (methodInvoked) {
                    invokeReturn = data.invoke(parameters);
                }
            });

        if (undefined != invokeReturn)
            return invokeReturn;

        return el;
    };

    var Button = function (element, settings, queryValues) {
        this.$element = element;
        this.settings = ( $.isPlainObject(settings) )
            ? $.extend(true, {}, Button.settings, settings)
            : $.extend({}, Button.settings),
            this.queryValues = queryValues;
    };

    Button.settings = {
        count: 60,
        template: '%s'
    };

    Button.prototype.set = {
        text: function (queryValues) {
            console.log('set text');
            this.$element.innerHTML = queryValues;
        },
        settings: function (settings) {
            console.log('set settings');
            this.settings = $.extend(this.settings, settings[0]);
        }
    };

    Button.prototype.get = {
        text: function () {
            console.log('get text');
            return this.innerHTML;
        },
        settings: function (queryValues) {
            console.log('get settings');
            if($.isFunction(queryValues[0])){
                queryValues[0](this.settings);
            } else {
                return this.settings;
            }
        }
    };

    Button.prototype.invoke = function (parameters) {
        console.log('invoke');
        parameters = parameters.split(" ");
        if ($.isFunction(this[parameters[0]][parameters[1]])) {
            return this[parameters[0]][parameters[1]].call(this, this.queryValues);
        }
    };

})($, window, document);
