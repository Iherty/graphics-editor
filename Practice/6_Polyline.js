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
            this.#polyline.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
        }
    
    }

    
    mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }

        // Draw polylines every time the mouse moves. This will help render the polyline.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLinePos = getMousePos(canvas, event);
        
        // As the mouse moves, new finite line coordinates are added. Different pol probabilities are visualized. 
        // As a result, the final coordinates remain, the unnecessary coordinates are removed by splice
        this.#polyline.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        this.#drawer.draw(this.#polyline);
        this.#polyline.coordinates.splice(this.#polyline.coordinates.length - 2, 2);
         
    }

    ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this.#polyline.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        
        
        console.log(this.#polCreatedCallbacks);
        // At this stage, the final look of the figure is ready. 
        // We can save it and send it on request to other functions and classes so that they can work with it. 
        this.#polCreatedCallbacks.forEach(item => item(this.#polyline));
        this.#polyline = new Polyline();
    }

    addPolylineCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback);
    }

}


let obj = { // test obj
    drawnPolyline: [],

    getDrawnPolyline(polyline) {
        let clone = {...polyline}
        obj.drawnPolyline.push(clone);
        console.log(this.drawnPolyline);
    },

    animate() {

        if (this.drawnPolyline.length > 0) {
    
            for (let i = 0; i < this.drawnPolyline.length; i++) {
                new PolylineDrawer().draw(this.drawnPolyline[i]);
            }
    
        }

        requestAnimationFrame(obj.animate.bind(obj));
    
    }

}


let polylineHandler = new PolylineHandlers();
polylineHandler.addPolylineCreatedEventListener(obj.getDrawnPolyline.bind(obj))


canvas.addEventListener('mousedown', function(event) {polylineHandler.mouseDownHandler(event) });
canvas.addEventListener('mousemove', function(event) {polylineHandler.mouseMoveHandler(event) });
canvas.addEventListener('contextmenu', function(event) {polylineHandler.ctxMenuHandler(event) });

requestAnimationFrame(obj.animate.bind(obj));

