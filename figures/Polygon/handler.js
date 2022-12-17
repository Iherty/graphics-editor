import { getMousePos, canvas, ctx } from '../../editor.js';
import { PolygonDrawer } from './drawer.js'
import { Polygon } from './polygon.js'

class PolygonHandlers {
    #isClick = false;
    #startLinePos;
    #endLinePos;
    #polygon = new Polygon();
    #polCreatedCallbacks = [];
    #drawer = new PolygonDrawer();
    #canvas;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#canvas.onmousedown = this.#mouseDownHandler.bind(this);
        this.#canvas.onmousemove = this.#mouseMoveHandler.bind(this);
        this.#canvas.oncontextmenu = this.#ctxMenuHandler.bind(this);
    }

    remove() {
        this.#canvas.onmousedown = null;
        this.#canvas.onmousemove = null;
        this.#canvas.oncontextmenu = null;
    }


    #mouseDownHandler(event) {
        this.#startLinePos = getMousePos(canvas, event);
        this.#isClick = true;
        this.#polygon.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
    }

    #mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }

        // Draw polygons every time the mouse moves. This will help render the polygons.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLinePos = getMousePos(canvas, event);

        // As the mouse moves, new finite line coordinates are added. Different pol probabilities are visualized. 
        // As a result, the final coordinates remain, the unnecessary coordinates are removed by splice
        this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        this.#drawer.draw(this.#polygon);
        this.#polygon.coordinates.splice(this.#polygon.coordinates.length - 2, 2);

    }

    #ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this.#polygon.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);

        // At this stage, the final look of the figure is ready. 
        // We can save it and send it on request to other functions and classes so that they can work with it. 
        this.#polCreatedCallbacks.forEach(item => item(this.#polygon));
        this.#polygon.coordinates = [];

        
    }

    addPolygonCreatedEventListener(callback) {
        this.#polCreatedCallbacks.push(callback)
    }
}

export { PolygonHandlers }