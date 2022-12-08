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

    constructor(coordinates = [], isFill = false, fillColor = 'green', lineColor = 'blue', lineWidth = 3, style = 'solid') {
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
    #polygon = new Polygon();
    #polCreatedCallbacks = [];
    #drawer = new PolygonDrawer();


    mouseDownHandler(event) {
        this.#startLinePos = getMousePos(canvas, event);
        this.#isClick = true;
        this.#polygon.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
    }

    mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLinePos = getMousePos(canvas, event);

        if (this.#polygon.coordinates.length > 1) {

            this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
            this.#drawer.draw(this.#polygon);
            this.#polygon.coordinates.splice(this.#polygon.coordinates.length - 2, 2);

        }


    }

    ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);

        console.log(this.#polCreatedCallbacks);
        this.#polCreatedCallbacks.forEach(item => item(this.#polygon));
        this.#polygon.coordinates = [];
    }

    addPolygonCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback)
    }
}

let id;

let obj = { // Черновой объект для тестированяи функциональности
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

let polygonHandler = new PolygonHandlers();
polygonHandler.addPolygonCreatedEventListener(obj.getDrawnPolygon.bind(obj));

canvas.addEventListener('mousedown', function(event) {polygonHandler.mouseDownHandler(event) });
canvas.addEventListener('mousemove', function(event) {polygonHandler.mouseMoveHandler(event) });
canvas.addEventListener('contextmenu', function(event) {polygonHandler.ctxMenuHandler(event) });

id = requestAnimationFrame(obj.animate.bind(obj));

clearButton.addEventListener('click', obj.clearAnimation.bind(obj))



