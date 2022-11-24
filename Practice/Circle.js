'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
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
            ctx.lineWidth = circle.width;
            ctx.strokeStyle = circle.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = circle.fillColor;
            ctx.fill();

            this.drawBorder(this.#avrX, this.#avrY, this.#radius, circle.lineWidth, circle.lineColor);
        }
    }

    drawBorder(x, y, radius, width, color) { // Сделала публичным метод чтобы использовать его в moveHandler
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
    #startXY;
    #endXY;
    #avrX;
    #avrY;
    #radius;
    #circleCreatedCallbacks = [];

    mouseDownHandler(event) {
        this.#startXY = getMousePos(canvas, event);
        this.#circle.coordinates.push(this.#startXY[0], this.#startXY[1])
        this.#isMouseDown = true;
    }

    mouseMoveHandler(event) {

        if(!this.#isMouseDown) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        this.#endXY = getMousePos(canvas, event);
        this.#avrX = (Math.abs(this.#startXY[0] - this.#endXY[0]) / 2) + Math.min(this.#startXY[0], this.#endXY[0]);
        this.#avrY = (Math.abs(this.#startXY[1] - this.#endXY[1]) / 2) + Math.min(this.#startXY[1], this.#endXY[1]);
        this.#radius = Math.max( Math.abs(this.#startXY[0] - this.#endXY[0]), Math.abs(this.#startXY[1] - this.#endXY[1]) ) / 2;
        
        //this.#circle.isFill = true;

        ctx.beginPath();
        ctx.arc(this.#avrX, this.#avrY, this.#radius, 0, 2 * Math.PI);
        if (!this.#circle.isFill) {
            ctx.lineWidth = this.#circle.width;
            ctx.strokeStyle = this.#circle.lineColor;
            ctx.stroke();
        } else {
            ctx.fillStyle = this.#circle.fillColor;
            ctx.fill();

            new CircleDraw().drawBorder(this.#avrX, this.#avrY, this.#radius, this.#circle.lineWidth, this.#circle.lineColor);
        }
    
    }

    mouseUpHandler(event) {
        this.#isMouseDown = false;
        this.#circle.coordinates.push(this.#endXY[0], this.#endXY[1]);

        this.#circleCreatedCallbacks.forEach(item => item(this.#circle));
        this.#circle = new Circle();

    }

    addCircleCreatedEventListener(callback) {
        this.#circleCreatedCallbacks.push(callback);
    }
}

let circleHandlers = new CircleHandlers();
let testObj = {
    drawnCircles: [],

    getCircle(circle) {
        let clone = {...circle};
        this.drawnCircles.push(clone);
        console.log(this.drawnCircles)
    },

    animation() {

        if (this.drawnCircles.length > 0) {
            
            for (let i = 0; i < this.drawnCircles.length; i++) {
                new CircleDraw().draw(this.drawnCircles[i]);
            }
        }
    }
}

circleHandlers.addCircleCreatedEventListener(testObj.getCircle.bind(testObj))

canvas.addEventListener('mousedown', function(event) { 
    circleHandlers.mouseDownHandler(event);
    testObj.animation();
});
canvas.addEventListener('mousemove', function(event) {
    circleHandlers.mouseMoveHandler(event);
    testObj.animation();
});
canvas.addEventListener('mouseup', function(event) {
    circleHandlers.mouseUpHandler(event)
    testObj.animation();
});
