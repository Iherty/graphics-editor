import { ctx } from '../../editor.js'

class PolylineDrawer {

    draw(polyline) {

        ctx.beginPath();

        if (polyline.style !== 'solid') {
            if (polyline.style === 'dashed') ctx.setLineDash([20, 5]);
            if (polyline.style === 'dotted') ctx.setLineDash([5, 15]);
        }

        for(let i = 0; i < polyline.coordinates.length;) {
            ctx.lineTo(polyline.coordinates[i], polyline.coordinates[i + 1]);
            i = i + 2;
        }

        ctx.lineWidth = polyline.width;
        ctx.strokeStyle = polyline.color;
        ctx.stroke();
        
    }
}

export { PolylineDrawer }