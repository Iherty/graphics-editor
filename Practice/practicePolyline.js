'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');
let polylineButton = document.getElementById('polyline');

// Events

// canvas.addEventListener('mousedown', circleMouseDownHandler)
// canvas.addEventListener('mouseup', circleMouseUpHandler);
// canvas.addEventListener('mousemove', circleMouseMoveHandler);

canvas.addEventListener('mousedown', polylineMouseDownHandler);
canvas.addEventListener('contextmenu', polylineCtxMenuHandler);
canvas.addEventListener('mousemove', polylineMouseMoveHandler);


// Functions

let downX;
let downY;
let isClick = false;

function polylineMouseDownHandler(event) {
    
        if (event.button == 0) {
            let mousePos = getMousePos(canvas, event);
            downX = mousePos[0];
            downY = mousePos[1];
            isClick = true;
        }
   
}

function polylineMouseMoveHandler(event) {
    if(!isClick) {
        return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let xy = getMousePos(canvas, event);
    ctx.beginPath()
    ctx.moveTo(downX, downY);
    ctx.lineTo(xy[0], xy[1]);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function polylineCtxMenuHandler(event) {
    event.preventDefault(); // после события убирает дефолт функции браузера
    isClick = false;
}

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

