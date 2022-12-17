import { ctx } from '../../editor.js'

class PolygonDrawer {

    draw(polygon) { // [x1, y1, x2, y2]
        
        ctx.beginPath();

        if (polygon.style !== 'solid') {
            if (polygon.style === 'dashed') ctx.setLineDash([20, 5]);
            if (polygon.style === 'dotted') ctx.setLineDash([5, 15]);
        }

        for (let i = 0; i < polygon.coordinates.length;) {
            ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.closePath();
        ctx.lineWidth = polygon.lineWidth;
        ctx.strokeStyle = polygon.lineColor;
        ctx.stroke();

        if (polygon.isFill) {
            this.#fillPolygon(polygon);
        }

    }
    
    #fillPolygon(polygon) {
    
        ctx.beginPath();

        for (let i = 0; i < polygon.coordinates.length;) {
            ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.closePath();
        ctx.fillStyle = polygon.fillColor;
        ctx.fill();
    }
}

export { PolygonDrawer }