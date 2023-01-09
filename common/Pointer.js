import HandlerBase from '../figures/handlerBase.js'
import Line from '../figures/Line/line.js';
import Circle from '../figures/Circle/circle.js';
import Ellipse from '../figures/Ellipse/ellipse.js';
import EllipseDrawer from '../figures/Ellipse/drawer.js';
import Polygon from '../figures/Polygon/polygon.js';
import PolygonDrawer from '../figures/Polygon/drawer.js';
import Polyline from '../figures/Polyline/polyline.js';
import PolylineDrawer from '../figures/Polyline/drawer.js';


export default class PointerHandlers extends HandlerBase {
    #ellipseDrawer;
    #polylineDrawer;
    #polygonDrawer;
    #drawnFigures
    #startXY;
    #isInShape;
    #selectedShapeIndex = null;
    #isDragging;

    constructor(canvas, ctx, drawnFigures) {
        super(canvas);
        this._ctx = ctx;
        this.#drawnFigures = drawnFigures;
        this.#ellipseDrawer = new EllipseDrawer(this._ctx);
        this.#polylineDrawer = new PolylineDrawer(this._ctx);
        this.#polygonDrawer = new PolygonDrawer(this._ctx);
    }

    #isMouseInShape(mx, my, figure) { // mouseX, mouseY

        if (figure instanceof Line) { // x1. y1, x2, y2
            let dx1 = figure.coordinates[2] - figure.coordinates[0];
            let dy1 = figure.coordinates[3] - figure.coordinates[1];
            let dx = mx - figure.coordinates[0];
            let dy = my - figure.coordinates[1];
    
            let S = dx1 * dy - dx * dy1;
            let ab = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            let h = S / ab;
    
            if (Math.abs(h) < figure.width / 2) {
                // yes, mouse is inside this line
                return true;
            }
    
    
        } else if (figure instanceof Circle) {
            let dx = mx - figure.avrX;
            let dy = my - figure.avrY;
    
            if(dx*dx+dy*dy<figure.radius*figure.radius){
                return(true);
            }
    
        } else {
            
            if (figure instanceof Ellipse) this.#ellipseDrawer.draw(figure, true);
            if (figure instanceof Polyline) this.#polylineDrawer.draw(figure, true);
            if (figure instanceof Polygon) this.#polygonDrawer.draw(figure, true);

            if (this._ctx.isPointInPath(mx, my)) {
                return (true);
            }
    
        }
    
        return false;
    
    }

    _mouseMoveHandler(event) {
        this.#startXY = this.getMousePos(canvas, event);

        for (let i = 0; i < this.#drawnFigures.length; i++) {
            this.#isInShape = this.#isMouseInShape(this.#startXY[0], this.#startXY[1], this.#drawnFigures[i]);
            
            if (this.#isInShape) {
                this.#selectedShapeIndex = this.#drawnFigures[i];
                break;
            }
        }

        if (this.#isInShape) {
            canvas.style.cursor = 'pointer'; 
        } else {
            canvas.style.cursor = 'default';
        }
        
    }

    
    _mouseDownHandler() {

        if (!this.#selectedShapeIndex) {
            console.log('f');
            return
        }

        this.#isDragging = true;

        // Sets the properties of the selected shape to the page
        lineWidthButton.value = selectedShapeIndex.width;
        lineColorButton.value = selectedShapeIndex.lineColor;
        lineStyleButton.value = selectedShapeIndex.style;

        if (this.#selectedShapeIndex.fillColor) {
            fillColorButton.value = this.#selectedShapeIndex.fillColor;
            isFillButton.checked = true;
        } else {
            isFillButton.checked = false;
            fillColorButton.value = "#e66465";
        }

    }



    


}