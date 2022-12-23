import { Line } from './line.js';
import { LineDrawer } from './drawer.js'
import { getMousePos, canvas, ctx } from '../../editor.js';
import HandlerBase from '../handlerBase.js';

export class LineHandlers extends HandlerBase{
    #startXY;
    #endXY;
    #isMouseDown = false;
    _figure = new Line();
    _figureCreatedCallbacks = [];
    #drawer = new LineDrawer();


    _mouseDownHandler(event) { 
        this.#startXY = getMousePos(canvas, event);
        console.log(this.#startXY)
        this.#isMouseDown = true;
        this._figure.coordinates.push(this.#startXY[0], this.#startXY[1])
    }

    _mouseMoveHandler(event) {
    
        if(!this.#isMouseDown) {
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
        this.#endXY = getMousePos(canvas, event);
        this._figure.coordinates.push(this.#endXY[0], this.#endXY[1]);

        this._figureCreatedCallbacks.forEach(item => item(this._figure));
        this._figure.coordinates = [];
    }

}
