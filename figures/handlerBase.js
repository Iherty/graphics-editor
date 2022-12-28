
export default class HandlerBase {

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

}