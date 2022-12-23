
import { Line } from './figures/Line/line.js';
import { Circle } from './figures/Circle/circle.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let startxy;
let isDragging = false;
let selectedShapeIndex;


let line = new Line([563.3500003814697, 129, 559.3500003814697, 357, 559.3500003814697, 357]);
let circle = new Circle([603.3500003814697, 435, 554.3500003814697, 347]);
let lineWidth = 1;

let shapes = [];
shapes.push(line);
shapes.push(circle);

function isMouseInShape(mx, my, shape) { // mouseX, mouseY
    
    if (shape instanceof Line) { // x1. y1, x2, y2
        let coordinates = shape.coordinates;

        let dx1 = coordinates[2] - coordinates[0];
        let dy1 = coordinates[3] - coordinates[1];

        let dx = mx - coordinates[0];
        let dy = my - coordinates[1];

        let S = dx1 * dy - dx * dy1;
        let ab = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        let h = S / ab;

        if (Math.abs(h) < lineWidth / 2) {
            return true;
        }


    } else if (shape instanceof Circle) {
        let dx = mx - shape.avrX;
        let dy = my - shape.avrY;

        if(dx*dx+dy*dy<shape.radius*shape.radius){
            // yes, mouse is inside this circle
            return(true);
        }
    }

    return false;

}

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

ctx.beginPath();
ctx.lineTo(line.coordinates[0], line.coordinates[1]);
ctx.lineTo(line.coordinates[2], line.coordinates[3]);
ctx.lineWidth = lineWidth;
ctx.strokeStyle = 'black';
ctx.stroke();

canvas.addEventListener('mousedown', function(event) {
    startxy = getMousePos(canvas, event);
    let isDragging = isMouseInShape(startxy[0], startxy[1], line);
    console.log(isDragging)
})

function defineIrregularPath(shape){
    let coordinates = shape.coordinates;
    ctx.beginPath();
    ctx.moveTo(coordinates[0], coordinates[1]);
    ctx.lineTo(coordinates[2], coordinates[3]);
}

// defineIrregularPath(shape);

        // if(ctx.isPointInStroke(mx,my)){
        //     console.log('f');
        //     return(true);
        // }  





