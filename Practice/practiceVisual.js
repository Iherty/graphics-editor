'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');

// Events.0
canvas.addEventListener('mousedown', lineMouseDownHandler);
canvas.addEventListener('mouseup', lineMouseUpHandler);
canvas.addEventListener('mousemove', lineMouseMoveHandler);


// Buttin events
circleButton.addEventListener('click', removeLine);
lineButton.addEventListener('click', removeCircle);


// Functions

// Get mousePosition
function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

// Draw a line
let isMouseDown = false;
let downX;
let downY;

function lineMouseDownHandler(event) { 
    let xy = getMousePos(canvas, event);
    downX = xy[0];
    downY = xy[1];
    isMouseDown = true;
}

function lineMouseUpHandler() { 
    isMouseDown = false;
}

function lineMouseMoveHandler(event) {
    
    if(!isMouseDown) {
        return
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let xy = getMousePos(canvas, event);
    ctx.beginPath();
    ctx.moveTo(downX, downY);
    ctx.lineTo(xy[0], xy[1]);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

}


// Draw a circle
let circleMouseDown;
let isMouseDownCircle = false;

function circleMouseDownHandler(event) {
    let pos = getMousePos(canvas, event);
    circleMouseDown = pos;
    isMouseDownCircle = true;
}

function circleMouseUpHandler(event) {
    isMouseDownCircle = false;
}


function circleMouseMoveHandler(event) {

    if(!isMouseDownCircle) {
        return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let circleMouseUp = getMousePos(canvas, event);
    let avrX = (Math.abs(circleMouseDown[0] - circleMouseUp[0]) / 2) + Math.min(circleMouseDown[0], circleMouseUp[0]);
    let avrY = (Math.abs(circleMouseDown[1] - circleMouseUp[1]) / 2) + Math.min(circleMouseDown[1], circleMouseUp[1]);
    let diameter = Math.max( Math.abs(circleMouseDown[0] - circleMouseUp[0]), Math.abs(circleMouseDown[1] - circleMouseUp[1]) );

    ctx.beginPath();
    ctx.arc(avrX, avrY, diameter/2, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

}



//Remove functions

function removeLine() {
    canvas.removeEventListener('mousedown', lineMouseDownHandler);
    canvas.removeEventListener('mouseup', lineMouseUpHandler);
    canvas.removeEventListener('mousemove', lineMouseMoveHandler);

    canvas.addEventListener('mousedown', circleMouseDownHandler)
    canvas.addEventListener('mouseup', circleMouseUpHandler);
    canvas.addEventListener('mousemove', circleMouseMoveHandler);

}

function removeCircle() {
    canvas.removeEventListener('mousedown', circleMouseDownHandler);
    canvas.removeEventListener('mouseup', circleMouseUpHandler);
    canvas.removeEventListener('mousemove', circleMouseMoveHandler);

    canvas.addEventListener('mousedown', lineMouseDownHandler);
    canvas.addEventListener('mouseup', lineMouseUpHandler);
    canvas.addEventListener('mousemove', lineMouseMoveHandler);
}


