'use strict'

let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext('2d');

class Canvas {
    static savedPos = [];

    getMousePos(canvas, event) {
        let rect = canvas.getBoundingClientRect(); 
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return [x, y]
    }

    savePositions() {
        Canvas.savedPos.push(canvas.startPosX);
        Canvas.savedPos.push(canvas.startPosY);
        Canvas.savedPos.push(canvas.endPosXY[0]);
        Canvas.savedPos.push(canvas.endPosXY[1]);
    }

    assignPosFig() {
        this.startPosX = Canvas.savedPos[0];
        this.startPosY = Canvas.savedPos[1];
        this.endPosX = Canvas.savedPos[2];
        this.endPosY = Canvas.savedPos[3]
    }

}


class Line extends Canvas {

    constructor() {
        super(...arguments);
    }

    lineMouseDownHandler(event) { 
        this.endPosXY = super.getMousePos(canvas, event);
        this.startPosX = this.endPosXY[0];
        this.startPosY = this.endPosXY[1];
        this.isMouseDown = true;
    }

    lineMouseUpHandler() { 
        this.isMouseDown = false;
        super.savePositions();
    }

    lineMouseMoveHandler(event) { 
    
        if(!this.isMouseDown) {
            return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        this.endPosXY = super.getMousePos(canvas, event);
        ctx.beginPath();
        ctx.moveTo(this.startPosX, this.startPosY);
        ctx.lineTo(this.endPosXY[0], this.endPosXY[1]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

    }

}

class Line {
    
}

let lineOne = new Line();
canvas.addEventListener('mousedown', lineOne.lineMouseDownHandler);
canvas.addEventListener('mouseup', lineOne.lineMouseUpHandler);
canvas.addEventListener('mousemove', lineOne.lineMouseMoveHandler);

console.log(Canvas.savedPos)





