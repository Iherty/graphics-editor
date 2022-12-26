import Polyline  from './polyline.js';
import HandlerBase from '../handlerBase.js';

export default class PolylineHandlers  extends HandlerBase{
    #isClick = false;
    #startLinePos;
    #endLinePos;
    _figure = new Polyline();
    _figureCreatedCallbacks = [];


    _mouseDownHandler(event) {
    
        if (event.button == 0) { // if clicked on the left mouse button
            this.#startLinePos = this.getMousePos(canvas, event);
            this.#isClick = true;
            this._figure.coordinates.push(this.#startLinePos[0], this.#startLinePos[1]);
        }
    
    }

    
    _mouseMoveHandler(event) {

        if (!this.#isClick) {
            return
        }

        // Draw polylines every time the mouse moves. This will help render the polyline.
        // But this will add extra line drawings. Which we remove by ctx.clearRect
        this.#endLinePos = this.getMousePos(canvas, event);
        
        // As the mouse moves, new finite line coordinates are added. Different pol probabilities are visualized. 
        // As a result, the final coordinates remain, the unnecessary coordinates are removed by splice

        if (this._figure.coordinates.length === 2) {
            this._figure.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        } else {
            this._figure.coordinates.splice(this._figure.coordinates.length - 2, 2, this.#endLinePos[0], this.#endLinePos[1]);
        }
         
    }

    _ctxMenuHandler(event) {
        event.preventDefault(); 
        this.#isClick = false;
        this.#endLinePos = this.getMousePos(canvas, event);
        this._figure.coordinates.push(this.#endLinePos[0], this.#endLinePos[1]);
        
        // At this stage, the final look of the figure is ready. 
        // We can save it and send it on request to other functions and classes so that they can work with it. 
        this._figureCreatedCallbacks.forEach(item => item(this._figure));
        this._figure = new Polyline();
    }

}
