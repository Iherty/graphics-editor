import LineHandlers from './figures/Line/handler.js';
import LineDrawer from './figures/Line/drawer.js';
import Line from './figures/Line/line.js';
import CircleHandlers from './figures/Circle/handler.js'
import Circle from './figures/Circle/circle.js';
import CircleDrawer from './figures/Circle/drawer.js';
import Polyline from './figures/Polyline/polyline.js';
import PolylineDrawer from './figures/Polyline/drawer.js';
import PolylineHandlers from './figures/Polyline/handler.js';
import Ellipse from './figures/Ellipse/ellipse.js';
import EllipseDrawer from './figures/Ellipse/drawer.js';
import EllipseHandlers from './figures/Ellipse/handler.js';
import PolygonHandlers from './figures/Polygon/handler.js';
import Polygon from './figures/Polygon/polygon.js';
import PolygonDrawer from './figures/Polygon/drawer.js';
import PropertiesHandler from './common/Properties.js';
import PointerHandlers from './common/Pointer.js';

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');

let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');
let polylineButton = document.getElementById('polyline');
let ellipseButton = document.getElementById('ellipse');
let polygonButton = document.getElementById('polygon');
let lineWidthButton = document.querySelector('.properties-form-lineWidth');
let lineStyleButton = document.querySelector('.properties-form-lineType');
let lineColorButton = document.querySelector('.properties-form-lineColor');
let fillColorButton = document.querySelector('.properties-form-fillColor');
let isFillButton = document.querySelector('.properties-form-isFill');
let clearButton = document.getElementById('clearCanvas');
let pointerButton = document.getElementById('pointer');

let circleDrawer = new CircleDrawer(ctx);
let lineDrawer = new LineDrawer(ctx);
let polylineDrawer = new PolylineDrawer(ctx);
let ellipseDrawer = new EllipseDrawer(ctx);
let polygonDrawer = new PolygonDrawer(ctx);
// let pointer = new PointerHandlers(canvas, ctx);


let testObj = {
    drawnFigures: [],
    cache: [],

    getFigure(figure) {

        let clone = {...figure};
        clone.__proto__ = figure.__proto__;

        console.log(clone)
        
        if ( !(clone.coordinates[1] === clone.coordinates[3] && clone.coordinates[0] === clone.coordinates[2]) ) { 
            this.drawnFigures.push(clone);

            // Массив с координатами coordinates Array(34) length 34. Юзер в начале много раз нажимал одну точку, только потом начал рисовать.
            // Данная проверка в if смотрит только на первые 4 координата. И если они одинаковы, то не пушит в массив
        }
        
    },

    animation() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redrawing all drawn figures
        for (let i = 0; i < this.drawnFigures.length; i++) {

            if (this.drawnFigures[i] instanceof Line) {
                lineDrawer.draw(this.drawnFigures[i]);
            } else if (this.drawnFigures[i] instanceof Circle) {
                circleDrawer.draw(this.drawnFigures[i]);
            } else if (this.drawnFigures[i] instanceof Polyline) {
                polylineDrawer.draw(this.drawnFigures[i]);
            } else if (this.drawnFigures[i] instanceof Ellipse) {
                ellipseDrawer.draw(this.drawnFigures[i])
            } else if (this.drawnFigures[i] instanceof Polygon) {
                polygonDrawer.draw(this.drawnFigures[i])
            }
        }

        // Redrawing frames of the current figure
        if (currentHandler._figure?.coordinates.length > 0) {

            if (currentHandler._figure instanceof Line) {
                lineDrawer.draw(currentHandler._figure);
            } else if (currentHandler._figure instanceof Circle) {
                circleDrawer.draw(currentHandler._figure);
            } else if (currentHandler._figure instanceof Polyline) {
                polylineDrawer.draw(currentHandler._figure);
            } else if (currentHandler._figure instanceof Ellipse) {
                ellipseDrawer.draw(currentHandler._figure)
            } else if (currentHandler._figure instanceof Polygon) {
                polygonDrawer.draw(currentHandler._figure)
            }
            
        }

        requestAnimationFrame(testObj.animation.bind(testObj));
    },

    clearAnimation() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.cache.push(this.drawnPolygon);
        this.drawnFigures = [];

    }
}

// Run default figure, Properties, currentButton 
let currentHandler = new LineHandlers(canvas);
let currentProperties = new PropertiesHandler();
let currentButton = lineButton;

// Add EventListener which is push createdFigure to testObj.drawnFigures.
currentHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));


// Add EventListener which is push newProperties to currentFigureHandler
currentProperties.addFigurePropUpdateEventListener(currentHandler.getUpdateProperties.bind(currentHandler))

// Run PropertiesEventListener
lineWidthButton.addEventListener('change', function() {currentProperties.lineWidthHandler(lineWidthButton)});
lineStyleButton.addEventListener('change', function() {currentProperties.lineStyleHandler(lineStyleButton)});
lineColorButton.addEventListener('change', function() {currentProperties.lineColorHandler(lineColorButton)});
fillColorButton.addEventListener('change', function(e) {currentProperties.fillColorHandler(e, isFillButton, fillColorButton)});
isFillButton.addEventListener('click', function(e) {currentProperties.fillColorHandler(e, isFillButton, fillColorButton)})


// Switch buttons
circleButton.addEventListener('click', remove);
lineButton.addEventListener('click', remove);
polylineButton.addEventListener('click', remove);
ellipseButton.addEventListener('click', remove);
polygonButton.addEventListener('click', remove);
clearButton.addEventListener('click', remove)
pointerButton.addEventListener('click', remove);


function remove() {

    currentButton.style.backgroundColor = null;

    switch (this) {
        case circleButton: currentHandler = new CircleHandlers(canvas);
            currentHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
            currentButton = circleButton;
            break;

        case lineButton: currentHandler = new LineHandlers(canvas);
            currentHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
            currentButton = lineButton;
            break;

        case polylineButton: currentHandler = new PolylineHandlers(canvas);
            currentHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
            currentButton = polylineButton;
            break;

        case ellipseButton: currentHandler = new EllipseHandlers(canvas);
            currentHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
            currentButton = ellipseButton;
            break;

        case polygonButton: currentHandler = new PolygonHandlers(canvas);
            currentHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
            currentButton = polygonButton;
            break;

        case clearButton:
            testObj.clearAnimation.bind(testObj)();
            currentButton = clearButton;
            break;

        case pointerButton:
            currentHandler.removeHandler();
            currentHandler = new PointerHandlers(canvas, ctx, testObj.drawnFigures);
            currentButton = pointerButton;
    }

    if (this !== pointerButton) {
        currentProperties.addFigurePropUpdateEventListener(currentHandler.getUpdateProperties.bind(currentHandler));
        currentProperties.updatePropToCurrent();
    }

    currentButton.style.backgroundColor = '#6601fe';
}


// Animation func
requestAnimationFrame(testObj.animation.bind(testObj));



