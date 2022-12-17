import { getMousePos, canvas, ctx } from '../../editor.js';
import { Ellipse } from './ellipse.js';
import { EllipseDrawer } from './drawer.js';


class EllipseHandlers {
    #isClick = false;
    #startXY;
    #endXY;
    #ellipse = new Ellipse();
    #drawer = new EllipseDrawer();
    #ellipseCreatedCallbacks = [];
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
        this.#ellipse.coordinates.push(this.#startXY[0], this.#startXY[1]);
        this.#isClick = true;
    }

    #mouseMoveHandler(event) {
        if (!this.#isClick) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);
        

        if (this.#ellipse.coordinates.length === 2) {
            this.#ellipse.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this.#ellipse.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this.#ellipse);
    }

    #mouseUpHandler(event) {
        this.#isClick = false;
        this.#endXY = getMousePos(canvas, event)
        this.#ellipse.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1]);

        this.#ellipseCreatedCallbacks.forEach(item => item(this.#ellipse));
        this.#ellipse.coordinates = [];
    }

    addEllipseCreatedEventListener(callback) {
        this.#ellipseCreatedCallbacks.push(callback);
    }

}

export { EllipseHandlers }