'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let polygonButton = document.getElementById('polygon');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

class Polygon {

    constructor(coordinates = [], isFill = false, fillColor = 'white', lineColor = 'black', lineWidth = 1, style = 'solid') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.style = style;
        this.isFill = isFill;
        this.fillColor = fillColor;
    }
}

class PolygonDrawer {
    #clone;

    draw(polygon, isClosePath = true) { // [x1, y1, x2, y2]
        
        ctx.beginPath();

        if (polygon.style !== 'solid') {
            if (polygon.style === 'dashed') ctx.setLineDash([20, 5]);
            if (polygon.style === 'dotted') ctx.setLineDash([5, 15]);
        }

        for (let i = 0; i < polygon.coordinates.length;) {
            ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        if (isClosePath) ctx.closePath();

        if (!polygon.isFill) {
            ctx.lineWidth = polygon.lineWidth;
            ctx.strokeStyle = polygon.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = polygon.fillColor;
            ctx.fill();

            this.#drawBorder(polygon);
        }

    }

    #drawBorder(p) {
        this.#clone = {...p};
        this.#clone.isFill = false;
        new PolygonDrawer().draw(this.#clone);
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

        ctx.beginPath();
        ctx.moveTo(this.#startLinePos[0], this.#startLinePos[1]);
        ctx.lineTo(this. #endLinePos[0], this. #endLinePos[1]);

        if (this.#polygon.coordinates.length > 2) {
            ctx.lineTo(this.#polygon.coordinates[0], this.#polygon.coordinates[1])
        }

        ctx.lineWidth = this.#polygon.lineWidth;
        ctx.strokeStyle = this.#polygon.color;
        ctx.stroke();

        if (this.#polygon.coordinates.length > 2) {
            this.#drawer.draw(this.#polygon, false);
        }


    }

    ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);

        console.log(this.#polCreatedCallbacks);
        this.#polCreatedCallbacks.forEach(item => item(this.#polygon));
        this.#polygon = new Polygon();
    }

    addPolygonCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback)
    }
}

let obj = { // Черновой объект для тестированяи функциональности
    drawnPolygon: [],

    getDrawnPolygon(polyline) {
        let clone = {...polyline}
        obj.drawnPolygon.push(clone);
        console.log(this.drawnPolygon);
    },

    animate() {

        if (this.drawnPolygon.length > 0) {
    
            for (let i = 0; i < this.drawnPolygon.length; i++) {
                new PolygonDrawer().draw(this.drawnPolygon[i]);
            }
    
        }
        
        requestAnimationFrame(obj.animate.bind(obj));
    }

}

let polygonHandler = new PolygonHandlers();
polygonHandler.addPolygonCreatedEventListener(obj.getDrawnPolygon.bind(obj));

canvas.addEventListener('mousedown', function(event) {polygonHandler.mouseDownHandler(event) });
canvas.addEventListener('mousemove', function(event) {polygonHandler.mouseMoveHandler(event) });
canvas.addEventListener('contextmenu', function(event) {polygonHandler.ctxMenuHandler(event) });

requestAnimationFrame(obj.animate.bind(obj));

