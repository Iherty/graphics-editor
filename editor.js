'use strict'
let pos1;

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');

// Events
canvas.addEventListener('mousedown', lineDraw1);
canvas.addEventListener('mouseup', lineDraw2);

circleButton.addEventListener('click', removeLine);
lineButton.addEventListener('click', removeCircle);

// Get mousePosition
function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

// Draw a line
function lineDraw1(event) { 
    let arr = getMousePos(canvas, event);
    ctx.beginPath();
    ctx.lineTo(arr[0], arr[1]);
}

function lineDraw2(event) { 
    let arr = getMousePos(canvas, event);
    ctx.lineTo(arr[0], arr[1]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Draw a circle
function circleDraw1(event) {
    let pos = getMousePos(canvas, event);
    pos1 = pos;
    ctx.beginPath();
}

function circleDraw2(event) {
    let pos2 = getMousePos(canvas, event);
    let avrX = (Math.abs(pos1[0] - pos2[0]) / 2) + Math.min(pos1[0], pos2[0]);
    let avrY = (Math.abs(pos1[1] - pos2[1]) / 2) + Math.min(pos1[1], pos2[1]);
    let diameter = Math.max( Math.abs(pos1[0] - pos2[0]), Math.abs(pos1[1] - pos2[1]) );

    ctx.arc(avrX, avrY, diameter/2, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

//Remove functions

function removeLine() {
    canvas.removeEventListener('mousedown', lineDraw1);
    canvas.removeEventListener('mouseup', lineDraw2);

    canvas.addEventListener('mousedown', circleDraw1);
    canvas.addEventListener('mouseup', circleDraw2);
}

function removeCircle() {
    canvas.removeEventListener('mousedown', circleDraw1);
    canvas.removeEventListener('mouseup', circleDraw2);

    canvas.addEventListener('mousedown', lineDraw1);
    canvas.addEventListener('mouseup', lineDraw2);
}


