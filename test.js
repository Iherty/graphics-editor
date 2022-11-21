'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

class Handlers {

    #downX = null;
    #downY = null;
    #isClick = false;
    #cache; // Для хранения данных объектов new Polyline - идея. 

    polylineMouseDownHandler(event) {

        if (event.button == 0) {
            this.getDownPos = getMousePos(canvas, event);
            this.#downX = this.getDownPos[0];
            this.#downY = this.getDownPos[1];
            this.coordinates.push(this.getDownPos[0], this.getDownPos[1])
            this.#isClick = true;
        }
    
    }

    polylineMouseMoveHandler(event) {
        if (!this.#isClick) {
            return
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.xy = getMousePos(canvas, event);

        ctx.beginPath() // visualize mouse movement
        ctx.moveTo(this.#downX, this.#downY);
        ctx.lineTo(this.xy[0], this.xy[1]);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    
         if(this.coordinates.length > 2) {
            this.draw(); // draws previous lines
         }
    
    }

    polylineCtxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.xy = getMousePos(canvas, event);
        this.coordinates.push(this.xy[0], this.xy[1]);
        
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

let polyline = new Polyline();

canvas.addEventListener('mousedown', function(event) { polyline.polylineMouseDownHandler(event) });
canvas.addEventListener('contextmenu', function(event) { polyline.polylineCtxMenuHandler(event) });
canvas.addEventListener('mousemove', function(event) { polyline.polylineMouseMoveHandler(event) });


// let poly = new Polyline([100, 50, 200, 100, 250, 150, 350, 390]);
// poly.draw();