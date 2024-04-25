// ---------------------------------------------------------------------------------
// Small Isomorphic lolcat library
// Copyright (C) Jakub T. Jankiewicz
// Copyright (C) Robert Boloc
// Rleased under WTFPL License
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function(BN) {
            return (root.lolcat = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory();
    } else {
        root.lolcat = factory();
    }
})(typeof global !== 'undefined' ? global : self, function(undefined) {
    var module = {
        options: {
            // Seed of the rainbow, use the same for the same pattern
            seed: 0,
            // Spread of the rainbow
            spread: 8.0,
            // Frequency of the rainbow colors
            freq: 0.3,
        }
    };

    var options = module.options;

    var rainbow = function(freq, i) {

        var red   = Math.round(Math.sin(freq * i + 0) * 127 + 128);
        var green = Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128);
        var blue  = Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128);

        return {
            red:   red,
            green: green,
            blue:  blue
        }
    };

    var printlnPlain = function(colorize, line) {
        for (var i = 0; i < line.length; i++) {
            colorize(line[i], rainbow(options.freq, options.seed + i / options.spread));
        }
    };

    var rand = function(max) {
        return Math.floor(Math.random() * (max + 1));
    };

    module.rainbow = function render(fn, string, seed) {
        var i = 20;
        var o = seed || rand(256);
        function eachLine() {
          i -= 1;
          lolcat.options.seed = o + i;
        }
        return lolcat.format(fn, string, eachLine);
    };

    module.format = function format(format, string, eachLine) {
        var output = [];
        var input = string.split('\n');
        var line;
        onLine = typeof onLine === 'function' ? onLine : function() {};
        function buff(char, color) {
            line.push(format(char, color));
        }
        for (var i = 0; i < input.length; ++i) {
            line = [];
            eachLine(i);
            printlnPlain(buff, input[i]);
            output.push(line.join(''));
        }
        return output;
    };
    return module;
});
