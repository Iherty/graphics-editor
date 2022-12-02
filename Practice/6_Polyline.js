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

    constructor(coordinates = [], width = 1, color = 'black', style = 'solid') {
        //super(arguments);
        this.coordinates = coordinates; 
        this.width = width;
        this.color = color;
        this.style = style;

    }

}

class PolylineDrawer {

    draw(polyline) {

        ctx.beginPath();

        if (polyline.style !== 'solid') {
            if (polyline.style === 'dashed') ctx.setLineDash([20, 5]);
            if (polyline.style === 'dotted') ctx.setLineDash([5, 15]);
        }

        for(let i = 0; i < polyline.coordinates.length;) {
            ctx.lineTo(polyline.coordinates[i], polyline.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.lineWidth = polyline.width;
        ctx.strokeStyle = polyline.color;
        ctx.stroke();
        
    }
}

class PolylineHandlers {
    #isClick = false;
    #startLinePos;
    #endLinePos;
    #polyline = new Polyline();
    #polCreatedCallbacks = [];
    #drawer = new PolylineDrawer();

    mouseDownHandler(event) {
    
        if (event.button == 0) { // if clicked on the left mouse button
            this.#startLinePos = getMousePos(canvas, event);
            this.#isClick = true;

            // Save coordinates to polyline object
            this.#polyline.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
        }
    
    }

    
    mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLinePos = getMousePos(canvas, event);
        

        // Draw polylines every time the mouse moves. This will help render the polyline.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.beginPath();
        ctx.moveTo(this.#startLinePos[0], this.#startLinePos[1]);
        ctx.lineTo(this. #endLinePos[0], this. #endLinePos[1]);
        ctx.lineWidth = this.#polyline.width;
        ctx.strokeStyle = this.#polyline.color;
        ctx.stroke();
        
        // ctx.clearRect will clear the entire canvas. 
        // the code below will help to permanently animate the lines of the polyline
        if (this.#polyline.coordinates.length > 2) {
            this.#drawer.draw(this.#polyline);
        }
         
    }

    ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this.#polyline.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);

        console.log(this.#polCreatedCallbacks);
        this.#polCreatedCallbacks.forEach(item => item(this.#polyline));
        this.#polyline = new Polyline();
    }

    addPolylineCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback)
    }

}


let obj = { // Черновой объект для тестированяи функциональности
    drawnPolyline: [],

    getDrawnPolyline(polyline) {
        let clone = {...polyline}
        obj.drawnPolygon.push(clone);
        console.log(this.drawnPolyline);
    },

    animate() {

        if (this.drawnPolyline.length > 0) {
    
            for (let i = 0; i < this.drawnPolyline.length; i++) {
                new PolylineDrawer().draw(this.drawnPolyline[i]);
            }
    
        }

        requestAnimationFrame(obj.animation.bind(obj));
    
    }

}


let polylineHandler = new PolylineHandlers();
polylineHandler.addPolylineCreatedEventListener(obj.getDrawnPolyline.bind(obj))


canvas.addEventListener('mousedown', function(event) {polylineHandler.mouseDownHandler(event) });
canvas.addEventListener('mousemove', function(event) {polylineHandler.mouseMoveHandler(event) });
canvas.addEventListener('contextmenu', function(event) {polylineHandler.ctxMenuHandler(event) });

requestAnimationFrame(obj.animation.bind(obj));

