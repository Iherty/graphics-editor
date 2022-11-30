'use strict'

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.ellipse(100, 100, 75, 25, 0, 0, 2 * Math.PI);
ctx.stroke();