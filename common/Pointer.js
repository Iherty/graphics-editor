import HandlerBase from '../figures/handlerBase.js'
import Line from '../figures/Line/line.js';
import Circle from '../figures/Circle/circle.js';
import LineDrawer from '../figures/Line/drawer.js';
import CircleDrawer from '../figures/Circle/drawer.js';
import Ellipse from '../figures/Ellipse/ellipse.js';
import EllipseDrawer from '../figures/Ellipse/drawer.js';
import Polygon from '../figures/Polygon/polygon.js';
import PolygonDrawer from '../figures/Polygon/drawer.js';
import Polyline from '../figures/Polyline/polyline.js';
import PolylineDrawer from '../figures/Polyline/drawer.js';


export default class PointerHandler extends HandlerBase {
    #ellipseDrawer;
    #polylineDrawer;
    #polygonDrawer;
    #startXY;
    #inShape;
    #selectedShapeIndex;

    constructor(canvas, ctx) {
        super(canvas);
        this._ctx = ctx;
        this.#ellipseDrawer = new EllipseDrawer(this._ctx);
        this.#polylineDrawer = new PolylineDrawer(this._ctx);
        this.#polygonDrawer = new PolygonDrawer(this._ctx);
    }

    #isMouseInShape(mx, my, shape) { // mouseX, mouseY

        if (shape instanceof Line) { // x1. y1, x2, y2
            let dx1 = shape.coordinates[2] - shape.coordinates[0];
            let dy1 = shape.coordinates[3] - shape.coordinates[1];
            let dx = mx - shape.coordinates[0];
            let dy = my - shape.coordinates[1];
    
            let S = dx1 * dy - dx * dy1;
            let ab = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            let h = S / ab;
    
            if (Math.abs(h) < shape.width / 2) {
                // yes, mouse is inside this line
                return true;
            }
    
    
        } else if (shape instanceof Circle) {
            let dx = mx - shape.avrX;
            let dy = my - shape.avrY;
    
            if(dx*dx+dy*dy<shape.radius*shape.radius){
                return(true);
            }
    
        } else if (shape instanceof Ellipse) {
            
            this.#ellipseDrawer.draw(shape, true);
            
            if (this._ctx.isPointInPath(mx, my)) {
                return (true);
            }
    
        } else if (shape instanceof Polyline) {
            this.#polylineDrawer.draw(shape, true)
    
            if (this._ctx.isPointInPath(mx, my)) {
                return (true);
            }
    
        } else if (shape instanceof Polygon) {
            this.#polygonDrawer.draw(shape, true)
    
            if (this._ctx.isPointInPath(mx, my)) {
                return (true);
            }
        }
    
        return false;
    
    }

    renderPointerHandler(event, drawnFigures) {
        this.#startXY = this.getMousePos(canvas, event);
        
        for (let i = 0; i < drawnFigures.length; i++) {
            this.#inShape = this.#isMouseInShape(this.#startXY[0], this.#startXY[1], drawnFigures[i]);
            
            if (this.#inShape) {
                this.#selectedShapeIndex = drawnFigures[i];
                break;
            }
        }

        if (this.#inShape) {
            canvas.style.cursor = 'pointer';
            
        } else {
            canvas.style.cursor = 'default';
        }
    }
    

}