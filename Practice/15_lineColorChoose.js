
'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let lineWidth = document.querySelector('.properties-form-lineWidth');
let lineStyle = document.querySelector('.properties-form-lineType');
let lineColor = document.querySelector('.properties-form-lineColor');

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

        if (line.style === 'solid') ctx.setLineDash([]);
        if (line.style === 'dashed') ctx.setLineDash([20, 7]);
        if (line.style === 'dotted') ctx.setLineDash([3, 7]);
        if (line.style === 'dash-dotted') ctx.setLineDash([20, 7, 3, 7]);

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

        console.log(this.#lineCreatedCallbacks)
        this.#lineCreatedCallbacks.forEach(item => item(this.#line));
        this.#line.coordinates = [];
    }

    addLineCreatedEventListener(callback) {
        this.#lineCreatedCallbacks.push(callback);
    }

    getUpdateLineProperties(properties, value) {
        this.#line[properties] = value; // Чтобы не потерять здесь this - добавлен bind при вызове
        console.log(this.#line[properties]);
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

class Properties {
    // #lineWidth;
    // #lineStyle;
    // #lineColor;
    #linePropUpdateCallbacks = [];

    lineWidthHandler() {
        // Название свойства, значение свойства
        // Когда фигура получит, то сможет проверить, что изменилось? Какое свойство фигуры и присвоит ей это значение
        this.#linePropUpdateCallbacks.forEach(item => item('width', +lineWidth.value)); 
    }

    lineStyleHandler() {
        this.#linePropUpdateCallbacks.forEach(item => item('style', lineStyle.value)); 
    }

    lineColorHandler() {
        this.#linePropUpdateCallbacks.forEach(item => item('color', lineColor.value)); 
    }

    addLinePropUpdateEventListener(callback) {
        this.#linePropUpdateCallbacks.push(callback);
        // Коллбеки фигур, которые подписались на обновление. Сохраняются в массиве. При изменении будут вызваны и получат свои значения
    }

}

let prop = new Properties();

prop.addLinePropUpdateEventListener(lineHandlers.getUpdateLineProperties.bind(lineHandlers));
lineWidth.addEventListener('change', function() {prop.lineWidthHandler()});
lineStyle.addEventListener('change', function() {prop.lineStyleHandler()});
lineColor.addEventListener('change', function() {prop.lineColorHandler()});
