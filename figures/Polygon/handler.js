import { getMousePos, canvas, ctx } from '../../editor.js';
import { PolygonDrawer } from './drawer.js'
import { Polygon } from './polygon.js'
import HandlerBase from '../handlerBase.js';

export class PolygonHandlers extends HandlerBase {
    #isClick = false;
    #startLinePos;
    #endLinePos;
    _figure = new Polygon();
    _figureCreatedCallbacks = [];
    #drawer = new PolygonDrawer();


    _mouseDownHandler(event) {
        this.#startLinePos = getMousePos(canvas, event);
        this.#isClick = true;
        this._figure.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
    }

    _mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }

        // Draw polygons every time the mouse moves. This will help render the polygons.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endLinePos = getMousePos(canvas, event);

        // As the mouse moves, new finite line coordinates are added. Different pol probabilities are visualized. 
        // As a result, the final coordinates remain, the unnecessary coordinates are removed by splice
        this._figure.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        this.#drawer.draw(this._figure);
        this._figure.coordinates.splice(this._figure.coordinates.length - 2, 2);

    }

    _ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = getMousePos(canvas, event);
        this._figure.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);

        // At this stage, the final look of the figure is ready. 
        // We can save it and send it on request to other functions and classes so that they can work with it. 
        this._figureCreatedCallbacks.forEach(item => item(this._figure));
        this._figure.coordinates = [];

        
    }

}