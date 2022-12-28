import DrawerBase from '../DrawerBase.js';

export default class PolylineDrawer extends DrawerBase {

    draw(polyline, isFinishPath = false) {

        this.ctx.beginPath();

        if (polygon.style === 'solid') this.ctx.setLineDash([]);
        if (polygon.style === 'dashed') this.ctx.setLineDash([20, 7]);
        if (polygon.style === 'dotted') this.ctx.setLineDash([3, 7]);
        if (polygon.style === 'dash-dotted') this.ctx.setLineDash([20, 7, 3, 7]);

        for(let i = 0; i < polyline.coordinates.length;) {
            this.ctx.lineTo(polyline.coordinates[i], polyline.coordinates[i + 1]);
            i = i + 2;
        }

        if (!isFinishPath) {
            this.ctx.lineWidth = polyline.width;
            this.ctx.strokeStyle = polyline.lineColor;
            this.ctx.stroke();
        }
        
    }
}
