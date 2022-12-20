import { LineHandlers } from './figures/Line/handler.js';
import { LineDrawer } from './figures/Line/drawer.js';
import { Line } from './figures/Line/line.js';
import { CircleHandlers } from './figures/Circle/handler.js'
import { Circle } from './figures/Circle/circle.js';
import { CircleDraw } from './figures/Circle/drawer.js';
import { Polyline } from './figures/Polyline/polyline.js';
import { PolylineDrawer } from './figures/Polyline/drawer.js';
import { PolylineHandlers } from './figures/Polyline/handler.js';
import { Ellipse } from './figures/Ellipse/ellipse.js';
import { EllipseDrawer } from './figures/Ellipse/drawer.js';
import { EllipseHandlers } from './figures/Ellipse/handler.js';
import { PolygonHandlers } from './figures/Polygon/handler.js';
import { Polygon } from './figures/Polygon/polygon.js';
import { PolygonDrawer } from './figures/Polygon/drawer.js';
import PropertiesHandler from './common/Properties.js';

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

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

let testObj = {
    drawnFigures: [],

    getFigure(figure) {

        let clone = {...figure};
        clone.__proto__ = figure.__proto__;

        if ( !(clone.coordinates[1] === clone.coordinates[3] && clone.coordinates[0] === clone.coordinates[2]) ) { 
            this.drawnFigures.push(clone);
        }
        
    },

    animation() {

        if (this.drawnFigures.length > 0) {
            let circleDrawer = new CircleDraw();
            let lineDrawer = new LineDrawer();
            let polylineDrawer = new PolylineDrawer();
            let ellipseDrawer = new EllipseDrawer();
            let polygonDrawer = new PolygonDrawer();

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
        }

        requestAnimationFrame(testObj.animation.bind(testObj));
    }
}

// Figures
let curruntHandler = new LineHandlers(canvas);
curruntHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));

let currentProperties = new PropertiesHandler();
currentProperties.addFigurePropUpdateEventListener(curruntHandler.getUpdateProperties.bind(curruntHandler))

circleButton.addEventListener('click', remove);
lineButton.addEventListener('click', remove);
polylineButton.addEventListener('click', remove);
ellipseButton.addEventListener('click', remove);
polygonButton.addEventListener('click', remove);

lineWidthButton.addEventListener('change', function() {currentProperties.lineWidthHandler()});
lineStyleButton.addEventListener('change', function() {currentProperties.lineStyleHandler()});
lineColorButton.addEventListener('change', function() {currentProperties.lineColorHandler()});
fillColorButton.addEventListener('change', function(e) {currentProperties.fillColorHandler(e)});
isFillButton.addEventListener('click', function(e) {currentProperties.fillColorHandler(e)})


function remove() {
    
    switch(this) {
        case circleButton: curruntHandler = new CircleHandlers(canvas);
        curruntHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
        break;

        case lineButton: curruntHandler = new LineHandlers(canvas); 
        curruntHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
        break;

        case polylineButton: curruntHandler = new PolylineHandlers(canvas);
        curruntHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
        break;

        case ellipseButton: curruntHandler = new EllipseHandlers(canvas);
        curruntHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
        break;

        case polygonButton: curruntHandler = new PolygonHandlers(canvas);
        curruntHandler.addFigureCreatedEventListener(testObj.getFigure.bind(testObj));
    }
    
    currentProperties.addFigurePropUpdateEventListener(curruntHandler.getUpdateProperties.bind(curruntHandler));
    currentProperties.updatePropToCurrent();
}

requestAnimationFrame(testObj.animation.bind(testObj));




export {getMousePos, canvas, ctx, lineWidthButton, lineStyleButton, lineColorButton, fillColorButton, isFillButton }