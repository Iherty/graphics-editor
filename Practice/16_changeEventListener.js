'use strict'

let canvas = document.getElementById('canvas'); 
let div = document.getElementById('container'); 
let ctx = canvas.getContext('2d');
let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}


// Class

class Line {

    constructor(coordinates = [], width = 2, color = 'black', style = 'solid') {
        this.coordinates = coordinates;
        this.width = width;
        this.color = color;
        this.style = style;
    }
}

class LineDrawer {

    draw(line) {

        ctx.beginPath();

        if (line.style !== 'solid') {
            if (line.style === 'dashed') ctx.setLineDash([20, 5]);
            if (line.style === 'dotted') ctx.setLineDash([5, 15]);
        }

        ctx.moveTo(line.coordinates[0], line.coordinates[1]);
        ctx.lineTo(line.coordinates[2], line.coordinates[3]);
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        ctx.stroke();
    }
}

class LineHandlers {
    #startXY;
    #endXY;
    #isMouseDown = false;
    #line = new Line();
    #lineCreatedCallbacks = [];
    #drawer = new LineDrawer();
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
        console.log(this)
        this.#startXY = getMousePos(canvas, event);
        this.#isMouseDown = true;
        this.#line.coordinates.push(this.#startXY[0], this.#startXY[1])
    }

    #mouseMoveHandler(event) {
    
        if(!this.#isMouseDown) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);
        
        if (this.#line.coordinates.length === 2) {
            this.#line.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this.#line.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this.#line);

    }

    #mouseUpHandler(event) { 
        this.#isMouseDown = false;
        this.#endXY = getMousePos(canvas, event);
        this.#line.coordinates.push(this.#endXY[0], this.#endXY[1]);

        this.#lineCreatedCallbacks.forEach(item => item(this.#line));
        this.#line = new Line();
    }

    addLineCreatedEventListener(callback) {
        this.#lineCreatedCallbacks.push(callback);
    }
}


class Circle {

    constructor(coordinates = [], isFill = false, lineWidth = 2, lineColor = 'black', fillColor = 'white') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
        this.isFill = isFill;
    }
}

class CircleDraw {
    #avrX;
    #avrY;
    #radius;

    draw(circle) { // [x1, y1, x2, y2]

        ctx.beginPath();
        this.#avrX = (Math.abs(circle.coordinates[0] - circle.coordinates[2]) / 2) + Math.min(circle.coordinates[0], circle.coordinates[2]);
        this.#avrY = (Math.abs(circle.coordinates[1] - circle.coordinates[3]) / 2) + Math.min(circle.coordinates[1], circle.coordinates[3]);
        this.#radius = Math.max(Math.abs(circle.coordinates[0] - circle.coordinates[2]), Math.abs(circle.coordinates[1] - circle.coordinates[3])) / 2;

        ctx.arc(this.#avrX, this.#avrY, this.#radius, 0, 2 * Math.PI);
        if (!circle.isFill) {
            ctx.lineWidth = circle.lineWidth;
            ctx.strokeStyle = circle.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = circle.fillColor;
            ctx.fill();

            this.#drawBorder(this.#avrX, this.#avrY, this.#radius, circle.lineWidth, circle.lineColor);
        }
    }

    #drawBorder(x, y, radius, width, color) { 
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

class CircleHandlers {
    #isMouseDown = false;
    #circle = new Circle();
    #drawer = new CircleDraw();
    #startXY;
    #endXY;
    #circleCreatedCallbacks = [];
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
        this.#circle.coordinates.push(this.#startXY[0], this.#startXY[1])
        this.#isMouseDown = true;
    }

    #mouseMoveHandler(event) {

        if (!this.#isMouseDown) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);

        if (this.#circle.coordinates.length === 2) {
            this.#circle.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this.#circle.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this.#circle);

    }

    #mouseUpHandler(event) {
        this.#isMouseDown = false;
        this.#endXY = getMousePos(canvas, event)
        this.#circle.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);

        this.#circleCreatedCallbacks.forEach(item => item(this.#circle));
        this.#circle = new Circle();

    }

    addCircleCreatedEventListener(callback) {
        this.#circleCreatedCallbacks.push(callback);
    }
}


let testObj = {
    drawnFigures: [],

    getFigure(figure) {

        let clone = {...figure};
        clone = Object.create(figure); // assign Figures prototype to clone;

        if ( !(clone.coordinates[1] === clone.coordinates[3] && clone.coordinates[0] === clone.coordinates[2]) ) { 
            this.drawnFigures.push(clone);
            //console.log(this.drawnFigures)
        }
        
    },

    animation() {

        if (this.drawnFigures.length > 0) {
            let circleDrawer = new CircleDraw();
            let lineDrawer = new LineDrawer();

            for (let i = 0; i < this.drawnFigures.length; i++) {

                if (this.drawnFigures[i] instanceof Line) {
                    lineDrawer.draw(this.drawnFigures[i]);
                } else if (this.drawnFigures[i] instanceof Circle) {
                    circleDrawer.draw(this.drawnFigures[i]);
                }
            
            }
        }

        requestAnimationFrame(testObj.animation.bind(testObj));
    }
}

let lineHandlers = new LineHandlers(canvas);
let circleHandlers;
lineHandlers.addLineCreatedEventListener(testObj.getFigure.bind(testObj));


circleButton.addEventListener('click', removeLine);
lineButton.addEventListener('click', removeCircle);


//Remove functions

function removeLine(toolType) {
    lineHandlers.remove();
    circleHandlers = new CircleHandlers(canvas);
    circleHandlers.addCircleCreatedEventListener(testObj.getFigure.bind(testObj));
}

function removeCircle() {
    circleHandlers.remove();
    lineHandlers = new LineHandlers(canvas);
    lineHandlers.addLineCreatedEventListener(testObj.getFigure.bind(testObj));
}

requestAnimationFrame(testObj.animation.bind(testObj));
