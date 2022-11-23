'use strict'
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

class Polyline {

    static savesPolylines = [0, 1];

    constructor(coordinates = [], width = 2, color = 'black') {
        //super(arguments);
        this.coordinates = coordinates; 
        this.width = width;
        this.color = color;

        // if (style === 'dashed') {
        //     this.style = [20, 5];
        // } else if (style === 'dotted') {
        //     this.style = [5, 15];
        // } else {
        //     this.style = 'solid';
        // }
    }

}

class PolylineDrawer {

    draw(coordinates, width = 2, color = 'black') {

        ctx.beginPath();
        for(let i = 0; i < coordinates.length;) {
            ctx.lineTo(coordinates[i], coordinates[i + 1]);
            i = i + 2;
        }

        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
        
    }
}

class PolylineHandlers {
    #isClick = false;

    polylineMouseDownHandler(event, obj) {

        if (event.button == 0) { // if clicked on the left mouse button
            [this.startLineX, this.startLineY] = getMousePos(canvas, event);

            // Save coordinates to polyline object
            this.coordinates.push(this.startLineX, this.startLineY);
            this.#isClick = true;
        }
    
    }

    polylineMouseMoveHandler(event, obj) {

        if (!this.#isClick) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        [this.endLineX, this.endLineY] = getMousePos(canvas, event);

        // Draw polylines every time the mouse moves. This will help render the polyline.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.moveTo(this.startLineX, this.startLineY);
        ctx.lineTo(this.endLineX, this.endLineY);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        
        // ctx.clearRect will clear the entire canvas. 
        // the code below will help to permanently animate the lines of the polyline
        if (this.coordinates.length > 2) {
            new PolylineDrawer().draw(this.coordinates, this.width, this.color);
        }
         
        //  if(drawnPolylines.length > 1) {
        //     drawnPolylines[0].draw();
        //  }
    }

    polylineCtxMenuHandler(event, obj) {
        event.preventDefault(); 
        this.#isClick = false;

        [this.lastX, this.lastY] = getMousePos(canvas, event);
        this.coordinates.push(this.lastX, this.lastY);
        Polyline.savesPolylines.push(this.slice());
    }

}

function animate() {

    if (Polyline.savesPolylines.length > 0) {

        for (let i = 0; i < Polyline.savesPolylines.length; i++) {
            new PolylineDrawer().draw(Polyline.savesPolylines[i].coordinates);
        }

    }

}


let poly = new Polyline();

canvas.addEventListener('mousedown', function(event) { 
    let handler = new PolylineHandlers().polylineMouseDownHandler;
    poly.handler(event);
    requestAnimationFrame(animate);
});
canvas.addEventListener('mousemove', function(event) { 
    new PolylineHandlers().polylineMouseMoveHandler.call(poly, event);
    requestAnimationFrame(animate); 
});
canvas.addEventListener('contextmenu', function(event) { 
    new PolylineHandlers().polylineCtxMenuHandler.call(poly, event); 
    poly.coordinates = [];   
    requestAnimationFrame(animate);
    });

