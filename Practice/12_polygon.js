'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let polygonButton = document.getElementById('polygon');
let clearButton = document.getElementById('clearCanvas');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

class Polygon {

    constructor(coordinates = [], isFill = false, fillColor = 'green', lineColor = 'blue', lineWidth = 1, style = 'solid') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.style = style;
        this.isFill = isFill;
        this.fillColor = fillColor;
    }
}

class PolygonDrawer {

    draw(polygon) { // [x1, y1, x2, y2]
        
        ctx.beginPath();

        if (polygon.style !== 'solid') {
            if (polygon.style === 'dashed') ctx.setLineDash([20, 5]);
            if (polygon.style === 'dotted') ctx.setLineDash([5, 15]);
        }

        for (let i = 0; i < polygon.coordinates.length;) {
            ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.closePath();
        ctx.lineWidth = polygon.lineWidth;
        ctx.strokeStyle = polygon.lineColor;
        ctx.stroke();

        if (polygon.isFill) {
            this.#fillPolygon(polygon);
        }

    }
    
    #fillPolygon(polygon) {
    
        ctx.beginPath();

        for (let i = 0; i < polygon.coordinates.length;) {
            ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.closePath();
        ctx.fillStyle = polygon.fillColor;
        ctx.fill();
    }
}

class PolygonHandlers {
    #isClick = false;
    #startLinePos;
    #endLinePos;
    #polygon = new Polygon([], true);
    #polCreatedCallbacks = [];
    #drawer = new PolygonDrawer();
    #canvas;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#canvas.onmousedown = this.#mouseDownHandler.bind(this);
        this.#canvas.onmousemove = this.#mouseMoveHandler.bind(this);
        this.#canvas.oncontextmenu = this.#ctxMenuHandler.bind(this);
    }

    remove() {
        this.#canvas.onmousedown = null;
        this.#canvas.onmousemove = null;
        this.#canvas.oncontextmenu = null;
    }


    #mouseDownHandler(event) {
        this.#startLinePos = getMousePos(canvas, event);
        this.#isClick = true;
        this.#polygon.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
    }

    #mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }

        // Draw polygons every time the mouse moves. This will help render the polygons.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLinePos = getMousePos(canvas, event);

        // As the mouse moves, new finite line coordinates are added. Different pol probabilities are visualized. 
        // As a result, the final coordinates remain, the unnecessary coordinates are removed by splice
        this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        this.#drawer.draw(this.#polygon);
        this.#polygon.coordinates.splice(this.#polygon.coordinates.length - 2, 2);

    }

    #ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);

        // At this stage, the final look of the figure is ready. 
        // We can save it and send it on request to other functions and classes so that they can work with it. 
        console.log(this.#polCreatedCallbacks);
        this.#polCreatedCallbacks.forEach(item => item(this.#polygon));
        this.#polygon.coordinates = [];

        
    }

    addPolygonCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback)
    }
}

let id;

let obj = { // test object
    drawnPolygon: [],
    cache: [],

    getDrawnPolygon(polyline) {
        let clone = {...polyline}
        this.drawnPolygon.push(clone);
        console.log(this.drawnPolygon);
    },

    animate() {
        
        if (this.drawnPolygon.length > 0) {
            let draw = new PolygonDrawer();

            for (let i = 0; i < this.drawnPolygon.length; i++) {
                draw.draw(this.drawnPolygon[i]);
            }
    
        }
        
        id = requestAnimationFrame(obj.animate.bind(obj));
    },

    clearAnimation() {
        cancelAnimationFrame(id);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.cache.push(this.drawnPolygon);
        this.drawnPolygon = [];
        id = requestAnimationFrame(obj.animate.bind(obj));
    }

}

let polygonHandler = new PolygonHandlers(canvas);
polygonHandler.addPolygonCreatedEventListener(obj.getDrawnPolygon.bind(obj));


id = requestAnimationFrame(obj.animate.bind(obj));

clearButton.addEventListener('click', obj.clearAnimation.bind(obj))



