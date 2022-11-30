'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');
let polylineButton = document.getElementById('polyline');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}


// Class

class Line {

    constructor(coordinates = [], width = 1, color = 'black', style = 'solid') {
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

    mouseDownHandler(event) { 
        this.#startXY = getMousePos(canvas, event);
        this.#isMouseDown = true;
        this.#line.coordinates.push(this.#startXY[0], this.#startXY[1])
    }

    mouseMoveHandler(event) {
    
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

    mouseUpHandler(event) { 
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

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor = 'black', fillColor = 'white') {
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

    mouseDownHandler(event) {
        this.#startXY = getMousePos(canvas, event);
        this.#circle.coordinates.push(this.#startXY[0], this.#startXY[1])
        this.#isMouseDown = true;
    }

    mouseMoveHandler(event) {

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

    mouseUpHandler(event) {
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

        this.#polCreatedCallbacks.forEach(item => item(this.#polyline));
        this.#polyline = new Polyline();
    }

    addPolylineCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback)
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
            let polylineDrawer = new PolylineDrawer();

            for (let i = 0; i < this.drawnFigures.length; i++) {

                if (this.drawnFigures[i] instanceof Line) {
                    //console.log('line');
                    lineDrawer.draw(this.drawnFigures[i]);
                } else if (this.drawnFigures[i] instanceof Circle) {
                    circleDrawer.draw(this.drawnFigures[i]);
                    //console.log('circle');
                } else if (this.drawnFigures[i] instanceof Polyline) {
                    polylineDrawer.draw(this.drawnFigures[i]);
                }
            
            }
        }

        requestAnimationFrame(testObj.animation.bind(testObj));
    }
}

let lineHandlers = new LineHandlers();
let circleHandlers = new CircleHandlers();
let polylineHandler = new PolylineHandlers();

circleHandlers.addCircleCreatedEventListener(testObj.getFigure.bind(testObj));
lineHandlers.addLineCreatedEventListener(testObj.getFigure.bind(testObj));
polylineHandler.addPolylineCreatedEventListener(testObj.getFigure.bind(testObj));

canvas.addEventListener('mousedown', lineDownHandler);
canvas.addEventListener('mouseup', lineUpHandler)
canvas.addEventListener('mousemove', lineMoveHandler);

requestAnimationFrame(testObj.animation.bind(testObj));

circleButton.addEventListener('click', removeLine);
lineButton.addEventListener('click', removeCircle);
polylineButton.addEventListener('click', remove);

function removeLine() {
    canvas.removeEventListener('mousedown',  lineDownHandler);
    canvas.removeEventListener('mouseup', lineUpHandler);
    canvas.removeEventListener('mousemove', lineMoveHandler);
    canvas.removeEventListener('mousedown', polylineDownHandler);
    canvas.removeEventListener('mousemove',  polylineMoveHandler);
    canvas.removeEventListener('contextmenu', polylineCtxHandler);

    canvas.addEventListener('mousedown', circleDownHandler)
    canvas.addEventListener('mouseup', circleUpHandler);
    canvas.addEventListener('mousemove', circleMoveHandler);

}

function removeCircle() {
    canvas.removeEventListener('mousedown', circleDownHandler);
    canvas.removeEventListener('mouseup', circleUpHandler);
    canvas.removeEventListener('mousemove', circleMoveHandler);
    canvas.removeEventListener('mousedown', polylineDownHandler);
    canvas.removeEventListener('mousemove',  polylineMoveHandler);
    canvas.removeEventListener('contextmenu', polylineCtxHandler);

    canvas.addEventListener('mousedown', lineDownHandler);
    canvas.addEventListener('mouseup', lineUpHandler);
    canvas.addEventListener('mousemove', lineMoveHandler);
}

function remove() {
    canvas.removeEventListener('mousedown', circleDownHandler);
    canvas.removeEventListener('mouseup', circleUpHandler);
    canvas.removeEventListener('mousemove', circleMoveHandler);
    canvas.removeEventListener('mousedown',  lineDownHandler);
    canvas.removeEventListener('mouseup', lineUpHandler);
    canvas.removeEventListener('mousemove', lineMoveHandler);

    canvas.addEventListener('mousedown', polylineDownHandler);
    canvas.addEventListener('mousemove',  polylineMoveHandler);
    canvas.addEventListener('contextmenu', polylineCtxHandler);

}

function polylineDownHandler(event) {
    polylineHandler.mouseDownHandler(event)
}

function polylineMoveHandler(event) {
    polylineHandler.mouseMoveHandler(event);
}

function polylineCtxHandler(event) {
    polylineHandler.ctxMenuHandler(event)
}

function circleDownHandler(event) {
    circleHandlers.mouseDownHandler(event);
}

function circleMoveHandler(event) {
    circleHandlers.mouseMoveHandler(event);
}

function circleUpHandler(event) {
    circleHandlers.mouseUpHandler(event)
}

function lineDownHandler(event) {
    lineHandlers.mouseDownHandler(event)
}

function lineUpHandler(event) {
    lineHandlers.mouseUpHandler(event)
}

function lineMoveHandler(event) {
    lineHandlers.mouseMoveHandler(event)
}