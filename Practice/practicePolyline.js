'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');

// Events
let drawnPolylines = [];

// Functions
class Handlers {

    #downX = null;
    #downY = null;
    #isClick = false;

    polylineMouseDownHandler(event) {

        if (event.button == 0) {
            this.downCoordinates = getMousePos(canvas, event);
            this.#downX = this.downCoordinates[0];
            this.#downY = this.downCoordinates[1];
            this.coordinates.push(this.downCoordinates[0], this.downCoordinates[1])
            this.#isClick = true;
        }
    
    }

    polylineMouseMoveHandler(event) {
        if (!this.#isClick) {
            return
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.endMousePos = getMousePos(canvas, event);

        ctx.beginPath() // visualize mouse movement
        ctx.moveTo(this.#downX, this.#downY);
        ctx.lineTo(this.endMousePos[0], this.endMousePos[1]);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    
         if(this.coordinates.length > 2) {
            this.draw(); // draws previous lines
         }
         
         if(drawnPolylines.length > 1) {
            drawnPolylines[0].draw();
         }
    }

    polylineCtxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;

        this.endMousePos = getMousePos(canvas, event);
        this.coordinates.push(this.endMousePos[0], this.endMousePos[1]);
        drawnPolylines.push(this.slice());
        console.log(drawnPolylines)
    }
}

class PolylineDrawer extends Handlers {

    draw() {

        ctx.beginPath();
        for(let i = 0; i < this.coordinates.length;) {
            ctx.lineTo(this.coordinates[i], this.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        
    }

}

class Polyline extends PolylineDrawer{

    constructor(coordinates = [], width = 2, color = 'black') {
        super(arguments)
        this.coordinates = coordinates; 
        this.width = width;
        this.color = color;
    }

}


function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

let polyl = new Polyline();

canvas.addEventListener('mousedown', function(event) { 
    // polyl = new Polyline();
    polyl.polylineMouseDownHandler(event)});
canvas.addEventListener('mousemove', function(event) { polyl.polylineMouseMoveHandler(event) });
canvas.addEventListener('contextmenu', function(event) { 
        polyl.coordinates = [];
        polyl.polylineCtxMenuHandler(event) 
    });




