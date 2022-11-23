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

    static savesPolylines = [];

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
    #downCoordinates;
    #endLineCoordinates;
    #lastCoordinates;
    #polyline = new Polyline();
    #pCreatedCallbacks = [];

    mouseDownHandler(event) {
    
        if (event.button == 0) { // if clicked on the left mouse button
            this.#downCoordinates = getMousePos(canvas, event);
            this.#isClick = true;

            // Save coordinates to polyline object
            this.#polyline.coordinates.push(this.#downCoordinates[0], this.#downCoordinates[1]);
        }
    
    }

    
    mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLineCoordinates = getMousePos(canvas, event);
        

        // Draw polylines every time the mouse moves. This will help render the polyline.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.beginPath();
        ctx.moveTo(this.#downCoordinates[0], this.#downCoordinates[1]);
        ctx.lineTo(this. #endLineCoordinates[0], this. #endLineCoordinates[1]);
        ctx.lineWidth = this.#polyline.width;
        ctx.strokeStyle = this.#polyline.color;
        ctx.stroke();
        
        // ctx.clearRect will clear the entire canvas. 
        // the code below will help to permanently animate the lines of the polyline
        if (this.#polyline.coordinates.length > 2) {
            new PolylineDrawer().draw(this.#polyline.coordinates, this.#polyline.width, this.#polyline.color);
        }
         
    }

    ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#lastCoordinates = getMousePos(canvas, event);
        this.#polyline.coordinates.push(this.#lastCoordinates[0], this.#lastCoordinates[1]);

        console.log(this.#pCreatedCallbacks);
        this.#pCreatedCallbacks.forEach(item => item(this.#polyline));
        this.#polyline = new Polyline();
    }

    addPolylineCreatedEventListener(callback) {
        this.#pCreatedCallbacks.push(callback)
    }

}


let obj = {
    drawnPolyline: [],

    getDrawnPolyline(polyline) {
        let clone = {...polyline}
        obj.drawnPolyline.push(clone);
        console.log(this.drawnPolyline);
    },

    animate() {

        if (this.drawnPolyline.length > 0) {
    
            for (let i = 0; i < this.drawnPolyline.length; i++) {
                new PolylineDrawer().draw(this.drawnPolyline[i].coordinates);
            }
    
        }
    
    }

}




let polylineHandler = new PolylineHandlers();
polylineHandler.addPolylineCreatedEventListener(obj.getDrawnPolyline.bind(obj))


canvas.addEventListener('mousedown', function(event) {polylineHandler.mouseDownHandler(event) 
    if (obj.drawnPolyline.length > 0) obj.animate() });
canvas.addEventListener('mousemove', function(event) {polylineHandler.mouseMoveHandler(event) 
    if (obj.drawnPolyline.length > 0) obj.animate() });
canvas.addEventListener('contextmenu', function(event) {polylineHandler.ctxMenuHandler(event) 
    obj.animate()});

