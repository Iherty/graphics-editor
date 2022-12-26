
import Line from './figures/Line/line.js';
import Circle from './figures/Circle/circle.js';
import LineDrawer from './figures/Line/drawer.js';
import CircleDrawer from './figures/Circle/drawer.js';
import Ellipse from './figures/Ellipse/ellipse.js';
import EllipseDrawer from './figures/Ellipse/drawer.js';
import Polygon from './figures/Polygon/polygon.js';
import PolygonDrawer from './figures/Polygon/drawer.js';
import Polyline from './figures/Polyline/polyline.js';
import PolylineDrawer from './figures/Polyline/drawer.js';


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let line = new Line([563.3500003814697, 129, 559.3500003814697, 310, 559.3500003814697, 310]);
let circle = new Circle([603.3500003814697, 435, 554.3500003814697, 347]);
let ellipse = new Ellipse([200, 56, 96, 70])
let polyline = new Polyline([100, 350, 20, 380, 15, 150]);
let polygon = new Polygon([280, 300, 310, 300, 320, 210])
let circleDrawer = new CircleDrawer(ctx);
let lineDrawer = new LineDrawer(ctx);
let polylineDrawer = new PolylineDrawer(ctx);
let ellipseDrawer = new EllipseDrawer(ctx);
let polygonDrawer = new PolygonDrawer(ctx);


let lineWidth = 2;


let shapes = [];
shapes.push(line, polyline);
shapes.push(circle);
shapes.push(ellipse, polygon)

// Vars for dragging
let startxy;
let isDragging = false;
let selectedShapeIndex;

drawAll(shapes)

function isMouseInShape(mx, my, shape) { // mouseX, mouseY

    if (shape instanceof Line) { // x1. y1, x2, y2
        let coordinates = shape.coordinates;

        let dx1 = coordinates[2] - coordinates[0];
        let dy1 = coordinates[3] - coordinates[1];
        let dx = mx - coordinates[0];
        let dy = my - coordinates[1];

        let S = dx1 * dy - dx * dy1;
        let ab = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        let h = S / ab;

        if (Math.abs(h) < lineWidth / 2) {
            return true;
        }


    } else if (shape instanceof Circle) {
        let dx = mx - shape.avrX;
        let dy = my - shape.avrY;

        if(dx*dx+dy*dy<shape.radius*shape.radius){
            // yes, mouse is inside this circle
            return(true);
        }

    } else if (shape instanceof Ellipse) {
        ellipseDrawer.draw(ellipse, true);

        if (ctx.isPointInPath(mx, my)) {
            return (true);
        }

    } else if (shape instanceof Polyline) {
        polylineDrawer.draw(polyline, true)

        if (ctx.isPointInPath(mx, my)) {
            return (true);
        }

    } else if (shape instanceof Polygon) {
        polygonDrawer.draw(polygon, true)

        if (ctx.isPointInPath(mx, my)) {
            return (true);
        }
    }

    return false;

}

function getMousePos(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y]
}

function drawAll(shapes) {

    for (let i = 0; i < shapes.length; i++) {
        
        if (shapes[i] instanceof Line) {
            lineDrawer.draw(shapes[i])
        } else if (shapes[i] instanceof Circle) {
            circleDrawer.draw(shapes[i])
        } else if (shapes[i] instanceof Ellipse) {
            ellipseDrawer.draw(shapes[i]);
        } else if (shapes[i] instanceof Polyline) {
            polylineDrawer.draw(shapes[i]);
        } else if (shapes[i] instanceof Polygon) {
            polygonDrawer.draw(shapes[i]);
        }
    }
}

canvas.addEventListener('mousemove', function(event) {
    startxy = getMousePos(canvas, event);
    let overLine = isMouseInShape(startxy[0], startxy[1], line);
    let overCircle = isMouseInShape(startxy[0], startxy[1], circle);
    let overEllipse = isMouseInShape(startxy[0], startxy[1], ellipse);
    let overPolyl = isMouseInShape(startxy[0], startxy[1], polyline);
    let overPolyg = isMouseInShape(startxy[0], startxy[1], polygon);

    if (overLine || overCircle || overEllipse || overPolyl || overPolyg) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default'
    }

})








