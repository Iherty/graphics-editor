import { ctx } from '../../editor.js'

class PolylineDrawer {

    draw(polyline) {

        ctx.beginPath();

        if (polygon.style === 'solid') ctx.setLineDash([]);
        if (polygon.style === 'dashed') ctx.setLineDash([20, 7]);
        if (polygon.style === 'dotted') ctx.setLineDash([3, 7]);
        if (polygon.style === 'dash-dotted') ctx.setLineDash([20, 7, 3, 7]);

        for(let i = 0; i < polyline.coordinates.length;) {
            ctx.lineTo(polyline.coordinates[i], polyline.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.lineWidth = polyline.width;
        ctx.strokeStyle = polyline.lineColor;
        ctx.stroke();
        
    }
}

export { PolylineDrawer }