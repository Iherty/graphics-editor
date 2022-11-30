'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

class Ellipse {

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor, fillColor) {

        this.coordinates = coordinates;
        this.isFill = isFill;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
    }
}

class EllipseDrawer {
    #avrX;
    #avrY;
    #radiusX;
    #radiusY;

    draw(ellipse) { // [x1, y1, x2, y2]

        this.#avrX = (Math.abs(ellipse.coordinates[0] - ellipse.coordinates[2]) / 2) + Math.min(ellipse.coordinates[0], ellipse.coordinates[2]);
        this.#avrY = (Math.abs(ellipse.coordinates[1] - ellipse.coordinates[3]) / 2) + Math.min(ellipse.coordinates[1], ellipse.coordinates[3]);
        this.#radiusX = Math.abs(this.#avrX - ellipse.coordinates[0]);
        this.#radiusY = Math.abs(this.#avrY - ellipse.coordinates[1]);

        ctx.beginPath();
        ctx.ellipse(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, 0, 0, 2 * Math.PI);

        if (!ellipse.isFill) {
            ctx.lineWidth = ellipse.lineWidth;
            ctx.strokeStyle = ellipse.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = ellipse.fillColor;
            ctx.fill();

            this.#drawBorder(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, ellipse.lineWidth, ellipse.lineColor);
        }

    }

    #drawBorder(x, y, radiusX, radiusY, width, color) {
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 2 * Math.PI);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
 }

class EllipseHandlers {
    #isClick = false;
    #startXY;
    #endXY;
    #ellipse = new Ellipse();
    #drawer = new EllipseDrawer();
    #ellipseCreatedCallbacks = []

    mouseDownHandler(event) {
        this.#startXY = getMousePos(canvas, event);
        this.#ellipse.coordinates.push(this.#startXY[0], this.#startXY[1]);
        this.#isClick = true;
    }

    mouseMoveHandler(event) {
        if (!this.#isClick) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);
        

        if (this.#ellipse.coordinates.length === 2) {
            this.#ellipse.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this.#ellipse.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this.#ellipse);
    }

    mouseUpHandler(event) {
        this.#isClick = false;
        this.#endXY = getMousePos(canvas, event)
        this.#ellipse.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);
        
        this.#ellipse = new Ellipse();
    }

    addCircleCreatedEventListener(callback) {
        this.#ellipseCreatedCallbacks.push(callback);
    }

}

let ellipseHandler = new EllipseHandlers();

canvas.addEventListener('mousedown', function(e) {ellipseHandler.mouseDownHandler(e)});
canvas.addEventListener('mousemove', function(e) {ellipseHandler.mouseMoveHandler(e)});
canvas.addEventListener('mouseup', function(e) {ellipseHandler.mouseUpHandler(e)});