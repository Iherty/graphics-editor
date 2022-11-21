'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

class LineDrawer {

    draw() {
        ctx.beginPath();

        if (this.style !== 'solid') {
            ctx.setLineDash(this.style);
        }

        ctx.moveTo(this.coordinates[0], this.coordinates[1]);
        ctx.lineTo(this.coordinates[2], this.coordinates[3]);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

}

class Line extends LineDrawer {

    constructor(coordinatesArr, width = 2, color = 'black', style = 'solid') {
        super(arguments);
        this.coordinates = coordinatesArr;
        this.width = width;
        this.color = color;

        if (style === 'dashed') {
            this.style = [20, 5];
        } else if (style === 'dotted') {
            this.style = [5, 15];
        } else {
            this.style = style;
        }
    }
}

class Polyline extends PolylineDrawer{

    constructor(coordinatesArr, width = 2, color = 'black') {
        super(arguments)
        this.coordinates = coordinatesArr; 
        this.width = width;
        this.color = color;

    }
}

class PolylineDrawer {

    draw() {
        let saveCrdns = [];

        for(let i = 2; i < this.coordinates.length; i++) {
            saveCrdns.push(ctx.lineTo(this.coordinates[i], this.coordinates[i + 1]))
        }

        ctx.beginPath();
        ctx.moveTo(this.coordinates[0], this.coordinates[1]);
        // [100, 50, 60, 200, 195, 85]

        
    }
}














