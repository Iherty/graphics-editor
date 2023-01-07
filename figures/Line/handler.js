import Line from './line.js';
import HandlerBase from '../handlerBase.js';

export default class LineHandlers extends HandlerBase{
    #startXY;
    #endXY;
    #isMouseDown = false;
    _figure = new Line();
    _figureCreatedCallbacks = [];


    _mouseDownHandler(event) { 
        this.#startXY = this.getMousePos(canvas, event);
        this.#isMouseDown = true;
        this._figure.coordinates.push(this.#startXY[0], this.#startXY[1])
    }

    _mouseMoveHandler(event) {
    
        if(!this.#isMouseDown) {
            return
        }
        
        this.#endXY = this.getMousePos(canvas, event);
        
        if (this.isMoreThanMinDistance(this.#startXY, this.#endXY)) {

            if (this._figure.coordinates.length === 2) {
                this._figure.coordinates.push(this.#endXY[0], this.#endXY[1]);
            } else {
                this._figure.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);
            }

        }
    
    }

    _mouseUpHandler(event) { 
        this.#isMouseDown = false;
        this.#endXY = this.getMousePos(canvas, event);

        if (this.isMoreThanMinDistance(this.#startXY, this.#endXY)) {
            this._figure.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);
        }

        if (this._figure.coordinates.length > 2) this._figureCreatedCallbacks.forEach(item => item(this._figure));
        this._figure.coordinates = [];
    }

}
