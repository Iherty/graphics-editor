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

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');
let lineButton = document.getElementById('line');
let circleButton = document.getElementById('circle');
let polylineButton = document.getElementById('polyline');
let ellipseButton = document.getElementById('ellipse');
let polygonButton = document.getElementById('polygon');

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

let figuresStoreAnimation = {
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

        requestAnimationFrame(figuresStoreAnimation.animation.bind(figuresStoreAnimation));
    }
}

// Figures
let line = new LineHandlers(canvas);
line.addLineCreatedEventListener(figuresStoreAnimation.getFigure.bind(figuresStoreAnimation));

circleButton.addEventListener('click', remove);
lineButton.addEventListener('click', remove);
polylineButton.addEventListener('click', remove);
ellipseButton.addEventListener('click', remove);
polygonButton.addEventListener('click', remove);

function remove() {
    
    switch(this) {
        case circleButton: let circle = new CircleHandlers(canvas);
        circle.addCircleCreatedEventListener(figuresStoreAnimation.getFigure.bind(figuresStoreAnimation));
        break;

        case lineButton: line = new LineHandlers(canvas); 
        line.addLineCreatedEventListener(figuresStoreAnimation.getFigure.bind(figuresStoreAnimation));
        break;

        case polylineButton: let polyline = new PolylineHandlers(canvas);
        polyline.addPolylineCreatedEventListener(figuresStoreAnimation.getFigure.bind(figuresStoreAnimation));
        break;

        case ellipseButton: let ellipse = new EllipseHandlers(canvas);
        ellipse.addEllipseCreatedEventListener(figuresStoreAnimation.getFigure.bind(figuresStoreAnimation));
        break;

        case polygonButton: let polygon = new PolygonHandlers(canvas);
        polygon.addPolygonCreatedEventListener(figuresStoreAnimation.getFigure.bind(figuresStoreAnimation));

    }
}


requestAnimationFrame(figuresStoreAnimation.animation.bind(figuresStoreAnimation));




export {getMousePos, canvas, ctx, line}