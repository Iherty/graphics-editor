
export default class PolygonDrawer {

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(polygon, isFinishPath = false) { // [x1, y1, x2, y2]
        
        this.ctx.beginPath();

        if (polygon.style === 'solid') this.ctx.setLineDash([]);
        if (polygon.style === 'dashed') this.ctx.setLineDash([20, 7]);
        if (polygon.style === 'dotted') this.ctx.setLineDash([3, 7]);
        if (polygon.style === 'dash-dotted') this.ctx.setLineDash([20, 7, 3, 7]);

        for (let i = 0; i < polygon.coordinates.length;) {
            this.ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        this.ctx.closePath();

        if (!isFinishPath) {
            this.ctx.lineWidth = polygon.width;
            this.ctx.strokeStyle = polygon.lineColor;
            this.ctx.stroke();

            if (polygon.fillColor) {
                this.#fillPolygon(polygon);
            }
        }

    }
    
    #fillPolygon(polygon) {
    
        this.ctx.beginPath();

        for (let i = 0; i < polygon.coordinates.length;) {
            this.ctx.lineTo(polygon.coordinates[i], polygon.coordinates[i + 1]);
            i = i + 2;
        }

        this.ctx.closePath();
        this.ctx.fillStyle = polygon.fillColor;
        this.ctx.fill();
    }
}
