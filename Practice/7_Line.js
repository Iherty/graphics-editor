'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

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

        // ctx.beginPath();
        // ctx.moveTo(this.#startXY[0], this.#startXY[1]);
        // ctx.lineTo(this.#endXY[0], this.#endXY[1]);
        // ctx.lineWidth = this.#line.width;
        // ctx.strokeStyle = this.#line.color;
        // ctx.stroke();
    
    }

    mouseUpHandler(event) { 
        this.#isMouseDown = false;
        this.#endXY = getMousePos(canvas, event);
        this.#line.coordinates.push(this.#endXY[0], this.#endXY[1]);

        console.log(this.#lineCreatedCallbacks)
        this.#lineCreatedCallbacks.forEach(item => item(this.#line));
        this.#line = new Line();
    }

    addLineCreatedEventListener(callback) {
        this.#lineCreatedCallbacks.push(callback);
    }
}

let lineHandlers = new LineHandlers();
let testObj = {
    drawnLines: [],

    getLine(line) {
        let clone = {...line};

        if ( !(clone.coordinates[1] === clone.coordinates[3] && clone.coordinates[0] === clone.coordinates[2]) ) {
            this.drawnLines.push(clone);
            console.log(this.drawnLines)
        }
    
    },

    animation() {

        if (this.drawnLines.length > 0) {
            
            for (let i = 0; i < this.drawnLines.length; i++) {
                new LineDrawer().draw(this.drawnLines[i]);
            }
        }

        requestAnimationFrame(testObj.animation.bind(testObj));
    }
}

lineHandlers.addLineCreatedEventListener(testObj.getLine.bind(testObj));

canvas.addEventListener('mousedown', function(event) {lineHandlers.mouseDownHandler(event)});
canvas.addEventListener('mouseup', function(event) {lineHandlers.mouseUpHandler(event)})
canvas.addEventListener('mousemove', function(event) {lineHandlers.mouseMoveHandler(event)});

requestAnimationFrame(testObj.animation.bind(testObj));