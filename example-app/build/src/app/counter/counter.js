"use strict";
/*
var counter = (function () {
    var add = function (a, b) {
        return a + b;
    };
}());
*/
var counter = {
    add :       function (a, b) { return a + b; },
    subtract:   function (a, b) { return a - b; },
    difference: function (a, b) { return Math.abs(a - b); }
}