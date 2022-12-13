'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let lineWidth = document.querySelector('.properties-form-lineWidth');
let lineStyle = document.querySelector('.properties-form-lineType');
let lineColor = document.querySelector('.properties-form-lineColor');
let fillColor = document.querySelector('.properties-form-fillColor');
let isFillButton = document.querySelector('.properties-form-isFill');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

class Circle {

    constructor(coordinates = [], isFill = false, lineWidth = 1, lineColor = 'black', fillColor = 'green', style = 'solid') {
        this.coordinates = coordinates;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
        this.fillColor = fillColor;
        this.lineStyle = style;
        this.isFill = isFill;
    }
}

class CircleDraw {
    #avrX;
    #avrY;
    #radius;

    draw(circle) { // [x1, y1, x2, y2]

        ctx.beginPath();

        if (circle.lineStyle === 'solid') ctx.setLineDash([]);
        if (circle.lineStyle === 'dashed') ctx.setLineDash([20, 7]);
        if (circle.lineStyle === 'dotted') ctx.setLineDash([3, 7]);
        if (circle.lineStyle === 'dash-dotted') ctx.setLineDash([20, 7, 3, 7]);

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
    #circleCreatedCallbacks = [];
    #startXY;
    #endXY;
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

        console.log(this.#circle)
        this.#circleCreatedCallbacks.forEach(item => item(this.#circle));
        this.#circle.coordinates = [];

    }

    addCircleCreatedEventListener(callback) {
        this.#circleCreatedCallbacks.push(callback);
    }

    getUpdateCircleProperties(property, value, isFill) {
        console.log(value)
        this.#circle[property] = value;

        if (isFill === undefined) {
            this.#circle.isFill === true ? this.#circle.isFill = true : this.#circle.isFill = false;
        } else {
            this.#circle.isFill = isFill;
        }

    }
}

let circleHandlers = new CircleHandlers(canvas);
let testObj = {
    drawnCircles: [],

    getCircle(circle) {
        let clone = {...circle};

        if ( !(clone.coordinates[1] === clone.coordinates[3] && clone.coordinates[0] === clone.coordinates[2]) ) { 
            this.drawnCircles.push(clone);
            console.log(this.drawnCircles)
        }
        
    },

    animation() {

        if (this.drawnCircles.length > 0) {
            let drawer = new CircleDraw();
            for (let i = 0; i < this.drawnCircles.length; i++) {
                drawer.draw(this.drawnCircles[i]);
            }
        }

        requestAnimationFrame(testObj.animation.bind(testObj));
    }
}

class Properties {
    
    #FiguresPropUpdateCallbacks = [];

    lineWidthHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineWidth', +lineWidth.value)); 
    }

    lineStyleHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineStyle', lineStyle.value)); 
    }

    lineColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('lineColor', lineColor.value)); 
    }

    fillColorHandler() {
        this.#FiguresPropUpdateCallbacks.forEach(item => item('fillColor', fillColor.value, true)); 
    }

    addLinePropUpdateEventListener(callback) {
        this.#FiguresPropUpdateCallbacks.push(callback);
    }

}

circleHandlers.addCircleCreatedEventListener(testObj.getCircle.bind(testObj));
requestAnimationFrame(testObj.animation.bind(testObj));

let prop = new Properties();

prop.addLinePropUpdateEventListener(circleHandlers.getUpdateCircleProperties.bind(circleHandlers));
lineWidth.addEventListener('change', function() {prop.lineWidthHandler()});
lineStyle.addEventListener('change', function() {prop.lineStyleHandler()});
lineColor.addEventListener('change', function() {prop.lineColorHandler()});
fillColor.addEventListener('change', function() {prop.fillColorHandler()});
