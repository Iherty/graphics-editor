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

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor = 'black', fillColor = 'green') {
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

            this.#drawBorder(this.#avrX, this.#avrY, this.#radiusX, this.#radiusY, ellipse);
        }

    }

    #drawBorder(x, y, radiusX, radiusY, ellipse) {
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.lineWidth = ellipse.lineWidth
        ctx.strokeStyle = ellipse.lineColor;
        ctx.stroke();
    }
 }

class EllipseHandlers {
    #isClick = false;
    #startXY;
    #endXY;
    #ellipse = new Ellipse();
    #drawer = new EllipseDrawer();
    #ellipseCreatedCallbacks = [];
    #canvas;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#canvas.onmousedown = this.#mouseDownHandler.bind(this);
        this.#canvas.onmousemove = this.#mouseMoveHandler.bind(this);
        this.#canvas.onmouseup = this.#mouseUpHandler.bind(this);
    }

    remove() {
        this.#canvas.onmousedown = null;
        this.#canvas.onmousemove = null;
        this.#canvas.onmouseup = null;
    }

    #mouseDownHandler(event) {
        this.#startXY = getMousePos(canvas, event);
        this.#ellipse.coordinates.push(this.#startXY[0], this.#startXY[1]);
        this.#isClick = true;
    }

    #mouseMoveHandler(event) {
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

    #mouseUpHandler(event) {
        this.#isClick = false;
        this.#endXY = getMousePos(canvas, event)
        this.#ellipse.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);
        this.#ellipse.coordinates = [];
    }

    addCircleCreatedEventListener(callback) {
        this.#ellipseCreatedCallbacks.push(callback);
    }

}

let ellipseHandler = new EllipseHandlers(canvas);

