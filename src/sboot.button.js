(function($, window, document, undefined) {
    'use strict';
    $.fn.button = function(parameters) {
        var elements = $(this),
            invokeReturn,
            args = arguments,
            el = elements.each(function(index, element) {
                var $this = $(this),
                    data = $(this).data('sboot.button'),
                    queryValues = parameters == 'extend' ? data.queryValues : [].slice.call(args, 1),
                    methodInvoked = (typeof parameters === 'string');
                if (!data) {
                    $this.data('sboot.button', (data = new Button(this, parameters, queryValues)))
                } else {
                    data.queryValues = queryValues;
                };
                if (methodInvoked) {
                    invokeReturn = data.invoke(parameters);
                }
            });

        if (undefined != invokeReturn)
            return invokeReturn;

        return el;
    };

    var Button = function(element, settings, queryValues) {
        this.$element = element;
        this.settings = ($.isPlainObject(settings)) ? $.extend(true, {}, Button.settings, settings) : $.extend({}, Button.settings),
            this.queryValues = queryValues;
    };

    Button.settings = {
        count: 60,
        template: '%s',
        click: function() {}
    };

    Button.prototype.set = {
        text: function(queryValues) {
            console.log('set text');
            this.$element.innerHTML = queryValues;
        },
        settings: function(settings) {
            console.log('set settings');
            this.settings = $.extend(this.settings, settings[0]);
        }
    };

    Button.prototype.extend = function(parameters) {
        console.log('extend');
        var functionName = parameters[0],
            callback = parameters[1],
            functions = functionName.split(" ");
        var depth = functions.length;
        if (depth > 1) {
            if ($.isFunction(this[functions[0]][functions[1]])) {
                this[functions[0]][functions[1]].call(this, this.queryValues);
                callback(this.queryValues);
            }
        } else {
            if ($.isFunction(this[functions[0]])) {
                this[functions[0]].call(this, this.queryValues);
                callback(this.queryValues);
            };
        }

        if ($.isFunction(this[functionName])) {
            this[functionName].call(this, this.queryValues);
            callback(this.queryValues);
        }
    }

    Button.prototype.get = {
        text: function() {
            console.log('get text');
            return this.innerHTML;
        },
        settings: function(queryValues) {
            console.log('get settings');
            if ($.isFunction(queryValues[0])) {
                queryValues[0](this.settings);
            } else {
                return this.settings;
            }
        }
    };

    Button.prototype.invoke = function(parameters) {
        console.log('invoke');
        parameters = parameters.split(" ");
        var depth = parameters.length;
        if (depth > 1) {
            if ($.isFunction(this[parameters[0]][parameters[1]])) {
                return this[parameters[0]][parameters[1]].call(this, this.queryValues);
            }
        } else {
            if ($.isFunction(this[parameters[0]])) {
                return this[parameters[0]].call(this, this.queryValues);

            };
        }

    }
})($, window, document);
