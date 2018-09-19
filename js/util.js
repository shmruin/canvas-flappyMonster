/*
*
*   Global Functions   
*  
*/

'use strict'

// https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// ranged random integer generater
window.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// random color generater
window.getRandomColor = function() {
    var red = getRandomInt(0, 257);
    var green = getRandomInt(0, 257);
    var blue = getRandomInt(0, 257);
    return `rgb(${red}, ${green}, ${blue})`;
};