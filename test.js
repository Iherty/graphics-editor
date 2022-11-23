'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

class PolylineDrawer {

    draw(coordinates, width = 2, color = 'black') {

        ctx.beginPath();
        for(let i = 0; i < coordinates.length;) {
            ctx.lineTo(coordinates[i], coordinates[i + 1]);
            i = i + 2;
        }

        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
        
    }
}

class Polyline {

    static savesPolylines = [0, 1];

    constructor(coordinates = [], width = 2, color = 'black') {
        //super(arguments);
        this.coordinates = coordinates; 
        this.width = width;
        this.color = color;

        // if (style === 'dashed') {
        //     this.style = [20, 5];
        // } else if (style === 'dotted') {
        //     this.style = [5, 15];
        // } else {
        //     this.style = 'solid';
        // }
    }

}

let polyline = [{coordinates: [100, 200, 50, 70]}, {coordinates: [210, 300, 170, 150]}, {coordinates: [310, 400, 290, 370]},]

function animate() {

    if (polyline.length > 0) {

        for (let i = 0; i < polyline.length; i++) {
            new PolylineDrawer().draw(polyline[i].coordinates);
        }

    }

}

requestAnimationFrame(animate);

