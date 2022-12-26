import Circle from './circle.js'
import HandlerBase from '../handlerBase.js';

export default class CircleHandlers extends HandlerBase {
    #isMouseDown = false;
    _figure = new Circle();
    _figureCreatedCallbacks = [];
    #startXY;
    #endXY;

    _mouseDownHandler(event) {
        this.#startXY = this.getMousePos(canvas, event);
        this._figure.coordinates.push(this.#startXY[0], this.#startXY[1])
        this.#isMouseDown = true;
    }

    _mouseMoveHandler(event) {

        if (!this.#isMouseDown) {
            return
        }

        this.#endXY = this.getMousePos(canvas, event);

        if (this._figure.coordinates.length === 2) {
            this._figure.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this._figure.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

    }

    _mouseUpHandler(event) {
        this.#isMouseDown = false;
        this.#endXY = this.getMousePos(canvas, event)
        this._figure.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);

        this._figureCreatedCallbacks.forEach(item => item(this._figure));
        this._figure.coordinates = [];

    }

}
