import { Line } from './line.js';
import { LineDrawer } from './drawer.js'
import { getMousePos, canvas, ctx } from '../../editor.js';

class LineHandlers {
    #startXY;
    #endXY;
    #isMouseDown = false;
    #line = new Line();
    #lineCreatedCallbacks = [];
    #drawer = new LineDrawer();
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
        this.#isMouseDown = true;
        this.#line.coordinates.push(this.#startXY[0], this.#startXY[1])
    }

    #mouseMoveHandler(event) {
    
        if(!this.#isMouseDown) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#endXY = getMousePos(canvas, event);
        
        if (this.#line.coordinates.length === 2) {
            this.#line.coordinates.push(this.#endXY[0], this.#endXY[1]);
        } else {
            this.#line.coordinates.splice(2, 2, this.#endXY[0], this.#endXY[1])
        }

        this.#drawer.draw(this.#line);
    
    }

    #mouseUpHandler(event) { 
        this.#isMouseDown = false;
        this.#endXY = getMousePos(canvas, event);
        this.#line.coordinates.push(this.#endXY[0], this.#endXY[1]);

        this.#lineCreatedCallbacks.forEach(item => item(this.#line));
        this.#line.coordinates = [];
    }

    addLineCreatedEventListener(callback) {
        this.#lineCreatedCallbacks.push(callback);
    }

}

export { LineHandlers }