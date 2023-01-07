
export default class HandlerBase {
    #minDistance = 4;

    constructor(canvas) {
        
        this._canvas = canvas;
        this._canvas.onmousedown = this._mouseDownHandler?.bind(this);
        this._canvas.onmousemove = this._mouseMoveHandler?.bind(this);
        this._canvas.onmouseup = this._mouseUpHandler?.bind(this) || null;
        this._canvas.oncontextmenu = this._ctxMenuHandler?.bind(this) || null;

    }

    removeHandler() {
        this._canvas.onmousedown = null;
        this._canvas.onmousemove = null;
        this._canvas.onmouseup = null;
        this._canvas.oncontextmenu = null;
    }

    addFigureCreatedEventListener(callback) {
        this._figureCreatedCallbacks.push(callback);
    }

    getUpdateProperties(property, value) {
        
        if (this._figure.hasOwnProperty(property)) {
            this._figure[property] = value;
        }

    }

    getMousePos(canvas, event) { 
        let rect = canvas.getBoundingClientRect(); 
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return [x, y];
    }

    isMoreThanMinDistance(startXY, endXY) { // [x1, y1, x2, y2]
        let maxX = Math.max(startXY[0], endXY[0]);
        let minX = Math.min(startXY[0], endXY[0]);
        let maxY = Math.max(startXY[1], endXY[1]);
        let minY = Math.min(startXY[1], endXY[1]);

        if ( (maxX - minX > this.#minDistance) || (maxY - minY > this.#minDistance) ) {
            return true;
        }

        return false;

    }

}