import { canvas, ctx, getMousePos } from '../../editor.js';
import { Circle } from './circle.js'
import { CircleDraw } from './drawer.js'
import HandlerBase from '../handlerBase.js';

export class CircleHandlers extends HandlerBase {
    #isMouseDown = false;
    _figure = new Circle();
    #drawer = new CircleDraw();
    _figureCreatedCallbacks = [];
    #startXY;
    #endXY;

    _mouseDownHandler(event) {
        this.#startXY = getMousePos(canvas, event);
        this._figure.coordinates.push(this.#startXY[0], this.#startXY[1])
        this.#isMouseDown = true;
    }

    _mouseMoveHandler(event) {

        if (!this.#isMouseDown) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);

        if (this._figure.coordinates.length === 2) {
            this._figure.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this._figure.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this._figure);
    }

    _mouseUpHandler(event) {
        this.#isMouseDown = false;
        this.#endXY = getMousePos(canvas, event)
        this._figure.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);

        this._figureCreatedCallbacks.forEach(item => item(this._figure));
        this._figure.coordinates = [];

    }

}
