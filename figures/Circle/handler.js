import { canvas, ctx, getMousePos } from '../../editor.js';
import { Circle } from './circle.js'
import { CircleDraw } from './drawer.js'

class CircleHandlers {
    #isMouseDown = false;
    #circle = new Circle();
    #drawer = new CircleDraw();
    #circleCreatedCallbacks = [];
    #startXY;
    #endXY;
    #canvas;

    constructor(canvas) {
        this.#canvas = canvas;
        this.#canvas.onmousedown = this.#mouseDownHandler.bind(this);
        this.#canvas.onmousemove = this.#mouseMoveHandler.bind(this);
        this.#canvas.onmouseup = this.#mouseUpHandler.bind(this);
    }

    remove() {
        this.#canvas.onmousedown = null;
        this.#canvas.onmousemove = null;
        this.#canvas.onmouseup = null;
    }

    #mouseDownHandler(event) {
        this.#startXY = getMousePos(canvas, event);
        this.#circle.coordinates.push(this.#startXY[0], this.#startXY[1])
        this.#isMouseDown = true;
    }

    #mouseMoveHandler(event) {

        if (!this.#isMouseDown) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);

        if (this.#circle.coordinates.length === 2) {
            this.#circle.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this.#circle.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this.#circle);
    }

    #mouseUpHandler(event) {
        this.#isMouseDown = false;
        this.#endXY = getMousePos(canvas, event)
        this.#circle.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);

        this.#circleCreatedCallbacks.forEach(item => item(this.#circle));
        this.#circle.coordinates = [];

    }

    addCircleCreatedEventListener(callback) {
        this.#circleCreatedCallbacks.push(callback);
    }

}

export { CircleHandlers }