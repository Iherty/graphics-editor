'use strict'

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var rectXPos = 50;
var rectYPos = 50;
var rectWidth = 100;
var rectHeight = 100;

drawBorder(rectXPos, rectYPos, rectWidth, rectHeight)

ctx.fillStyle = '#FFF';
ctx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);

function drawBorder(xPos, yPos, width, height, thickness = 1) {
    ctx.fillStyle = '#000';
    ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}